export {filter} from '@fp/filter'
import {innerpipe} from '@fp/pipe'
import {composedToString} from './to-string-composition'
const slice = Array.prototype.slice
const aintFunction = (x) => typeof x !== `function`

const prepipe = (a, name = `pipe`) => {
  const args = slice.call(a)
  if (args.filter(aintFunction).length > 0) {
    // eslint-disable-next-line fp/no-throw
    throw new Error(
      `${name} expected all arguments to be functions.`
    )
  }
  return args
}

/**
 * compose functions, from left to right (or top to bottom, depending on your perspective)
 * @method pipe
 * @returns {function} - a composed function
 * @public
 * @example
 * import {pipe} from 'katsu-curry/debug'
 * const multiply = curry(function mult(x, y) { return x * y }) // named inner function
 * const divide = curry(function div(x, y) { return x / y})
 * const twice = multiply(2)
 * const half = divide($, 2)
 * const x = Math.round(Math.random() * 10)
 * pipe(half, twice)(x) === twice(half(x)) // true
 * const identity = pipe(half, twice) // (x / 2) * 2 === x
 * identity.toString() // pipe(curry(div)(🍛,2), curry(mult)(2)(?))
 */
export function pipe() {
  const args = prepipe(arguments)
  const piped = innerpipe(args)
  // eslint-disable-next-line fp/no-mutation
  piped.toString = composedToString(args)
  return piped
}
/**
 * compose functions, right to left
 * @method compose
 * @returns {function} - a composed function
 * @public
 * @example
 * import {compose, curry, $} from 'katsu-curry/debug'
 * const multiply = curry(function mult(x, y) { return x * y }) // named inner function
 * const divide = curry(function div(x, y) { return x / y})
 * const twice = multiply(2)
 * const half = divide($, 2)
 * const x = Math.round(Math.random() * 10)
 * compose(half, twice)(x) === half(twice(x)) // true
 * const identity = compose(half, twice)
 * identity.toString() // compose(curry(mult)(2)(?), curry(div)(🍛,2))
 */
export function compose() {
  // eslint-disable-next-line fp/no-mutating-methods
  const args = prepipe(arguments, `compose`).reverse()
  const composed = innerpipe(args)
  // eslint-disable-next-line fp/no-mutation
  composed.toString = composedToString(args, `compose`)
  return composed
}
