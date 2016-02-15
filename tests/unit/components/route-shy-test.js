import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

let component, actual, expected;
let applicationRoute;

const { run } = Ember;

moduleForComponent('route-shy', 'Unit | Component | route shy', {
  // Specify the other units that are required for this test
  unit: true,
  beforeEach: function () {
    applicationRoute = Ember.Object.create({
      controller: {
        currentRouteName: null
      }
    });
  }
});


test(`resolving \`isVisible\` to \`true\` when the blacklist is "empty"`, function (assert) {

  component = this.subject({ applicationRoute, template: true });
  component.set('blacklist', undefined);

  expected = true;
  actual = component.get('isVisible');

  assert.equal(actual, expected);

  component.set('blacklist', null);

  expected = true;
  actual = component.get('isVisible');

  assert.equal(actual, expected);

  component.set('blacklist', []);

  expected = true;
  actual = component.get('isVisible');

  assert.equal(actual, expected);
});


// NOTE the use of `Ember.run` below to force-batch our changes. This
// is necessary for the guiding the run-loop during unit testing and
// brings determinism to the component state.

test(`resolving \`isVisible\` to \`true\` when the blacklist \
  doesn't contain a RegExp or a string matching the \
  current route`, function (assert) {

  component = this.subject({ applicationRoute, template: true });

  run(() => {
    applicationRoute.set('controller.currentRouteName', 'application');
    component.set('blacklist', ['protected']);
  });

  expected = true;
  actual = component.get('isVisible');

  assert.equal(actual, expected);

  run(() => {
    applicationRoute.set('controller.currentRouteName', 'protected.dashboard');
    component.set('blacklist', ['protected']);
  });

  expected = true;
  actual = component.get('isVisible');

  assert.equal(actual, expected);
});


test(`resolving \`isVisible\` to \`false\` when the blacklist \
  contains a RegExp or a string matching the \
  current route`, function (assert) {

  component = this.subject({ applicationRoute, template: true });

  run(() => {
    applicationRoute.set('controller.currentRouteName', 'application');
    component.set('blacklist', ['application']);
  });

  expected = false;
  actual = component.get('isVisible');

  assert.equal(actual, expected);


  run(() => {
    applicationRoute.set('controller.currentRouteName', 'protected.dashboard');
    component.set('blacklist', [/protected(?:\.*)/]);
  });

  expected = false;
  actual = component.get('isVisible');

  assert.equal(actual, expected);

});
