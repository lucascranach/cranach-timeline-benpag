# Node.js for backend development

* Status: accepted
* Date: 2020-06-11

## Context and Problem Statement

We have to specify frameworks for backend development, in detail a JavaScript framework and an additional design framework.

## Considered Options

* Node.js
* C#
* PHP
* Kotlin (Ktor)

## Decision Outcome

Chosen option: Node.js

### Positive Consequences

* practicing frameworks that are relevant for other projects
* no explicit training because the technologies are common
* prototype is written in Node.js
* testing frameworks avaiable

### Negative Consequences

* common technologies are reused instead of trying new technologies
* not all team members are familiar with it

## Pros and Cons of the Options

### Node.js

Node.js is a server-side JavaScript web framework for creating HTTP servers and REST APIs.

* Good, because it has an own package manager
* Good, because it's extendable
* Good, because it minimizes boilerplate
* Good, because it's based on JavaScript such as the frontend
* Good, because it can be used in serverless enviroments
* Bad, because it creates large project files (node_modules)

### C#

C# is an object oriented language, which provides HTTP Server in combination with the ASP.NET Core web framework.

* Good, because it's a stable language
* Bad, because it generates overhead
* Bad, because it's type-specific
* Bad, because it's unknown to the team

### PHP

PHP is a server-side language to set up HTTP web servers.

* Good, because the documentation is thorough and complete
* Good, because it's a stable language
* Good, because it can be used in serverless enviroments
* Bad, because it has a lot of boilerplate

### Kotlin (Ktor)

Ktor is a framework built by JetBrains for creating Web applications in Kotlin, making use of coroutines for high scalability and offering an idiomatic API.

* Good, because it provides syntactic sugar
* Bad, because it's type-specific
* Bad, because it offers only a small package manager


## Links

* [Node.js](https://nodejs.org/en/)
* [C#](https://docs.microsoft.com/de-de/dotnet/csharp/tour-of-csharp/)
* [PHP](https://php.net/manual/de/intro-whatis.php)
* [Ktor](https://github.com/ktorio/ktor)