/**
 * test whether two symbols match
 * @method test
 * @param {*} x - symbol lookup x
 // * @param {*} y - symbol lookup y
 * @returns {boolean} - whether the two symbols match
 * @private
 */
export const test = (x) => (y) => Symbol.for(y) === Symbol.for(x)
