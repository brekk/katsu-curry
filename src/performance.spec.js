/* global test, jasmine */
import execa from 'execa'
import {t} from './testing-helper'

jasmine.DEFAULT_TIMEOUT_INTERVAL = 15e3 // eslint-disable-line fp/no-mutation

global.Promise = require.requireActual(`bluebird`) // eslint-disable-line fp/no-mutation

// 0  1  2    3     4     5
// // => name took: speed milliseconds.
const getSpeed = (x) => {
  const parts = x.split(` `)
  const speed = parseFloat(parts[5])
  return [parts[2], speed]
}
const cwd = process.cwd()
// const {log: _log} = console
// const log = _log.bind(console)

test(`katsu-curry should be faster than ramda.curry according to perftest`, (done) => {
  t.plan(3)
  return new global.Promise((resolve, reject) => {
    setImmediate(() => {
      execa.shell(`${cwd}/node_modules/.bin/babel-node ${cwd}/src/performance.fixture.js`).then(
        (output) => {
          // log(output.stdout)
          const lines = output.stdout.split(`\n`)
          const speeds = lines.map(getSpeed).reduce((agg, [k, v]) => {
            return Object.assign({}, agg, {[`${k}Speed`]: v})
          }, {})
          // log(speeds)
          const {newSpeed, ramdaSpeed} = speeds
          t.is(typeof newSpeed, `number`)
          t.is(typeof ramdaSpeed, `number`)
          const faster = newSpeed < ramdaSpeed
          t.truthy(faster)
          resolve(faster)
          done()
        }
      ).catch(
        reject
      )
    })
  })
})
