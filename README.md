# avrillon.me

[![Build Status](https://travis-ci.com/kavrillon/avrillon.me.svg?branch=master)](https://travis-ci.com/kavrillon/avrillon.me)

## Installation

`yarn install`: install all dependencies

## Use

- `yarn start`: start a webpack dev server available [here](http://localhost:9000). You have the possibility to start a dev or a prod server with `start:dev` or `start:prod`. By default it's `dev`.
- `yarn build`: build sources to `dist` folder. You have the possibility to build dev or a prod sources with `build:dev` or `build:prod`. By default it's `prod`.
- `yarn lint`: lint all your sources
- `yarn format`: format your sources to correct lint errors (scss + js)

## Deployment

- `yarn deploy <tag>`: deploy built project with the given tag to Github Pages.
- `yarn release [major|minor|patch]` create a release tag and deploy it.

## Links

- https://meowni.ca/posts/2017-puppeteer-tests/
- https://github.com/redbadger/Puppeteer-lighthouse-jest/blob/master/tests/lighthouse.test.js
- Some Puppeteer samples: https://github.com/checkly/puppeteer-examples
