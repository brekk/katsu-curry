/**
 * Use the placeholder to specify "gaps" in the partial application of a function.
 * @constant $
 * @type {string}
 * @alias PLACEHOLDER
 * @public
 * @example
 * import {curry, $} from 'katsu-curry'
 * const divide = curry((x, y) => x / y)
 * const twoOver = divide(2) // limited utility!
 * twoOver(100) // 0.02
 * const half = divide($, 2) // placehold the x parameter!
 * half(100) // 50
 */
export const PLACEHOLDER = `🍛`
export const $ = PLACEHOLDER
