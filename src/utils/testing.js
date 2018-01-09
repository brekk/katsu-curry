export function isCodeCoverageMode() {
  const gcv = `__coverage__`
  // eslint-disable-next-line
  const globalvar = new Function(`return this`)()
  const coverage = globalvar[gcv]
  return coverage || false
}
