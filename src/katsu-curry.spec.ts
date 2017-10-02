/* global test */
import KC from  './index'
import {t} from 'germs'
import '../custom.d.ts'

test.skip(`curried function`, () => {
  const add = KC.curry((a: number, b: number): number => a + b)
  t.throws(() => add(`butt`, 3), ``)
})
