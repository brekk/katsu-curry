import {curry} from '@params/curry'

/**
 * Grab a property, but delegatee last
 * @method prop
 * @param {string} property - an object property
 * @param {Object} o - an object
 * @returns {*} some property
 * @private
 */
export const prop = curry((property, o) => o && property && o[property])
