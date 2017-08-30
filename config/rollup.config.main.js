const base = require(`./rollup.config.base`)
const path = require(`path`)
/* eslint-disable fp/no-mutating-assign */
module.exports = Object.assign(base, {
  input: path.resolve(__dirname, `../src/index.js`),
  output: [
    {
      file: `katsu-curry.js`,
      format: `cjs`
    },
    {
      file: `katsu-curry.es.js`,
      format: `es`
    }
  ]
})
/* eslint-enable fp/no-mutating-assign */
