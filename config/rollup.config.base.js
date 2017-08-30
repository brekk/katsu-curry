// const istanbul = require(`rollup-plugin-istanbul`)
const progress = require(`rollup-plugin-progress`)
const babili = require(`rollup-plugin-babili`)
const alias = require(`rollup-plugin-alias`)
const commonjs = require(`rollup-plugin-commonjs`)
const ts = require(`rollup-plugin-typescript2`)
const cleanup = require(`rollup-plugin-cleanup`)
const resolve = require(`rollup-plugin-node-resolve`)
const buble = require(`rollup-plugin-buble`)
const json = require(`rollup-plugin-json`)
const pkg = require(`../package.json`)
// const typescript = require(`typescript`)
const external = Object.keys(pkg.dependencies)
// const tsconfig = require(`../tsconfig.json`)
const path = require(`path`)

const ROOT = path.resolve(__dirname, `..`)
module.exports = {
  external,
  globals: {
  },
  plugins: [
    ts({
      // rollupCommonJSResolveHack: true,
      tsconfig: `${ROOT}/tsconfig.json`,
      verbosity: 3
    }),
    alias({
      '@katsu': `${ROOT}/src`,
      '@combinators': `${ROOT}/src/combinators`,
      '@curry': `${ROOT}/src/curry`,
      '@fp': `${ROOT}/src/fp`,
      '@object': `${ROOT}/src/object`,
      '@utils': `${ROOT}/src/utils`,
      '@placeholder': `${ROOT}/src/placeholder`,
      tslib: `node_modules/tslib/tslib.es6.js`
    }),
    resolve({
      jsnext: true,
      main: true
    }),
    progress(),
    json(),
    commonjs({
      // sourceMap: false,
      include: `node_modules/**`,
      extensions: [`.js`]
    }),
    buble(),
    cleanup({
      comments: `none`
    }),
    babili({
      // removeConsole: true
    })
  ],
  sourceMap: false,
  exports: `named`,
  name: pkg.name
}
