/* eslint-disable no-console */
const pad = require(`lodash.padend`)
const Benchmark = require(`benchmark`)
const KATSU = require(`../katsu-curry`)
const DEBUG = require(`../debug`)
const MAX_WIDTH = 32
const padify = (x) => pad(x, MAX_WIDTH)
const fpo = require(`fpo`)

const merge = (x, y) => Object.assign({}, x, y)
const toPairs = (x) => Object.keys(x).map(
  (k) => [k, x[k]]
)
// biased, I know
const CURRY = KATSU.curry

// polymorphic mapppppppery
const map = CURRY((fn, Ω) => (
  Array.isArray(Ω) ?
    Ω.map(fn) :
    merge(
      Ω,
      toPairs(Ω).map(
        ([k, v]) => [k, fn.apply(Ω, [v, k])]
      ).reduce(
        (y, [k, v]) => merge(y, {[k]: v}),
        {}
      )
    )
))

// OUR TEST FUNCTIONS
const add3 = (a, b, c) => a + b + c
const add3ObjectStyle = ({a, b, c}) => a + b + c

const SUITE = new Benchmark.Suite(`KATSU-VS-OTHER-LIBRARIES`)

// const objectStyleCompetitors = {
//   // katsu-curry #curryObjectN        x 4,839,158 ops/sec ±1.37% (79 runs sampled)
//   'katsu-curry #curryObjectN': KATSU.curryObjectN,
//   // katsu-curry/debug #curryObjectN  x 2,711,884 ops/sec ±1.39% (81 runs sampled)
//   'katsu-curry/debug #curryObjectN': DEBUG.curryObjectN,
//   // fpo                              x 931,911 ops/sec ±1.38% (78 runs sampled)
//   'fpo': require(`fpo`),
//   // katsu-curry #curryObjectK        x 325,198 ops/sec ±1.78% (81 runs sampled)
//   'katsu-curry #curryObjectK': KATSU.curryObjectK,
//   // katsu-curry/debug #curryObjectK  x 31,264 ops/sec ±1.41% (81 runs sampled)
//   'katsu-curry/debug #curryObjectK': DEBUG.curryObjectK
// }

// REGULAR COMPETITORS
// later maybe we could fix this so the whole thing could be map(require)'d earlier
// eslint-disable-next-line fp/no-let
let competitors = {
  // cast-curry                       x 9,654,477 ops/sec ±1.25% (82 runs sampled)
  'cast-curry': require(`cast-curry`),
  // instant-curry                    x 7,259,838 ops/sec ±1.27% (82 runs sampled)
  'instant-curry': require(`instant-curry`),
  // ramda/src/curry                  x 6,401,626 ops/sec ±1.60% (81 runs sampled)
  'ramda/src/curry': require(`ramda/src/curry`),
  // lodash/fp/curry                  x 6,468,440 ops/sec ±1.70% (78 runs sampled)
  'lodash/fp/curry': require(`lodash/fp/curry`),
  // just-curry-it                    x 4,034,405 ops/sec ±1.46% (81 runs sampled)
  'just-curry-it': require(`just-curry-it`),
  // light-curry                      x 3,761,736 ops/sec ±1.24% (80 runs sampled)
  'light-curry': require(`light-curry`),
  // @ibrokethat/curry                x 2,887,290 ops/sec ±1.76% (79 runs sampled)
  '@ibrokethat/curry': require(`@ibrokethat/curry`),
  // @riim/curry                      x 2,249,540 ops/sec ±1.46% (78 runs sampled)
  '@riim/curry': require(`@riim/curry`),
  // katsu-curry #curry               x 2,394,437 ops/sec ±1.27% (83 runs sampled)
  'katsu-curry #curry': KATSU.curry,
  // fjl-curry                        x 1,228,002 ops/sec ±1.52% (82 runs sampled)
  'fjl-curry': require(`fjl-curry`).curry,
  // dead-simple-curry                x 1,116,381 ops/sec ±1.37% (80 runs sampled)
  'dead-simple-curry': require(`dead-simple-curry`),
  // bloody-curry                     x 1,031,290 ops/sec ±1.09% (80 runs sampled)
  'bloody-curry': require(`bloody-curry`),
  // curri                            x 431,576 ops/sec ±1.22% (83 runs sampled)
  'curri': require(`curri`),
  // fj-curry                         x 196,789 ops/sec ±1.12% (81 runs sampled)
  'fj-curry': require(`fj-curry`).curry,
  // curry                            x 192,245 ops/sec ±3.38% (78 runs sampled)
  'curry': require(`curry`),
  // katsu-curry/debug #curry         x 186,147 ops/sec ±1.95% (80 runs sampled)
  'katsu-curry/debug #curry': DEBUG.curry,
  // curry-d                          x 184,843 ops/sec ±1.14% (82 runs sampled)
  'curry-d': require(`curry-d`).curry,
  // auto-curry                       x 99,810 ops/sec ±1.08% (82 runs sampled)
  'auto-curry': require(`auto-curry`)
}

