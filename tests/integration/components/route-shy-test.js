import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import wait from 'ember-test-helpers/wait';
import startApp from '../../helpers/start-app';
import hbs from 'htmlbars-inline-precompile';

let actual, expected;
let application;
let blacklist;

const { run } = Ember;
const { getComputedStyle } = window;

// We'll be manually overriding the `applicationRoute`
// that the component is computing on by supplying it as an attribute
const ApplicationRouteStub = Ember.Object.extend({
  controller: {
    currentRouteName: null
  }
});

const navbarClass = 'navbar';

function getComponentStyle () {
  return getComputedStyle(document.querySelector(`.${navbarClass}`));
}

moduleForComponent('route-shy', 'Integration | Component | route shy', {
  integration: true,
  beforeEach() {
    applicationRouteStub = ApplicationRouteStub.create();
    this.set('navbarClass', navbarClass);
    //application = startApp();
    //applicationRoute = application.__container__.lookup('route:application');
    //applicationRoute.set('controller', Ember.Object.create());
  }
});

test('rendering without a blacklist argument', function(assert) {
  // Template block usage:"
  this.render(hbs`
    {{#route-shy}}
      template block text
    {{/route-shy}}
  `);
  assert.equal(this.$().text().trim(), 'template block text');
});


test('computing with a bound blacklist of mixed strings and regular \
 expressions', function (assert) {

   this.set('blacklist', [
     'video-player',
     /protected(\.*)/
   ]);
   this.set('applicationRoute', applicationRouteStub);


   run(() => {
     applicationRouteStub.set('controller.currentRouteName', 'homepage');
   });

   this.render(hbs`
     {{#route-shy class=navbarClass blacklist=blacklist applicationRoute=applicationRoute}}
       Navbar
     {{/route-shy}}
   `);

   expected = 'block';
   actual = getComponentStyle().display;
   assert.equal(actual, expected);



   run(() => {
     applicationRouteStub.set('controller.currentRouteName', 'video-player');
   });

   this.render(hbs`
     {{#route-shy class=navbarClass blacklist=blacklist applicationRoute=applicationRoute}}
       Navbar
     {{/route-shy}}
   `);

    expected = 'none';
    actual = getComponentStyle().display;
    assert.equal(actual, expected);



   run(() => {
     applicationRouteStub.set('controller.currentRouteName', 'audio-player');
   });

   this.render(hbs`
     {{#route-shy class=navbarClass blacklist=blacklist applicationRoute=applicationRoute}}
       Navbar
     {{/route-shy}}
   `);

   expected = 'block';
   actual = getComponentStyle().display;
   assert.equal(actual, expected);



   run(() => {
     applicationRouteStub.set('controller.currentRouteName', 'protected.audio-player');
   });

   this.render(hbs`
     {{#route-shy class=navbarClass blacklist=blacklist applicationRoute=applicationRoute}}
       Navbar
     {{/route-shy}}
   `);

   expected = 'none';
   actual = getComponentStyle().display;
   assert.equal(actual, expected);

});


test('computing with a bound blacklist of strings when \
 `forceRegExp` is set to true', function (assert) {

   this.set('blacklist', [
     'video-player',
     'protected(\.*)'
   ]);
   applicationRouteStub.set('controller.currentRouteName', 'protected/audio-player');
   this.set('applicationRoute', applicationRouteStub);
   this.set('forceRegExp', false);

   this.render(hbs`
     {{#route-shy class=navbarClass
        blacklist=blacklist
        applicationRoute=applicationRoute
        forceRegExp=forceRegExp}}
       Navbar
     {{/route-shy}}
   `);

   expected = 'block';
   actual = getComponentStyle().display;
   assert.equal(actual, expected);


   this.clearRender();
   this.set('forceRegExp', true);
   this.render(hbs`
     {{#route-shy class=navbarClass
        blacklist=blacklist
        applicationRoute=applicationRoute
        forceRegExp=forceRegExp}}
       Navbar
     {{/route-shy}}
   `);

   expected = 'none';
   actual = getComponentStyle().display;
   assert.equal(actual, expected);


});

//
// test('rendering with a bound blacklist', function (assert) {
//
// });
//
//
//
// test(`dynamically rendering whenever the \`currentRouteName\` changes`, function (assert) {
//
// });
//
//
// test(`Accepting spaced-separated names in-line`, function (assert) {
//
// });
//
//
// test(`Treating spaced-separated names as regular expressions when \`forceRegExp\` is true`, function (assert) {
//
// });
