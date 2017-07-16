export * from './curry'
export * from './object'
export * from './placeholder'
import * as fp from './fp'
export * from './combinators'

const {pipe: p, compose: c} = fp
export const pipe = p
export const compose = c
