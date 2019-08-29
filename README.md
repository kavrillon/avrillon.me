# avrillon.me test

## Installation

`yarn install`: install all dependencies

## Use

- `yarn start`: start a webpack dev server available [here](http://localhost:9000). You have the possibility to start a dev or a prod server with `start:dev` or `start:prod`. By default it's `dev`. You can see what is built [here](http://localhost:9000/webpack-dev-server)
- `yarn build`: build sources to `dist` folder. You have the possibility to build dev or a prod sources with `build:dev` or `build:prod`. By default it's `prod`.
- `yarn lint`: lint all your sources
- `yarn format`: format your sources to correct lint errors (scss + js)
- `yarn test`: test everything (requires Docker)
- `yarn validate`: validate visual changes when needed

## Testing

There are some e2e tests running with Puppeeter (screenshot validation).
To avoid visual differences between environments (especially with [font rendering](https://www.smashingmagazine.com/2012/04/a-closer-look-at-font-rendering/)), e2e tests are running on Docker, so you'll need to install it if you want to run them on your side with `yarn test`.  
These tests will be ran the same way on the CI (with CircleCI), it guaranty consistency on screenshots.
You can still run them on your side if you really really need it: `yarn test:e2e`.

## Deployment

- `yarn deploy [tag]`: deploy built project with the given tag to Github Pages.
- `yarn release [major|minor|patch]` create a release tag and deploy it.

## Links

- https://meowni.ca/posts/2017-puppeteer-tests/
- https://github.com/redbadger/Puppeteer-lighthouse-jest/blob/master/tests/lighthouse.test.js
- Some Puppeteer samples: https://github.com/checkly/puppeteer-examples
- Favicon generator: https://realfavicongenerator.net
