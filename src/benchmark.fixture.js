const Benchmark = require(`benchmark`)
const katsu = require(`../katsu-curry`)
const debug = require(`../debug`)
const fpo = require(`fpo`)

const R = require(`ramda/src/curry`)
const _ = require(`lodash/fp/curry`)

const add = (a, b, c) => a + b + c
const addO = ({a, b, c}) => a + b + c
const katsuAdd = katsu.curry(add)
const debugAdd = debug.curry(add)
const katsuAddOK = katsu.curryObjectK(`abc`.split(``), addO)
const debugAddOK = debug.curryObjectK(`abc`.split(``), addO)
const katsuAddON = katsu.curryObjectN(3, addO)
const debugAddON = debug.curryObjectN(3, addO)
const fpoAdd = fpo.curry({n: 3, fn: addO})
const ramdaAdd = R(add)
const lodashAdd = _(add)

const random = () => Math.round(Math.random() * 1e3)

const regularHarness = (x) => () => x(random(), random(), random())
const objectHarness = (x) => () => x({a: random(), b: random(), c: random()})

const suite = new Benchmark.Suite(`KATSU-VS-DEBUG`)
suite.add(
  `katsu-curry.curry             `,
  regularHarness(katsuAdd)
)
.add(
  `ramda.curry                   `,
  regularHarness(ramdaAdd)
)
.add(
  `lodash.curry                  `,
  regularHarness(lodashAdd)
)
.add(
  `katsu-curry/debug.curry       `,
  regularHarness(debugAdd)
)
.add(
  `katsu-curry.curryObjectK      `,
  objectHarness(katsuAddOK)
)
.add(
  `katsu-curry/debug.curryObjectK`,
  objectHarness(debugAddOK)
)
.add(
  `katsu-curry.curryObjectN      `,
  objectHarness(katsuAddON)
)
.add(
  `katsu-curry/debug.curryObjectN`,
  objectHarness(debugAddON)
)
.add(
  `fpo                           `,
  objectHarness(fpoAdd)
)
.on(`cycle`, (event) => {
  console.log(String(event.target)) // eslint-disable-line no-console
})
.on(`complete`, function onComplete() {
  // eslint-disable-next-line no-console
  console.log((`Fastest is ` + this.filter(`fastest`).map(`name`)).trim())
})
.run({ async: true })
