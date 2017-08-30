const germs = require(`germs`)
const {name} = require(`./package.json`)
module.exports = germs.build(name)
