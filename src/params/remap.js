import {curry} from './curry'

export const remapParameters = (indices, arr) => {
  const copy = Array.from(arr)
  if (!copy.length) {
    return copy
  }
  return copy.map(
    (x, index) => {
      if (indices.includes(index)) {
        return copy[indices[index]]
      }
      return x
    }
  )
}

/**
 * easily remap an array by indices
 * @method remapArray
 * @param {Array} indices - an array of indices to remap
 * @param {Array} arr - an input array
 * @returns {Array} remapped array
 * @public
 * @example
 * import {remapArray} from 'katsu-curry'
 * remapArray([2,1,0], [`up`, `is`, `what`]).join(` `) // "what is up"
 */
export const remapArray = curry(remapParameters)

export const remapFunction = (indices, fn) => {
  const remapArgs = remapArray(indices)
  const curried = curry(fn)
  return function remappedFn() {
    const args = remapArgs(Array.from(arguments))
    return curried.apply(null, args)
  }
}

/**
 * reframe any function with the arguments as you want, plus curry
 * @method remap
 * @param {Array} indices - an array of indices to remap
 * @param {Function} fn - a function
 * @public
 * @example
 * import {remap} from 'katsu-curry'
 * const quaternaryFunction = (a, b, c, d) => ((a + b + c) / d)
 * const quaternaryFunctionLastShuffle = remap([1, 2, 3, 0], quaternaryFunction)
 * quaternaryFunctionLastShuffle(1, 2, 3, 4) === ((2 + 3 + 4) / 1)
 */
export const remap = curry(remapFunction)
