import Ember from 'ember';
import layout from '../templates/components/route-shy';
import computed from 'ember-new-computed';

const {
  Component,
  isArray
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
    const currentRouteName = this.get('currentRouteName');
    console.log(`*** Computing "isVisible" *** `);
    console.log(`blacklist: ${this.get('blacklist')}`);
    console.log(`currentRouteName: ${currentRouteName}`);
    if (isArray(this.get('blacklist'))) {
      for (const routeMatcher of this.get('blacklist')) {
        debugger;

        if (typeof routeMatcher === 'string') {
          // For strings, check equality
          if (routeMatcher === currentRouteName) {
            console.log('Returning `false`');
            return false;
          }
        } else if (currentRouteName.search(routeMatcher) > -1) {
          // For RegExps, search for a match
          console.log('Returning `false`');
          return false;
        }
      }
    }
    console.log('Returning `true`');
    return true;
  })


});
