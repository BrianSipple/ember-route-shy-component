# ember-route-shy-component

[![npm version](https://badge.fury.io/js/ember-route-shy-component.svg)](https://badge.fury.io/js/ember-route-shy-component) [![Build Status](https://travis-ci.org/BrianSipple/ember-route-shy-component.svg?branch=master)](https://travis-ci.org/BrianSipple/ember-route-shy-component) [![Ember Observer Score](http://emberobserver.com/badges/ember-route-shy-component.svg)](http://emberobserver.com/addons/ember-route-shy-component)[![Code Climate](https://codeclimate.com/github/BrianSipple/ember-route-shy-component/badges/gpa.svg)](https://codeclimate.com/github/BrianSipple/ember-route-shy-component)

*A component that won't render when the application's current route is on a blacklist.*

## Why

Often, an Ember application will have components or visual elements that are meant to be seen in some scenarios
and hidden in others. In many cases, this is handled inherently by having different templates for different routes. In some cases, however, a component that lives in a top-level route -- a navbar, for example -- might need to have its visibility toggled dynamically based upon the current state of the application in a nested child route. `ember-route-shy-component` helps with tricky edge cases like this.


## Basic Usage

```
ember install ember-route-shy-component
```

The `route-shy` component dynamically computes its [`isVisible`](http://emberjs.com/api/classes/Ember.Component.html#property_isVisible) property whenever the [`currentRouteName`](https://guides.emberjs.com/v1.10.0/understanding-ember/debugging/#toc_get-current-route-name-path) of the application is changed.  If `currentRouteName` corresponds to any of the items in a [`blacklist`](blacklist-configuration) -- through either string comparison or regular expression matching -- Ember will set the component's `display` property to `none`.

```
{{#route-shy blacklist=routesWhereNavbarIsHidden}}
  {{x-navbar}}
{{/route-shy}}
```


<h2><a name='blacklist-configuration'>Configuring the Blacklist</a></h2>

Because it's meant to be an edge-case utility as opposed to a design driver, `route-shy-component` operates around a blacklist.

[Regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) offer a powerful way to control where/when the component will be displayed. Any item in the blacklist that is a regular expression will be [tested](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) against `currentRouteName`. Otherwise, `route-shy` will attempt to perform a direct string comparison.

An effective approach for setting the list would be to prepare it as bound data -- in any of the [places that your template would already be getting its data from](https://guides.emberjs.com/v2.3.0/templates/handlebars-basics/).

A super-simplified example of using model data might looks like this:
```
<!-- application/routes.js -->

model () {
  return {
    navbar: {
      routesWhereHidden: [
        'application',
        /homepage(?:\.*)/,
        /login(?:\.*)/,
        /register(?:\.*)/
      ]
    }
    ....
  };

<!-- application/template.hbs -->

{{#route-shy blacklist=model.navbar.routesWhereHidden}}
  {{private-navbar}}
{{/route-shy}}
```

The blacklist could also be set "inline" with a string of spaced-separated names. By default, each name will be treated as a string (i.e, compared directly). You can, however, tell `route-shy` to treat theses names as regular expressions by setting the `forceRegExp` attribute to `true`.

```
{{#route-shy blacklist="foo bar baz(?:\.*)"}}
  {{private-navbar}}
{{/route-shy}}
```
Note that this is a far less practical approach than having your blacklist data/logic configured _outside_ of the template. And any attempts to have inline strings tested as regular expressions must leave off the `/` characters otherwise associated within inline RegExp compilation -- as `route-shy`, internally will need to pass them to the JavaScript `RegExp` constructor.

### Syncing with external data

As a convenience, `route-shy` can "sync" the results of its computed `isVisible` property with a property on a passed in object. This might be useful if another component is attempting to style itself relative to the visibility of components inside of a `{{route-shy}}` block (e.g., a page component that needs to toggle a padding offset depending on whether its top navbar is visible).

Usage is as simple as declaring an object to `syncWith`, along with a `syncProperty` on that object.

```
{{#route-shy
  blacklist=model.navbar.routesWhereHidden
  syncWith=model.navbar
  syncProperty="isVisible"}}

  {{private-navbar}}

{{/route-shy}}
```


## Developing Locally

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
