const axios = require('axios');
const fs = require('fs');
const path = require('path');

const config = require('../../global.config');

async function importData() {
  try {
    config.jsonTitles.forEach(async (url) => {
      const jsonData = await axios.get(config.dataBaseUrl + url);
      fs.writeFileSync(path.join(`${__dirname}../../../data/${url}`), JSON.stringify(jsonData.data));
    });
  } catch (err) {
    console.error(err);
    return 'Data import failed';
  }
  return `Data import succeded, JSONs are stored at ${path.join(`${__dirname}../../../data/`)}`;
}

importData().then((result) => {
  console.log(result);
});
