/**
 * A function that merges parameters, given a test function
 * @method mergeParams
 * @param {function} test - something to test whether a given argument is a placeholder
 // * @param {Array} a - first argument list to compare
 // * @param {Array} b - second argument list to compare
 * @returns {Array} - merged argument lists
 * @private
 */
export const mergeParamsByTest = (test, a, b) => a.map(
  (y) => (
    test(y) && b[0] ?
    b.shift() : // eslint-disable-line fp/no-mutating-methods
    y
  )
).concat(b)
