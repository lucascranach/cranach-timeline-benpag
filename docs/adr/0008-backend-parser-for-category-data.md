# No parser changes for inconsistent data structure

* Status: accepted
* Deciders: Anja Bertels, Dominik Deimel, Benjamin Pagelsdorf
* Date: 2020-09-02

## Context and Problem Statement

The "isBestOf" property is only available for the data structure of paintings, therefore it's only included in the paintings parser.
The question is if there should be a check to see whether the property exists in the other data structures or not.

## Considered Options

* Check for properties
* Don't check for properties
* Add missing properties to every data structure

## Decision Outcome

Chosen option: "Don't check for properties" because of the amount of work the other options would bring as well as the amount of data involved. 

## Pros and Cons of the Options

### Check for properties

* Good, because it would provide consistency within the code
* Bad, because there would be a lot of redundancies
* Bad, because it requires a lot of work

### Don't check for properties

* Good, because it's a faster solution
* Good, because it requires less computational effort
* Bad, because it's inconsistent

### Add missing properties to every data structure

* Good, because it would provide consistency
* Bad, because of the amount of properties
* Bad, because the properties may change in the future
* Bad, because it requires a lot of work