import test from 'ava'
import * as KC from './index'

const zort = (x) => x.sort() // eslint-disable-line fp/no-mutating-methods
const sortKeys = (x) => zort(Object.keys(x))

test(`katsu-curry exports`, (t) => {
  t.deepEqual(sortKeys(KC), [
    `$`,
    `I`,
    `K`,
    `PLACEHOLDER`,
    `compose`,
    `curry`,
    `curryObjectK`,
    `curryObjectKN`,
    `curryObjectN`,
    `curryify`,
    `pipe`,
    `version`
  ])
})
