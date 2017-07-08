export * from './curry'
export * from './curry-object'
export * from './combinators'
import {pipe as p, compose as c} from './fn'

export const pipe = p
export const compose = c
