import { moduleForComponent, test } from 'ember-qunit';
import sinon from 'sinon';

let component, actual, expected;
let isVisibleSpy;
let applicationRoute;

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

test('computing `isVisible` when `blacklist` or `currentRouteName` changes', function (assert) {
  component = this.subject();
  component.set('applicationRoute', applicationRoute);
  isVisibleSpy = sinon.spy(component, 'isVisible');
  debugger;

  expected = 0;
  actual = isVisibleSpy.callCount;

  assert.equal(actual, expected);


  component.set('blacklist', ['foo', 'bar', 'baz']);
  expected = 1;
  actual = isVisibleSpy.callCount;

  assert.equal(actual, expected);


  component.set('applicationRoute.controller.currentRouteName', 'application');
  expected = 2;
  actual = isVisibleSpy.callCount;

  assert.equal(actual, expected);


  component.set('blacklist', null);
  expected = 3;
  actual = isVisibleSpy.callCount;

  assert.equal(actual, expected);


  component.set('applicationRoute.controller.currentRouteName', 'rockets');
  expected = 4;
  actual = component.isVisible.callCount;

  assert.equal(actual, expected);

});

test(`resolving \`isVisible\` to \`true\` when the blacklist is "empty"`, function(assert) {

  component = this.subject();
  isVisibleSpy = componet.get('isVisible').spy();
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
