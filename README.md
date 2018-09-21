# avrillon.me

## Installation

`yarn install`

## Use

- `yarn start`: start a webpack dev server available [here](http://localhost:9000). You have the possibility to start a dev or a prod server with `start:dev` or `start:prod`. By default it's `dev`.
- `yarn build`: build sources to `dist` folder. You have the possibility to build dev or a prod sources with `build:dev` or `build:prod`. By default it's `prod`.
- `yarn lint`: lint all your sources
- `yarn format`: format your sources to correct lint errors (scss + js)

## Deployment

- `yarn deploy <tag>`: deploy built project with the given tag to Github Pages.
- `yarn release [major|minor|patch]` create a release tag and deploy it.

# TODO

- move to typescript
- dom checker ? A11y, etc.
- select font
- check SEO
- check A11Y
- check W3C
- check perf
- tests size compressed/not compressed
