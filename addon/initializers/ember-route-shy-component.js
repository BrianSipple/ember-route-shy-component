export function initialize () {
  const application = arguments[1] || arguments[0];
  application.inject('component:route-shy', 'applicationRoute', 'route:application');
}

export default {
  name: 'ember-route-shy-component',
  initialize
};
