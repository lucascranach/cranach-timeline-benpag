const fs = require('fs');
const path = require('path');

module.exports = {
  parsePaintingsDe: () => {
    function getArtists(involvedPersons) {
      return involvedPersons.filter((it) => it.role === 'Künstler');
    }

    function getTitles(titlesArray) {
      return titlesArray.map((it) => it.title);
    }

    function getLocations(locationArray) {
      return locationArray.map((it) => it.term);
    }

    function parseData() {
      const mainAttributes = {
        paintings: [],
      };
      try {
        // eslint-disable-next-line global-require
        const paintingsJson = require('../../data/cda-paintings-v2.de.json');

        mainAttributes.paintings = paintingsJson.items.map((painting) => ({
          id: painting.objectId,
          imageUrl: '',
          startDate: painting.dating.begin,
          endDate: painting.dating.end,
          title: getTitles(painting.titles),
          location: getLocations(painting.locations),
          artists: getArtists(painting.involvedPersons),
        }));
        fs.writeFileSync(path.join(`${__dirname}../../../data/paintings.json`), JSON.stringify(mainAttributes, null, 2));
      } catch (err) {
        console.error(err);
        return 'Parsing failed!';
      }
      return `Parsing successful, parsed JSONs are stored at ${path.join(`${__dirname}../../../data/`)}`;
    }

    if (fs.existsSync(path.join(`${__dirname}../../../data/cda-paintings-v2.de.json`))) {
      console.log(parseData());
    } else {
      console.log('cda-paintings-v2.de.json is missing');
    }
  },
};
