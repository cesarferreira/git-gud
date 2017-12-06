#!/usr/bin/env node
'use strict';

const meow = require('meow');
const lib = require('./app.js');

const cli = meow(`
 Usage
   $ gud <command>

 Examples
   $ gud pr             # opens current pull request page
   $ gud new pr         # opens new pull request page
   $ gud prs            # opens pull requests page
   $ gud open           # opens repo page
   $ gud issues         # opens issues page
   $ gud branches       # opens branches page   
   $ gud releases       # opens releases page
   $ gud wiki           # opens wiki page
   $ gud settings       # opens settings page
   $ gud contributors   # opens contributors page
`,
{});

if (cli.input.length > 0 && lib.isValidCommand(cli.input[0])) {
	lib.init(cli.input[0]);
} else {
	cli.showHelp(2);
}
