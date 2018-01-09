/* global test */
import {t} from 'jest-t-assert'
import {
  $
} from './placeholder'
import {
  curryify,
  curry,
  remap,
  remapArray
} from './params'

const symbolTest = (x) => (y) => x === y

test(`curryify barfs given a non-test function input`, () => {
  t.throws(() => curryify(`barf`), `Expected to be given a function to test placeholders!`)
})
test(`curryify barfs given a non-function to currify`, () => {
  t.throws(() => curryify(() => false)(`barf`), `Expected to be given a function to curry!`)
})

test(`curryify allows you to add custom curried functions with placeholders`, () => {
  t.plan(2)
  const divide = (a, b) => a / b
  const fire = `🔥`
  const fireTest = symbolTest(fire)
  const hotCurry = curryify(fireTest)
  const over = hotCurry(divide)
  const half = over(fire, 2)
  const fraction = over(1)
  t.is(half(20), 10)
  t.is(fraction(100), 1 / 100)
})

test(`curry allows you to curry functions, with a curry emoji as a placeholder`, () => {
  t.plan(2)
  const divide = (a, b) => a / b
  const over = curry(divide)
  const half = over($, 2)
  const fraction = over(1)
  t.is(half(20), 10)
  t.is(fraction(100), 1 / 100)
})

// deprecated! functionality moved to debug.spec.js
test.skip(`curry returns an error when given a non-function, up front`, () => {
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
