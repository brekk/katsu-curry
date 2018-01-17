import {innerpipe} from '@fp/pipe'

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
  /* eslint-disable fp/no-let */
  /* eslint-disable fp/no-loops */
  /* eslint-disable fp/no-mutation */
  for (let i = argLength - 1; i > -1; --i) {
    args[i] = arguments[i]
  }
  /* eslint-enable fp/no-let */
  /* eslint-enable fp/no-loops */
  /* eslint-enable fp/no-mutation */
  // const reversed = args.reverse()
  return innerpipe(args)
}
