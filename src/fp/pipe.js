import {curry} from '../curry/katsu'
// import {stringable} from '../fp/meta'

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
 * @returns {function} - a composed function
 * @public
 * @example
 * import {pipe} from 'katsu-curry'
 * const f = (x) => x * 2
 * const g = (x) => x / 2
 * const a = Math.round(Math.random() * 10)
 * pipe(f, g)(a) === g(f(a)) // true
 */
// eslint-disable-next-line fp/no-rest-parameters
export function pipe() {
  const argLength = arguments.length
  const args = new Array(argLength)
  for (let i = 0; i < argLength; ++i) {
    args[i] = arguments[i]
  }
  return innerpipe(args)
}
