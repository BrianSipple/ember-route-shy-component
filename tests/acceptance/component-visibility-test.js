import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

let actual, expected;

const { getComputedStyle } = window;

moduleForAcceptance('Acceptance | component visibility');


test('visiting the public /homepage URL', function(assert) {
  visit('/homepage');

  andThen(function() {
    assert.equal(currentRouteName(), 'homepage.index', 'correct current route name');

    expected = 'block';
    actual = getComputedStyle(document.querySelector('.navbar-block--public')).display;
    assert.equal(actual, expected, 'public navbar is is displayed in non-blacklisted public route');

    expected = 'none';
    actual = getComputedStyle(document.querySelector('.navbar-block--private')).display;
    assert.equal(actual, expected, 'private navbar is hidden in blacklisted public route');

  });
});

test('visiting the protected /dashboard URL', function(assert) {
  visit('/dashboard');

  andThen(function() {
    assert.equal(currentRouteName(), 'protected.dashboard', 'correct current route name');

    expected = 'none';
    actual = getComputedStyle(document.querySelector('.navbar-block--public')).display;
    assert.equal(actual, expected, 'public navbar is hidden in blacklisted protected route');

    expected = 'block';
    actual = getComputedStyle(document.querySelector('.navbar-block--private')).display;
    assert.equal(actual, expected, 'private navbar is displayed in non-blacklisted protected route');

  });
});

// test('visiting /homepage', function(assert) {
//   visit('/homepage');
//
//   andThen(function() {
//     assert.equal(currentURL(), '/homepage');
//   });
// });
