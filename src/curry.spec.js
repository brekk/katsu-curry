import test from 'ava'
import {
  PLACEHOLDER as $,
  curryify,
  curry,
  symbolTest
} from './curry'

test(`curryify allows you to add custom curried functions with placeholders`, (t) => {
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

test(`curry allows you to curry functions, with a curry emoji as a placeholder`, (t) => {
  t.plan(2)
  const divide = (a, b) => a / b
  const over = curry(divide)
  const half = over($, 2)
  const fraction = over(1)
  t.is(half(20), 10)
  t.is(fraction(100), 1 / 100)
})
