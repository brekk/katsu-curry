import {curry} from './curry'

const {assign: _assign, keys: _keys} = Object

export const keys = _keys
export const assign = _assign

export const prop = curry((property, o) => o[property])

export const values = (x) => {
  const v = []
  /* eslint-disable fp/no-loops */
  for (let key in x) { // eslint-disable-line fp/no-let
    v.push(x[key]) // eslint-disable-line fp/no-mutating-methods
  }
  /* eslint-enable fp/no-loops */
  return v
}
const delegatee = curry((method, arg, x) => (x[method](arg)))
const filter = delegatee(`filter`)
export const merge = curry((a, b) => assign({}, a, b))

// eslint-disable-next-line fp/no-rest-parameters
export const pipe = (...args) => (x) => args.reduce((last, curr) => curr(last), x)

const propLength = prop(`length`)
const objectLength = pipe(keys, propLength)
export const length = (x) => propLength(x) || objectLength(x)

export const matchingKeys = curry(
  (list, o) => filter(
    (x) => list.includes(x),
    keys(o)
  )
)

export const matchingKeyCount = curry(
  (list, o) => pipe(
    matchingKeys(list),
    length
  )(o)
)
