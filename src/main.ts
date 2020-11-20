type Params<F extends (...args: any[]) => any> = F extends (
  ...args: infer A
) => any
  ? A
  : never

const sum = (x: number, y: number) => x + y

type t0 = Params<typeof sum> // [number, number]

type Head<T extends any[]> = T extends [any, ...any[]] ? T[0] : never

type t1 = Head<[number, string]> // number

type Tail<T extends any[]> = ((...t: T) => any) extends (
  head: any,
  ...tail: infer U
) => any
  ? U
  : []

type t2 = Tail<[number, string, number]> // [string, number]

type HasTail<T extends any[]> = T extends [] | [any] ? false : true

type t3 = HasTail<[1]> // false
type t4 = HasTail<[1, 2, 3]> // true

type ObjectInfer<T> = T extends { a: infer A } ? A : never

const obj1 = { a: 10 }
type t5 = ObjectInfer<typeof obj1> // number

type FunctionInfer<F> = F extends (...args: infer A) => infer R ? [A, R] : never

const f0 = (x: number, y: string) => 10

type t6 = FunctionInfer<typeof f0> // [[number, string], number]

type Promised<T> = T extends Promise<infer U> ? U : never

const p0 = new Promise<string>(() => {})
type t7 = Promised<typeof p0> // string

type ArrayInfer<T> = T extends (infer U)[] ? U : never

const a0 = ["hello", "world", 123]

type t8 = ArrayInfer<typeof a0> // string | number

type TupleInfer<T> = T extends [infer A, ...(infer B)[]] ? [A, B] : never

type t9 = TupleInfer<[number, boolean, string]> // [number, boolean | string]

type CurryV0<P extends any[], R> = (
  x: Head<P>
) => HasTail<P> extends true ? CurryV0<Tail<P>, R> : R

type CurryV1<P extends any[], R> = (
  head: Head<P>,
  ...tail: Tail<Partial<P>>
) => HasTail<P> extends true ? CurryV1<Tail<P>, R> : R

type CurryV2<P extends any[], R> = <T extends any[]>(
  ...args: T
) => HasTail<P> extends true ? CurryV2<Tail<T>, R> : R

type Last<T extends any[]> = {
  0: Last<Tail<T>>
  1: Head<T>
}[HasTail<T> extends true ? 0 : 1]

type t10 = Last<[1, 2, 3]> // 3

type Length<T extends any[]> = T["length"]

type t11 = Length<[]> // 0
type t12 = Length<[any, any]> // 2
type t13 = Length<[number, string, Promise<string>]> // 3

type Prepend<E, T extends any[]> = ((head: E, ...args: T) => any) extends (
  ...args: infer U
) => any
  ? U
  : T

type t14 = Prepend<string, []> // [string]

type t15 = Prepend<number, [string, any]> // [number, string, any]

type Drop<N extends number, T extends any[], I extends any[] = []> = {
  0: Drop<N, Tail<T>, Prepend<any, I>>
  1: T
}[Length<I> extends N ? 1 : 0]

type t16 = Drop<2, [1, 2, 3, 3]> // [3, 3]

type t17 = Drop<Length<t16>, t16> // []

type Reverse<T extends any[], R extends any[] = [],I extends any[] = []> = {
  0: Reverse<T, Prepend<T>
  1: T
}[Length<I> extends Length<T> ? 1 : 0]

type t18 = Reverse<[string, number]> // [number, string]
