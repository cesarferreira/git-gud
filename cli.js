const meow = require('meow');
const readme = require('./index.js');

const cli = meow(`
	Usage
	  $ git-good <username/repo>
	Examples
	  $ git-good cesarferreira/assets
	  🌈 unicorns 🌈
`, {});

const possibleCommands = [
  'open', // https://github.com/user/repo
  'issues', // https://github.com/user/repo/issues
  'prs', // https://github.com/user/repo/pulls
  'pr', // https://github.com/user/repo/pull/85 # find out which one
  'releases', // https://github.com/user/repo/releases
  'branches', // https://github.com/user/repo/branches
  'wiki', // https://github.com/user/repo/wiki
  'settings', // https://github.com/user/repo/settings
  'contributors', // https://github.com/user/repo/graphs/contributors
  'open-pr', // https://github.com/user/repo/compare?expand=1
];

if (cli.input.length > 0 &&possibleCommands.indexOf(cli.input[0]) !== -1) {
  console.log(`Gonna run: ${cli.input[0]}`)
	// readme.download(csv[0], csv[1]);
} else {
	cli.showHelp(2);
}