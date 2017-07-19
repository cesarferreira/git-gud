const Chalk = require('chalk');
const log = require('node-time-log').SimpleLog;

// Main code //
module.exports = {
	hello: () => {
		log(`Hello ${Chalk.green('world')}!`);
	}
};
