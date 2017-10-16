import {pipe} from '@fp/pipe'
import {curry} from '@params/curry'
import {length} from '@utils/length'
import {matchingKeys} from '@utils/matching-keys'

/**
 * return whether the all the given keys exist on an object
 * @method matchingKeyCount
 * @param {Array} list - some iterable
 * @param {Object} o - some object
 * @returns {boolean}
 * @private
 */
export const matchingKeyCount = curry(
  (list, o) => pipe(
    matchingKeys(list),
    length
  )(o)
)
