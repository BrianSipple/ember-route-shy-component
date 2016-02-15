# ember-route-shy-component (In progress)

A component that won't render when the application's current route is on a blacklist.

## Why

Often, an Ember application will have components or visual elements that are meant to be seen in some scenarios
and hidden in others. In many cases, this is handled inherently by having templates to correspond to routes. In some cases, however, a component that lives in a top-level route -- a navbar, for example -- might need to have its visibility toggled dynamically based upon the current state of the application in many different child routes. `ember-route-shy-component` helps to handle this.


## Usage

The `route-shy` component dynamically computes its [`isVisible`](http://emberjs.com/api/classes/Ember.Component.html#property_isVisible) property whenever the [`currentRouteName`](https://guides.emberjs.com/v1.10.0/understanding-ember/debugging/#toc_get-current-route-name-path) of the application is changed.  If `currentRouteName` meets the criteria of the [blacklist](blacklist-configuration), Ember will set the component's `display` property to `none`.

```
{{#route-shy blacklist=model.navbar.routesWhereHidden}}
  {{x-navbar}}
{{/route-shy}}
```



<h2><a name='blacklist-configuration'>Configuring the Blacklist</a></h2>

Because it's meant to be an edge-case utility as opposed to a design driver. `route-shy-component` operates around a blacklist.

[Regular expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions) offer a powerful way to control where/when the component will be displayed. Any item in the blacklist that is a regular expression will be [matched](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match) against `currentRouteName`. Otherwise, `route-shy` will attempt to perform a direct string comparison.

```
<!-- routes/application.js -->



```













## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
