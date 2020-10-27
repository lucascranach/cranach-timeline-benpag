# Node.js for backend development

* Status: accepted
* Date: 2020-07-29

## Context and Problem Statement

To enable efficient development, persistent logging should be introduced. Therefore different logging techniques shall be considered.
## Considered Options

* Pino
* Log-to-file
* Winston
* Tracer

## Decision Outcome

Chosen option: Winston

### Positive Consequences

* persistent logging to file
* error messages are also displayed inside the console
* possibility to use different logs for different log messages

### Negative Consequences

* already implemented error catching needs to be reworked

## Pros and Cons of the Options

### Pino

Pino is a Node.js Logger with low overhead.

* Good, it uses the JSON format
* Good, because it got a low overhead
* Good, because it can pipe the output to stdout
* Bad, because it only supports the JSON format

### log-to-file

Log-to-file is a simple node package, which enables logging to a file.

* Good, because its lightweight
* Good, because it supports timestamps
* Bad, because it supports only timestamps and a log message
* Bad, because it doesn't support the JSON format


### Winston

Winston is a simple and universal javascript logging library.

* Good, because the documentation is thorough and complete
* Good, because it supports multiple logging formats
* Good, because its very customizable 
* Good, because it supports multiple transports
* Bad, because it has a larger overhead

### Tracer

Tracer is a customizable logging library for Node.js

* Good, it supports color console
* Good, because its easy to implement
* Good, because it supports timestamps
* Bad, because it only logs to the console and not to a file

## Links

* [Pino](https://github.com/pinojs/pino)
* [Log-to-file](https://www.npmjs.com/package/log-to-file)
* [Winston](https://github.com/winstonjs/winston)
* [Tracer](https://www.npmjs.com/package/tracer)
