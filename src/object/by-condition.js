import {curry} from '@params/curry'
import {pipe} from '@fp/pipe'
import {merge} from '@utils/object'
import {toObjectString} from '@params/to-string'

/**
 * Take some arguments, test them, and then either return a partially applied function or the answer
 * @method curryObjectByCondition
 * @param {function} comparison - function to compare arguments
 * @param {*} x - input
 * @param {function} fn - function to be curried
 * @returns {function} - invoked function or partially applied function
 * @private
 * @example
 * import {curryObjectByCondition} from 'katsu-curry'
 * const expectNArgs = (size, args) => length(args) >= size
 * const curryObjectN = curryObjectByCondition(expectNArgs)
 */
export const curryObjectByCondition = curry(
  (comparison, x, fn) => {
    function curriedL(args) {
      const joined = pipe(
        merge(args),
        curriedL
      )
      joined.toString = toObjectString(fn, args)
      return (
        comparison(x, args) ?
          fn(args) :
          joined
      )
    }
    curriedL.toString = toObjectString(fn)
    return curriedL
  }
)
