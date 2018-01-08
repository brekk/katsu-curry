/* global test */
import {t} from 'jest-t-assert'
import {
  makeRemainder,
  makeObjectRemainder,
  toString,
  toObjectString
} from './debug/to-string'

test(`toString`, () => {
  const cool = (j, k, l) => j + k + l
  const a = toString(cool)
  t.is(a(), `curry(cool)(?,?,?)`)
  const b = toString(cool, [1])
  t.is(b(), `curry(cool)(1)(?,?)`)
  const c = toString(cool, [1, 2])
  t.is(c(), `curry(cool)(1,2)(?)`)
  const d = toString((x, y, z) => z, [`a`, `b`])
  t.is(d(), `curry(fn)(a,b)(?)`)
})
test(`toObjectString`, () => {
  const cool = ({a, b, c}) => a + b + c
  const x = toObjectString(cool, `abc`.split(``), [])
  t.is(x(), `curry(cool)({a:?,b:?,c:?})`)
  const y = toObjectString(cool, `abc`.split(``), {a: 1, c: 3})
  t.is(y(), `curry(cool)({a,c})({b:?})`)
  const z = toObjectString(({j, k, l}) => j + k + l, `jkl`.split(``), {j: 1})
  t.is(z(), `curry(fn)({j})({k:?,l:?})`)
  const xx = toObjectString(({j, k, l}) => j + k + l)
  t.is(xx(), `curry(fn)({})`)
})
test(`makeRemainder`, () => {
  t.is(makeRemainder(`x`)(3), `(x,x,x)`)
  t.is(makeRemainder(`x`)(0), ``)
})
test(`makeObjectRemainder`, () => {
  t.is(makeObjectRemainder(`xyz`.split(``), [`x`]), `({y:?,z:?})`)
  t.is(makeObjectRemainder(`xyz`.split(``), [`z`]), `({x:?,y:?})`)
  t.is(makeObjectRemainder(`xyz`.split(``), []), `({x:?,y:?,z:?})`)
  t.is(makeObjectRemainder([], [`a`]), `({})`)
  t.is(makeObjectRemainder(), `({})`)
})
