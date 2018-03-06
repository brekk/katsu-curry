import {
  pipe as _pipe,
  compose as _compose
} from './fp'
import {
  curryObjectK as _curryObjectK,
  curryObjectN as _curryObjectN,
  curryObjectKN as _curryObjectKN
} from './object'
import {
  curry as _curry,
  curryify as _curryify,
  remap as _remap,
  remapArray as _remapArray
} from './params'

export {$, PLACEHOLDER} from '@placeholder/index'
export const curry = _curry
export const curryObjectN = _curryObjectN
export const curryObjectK = _curryObjectK
export const curryObjectKN = _curryObjectKN
export const pipe = _pipe
export const compose = _compose
export {K, I} from '@combinators/index'

export const curryify = _curryify
export const remap = _remap
export const remapArray = _remapArray
export const version = `debug`
