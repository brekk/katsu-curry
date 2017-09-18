const germs = require(`germs`)
const {name} = require(`./package.json`)
module.exports = germs(name, {
  readme: `documentation readme README.md -s "API" src/index.js`
})
