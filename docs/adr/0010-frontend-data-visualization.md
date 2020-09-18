# D3.js as a JavaScript library for data visualization

* Status: accepted
* Deciders: Benjamin Pagelsdorf, Alexander Strutz, Dominik Deimel, Anja Bertels
* Date: 2020-09-18

## Context and Problem Statement
In order to display data in a visualization and provide different timelines, 
a possibility must be found to display the data in a performant and customizable way.

## Considered Options

* D3.js
* Highcharts
* Own implementation

## Decision Outcome

Chosen option: "D3.js" because it's the best fit for the given requirements

## Pros and Cons of the Options

### D3.js

* Good, because it has rich toolsets for data driven visuals
* Good, because it has an active community that provides many examples
* Good, because it's versatile and compatible
* Good, because it's customizable
* Good, because it works smoothly with other web technologies
* Bad, because it has a lot of boilerplate
* Bad, because it needs further induction

### Highcharts

* Good, because it has little dependencies
* Good, because it provides clean and easy to view charts
* Good, because it's easy to start with
* Good, because already written code could be used 
* Bad, because it's not very customizable
* Bad, because it's not very responsive
* Bad, because it has significant performance loss when dealing with a lot of data 

### Own implementation

* Good, because its completely customizable
* Bad, because it requires a lot of work

## Links

* [D3.js](https://d3js.org/)
* [Highcharts](https://www.highcharts.com/)
* [D3.js Review](https://comparecamp.com/d3-js-review-pricing-pros-cons-features/)
