import * as placeholder from '@placeholder/index'
import * as fp from '@fp/index'
import * as pkg from '../package.json'

export {K, I} from '@combinators/index'
export * from '@curry/index'
export * from '@object/index'

const {pipe: p, compose: c} = fp
export const pipe = p
export const compose = c
export const {version} = pkg
export const {$} = placeholder
export const PLACEHOLDER = $
