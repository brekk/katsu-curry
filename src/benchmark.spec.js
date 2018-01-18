/* global test, jasmine */
import execa from 'execa'
import {t} from 'jest-t-assert'
jasmine.DEFAULT_TIMEOUT_INTERVAL = 40e3 // eslint-disable-line fp/no-mutation

global.Promise = require.requireActual(`bluebird`) // eslint-disable-line fp/no-mutation
const cwd = process.cwd()

const doStuff = (
  process.env.TEST_PERFORMANCE ?
    test :
    test.skip
)

doStuff(`katsu-curry/debug.curry is slow but useful`, (done) => {
  t.plan(1)
  return new global.Promise((resolve, reject) => {
    setImmediate(() => {
      execa.shell(`node ${cwd}/src/benchmark.fixture.js`).then(
        (output) => {
          const lines = output.stdout.split(`\n`)
          // eslint-disable-next-line no-console
          console.log(output.stdout)
          t.is(lines[lines.length - 1], `Fastest is lodash.curry`)
          resolve()
          done()
        }
      ).catch(
        reject
      )
    })
  })
})
