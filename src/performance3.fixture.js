const Benchmark = require(`benchmark`)
// const curry = require(`ramda/src/curry`)
const {curry} = require(`../katsu-curry`)
const R = require(`ramda/src/curry`)
const _ = require(`lodash/fp/curry`)

const add = (a, b, c) => a + b + c
const katsuAdd = curry(add)
const ramdaAdd = R(add)
const lodashAdd = _(add)

const random = () => Math.round(Math.random() * 1e3)

const suite = new Benchmark.Suite(`KATSU-VS-DEBUG`)
suite.add(
  `katsu-curry`,
  () => {
    katsuAdd(random(), random(), random())
  })
  .add(
    `ramda`,
    () => {
      ramdaAdd(random(), random(), random())
    }
  )
  .add(
    `lodash`,
    () => {
      lodashAdd(random(), random(), random())
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
