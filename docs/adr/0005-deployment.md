# Use docker and docker-compose for deployment

* Status: accepted
* Date: 2020-08-07

## Context and Problem Statement

In order to provide access for external persons, a first prototype should be deployed on an external server. 
For this purpose, different deployment technologies will be considered

## Considered Options

* Docker and docker-compose
* LXD
* Flockport

## Decision Outcome

Chosen option: Docker and docker-compose

### Positive Consequences

* Docker was already used by the whole team
* No further induction needed
* Current deployment strategy is optimized for docker 

### Negative Consequences 
* Induction is needed, if outstanding persons want to add something

# Pros and Cons of the Options

### Docker

Docker is a software to isolate applications with container virtualization

* Good, because it's the most popular container virtualization technology
* Good, because it supports windows containers
* Good, because it's well documented
* Good, because it´s cross plattform 
+ Good, because it can be integrated in multiple tools like Kubernetes
* Good, because it can be used without further knowledge
* Good, because it's easy scalable
* Bad, because it has a high learning curve
* Bad, because debugging tools are not easy accessible 

### LXD

LXD is a next generation system container manager.

* Good, because its scalable
* Good, because it supports storage management
* Bad, because it only supports linux distributions
* Bad, because it can only be integrated with OpenNebula and OpenStack

### Flockport

Flockport simplifies container management and makes it easy to connect and deploy containers across servers.

* Good, because its provides a standard OS environment
* Good, because it supports load balancing
* Bad, because it only supports linux distributions

## Links

* [Docker](https://www.docker.com/) and [Docker-compose](https://docs.docker.com/compose/)
* [LXD](https://linuxcontainers.org/lxd/introduction/)
* [Flockport](https://www.flockport.com/)

