import pkg from '../package.json'
export * from './curry'
export * from './object'
import * as placeholder from './placeholder'
import * as fp from './fp'
export * from './combinators'

const {pipe: p, compose: c} = fp
export const pipe = p
export const compose = c
export const {version} = pkg
export const {$} = placeholder
export const PLACEHOLDER = $