const addRunner = CURRY((runner, inner, testFunctionObject, suite) => {
  console.log(`adding ${Object.keys(testFunctionObject).length} functions to harness...`)
  const addTestFunction = (importedFn, name) => {
    const cleanName = padify(name)
    const curriedFn = importedFn(inner)
    const runnable = runner(curriedFn)
    const testRun = runnable()
    if (typeof testRun !== `number`) {
      // eslint-disable-next-line fp/no-throw
      throw new Error(
        [
          `Expected to be given a function which can curry.`,
          `Got ${name}, which doesn't work how you think it does.`
        ].join(` `)
      )
    }
    console.log(`    ${name}`)
    return suite.add(
      cleanName,
      runnable
    )
  }
  // this is less than stellar
  map(addTestFunction, testFunctionObject)
  return suite
})

const random = () => Math.round(Math.random() * 1e3)
const makeTestRunner = (x) => () => x(random(), random(), random())
// const makeObjectStyleTestRunner = (x) => () => x({a: random(), b: random(), c: random()})

const eventsToAdd = {
  cycle: (e) => console.log(String(e.target)),
  complete: function complete() {
    console.log(`Fastest is ` + this.filter(`fastest`).map(`name`)[0].trim())
  }
}
const onEvent = CURRY((event, cb, z) => z.on(event, cb.bind(z)))

function pipe() {
  const args = [].slice.apply(arguments)
  return (x) => args.reduce((last, step) => step(last), x)
}
// const trace = (tag) => (x) => {
//   console.log(tag, x)
//   return x
// }
const run = (x) => x.run({async: true})

const TOP_FIVE_ONLY = process.env.FAST || false
// const dropFrom = CURRY((x, key) => {
//   delete x[key]
//   return x
// })

// top five except katsu-curry, of course, b/c it's biased
if (TOP_FIVE_ONLY) {
  console.log(`dropping slow competitors...`)
  /* eslint-disable fp/no-delete */
  delete competitors[`just-curry-it`]
  delete competitors[`light-curry`]
  delete competitors[`@ibrokethat/curry`]
  delete competitors[`@riim/curry`]
  delete competitors[`fjl-curry`]
  delete competitors[`dead-simple-curry`]
  delete competitors[`bloody-curry`]
  delete competitors[`curri`]
  delete competitors[`curry`]
  delete competitors[`fj-curry`]
  delete competitors[`curry-d`]
  delete competitors[`auto-curry`]
  /* eslint-enable fp/no-delete */
  // map(dropFrom(objectStyleCompetitors), [
  //   'fpo'
  // ])
}

pipe(
  addRunner(makeTestRunner, add3, competitors),
  // I think this makes the individual runs slower b/c of the closure
  // addRunner(makeObjectStyleTestRunner, add3ObjectStyle, objectStyleCompetitors),
  (suite) => {
    console.log(`adding 6 functions to harness...`)
    const fn = add3ObjectStyle
    const keys = `abc`.split(``)
    const n = keys.length
    const padLog = (name) => {
      console.log(`    ${name}`)
      return padify(name)
    }
    suite.add(
      padLog(`katsu-curry #curryObjectN`),
      () => KATSU.curryObjectN(n, fn)({a: random(), b: random(), c: random()})
    ).add(
      padLog(`katsu-curry/debug #curryObjectN`),
      () => DEBUG.curryObjectN(n, fn)({a: random(), b: random(), c: random()})
    )
    if (!TOP_FIVE_ONLY) {
      suite.add(
        padLog(`fpo.curryMultiple`),
        () => fpo.curryMultiple({n, fn})({a: random(), b: random(), c: random()})
      ).add(
        padLog(`fpo.curry`),
        () => fpo.curry({n, fn})({a: random(), b: random(), c: random()})
      )
    }
    suite.add(
      padLog(`katsu-curry #curryObjectK`),
      () => KATSU.curryObjectK(keys, add3ObjectStyle)({a: random(), b: random(), c: random()})
    ).add(
      padLog(`katsu-curry/debug #curryObjectK`),
      () => DEBUG.curryObjectK(keys, add3ObjectStyle)({a: random(), b: random(), c: random()})
    )
    return suite
  },
  onEvent(`cycle`, eventsToAdd.cycle),
  onEvent(`complete`, eventsToAdd.complete),
  run
)(SUITE)

/* eslint-enable no-console */
