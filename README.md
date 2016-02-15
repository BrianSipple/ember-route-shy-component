# ember-route-shy-component

A component that won't render when the application's current route matches a preconfigured condition.

## Why

Often, and Ember application will have components or visual elements that are meant to be seen in some scenarios
and hidden in others. In many cases, this is handled inherently by having templates to correspond to routes. In some cases, however, a component that lives in a top-level route -- a navbar, for example -- might need to have its visibility toggled according based upon the current state of the application in many different child routes. `ember-route-shy-component` helps to handle this.


## Usage

Because it's meant to be an edge-case utility as opposed to a design driver. `route-shy-component` operates around a blacklist.

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
