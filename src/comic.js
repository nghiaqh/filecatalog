/**
 * 1. Scan a folder
 * 2. If folder name matches pattern, import to database, end (because a comic folder must not contain other comic)
 * 3. If name doesn't match pattern and there is no request to include sub folders, end
 * 4. If name doesn't match pattern and there is a request to include sub folders, start the whole process with each sub folder.
 */
const folder = require('./folder')
const path = require('path')

function scanContent (folderPath, recursive = false) {
  if (hasValidName(folderPath)) {
    importContent(folderPath)
  } else {
    folder.getChildren(folderPath).folders.map(item => scanContent(item))
  }
}

function hasValidName (folderPath) {
  const folderName = path.parse(folderPath).base.split('/').pop()
  const namePattern = /([^,.]+),([^,.]+)/
  const matches = namePattern.exec(folderName)
  return matches !== null
}

function importContent (folderPath) {
  const folderName = path.parse(folderPath).base.split('/').pop()
  const authorName = folderName.split(',')[0]
  const bookName = folderName.split(authorName + ',')[1]
  console.log(`Author: ${authorName}. Book: ${bookName}`)
}

module.exports = { scanContent }
