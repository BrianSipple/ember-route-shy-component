import Ember from 'ember';
import layout from '../templates/components/route-shy';
import computed from 'ember-new-computed';

const {
  Component,
  isArray,
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

  currentRouteName: readOnly('applicationRoute.controller.currentRouteName'),


  isVisible: computed('currentRouteName', 'blacklist', function () {
    debugger;
    const currentRouteName = getWithDefault(this, 'currentRouteName', '') || '';

    if (isArray(this.get('blacklist'))) {

      if (this.get('forceRegExp')) {
        return !this._regExpMatchAllBlacklistItems(currentRouteName).length;
      }

      for (const routeMatcher of this.get('blacklist')) {

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
    }
    return true;
  }),

  _regExpMatchAllBlacklistItems (routeName) {
    return this
      .get('blacklist')
      .filter(item => !!(new RegExp(`${item}`).test(routeName)));
  }


});
