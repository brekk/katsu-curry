import {pipe} from '../fp/pipe'
import {prop} from './prop'
import {keys} from './object'

/**
 * returns .length if it exists on an input
 * @method propLength
 * @param {*} whatever - some input
 * @returns {number} length
 * @private
 */
const propLength = prop(`length`)

/**
 * returns total keys in an object
 * @method objectLength
 * @param {Object} object - an object
 * @returns {number} length
 * @private
 */
const objectLength = pipe(keys, propLength)

/**
 * returns .length or total keys in an object
 * @method length
 * @param {*} x - some input
 * @returns {number} length
 * @private
 */
export const length = (x) => propLength(x) || objectLength(x)
