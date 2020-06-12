const axios = require('axios');
const fs = require('fs');
const path = require('path');

const config = require('../../global.config');

async function importData() {
  try {
    for (let i in config.jsonTitles) {
      const jsonData = await axios.get(config.dataBaseUrl + config.jsonTitles[i]);
      fs.writeFileSync(path.join(__dirname + '../../../data/' + config.jsonTitles[i]), JSON.stringify(jsonData.data));
    }
  } catch (err) {
    console.error(err);
    return 'Data import failed';
  }
  return `Data import succeded, JSONs are stored at ${path.join(`${__dirname}../../../data/`)}`;
}

importData().then((result) => {
  console.log(result);
});
