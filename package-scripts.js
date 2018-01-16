const germs = require(`germs`)
const pkg = require(`./package.json`)
const utils = require(`nps-utils`)
const allNPS = utils.concurrent.nps
//
const built = [
  `del coverage`,
  `del lib`,
  `del docs`,
  `del combinators`,
  `del fp`,
  `del object`,
  `del params`,
  `del placeholder`,
  `del utils`
]

const GERMS = germs.build(pkg.name, {
  build: `babel src -d . --ignore *.fixture.js,*.spec.js,index.js,debug/*`,
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
GERMS.scripts.bundle = Object.assign(
  {},
  GERMS.scripts.bundle,
  {
    debug: {
      script: `rollup -c rollup/debug.commonjs.js`,
      description: `generate debug version`
    }
  }
)

GERMS.scripts.bundle.script = allNPS(`bundle.commonjs`, `bundle.es6`, `bundle.debug`)

GERMS.scripts.lint.jsdoc = `echo "documentation lint"`

module.exports = GERMS
