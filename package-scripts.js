const germs = require(`germs`)
const {name} = require(`./package.json`)
module.exports = germs.build(name, {
  build: `babel src -d . --ignore *.fixture.js,*.spec.js,index.js`
})
