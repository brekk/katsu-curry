import {pipe} from '@fp/pipe'
import {curry} from '@params/curry'

const join = curry((y, x) => x.join(y))
const repeat = curry((y, x) => x.repeat(y))
const split = curry((y, x) => x.split(y))
const map = curry((y, x) => x.map(y))
const add = curry((y, x) => x + y)
const subtract = curry((y, x) => x - y)
// const trace = curry((a, b) => { console.log(a, b); return b }) // eslint-disable-line

const safeJoin = curry(
  (joiner, x) => (
    x.length > 0 ?
      joiner(x) :
      ``
  )
)
const wrap = curry(
  (x, str) => (
    `${x[0]}${str}${x[1]}`
  )
)
const parenthesize = wrap(`()`)
const curlies = wrap(`{}`)
const commas = join(`,`)
const toStringJoiner = safeJoin(
  pipe(
    commas,
    parenthesize
  )
)
const toObjectStringJoiner = pipe(
  safeJoin(pipe(
    commas,
    // trace(`,,,`),
    curlies,
    // trace(`{{{}}}`),
    parenthesize
    // trace(`((()))`)
  ))
)

export const makeRemainder = curry((str, length) => (
  length > 0 ?
    pipe(
      repeat(length),
      split(``),
      commas,
      parenthesize
    )(str) :
    ``
))
const fillArray = (x) => {
  /* eslint-disable */
  const list = []
  while (x > 0) {
    list.push(--x)
  }
  return list.reverse()
  /* eslint-enable */
}
const question = (x) => (
  pipe(
    join(`:?,`),
    add(x.length > 0 ? `:?` : ``)
  )(x)
)
const without = curry(
  (x, y) => {
    return y.filter((z) => !(x.indexOf(z) > -1))
  }
)
export const keysWhenKeyNumOrRaw = (x) => (x && x.k && x.n ? x.k : x)
export const makeObjectRemainder = (objectKeys = [], argKeys = []) => pipe(
  keysWhenKeyNumOrRaw,
  without(argKeys),
  question,
  curlies,
  parenthesize
)(objectKeys)

const LAMDA_REMAINDER = `?`

export const toString = (fn, args = []) => () => {
  const argString = toStringJoiner(args)
  const remainder = makeRemainder(
    LAMDA_REMAINDER,
    fn.length - args.length
  )
  const name = fn && fn.name || `fn`
  return `curry(${name})${argString}${remainder}`
}
const counter = (x) => () => x++ // eslint-disable-line
export const makeNumberObjectRemainder = (number, keys) => {
  const keyLength = keys.length // 1
  return pipe(
    subtract(keyLength), // 1
    fillArray, // [0,1]
    map(add(keyLength)), // [1,2]
    question, // 1:?,2:?
    curlies, // {1:?,2:?}
    parenthesize // ({1:?,2:?})
  )(number) // 2
}
const makeObjectStringSignature = (name, obj, keys) => {
  const argString = toObjectStringJoiner(keys)
  const remainder = makeObjectRemainder(obj, keys)
  return `${name}${argString}${remainder}`
}
const makeNumberStringSignature = (name, number, keys) => {
  const remainder = makeNumberObjectRemainder(number, keys)
  return pipe(
    map(counter(0)),
    toObjectStringJoiner,
    wrap([name, remainder])
  )(keys)
}

export const toObjectString = (fn, curryCondition = [], args = {}) => () => {
  const argKeys = Object.keys(args)
  const conditionType = typeof curryCondition
  const name = `curry(` + (fn && fn.name || `fn`) + `)`
  if (conditionType === `number`) {
    return makeNumberStringSignature(name, curryCondition, argKeys)
  }
  return makeObjectStringSignature(name, curryCondition, argKeys)
}
