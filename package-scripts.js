const germs = require(`germs`)
const pkg = require(`./package.json`)
const utils = require(`nps-utils`)
const allNPS = utils.concurrent.nps
//
const built = [
  `del coverage`,
  `del lib`,
  `del docs`
]

const GERMS = germs.build(pkg.name, {
  readme: `documentation readme -s API src/*.js`,
  prepublishOnly: `nps care`,
  clean: utils.concurrent(built),
  scrub: utils.concurrent(built.concat([
    `del ./katsu-curry.*`,
    `del dependenc*`,
    `del yarn.lock`,
    `del node_modules`
  ]))
})
GERMS.scripts.bundle = {
  ...GERMS.scripts.bundle,
  debug: {
    script: `rollup -c rollup/debug.commonjs.js`,
    description: `generate debug version`
  }
}

GERMS.scripts.bundle.script = allNPS(`bundle.commonjs`, `bundle.es6`, `bundle.debug`)

GERMS.scripts.lint.jsdoc = `echo "documentation lint"`

module.exports = GERMS
