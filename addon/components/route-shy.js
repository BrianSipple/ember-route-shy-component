import Ember from 'ember';
import layout from '../templates/components/route-shy';
import computed from 'ember-new-computed';

const {
  Component,
  getWithDefault,
  set,
  run
} = Ember;

const {
  readOnly
} = computed;

export default Component.extend({

  layout,

  /*
   * Force all blacklist items to be matched as Regular expressions
   */
  forceRegExp: false,

  /*
  * An optional list of routes in which the component is hidden
  */
  blacklist: null,

  /**
   * Optional property to "set" with the computed result of `isVisible`
   */
  syncWith: null,
  syncProperty: null,

  /**
   * Helper to ensure that the blacklist is always an array -- even
   * when it's passed inline as a string of spaced-separated names
   */
  blacklistArray: computed('blacklist', {
    get() {
      return typeof this.get('blacklist') === 'string' ?
        this.get('blacklist').split(/\s+/)
        :
        getWithDefault(this, 'blacklist', []) || [];
    }
  }).readOnly(),


  currentRouteName: readOnly('applicationRoute.controller.currentRouteName'),


  isVisible: computed('currentRouteName', 'blacklist', function () {
    const currentRouteName = getWithDefault(this, 'currentRouteName', '') || '';
    const blacklist = this.get('blacklistArray');
    const isVisible = this._isRouteNameBlacklisted(currentRouteName, blacklist);

    if (this.get('syncWith') && this.get('syncProperty')) {
      run.scheduleOnce('afterRender', this, () => {
        set(this.get('syncWith'), `${this.get('syncProperty') || ''}`, isVisible);
      });
    }

    return isVisible;
  }),


  _isRouteNameBlacklisted (routeName = '', blacklist = []) {
    if (this.get('forceRegExp')) {
      return !this._regExpMatchAllBlacklistItems(blacklist, routeName).length;
    }

    let isVisible = true;
    for (const routeMatcher of blacklist) {

      if (typeof routeMatcher === 'string') {
        // For strings, check equality
        if (routeMatcher === routeName) {
          isVisible = false;
          break;
        }

      } else if (routeMatcher instanceof RegExp) {
        // For RegExps, search for a match
        if (routeName.search(routeMatcher) > -1) {
          isVisible = false;
          break;
        }
      }
    }

    return isVisible;
  },

  /**
   * Treat every item in the blacklist as a regular expression and
   * match the passed in routeName against it
   */
  _regExpMatchAllBlacklistItems (blacklist = [], routeName = '') {
    return this
      .get('blacklistArray')
      .filter(item => !!(new RegExp(`${item}`).test(routeName)));
  }


});
