/* global test, jasmine */
import execa from 'execa'
import {t} from 'jest-t-assert'
jasmine.DEFAULT_TIMEOUT_INTERVAL = 15e3 // eslint-disable-line fp/no-mutation

global.Promise = require.requireActual(`bluebird`) // eslint-disable-line fp/no-mutation
const cwd = process.cwd()

test(`katsu-curry should be slower than ramda.curry according to benchmark`, (done) => {
  t.plan(1)
  return new global.Promise((resolve, reject) => {
    setImmediate(() => {
      execa.shell(`node ${cwd}/src/performance2.fixture.js`).then(
        (output) => {
          const lines = output.stdout.split(`\n`)
          console.log(output.stdout)
          t.is(lines[2], `Fastest is ramda.curry`)
          resolve()
          done()
        }
      ).catch(
        reject
      )
    })
  })
})
