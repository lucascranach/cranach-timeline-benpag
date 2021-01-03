# Use two stationary deployment stages with dynamic pull request stages

* Status: accepted
* Deciders: Benjamin Pagelsdorf, Alexander Strutz
* Date: 2020-12-18

## Context and Problem Statement

In order to use deployment on remote machines, a number of usable stages should be defined and implemented.

## Decision Drivers

* Integration into git workflow
* Usage and value for developers

## Considered Options

* One stage per developer
* One stage per branch
* One stage per pull request
* A static count of stages

## Decision Outcome

Chosen option: One stage per pull request, combined with two static stages come out best (see below).

### Positive Consequences 

* Each PR can be watched and reviewed seperately without pulling it
* Dynamic creation of stages for PRs
* Two stages to show the current project progress

### Negative Consequences

* Githooks need to be installed in order to work with PRs
* PRs need to be re-merged into older open PRs

## Pros and Cons of the Options

### One stage per developer

* Good, because everyone can work independent
* Bad, because a developer can only work on one feature at a time
* Bad, because it doesn't support collaborative work

### One stage per branch

* Good, because stages are created dynamically
* Good, because the number of stages represents the git structure
* Bad, because it's harder to implement

### One stage per pull request

* Good, because it can be used for code reviews
* Good, because stages are created dynamically
* Good, because there are no unused stages
* Bad, because it's harder to implement

### A static count of stages

* Good, because it's easy to implement
* Good, because it's easy ti maintain
* Bad, because it doesn't adapt to workload and number of branches/PRs
* Bad, because it needs more communication between developers to not override changes

