import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | component visibility');

test('visiting /', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(currentURL(), '/');
  });
});

test('visiting /homepage', function(assert) {
  visit('/homepage');

  andThen(function() {
    assert.equal(currentURL(), '/homepage');
  });
});
