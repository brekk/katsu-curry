const pkg = require(`../package.json`)
const path = require(`path`)
const {bundle} = require(`germs`)

const external = (
  pkg && pkg.dependencies ?
    Object.keys(pkg.dependencies) :
    []
).concat(`fs`)
const local = (x) => path.resolve(__dirname, x)

module.exports = bundle({
  name: pkg.name,
  alias: {
    [`@combinators`]: local(`../src/combinators`),
    [`@params`]: local(`../src/params`),
    [`@fp`]: local(`../src/fp`),
    [`@object`]: local(`../src/object`),
    [`@placeholder`]: local(`../src/placeholder`),
    [`@utils`]: local(`../src/utils`)
  },
  external,
  input: `src/index.js`,
  output: {
    file: `./${pkg.name}.js`,
    format: `cjs`
  }
})
