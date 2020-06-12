const axios = require('axios');
const config = require('../../global.config');
const fs = require('fs');
const path = require('path');

importData().then((result) => {
    console.log(result);
});

async function importData() {
    try {
        for (let i in config.jsonTitles) {
            let jsonData = await axios.get(config.dataBaseUrl + config.jsonTitles[i]);
            fs.writeFileSync(path.join(__dirname + '../../../data/' + config.jsonTitles[i]), JSON.stringify(jsonData.data));
        }
    } catch (err) {
        console.error(err);
        return "Data import failed";
    }
    return "Data import succeded";
}