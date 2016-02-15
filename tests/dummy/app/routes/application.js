import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({

  model () {
    return {
      privateNavbar: {
        routesWhereHidden: [
          'application',
          /homepage(?:\.*)/,
          /login(?:\.*)/,
          /register(?:\.*)/
        ]
      },
      publicNavbar: {
        routesWhereHidden: [
          /protected(?:\.*)/
        ]
      }
    };
  }
});
