/*
export {curryObjectK} from '@object/by-keys'
export {curryObjectN} from '@object/by-number-of-keys'
export {curryObjectKN} from '@object/by-keys-or-number'
*/

import {expectNArgs} from '@object/by-number-of-keys'
import {expectKArgs} from '@object/by-keys'
import {expectKOrNArgs} from '@object/by-keys-or-number'
import {curry} from '@params/curry'
import {pipe} from '@fp/pipe'
import {merge} from '@utils/object'
import {toObjectString} from './to-string'

const curryObjectByCondition = curry(
  (comparison, keys, fn) => {
    function curried(args) {
      const joined = pipe(
        merge(args),
        curried
      )
      joined.toString = toObjectString(fn, keys, args)
      return (
        comparison(keys, args) ?
          fn(args) :
          joined
      )
    }
    curried.toString = toObjectString(fn, keys)
    return curried
  }
)

export const curryObjectK = curryObjectByCondition(expectKArgs)
export const curryObjectN = curryObjectByCondition(expectNArgs)
export const curryObjectKN = curryObjectByCondition(expectKOrNArgs)
