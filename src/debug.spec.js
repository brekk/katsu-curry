/* global test */
import {t} from 'jest-t-assert'
import {composedToString} from './debug/to-string-composition'
import {
  $
} from './placeholder/constant'
import {
  pipe,
  compose
} from './debug/fp'
import {
  curry,
  curryify,
  remap,
  remapArray
} from './debug/params'
import {
  toString,
  makeRemainder,
  toObjectString,
  makeObjectRemainder,
  keysWhenKeyNumOrRaw
} from './debug/to-string'
import {
  curryObjectK,
  curryObjectKN,
  curryObjectN
} from './debug/object'

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
  t.is(addO({a: 1})({b: 2})({c: 3}), 6)
  t.throws(
    () => {
      curryObjectK(null, null)
    },
    `curryObjectK expected an array of wanted keys.`
  )
  t.throws(
    () => {
      curryObjectK([], null)
    },
    `curryObjectK expected to be given a function to curry.`
  )
})
test(`curryObjectKN`, () => {
  t.throws(
    () => {
      curryObjectKN({k: null, n: null}, null)
    },
    `curryObjectKN expected an array of wanted keys.`
  )
  t.throws(
    () => {
      curryObjectKN({k: [`a`], n: null}, null)
    },
    `curryObjectKN expected to be given a number for arity.`
  )
  t.throws(
    () => {
      curryObjectKN({k: [`a`], n: 1}, null)
    },
    `curryObjectKN expected to be given a function to curry.`
  )
  const addO = curryObjectKN(
    {k: `abc`.split(``), n: 4},
    function addObject({a, b, c, d = 200}) { return a + b + c + d }
  )
  t.is(addO.toString(), `curry(addObject)({a:?,b:?,c:?})`)
  t.is(addO({a: 5}).toString(), `curry(addObject)({a})({b:?,c:?})`)
  t.is(addO({a: 5, b: 20}).toString(), `curry(addObject)({a,b})({c:?})`)
  t.is(addO({a: 5, b: 20, c: 2, d: 100}), 127)
  t.is(addO({a: 5, b: 20, c: 2, whatever: 100}), 227)
  t.is(addO({a: 5})({b: 20})({c: 2}), 227)
})
test(`curryObjectN`, () => {
  t.throws(
    () => {
      curryObjectN(null, null)
    },
    `curryObjectN expected to be given a number for arity.`
  )
  t.throws(
    () => {
      curryObjectN(1, null)
    },
    `curryObjectN expected to be given a function to curry.`
  )
  const addO = curryObjectN(
    4,
    function addObject({a, b, c, d}) { return a + b + c + d }
  )
  t.is(addO.toString(), `curry(addObject)({0:?,1:?,2:?,3:?})`)
  t.is(addO({a: 5}).toString(), `curry(addObject)({0})({1:?,2:?,3:?})`)
  t.is(addO({a: 5, b: 20}).toString(), `curry(addObject)({0,1})({2:?,3:?})`)
  t.is(addO({a: 5, b: 20, c: 2}).toString(), `curry(addObject)({0,1,2})({3:?})`)
  t.is(addO({a: 1, b: 2, c: 3, d: 0}), 6)
  t.is(addO({a: 1})({b: 2})({c: 3})({d: 0}), 6)
  t.is(addO({a: 1})({b: 2})({c: 3})({}).toString(), `curry(addObject)({0,1,2})({3:?})`)
})

const sum = curry(function add(a, b) { return a + b })
const less = curry(function subtract(a, b) { return b - a })

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

test(`composedToString`, () => {
  const x = composedToString()
  t.is(x(), `pipe()`)
  const y = composedToString(`abc`.split(``), `butts`)
  t.is(y(), `butts(a, b, c)`)
  const y2 = composedToString([0, false, null], `butts`)
  t.is(y2(), `butts(fn, fn, fn)`)
  const z = composedToString([sum(1), less(1)])
  t.is(z(), `pipe(curry(add)(1)(?), curry(subtract)(1)(?))`)
})

