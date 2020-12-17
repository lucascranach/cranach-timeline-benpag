# S3 for backend and frontend hosting

* Status: accepted
* Deciders: Benjamin Pagelsdorf, Alexander Strutz
* Date: 2020-12-16

Technical Story: #234

## Context and Problem Statement

In order to continue the development outside of localhost a hosting solution is needed.

## Considered Options

* AWS S3
* AWS Lambda
* Self-hosted server (pagelsdorf.de)

## Decision Drivers 

* Price
* Complexity
* Ability to work without docker
* Deployment time out of Jenkins CI
* Node.js support

## Decision Outcome

Chosen option: AWS S3, because comes out best (see below). In order to replace the backend, all JSON files are stocked in S3 without any routing. The importer will run in Jenkins from now on.

## Pros and Cons of the Options 

### AWS S3

AWS S3 is a cloud-based storage service, which provides the hosting of static HTML sites.

* Good, because it is easy to use
* Good, because it has an own load balancing
* Good, because it should stay free for our needs
* Good, because it provides a fast deployment
* Bad, because it creates generic urls, which must be used with a HTTP redirect (from pagelsdorf.de)
* Bad, because it doesn't provide HTTPS
* Bad, because it doesn't support Node.js

### AWS Lambda

AWS Lambda is a cloud-based service, which provides a trigger based running of code snippets. It can be triggered via API Gateway in order to work as a HTTP server.

* Good, because it supports Node.js
* Good, because it has an own load balancing
* Good, because it only runs if called
* Good, because it provides logs for every call
* Bad, because it doesn't provide HTTPS
* Bad, because it'll be started cold, which can take up some seconds on each load
* Bad, because it costs

### self-hosted (pagelsdorf.de)

* Good, because it doesn't cost (anymore)
* Good, because it can be fully controlled
* Bad, because it can be only controlled by Benjamin Pagelsdorf
* Bad, because it doesn't provide any load balancing
* Bad, because it has limited hardware resources
* Bad, because it can't be transfered after Project III

## Links

* [AWS Lambda](https://aws.amazon.com/de/lambda/)
* [AWS API Gateway](https://aws.amazon.com/api-gateway/)
* [AWS S3](https://aws.amazon.com/s3/)
