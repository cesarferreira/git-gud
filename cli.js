#!/usr/bin/env node
'use strict';

const meow = require('meow');
const lib = require('./index.js');

const cli = meow(`
 Usage
   $ git-good <command>
   
 Examples
   $ git-good pr             # opens current pull request page
   $ git-good new-pr         # opens new pull request page
   $ git-good prs            # opens pull requests page
   $ git-good open           # opens repo page
   $ git-good issues         # opens issues page
   $ git-good branches       # opens branches page   
   $ git-good releases       # opens releases page
   $ git-good wiki           # opens wiki page
   $ git-good settings       # opens settings page
   $ git-good contributors   # opens contributors page`,
{});

if (cli.input.length > 0 && lib.isValidCommand(cli.input[0])) {
	lib.init(cli.input[0]);
} else {
	cli.showHelp(2);
}
