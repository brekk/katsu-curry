const joinArgs = (joiner) => (args) => {
  return (
    args.length > 0 ?
      joiner(args) :
      ``
  )
}
const toStringJoiner = joinArgs((x) => `(${x.join(`,`)})`)
const toObjectStringJoiner = joinArgs((x) => `({${x.join(`,`)}})`)

export const makeRemainder = (str) => (length) => (
  length > 0 ?
    `(` + str.repeat(length).split(``).join(`,`) + `)` :
    ``
)
export const makeObjectRemainder = (objectKeys = [], argKeys = []) => {
  const filteredKeys = objectKeys.filter((y) => !argKeys.includes(y))
  return `({` + (
    filteredKeys.join(`:?,`) + (filteredKeys.length > 0 ? `:?` : ``)
  ) + `})`
}
const LAMDA_REMAINDER = `?`
export const toString = (fn, args = []) => () => {
  const argString = toStringJoiner(args)
  const remainder = makeRemainder(LAMDA_REMAINDER)(
    fn.length - args.length
  )
  return `curry(${(fn.name || `fn`)})${argString}${remainder}`
}
export const toObjectString = (fn, objectKeys = [], args = {}) => () => {
  const argKeys = Object.keys(args)
  const argString = toObjectStringJoiner(argKeys)
  const remainder = makeObjectRemainder(objectKeys, argKeys)
  return `curry(${(fn.name || `fn`)})${argString}${remainder}`
}
