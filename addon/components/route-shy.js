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
  * An optional list of routes in which the component is hidden
  */
  blacklist: null,

  currentRouteName: readOnly('applicationRoute.controller.currentRouteName'),


  isVisible: computed('currentRouteName', 'blacklist', function () {

    const currentRouteName = getWithDefault(this, 'currentRouteName', '');

    if (isArray(this.get('blacklist'))) {
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
  })


});
