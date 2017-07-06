import {curry} from './curry'

/**
 * A function which takes a list of arguments and returns an argument-reducer function
 * @method innerpipe
 * @param {Array} args - arguments Array
 * @return {function} a partially applied function which knows about args
 * @private
*/
const innerpipe = curry(
  (args) =>
  /**
   * reducer wrapper
   * @method innerpipe-wrapper
   * @param {*} x - the initial value
   * @returns {*} some value that is the result of multiple functions being applied in succession
   * @private
  */
  (x) => args.reduce(
    /**
     * the reducer function
     * @method innerpipe-reducer
     * @param {*} current - the current value
     * @param {function} next - the next function
     * @returns {*} the result of the next function being given the current value
     * @private
    */
    (current, next) => next(current),
    x
  )
)

/**
 * compose functions, left to right
 * @method pipe
 * @param {...function} args - a list of function arguments
 * @returns {function} - a composed function
 * @public
 * @example
 * pipe(f, g)(a) === g(f(a))
 */
// eslint-disable-next-line fp/no-rest-parameters
export const pipe = (...args) => innerpipe(args)

/**
 * compose functions, right to left
 * @method compose
 * @param {...function} args - a list of function arguments
 * @returns {function} - a composed function
 * @public
 * @example
 * compose(f, g)(a) === f(g(a))
 */
/* istanbul ignore next */
// eslint-disable-next-line fp/no-rest-parameters
export const compose = (...args) => innerpipe(
  args.reverse() // eslint-disable-line fp/no-mutating-methods
)
