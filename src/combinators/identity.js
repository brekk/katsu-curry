/**
 * The identity combinator
 * @method I
 * @alias identity
 * @param {*} x - anything
 * @returns {*} x
 * @public
 * @example
 * import {I} from 'katsu-curry'
 * const five = I(5)
 */
export const I = (x) => x
