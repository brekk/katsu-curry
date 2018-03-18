const germs = require(`germs`)
const pkg = require(`./package.json`)
const utils = require(`nps-utils`)
const allNPS = utils.concurrent.nps
const {series} = utils
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

const filterSpecs = (name) => ([
  `jayin "_.toPairs(x)`,
  `.map(([k, v]) => ([k,`,
  `_.map(v, (y) => y.indexOf('node_modules') > -1 ?`,
  `'Ⓜ ' + y.substr(y.indexOf('node_modules') + 13) :`,
  ` y)`,
  `]))`,
  `.filter(([k, v]) => !(k.indexOf('test-helpers') > -1))`,
  `.filter(([k, v]) => !(k.indexOf('spec') > -1))`,
  `.filter(([k, v]) => !(k.indexOf('fixture') > -1))`,
  `.filter(([k, v]) => !(k.indexOf('${name}') > -1))`,
  `.reduce((agg, [k, v]) => Object.assign({}, agg, {[k]: v}), {})"`
].join(``))

const DEPGRAPH = `dependency-graph.json`

const madge = `madge --webpack-config webpack.config.js`
/* eslint-disable fp/no-mutation */
GERMS.graph = {
  base: {
    script: `${madge} src --json | ${filterSpecs(`katsu-curry`)} > ${DEPGRAPH}`,
    desciption: `generate the base graph as a json file`
  },
  svg: {
    script: series(
      `nps dependencies.graph.base`,
      `cat ${DEPGRAPH} | ${madge} --stdin --image dependencies.svg`
    ),
    description: `generate a visual dependency graph`
  },
  json: {
    script: series(
      `nps dependencies.graph.base`,
      `cat ${DEPGRAPH} | ${madge} --stdin --json`
    ),
    description: `generate a visual dependency graph in json`
  },
  dot: {
    script: series(
      `nps dependencies.graph.base`,
      `cat ${DEPGRAPH} | ${madge} --stdin --dot`
    ),
    description: `generate a visual dependency graph in dot`
  }
}
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

const amend = (f) => ([
  `node amend-generated-markdown-files.js ${f} > ${f}.bak`,
  `mv ${f}.bak ${f}`
].join(` && `))

GERMS.scripts.bundle.script = allNPS(`bundle.commonjs`, `bundle.es6`, `bundle.debug`)
GERMS.scripts.docs = {
  script: `nps docs.api docs.amend docs.build docs.serve`,
  api: {
    script: allNPS(`docs.api.default`, `docs.api.debug`),
    default: `documentation build -c documentation.yml src/index.js -f md -o docs/API.md -a public`,
    debug: [
      `documentation build -c documentation.yml`,
      `src/index.js`,
      `src/debug/*.js`,
      `src/placeholder/constant.js`,
      `src/combinators/*.js`,
      `-f md -o docs/API-in-debug-mode.md -a public --shallow`
    ].join(` `)
  },
  amend: {
    description: `make a second pass of clean-up and clarification on the docs`,
    regular: amend(`docs/API.md`),
    debug: amend(`docs/API-in-debug-mode.md`),
    lint: `remark -u validate-links ./docs`,
    script: [
      allNPS(`docs.amend.regular`, `docs.amend.debug`, `docs.assets`),
      `nps docs.amend.lint`
    ].join(` && `)
  },
  assets: {
    script: `cp dependencies.svg website/static/img/dependencies.svg`
  },
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
