/* global test */
import {length, objectLength, propLength} from '@utils/length'
import {values, merge} from '@utils/object'
import {K} from '@combinators/constant'
import {I} from '@combinators/identity'
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

test(`length grabs either object length or key length`, () => {
  t.plan(6)
  t.is(5, length(`abcde`.split(``)))
  t.is(3, length({a: 1, b: 2, c: 3}))
  t.is(5, length(`butts`))
  // t.is(0, length(NaN)) // ?
  const magic = (a, b, c) => a + b + c
  t.is(length(magic), 3)
  t.throws(() => length(null), `Cannot convert undefined or null to object`)
  t.is(length(5), undefined)
})

test(`values should convert an object to values`, () => {
  t.plan(2)
  t.deepEqual(values({a: 1, b: 2, c: 3}), [
    1, 2, 3
  ])
  t.deepEqual(values(null), [])
})

test(`objectLength should get object length`, () => {
  t.plan(5)
  t.is(objectLength({a: 1, b: 2, c: 3}), 3)
  t.throws(() => objectLength(null), `Cannot convert undefined or null to object`)
  t.is(objectLength([1, 2, 3]), 3)
  t.is(objectLength(NaN), 0)
  t.is(objectLength(`shibble`), 7)
})

test(`propLength should get .length`, () => {
  t.plan(3)
  t.is(propLength({a: 1, b: 2, c: 3}), undefined)
  t.is(propLength([1, 2, 3]), 3)
  t.is(propLength({length: 100}), 100)
})

test(`merge should combine objects`, () => {
  t.plan(1)
  t.deepEqual(merge({a: 1, b: 2, c: 3}, {d: 4, e: 5}), {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5
  })
})

test(`K should be always`, () => {
  const x = Math.round(Math.random() * 100)
  const $ = K(x)
  t.is($(), x)
})

test(`I should be identity`, () => {
  const x = Math.round(Math.random() * 100)
  t.is(I(x), x)
})
