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

/**
 * Given object and expected keys, continually curry until expected keys are met
 * @method curryObjectKN
 * @param {Object} expected - expected object
 * @param {number} expected.n - minimum expected keys
 * @param {Array} expected.k - expected keys
 * @param {function} fn - function to be curried
 * @returns {function} - invoked function or partially applied function
 * @public
 * @example
 * // import {curryObjectKN} from 'katsu-curry/debug'
 * import {curryObjectKN} from 'katsu-curry/debug'
 * const setTheTable = curryObjectKN({
 *   k: [`knives`, `forks`, `spoons`],
 *   n: 4
 * }, function placeSet({knives, forks, spoons, drinks = [`wine`]}) (
 *   `${knives} x ${forks} + ${spoons} + ${drinks}`
 * ))
 * const setTheKnivesAndSpoons = setTheTable({forks: [0,1,2,3]}) // partial-application!
 * setTheKnivesAndSpoons.toString() // curry(placeSet)({forks})({knives:?,spoons:?})
 */
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

/**
 * Given object and expected keys, continually curry until expected keys are met
 * @method curryObjectK
 * @param {Array} expected - expected keys
 * @param {function} fn - function to be curried
 * @returns {function} - invoked function or partially applied function
 * @public
 * @example
 * import {curryObjectK} from 'katsu-curry/debug'
 * const abcProps = curryObjectK([`a`, `b`, `c`], function abc({a, b, c, optional = 1}) {
 *  return a + b + c / optional
 * })
 * abcProps({a: 1, b: 2, c: 3}) // 6
 * abcProps({a: 1, b: 2}) // function expecting one more param
 * abcProps({a: 1, b: 2}).toString() // curry(abc)({a,b})({c:?})
 * abcProps({a: 1, b: 2, c: 3, optional: 10}) // 0.6
 */
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

/**
 * Given object with n keys, continually curry until n keys are met
 * @method curryObjectN
 * @param {number} arity - total expected keys
 * @param {function} fn - function to be curried
 * @returns {function} - invoked function or partially applied function
 * @public
 * @example
 * import {curryObjectN} from 'katsu-curry/debug'
 * const threeKeyProps = curryObjectN(3, Object.keys)
 * threeKeyProps({a: 1, b: 2, c: 3}) // [`a`, `b`, `c`]
 * threeKeyProps({a: 1, b: 2}) // function expecting one more param
 * threeKeyProps({a: 1, b: 2}).toString() // curry(keys)({0,1})({2:?})
 */
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
