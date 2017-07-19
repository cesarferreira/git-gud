const meow = require('meow');
const lib = require('./index.js');

const cli = meow(`
	Usage
	  $ git-good <command>
	Examples
	  $ git-good open 					# opens repo page
	  $ git-good issues 				# opens issues page
	  $ git-good prs 						# opens pull requests page
	  $ git-good pr 						# opens current pull request page
	  $ git-good releases 			# opens releases page
	  $ git-good branches 			# opens branches page
	  $ git-good wiki 					# opens wiki page
	  $ git-good settings 			# opens settings page
	  $ git-good contributors		# opens contributors page
	  $ git-good new-pr 				# opens new pull request page

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
	'new-pr' // https://github.com/user/repo/compare?expand=1
];

if (cli.input.length > 0 && possibleCommands.indexOf(cli.input[0]) !== -1) {
	lib.hello(cli.input[0]);
} else {
	cli.showHelp(2);
}
