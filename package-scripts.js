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

const cleanUpTheTOC = (f) => ([
  `node toc-to-site.js ${f} > ${f}.bak`,
  `mv ${f}.bak ${f}`
].join(` && `))

GERMS.scripts.bundle.script = allNPS(`bundle.commonjs`, `bundle.es6`, `bundle.debug`)
GERMS.scripts.docs = {
  script: `nps docs.api docs.debugAPI docs.build docs.cleanTOC docs.serve`,
  api: `documentation build -c documentation.yml src/index.js -f md -o docs/API.md -a public`,
  cleanTOC: {
    regular: cleanUpTheTOC(`docs/API.md`),
    debug: cleanUpTheTOC(`docs/API-in-debug-mode.md`),
    script: allNPS(`docs.cleanTOC.regular`, `docs.cleanTOC.debug`)
  },
  debugAPI: [
    `documentation build -c documentation.yml`,
    `src/index.js`,
    `src/debug/*.js`,
    `src/placeholder/constant.js`,
    `src/combinators/*.js`,
    `-f md -o docs/API-in-debug-mode.md -a public --shallow`
  ].join(` `),
  build: {
    script: `cd website && yarn docusaurus-build`,
    benchmark: {
      update: `write=true node ./benchmark-to-site.js`,
      log: `echo "this will take a lil bit..." && node ./src/benchmark.fixture.js > benchmark.log`,
      script: `nps docs.build.b.log docs.build.b.update`
    },
    full: `nps docs.build.benchmark docs.build`
  },
  serve: {
    script: `cd website && yarn start`,
    fresh: `nps docs.build docs.serve`
  }
}

// GERMS.scripts.lint.jsdoc = `echo "documentation lint"`
/* eslint-enable fp/no-mutation */

module.exports = GERMS
