/*
export {compose} from '@fp/compose'
export {pipe} from '@fp/pipe'
*/
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

export function pipe() {
  const args = prepipe(arguments)
  const piped = innerpipe(args)
  // eslint-disable-next-line fp/no-mutation
  piped.toString = composedToString(args)
  return piped
}
export function compose() {
  // eslint-disable-next-line fp/no-mutating-methods
  const args = prepipe(arguments, `compose`).reverse()
  const composed = innerpipe(args)
  // eslint-disable-next-line fp/no-mutation
  composed.toString = composedToString(args, `compose`)
  return composed
}
