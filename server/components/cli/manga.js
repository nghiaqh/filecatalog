const fs = require('fs');
const chalk = require('chalk');
const folder = require('./folder');
const path = require('path');
const winston = require('winston');
const loopback = require('loopback');
const boot = require('loopback-boot');

const app = loopback();
boot(app, path.resolve(__dirname, '../../'));
const Author = app.models.Author;
const Genre = app.models.Genre;
const Manga = app.models.Manga;
const Page = app.models.Page;
const Series = app.models.Series;

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({filename: 'error.log', level: 'error'}),
  ],
});

/**
 * 1. Scan a folder
 * 2. If folder name matches pattern, import to database, end (because a manga folder must not contain other manga)
 * 3. If name doesn't match pattern and there is no request to include sub folders, end
 * 4. If name doesn't match pattern and there is a request to include sub folders, start the whole process with each sub folder.
 */
async function scanFolder(folderPath, skipExistingRecords = false) {
  if (hasValidName(folderPath)) {
    await importContent(folderPath, skipExistingRecords);
  } else {
    const folders = folder.getChildren(folderPath).folders;
    // if use array.map here, the recursive
    for (let i = 0; i < folders.length; i++) {
      await scanFolder(folders[i], skipExistingRecords);
    }
  }
}

/**
 * Check if folder name match name pattern /([^,.]+),([^,.]+)/
 * @param {String} folderPath
 */
function hasValidName(folderPath) {
  const folderName = path.parse(folderPath).base.split('/').pop();
  const namePattern = /([^,.]+),([^,.]+)/;
  const matches = namePattern.exec(folderName);
  return matches !== null;
}

/**
 * Create data records (author, manga, page) from a folder
 * @param {String} folderPath a folder path
 */
async function importContent(folderPath, skipExistingRecords = false) {
  try {
    const folderName = path.parse(folderPath).base.split('/').pop();
    const mtime = fs.statSync(folderPath).mtime;
    let authorName = folderName.split(',')[0];
    const bookName = folderName.split(authorName + ',')[1].trim();
    authorName = authorName.trim();
    const timeStamp = new Date().toISOString().replace(/T/, ' ')
      .replace(/\..+/, '');
    console.log(`${chalk.yellow(timeStamp)} - ` +
      `${chalk.bold('Author:')} ${authorName}. ` +
      `${chalk.bold('Manga:')} ${bookName} - ` +
      `${chalk.bold('mtime:')} ${mtime}`);

    const files = folder.getChildren(folderPath).files;
    const imgRe = /.*\.(jpg|jpeg|png|gif)$/;
    let images = files.filter(file => imgRe.exec(file));

    const author = await createAuthor(authorName);
    if (author[1]) console.log(`  Author ${author[0].name} created!`);
    else console.log(chalk.gray(
      '  Author already exists in database.'));

    const manga = await createManga(bookName, author[0].id, mtime);
    if (manga[1]) console.log(`  Manga ${manga[0].title} created!`);
    else if (skipExistingRecords) {
      console.log(chalk.gray(
        '  Manga already exists in database.'));
      return;
    }

    await Page.destroyAll({mangaId: manga[0].id});
    for (let i = 0; i < images.length; i++) {
      const title = path.parse(images[i]).base.split('/').pop().trim();
      const uri = images[i];
      const page = await createPage(title, uri, manga[0].id, i + 1);
      if (page[1]) console.log(`  Page ${page[0].title} created!`);
      else console.log(chalk.gray(
      `  Page ${page[0].title} already exists in database.`));
    }
  } catch (err) {
    console.log(err);
    logger.log({
      level: 'error',
      message: err + ' - folderPath: ' + folderPath,
    });
  }
}

function createAuthor(authorName) {
  return Author.findOrCreate(
    {where: {name: authorName}},
    {name: authorName}
  );
}

function createManga(bookTitle, authorId, created) {
  return Manga.findOrCreate(
    {where: {title: bookTitle, authorId: authorId}},
    {title: bookTitle, authorId: authorId, created: created}
  );
}

function createPage(title, uri, mangaId, number) {
  return Page.findOrCreate(
    {where: {title: title, uri: uri, mangaId: mangaId, number: number}},
    {title: title, uri: uri, mangaId: mangaId, number: number}
  );
}

module.exports = {scanFolder};
