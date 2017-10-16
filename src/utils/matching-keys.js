import {curry} from '@params/curry'
import {filter} from '@fp/filter'
import {flipIncludes} from '@utils/array'
import {keys} from '@utils/object'

/**
 * returns keys which are included in object
 * @method matchingKeys
 * @param {Array} list - some iterable
 * @param {Object} o - some object
 * @returns {booleans[]} array of matches
 * @private
 */
export const matchingKeys = curry(
  (list, o) => filter(
    flipIncludes(list),
    keys(o)
  )
)
