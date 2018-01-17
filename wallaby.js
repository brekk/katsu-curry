const pkg = require(`./package.json`)

module.exports = function configureWallaby(wallaby) {
  return {
    name: pkg.name,
    debug: true,
    files: [
      `src/*.js`,
      `src/**/*.js`,
      `!src/*.spec.js`
    ],

    tests: [
      `src/*.spec.js`,
      // wallaby doesn't know about this yet
      `!src/performance.spec.js`,
      `!src/performance2.spec.js`
    ],

    env: {
      type: `node`,
      runner: `node`
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },
    // preprocessors: {
    //   '**/*.js': (file) => require(`babel-core`).transform(
    //     file.content, {
    //       sourceMap: true,
    //       presets: [`es2015`],
    //       plugins: [`transform-object-rest-spread`]
    //     }
    //   )
    // },

    testFramework: `jest`,

    setup: function setup(w) {
      // require(`babel-polyfill`) // eslint-disable-line fp/no-unused-expression
      // w.testFramework.configure({
      //   "modulePaths": [
      //     `src`
      //   ],
      //   "moduleDirectories": [
      //     `node_modules`,
      //     `src`
      //   ],
      //   "mapCoverage": true,
      //   "moduleFileExtensions": [
      //     `js`,
      //     `json`
      //   ],
      //   "testMatch": [
      //     `**/*.spec.(jsx|js)`
      //   ]
      // })
      /* eslint-disable */
      let jestConfig = require(`./package.json`).jest
      for (let p in jestConfig.moduleNameMapper) {
        jestConfig.moduleNameMapper[p] = jestConfig.moduleNameMapper[p].replace(
          `<rootDir>`, w.projectCacheDir
        )
      }
      w.testFramework.configure(jestConfig)
      /* eslint-enable */
    },
    filesWithNoCoverageCalculated: [
      // `src/core/fs.js`
    ]
  }
}
