import test from 'ava'
import execa from 'execa'

// 0  1  2    3     4     5
// // => name took: speed milliseconds.
const getSpeed = (x) => parseFloat(x.split(` `)[4])
// const oldSpeed = getSpeed(oldTime)
// const newSpeed = getSpeed(newTime)
const cwd = process.cwd()

test.cb(`old should be faster than new`, (t) => {
  execa.shell(`${cwd}/node_modules/.bin/babel-node ${cwd}/src/performance.fixture.js`).then(
    (output) => {
      const [oldSpeed, newSpeed] = output.stdout.split(`\n`)
      const a = getSpeed(oldSpeed)
      const b = getSpeed(newSpeed)
      t.truthy(b < a)
      t.end()
    }
  ).catch(
    t.fail
  )
})
