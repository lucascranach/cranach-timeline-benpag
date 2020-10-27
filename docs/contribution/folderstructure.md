# Project folder structure

## `/backend`

The backend directory contains multiple configuration and docker files as well as the 'app.js' where the backend is set 
up and started.

### `/data`

The data folder contains the data for the Event Timelines as JSON files.

### `/modules`

The modules directory contains the folder `/importer`, which contains a parser for each category and `/logger`, 
which implements logging for backend and frontend errors.

### `/routes`

The routes directory contains the routes for accessing the various categories, such as events, archives, graphics and 
paintings as well as the log.

## `/frontend`

The frontend is a Vue project with its own [README](../../frontend).

### `/src`

The components are located in the directory `/components` and are grouped according to the defined 
[conventions](/conventions.md).

### `/public`

Files in the public directory are mapped on the server with a corresponding URL.
