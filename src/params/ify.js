/**
 * Pass currify a test which validates placeholders, and it will give you back a function which
 * curries other functions
 * @method curryify
 * @param {function} test - a function which asserts whether a given parameter is a placeholder
 // * @param {function} fn - a function to be curried
 * @returns {function} - a curried function
 * @private
 */
export const curryify = (test__) => {
  const test = (x) => {
    console.log(`comparing x`, x)
    return test__(x)
  }
  const slice = Array.prototype.slice
  const hasPlaceholder = (list) => {
     /* eslint-disable fp/no-mutation */
     /* eslint-disable fp/no-let */
     /* eslint-disable fp/no-loops */
    for (let a = 0; a < list.length; a++) {
      if (test(list[a])) {
        return true
      }
    }
    return false
     /* eslint-enable fp/no-mutation */
     /* eslint-enable fp/no-let */
     /* eslint-enable fp/no-loops */
  }

  function testArguments(prev, next, args, cursor, length) {
    if (cursor === length) {
      return next
    }
     /* eslint-disable fp/no-mutation */
     /* eslint-disable fp/no-mutating-methods */
     /* eslint-disable fp/no-loops */
    while (++cursor < length) {
      next[cursor] = (
         args.length && test(prev[cursor]) ?
           args.shift() :
           prev[cursor]
       )
      if (!args.length || test(prev[cursor])) break
    }
     /* eslint-enable fp/no-mutation */
     /* eslint-enable fp/no-mutating-methods */
     /* eslint-enable fp/no-loops */
    return next
  }

  function partial(
     context,
     fn,
     prev,
     next,
     cursor,
     length,
     args
   ) {
     // eslint-disable-next-line fp/no-mutation
    next = (
     !args.length ?
       next :
       testArguments(prev, next, args, cursor, length)
    )
    function partiallyApplied() {
      return partial(
         context,
         fn,
         prev,
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

  function curryWithPlaceholder(context, fn, prev) {
    function partialWithPlaceholder() {
      const args = (
        fn.length && !test(prev[prev.length - 1]) ?
        fn.length :
        prev.length
      )
      return partial(
         context,
         fn,
         prev,
         [],
         0,
         args,
         slice.call(arguments)
       )
    }
    return partialWithPlaceholder
  }

  return function katsuCurry(fn) {
    const length = fn.length
     /* eslint-disable fp/no-let */
    let context = this || null
    let prev
     /* eslint-enable fp/no-let */
     /* eslint-disable fp/no-mutation */
    if (typeof fn === `function`) {
      prev = (
         arguments.length === 1 ?
         [] :
         slice.call(arguments, 1)
       )
    } else {
      context = fn
      fn = arguments[1]
      prev = (
         arguments.length === 2 ?
         [] :
         slice.call(arguments, 2)
       )
    }
     /* eslint-enable fp/no-mutation */
    function curried() {
      const xLength = arguments.length
      const ctx = context || this
      if (prev.length + xLength !== length) {
        return katsuCurry.apply(ctx, (
           !xLength ?
             [fn].concat(prev) :
             [fn].concat(prev.concat(slice.call(arguments)))
           )
         )
      }
      if (!prev.length) {
        return (
           xLength === 1 ?
             fn.call(ctx, arguments[0]) :
             fn.apply(ctx, arguments)
        )
      }
      return (
           fn.apply(ctx, (
             !xLength ?
               prev :
               prev.concat(slice.call(arguments))
             )
           )
      )
    }
    return (
       hasPlaceholder(prev) ?
       curryWithPlaceholder(context, fn, prev, [], 0, length) :
       curried
    )
  }
}
