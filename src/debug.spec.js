/* global test */
import {t} from 'jest-t-assert'
import {composedToString} from './debug/to-string-composition'
import {
  pipe,
  compose
} from './debug/fp'
import {
  curry,
  curryify
} from './debug/params'
import {
  curryObjectK,
  curryObjectKN,
  curryObjectN
} from './debug/object'

const sum = curry(function add(a, b) { return a + b })
const less = curry(function subtract(a, b) { return a + b })

test(`composedToString`, () => {
  const piped = () => {}
  const x = composedToString(piped)
  t.is(x.toString(), `pipe()`)
  const piped2 = () => {}
  const y = composedToString(piped2, `abc`.split(``), `butts`)
  t.is(y.toString(), `butts(a, b, c)`)
  const piped2point5 = () => {}
  const y2 = composedToString(piped2point5, [0, false, null], `butts`)
  t.is(y2.toString(), `butts(fn, fn, fn)`)
  const piped3 = () => {}
  const z = composedToString(piped3, [sum(1), less(1)])
  t.is(z.toString(), `pipe(curry(add)(1)(?), curry(subtract)(1)(?))`)
})

test(`pipe / compose .toString()`, () => {
  const piped = pipe(sum(1), less(1))
  t.is(piped.toString(), `pipe(curry(add)(1)(?), curry(subtract)(1)(?))`)
  const composed = compose(sum(1), less(1))
  t.is(composed.toString(), `compose(curry(subtract)(1)(?), curry(add)(1)(?))`)
})
test(`curryify`, () => {
  const divide = (a, b) => (b / a)
  const test = (x) => x === `butts`
  const curryWithButts = curryify(test)
  const divideWithButts = curryWithButts(divide)
  t.is(divideWithButts(4, 2), 0.5)
  t.is(typeof divideWithButts(`butts`, 2), `function`)
  t.is(divideWithButts(`butts`, 2).toString(), `curry(divide)(butts,2)`)
  t.is(divideWithButts(`butts`, 2)(4), 0.5)
})
test(`curry`, () => {
  const curriedAdd = curry(
    function add(a, b, c) {
      return a + b + c
    }
  )
  t.throws(() => curry(`butts`), `Expected to be given a function to curry!`)
  t.is(curriedAdd.toString(), `curry(add)(?,?,?)`)
  t.is(curriedAdd(1).toString(), `curry(add)(1)(?,?)`)
  t.is(curriedAdd(1, 2).toString(), `curry(add)(1,2)(?)`)
  t.is(curriedAdd(1, 2, 3), 6)
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
    3,
    function addObject({a, b, c}) { return a + b + c }
  )
  t.is(addO.toString(), `curry(addObject)({0,1,2})`)
  t.is(addO({a: 5}).toString(), `curry(addObject)({a})({0,1})`)
  t.is(addO({a: 5, b: 20}).toString(), `curry(addObject)({a,b})({0})`)
  t.is(addO({a: 1, b: 2, c: 3}), 6)
})