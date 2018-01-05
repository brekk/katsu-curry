export const toString = (fn, args = []) => () => {
  const argString = (
    args.length > 0 ?
      `(${args.join(`,`)})` :
      ``
  )
  return `curry(${(fn.name || `fn`)})${argString}`
}
export const toObjectString = (fn, args = {}) => () => {
  const argKeys = Object.keys(args)
  const argString = (
    argKeys.length > 0 ?
      `({${argKeys.join(`,`)}})` :
      ``
  )
  return `curry(${(fn.name || `fn`)})${argString}`
}
