# Use here as geocoding api

* Status: accepted
* Date: 2020-09-11

## Context and Problem Statement

To filter by location, a geocoding api is needed. The only criteria here are the costs, so any options is only measured by its costs.

## Considered Options

* OpenCage API
* Google Geocoding API
* Nominatim API
* Here Geocoding API

## Decision Outcome

Chosen option: Here Geocoding API

### Positive Consequences

* Fast API
* Only API-key needed
* 250.000 requests/month (one import takes about 3500 requests)

### Negative Consequences

* API-key needs to be stored in .env file

## Pros and Cons of the Options

### OpenCage API

OpenCage is a geocoding API.

* Bad, because it only provides 2500 requests/day

### Google Geocoding API

Google Geocoding is a geocoding API.

* Bad, because it doesn't provide a free tier

### Nominatim API

Nominatim is a geocoding API.

* Good, because it's free and open source
* Bad, because it only allows one requests/second, one import would take 50 minutes

### Here Geocoding API

Here Geocoding is a geocoding API.

* Good, because it provides 250.000 requests/month

## Links

* [OpenCage API](https://opencagedata.com/api)
* [Google Geocoding API](https://developers.google.com/maps/documentation/geocoding/usage-and-billing)
* [Nominatim API](https://nominatim.org/release-docs/develop/api/Overview/)
* [Here Geocoding API](https://developer.here.com/develop/rest-apis)
