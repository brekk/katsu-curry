import test from 'ava'
import execa from 'execa'

// 0  1  2    3     4     5
// // => name took: speed milliseconds.
const getSpeed = (x) => {
  const parts = x.split(` `)
  const speed = parseFloat(parts[5])
  return [parts[2], speed]
}
// const oldSpeed = getSpeed(oldTime)
// const newSpeed = getSpeed(newTime)
const cwd = process.cwd()
const {log: _log} = console
const log = _log.bind(console)

test.cb(`katsu-curry should be faster than ramda.curry according to perftest`, (t) => {
  execa.shell(`${cwd}/node_modules/.bin/babel-node ${cwd}/src/performance.fixture.js`).then(
    (output) => {
      log(output.stdout)
      const lines = output.stdout.split(`\n`)
      const {newSpeed, ramdaSpeed} = lines.map(getSpeed).reduce((agg, [k, v]) => {
        return Object.assign({}, agg, {[`${k}Speed`]: v})
      }, {})
      t.is(typeof newSpeed, `number`)
      t.is(typeof ramdaSpeed, `number`)
      t.truthy(newSpeed < ramdaSpeed)
      t.end()
    }
  ).catch(
    t.fail
  )
})

test.cb(`katsu-curry should be slower than ramda.curry according to benchmark`, (t) => {
  execa.shell(`${cwd}/node_modules/.bin/babel-node ${cwd}/src/performance2.fixture.js`).then(
    (output) => {
      log(output.stdout)
      const lines = output.stdout.split(`\n`)
      // const {newSpeed, ramdaSpeed} = lines.map(getSpeed).reduce((agg, [k, v]) => {
      //   return Object.assign({}, agg, {[`${k}Speed`]: v})
      // }, {})
      t.is(lines[2], `Fastest is ramda.curry`)
      t.end()
    }
  ).catch(
    t.fail
  )
})
