const Chalk = require('chalk');
const log = require('node-time-log').SimpleLog;
const opn = require('opn');
const repoName = require('git-repo-name');
const gitUsername = require('git-username');
const branch = require('git-branch');

let mUsername = '';
let mRepository = '';
let mBranch = '';

const possibleCommands = [
	{command: 'open', url: 'https://github.com/{user}/{repo}'},
	{command: 'issues', url: 'https://github.com/{user}/{repo}/issues'},
	{command: 'prs', url: 'https://github.com/{user}/{repo}/pulls'},
	{command: 'pr', url: 'https://github.com/{user}/{repo}/pull/85'}, //  # find out which one
	{command: 'releases', url: 'https://github.com/{user}/{repo}/releases'},
	{command: 'branches', url: 'https://github.com/{user}/{repo}/branches'},
	{command: 'wiki', url: 'https://github.com/{user}/{repo}/wiki'},
	{command: 'settings', url: 'https://github.com/{user}/{repo}/settings'},
	{command: 'contributors', url: 'https://github.com/{user}/{repo}/graphs/contributors'},
	{command: 'new-pr', url: 'https://github.com/{user}/{repo}/compare?expand=1'}
];

function getProperURL(url, user, repo) {
	return url.replace('{user}', user).replace('{repo}', repo);
}

function getCommandFromArray(command) {
	const found = possibleCommands
		.filter(item => {
			return item.command === command;
		});
	return found.length === 0 ? {} : found[0];
}

function open(url) {
	opn(url).then(() => {
		log(`opened: ${Chalk.green(url)}!`);
	});
}

function merda(params) {
	// curl https://api.github.com/repos/github/hub/pulls
	// https://github.com/github/hub/pull/1498
}

// Main code //
module.exports = {
	isValidCommand: command => {
		const result = getCommandFromArray(command);
		return Object.keys(result).length !== 0;
	},
	init: command => {
		mBranch = branch.sync();
		mUsername = gitUsername();
		mRepository = repoName.sync();

		const result = getCommandFromArray(command);

		log(`${mUsername}/${mRepository} - ${mBranch}`);
		const properUrl = getProperURL(result.url, mUsername, mRepository);

		open(properUrl);
	}
};
