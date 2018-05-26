const cli = require('./components/cli')

// clear terminal
process.stdout.write('\x1b[2J')
cli.start()
