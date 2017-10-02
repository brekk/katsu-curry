const pkg = require(`../package.json`)
const base = require(`./config.base`)
/* eslint-disable fp/no-mutating-assign */
module.exports = Object.assign({}, base, {
  input: `src/index.js`,
  output: {
    file: `./${pkg.name}.mjs`,
    format: `es`
  }
})
/* eslint-enable fp/no-mutating-assign */
