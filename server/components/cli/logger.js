const winston = require('winston');
const chalk = require('chalk');

function getTimeStamp() {
  return new Date().toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, '');
}

function formatMessage(input) {
  const ts = `[${chalk.yellow(getTimeStamp())}]`;
  let level = chalk.green(input.level);
  switch(input.level) {
    case 'error':
      level = chalk.red(input.level);
      break;
    case 'warn':
      level = chalk.orange(input.level);
      break;
    case 'debug':
      level = chalk.yellow(input.level);
  }

  return `${ts} ${level}: ${input.message}
    ${input.stack ? input.stack : ''}`
    .trim();
}

const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({filename: 'error.log', level: 'error'}),
    new winston.transports.File({filename: 'debug.log', level: 'debug'}),
    new winston.transports.Console({
      format: winston.format.printf(formatMessage)
    })
  ],
});


module.exports = logger;
