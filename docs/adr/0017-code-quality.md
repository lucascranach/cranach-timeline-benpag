# Use ESLint as JavaScript code quality tool

* Status: accepted
* Deciders: Benjamin Pagelsdorf, Alexander Strutz
* Date: 2020-12-18

## Context and Problem Statement

To increase the JavaScript code quality inside the CI a tool for control should be implemented.

## Decision Drivers

* Integration into Jenkins
* Usage with Node.js
* Individual rules and ability to change them
* Documentation

## Considered Options

* ESLint
* JSLint
* JSHint

## Decision Outcome

Chosen option: ESLint, because comes out best (see below).

## Pros and Cons of the Options 

### ESLint

* Good, because it's compatible with Node.js and Jenkins
* Good, because it provides individual rule sets
* Good, because it provides a CLI
* Good, because it's well documented
* Good, because it provides some pre-defined style guides
* Bad, because it's not easy to use at first

### JSLint

* Bad, because it only accepts few rules
* Bad, because it's not much supported
* Bad, because it's not compatible with Jenkins

### JSHint

* Good, because it's widely used
* Good, because it's smaller than ESLint
* Good, because it has some IDE implementations
* Good, because it's compatible with Jenkins
* Bad, because it doesn't provide performance tests
* Bad, because it's CLI isn't very configurable

## Links

* [ESLint](https://eslint.org/docs/user-guide/getting-started)
* [JSLint](https://www.npmjs.com/package/jslint)
* [JSHint](https://www.npmjs.com/package/jshint)
