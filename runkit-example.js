const {curry, curryObjectN, curryObjectK} = require(`katsu-curry`)
const ternary = (a, b, c) => (a + b) / c
const curriedTernary = curry(ternary)
const log = console.log.bind(console)
// these are all the same
log(`a ${curriedTernary(2, 4, 6)}`) // 1
log(`b ${curriedTernary(2, 4)(6)}`) // 1
log(`c ${curriedTernary(2)(4)(6)}`) // 1

// partially apply 2,4 to a list!
log(`d [${[1, 2, 3, 4, 5, 6].map(curriedTernary(2, 4))}]`)

// object-style! - functions are unary but take objects, which can be cleanly destructured:
const ternaryO = ({a, b, c}) => (a + b) / c

// three-by-number
const curriedTernaryO = curryObjectN(3, ternaryO)
const anyObjectTernary = curriedTernaryO({a: 2, b: 4})

log(`d ${anyObjectTernary({c: 6})}`) // 1
// it fires when any 3 keys fulfill the parameters
log(`e ${anyObjectTernary({d: 100})}`) // NaN === (2 + 4 / undefined)

// three-by-explicit-keys
const curriedTernaryK = curryObjectK(`abc`.split(``), ternaryO)
const anyObjectWithC = curriedTernaryK({a: 2, b: 4}) // expects c!

log(`f ${anyObjectWithC({c: 6})}`) // 1
// only fires when a + b + c parameters are fulfilled
log(`g ${anyObjectWithC({d: 100})}`) // function expecting c
log(`h ${anyObjectWithC({c: 6, d: 100})}`) // 1; d ignored
