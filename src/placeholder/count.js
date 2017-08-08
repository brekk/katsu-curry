/**
 * count how many placeholders are in a given list of arguments
 * @method countNonPlaceholders
 * @param {function} test - a test function
 // * @param {Array} args - a list of parameters to test
 * @returns {number} - total arguments
 * @private
 */
export const countNonPlaceholders = (test, args) => {
  // args.reduce(
  // (count, x) => (
  //   test(x) ? count : count + 1
  // ),
  // 0
  let count = 0
  for (let i = 0; i < args.length; i++) {
    if (test(args[i])) count += 1
  }
  return count
}
