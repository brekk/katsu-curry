const germs = require(`germs`)
const pkg = require(`./package.json`)
const utils = require(`nps-utils`)
const allNPS = utils.concurrent.nps
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
/* eslint-disable fp/no-mutation */
GERMS.scripts.lint.project = `clinton`
GERMS.scripts.lint = Object.assign(
  {},
  GERMS.scripts.lint,
  {script: allNPS(`lint.src`, `lint.jsdoc`, `lint.project`)}
)
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
GERMS.scripts.docs.script = `nps docs.api && nps docs.debugAPI && nps docs.rebuild && nps docs.serve`
GERMS.scripts.docs.api = `documentation build -c documentation.yml src/index.js -f md -o docs/API.md -a public`
GERMS.scripts.docs.debugAPI = [
  `documentation build -c documentation.yml`,
  `src/index.js`,
  `src/debug/*.js`,
  `src/placeholder/constant.js`,
  `src/combinators/*.js`,
  `-f md -o docs/API-in-debug-mode.md -a public --shallow`
].join(` `)
GERMS.scripts.docs.rebuild = `cd website && yarn docusaurus-build`
GERMS.scripts.docs.serve = `cd website && yarn start`

// GERMS.scripts.lint.jsdoc = `echo "documentation lint"`
/* eslint-enable fp/no-mutation */

module.exports = GERMS
