import {innerpipe} from './pipe'

/**
 * compose functions, right to left
 * @method compose
 * @returns {function} - a composed function
 * @public
 * @example
 * import {compose} from 'katsu-curry'
 * const f = (x) => x * 2
 * const g = (x) => x / 2
 * const a = Math.round(Math.random() * 10)
 * compose(f, g)(a) === f(g(a)) // true
 */
export function compose() {
  const argLength = arguments.length
  const args = new Array(argLength)
  for (let i = 0; i < argLength; ++i) {
    args[i] = arguments[i]
  }
  return innerpipe(args.reverse())
}
