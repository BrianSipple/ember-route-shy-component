import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

  this.route('homepage', function () {
    this.route('demos');
  });

  this.route('login');
  this.route('register');

  this.route('protected', { path: '' }, function () {

    this.route('dashboard');
    this.route('settings');

    this.route('videos', function () {
      this.route('live', function () {
        this.route('baz');
        this.route('foo', function() {
          this.route('bar');
        });
      });
      this.route('recorded');
    });

    this.route('drawings', function () {
      this.route('details', { path: '/:drawing_id' });
    });

  });
});

export default Router;
