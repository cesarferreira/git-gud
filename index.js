const Chalk = require('chalk');
const log = require('node-time-log').SimpleLog;
const opn = require('opn');
const repoName = require('git-repo-name');
const gitUsername = require('git-username');
const branch = require('git-branch');
const GitHubApi = require("github");

let mUsername = '';
let mRepository = '';
let mBranch = '';

const possibleCommands = [
	{command: 'open', url: 'https://github.com/{user}/{repo}'},
	{command: 'issues', url: 'https://github.com/{user}/{repo}/issues'},
	{command: 'prs', url: 'https://github.com/{user}/{repo}/pulls'},
	{command: 'pr', url: 'https://github.com/{user}/{repo}/pull/{id}'},
	{command: 'releases', url: 'https://github.com/{user}/{repo}/releases'},
	{command: 'branches', url: 'https://github.com/{user}/{repo}/branches'},
	{command: 'wiki', url: 'https://github.com/{user}/{repo}/wiki'},
	{command: 'settings', url: 'https://github.com/{user}/{repo}/settings'},
	{command: 'contributors', url: 'https://github.com/{user}/{repo}/graphs/contributors'},
	{command: 'new-pr', url: 'https://github.com/{user}/{repo}/compare/{branch}?expand=1'}
];

function getProperURL(item) {
	return item.url
			.replace('{user}', item.user)
			.replace('{repo}', item.repo)
			.replace('{id}', item.id)
			.replace('{branch}', item.branch);
}

function getCommandFromArray(command) {
	const found = possibleCommands
		.filter(item => {
			return item.command === command;
		});
	return found.length === 0 ? {} : found[0];
}

function open(url) {
	opn(url, {wait: false}).then(() => {
		log(`Opened: ${Chalk.green(url)}!`);
	});
}

function getPullRequestID(username, repo, branch) {

	const github = new GitHubApi({
			debug: false
	});

	const token = process.env.GIT_GOOD;

	if (token) {
		github.authenticate({
			type: "basic",
			username: username,
			password: token
		});
	}

	return github.pullRequests.getAll({
		owner: username,
		repo: repo
	})
	.then(response => {
		const parsedArray = response.data;
		let returnValue = -1;

		parsedArray.forEach(item => {
			if (item.head.ref === branch) {
				returnValue = item.number;
			}
		});

		return returnValue;
	})
	.catch(err => {
		console.log(err);
	});
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

		let properUrl;
		const urlTemplate = {url: result.url, user: mUsername, repo: mRepository, branch: mBranch};
		if (command === 'pr') {
			getPullRequestID(mUsername, mRepository, mBranch)
				.then(id => {
					if (id < 1 || !id) {
						console.log(`${Chalk.red('something went wrong while getting the id, are you trying to access a private repo?\nread the README on the webpage to learn how to set it up')}\nhttps://github.com/cesarferreira/git-good#readme`);
					} else {
						urlTemplate.id = id;
						properUrl = getProperURL(urlTemplate);
						open(properUrl);
					}
				});
		} else {
			properUrl = getProperURL(urlTemplate);
			open(properUrl);
		}
	}
};
