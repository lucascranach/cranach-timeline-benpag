# Vue.js for frontend development

* Status: accepted
* Date: 2020-06-11

## Context and Problem Statement

We have to a specify framework/technology for frontend development, which should be independent from the backend technology.

## Considered Options

* Vue.js
* React
* Angular
* Flutter
* Native JavaScript (without any frameworks)

## Decision Outcome

Chosen option: Vue.js

### Positive Consequences

* practicing frameworks that are relevant for other projects
* previous experience in the usage of these frameworks
* better performance in comparison to e.g. Angular, which is able to do much more than needed in this application
* prototype is written in Vue

### Negative Consequences

* no new frameworks to test
* not all team members are familiar with it

## Pros and Cons of the Options

### Vue.js

Vue.js is a client-side JavaScript web framework for creating single-page web applications based on the MVVM pattern. It can also be used in multipage websites for individual sections.

* Good, because it's a relatively new framework
* Good, because it's specified for the project "Cranach Timeline"
* Good, because the fact that behavior and UI are part of components makes it more intuitive
* Good, because integration of other libraries is simple
* Good, because of its simplicity and flexibility
* Good, because it provides data bindings, events and states
* Bad, because it allows poor code

### Angular

Angular is a TypeScript-based front-end web application framework. It is developed by a community of individuals and companies, led by Google, and published as open source software.

* Good, because it provides a complete solution
* Good, because it's a mature framework with good backing in terms of contributors
* Bad, because it requires learning TypeScript and MVC first
* Bad, because it's unknown to the team

### React

React is a JavaScript software library that provides a basic framework for the output of user interface components from websites. Components are structured hierarchically in React and can be represented in its syntax as self-defined HTML tags.

* Good, because the documentation is thorough and complete
* Good, because it provides data bindings, events and states
* Bad, because it can't split markup and logic
* Bad, because it's not a complete framework and advanced features require the use of third-party libraries

### Flutter

Flutter is a toolkit written by Google to create cross-plattform apps from a single codebase.

* Good, because the documentation is thorough and complete
* Good, because it's cross-plattform
* Bad, because it isn't very established
* Bad, because native mobile applications aren't necessary

### Native JavaScript

JavaScript itself provides developers with all funtionalities to write a frontend application without any frameworks needed.

* Good, because the missing external codebases make it performant
* Good, because it's easy to learn
* Bad, because there isn't any templating
* Bad, because there isn't any standarized architecture
* Bad, because it's not a complete framework and advanced features require the use of third-party libraries

## Links

* [Vue.js](https://vuejs.org/)
* [Angular](https://angular.io/)
* [React](https://reactjs.org/)
* [Framework Comparison](https://www.codeinwp.com/blog/angular-vs-vue-vs-react/)
* [Flutter](https://flutter.dev/)