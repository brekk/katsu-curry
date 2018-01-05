/* global test */
import {t} from 'germs'
import {
  toString,
  toObjectString
} from './params/to-string'

test(`toString`, () => {
  const cool = () => {}
  const a = toString(cool)
  t.is(a(), `curry(cool)`)
  const b = toString(cool, [1, 2, 3])
  t.is(b(), `curry(cool)(1,2,3)`)
  const c = toString(() => {}, [`a`, `b`])
  t.is(c(), `curry(fn)(a,b)`)
})
test(`toObjectString`, () => {
  const cool = () => {}
  const a = toObjectString(cool)
  t.is(a(), `curry(cool)`)
  const b = toObjectString(cool, {a: 1, b: 2, c: 3})
  t.is(b(), `curry(cool)({a,b,c})`)
  const c = toObjectString(() => {}, {a: 2, b: 4})
  t.is(c(), `curry(fn)({a,b})`)
})
