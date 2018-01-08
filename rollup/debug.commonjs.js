const pkg = require(`../package.json`)
// const commonjs = require(`rollup-plugin-commonjs`)
const {bundle} = require(`germs`)
const aliases = require(`./aliases`)

module.exports = bundle({
  name: `debug`,
  alias: aliases,
  input: `src/debug/index.js`,
  output: {
    name: `katsuCurryDebug`,
    file: `./debug.js`,
    format: `umd`
  }
})
