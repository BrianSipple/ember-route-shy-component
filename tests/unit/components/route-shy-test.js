import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

let component, actual, expected;
let applicationRoute;

const { run, get } = Ember;

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

test('maintaining the `blacklist` property as an array', function (assert) {

  component = this.subject();

  expected = [];
  actual = component.get('blacklistArray');
  assert.deepEqual(actual, expected);


  component.set('blacklist', ['foo', 'bar', 'baz']);

  expected = ['foo', 'bar', 'baz'];
  actual = component.get('blacklistArray');
  assert.deepEqual(actual, expected);


  component.set('blacklist', 'foo bar baz');

  expected = ['foo', 'bar', 'baz'];
  actual = component.get('blacklistArray');
  assert.deepEqual(actual, expected);

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

test(`Partial regExp matches only register on blacklist
  when end symbols (^ and $) aren't a part of the expression`, function (assert) {

  component = this.subject({ applicationRoute, template: true });

  run(() => {
    applicationRoute.set('controller.currentRouteName', 'video.movies');
    component.set('blacklist', [/^vid$/, /^video$/]);
  });

  expected = true;
  actual = component.get('isVisible');
  assert.equal(actual, expected);

  run(() => {
    applicationRoute.set('controller.currentRouteName', 'video.movies');
    component.set('blacklist', [/vid/, /video/]);
  });

  expected = false;
  actual = component.get('isVisible');
  assert.equal(actual, expected);

});

test(`synching the computation of \`isVisible\` with a property on a\
  bound object if set`, function (assert) {

  const myEmberObject = Ember.Object.create({
    name: 'Brian',
    password: 'password',
    isProfileVisible: false
  });

  const myPojo = {
    name: 'Marco',
    password: 'password1',
    isProfileVisible: true
  };

  run(() => {
    component = this.subject({ applicationRoute, template: false, syncWith: myEmberObject, syncProperty: 'isProfileVisible' });
  });


  expected = true;
  actual = get(myEmberObject, 'isProfileVisible');
  assert.equal(actual, expected);

  run(() => {
    applicationRoute.set('controller.currentRouteName', 'private');
    component.setProperties({
      syncWith: myPojo,
      syncProperty: 'isProfileVisible',
      blacklist: ['private']
    });
  });

  expected = false;
  actual = get(myPojo, 'isProfileVisible');
  assert.equal(actual, expected);
});
