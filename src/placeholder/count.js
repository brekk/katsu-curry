/**
 * count how many placeholders are in a given list of arguments
 * @method countNonPlaceholders
 * @param {function} test - a test function
 // * @param {Array} args - a list of parameters to test
 * @returns {number} - total arguments
 * @private
 */
export const countNonPlaceholders = (test) => (args) => args.reduce(
  (count, x) => (
    test(x) ? count : count + 1
  ),
  0
)
