/*
export {$, PLACEHOLDER} from '@placeholder/index'
export {compose} from '@fp/compose'
export {pipe} from '@fp/pipe'
export {version} from '../package.json'
export {K, I} from '@combinators/index'
export {curry} from '@params/curry'
export {curryify} from '@params/ify'
export {remap, remapArray} from '@params/remap'
export {curryObjectK, curryObjectN, curryObjectKN} from '@object/index'
 */

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
export {K, I} from '@combinators/index'

export const pipe = _pipe
export const compose = _compose
export const curryObjectK = _curryObjectK
export const curryObjectKN = _curryObjectKN
export const curryObjectN = _curryObjectN
export const curry = _curry
export const curryify = _curryify
export const remap = _remap
export const remapArray = _remapArray
export const version = `debug`
