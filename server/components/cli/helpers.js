const winston = require('winston');
const fs = require('fs');
const path = require('path');

const logger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({filename: 'error.log', level: 'error'}),
  ],
});

/**
 * Get file and folder names inside a directory
 * Returned data sorts folder by created time.
 *
 * @param {String} folderPath a directory path
 */
function getFolderItems(folderPath) {
  const folders = [];
  const files = [];

  fs.readdirSync(folderPath).forEach(item => {
    try {
      const itemPath = path.join(folderPath, item);
      if (fs.statSync(itemPath).isDirectory()) {
        folders.push(itemPath);
      } else if (fs.statSync(itemPath).isFile()) {
        files.push(itemPath);
      }
    } catch (error) {
      console.error(error);
      logger.log({
        level: 'error',
        message: 'Helpers error: ' + error,
      });
    }
  });

  return {
    files: files,
    folders: folders.sort(isNewer),
  };
};

function isNewer(a, b) {
  return fs.statSync(b).mtime.getTime() - fs.statSync(a).mtime.getTime();
}

/**
 * Return true if input is a valid folder path
 * @param {String} value a folder path
 */
function isValidFolder(value) {
  value = value.trim();
  const isValid = value.length && fs.statSync(value).isDirectory();
  return isValid ? true : 'Enter a valid folder path';
}

/**
 * Return all images file inside a folder
 * @param {String} folder path to a directory
 */
function findImages(folder) {
  const files = getFolderItems(folder).files;
  const imgRe = /.*\.(jpg|jpeg|png|gif)$/;
  return files.filter(file => imgRe.exec(file));
}

/**
 * Flatten an array
 * @param {Array} input a nested array
 */
function flatten(list) {
  if (!Array.isArray(list)) return list;
  return list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
}

function displayMillisec(millisec) {
  let seconds = (millisec / 1000).toFixed(0);
  let minutes = Math.floor(seconds / 60);
  let hours = '';
  if (minutes > 59) {
    hours = Math.floor(minutes / 60);
    hours = (hours >= 10) ? hours : '0' + hours;
    minutes = minutes - (hours * 60);
    minutes = (minutes >= 10) ? minutes : '0' + minutes;
  }

  seconds = Math.floor(seconds % 60);
  seconds = (seconds >= 10) ? seconds : '0' + seconds;
  if (hours != '') {
    return hours + ':' + minutes + ':' + seconds;
  }
  return minutes + ':' + seconds;
}

module.exports = {
  logger,
  isValidFolder,
  getFolderItems,
  findImages,
  flatten,
  displayMillisec,
};
