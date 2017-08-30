/* global test */
import {
  $
} from './placeholder'
import {
  curryify,
  curry
} from './curry'
import {t} from './testing-helper'

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

test(`curry returns an error when given a non-function, up front`, () => {
  t.plan(4)
  t.throws(() => curry(``), `Expected to be given a function to curry!`)
  t.throws(() => curry(null), `Expected to be given a function to curry!`)
  t.throws(() => curry(100), `Expected to be given a function to curry!`)
  t.throws(() => curry({}), `Expected to be given a function to curry!`)
})
