/*
export {compose} from '@fp/compose'
export {pipe} from '@fp/pipe'
*/
export {filter} from '@fp/filter'

import {innerpipe} from '@fp/pipe'
import {composedToString} from './to-string-composition'

export function pipe() {
  const args = Array.from(arguments)
  return composedToString(innerpipe(args), args)
}
export function compose() {
  const args = Array.from(arguments).reverse()
  return composedToString(innerpipe(args), args, `compose`)
}