test(`pipe / compose .toString()`, () => {
  const piped = pipe(sum(1), less(1))
  t.is(piped.toString(), `pipe(curry(add)(1)(?), curry(subtract)(1)(?))`)
  const composed = compose(sum(1), less(1))
  t.is(composed.toString(), `compose(curry(subtract)(1)(?), curry(add)(1)(?))`)
})
test(`pipe / compose throw`, () => {
  t.throws(
    () => {
      pipe(null)
    },
    `pipe expected all arguments to be functions.`
  )
  t.throws(
    () => {
      compose(null)
    },
    `compose expected all arguments to be functions.`
  )
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
  t.is(curriedAdd(1, $, 2).toString(), `curry(add)(1,${$},2)`)
  t.is(curriedAdd(1, $, $, 2).toString(), `curry(add)(1,${$},${$},2)`)
  t.is(curriedAdd(1, 2, 3), 6)
})
test(`curry returns an error when given a non-function, up front`, () => {
  t.plan(4)
  const impatientExpectation = `Expected to be given a function to curry!`
  t.throws(() => curry(``), impatientExpectation)
  t.throws(() => curry(null), impatientExpectation)
  t.throws(() => curry(100), impatientExpectation)
  t.throws(() => curry({}), impatientExpectation)
})

test(`remapArray should allow for expressive array remapping`, () => {
  const identity = [0, 1, 2]
  const swapLast = [0, 2, 1]
  const alphaZappa = [5, 1, 2, 3, 4, 0]
  const inputs = {
    abc: `abc`.split(``),
    greek: [`alpha`, `beta`, `gamma`, `delta`, `epsilon`, `zeta`]
  }
  const outputs = {
    identity: remapArray(identity, inputs.abc),
    swapLast: remapArray(swapLast, inputs.abc),
    zetaFirst: remapArray(alphaZappa, inputs.greek),
    swapLastOnGreek: remapArray(swapLast, inputs.greek)
  }
  const expected = {
    identity: inputs.abc,
    swapLast: `acb`.split(``),
    zetaFirst: [
      `zeta`,
      `beta`,
      `gamma`,
      `delta`,
      `epsilon`,
      `alpha`
    ],
    swapLastOnGreek: [
      `alpha`,
      `gamma`,
      `beta`,
      `delta`,
      `epsilon`,
      `zeta`
    ]
  }
  t.deepEqual(remapArray([1, 2, 3], []), [])
  t.deepEqual(outputs.identity, expected.identity)
  t.deepEqual(outputs.swapLast, expected.swapLast)
  t.deepEqual(outputs.zetaFirst, expected.zetaFirst)
  t.deepEqual(outputs.swapLastOnGreek, expected.swapLastOnGreek)
})

test(`remap should allow for argument remapping`, () => {
  const divide = (b, a) => a / b
  const ivideday = remap([1, 0], divide)
  const def = divide(1, 2)
  t.is(def, 2)
  t.is(ivideday(1, 2), 0.5)
  const quaternaryFunction = (a, b, c, d) => {
    return ((a + b + c) / d)
  }
  const quaternaryFunctionUnchanged = remap([0, 1, 2, 3], quaternaryFunction)
  t.is(quaternaryFunctionUnchanged(1, 2, 3, 4), 1.5)
  const quaternaryFunctionUnchanged2 = remap([], quaternaryFunction)
  t.is(quaternaryFunctionUnchanged2(1, 2, 3, 4), 1.5)
  const quaternaryFunctionLastFirst = remap([3, 0, 1, 2], quaternaryFunction)
  t.is(quaternaryFunctionLastFirst(1, 2, 3, 4), ((4 + 1 + 2) / 3))
  const quaternaryFunctionLastShuffle = remap([1, 2, 3, 0], quaternaryFunction)
  t.is(quaternaryFunctionLastShuffle(1, 2, 3, 4), ((2 + 3 + 4) / 1))
})
test(`keysWhenKeyNumOrRaw`, () => {
  t.deepEqual(keysWhenKeyNumOrRaw({k: `abc`.split(``), n: 4}), `abc`.split(``))
  t.deepEqual(keysWhenKeyNumOrRaw({butts: `yes`}), {butts: `yes`})
})
