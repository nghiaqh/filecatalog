const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const {getFolderItems, findImages, logger} = require('../helpers');
const {Author, Genre, Manga, Page, Series} = require('../models');
/**
 * Verify folder name against the pattern /([^,.]+),([^,.]+)/
 * @param {String} folderPath
 */
function hasValidName(folder) {
  try {
    const name = path.parse(folder).base.split('/').pop();
    const pattern = /([^,.]+),([^,.]+)/;
    const matches = pattern.exec(name);
    return matches !== null;
  } catch (e) {
    return false;
  }
}

/**
 * Recursively scan and import data from folder name and its files.
 * @param {Object} input contains 3 below attributes
 * @param {String} folder path to a directory
 * @param {Boolean} newOnly true to only import new content
 * @param {Integer} limit 0 = import all sub folders, !0 = import {limit}
 */
function scan(input) {
  const {folder, newOnly, limit} = input;

  if (hasValidName(folder)) {
    return createContent(folder, newOnly)
      .then(promises => Promise.all(promises))
      .then(printResult)
      .then(() => new Promise(resolve => resolve(1)));
  }

  let {folders} = getFolderItems(folder);
  folders.pop(limit ? folders.length - limit : 0);

  return folders.map(folder =>
    scan({folder, newOnly, limit})
  );
}

// Return an array of Promises resolve [author, mangas, pages]
async function createContent(folder, newOnly) {
  const mtime = fs.statSync(folder).mtime;
  const images = findImages(folder);

  if (!images.length) return;

  const name = path.parse(folder).base.split('/').pop();
  let authorName = name.split(',')[0];
  const bookTitle = name.split(authorName + ',')[1].trim();
  authorName = authorName.trim();

  const a = await Author.findOrCreate(
    {where: {name: authorName}},
    {name: authorName}
  );
  const author = a[0];

  const m = await Manga.findOrCreate(
    {where: {title: bookTitle, authorId: author.id}},
    {title: bookTitle, authorId: author.id, created: mtime}
  );
  const manga = m[0];
  const newManga = m[1];
  manga.updateAttribute('coverPicture', images[0]);
  manga.save();

  let promises = [
    new Promise(resolve => resolve(author.name)),
    new Promise(resolve => resolve(manga.title)),
  ];

  if (newOnly && !newManga) {
    return promises;
  }

  const timeStamp = new Date().toISOString().replace(/T/, ' ')
    .replace(/\..+/, '');
  console.log(`${chalk.yellow(timeStamp)} - Found: ${manga.title} ` +
    `by ${author.name}`);

  await Page.destroyAll({mangaId: manga.id});
  return promises.concat(createPages(images, manga));
}

function createPages(images, manga) {
  return images.map((img, index) => {
    const title = path.parse(img).base.split('/').pop().trim();
    return new Promise((resolve, reject) => {
      const data = {
        title: title,
        uri: img,
        mangaId: manga.id,
        number: index + 1,
      };
      const filter = {
        where: data,
      };
      const callback = (err, page, created) => {
        if (err) reject(err);
        resolve(page);
      };
      Page.findOrCreate(filter, data, callback);
    });
  });
}

function printResult(res) {
  if (!res.length) return;
  const timeStamp = new Date().toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, '');
  console.log(chalk.green(`${timeStamp} - Imported: ${res[1]} by ${res[0]} - ${res.length - 2} pages`));
}

module.exports = {scan};
