/**
 * 🍛 The default placeholder value
 * @constant PLACEHOLDER
 * @public
 * @alias $
 * @example
 * import {curry, PLACEHOLDER as $} from 'katsu-curry'
 * // $ is actually also exported as an alias, for your convenience
 * const divide = curry((a, b) => a / b)
 * const half = divide($, 2)
 */
export const PLACEHOLDER = `🍛`
export const $ = PLACEHOLDER
