import {pipe} from '@fp/pipe'
import {curry} from '@params/curry'
const join = curry((y, x) => x.join(y))
const safeJoin = curry(
  (joiner, args) => (
    args.length > 0 ?
      joiner(args) :
      ``
  )
)
const wrap = curry(
  (twoChar, str) => (
    str && `${twoChar[0]}${str}${twoChar[1]}`
  )
)
const toStringJoiner = pipe(
  safeJoin(join(`,`)),
  wrap(`()`)
)
const toObjectStringJoiner = pipe(
  safeJoin(join(`,`)),
  wrap(`{}`),
  wrap(`()`)
)

export const makeRemainder = (str) => (length) => (
  length > 0 ?
    `(` + str.repeat(length).split(``).join(`,`) + `)` :
    ``
)
const slice = (x) => {
  /* eslint-disable */
  const list = []
  while (x > 0) {
    list.push(--x)
  }
  return list.reverse()
  /* eslint-enable */
}
const question = (x) => (
  x.join(`:?,`) + (x.length > 0 ? `:?` : ``)
)
export const makeObjectRemainder = (objectKeys = [], argKeys = []) => {
  if (objectKeys.k && objectKeys.n) {
    // eslint-disable-next-line fp/no-mutation
    objectKeys = objectKeys.k
  }
  const filteredKeys = objectKeys.filter((y) => !argKeys.includes(y))
  return `({` + (
    question(filteredKeys)
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
const counter = (x) => () => x++ // eslint-disable-line
export const makeNumberObjectRemainder = (number, keys) => {
  return `({${question(slice(number - keys.length).map((y) => y + keys.length))}})`
}
export const toObjectString = (fn, curryCondition = [], args = {}) => () => {
  const argKeys = Object.keys(args)
  const conditionType = typeof curryCondition
  const name = (fn && fn.name) || `fn`
  if (conditionType !== `number`) {
    const argString = toObjectStringJoiner(argKeys)
    const remainder = makeObjectRemainder(curryCondition, argKeys)
    return `curry(${name})${argString}${remainder}`
  }
  const argStr = toObjectStringJoiner(argKeys.map(counter(0)))
  const remainds = makeNumberObjectRemainder(curryCondition, argKeys)
  return `curry(${name})${argStr}${remainds}`
}
