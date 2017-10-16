import {curry} from '@params/curry'

/**
 * curried form of Array.includes, but with the parameters not flipped as per the convention
 * @method flipIncludes
 * @param {*} item - something to compare
 * @param {Array} iterable - an iterable to test inclusion for
 * @returns {boolean} whether item is included in iterable
 * @private
 */
export const flipIncludes = curry((list, x) => list.includes(x))
