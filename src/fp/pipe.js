/**
 * A function which takes a list of arguments and returns an argument-reducer function
 * @method innerpipe
 * @param {Array} args - arguments Array
 * @returns {function} a partially applied function which knows about args
 * @private
*/
export const innerpipe = (args) => (x) => {
  const [first, ...rest] = args // eslint-disable-line fp/no-rest-parameters
  /* eslint-disable fp/no-let */
  /* eslint-disable fp/no-loops */
  /* eslint-disable fp/no-mutation */
  let current = first(x)
  for (let a = 0; a < rest.length; a++) {
    current = rest[a](current)
  }
  /* eslint-enable fp/no-let */
  /* eslint-enable fp/no-loops */
  /* eslint-enable fp/no-mutation */
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
export function pipe() {
  const argLength = arguments.length
  const args = new Array(argLength)
  /* eslint-disable fp/no-let */
  /* eslint-disable fp/no-loops */
  /* eslint-disable fp/no-mutation */
  for (let i = 0; i < argLength; ++i) {
    args[i] = arguments[i]
  }
  /* eslint-enable fp/no-let */
  /* eslint-enable fp/no-loops */
  /* eslint-enable fp/no-mutation */
  return innerpipe(args)
}
