// const fs = require(`fs`)
const path = require(`path`)
const wallabyWebpack = require(`wallaby-webpack`)
const config = require(`./webpack.config.js`)
const webpack = wallabyWebpack(config)
module.exports = function configureWallaby(wallaby) {
  /* eslint-disable fp/no-mutation */
  process.env.NODE_PATH += `${path.delimiter}${path.join(wallaby.localProjectDir, `src`)}`
  /* eslint-enable fp/no-mutation */
  return {
    postprocessor: webpack,
    setup: function setup() {
      // window.__moduleBundler.loadTests()
    },
    files: [
      `!src/**/*.spec.js`,
      `!src/performance.spec.js`,
      `!src/performance2.spec.js`,
      `!src/*.spec.js`,
      {pattern: `src/**/*.js`, load: false},
      {pattern: `src/*.js`, load: false}
    ],
    tests: [
      `!src/performance.spec.js`,
      `!src/performance2.spec.js`,
      `src/*.spec.js`,
      `src/*/*.spec.js`
    ],
    env: {
      type: `node`,
      runner: `node`,
      params: {
        runner: `--harmony`
      }
    },
    compilers: {
      '**/*.js': wallaby.compilers.babel(),
      '**/*.ts': wallaby.compilers.babel()
    },
    testFramework: `jest`
  }
}
