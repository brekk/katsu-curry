import test from 'ava'
import execa from 'execa'

// 0  1  2    3     4     5
// // => name took: speed milliseconds.
const getSpeed = (x) => parseFloat(x.split(` `)[5])
// const oldSpeed = getSpeed(oldTime)
// const newSpeed = getSpeed(newTime)
const cwd = process.cwd()
const {log: _log} = console
const log = _log.bind(console)

test.cb(`old should be faster than new`, (t) => {
  execa.shell(`${cwd}/node_modules/.bin/babel-node ${cwd}/src/performance.fixture.js`).then(
    (output) => {
      log(output.stdout)
      const lines = output.stdout.split(`\n`)
      const [oldSpeed, newSpeed, ramdaSpeed] = lines.map(getSpeed)
      t.is(typeof oldSpeed, `number`)
      t.is(typeof newSpeed, `number`)
      t.is(typeof ramdaSpeed, `number`)
      t.truthy(newSpeed < oldSpeed)
      // this varies depending on how many additional things are being run in the same process
      // I can get it to pass individually on ~50ms resolution, but not if there're lots of tests
      t.truthy(Math.abs(newSpeed - ramdaSpeed) < 250, `new speed should be within 250 ms of ramda`)
      t.end()
    }
  ).catch(
    t.fail
  )
})
