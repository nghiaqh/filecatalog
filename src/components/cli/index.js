/**
 * 1. Ask user about folder path
 * 2. Ask user to select content type
 * 3. Ask if user wants to include sub folder
 * 4. Call content type processor
 */
const chalk = require('chalk')
const figlet = require('figlet')
const inquirer = require('inquirer')
const fs = require('fs')
const manga = require('./manga')

function start () {
  console.log(chalk.yellow(figlet.textSync(
    'File Catalog',
    { horizontalLayout: 'full' }
  )))

  askQuestions()
}

async function askQuestions () {
  const questions = [
    {
      name: 'path',
      type: 'input',
      message: 'Enter the folder path that you want to import files to database:',
      validate: function (value) {
        const isValid = value.length && fs.statSync(value).isDirectory()
        return isValid ? true : 'Please enter a valid folder path'
      }
    },
    {
      name: 'contentType',
      type: 'list',
      message: 'What type of content is in this folder?',
      choices: [ 'manga' ]
    },
    {
      name: 'includeSubFolder',
      type: 'confirm',
      message: 'Do you want to scan the sub folders?'
    }
  ]

  const input = await inquirer.prompt(questions)
  process(input)

  const next = await inquirer.prompt([{
    name: 'importAnother',
    type: 'confirm',
    message: 'Do you want to import other folder?'
  }])

  if (next.importAnother) {
    askQuestions()
  } else {
    console.log(chalk.green('Ciao!\n'))
  }
}

function process (input) {
  if (input.contentType === 'manga') {
    manga.scanContent(input.path, input.includeSubFolder)
  }

  console.log(chalk.green('Completed!\n'))
}

module.exports = { start }
