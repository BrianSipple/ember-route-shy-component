import Ember from 'ember';
import EmberRouteShyComponentInitializer from '../../../initializers/ember-route-shy-component';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | ember route shy component', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  EmberRouteShyComponentInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
