import {delegatee} from '@utils/delegatee'
/**
 * @method filter
 * @param {function} fn - a function to filter an iterable on
 * @param {Array} iterable - an iterable
 * @returns {Array} some filtered version of the list
 * @private
 */
export const filter = delegatee(`filter`)
