// const curry = require(`ramda/src/curry`)
const utils = require(`nps-utils`)
// const {version} = require(`./package.json`)

// const prepend = curry((toPrepend, file) => `echo "${toPrepend} $(cat ${file})" > ${file}`)
// const append = curry((toAppend, file) => `echo "${toAppend}" >> ${file}`)
// const createWithText = curry((text, file) => `echo "${text}" > ${file}`)
const {
  concurrent: all
  // series,
  // mkdirp
} = utils
const {
  nps: allNPS
} = all

module.exports = {
  scripts: {
    dependencies: {
      check: {
        script: `depcheck`,
        description: `check dependencies`
      },
      graph: {
        script: `madge src --image dependencies.svg`,
        description: `generate a visual dependency graph`
      }
    },
    readme: {
      script: `documentation readme README.md -s "API" src/index.js`,
      description: `regenerate the readme`
    },
    lint: {
      description: `lint both the js and the jsdoc`,
      script: allNPS(`lint.src`, `lint.jsdoc`),
      src: {
        script: `eslint src/*.js`,
        description: `lint js files`
      },
      jsdoc: {
        script: `documentation lint src/index.js`,
        description: `lint jsdoc in files`
      }
    },
    test: {
      description: `run all tests with coverage`,
      script: `nyc nps test.unit`,
      unit: {
        description: `run unit tests`,
        script: `ava src/*.spec.js`
      }
    },
    bundle: {
      description: `run the main bundle task`,
      script: `rollup -c config/rollup.config.main.js`
    },
    build: {
      description: `convert files individually`,
      script: `babel src -d lib --ignore *.spec.js`
    },
    care: {
      description: `run all the things`,
      script: allNPS(`lint`, `test`, `bundle`, `build`, `readme`)
    },
    precommit: `nps care`
  }
}
