import {innerpipe} from './pipe'
import {stringable} from './meta'

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
export const compose = (...args) => {
  const composed = innerpipe(args.reverse()) // eslint-disable-line fp/no-mutating-methods
  // eslint-disable-next-line fp/no-mutation
  // composed.toString = stringable(`compose`, args)
  return composed
}
