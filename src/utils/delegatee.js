import {curry} from '../curry/katsu'

/**
 * Grab a method, and invoke it with a parameter
 * @method delegatee
 * @param {string} method - an object method
 * @param {string} param - a parameter to be passed to the method
 * @param {Object} o - an object
 * @returns {*} some property
 * @private
 */
export const delegatee = curry((method, arg, x) => (x[method](arg)))

// NB: the above premise is taken to its maximums in the `entrust` library
