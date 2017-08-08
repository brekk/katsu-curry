import {curry} from '../curry/katsu'
import {stringable} from '../fp/meta'

/**
 * A function which takes a list of arguments and returns an argument-reducer function
 * @method innerpipe
 * @param {Array} args - arguments Array
 * @return {function} a partially applied function which knows about args
 * @private
*/
export const innerpipe = (args) => (x) => {
    // (current, next) => next(current),
    // x
  const [first, ...rest] = args
  let current = first(x)
  for (let a = 0; a < rest.length; a++) {
    current = rest[a](current)
  }
  return current
}

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
export const pipe = (...args) => {
  const piped = innerpipe(args)
  // eslint-disable-next-line fp/no-mutation
  // piped.toString = stringable(`pipe`, args)
  return piped
}
