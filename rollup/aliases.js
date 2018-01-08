const path = require(`path`)
const local = (x) => path.resolve(__dirname, x)
const aliases = {
  "@debug": local(`../src/debug`),
  "@placeholder": local(`../src/placeholder`),
  "@fp": local(`../src/fp`),
  "@combinators": local(`../src/combinators`),
  "@params": local(`../src/params`),
  "@object": local(`../src/object`),
  "@utils": local(`../src/utils`)
}
module.exports = aliases
