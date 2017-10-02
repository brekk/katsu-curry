const config = require(`./webpack.config.js`)
const aliasPreprocessor = require(`jest-alias-preprocessor`)(config)
const babel = require(`babel-jest`)
// const {pipe} = require(`./src/fp/pipe`)

module.exports = {
  process: (src, path) => {
    const a = aliasPreprocessor.process(src, path)
    const b = babel.process(a, path)
    return b
  }
}
