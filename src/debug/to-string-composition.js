/**
 * generate a string which represents the ongoing partial-application view
 * @method composedToString
 * @param {string[]} args - a list of arguments
 * @param {string} name = 'pipe' - the name for your composed function
 * @returns {function} - a function which could be used as a `toString` function
 * @protected
 */
export const composedToString = (args = [], name = `pipe`) => {
  const stringifyFunctions = (x) => (
    x && x.toString && typeof x.toString === `function` ?
      x.toString() :
      `fn`
  )
  const names = args.map(stringifyFunctions)
  return () => (
    `${name}(${names.join(`, `)})`
  )
}
