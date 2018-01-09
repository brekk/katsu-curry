/*
export {compose} from '@fp/compose'
export {pipe} from '@fp/pipe'
*/
export {filter} from '@fp/filter'
import {innerpipe} from '@fp/pipe'
import {composedToString} from './to-string-composition'

export function pipe() {
  const args = Array.from(arguments)
  const piped = innerpipe(args)
  // eslint-disable-next-line fp/no-mutation
  piped.toString = composedToString(args)
  return piped
}
export function compose() {
  // eslint-disable-next-line fp/no-mutating-methods
  const args = Array.from(arguments).reverse()
  const composed = innerpipe(args)
  // eslint-disable-next-line fp/no-mutation
  composed.toString = composedToString(args, `compose`)
  return composed
}
