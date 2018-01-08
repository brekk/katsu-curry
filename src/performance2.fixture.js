const Benchmark = require(`benchmark`)
// const curry = require(`ramda/src/curry`)
const katsu = require(`../katsu-curry`)
const debug = require(`../debug`)

const add = (a, b, c) => a + b + c
const katsuAdd = katsu.curry(add)
const katsuAddO = katsu.curryObjectK(`abc`.split(``), ({a, b, c}) => a + b + c)
const debugAdd = debug.curry(add)

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
    `katsu-curry.curryObjectK`,
    () => {
      katsuAddO({
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
