/* global test */
import {t} from 'germs'
import map from 'ramda/src/map'
import filter from 'ramda/src/filter'
import reject from 'ramda/src/reject'
import {
  curryObjectN,
  curryObjectK,
  curryObjectKN
} from './object/index'

import {
  pipe
} from './fp'

import {
  length
} from './utils/length'

import {
  keys,
  values,
  merge
} from './utils/object'

test(`merge should be object assign + curry`, () => {
  const rando = (x) => Math.round(Math.random() * x)
  const [a, b, c] = [rando(), rando(), rando()]
  t.deepEqual({a, b, c}, merge({a, b}, {c}))
})

test(`curryObjectN should allow unary functions that use key-length as arity`, () => {
  const takes3 = curryObjectN(3, (x) => {
    return values(x).reduce((_, y) => _ + y, 0)
  })
  const output = takes3({a: 1, b: 2, c: 3})
  const output2 = takes3({x: 23, y: 24, z: 25})
  t.deepEqual(output, 6)
  t.deepEqual(output2, 72)
})
const permutationsForABCXZ = (a, b, c, x, z) => ({
  a: {a},
  b: {b},
  c: {c},
  x: {x},
  ab: {a, b},
  ac: {a, c},
  bc: {b, c},
  ax: {a, x},
  bx: {b, x},
  cx: {c, x},
  az: {a, z},
  bz: {b, z},
  cz: {c, z},
  xz: {x, z},
  abc: {a, b, c},
  abx: {a, b, x},
  acx: {a, c, x},
  abz: {a, b, z},
  bcx: {b, c, x},
  bcz: {b, c, z},
  abcx: {a, b, c, x},
  abcz: {a, b, c, z},
  acxz: {a, c, x, z}
})
const isFunction = (x) => typeof x === `function`
const functionProps = filter(isFunction)
const noFnProps = reject(isFunction)
const totalFunctionProperties = pipe(functionProps, keys, length)
test(`curryObjectN should return functions when key length has not been met`, () => {
  const divideThenSum = curryObjectN(3, (obj) => {
    const [A, B, C] = values(obj)
    return B + C / A
  })
  t.is(typeof divideThenSum, `function`)
  const permutations1 = permutationsForABCXZ(10, 2, 8, 3, 5)
  const permutations2 = permutationsForABCXZ(1, 2, 3, 4, 5)
  const op = map(divideThenSum)
  const outputs1 = op(permutations1)
  const outputs2 = op(permutations2)
  t.deepEqual(noFnProps(outputs1), {
    abc: 2.8,
    abcx: 2.8,
    abcz: 2.8,
    abx: 2.3,
    abz: 2.5,
    acx: 8.3,
    acxz: 8.3,
    bcx: 9.5,
    bcz: 10.5
  })
  t.deepEqual(totalFunctionProperties(outputs1), 14)
  t.deepEqual(noFnProps(outputs2), {
    abc: 5,
    abcx: 5,
    abcz: 5,
    abx: 6,
    abz: 7,
    acx: 7,
    acxz: 7,
    bcx: 5,
    bcz: 5.5
  })
  t.deepEqual(totalFunctionProperties(outputs2), 14)
})
test(`curryObjectK should return functions when explicit keys have not been met`, () => {
  const divideThenSum = curryObjectK([`a`, `b`, `c`], (obj) => {
    const [A, B, C] = values(obj)
    return B + C / A
  })
  const permutations1 = permutationsForABCXZ(10, 2, 8, 3, 5)
  const permutations2 = permutationsForABCXZ(1, 2, 3, 4, 5)
  const op = map(divideThenSum)
  const outputs1 = op(permutations1)
  const outputs2 = op(permutations2)
  t.deepEqual(noFnProps(outputs1), {
    abc: 2.8,
    abcx: 2.8,
    abcz: 2.8
  })
  t.deepEqual(totalFunctionProperties(outputs1), 20)
  t.deepEqual(noFnProps(outputs2), {
    abc: 5,
    abcx: 5,
    abcz: 5
  })
  t.deepEqual(totalFunctionProperties(outputs2), 20)
})
test(`curryObjectKN should behave like both other morphisms`, () => {
  t.plan(6)
  t.is(typeof curryObjectKN, `function`)
  const input = {a: 1, b: 2, c: 3}
  const input2 = {a: 1, b: 2, c: 3, d: 4}
  const input3 = {a: 1, b: 2, c: 3, d: 4, e: 10}
  const input4 = {a: 1, b: 2, c: 3, d: 4, whatever: 10}
  const input5 = {a: 1, w: 2, x: 3, y: 4, z: 10}
  const doit = curryObjectKN(
    {k: `abc`.split(``), n: 5},
    ({a = 1, b = 1, c = 1, d = 1, e = 0}) => e + ((a + b + c) / d)
  )
  t.is(doit(input), 6)
  t.is(doit(input2), 1.5)
  t.is(doit(input3), 11.5)
  t.is(doit(input4), 1.5)
  t.is(doit(input5), 3)
})
test(`curryObjectK(fn).toString() should return useful curry info`, () => {
  const add = ({a, b}) => a + b
  const sum = curryObjectK([`a`, `b`], add)
  t.is(sum.toString(), `curry(add)`)
  t.is(sum({a: 4}).toString(), `curry(add)({a})`)
})
