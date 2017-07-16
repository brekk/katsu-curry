import {curry} from '../curry/katsu'
import {filter} from '../fp/filter'
import {flipIncludes} from './array'
import {keys} from './object'

/**
 * returns keys which are included in object
 * @method matchingKeys
 * @param {Array} list - some iterable
 * @param {Object} o - some object
 * @returns {booleans[]} array of matches
 */
export const matchingKeys = curry(
  (list, o) => filter(
    flipIncludes(list),
    keys(o)
  )
)
