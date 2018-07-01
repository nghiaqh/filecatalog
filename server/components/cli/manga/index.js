const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');
const scanner = require('./scanner');
const {flatten, isValidFolder, logger} = require('../helpers');

function start(process) {
  console.log(chalk.yellow(figlet.textSync(
    'Manga Catalog',
    {horizontalLayout: 'full'}
  )));
  main(process);
}

async function main(process) {
  let input = await askQuestions();
  const timeStamp = new Date().toISOString().replace(/T/, ' ')
    .replace(/\..+/, '');
  console.log(`${chalk.yellow(timeStamp)} - Importing mangas...`);
  let result = scanner.scan(input);
  result = flatten(result);

  if (!Array.isArray(result)) {
    result.then(promises => Promise.all(promises))
      .then(printResult)
      .then(continueOrQuit)
      .catch(handleError);
  } else {
    Promise.all(result.map(async x => {
      return x.then(promises => Promise.all(promises));
    }))
    .then(res => res.forEach(printResult))
    .then(continueOrQuit)
    .catch(handleError);
  }
}

/**
 * Ask questions and return answers:
 * @return {String} folder
 * @return {Boolean} newOnly
 * @return {Integer} limit
 */
async function askQuestions() {
  const questions = [
    {
      name: 'folder',
      type: 'input',
      message: 'Starting folder:',
      validate: isValidFolder,
    },
    {
      name: 'newOnly',
      type: 'confirm',
      message: 'Skip imported folder?',
      default: false,
    },
    {
      name: 'limit',
      type: 'input',
      message: 'Limit number of subfolders?',
      default: 0,
      validate: (value) => {
        value = value ? value.trim() : value;
        const isValid = /^\+?(0|[1-9]\d*)$/.test(value);
        return isValid ? true : 'Enter a number';
      },
    },
  ];

  return inquirer.prompt(questions);
}

async function continueOrQuit() {
  const answer = await inquirer.prompt([{
    name: 'continue',
    type: 'confirm',
    message: 'Do you want to import another folder?',
  }]);
  if (!answer.continue) {
    console.log(chalk.green('Ciao!\n'));
    process.exit(1);
  } else {
    main(process);
  }
}

function printResult(res) {
  if (!res.length) return;
  const timeStamp = new Date().toISOString().replace(/T/, ' ')
    .replace(/\..+/, '');
  console.log(`${chalk.yellow(timeStamp)} - ` +
    `${chalk.bold('Author:')} ${res[0]}. ` +
    `${chalk.bold('Manga:')} ${res[1]}. ` +
    `${chalk.bold('Pages:')} ${res.length - 2}`);
}

function handleError(err) {
  console.error(err);
  logger.log({
    level: 'error',
    message: err,
  });
  process.exit(1);
}

module.exports = {start};
