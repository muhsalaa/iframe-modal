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

## 6. Pre-commit using husky
- run command `npx husky-init && yarn` to add config and install dependencies
- setup pre commit script `npx husky set .husky/pre-commit "yarn lint:fix"`

eca4da413676ec848c86a468714f289e7894ffc9