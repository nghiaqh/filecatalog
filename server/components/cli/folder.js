const fs = require('fs');
const path = require('path');

function getChildren(folderPath) {
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
    }
  });

  return {
    files: files,
    folders: folders.sort(isNewer),
  };
}

function isNewer(a, b) {
  return fs.statSync(b).mtime.getTime() - fs.statSync(a).mtime.getTime();
}

module.exports = {getChildren};
