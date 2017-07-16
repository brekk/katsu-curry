export const toString = (fn, args = []) => () => (
  `curry(${fn.toString()})${args.length > 0 ? `(${args.join(`,`)})` : ``}`
)
