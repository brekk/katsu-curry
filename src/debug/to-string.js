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
const slice = (x) => {
  const list = []
  while (x > 0) {
    list.push(--x)
  }
  return list.reverse()
}
export const makeObjectRemainder = (objectKeys = [], argKeys = []) => {
  if (objectKeys.k && objectKeys.n) {
    objectKeys = objectKeys.k
  }
  if (!Array.isArray(objectKeys)) {
    if (typeof objectKeys === `number`) {
      return `({${slice(objectKeys - argKeys.length).join(`,`)}})`
    }
    return `({})`
  }
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
  const name = fn && fn.name || `fn`
  return `curry(${name})${argString}${remainder}`
}
export const toObjectString = (fn, objectKeys = [], args = {}) => () => {
  const argKeys = Object.keys(args)
  const argString = toObjectStringJoiner(argKeys)
  const remainder = makeObjectRemainder(objectKeys, argKeys)
  const name = fn && fn.name || `fn`
  return `curry(${name})${argString}${remainder}`
}
