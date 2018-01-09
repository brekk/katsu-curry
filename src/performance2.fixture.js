const Benchmark = require(`benchmark`)
const katsu = require(`../katsu-curry`)
const debug = require(`../debug`)
const fpo = require(`fpo`)

const R = require(`ramda/src/curry`)
const _ = require(`lodash/fp/curry`)

const add = (a, b, c) => a + b + c
const addO = ({a, b, c}) => a + b + c
const katsuAdd = katsu.curry(add)
const katsuAddO = katsu.curryObjectK(`abc`.split(``), addO)
const fpoAdd = fpo.curry({n: 3, fn: addO})
const debugAdd = debug.curry(add)
const ramdaAdd = R(add)
const lodashAdd = _(add)

const random = () => Math.round(Math.random() * 1e3)

const suite = new Benchmark.Suite(`KATSU-VS-DEBUG`)
suite.add(
  `katsu-curry.curry`,
  () => {
    katsuAdd(random(), random(), random())
  })
  .add(
    `katsu-curry/debug.curry`,
    () => {
      debugAdd(random(), random(), random())
    }
  )
  .add(
    `ramda.curry`,
    () => {
      ramdaAdd(random(), random(), random())
    }
  )
  .add(
    `lodash.curry`,
    () => {
      lodashAdd(random(), random(), random())
    }
  )
  .add(
    `katsu-curry.curryObjectK`,
    () => {
      katsuAddO({
        a: random(),
        b: random(),
        c: random()
      })
    }
  )
  .add(
    `fpo`,
    () => {
      fpoAdd({
        a: random(),
        b: random(),
        c: random()
      })
    }
  )
  .on(`cycle`, (event) => {
    console.log(String(event.target)) // eslint-disable-line no-console
  })
  .on(`complete`, function onComplete() {
    // eslint-disable-next-line no-console
    console.log(`Fastest is ` + this.filter(`fastest`).map(`name`))
  })
  .run({ async: true })
