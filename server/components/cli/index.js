const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const fs = require('fs');
const manga = require('./manga');

/**
 * 1. Ask user about folder path
 * 2. Ask user to select content type
 * 3. Ask if user wants to include sub folder
 * 4. Call content type processor
 */
async function start(process) {
  console.log(chalk.yellow(figlet.textSync(
    'File Catalog',
    {horizontalLayout: 'full'}
  )));

  let loop = {
    continue: true,
  };

  while (loop.continue) {
    let input = await askQuestions();
    await proceed(input);
    loop = await inquirer.prompt([{
      name: 'continue',
      type: 'confirm',
      message: 'Do you want to import another folder?',
    }]);
  }

  console.log(chalk.green('Ciao!\n'));
  process.exit(1);
}

async function askQuestions() {
  const questions = [
    {
      name: 'path',
      type: 'input',
      message: 'Enter the folder path to import files:',
      validate: function(value) {
        value = value.trim();
        const isValid = value.length && fs.statSync(value).isDirectory();
        return isValid ? true : 'Please enter a valid folder path';
      },
    },
    {
      name: 'contentType',
      type: 'list',
      message: 'What type of content is in this folder?',
      choices: ['manga'],
    },
    {
      name: 'skipExistingRecords',
      type: 'confirm',
      message: 'Do you want to skip existing records?',
    }
  ];

  return inquirer.prompt(questions);
}

async function proceed(input) {
  if (input.contentType === 'manga') {
    console.log('Importing mangas ...');
    await manga.scanFolder(input.path.trim(), input.skipExistingRecords);
  }
  console.log(chalk.green('Completed!'));
}

module.exports = {start};
