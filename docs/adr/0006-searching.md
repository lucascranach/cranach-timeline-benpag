# Use Array.filter as default search method

* Status: accepted
* Date: 2020-08-07

## Context and Problem Statement

To search large sets of data it is necessary to use a performant method/technology.

## Considered Options

* Array.filter
* Lunr.js
* Elasticlunr.js
* Algolia
* Solr
* ElasticSearch
* Search-index
* Fuse.js

## Decision Outcome 

Chosen option: Array.filter

### Positive Consequences

* Very fast, best performance
* No additional knowledge needed
* No additional packages needed

### Negative Consequences

* Function must be extended for every searchable field
* Boilerplate

## Pros and Cons of the Options

### Array.filter

Array.filter is a JavaScript built-in method to filter arrays.

* Good, because it's built-in
* Good, because it's the [fastest](https://github.com/BenPag/cranach/wiki/Konzept-Suche)
* Good, because it works without indexing
* Bad, because it's not dedicated to search
* Bad, because it doesn't have a wholesome documentation

### Lunr.js

Lunr.js is a lightweight javascript library to search and index content.

* Good, because it's dedicated to search
* Good, because it's easy to use
* Good, because it doesn't have any boilerplate
* Good, because it can be used via CDN and npm
* Bad, because it's indexing is slow

### Elasticlunr.js

Elasticlunr.js is a search engine based on lunr, but more flexible with larger configuration possibilites

* Good, because it provides stop words and boosting
* Good, because it provides more configuration than lunr.js
* Bad, because it's slower than lunr on arrays > 2000

### Algolia

Algolia is a remote hosted search provider, which can be used via a REST API.

* Good, because it's well documented
* Good, because it's very configurable
* Good, because you don't need to host anything
* Good, because it has a own dashboard
* Bad, because it requires a accound and payments
* Bad, because HTTP is much slower than local searching
* Bad, because Algolia keeps stored data


### Solr

Solr is a enterprise search plattform which can be used to filter large datasets.

* Good, because it's dedicated to search
* Good, because it comes with it's own configuration tools
* Bad, because it has too much configuration options for our needs
* Bad, because it generates boilerplate
* Bad, because it needs an own infrastructure

### ElasticSearch

ElasticSearch is a RESTful search engine to search and filter large datasets.

* Good, because it's dedicated to search
* Good, because it's open source
* Good, because it has a Vue.js client
* Bad, because indexing generates boilerplate
* Bad, because it's slow
* Bad, because it needs infrastructure

### Search-index

Search-index is a small library to search arrays based on built-in methods.

* Good, because it is very small
* Good, because it uses database syntax
* Godd, because it provides AND, OR and other useful expressions
* Bad, because it's not used very often
* Bad, because it doesn't provide stable versions
* Bad, because the newest version doesn't even work

### Fuse.js

Fuse.js is a search engine, which uses approximate string matching to create performant searches.

* Good, because it's very easy to use
* Good, because the results directly contain the element
* Bad, because the results can be a large chunk of data with too many matchting elements
* Bad, because it returns **a lot** of false positives (up to 15 times more results than expected)


## Links

* [Concept and performance tests](https://github.com/BenPag/cranach/wiki/Konzept-Suche)
* [Array.filter](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)
* [Lunr.js](https://lunrjs.com/)
* [Elasticlunr.js](http://elasticlunr.com/)
* [Algolia](https://www.algolia.com/doc/)
* [Solr](https://lucene.apache.org/solr/)
* [ElasticSearch](https://www.elastic.co/de/elasticsearch/)  
* [Search-index](https://www.npmjs.com/package/search-index)
* [Fuse.js](https://fusejs.io/)
