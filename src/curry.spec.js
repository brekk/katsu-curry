/* global test */
import {
  $,
  test as symbolTest
} from './placeholder'
import {
  curryify,
  curry
} from './curry'
import {t} from './testing-helper'

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
