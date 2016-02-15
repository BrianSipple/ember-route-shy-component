import Ember from 'ember';

const { getOwner } = Ember;

export default function lookupComponent (application, componentName) {
  return application.__container__.lookup(`component:${componentName}`);
}
