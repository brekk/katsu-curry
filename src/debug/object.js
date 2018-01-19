/*
export {curryObjectK} from '@object/by-keys'
export {curryObjectN} from '@object/by-number-of-keys'
export {curryObjectKN} from '@object/by-keys-or-number'
*/

// import {expectNArgs} from '@object/by-number-of-keys'

import {expectKArgs} from '@object/by-keys'
// import {expectKOrNArgs} from '@object/by-keys-or-number'
import {curry} from '@params/curry'
import {length} from '@utils/length'
import {toObjectString} from './to-string'

export function curryObjectKN({k, n}, fn) {
  function λcurryObjectKN(args) {
    /* istanbul ignore next */
    const joined = (z) => λcurryObjectKN(Object.assign({}, args, z))
    joined.toString = toObjectString(fn, k, args) // eslint-disable-line
    return (
      expectKArgs(k, args) || length(args) >= n ?
        fn(args) :
        joined
    )
  }
  λcurryObjectKN.toString = toObjectString(fn, k) // eslint-disable-line
  return λcurryObjectKN
}

export const curryObjectK = curry(
  (keys, fn) => {
    function λcurryObjectK(args) {
      /* istanbul ignore next */
      const joined = (z) => λcurryObjectK(Object.assign({}, args, z))
      joined.toString = toObjectString(fn, keys, args) // eslint-disable-line
      return (
        expectKArgs(keys, args) ?
          fn(args) :
          joined
      )
    }
    λcurryObjectK.toString = toObjectString(fn, keys) // eslint-disable-line
    return λcurryObjectK
  }
)

export function curryObjectN(arity, fn) {
  function λcurryObjectN(args) {
    /* istanbul ignore next */
    const joined = (z) => λcurryObjectN(Object.assign({}, args, z))
    joined.toString = toObjectString(fn, arity, args) // eslint-disable-line
    return (
      Object.keys(args).length >= arity ?
        fn(args) :
        joined
    )
  }
  λcurryObjectN.toString = toObjectString(fn, arity) // eslint-disable-line
  return λcurryObjectN
}
