const path = require('path');
const loopback = require('loopback');
const boot = require('loopback-boot');

const app = loopback();
boot(app, path.resolve(__dirname, '../server'));
const mysqlDs = app.datasources.mysqlDs;
const mTables = ['Author', 'Genre', 'Series', 'Manga', 'Page'];

mysqlDs.autoupdate(mTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' + mTables + '] created in ',
    mysqlDs.adapter.name);
  mysqlDs.disconnect();
});
