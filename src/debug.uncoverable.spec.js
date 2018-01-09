/* global test */
import {t} from 'jest-t-assert'
import {
  curryObjectK,
  curryObjectKN,
  curryObjectN
} from './debug/object'
import {
  toObjectString
} from './debug/to-string'

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
test(`curryObjectK`, () => {
  const addO = curryObjectK(
    `abc`.split(``),
    function addObject({a, b, c}) { return a + b + c }
  )
  t.is(addO.toString(), `curry(addObject)({a:?,b:?,c:?})`)
  t.is(addO({a: 5}).toString(), `curry(addObject)({a})({b:?,c:?})`)
  t.is(addO({a: 5, b: 20}).toString(), `curry(addObject)({a,b})({c:?})`)
  t.is(addO({a: 1, b: 2, c: 3}), 6)
})
test(`curryObjectKN`, () => {
  const addO = curryObjectKN(
    {k: `abc`.split(``), n: 4},
    function addObject({a, b, c, d = 200}) { return a + b + c + d }
  )
  t.is(addO.toString(), `curry(addObject)({a:?,b:?,c:?})`)
  t.is(addO({a: 5}).toString(), `curry(addObject)({a})({b:?,c:?})`)
  t.is(addO({a: 5, b: 20}).toString(), `curry(addObject)({a,b})({c:?})`)
  t.is(addO({a: 5, b: 20, c: 2, d: 100}), 127)
  t.is(addO({a: 5, b: 20, c: 2, whatever: 100}), 227)
})
test(`curryObjectN`, () => {
  const addO = curryObjectN(
    4,
    function addObject({a, b, c, d}) { return a + b + c + d }
  )
  t.is(addO.toString(), `curry(addObject)({0:?,1:?,2:?,3:?})`)
  t.is(addO({a: 5}).toString(), `curry(addObject)({0})({1:?,2:?,3:?})`)
  t.is(addO({a: 5, b: 20}).toString(), `curry(addObject)({0,1})({2:?,3:?})`)
  t.is(addO({a: 5, b: 20, c: 2}).toString(), `curry(addObject)({0,1,2})({3:?})`)
  t.is(addO({a: 1, b: 2, c: 3, d: 0}), 6)
})
