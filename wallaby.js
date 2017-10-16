const pkg = require(`./package.json`)
// const webpackConfig = require(`./webpack.config`)
// const wallabyWebpack = require(`wallaby-webpack`)
// const wallabyPost = wallabyWebpack({
//   resolve: {
//     extensions: [`.js`, `.json`],
//     modules: [
//       `./node_modules`
//     ],
//     alias: {
//       "@combinators": `./src/combinators`,
//       "@params": `./src/curry`,
//       "@fp": `./src/fp`,
//       "@object": `./src/object`,
//       "@placeholder": `./src/placeholder`,
//       "@utils": `./src/utils`
//     }
//   }
// })

module.exports = function configureWallaby(wallaby) {
  return {
    name: pkg.name,
    // debug: true,
    files: [
      {pattern: `src/*.js`, load: false},
      {pattern: `src/*/*.js`, load: false},
      `!src/*.spec.js`,
      `!src/*/*.spec.js`
    ],

    tests: [
      `src/*.spec.js`,
      // wallaby doesn't know about these yet
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
    // postprocessor: wallabyPost,

    testFramework: `jest`,

    setup: function setup(w) {
      require(`babel-polyfill`)
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
