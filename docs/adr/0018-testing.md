# Use Mocha as testing framework

* Status: accepted
* Deciders: Benjamin Pagelsdorf, Alexander Strutz
* Date: 2020-12-18

## Context and Problem Statement

To provide testing in the CI, a JavaScript testing framework is needed.

## Decision Drivers

* Support on Node.js
* Ability to test HTTP requests
* Pluggablilty
* Documentation

## Considered Options

* Mocha
* Jest
* Jasmine

## Decision Outcome

Chosen option: Mocha, because comes out best (see below).

## Pros and Cons of the Options

### Mocha

* Good, because it operates on Node.js and Browsers
* Good, because it can be used for backend and frontend testing
* Good, because it can test HTTP endpoints
* Good, because it supports async/await and Promises
* Good, because it's open-source
* Bad, because it's not pluggable

### Jest
* Good, because it supports Node.js and Vue.js
* Good, because it runs isolated, regardless of enviroment
* Good, because it's well documented
* Bad, because it can't test HTTP endpoints

### Jasmine

* Good, because it supports Node.js and Vue.js
* Good, because it supports async/await
* Bad, because it can't test HTTP endpoints
* Bad, because it's not used very much
* Bad, because it'S not documented very well

## Links

* [Mocha](https://mochajs.org/)
* [Jest](https://jestjs.io/)
* [Jasmine](https://jasmine.github.io/)

