/*
export {curry} from '@params/curry'
export {curryify} from '@params/ify'
export {remap, remapArray} from '@params/remap'
 */
import {PLACEHOLDER} from '@placeholder/index'
import fastSome from 'fast.js/array/some'
import {remapParameters} from '@params/remap'
import {toString} from './to-string'

const slice = Array.prototype.slice
const isPlaceholder = (x) => x === PLACEHOLDER
export const curryify = (testPlaceholder) => {
  const hasPlaceholder = (a) => {
    for(let y = 0; y < a.length; y++) {
      if (testPlaceholder(a[y])) {
        return true
      }
    }
    return false
  }

  function testArguments(initial, next, args, cursor, length) {
    if (cursor === length) {
      return next
    }
    while (++cursor < length) {
      next[cursor] = (
        args.length && testPlaceholder(initial[cursor]) ?
          args.shift() :
          initial[cursor]
      )
      if (!args.length || testPlaceholder(a[cursor])) {
        break
      }
    }
    return next
  }

  function partial(
    context,
    fn,
    initial,
    next,
    cursor,
    length,
    args
  ) {
    next = (
      !args.length ?
      next :
      testArguments(initial, next, args, cursor, length)
    )
    function partiallyApplied() {
      return partial(
        context,
        fn,
        initial,
        next,
        next.length,
        slice.apply(arguments)
      )
    }
    return (
      next.length === length ?
      fn.apply(context, next) :
      partiallyApplied
    )
  }

  function curryWithPlaceholder(context, fn, initial) {
    function partialWithPlaceholder() {
      return partial(
        context,
        fn,
        initial,
        [],
        0,
        (
          fn.length && !testPlaceholder(initial[initial.length - 1]) ?
          fn.length :
          initial.length
        ),
        slice.call(arguments)
      )
    }
    partialWithPlaceholder.toString = toString(partialWithPlaceholder, initial)
    return partialWithPlaceholder
  }

  return function curry(fn) {
    const length = fn.length
    let context = this || null
    let initial
    if (typeof fn === `function`) {
      initial = (
        arguments.length === 1 ?
        [] :
        slice.call(arguments, 1)
      )
    } else {
      context = fn
      fn = arguments[1]
      initial = (
        arguments.length === 2 ?
        [] :
        slice.call(arguments, 2)
      )
    }
    function curried() {
      const xLength = arguments.length
      const ctx = context || this
      if (initial.length + xLength !== length) {
        return curry.apply(ctx, (
          !xLength ?
            [fn].concat(initial) :
            [fn].concat(initial.concat(slice.call(arguments)))
          )
        )
      }
      if (!initial.length) {
        return (
          xLength === 1 ?
            fn.call(ctx, arguments[0]) :
            fn.apply(ctx, arguments)
        )
      } else {
        return (
          fn.apply(ctx, (
            !xLength ?
              initial :
              initial.concat(slice.call(arguments))
            )
          )
        )
      }
    }
    curried.toString = toString(curried)
    return (
      hasPlaceholder(initial) ?
      curryWithPlaceholder(context, fn, initial, 0, length) :
      curried
    )
  }
}
export const curry = curryify(isPlaceholder)

export const remapArray = curry(remapParameters)
export const remap = curry((indices, fn) => {
  const remapArgs = remapArray(indices)
  const curried = curry(fn)
  return function remappedFn() {
    const args = remapArgs(Array.from(arguments))
    return curried.apply(null, args)
  }
})
