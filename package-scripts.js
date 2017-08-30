// const curry = require(`ramda/src/curry`)
const utils = require(`nps-utils`)
console.log(`<CONFIG>${JSON.stringify(process.env)}</CONFIG>`) // eslint-disable-line no-console
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

const filterSpecs = [
  `jayin "_.toPairs(x)`,
  `.map(([k, v]) => ([k,`,
  `_.map(v, (y) => y.indexOf('node_modules') > -1 ? y.substr(y.indexOf('node_modules') + 13) : y)`,
  `]))`,
  `.filter(([k, v]) => !(k.indexOf('spec') > -1))`,
  `.reduce((agg, [k, v]) => Object.assign({}, agg, {[k]: v}), {})"`
].join(``)

const jestOptions = `--` + [
  `runInBand`,
  `ci`,
  `testResultsProcessor="./node_modules/jest-junit-reporter"`,
  `coverage`,
  `coveragePathIgnorePatterns testing-helper.js`
].join(` --`)

const babelDoNotConvertThesePlz = `--ignore ${[
  `index.ts`,
  `index.js`,
  `src/*.spec.js`,
  `*.fixture.js`,
  `testing-helper.js`
].join(`,`)}`

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
      },
      graph2: {
        script: `madge src --json | ${filterSpecs} | madge --stdin --image dependencies.svg`,
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
      script: `jest src/*.spec.js --coverage --coveragePathIgnorePatterns testing-helper.js`,
      ci: {
        description: `run circle tests`,
        script: `jest ${jestOptions}`
      }
    },
    docs: {
      description: `auto regen the docs`,
      script: `documentation build src/** -f html -o docs -a private -a public -a protected`
    },
    bundle: {
      description: `build with rollup or webpack`,
      script: `nps bundle.rollup`,
      rollup: {
        description: `run the main bundle task`,
        script: `rollup -c config/rollup.config.main.js`
      },
      webpack: {
        description: `pack it up with webpack`,
        script: `webpack --config webpack.config.js src/index.js --verbose --display-error-details`
      }
    },
    build: {
      description: `convert files individually`,
      script: `babel src -d . ${babelDoNotConvertThesePlz}`
    },
    care: {
      description: `run all the things`,
      script: allNPS(`lint`, `test`, `bundle`, `build`, `readme`)
    },
    precommit: `nps care`
  }
}
