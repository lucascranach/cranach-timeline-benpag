const fs = require('fs');
const path = require('path');

module.exports = {
  parseGraphicsDe: () => {
    function getTitles(titlesArray) {
      const titles = titlesArray.filter((it) => it.title);
      return titles;
    }

    function getLocations(locationArray) {
      const locations = locationArray.filter((it) => it.term);
      return locations;
    }

    function getArtists(involvedPersons) {
      const artists = involvedPersons.filter((it) => it.role === 'Künstler' || 'Drucker');
      return artists;
    }

    function parseData() {
      const mainAttributes = {
        graphics: [],
      };
      try {
        // eslint-disable-next-line global-require
        const graphicsJson = require('../../data/cda-graphics-v2.virtual.de.json');

        mainAttributes.graphics = graphicsJson.items.map((graphic) => ({
          id: graphic.objectId,
          imageUrl: '',
          startDate: graphic.dating.begin,
          endDate: graphic.dating.end,
          title: getTitles(graphic.titles),
          location: getLocations(graphic.locations),
          artists: getArtists(graphic.involvedPersons),
        }));
        fs.writeFileSync(path.join(`${__dirname}../../../data/graphics.json`), JSON.stringify(mainAttributes, null, 2));
      } catch (err) {
        console.error(err);
        return 'Parsing failed!';
      }
      return `Parsing successful, parsed JSONs are stored at ${path.join(`${__dirname}../../../data/`)}`;
    }

    if (fs.existsSync(path.join(`${__dirname}../../../data/cda-graphics-v2.virtual.de.json`))) {
      console.log(parseData());
    } else console.log('cda-graphics-v2.virtual.de.json is missing');
  },
};
