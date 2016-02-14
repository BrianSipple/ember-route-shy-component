import Ember from 'ember';
import layout from '../templates/components/route-shy-component';

const {
  Component,
  computed
} = Ember;

const {
  readOnly
} = computed;

export default Component.extend({

  layout,

  /*
  * An optional list of routes in which the component is hidden
  */
  routesWhereHidden: null,

  currentRouteName: readOnly('applicationRoute.controller.currentRouteName'),

  isVisible: computed('currentRouteName', function () {
    for (const routeMatcher of this.get('routesWhereHidden')) {
      if (this.get('currentRouteName').search(routeMatcher) > -1) {
        return false;
      }
    }
    return true;
  })


});
