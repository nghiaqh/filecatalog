'use strict';

const path = require('path');

const app = require(path.resolve(__dirname, '../server/server'));
const mysqlDs = app.datasources.mysqlDs;

const Author = app.models.Author;
const Genre = app.models.Genre;
const Manga = app.models.Manga;
const Page = app.models.Page;
const Series = app.models.Series;
const mTables = ['Author', 'Genre', 'Series', 'Manga', 'Page'];

mysqlDs.autoupdate(mTables, function(er) {
  if (er) throw er;
  console.log('Loopback tables [' + mTables + '] created in ',
    mysqlDs.adapter.name);
  mysqlDs.disconnect();
});
