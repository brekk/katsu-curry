const Benchmark = require(`benchmark`)
const katsu = require(`../katsu-curry`)
const debug = require(`../debug`)
const fpo = require(`fpo`)

const addO = ({a, b, c}) => a + b + c
const abc = `abc`.split(``)
const katsuAddO = katsu.curryObjectK(abc, addO)
const debugAddO = debug.curryObjectK(abc, addO)
const katsuAddNO = katsu.curryObjectN(3, addO)
const debugAddNO = debug.curryObjectN(3, addO)
const fpoAdd = fpo.curry({n: 3, fn: addO})

const random = () => Math.round(Math.random() * 1e3)

const apTest = (fn) => () => fn({
  a: random(),
  b: random(),
  c: random()
})

const suite = new Benchmark.Suite(`Object-style curry`)
suite.add(
  `katsu-curry/debug.curryObjectK`,
  apTest(debugAddO)
).add(
  `katsu-curry.curryObjectK      `,
  apTest(katsuAddO)
)
.add(
  `katsu-curry/debug.curryObjectN`,
  apTest(debugAddNO)
)
.add(
  `katsu-curry.curryObjectN      `,
  apTest(katsuAddNO)
)
.add(
  `fpo                           `,
  apTest(fpoAdd)
)
.on(`cycle`, (event) => {
  console.log(String(event.target)) // eslint-disable-line no-console
})
.on(`complete`, function onComplete() {
  // eslint-disable-next-line no-console
  console.log((`Fastest is ` + this.filter(`fastest`).map(`name`)).trim())
})
.run({ async: true })
