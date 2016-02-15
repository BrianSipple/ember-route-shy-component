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
    debugger;
    console.log(`Blacklist ${this.get('blacklist')}`);
    if (isArray('blacklist')) {
      for (const routeMatcher of this.get('blacklist')) {
        if (this.get('currentRouteName').search(routeMatcher) > -1) {
          return false;
        }
      }
    }
    return true;
  })


});
