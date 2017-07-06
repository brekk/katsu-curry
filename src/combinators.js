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

/**
 * The constant combinator
 * @method K
 * @alias always
 * @param {*} x - anything
 * @returns {function} - a function which eventually returns x
 * @example
 * import {K} from 'katsu-curry'
 * const fiveFn = K(5)
 * const twoFn = K(2)
 * fiveFn() * twoFn() // 10
 */
export const K = (x) => () => x

export const always = K
export const identity = I
