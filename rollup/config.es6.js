const pkg = require(`../package.json`)
const {bundle} = require(`germs`)
const aliases = require(`./aliases`)

const external = (
  pkg && pkg.dependencies ?
    Object.keys(pkg.dependencies) :
    []
)

module.exports = bundle({
  name: pkg.name,
  alias: aliases,
  external,
  input: `src/index.js`,
  output: {
    file: `./${pkg.name}.mjs`,
    format: `es`
  }
})
