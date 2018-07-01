const path = require('path');
const {updateMangaCover} = require(path.resolve(__dirname,
  '../server/components/cli/manga/utils'));

updateMangaCover(process);
