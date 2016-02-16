import Ember from 'ember';
import layout from '../templates/components/route-shy';
import computed from 'ember-new-computed';

const {
  Component,
  getWithDefault
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
    //debugger;
    const currentRouteName = getWithDefault(this, 'currentRouteName', '') || '';
    const blacklist = this.get('blacklistArray');

    if (this.get('forceRegExp')) {
      return !this._regExpMatchAllBlacklistItems(blacklist, currentRouteName).length;
    }

    for (const routeMatcher of blacklist) {

      if (typeof routeMatcher === 'string') {
        // For strings, check equality
        if (routeMatcher === currentRouteName) {
          return false;
        }

      } else if (routeMatcher instanceof RegExp) {
        // For RegExps, search for a match
        if (currentRouteName.search(routeMatcher) > -1) {
          return false;
        }
      }
    }
    return true;
  }),

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
