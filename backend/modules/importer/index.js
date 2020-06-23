const axios = require('axios');
const fs = require('fs');
const path = require('path');
const parserPaintings = require('./parsePaintingsDe');
const parserGraphics = require('./parseGraphicsDe');

const config = require('../../global.config');

async function importData() {
  try {
    config.jsonTitles.forEach(async (url) => {
      const jsonData = await axios.get(config.dataBaseUrl + url);
      fs.writeFileSync(path.join(`${__dirname}../../../data/${url}`), JSON.stringify(jsonData.data), null, 2);
      if (url === 'cda-paintings-v2.de.json') {
        parserPaintings.parsePaintingsDe();
      } else if (url === 'cda-graphics-v2.virtual.de.json') {
        parserGraphics.parseGraphicsDe();
      }
    });
  } catch (err) {
    console.error(err);
    return 'Data import failed';
  }
  return `Data import succeeded, JSONs are stored at ${path.join(`${__dirname}../../../data/`)}`;
}

if (!fs.existsSync(path.join(`${__dirname}../../../data/`))) fs.mkdirSync(path.join(`${__dirname}../../../data/`));

importData().then((result) => {
  console.log(result);
});
