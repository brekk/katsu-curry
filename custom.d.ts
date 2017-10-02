declare module 'katsu-curry' {
  export function K<T>(x: T): () => T
  export function I<T>(x: T): T

  // CURRY

  export interface CurriedTypeGuard2<T1, T2, R extends T2> {
      (t1: T1): (t2: T2) => t2 is R;
      (t1: T1, t2: T2): t2 is R;
  }

  export interface CurriedTypeGuard3<T1, T2, T3, R extends T3> {
      (t1: T1): CurriedTypeGuard2<T2, T3, R>;
      (t1: T1, t2: T2): (t3: T3) => t3 is R;
      (t1: T1, t2: T2, t3: T3): t3 is R;
  }

  export interface CurriedTypeGuard4<T1, T2, T3, T4, R extends T4> {
      (t1: T1): CurriedTypeGuard3<T2, T3, T4, R>;
      (t1: T1, t2: T2): CurriedTypeGuard2<T3, T4, R>;
      (t1: T1, t2: T2, t3: T3): (t4: T4) => t4 is R;
      (t1: T1, t2: T2, t3: T3, t4: T4): t4 is R;
  }

  export interface CurriedTypeGuard5<T1, T2, T3, T4, T5, R extends T5> {
      (t1: T1): CurriedTypeGuard4<T2, T3, T4, T5, R>;
      (t1: T1, t2: T2): CurriedTypeGuard3<T3, T4, T5, R>;
      (t1: T1, t2: T2, t3: T3): CurriedTypeGuard2<T4, T5, R>;
      (t1: T1, t2: T2, t3: T3, t4: T4): (t5: T5) => t5 is R;
      (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): t5 is R;
  }

  export interface CurriedTypeGuard6<T1, T2, T3, T4, T5, T6, R extends T6> {
      (t1: T1): CurriedTypeGuard5<T2, T3, T4, T5, T6, R>;
      (t1: T1, t2: T2): CurriedTypeGuard4<T3, T4, T5, T6, R>;
      (t1: T1, t2: T2, t3: T3): CurriedTypeGuard3<T4, T5, T6, R>;
      (t1: T1, t2: T2, t3: T3, t4: T4): CurriedTypeGuard2<T5, T6, R>;
      (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): (t6: T6) => t6 is R;
      (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6): t6 is R;
  }

  export interface CurriedFunction2<T1, T2, R> {
      (t1: T1): (t2: T2) => R;
      (t1: T1, t2: T2): R;
  }

  export interface CurriedFunction3<T1, T2, T3, R> {
      (t1: T1): CurriedFunction2<T2, T3, R>;
      (t1: T1, t2: T2): (t3: T3) => R;
      (t1: T1, t2: T2, t3: T3): R;
  }

  export interface CurriedFunction4<T1, T2, T3, T4, R> {
      (t1: T1): CurriedFunction3<T2, T3, T4, R>;
      (t1: T1, t2: T2): CurriedFunction2<T3, T4, R>;
      (t1: T1, t2: T2, t3: T3): (t4: T4) => R;
      (t1: T1, t2: T2, t3: T3, t4: T4): R;
  }

  export interface CurriedFunction5<T1, T2, T3, T4, T5, R> {
      (t1: T1): CurriedFunction4<T2, T3, T4, T5, R>;
      (t1: T1, t2: T2): CurriedFunction3<T3, T4, T5, R>;
      (t1: T1, t2: T2, t3: T3): CurriedFunction2<T4, T5, R>;
      (t1: T1, t2: T2, t3: T3, t4: T4): (t5: T5) => R;
      (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): R;
  }

  export interface CurriedFunction6<T1, T2, T3, T4, T5, T6, R> {
      (t1: T1): CurriedFunction5<T2, T3, T4, T5, T6, R>;
      (t1: T1, t2: T2): CurriedFunction4<T3, T4, T5, T6, R>;
      (t1: T1, t2: T2, t3: T3): CurriedFunction3<T4, T5, T6, R>;
      (t1: T1, t2: T2, t3: T3, t4: T4): CurriedFunction2<T5, T6, R>;
      (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5): (t6: T6) => R;
      (t1: T1, t2: T2, t3: T3, t4: T4, t5: T5, t6: T6): R;
  }

  export function curry<T1, T2, TResult extends T2>(fn: (a: T1, b: T2) => b is TResult): CurriedTypeGuard2<T1, T2, TResult>;
  export function curry<T1, T2, T3, TResult extends T3>(fn: (a: T1, b: T2, c: T3) => c is TResult): CurriedTypeGuard3<T1, T2, T3, TResult>;
  export function curry<T1, T2, T3, T4, TResult extends T4>(fn: (a: T1, b: T2, c: T3, d: T4) => d is TResult): CurriedTypeGuard4<T1, T2, T3, T4, TResult>;
  export function curry<T1, T2, T3, T4, T5, TResult extends T5>(fn: (a: T1, b: T2, c: T3, d: T4, e: T5) => e is TResult): CurriedTypeGuard5<T1, T2, T3, T4, T5, TResult>;
  export function curry<T1, T2, T3, T4, T5, T6, TResult extends T6>(fn: (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6) => f is TResult): CurriedTypeGuard6<T1, T2, T3, T4, T5, T6, TResult>;
  export function curry<T1, T2, TResult>(fn: (a: T1, b: T2) => TResult): CurriedFunction2<T1, T2, TResult>;
  export function curry<T1, T2, T3, TResult>(fn: (a: T1, b: T2, c: T3) => TResult): CurriedFunction3<T1, T2, T3, TResult>;
  export function curry<T1, T2, T3, T4, TResult>(fn: (a: T1, b: T2, c: T3, d: T4) => TResult): CurriedFunction4<T1, T2, T3, T4, TResult>;
  export function curry<T1, T2, T3, T4, T5, TResult>(fn: (a: T1, b: T2, c: T3, d: T4, e: T5) => TResult): CurriedFunction5<T1, T2, T3, T4, T5, TResult>;
  export function curry<T1, T2, T3, T4, T5, T6, TResult>(fn: (a: T1, b: T2, c: T3, d: T4, e: T5, f: T6) => TResult): CurriedFunction6<T1, T2, T3, T4, T5, T6, TResult>;
  export function curry(fn: (...a: any[]) => any): (...a: any[]) => any;

  // FP
  export function compose<V0, T1>(
    fn0: (x0: V0) => T1
  ): (x0: V0) => T1
  export function compose<V0, V1, T1>(
    fn0: (x0: V0, x1: V1) => T1
  ): (x0: V0, x1: V1) => T1
  export function compose<V0, V1, V2, T1>(
    fn0: (x0: V0, x1: V1, x2: V2) => T1
  ): (x0: V0, x1: V1, x2: V2) => T1
  export function compose<V0, T1, T2>(
    fn1: (x: T1) => T2,
    fn0: (x0: V0) => T1
  ): (x0: V0) => T2
  export function compose<V0, V1, T1, T2>(fn1: (x: T1) => T2,
                          fn0: (x0: V0, x1: V1) => T1
  ): (x0: V0, x1: V1) => T2
  export function compose<V0, V1, V2, T1, T2>(fn1: (x: T1) => T2,
                              fn0: (x0: V0, x1: V1, x2: V2) => T1
  ): (x0: V0, x1: V1, x2: V2) => T2
  export function compose<V0, T1, T2, T3>(fn2: (x: T2) => T3,
                          fn1: (x: T1) => T2,
                          fn0: (x: V0) => T1
  ): (x: V0) => T3
  export function compose<V0, V1, T1, T2, T3>(fn2: (x: T2) => T3,
                              fn1: (x: T1) => T2,
                              fn0: (x0: V0, x1: V1) => T1
  ): (x0: V0, x1: V1) => T3
  export function compose<V0, V1, V2, T1, T2, T3>(fn2: (x: T2) => T3,
                                  fn1: (x: T1) => T2,
                                  fn0: (x0: V0, x1: V1, x2: V2) => T1
  ): (x0: V0, x1: V1, x2: V2) => T3
  export function compose<V0, T1, T2, T3, T4>(fn3: (x: T3) => T4,
                              fn2: (x: T2) => T3,
                              fn1: (x: T1) => T2,
                              fn0: (x: V0) => T1
  ): (x: V0) => T4
  export function compose<V0, V1, T1, T2, T3, T4>(fn3: (x: T3) => T4,
                                  fn2: (x: T2) => T3,
                                  fn1: (x: T1) => T2,
                                  fn0: (x0: V0, x1: V1) => T1
  ): (x0: V0, x1: V1) => T4
  export function compose<V0, V1, V2, T1, T2, T3, T4>(fn3: (x: T3) => T4,
                                      fn2: (x: T2) => T3,
                                      fn1: (x: T1) => T2,
                                      fn0: (x0: V0, x1: V1, x2: V2) => T1
  ): (x0: V0, x1: V1, x2: V2) => T4
  export function compose<V0, T1, T2, T3, T4, T5>(fn4: (x: T4) => T5,
                                  fn3: (x: T3) => T4,
                                  fn2: (x: T2) => T3,
                                  fn1: (x: T1) => T2,
                                  fn0: (x: V0) => T1
  ): (x: V0) => T5
  export function compose<V0, V1, T1, T2, T3, T4, T5>(fn4: (x: T4) => T5,
                                      fn3: (x: T3) => T4,
                                      fn2: (x: T2) => T3,
                                      fn1: (x: T1) => T2,
                                      fn0: (x0: V0, x1: V1) => T1
  ): (x0: V0, x1: V1) => T5
  export function compose<V0, V1, V2, T1, T2, T3, T4, T5>(fn4: (x: T4) => T5,
                                          fn3: (x: T3) => T4,
                                          fn2: (x: T2) => T3,
                                          fn1: (x: T1) => T2,
                                          fn0: (x0: V0, x1: V1, x2: V2) => T1
  ): (x0: V0, x1: V1, x2: V2) => T5
  export function compose<V0, T1, T2, T3, T4, T5, T6>(fn5: (x: T5) => T6,
                                      fn4: (x: T4) => T5,
                                      fn3: (x: T3) => T4,
                                      fn2: (x: T2) => T3,
                                      fn1: (x: T1) => T2,
                                      fn0: (x: V0) => T1
  ): (x: V0) => T6
  export function compose<V0, V1, T1, T2, T3, T4, T5, T6>(
    fn5: (x: T5) => T6,
    fn4: (x: T4) => T5,
    fn3: (x: T3) => T4,
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (x0: V0, x1: V1) => T1): (x0: V0, x1: V1) => T6
  export function compose<V0, V1, V2, T1, T2, T3, T4, T5, T6>(
    fn5: (x: T5) => T6,
    fn4: (x: T4) => T5,
    fn3: (x: T3) => T4,
    fn2: (x: T2) => T3,
    fn1: (x: T1) => T2,
    fn0: (x0: V0, x1: V1, x2: V2) => T1
  ): (x0: V0, x1: V1, x2: V2) => T6

  // PIPE
  export function pipe<V0, T1>(
    fn0: (x0: V0) => T1
  ): (x0: V0) => T1
  export function pipe<V0, V1, T1>(
    fn0: (x0: V0, x1: V1) => T1
  ): (x0: V0, x1: V1) => T1
  export function pipe<V0, V1, V2, T1>(
    fn0: (x0: V0, x1: V1, x2: V2) => T1
  ): (x0: V0, x1: V1, x2: V2) => T1
  export function pipe<V0, T1, T2>(
    fn0: (x0: V0) => T1,
    fn1: (x: T1) => T2
  ): (x0: V0) => T2
  export function pipe<V0, V1, T1, T2>(
    fn0: (x0: V0, x1: V1) => T1,
    fn1: (x: T1) => T2
  ): (x0: V0, x1: V1) => T2
  export function pipe<V0, V1, V2, T1, T2>(
    fn0: (x0: V0, x1: V1, x2: V2) => T1,
    fn1: (x: T1) => T2
  ): (x0: V0, x1: V1, x2: V2) => T2
  export function pipe<V0, T1, T2, T3>(
    fn0: (x: V0) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3): (x: V0) => T3
  export function pipe<V0, V1, T1, T2, T3>(
    fn0: (x0: V0, x1: V1) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3
  ): (x0: V0, x1: V1) => T3
  export function pipe<V0, V1, V2, T1, T2, T3>(
    fn0: (x0: V0, x1: V1, x2: V2) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3
  ): (x0: V0, x1: V1, x2: V2) => T3
  export function pipe<V0, T1, T2, T3, T4>(
    fn0: (x: V0) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4
  ): (x: V0) => T4
  export function pipe<V0, V1, T1, T2, T3, T4>(
    fn0: (x0: V0, x1: V1) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4
  ): (x0: V0, x1: V1) => T4
  export function pipe<V0, V1, V2, T1, T2, T3, T4>(
    fn0: (x0: V0, x1: V1, x2: V2) => T1,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4
  ): (x0: V0, x1: V1, x2: V2) => T4
  export function pipe<V0, T1, T2, T3, T4, T5>(
    fn0: (x: V0) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5
  ): (x: V0) => T5
  export function pipe<V0, V1, T1, T2, T3, T4, T5>(
    fn0: (x0: V0, x1: V1) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5
  ): (x0: V0, x1: V1) => T5
  export function pipe<V0, V1, V2, T1, T2, T3, T4, T5>(
    fn0: (x0: V0, x1: V1, x2: V2) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5
  ): (x0: V0, x1: V1, x2: V2) => T5
  export function pipe<V0, T1, T2, T3, T4, T5, T6>(
    fn0: (x: V0) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6): (x: V0) => T6
  export function pipe<V0, V1, T1, T2, T3, T4, T5, T6>(
    fn0: (x0: V0, x1: V1) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6
  ): (x0: V0, x1: V1) => T6
  export function pipe<V0, V1, V2, T1, T2, T3, T4, T5, T6>(
    fn0: (x0: V0, x1: V1, x2: V2) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6
  ): (x0: V0, x1: V1, x2: V2) => T6
  export function pipe<V0, T1, T2, T3, T4, T5, T6, T7>(
    fn0: (x: V0) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn: (x: T6) => T7
  ): (x: V0) => T7
  export function pipe<V0, V1, T1, T2, T3, T4, T5, T6, T7>(
    fn0: (x0: V0, x1: V1) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6,
    fn6: (x: T6) => T7
  ): (x0: V0, x1: V1) => T7
  export function pipe<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7>(
    fn0: (x0: V0, x1: V1, x2: V2) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6,
    fn6: (x: T6) => T7
  ): (x0: V0, x1: V1, x2: V2) => T7
  export function pipe<V0, T1, T2, T3, T4, T5, T6, T7, T8>(
    fn0: (x: V0) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6,
    fn6: (x: T6) => T7,
    fn: (x: T7) => T8
  ): (x: V0) => T8
  export function pipe<V0, V1, T1, T2, T3, T4, T5, T6, T7, T8>(
    fn0: (x0: V0, x1: V1) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6,
    fn6: (x: T6) => T7,
    fn7: (x: T7) => T8
  ): (x0: V0, x1: V1) => T8
  export function pipe<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7, T8>(
    fn0: (x0: V0, x1: V1, x2: V2) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6,
    fn6: (x: T6) => T7,
    fn7: (x: T7) => T8
  ): (x0: V0, x1: V1, x2: V2) => T8
  export function pipe<V0, T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    fn0: (x0: V0) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6,
    fn6: (x: T6) => T7,
    fn7: (x: T7) => T8,
    fn8: (x: T8) => T9
  ): (x0: V0) => T9
  export function pipe<V0, V1, T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    fn0: (x0: V0, x1: V1) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6,
    fn6: (x: T6) => T7,
    fn7: (x: T7) => T8,
    fn8: (x: T8) => T9
  ): (x0: V0, x1: V1) => T9
  export function pipe<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    fn0: (x0: V0, x1: V1, x2: V2) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6,
    fn6: (x: T6) => T7,
    fn7: (x: T7) => T8,
    fn8: (x: T8) => T9
  ): (x0: V0, x1: V1, x2: V2) => T9
  export function pipe<V0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
    fn0: (x0: V0) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6,
    fn6: (x: T6) => T7,
    fn7: (x: T7) => T8,
    fn8: (x: T8) => T9,
    fn9: (x: T9) => T10
  ): (x0: V0) => T10
  export function pipe<V0, V1, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
    fn0: (x0: V0, x1: V1) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6,
    fn6: (x: T6) => T7,
    fn7: (x: T7) => T8,
    fn8: (x: T8) => T9,
    fn9: (x: T9) => T10
  ): (x0: V0, x1: V1) => T10
  export function pipe<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
    fn0: (x0: V0, x1: V1, x2: V2) => T1,
    fn1: (x: T1) => T2,
    fn2: (x: T2) => T3,
    fn3: (x: T3) => T4,
    fn4: (x: T4) => T5,
    fn5: (x: T5) => T6,
    fn6: (x: T6) => T7,
    fn7: (x: T7) => T8,
    fn8: (x: T8) => T9,
    fn9: (x: T9) => T10
  ): (x0: V0, x1: V1, x2: V2) => T10

  export function filter<T>(fn: (x: any) => boolean, iterable: Array<T>): Array<T>

  // OBJECT
  export function curryObjectK(keys: string[],  fn: (o: object) => any): (o: object) => any

  // PLACEHOLDER
  const CURRY = '🍛'

  export const PLACEHOLDER: typeof CURRY
  export const $: typeof CURRY


  // UTILS
  export function flipIncludes(list: any[], x: any): boolean
  export function delegatee(method: string, arg: any, x: any): any
  export function length(x: any): number
  export function matchingKeys(xs: any[], o: any): any[]
  export function matchingKeyCount(xs: any[]): number
  export function values(x: any): any[]
  export function prop(property: string, x: any): any
}
// COMBINATORS
