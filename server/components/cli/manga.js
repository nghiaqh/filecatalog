'use strict';

const chalk = require('chalk');
const folder = require('./folder');
const path = require('path');
const app = require('../../server');
const Author = app.models.Author;
const Genre = app.models.Genre;
const Manga = app.models.Manga;
const Page = app.models.Page;
const Series = app.models.Series;

/**
 * 1. Scan a folder
 * 2. If folder name matches pattern, import to database, end (because a manga folder must not contain other manga)
 * 3. If name doesn't match pattern and there is no request to include sub folders, end
 * 4. If name doesn't match pattern and there is a request to include sub folders, start the whole process with each sub folder.
 */
let i = 0;
let r = 0;
async function scanFolder(folderPath, recursive = false, callback) {
  if (hasValidName(folderPath)) {
    await importContent(folderPath, callback);
  } else {
    const folders = folder.getChildren(folderPath).folders;
    // if use array.map here, the recursive
    for (let i = 0; i < folders.length; i++) {
      await scanFolder(folders[i], recursive, callback);
    }
  }
}

function hasValidName(folderPath) {
  const folderName = path.parse(folderPath).base.split('/').pop();
  const namePattern = /([^,.]+),([^,.]+)/;
  const matches = namePattern.exec(folderName);
  return matches !== null;
}

async function importContent(folderPath, callback) {
  const folderName = path.parse(folderPath).base.split('/').pop();
  const authorName = folderName.split(',')[0];
  const bookName = folderName.split(authorName + ',')[1];
  const timeStamp = new Date().toISOString().replace(/T/, ' ')
    .replace(/\..+/, '');
  console.log(`${chalk.yellow(timeStamp)} - ` +
    `${chalk.bold('Author:')} ${authorName}. ` +
    `${chalk.bold('Manga:')} ${bookName}`);

  try {
    const author = await createAuthor(authorName);
    if (author[1]) console.log(`  Author ${author[0].name} created!`);
    else console.log(chalk.gray(
      '  Author already exists in database.'));
    const manga = await createManga(bookName, author[0].id);
    if (manga[1]) console.log(`  Manga ${manga[0].title} created!`);
    else console.log(chalk.gray(
      '  Manga already exists in database.'));
  } catch (err) {
    console.log(err.sqlMessage);
  }
}

function createAuthor(authorName) {
  return Author.findOrCreate(
    {where: {name: authorName}},
    {name: authorName}
  );
}

function createManga(bookTitle, authorId) {
  return Manga.findOrCreate(
    {where: {title: bookTitle, authorId: authorId}},
    {title: bookTitle, authorId: authorId}
  );
}

module.exports = {scanFolder};
