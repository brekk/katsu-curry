const joinArgs = (joiner) => (args) => {
  return (
    args.length > 0 ?
      joiner(args) :
      ``
  )
}
const toStringJoiner = joinArgs((x) => `(${x.join(`,`)})`)
const toObjectStringJoiner = joinArgs((x) => `({${x.join(`,`)}})`)

const makeRemainder = (str) => (length) => `(` + (
  str
).repeat(length).split(``).join(`,`) + `)`
const makeObjectRemainder = (objectKeys, argKeys) => {
  const filteredKeys = objectKeys.filter((y) => !argKeys.includes(y))
  return `({` + (
    filteredKeys.join(`:?,`) + `:?`
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
const OBJECT_LAMDA_REMAINDER = `?`
export const toObjectString = (fn, objectKeys, args = {}) => () => {
  const argKeys = Object.keys(args)
  const argString = toObjectStringJoiner(argKeys)
  console.log(`ARGKEYS`, argKeys, objectKeys, argString)
  const remainder = makeObjectRemainder(objectKeys, argKeys)
  return `curry(${(fn.name || `fn`)})${argString}${remainder}`
}
