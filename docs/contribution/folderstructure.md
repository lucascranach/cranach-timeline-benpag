# Project folder structure

## `/backend`

Im Backend Verzeichnis sind einerseits verschiedene Konfigurations- und Dockerdateien zu finden, außerdem die `app.js`, 
in der das Backend aufgesetzt und gestartet wird.

### `/data`

Im Data Ordner sind die Daten für die Event Timelines als JSON Dateien zu finden.

### `/modules`

Das Modules Verzeichnis beinhaltet den Ordner `/importer`, in dem sich für jede Werkkategorie ein Parser befindet und 
`/logger`, in dem das Logging für Backend und Frontend Fehler implementiert ist.

### `/routes`

Im Routes Verzeichnis befinden sich die Routen für den Zugriff auf die verschiedenen Werkkategorien wie Archivalien, 
Events, Drucke und Gemälde sowie der Log.

## `/frontend`

Das Frontend ist ein Vue Projekt, das eine eigene [README](https://github.com/BenPag/cranach/tree/develop/frontend) zum 
Starten besitzt.

### `/src`

Die Komponenten liegen im Verzeichnis `/components` und sind nach den festgelegten 
[Konventionen](https://github.com/BenPag/cranach/blob/feature/%23215-collaboration/docs/contribution/conventions.md) 
gruppiert.

### `/public`

Dateien im Public Verzeichnis werden auf dem Server mit einer entsprechenden URL abgebildet.
