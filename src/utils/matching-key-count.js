import {pipe} from '../fp/pipe'
import {curry} from '../curry/katsu'
import {length} from './length'
import {matchingKeys} from './matching-keys'

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
