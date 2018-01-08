/* global test, jasmine */
import execa from 'execa'
import {t} from 'jest-t-assert'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 15e3 // eslint-disable-line fp/no-mutation

global.Promise = require.requireActual(`bluebird`) // eslint-disable-line fp/no-mutation

// 0  1  2    3     4     5
// // => name took: speed milliseconds.
const getSpeed = (x) => {
  const parts = x.split(` `)
  const speed = parseFloat(parts[5])
  // console.log(`parts`, parts)
  return [parts[2], speed]
}
const cwd = process.cwd()

test(`katsu-curry shouldn't be that much slower than ramda.curry`, (done) => {
  t.plan(6)
  return new global.Promise((resolve, reject) => {
    setImmediate(() => {
      execa.shell(`${cwd}/node_modules/.bin/babel-node ${cwd}/src/performance.fixture.js`).then(
        (output) => {
          // console.log(output.stdout)
          const lines = output.stdout.split(`\n`)
          const speeds = lines.map(getSpeed).reduce((agg, [k, v]) => {
            return Object.assign({}, agg, {[`${k}Speed`]: v})
          }, {})
          const {katsuSpeed, ramdaSpeed, lodashSpeed} = speeds
          t.is(typeof katsuSpeed, `number`)
          t.is(typeof ramdaSpeed, `number`)
          t.is(typeof lodashSpeed, `number`)
          const diff = Math.abs(katsuSpeed - ramdaSpeed)
          const under = Boolean(diff < 200)
          console.log(`katsu-curry vs. others`, speeds, diff, `< 200?`, under)
          t.truthy(lodashSpeed > ramdaSpeed)
          t.truthy(lodashSpeed > katsuSpeed)
          t.truthy(under)
          resolve(under)
          done()
        }
      ).catch(
        reject
      )
    })
  })
})
