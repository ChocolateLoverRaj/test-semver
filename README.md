# test-semver
Tests npm package making workflows.

## Installing
```
npm i @programmerraj/test-semver
```

## Why
This repository is a simple (but not practical) npm package. It uses [npm-version](https://github.com/chocolateloverraj/npm-version) actions in it's workflows.

## Lib
```js
import lib from '@programmerraj/test-semver'
```

### Good
Returns `3`.
```js
lib.good() // => 3
```

### Kind
Returns random kind message.
```js
lib.kind() // => 'You are amazing'
```

### Coin
Randomly returns either `'head'` or `'tail'`, like a coin flip.
```js
lib.coin() // => 'head'
```

## Contributing
This package follows semver. Bug fixes, new features, and breaking changes are welcome.

When making a pull request
- Bug fixes: Merge onto `patch` branch.
- New features: Merge onto `minor` branch.
- Breaking changes: Merge onto `major` branch.
All versioning and publishing will be done automatically by GitHub workflows. Do not change npm version in package.json.

If you are making a change that is only for development (it does not affect people who download the package), merge onto the `main` branch. This won't publish a new package version.
