# Steps creating this modules

## 1. Setup Repository

- create new repository for the projects
- add descriptions and MIT license
- init NPM project by executing `npm init -y`
- adjust package.json data to match your project

## 2. Setup Linter

- create a config with command `npm init @eslint/config`, and fill some prompt:
  - How would you like to use ESLint? 'to check syntax and find problems'
  - What type of modules does your project use? 'CommonJS'
  - Which framework does your project use? 'None of these'
  - Does your project use TypeScript? 'yes'
  - Where does your code run? 'Browser'
  - What format do you want your config file to be in? 'JSON'
- later it will ask you if you want to install necessary dependency for the project

## 3. Setup typescript and eslint config airbnb

- install typescript `yarn add -D typescript`
- add config `tsc --init`
- add `"project": "./tsconfig.json"` in eslintrc
- install eslint config airbnb for style guide (just use the popular one) with command `npx install-peerdeps --dev eslint-config-airbnb-base`
- it will then ask if you want to install with yarn or npm, and install dependencies needed
- install config for typescript `yarn add -D eslint-config-airbnb-typescript`
- adjust `.eslintrc.json`

```json
"extends": [
  "airbnb-base",
  "airbnb-typescript/base"
],

"parserOptions": {
  "ecmaVersion": "latest",
  "project": "./tsconfig.json" --> this
},
```

- adjust `tsconfig.json` add `"rootDir": "./src"` and `"outDir": "./dist"`

## 4. Setup scripts to run eslint

- add script `"lint": "eslint **/*.ts"` to check error only
- and `"lint:fix": "eslint **/*.ts --fix"` to also fix error and code style

## 5. Setup Prettier

- install dependencies with command `yarn add -D prettier eslint-config-prettier eslint-plugin-prettier`
- adjust `.eslintrc`

```json
"extends": [
  "airbnb-base",
  "airbnb-typescript/base",
  "plugin:prettier/recommended"
]
```

## 6. Setup pre-commit using husky, lint-staged and pretty-quick

- install dependencies `yarn add -D husky lint-staged pretty-quick`
- add prepare script to install husky in package.json `"prepare": "husky install"`
- run installer script `yarn prepare`
- add lint-staged config

```json
"lint-staged": {
  "*.ts": [
    "eslint --fix",
    "pretty-quick --staged"
  ]
},
```

- edit `lint:fix` to `"lint:fix": "lint-staged"`
- create a pre commit hooks `yarn husky add .husky/pre-commit "yarn lint:fix"`
- now every time you do a commit, it will fix style based on eslint and prettier config
  - like string + number will be fixed by eslint to use literals but prettier dont care

## 7. setup Rollup

- install necessary dependencies `yarn add -D rollup @rollup/plugin-typescript`
  - warning rolluup need typescript to produce ES modules. i think it means after typescript compiles, rollup will handle module changing
  - tsconfig module -> module used in output like cjs es amd etc
  - tsconfig target -> language variant like ES5 (use var yet) ES6 (can use const let)
- create `rollup.config.js` file, building 3 kind of module

```js
import typescript from '@rollup/plugin-typescript';

const dist = 'dist';
const bundle = 'bundle';

export default {
  input: 'src/index.ts',
  output: [
    {
      format: 'umd',
      name: 'showFrameModal',
      file: `${dist}/${bundle}.umd.js`,
    },
    {
      format: 'es',
      file: `${dist}/${bundle}.es.js`,
    },
    {
      format: 'cjs',
      file: `${dist}/${bundle}.cjs.js`,
    },
  ],
  plugins: [typescript()],
};
```

- add build script `"build": "rollup --config",` in package.json
- additional, add rimraf for delete created folder `yarn add -D rimraf`. then edit package.json `"prebuild": "rimraf dist"`
- add `.eslintignore` and `.prettierignore` for node_module and dist, so it wont be 'fixed' after like minified
- add `yarrn add -D rollup-plugin-terser` for minifying bundle. then change rollup config

```js
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser'; // this

const dist = 'dist';
const bundle = 'bundle';
const production = !process.eenv.ROLLUP_WATCH; // this

export default {
  input: 'src/index.ts',
  output: [
    {
      format: 'umd',
      name: 'showFrameModal',
      file: `${dist}/${bundle}.umd.js`,
    },
    {
      format: 'es',
      file: `${dist}/${bundle}.es.js`,
    },
    {
      format: 'cjs',
      file: `${dist}/${bundle}.cjs.js`,
    },
  ],
  plugins: [typescript(), production && terser()], // this
};
```

## 8. creating examples

### CDN

- `yarn link` in root the `yarn link "iframe-modal"` at examples/cdn
- install dependencies `yarn add iframe-modal`
- create index.html, add tailwind, create button to showFrame
- create display.html contain page to be used inside iframe
- test it

### CRA

- install CRA
- `yarn link "iframe-modal"`
- `yarn add iframe-modal react-router-dom`
- add tailwind CRA to `public/index.html`
- create App.js and Display.js
- Setup router and test the app

### (SSR) not yet

- create folder `examples/ssr` run `npm init -y` then install dependencies `react react-dom express`
- install our local module by its absolute path (get with pwd) `yarn add /Users/flp-9-muhammadsalma/os/iframe-modal`
- add symlink, do `yarn link` in the root and `yarn link "iframe-modal"` at examples/ssr
- change package.json main to `"main": "dist/bundle.cjs.js"`
- add `"private": "true"` to examples pacakge json

## 9. publish to npm

- create npm account
- add `.npmignore`
- add `"files": ["dist"]` to example specify a folder to publish
- add `"prepublish": "yarn build"` to run before publish

## 10. refactor demo to use modal from npm

## FINISH yey
