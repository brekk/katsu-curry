const pkg = require(`./package.json`)

module.exports = function configureWallaby() {
  return {
    name: pkg.name,
    debug: true,
    files: [
      `src/*.js`,
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

    // compilers: {
    //   '**/*.js': wallaby.compilers.babel()
    // },
    preprocessors: {
      '**/*.js': (file) => require(`babel-core`).transform(
        file.content, {
          sourceMap: true,
          presets: [`es2015`],
          plugins: [`transform-object-rest-spread`]
        }
      )
    },

    testFramework: `jest`,

    setup: function setupWallaby(w) {
      require(`babel-polyfill`) // eslint-disable-line fp/no-unused-expression
      w.testFramework.configure({
        "modulePaths": [
          `src`
        ],
        "moduleDirectories": [
          `node_modules`,
          `src`
        ],
        "mapCoverage": true,
        "moduleFileExtensions": [
          `js`,
          `json`
        ],
        "testMatch": [
          `**/*.spec.(jsx|js)`
        ]
      })
    },
    filesWithNoCoverageCalculated: [
      // `src/core/fs.js`
    ]
  }
}
