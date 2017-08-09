/* global test */
import {t} from './testing-helper'
import * as KC from './index'

const zort = (x) => x.sort() // eslint-disable-line fp/no-mutating-methods
const sortKeys = (x) => zort(Object.keys(x))

test(`katsu-curry exports`, () => {
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
