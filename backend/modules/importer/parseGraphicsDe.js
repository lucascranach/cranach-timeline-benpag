const fs = require('fs');
const path = require('path');

module.exports = {
  parseGraphicsDe: () => {
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

    function getArtists(involvedPersons) {
      const artists = [];

      involvedPersons.forEach((it) => {
        if (it.role === 'Künstler' || 'Drucker') {
          artists.push(it.name);
        }
      });
      return artists;
    }

    async function parseData() {
      const mainAttributes = {
        graphics: [],
      };
      try {
        const graphicsJson = JSON.parse(fs.readFileSync(path.join(`${__dirname}../../../data/cda-graphics-v2.virtual.de.json`)));

        graphicsJson.items.forEach((graphic) => {
          const newGraphic = {};
          newGraphic.id = graphic.objectId;
          newGraphic.imageUrl = '';
          newGraphic.startDate = graphic.dating.begin;
          newGraphic.endDate = graphic.dating.end;
          newGraphic.title = getTitles(graphic.titles);
          newGraphic.location = getLocations(graphic.locations);
          newGraphic.artists = getArtists(graphic.involvedPersons);

          mainAttributes.graphics.push(newGraphic);
        });
        fs.writeFileSync(path.join(`${__dirname}../../../data/graphics.json`), JSON.stringify(mainAttributes, null, 2));
      } catch (err) {
        console.error(err);
        return 'Parsing failed!';
      }
      return `Parsing successful, parsed JSONs are stored at ${path.join(`${__dirname}../../../data/`)}`;
    }

    if (fs.existsSync(path.join(`${__dirname}../../../data/cda-graphics-v2.virtual.de.json`))) {
      parseData().then((result) => {
        console.log(result);
      });
    } else console.log('cda-graphics-v2.virtual.de.json is missing');
  },
};
