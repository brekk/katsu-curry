import test from 'ava'
import {$} from './placeholder'
import {
  curry
} from './curry'
import {stringable, pipe, compose} from './fp'

const add = curry((a, b) => a + b)
const subtract = curry((a, b) => a - b)

test(`pipe should make a composed function left to right`, (t) => {
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

test(`compose should make a composed function right to left`, (t) => {
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

test(`stringable is a utility function`, (t) => {
  t.plan(3)
  t.is(typeof stringable, `function`)
  const out = stringable(`xxx`, `abc`.split(``).map((x) => () => x))
  t.is(typeof out, `function`)
  t.is(out(), `xxx(function () {
      return x;
    }, function () {
      return x;
    }, function () {
      return x;
    })`)
})
