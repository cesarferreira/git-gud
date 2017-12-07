const Chalk = require('chalk');
const log = console.log;
const opn = require('opn');
const repoName = require('git-repo-name');
const gitUsername = require('git-username');
const GitBranch = require('git-branch');
const GitHubApi = require('github');

const possibleCommands = require('./commands.json');

function getProperURL(item) {
	return item.url
			.replace('{user}', item.user)
			.replace('{repo}', item.repo)
			.replace('{id}', item.id)
			.replace('{jira_ticket_number}', item.jira_ticket_number)
			.replace('{branch}', item.branch);
}

function getCommandFromArray(command) {
	command = command.join(' ')
	const found = possibleCommands.filter(item => item.command == command);
	return found.length === 0 ? {} : found[0];
}

function open(url) {
	opn(url, {wait: false});
}

function openWithTemplate(urlTemplate, message) {
	const url = getProperURL(urlTemplate);
	log(`${Chalk.green(message)}: ${url}`);
	open(url);
}

function getPullRequest(username, repo, branch) {
	const github = new GitHubApi({debug: false});

	const token = process.env.GIT_GUD;

	if (token) {
		github.authenticate({
			type: 'basic',
			username,
			password: token
		});
	}

	return github.pullRequests.getAll({
		owner: username,
		repo
	})
	.then(response => {
		const parsedArray = response.data;
		let returnValue = -1;

		parsedArray.forEach(item => {
			if (item.head.ref === branch) {
				returnValue = item;
				return;
			}
		});

		return returnValue;
	})
	.catch(err => log(err));
}

function getJiraTicketNumber(branchName) {
	return new Promise((resolve, reject) => {
		if (branchName.toLowerCase().indexOf('ngdev') === -1) {
			reject('no NGDEV found')
		}
		
		const found = branchName.match(/(ngdev-\d+(\.\d)*)/i);
		const foundIt = found !== null && found.length > 0 && found[0] !== undefined;
		
		if (foundIt) {
			resolve(found[0].toUpperCase())
		} else {
			reject(`Can't find NGDEV`);
		}
	});
}

function currentPullRequest(username, repository, branch) {
	return new Promise((resolve, reject) => {
		getPullRequest(username, repository, branch)
		.then(pr => {
			if (pr.number < 1 || !pr.number) {
				const errorMessage = 'Something went wrong while getting the pull request number, are you:'
				+'\n- Trying to access a private repo that you don\'t have access to?'
				+'\n- Looking for a repo that doesn\'t have a pull request created yet?'

				+ `\n\nRead the README to learn how to set it up https://github.com/cesarferreira/git-gud#readme`
				reject(errorMessage);
			} else {
				resolve(pr);
			}
		});
	});
}

// Main code //
module.exports = {
	isValidCommand: command => {
		const result = getCommandFromArray(command);
		return Object.keys(result).length !== 0;
	},
	init: input => {
		const branch = GitBranch.sync();
		const username = gitUsername();
		const repository = repoName.sync();

		const task = getCommandFromArray(input);
		const urlTemplate = {url: task.url, user: username, repo: repository, branch: branch};

			// PR
		if (task.command === 'pr') {
			currentPullRequest(username, repository, branch)
				.then(pr => {
					urlTemplate.id = pr.number;
					openWithTemplate(urlTemplate, task.message);
				})
				.catch(err => log(err));
		
			// JENKINS
		} else if(task.command === 'jenkins') {
			currentPullRequest(username, repository, branch)
			.then(pr => {
				urlTemplate.id = pr.number;
				openWithTemplate(urlTemplate, task.message);
			})
			.catch(err => log(err));
		
			// JIRA
		} else if(task.command === 'jira') {
			currentPullRequest(username, repository, branch)
			.then(pr => {
				getJiraTicketNumber(pr.head.ref)
				.then(jiraTicket => {
					urlTemplate.jira_ticket_number = jiraTicket;
					openWithTemplate(urlTemplate, task.message);
				})
				.catch(err => log(err));				
			})
			.catch(err => log(err));
		
			// anything else
		} else {
			openWithTemplate(urlTemplate, task.message);
		}
	}
};
