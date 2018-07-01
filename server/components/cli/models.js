const path = require('path');
const loopback = require('loopback');
const boot = require('loopback-boot');

const app = loopback();
boot(app, path.resolve(__dirname, '../../'));
const Author = app.models.Author;
const Genre = app.models.Genre;
const Manga = app.models.Manga;
const Page = app.models.Page;
const Series = app.models.Series;

module.exports = {
  Author,
  Genre,
  Manga,
  Page,
  Series,
};
