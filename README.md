# git-gud
> Tool to enhance your github workflow


<p align="left">
  <a href="https://travis-ci.org/cesarferreira/git-gud"><img src="https://travis-ci.org/cesarferreira/git-gud.svg?branch=master" alt="Build Status"></a>
  <a href="https://www.npmjs.com/package/git-gud"><img src="https://img.shields.io/npm/dt/git-gud.svg" alt="npm"></a>
  <a href="https://www.npmjs.com/package/git-gud"><img src="https://img.shields.io/npm/v/git-gud.svg" alt="npm"></a>
  <a href="https://github.com/cesarferreira/git-gud/blob/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
</p>

<p align="center">
  <img src="extras/overlapping_cut.png" width="100%" />
</p>

## Install

```sh
npm install -g git-gud
```

## Usage

**Highlights:**

- **`$ gud pr`**: 
	- when you're in a project with dozens of `pull requests` it's tiresome to go to github and find which one is yours to check if something new is up, this will find the pull request number in which your current branch and open the page for you. 
- **`$ gud new pr`**: 
	- it's a tedious job to go to github, create new `pull request` and find the branch you've been working on and compare it to `develop`, this will automate it for you based on the branch you're currently on.

```
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

   $ gud jira           # opens the JIRA ticket page
   $ gud jenkins        # opens the jenkins job page
```

## Acessing private repositories
If you want to access private repositories or the API limit has been reached, all you need to do is to create a **Personal API token** (instructions [here](https://github.com/blog/1509-personal-api-tokens))

Give it the all the `repo` permissions and you're good to go!

Once you got it just export it in your `bash`/`zsh`/`fish` profile.

```bash
export GIT_GUD=<your-token-here>
```

## Created by
[Cesar Ferreira](https://cesarferreira.com)

## License
MIT © [Cesar Ferreira](http://cesarferreira.com)
