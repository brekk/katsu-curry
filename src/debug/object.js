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
const merge = curry((x, y) => Object.assign({}, x, y))

/* eslint-disable fp/no-throw */
const barfWhen = (dis) => {
  const o = Object.freeze({
    keysAreNotAnArray: (k) => {
      if (!Array.isArray(k)) {
        throw new TypeError(`${dis} expected an array of wanted keys.`)
      }
      return o
    },
    arityIsNotANumber: (n) => {
      if (typeof n !== `number` || isNaN(n)) {
        throw new TypeError(`${dis} expected to be given a number for arity.`)
      }
      return o
    },
    noFunctionIsGiven: (fn) => {
      if (typeof fn !== `function`) {
        throw new TypeError(`${dis} expected to be given a function to curry.`)
      }
      return o
    }
  })
  return o
}
/* eslint-enable fp/no-throw */

export function curryObjectKN({k, n}, fn) {
  barfWhen(`curryObjectKN`)
    .keysAreNotAnArray(k)
    .arityIsNotANumber(n)
    .noFunctionIsGiven(fn)
  function λcurryObjectKN(args) {
    /* istanbul ignore next */
    const joined = (z) => λcurryObjectKN(merge(args, z))
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
    barfWhen(`curryObjectK`)
      .keysAreNotAnArray(keys)
      .noFunctionIsGiven(fn)
    function λcurryObjectK(args) {
      /* istanbul ignore next */
      const joined = (z) => λcurryObjectK(merge(args, z))
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
  barfWhen(`curryObjectN`)
    .arityIsNotANumber(arity)
    .noFunctionIsGiven(fn)
  function λcurryObjectN(args) {
    /* istanbul ignore next */
    const joined = (z) => λcurryObjectN(merge(args, z))
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
