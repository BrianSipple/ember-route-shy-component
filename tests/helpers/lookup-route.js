import Ember from 'ember';

const { getOwner } = Ember;

export default function lookupRoute (application, routeName) {
  return application.__container__.lookup(`route:${routeName}`);
}
