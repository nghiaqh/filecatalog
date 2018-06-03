'use strict';
const path = require('path');

const cli = require(path.resolve(__dirname, '../server/components/cli/index'));
cli.start(process);
