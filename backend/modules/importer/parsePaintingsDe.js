const fs = require('fs');
const path = require('path');

module.exports = {
  parsePaintingsDe: () => {
    function getArtists(involvedPersons) {
      const artists = [];

      involvedPersons.forEach((it) => {
        if (it.role === 'Künstler') {
          artists.push(it.name);
        }
      });
      return artists;
    }

    function getTitles(titlesArray) {
      const titles = [];
      titlesArray.forEach((it) => {
        titles.push(it.title);
      });
      return titles;
    }

    function getLocations(locationArray) {
      const locations = [];
      locationArray.forEach((it) => {
        locations.push(it.term);
      });
      return locations;
    }

    async function parseData() {
      const mainAttributes = {
        paintings: [],
      };
      try {
        const paintingsJson = JSON.parse(fs.readFileSync(path.join(`${__dirname}../../../data/cda-paintings-v2.de.json`)));

        paintingsJson.items.forEach((painting) => {
          const newPainting = {};
          // console.log(painting);
          newPainting.id = painting.objectId;
          newPainting.imageUrl = '';
          newPainting.startDate = painting.dating.begin;
          newPainting.endDate = painting.dating.end;
          newPainting.title = getTitles(painting.titles);
          newPainting.location = getLocations(painting.locations);
          newPainting.artists = getArtists(painting.involvedPersons);

          mainAttributes.paintings.push(newPainting);
        });
        fs.writeFileSync(path.join(`${__dirname}../../../data/paintings.json`), JSON.stringify(mainAttributes, null, 2));
      } catch (err) {
        console.error(err);
        return 'Parsing failed!';
      }
      return `Parsing successful, parsed JSONs are stored at ${path.join(`${__dirname}../../../data/`)}`;
    }

    if (fs.existsSync(path.join(`${__dirname}../../../data/cda-paintings-v2.de.json`))) {
      parseData().then((result) => {
        console.log(result);
      });
    } else console.log('cda-paintings-v2.de.json is missing');
  },
};
