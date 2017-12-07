# git-gud
> Tool to enhance your github workflow

<p align="center">
  <img src="extras/both_crop.png" width="100%" />
</p>

[![Build Status](https://travis-ci.org/cesarferreira/git-gud.svg?branch=master)](https://travis-ci.org/cesarferreira/git-gud)
[![npm](https://img.shields.io/npm/dt/git-gud.svg)](https://www.npmjs.com/package/git-gud)
[![npm](https://img.shields.io/npm/v/git-gud.svg)](https://www.npmjs.com/package/git-gud)

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
```

## Acessing private repositories
If you want to access private repositories all you need to do is to create a **Personal API token** (instructions [here](https://github.com/blog/1509-personal-api-tokens))

Once you got it just export it in your bash/zsh/fish profile.

``` bash
export GIT_GOOD=<your-token-here>
```

## Created by
[Cesar Ferreira](https://cesarferreira.com)

## License
MIT © [Cesar Ferreira](http://cesarferreira.com)
