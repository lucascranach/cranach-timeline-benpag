# Use Vue I18n as internationalization technology

* Status:accepted
* Deciders: Alexander Strutz
* Date: 2020-10-03

Technical Story: [Issue #46](https://github.com/BenPag/cranach/issues/46)

## Context and Problem Statement

To use the website in both German in English a technology for internationalization should be implemented. 

## Considered Options

* Vue I18n
* Polyglot.js
* js-lingui

## Decision Outcome

Chosen option: Vue I18n

### Positive Consequences

* Easy to maintain
* More languages can be added quite easy

### Negative Consequencess

* Large package
* Needs some training

## Pros and Cons of the Options <!-- optional -->

###  Vue I18n

* Good, because it's written for Vue
* Good, because it can be integrated in our project structure
* Good, because it helps with language changing
* Good, because it's very common
* Bad, because it's large

### Polyglot.js

* Good, because it's lightweight
* Bad, because it uses the JS locale, whether you want it or not 
* Bad, because it's not written for frontend applications

### js-lingui

* Good, because it's lightweight
* Bad, because it requires .jsx
* Bad, because it's made for React.js

## Links 

* [Vue I18n](https://kazupon.github.io/vue-i18n/)
* [Polyglot.js](https://airbnb.io/polyglot.js/)
* [js-lingui](https://github.com/lingui/js-lingui)
