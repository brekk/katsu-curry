const pkg = require(`../package.json`)
// const commonjs = require(`rollup-plugin-commonjs`)
const {bundle} = require(`germs`)
const aliases = require(`./aliases`)

module.exports = bundle({
  name: pkg.name,
  alias: aliases,
  input: `src/index.js`,
  output: {
    name: `katsuCurry`,
    file: `./${pkg.name}.js`,
    format: `umd`
  }
})
