const path = require('path');
const {manga} = require(path.resolve(__dirname,
  '../server/components/cli/index'));

manga.start(process);
