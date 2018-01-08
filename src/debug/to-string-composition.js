export const composedToString = (fn, args = [], name = `pipe`) => {
  const stringifyFunctions = (x) => (
    x && x.toString && typeof x.toString === `function` ?
      x.toString() :
      `fn`
  )
  const names = args.map(stringifyFunctions)
  fn.toString = () => (
    `${name}(${names.join(`, `)})`
  )
  return fn
}
