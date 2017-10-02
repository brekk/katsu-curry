const path = require(`path`)
// const webpack = require(`webpack`)
const { TsConfigPathsPlugin } = require(`awesome-typescript-loader`)

module.exports = (() => {
  const TS_CONFIG = {
    tsconfig: path.resolve(__dirname, `tsconfig.json`),
    compiler: `typescript`
  }
  const config = {
    entry: {
      bundle: `./src/index.js`
    },
    output: {
      filename: `katsu-curry.js`
    },
    devtool: `source-map`,
    resolve: {
      alias: {
        "@katsu": path.resolve(__dirname, `src`),
        "@combinators": path.resolve(__dirname, `src/combinators`),
        "@curry": path.resolve(__dirname, `src/curry`),
        "@fp": path.resolve(__dirname, `src/fp`),
        "@object": path.resolve(__dirname, `src/object`),
        "@placeholder": path.resolve(__dirname, `src/placeholder`),
        "@utils": path.resolve(__dirname, `src/utils`)
      },
      extensions: [`.ts`, `.jsx`, `.js`, `.json`, `.tsx`],
      modules: [
        path.resolve(__dirname),
        `node_modules`
      ],
      plugins: [
        new TsConfigPathsPlugin(TS_CONFIG)
      ]
    },
    node: {
      console: true,
      fs: `empty`,
      net: `empty`,
      tls: `empty`
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: [`awesome-typescript-loader`]
        },
        {
          test: /\.(js|jsx)$/,
          loader: `babel-loader`,
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
    ],
    stats: { colors: true }
  }
  return config
})()
