
export interface VariadicFunction {
  (...a: any[]): any
}

export interface CurriedFunction {
  (fn: VariadicFunction): VariadicFunction
}

export interface TestFunction {
  (x: any): boolean
}

export function curryify(test: TestFunction): (a: VariadicFunction) => CurriedFunction
export function curry(a: VariadicFunction): CurriedFunction
// declare module 'Curry/ify' {
//   declare function curryify: curryify
// }
// declare module 'Curry/katsu' {
// }
