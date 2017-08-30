import {pipe} from '@fp/pipe'
import {prop} from '@utils/prop'
import {keys} from '@utils/object'

/**
 * returns .length if it exists on an input
 * @method propLength
 * @param {*} whatever - some input
 * @returns {number} length
 * @private
 */
export const propLength = prop(`length`)

/**
 * returns total keys in an object
 * @method objectLength
 * @param {Object} object - an object
 * @returns {number} length
 * @private
 */
export const objectLength = pipe(keys, propLength)

/**
 * returns .length or total keys in an object
 * @method length
 * @param {*} x - some input
 * @returns {number} length
 * @private
 */
/* istanbul ignore next */
export const length = (x) => (typeof x === `object` ? objectLength(x) : propLength(x))
