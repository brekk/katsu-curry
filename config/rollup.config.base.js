// const istanbul = require(`rollup-plugin-istanbul`)
const progress = require(`rollup-plugin-progress`)
const babili = require(`rollup-plugin-babili`)
const commonjs = require(`rollup-plugin-commonjs`)
const cleanup = require(`rollup-plugin-cleanup`)
const resolve = require(`rollup-plugin-node-resolve`)
const buble = require(`rollup-plugin-buble`)
const json = require(`rollup-plugin-json`)
const pkg = require(`../package.json`)
const external = Object.keys(pkg.dependencies)

module.exports = {
  external,
  globals: {
  },
  plugins: [
    progress(),
    commonjs({
      // sourceMap: false,
      include: `node_modules/**`,
      extensions: [`.js`]
    }),
    buble(),
    resolve({
      jsnext: true,
      main: true
    }),
    json(),
    cleanup({
      comments: `none`
    }),
    babili({
      removeConsole: true
    })
  ],
  sourceMap: false,
  exports: `named`,
  moduleName: pkg.name
}
