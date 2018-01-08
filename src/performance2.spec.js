/* global test, jasmine */
import execa from 'execa'
import {t} from 'jest-t-assert'
jasmine.DEFAULT_TIMEOUT_INTERVAL = 25e3 // eslint-disable-line fp/no-mutation

global.Promise = require.requireActual(`bluebird`) // eslint-disable-line fp/no-mutation
const cwd = process.cwd()

test(`katsu-curry/debug.curry is slow but useful`, (done) => {
  t.plan(1)
  return new global.Promise((resolve, reject) => {
    setImmediate(() => {
      execa.shell(`node ${cwd}/src/performance2.fixture.js`).then(
        (output) => {
          const lines = output.stdout.split(`\n`)
          console.log(output.stdout)
          t.is(lines[3], `Fastest is katsu-curry.curry`)
          resolve()
          done()
        }
      ).catch(
        reject
      )
    })
  })
})
