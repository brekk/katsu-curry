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
