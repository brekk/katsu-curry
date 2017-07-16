import {curry} from '../curry/katsu'
const {assign: _assign, keys: _keys, freeze: _freeze} = Object

export const keys = _keys
export const assign = _assign
export const freeze = _freeze

/**
 * A simple Object.values implementation
 * @method values
 * @param {Object} x - an object
 * @returns {Array} the values in the object
 * @private
 */
export const values = (x) => {
  const v = []
  /* eslint-disable fp/no-loops */
  for (let key in x) { // eslint-disable-line fp/no-let
    v.push(x[key]) // eslint-disable-line fp/no-mutating-methods
  }
  /* eslint-enable fp/no-loops */
  return v
}

/**
 * curried Object.assign and enforced as a binary function
 * @method merge
 * @param {Object} a - object a
 * @param {Object} b - object b
 * @returns {Object} c
 * @private
 */
export const merge = curry((a, b) => assign({}, a, b))
