# Use Array.filter as default filter method

* Status: accepted
* Date: 2020-08-05

## Context and Problem Statement

To filter large sets of data it is necessary to use a performant method/technology.

## Considered Options

* Array.filter
* Array.forEach
* for
* ElasticSearch
* Solr

## Decision Outcome

Chosen option: Array.filter

### Positive Consequences

* No external dependencies
* Reduces project size
* Makes deployment faster (less additional code bases) 
* Dedicated filter methods
* No limitation on filter logic
* [Fastest method](https://github.com/BenPag/cranach/wiki/Konzept-Filterung)

### Negative Consequences

* No presets or best practises available
* No technical support (developer side)

## Pros and Cons of the Options

### Array.filter

Array.filter is a JavaScript built-in method to filter arrays.

* Good, because it's built-in
* Good, because it's easy to use
* Good, because it minimizes boilerplate
* Good, because it's dedicated to filtering
* Good, because it can be used for any filter logic
* Bad, because it doesn't have a wholesome documentation

### Array.forEach

Array.forEach is a method to iterate through arrays with a callback function.

* Good, because it's built-in
* Good, because it's easy to use
* Good, because it's fast
* Bad, because it's not dedicated to filtering
* Bad, because it needs another data structure to safe results in

### for

for is a language construct to iterate through objects.

* Good, because it's built-in
* Good, because it's easy to use
* Bad, because it's not dedicated to filtering
* Bad, because it needs another data structure to safe results in
* Bad, because it's slow
* Bad, because it's not recommended by our [JavaScript style guide](https://github.com/airbnb/javascript#iterators--nope)

### ElasticSearch

ElasticSearch is a RESTful search engine to search and filter large datasets.

* Good, because it's dedicated to filtering
* Good, because it's open source
* Bad, because it's slower than built-in methods
* Bad, because indexing generates boilerplate

### Solr

Solr is a enterprise search plattform which can be used to filter large datasets.

* Good, because it's dedicated to filtering
* Bad, because it has too much configuration options for our needs
* Bad, because it's too large for our needs
* Bad, because it generates boilerplate
* Bad, because it's slower than built-in methods
* Bad, because it needs large infrastructure


## Links

* [Concept and performance tests](https://github.com/BenPag/cranach/wiki/Konzept-Filterung)
* [Array.filter](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
* [Array.forEach](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/foreach)
* [for](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Statements/for)
* [ElasticSearch](https://www.elastic.co/de/elasticsearch/)
* [Solr](https://lucene.apache.org/solr/)