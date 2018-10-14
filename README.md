Koala is a web application that allows you to view the information about family trees in different ways.

> Koala is not the official name of the app. It's only for the alpha phase.

## Prerequisites

- [Node](https://nodejs.org) (it is recommendd to install it via [NVM](https://github.com/creationix/nvm))
- [Yarn](https://yarnpkg.com/)

## Getting started

1. Clone this repo, `git clone git@github.com:stivaugoin/koala.git`
2. Go to project's root directory, `cd koala`
3. Run `yarn` to install dependencies
4. Run `yarn start` to start application

## Scripts

See `package.json`

## Flow

This project use [Flow](https://flow.org) to checks code for errors through static type annotations.

- Run checker: `yarn flow`

## Contributing

**Never** commit directly on master, instead use branches and pull requests.

This projet use [Prettier](https://prettier.io/) to format code.

We recommend using VSCode with these extensions:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Flow Language Support](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode)
