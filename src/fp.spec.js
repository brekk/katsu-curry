/* global test */
import {t} from './testing-helper'
import {$} from './placeholder'
import {
  curry
} from './curry'
import {pipe, compose} from './fp'

const add = curry((a, b) => a + b)
const subtract = curry((a, b) => a - b)

test(`pipe should make a composed function left to right`, () => {
  t.plan(2)
  t.is(typeof pipe, `function`)
  const identityPipe = pipe(add($, 2), subtract($, 2))
//   t.is(identityPipe.toString(), `pipe(curry(function (a, b) {
//   return a + b;
// })(🍛,2), curry(function (a, b) {
//   return a - b;
// })(🍛,2))`)
  const out = identityPipe(10)
  t.is(out, 10)
})

test(`compose should make a composed function right to left`, () => {
  t.plan(2)
  t.is(typeof compose, `function`)
  const identityPipe = compose(add($, 2), subtract($, 2))
//   t.is(identityPipe.toString(), `compose(curry(function (a, b) {
//   return a - b;
// })(🍛,2), curry(function (a, b) {
//   return a + b;
// })(🍛,2))`)
  const out = identityPipe(10)
  t.is(out, 10)
})
