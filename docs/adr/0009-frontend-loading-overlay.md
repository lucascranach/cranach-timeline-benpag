# Adding a loading overlay when longer loading time occur

* Status: accepted
* Deciders: Dominik Deimel
* Date: 2020-09-17

## Context and Problem Statement

While using the frontend, longer loading times may occur, for example when loading data from the backend. 
To give the user feedback a loading overlay should be displayed.

## Considered Options

* Building an overlay from scratch
* Using a prebuild overlay like [vue-loading-overlay](https://www.npmjs.com/package/vue-loading-overlay)

## Decision Outcome

Chosen option: "vue-loading-overlay" because it has all needed features and its more time efficient. 

## Pros and Cons of the Options

### Building an overlay from scratch

* Good, because it can be customized visually to fit the given styleguide
* Bad, because its not as time efficient than using a pre build one

### vue-loading-overlay

* Good, because it can be easily added via npm 
* Good, because it got all needed features
* Bad, because its not easy customizable


