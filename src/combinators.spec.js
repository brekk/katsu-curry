import test from 'ava'
import {I} from './combinators/identity'
import {K} from './combinators/constant'

test(`I should always return what it is given`, (t) => {
  t.is(typeof I, `function`)
  const input = Math.round(Math.random() * 100)
  const output = I(input)
  t.is(input, output)
})

test(`K should always return a function which returns the original param`, (t) => {
  t.is(typeof K, `function`)
  const input = Math.round(Math.random() * 100)
  const output = K(input)
  t.is(input, output())
})
