# Use Jenkins as continous integration tool

* Status: accepted
* Deciders: Benjamin Pagelsdorf, Alexander Strutz
* Date: 2020-12-16

Technical Story: #228

## Context and Problem Statement

In order to continue the development outside of localhost in an wider collaborative enviroment, a CI tool is needed. 

## Decision Drivers 

* Price
* Ability to self-host
* Plugins and 3rd party integrations

## Considered Options

* Jenkins
* Travis CI
* Gitlab CI

## Decision Outcome

Chosen option: Jenkins, because comes out best (see below).

## Pros and Cons of the Options

### Jenkins

* Good, because it is pluggable
* Good, because it can run any shell command
* Good, because it can be self-hosted in a Docker container
* Good, because it can be hooked into Github
* Bad, because it needs plugins for deployment outside of the shell

### Travis CI

* Good, because it provides deployment to many cloud services and protocols
* Good, because it can be hooked into Github
* Bad, because it can't be self-hosted
* Bad, because it costs

### Gitlab CI

* Good, because it is very well connected with git
* Bad, because it can't be self-hosted
* Bad, because it costs
* Bad, because it needs the whole Gitlab enviroment in order to work

## Links

* [Jenkins](https://www.jenkins.io/)
* [Travis CI](https://travis-ci.org/)
* [Gitlab CI](https://docs.gitlab.com/ee/ci/)
