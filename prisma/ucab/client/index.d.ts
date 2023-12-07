
/**
 * Client
**/

import * as runtime from './runtime/library';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Student
 * 
 */
export type Student = $Result.DefaultSelection<Prisma.$StudentPayload>
/**
 * Model Career
 * 
 */
export type Career = $Result.DefaultSelection<Prisma.$CareerPayload>
/**
 * Model CiapCourse
 * 
 */
export type CiapCourse = $Result.DefaultSelection<Prisma.$CiapCoursePayload>
/**
 * Model StudentCareer
 * 
 */
export type StudentCareer = $Result.DefaultSelection<Prisma.$StudentCareerPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const StudentCareerStatus: {
  ONGOING: 'ONGOING',
  DROPPED: 'DROPPED',
  FINISHED: 'FINISHED'
};

export type StudentCareerStatus = (typeof StudentCareerStatus)[keyof typeof StudentCareerStatus]

}

export type StudentCareerStatus = $Enums.StudentCareerStatus

export const StudentCareerStatus: typeof $Enums.StudentCareerStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Students
 * const students = await prisma.student.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Students
   * const students = await prisma.student.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.student`: Exposes CRUD operations for the **Student** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Students
    * const students = await prisma.student.findMany()
    * ```
    */
  get student(): Prisma.StudentDelegate<ExtArgs>;

  /**
   * `prisma.career`: Exposes CRUD operations for the **Career** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Careers
    * const careers = await prisma.career.findMany()
    * ```
    */
  get career(): Prisma.CareerDelegate<ExtArgs>;

  /**
   * `prisma.ciapCourse`: Exposes CRUD operations for the **CiapCourse** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CiapCourses
    * const ciapCourses = await prisma.ciapCourse.findMany()
    * ```
    */
  get ciapCourse(): Prisma.CiapCourseDelegate<ExtArgs>;

  /**
   * `prisma.studentCareer`: Exposes CRUD operations for the **StudentCareer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StudentCareers
    * const studentCareers = await prisma.studentCareer.findMany()
    * ```
    */
  get studentCareer(): Prisma.StudentCareerDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.6.0
   * Query Engine version: 79fb5193cf0a8fdbef536e4b4a159cad677ab1b9
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Student: 'Student',
    Career: 'Career',
    CiapCourse: 'CiapCourse',
    StudentCareer: 'StudentCareer'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'student' | 'career' | 'ciapCourse' | 'studentCareer'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      Student: {
        payload: Prisma.$StudentPayload<ExtArgs>
        fields: Prisma.StudentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findFirst: {
            args: Prisma.StudentFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findMany: {
            args: Prisma.StudentFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          create: {
            args: Prisma.StudentCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          createMany: {
            args: Prisma.StudentCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.StudentDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          update: {
            args: Prisma.StudentUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          deleteMany: {
            args: Prisma.StudentDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.StudentUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.StudentUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          aggregate: {
            args: Prisma.StudentAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateStudent>
          }
          groupBy: {
            args: Prisma.StudentGroupByArgs<ExtArgs>,
            result: $Utils.Optional<StudentGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentCountArgs<ExtArgs>,
            result: $Utils.Optional<StudentCountAggregateOutputType> | number
          }
        }
      }
      Career: {
        payload: Prisma.$CareerPayload<ExtArgs>
        fields: Prisma.CareerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CareerFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CareerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CareerFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CareerPayload>
          }
          findFirst: {
            args: Prisma.CareerFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CareerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CareerFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CareerPayload>
          }
          findMany: {
            args: Prisma.CareerFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CareerPayload>[]
          }
          create: {
            args: Prisma.CareerCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CareerPayload>
          }
          createMany: {
            args: Prisma.CareerCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.CareerDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CareerPayload>
          }
          update: {
            args: Prisma.CareerUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CareerPayload>
          }
          deleteMany: {
            args: Prisma.CareerDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.CareerUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.CareerUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CareerPayload>
          }
          aggregate: {
            args: Prisma.CareerAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateCareer>
          }
          groupBy: {
            args: Prisma.CareerGroupByArgs<ExtArgs>,
            result: $Utils.Optional<CareerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CareerCountArgs<ExtArgs>,
            result: $Utils.Optional<CareerCountAggregateOutputType> | number
          }
        }
      }
      CiapCourse: {
        payload: Prisma.$CiapCoursePayload<ExtArgs>
        fields: Prisma.CiapCourseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CiapCourseFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CiapCoursePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CiapCourseFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CiapCoursePayload>
          }
          findFirst: {
            args: Prisma.CiapCourseFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CiapCoursePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CiapCourseFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CiapCoursePayload>
          }
          findMany: {
            args: Prisma.CiapCourseFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CiapCoursePayload>[]
          }
          create: {
            args: Prisma.CiapCourseCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CiapCoursePayload>
          }
          createMany: {
            args: Prisma.CiapCourseCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.CiapCourseDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CiapCoursePayload>
          }
          update: {
            args: Prisma.CiapCourseUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CiapCoursePayload>
          }
          deleteMany: {
            args: Prisma.CiapCourseDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.CiapCourseUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.CiapCourseUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$CiapCoursePayload>
          }
          aggregate: {
            args: Prisma.CiapCourseAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateCiapCourse>
          }
          groupBy: {
            args: Prisma.CiapCourseGroupByArgs<ExtArgs>,
            result: $Utils.Optional<CiapCourseGroupByOutputType>[]
          }
          count: {
            args: Prisma.CiapCourseCountArgs<ExtArgs>,
            result: $Utils.Optional<CiapCourseCountAggregateOutputType> | number
          }
        }
      }
      StudentCareer: {
        payload: Prisma.$StudentCareerPayload<ExtArgs>
        fields: Prisma.StudentCareerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentCareerFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$StudentCareerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentCareerFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$StudentCareerPayload>
          }
          findFirst: {
            args: Prisma.StudentCareerFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$StudentCareerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentCareerFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$StudentCareerPayload>
          }
          findMany: {
            args: Prisma.StudentCareerFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$StudentCareerPayload>[]
          }
          create: {
            args: Prisma.StudentCareerCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$StudentCareerPayload>
          }
          createMany: {
            args: Prisma.StudentCareerCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.StudentCareerDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$StudentCareerPayload>
          }
          update: {
            args: Prisma.StudentCareerUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$StudentCareerPayload>
          }
          deleteMany: {
            args: Prisma.StudentCareerDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.StudentCareerUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.StudentCareerUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$StudentCareerPayload>
          }
          aggregate: {
            args: Prisma.StudentCareerAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateStudentCareer>
          }
          groupBy: {
            args: Prisma.StudentCareerGroupByArgs<ExtArgs>,
            result: $Utils.Optional<StudentCareerGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentCareerCountArgs<ExtArgs>,
            result: $Utils.Optional<StudentCareerCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type StudentCountOutputType
   */

  export type StudentCountOutputType = {
    enrolledCareers: number
    coursesTaken: number
  }

  export type StudentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrolledCareers?: boolean | StudentCountOutputTypeCountEnrolledCareersArgs
    coursesTaken?: boolean | StudentCountOutputTypeCountCoursesTakenArgs
  }

  // Custom InputTypes

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCountOutputType
     */
    select?: StudentCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountEnrolledCareersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentCareerWhereInput
  }


  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountCoursesTakenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CiapCourseWhereInput
  }



  /**
   * Count Type CareerCountOutputType
   */

  export type CareerCountOutputType = {
    enrolledStudents: number
  }

  export type CareerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrolledStudents?: boolean | CareerCountOutputTypeCountEnrolledStudentsArgs
  }

  // Custom InputTypes

  /**
   * CareerCountOutputType without action
   */
  export type CareerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CareerCountOutputType
     */
    select?: CareerCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * CareerCountOutputType without action
   */
  export type CareerCountOutputTypeCountEnrolledStudentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentCareerWhereInput
  }



  /**
   * Count Type CiapCourseCountOutputType
   */

  export type CiapCourseCountOutputType = {
    enrolledStudents: number
  }

  export type CiapCourseCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrolledStudents?: boolean | CiapCourseCountOutputTypeCountEnrolledStudentsArgs
  }

  // Custom InputTypes

  /**
   * CiapCourseCountOutputType without action
   */
  export type CiapCourseCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CiapCourseCountOutputType
     */
    select?: CiapCourseCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * CiapCourseCountOutputType without action
   */
  export type CiapCourseCountOutputTypeCountEnrolledStudentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
  }



  /**
   * Models
   */

  /**
   * Model Student
   */

  export type AggregateStudent = {
    _count: StudentCountAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  export type StudentMinAggregateOutputType = {
    email: string | null
    names: string | null
    surnames: string | null
  }

  export type StudentMaxAggregateOutputType = {
    email: string | null
    names: string | null
    surnames: string | null
  }

  export type StudentCountAggregateOutputType = {
    email: number
    names: number
    surnames: number
    _all: number
  }


  export type StudentMinAggregateInputType = {
    email?: true
    names?: true
    surnames?: true
  }

  export type StudentMaxAggregateInputType = {
    email?: true
    names?: true
    surnames?: true
  }

  export type StudentCountAggregateInputType = {
    email?: true
    names?: true
    surnames?: true
    _all?: true
  }

  export type StudentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Student to aggregate.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Students
    **/
    _count?: true | StudentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentMaxAggregateInputType
  }

  export type GetStudentAggregateType<T extends StudentAggregateArgs> = {
        [P in keyof T & keyof AggregateStudent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudent[P]>
      : GetScalarType<T[P], AggregateStudent[P]>
  }




  export type StudentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithAggregationInput | StudentOrderByWithAggregationInput[]
    by: StudentScalarFieldEnum[] | StudentScalarFieldEnum
    having?: StudentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentCountAggregateInputType | true
    _min?: StudentMinAggregateInputType
    _max?: StudentMaxAggregateInputType
  }

  export type StudentGroupByOutputType = {
    email: string
    names: string
    surnames: string
    _count: StudentCountAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  type GetStudentGroupByPayload<T extends StudentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentGroupByOutputType[P]>
            : GetScalarType<T[P], StudentGroupByOutputType[P]>
        }
      >
    >


  export type StudentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    email?: boolean
    names?: boolean
    surnames?: boolean
    enrolledCareers?: boolean | Student$enrolledCareersArgs<ExtArgs>
    coursesTaken?: boolean | Student$coursesTakenArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>

  export type StudentSelectScalar = {
    email?: boolean
    names?: boolean
    surnames?: boolean
  }

  export type StudentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrolledCareers?: boolean | Student$enrolledCareersArgs<ExtArgs>
    coursesTaken?: boolean | Student$coursesTakenArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $StudentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Student"
    objects: {
      enrolledCareers: Prisma.$StudentCareerPayload<ExtArgs>[]
      coursesTaken: Prisma.$CiapCoursePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      email: string
      names: string
      surnames: string
    }, ExtArgs["result"]["student"]>
    composites: {}
  }


  type StudentGetPayload<S extends boolean | null | undefined | StudentDefaultArgs> = $Result.GetResult<Prisma.$StudentPayload, S>

  type StudentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StudentFindManyArgs, 'select' | 'include' | 'distinct' > & {
      select?: StudentCountAggregateInputType | true
    }

  export interface StudentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Student'], meta: { name: 'Student' } }
    /**
     * Find zero or one Student that matches the filter.
     * @param {StudentFindUniqueArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends StudentFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, StudentFindUniqueArgs<ExtArgs>>
    ): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Student that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {StudentFindUniqueOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends StudentFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, StudentFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Student that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends StudentFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, StudentFindFirstArgs<ExtArgs>>
    ): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Student that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends StudentFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, StudentFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Students that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Students
     * const students = await prisma.student.findMany()
     * 
     * // Get first 10 Students
     * const students = await prisma.student.findMany({ take: 10 })
     * 
     * // Only select the `email`
     * const studentWithEmailOnly = await prisma.student.findMany({ select: { email: true } })
     * 
    **/
    findMany<T extends StudentFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, StudentFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Student.
     * @param {StudentCreateArgs} args - Arguments to create a Student.
     * @example
     * // Create one Student
     * const Student = await prisma.student.create({
     *   data: {
     *     // ... data to create a Student
     *   }
     * })
     * 
    **/
    create<T extends StudentCreateArgs<ExtArgs>>(
      args: SelectSubset<T, StudentCreateArgs<ExtArgs>>
    ): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Students.
     *     @param {StudentCreateManyArgs} args - Arguments to create many Students.
     *     @example
     *     // Create many Students
     *     const student = await prisma.student.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends StudentCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, StudentCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Student.
     * @param {StudentDeleteArgs} args - Arguments to delete one Student.
     * @example
     * // Delete one Student
     * const Student = await prisma.student.delete({
     *   where: {
     *     // ... filter to delete one Student
     *   }
     * })
     * 
    **/
    delete<T extends StudentDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, StudentDeleteArgs<ExtArgs>>
    ): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Student.
     * @param {StudentUpdateArgs} args - Arguments to update one Student.
     * @example
     * // Update one Student
     * const student = await prisma.student.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends StudentUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, StudentUpdateArgs<ExtArgs>>
    ): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Students.
     * @param {StudentDeleteManyArgs} args - Arguments to filter Students to delete.
     * @example
     * // Delete a few Students
     * const { count } = await prisma.student.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends StudentDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, StudentDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends StudentUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, StudentUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Student.
     * @param {StudentUpsertArgs} args - Arguments to update or create a Student.
     * @example
     * // Update or create a Student
     * const student = await prisma.student.upsert({
     *   create: {
     *     // ... data to create a Student
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student we want to update
     *   }
     * })
    **/
    upsert<T extends StudentUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, StudentUpsertArgs<ExtArgs>>
    ): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCountArgs} args - Arguments to filter Students to count.
     * @example
     * // Count the number of Students
     * const count = await prisma.student.count({
     *   where: {
     *     // ... the filter for the Students we want to count
     *   }
     * })
    **/
    count<T extends StudentCountArgs>(
      args?: Subset<T, StudentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudentAggregateArgs>(args: Subset<T, StudentAggregateArgs>): Prisma.PrismaPromise<GetStudentAggregateType<T>>

    /**
     * Group by Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StudentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentGroupByArgs['orderBy'] }
        : { orderBy?: StudentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Student model
   */
  readonly fields: StudentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Student.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    enrolledCareers<T extends Student$enrolledCareersArgs<ExtArgs> = {}>(args?: Subset<T, Student$enrolledCareersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentCareerPayload<ExtArgs>, T, 'findMany'> | Null>;

    coursesTaken<T extends Student$coursesTakenArgs<ExtArgs> = {}>(args?: Subset<T, Student$coursesTakenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CiapCoursePayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Student model
   */ 
  interface StudentFieldRefs {
    readonly email: FieldRef<"Student", 'String'>
    readonly names: FieldRef<"Student", 'String'>
    readonly surnames: FieldRef<"Student", 'String'>
  }
    

  // Custom InputTypes

  /**
   * Student findUnique
   */
  export type StudentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }


  /**
   * Student findUniqueOrThrow
   */
  export type StudentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }


  /**
   * Student findFirst
   */
  export type StudentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }


  /**
   * Student findFirstOrThrow
   */
  export type StudentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }


  /**
   * Student findMany
   */
  export type StudentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Students to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }


  /**
   * Student create
   */
  export type StudentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to create a Student.
     */
    data: XOR<StudentCreateInput, StudentUncheckedCreateInput>
  }


  /**
   * Student createMany
   */
  export type StudentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Student update
   */
  export type StudentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to update a Student.
     */
    data: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
    /**
     * Choose, which Student to update.
     */
    where: StudentWhereUniqueInput
  }


  /**
   * Student updateMany
   */
  export type StudentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
  }


  /**
   * Student upsert
   */
  export type StudentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The filter to search for the Student to update in case it exists.
     */
    where: StudentWhereUniqueInput
    /**
     * In case the Student found by the `where` argument doesn't exist, create a new Student with this data.
     */
    create: XOR<StudentCreateInput, StudentUncheckedCreateInput>
    /**
     * In case the Student was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
  }


  /**
   * Student delete
   */
  export type StudentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter which Student to delete.
     */
    where: StudentWhereUniqueInput
  }


  /**
   * Student deleteMany
   */
  export type StudentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Students to delete
     */
    where?: StudentWhereInput
  }


  /**
   * Student.enrolledCareers
   */
  export type Student$enrolledCareersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCareer
     */
    select?: StudentCareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: StudentCareerInclude<ExtArgs> | null
    where?: StudentCareerWhereInput
    orderBy?: StudentCareerOrderByWithRelationInput | StudentCareerOrderByWithRelationInput[]
    cursor?: StudentCareerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudentCareerScalarFieldEnum | StudentCareerScalarFieldEnum[]
  }


  /**
   * Student.coursesTaken
   */
  export type Student$coursesTakenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CiapCourse
     */
    select?: CiapCourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CiapCourseInclude<ExtArgs> | null
    where?: CiapCourseWhereInput
    orderBy?: CiapCourseOrderByWithRelationInput | CiapCourseOrderByWithRelationInput[]
    cursor?: CiapCourseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CiapCourseScalarFieldEnum | CiapCourseScalarFieldEnum[]
  }


  /**
   * Student without action
   */
  export type StudentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: StudentInclude<ExtArgs> | null
  }



  /**
   * Model Career
   */

  export type AggregateCareer = {
    _count: CareerCountAggregateOutputType | null
    _min: CareerMinAggregateOutputType | null
    _max: CareerMaxAggregateOutputType | null
  }

  export type CareerMinAggregateOutputType = {
    name: string | null
  }

  export type CareerMaxAggregateOutputType = {
    name: string | null
  }

  export type CareerCountAggregateOutputType = {
    name: number
    _all: number
  }


  export type CareerMinAggregateInputType = {
    name?: true
  }

  export type CareerMaxAggregateInputType = {
    name?: true
  }

  export type CareerCountAggregateInputType = {
    name?: true
    _all?: true
  }

  export type CareerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Career to aggregate.
     */
    where?: CareerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Careers to fetch.
     */
    orderBy?: CareerOrderByWithRelationInput | CareerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CareerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Careers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Careers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Careers
    **/
    _count?: true | CareerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CareerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CareerMaxAggregateInputType
  }

  export type GetCareerAggregateType<T extends CareerAggregateArgs> = {
        [P in keyof T & keyof AggregateCareer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCareer[P]>
      : GetScalarType<T[P], AggregateCareer[P]>
  }




  export type CareerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CareerWhereInput
    orderBy?: CareerOrderByWithAggregationInput | CareerOrderByWithAggregationInput[]
    by: CareerScalarFieldEnum[] | CareerScalarFieldEnum
    having?: CareerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CareerCountAggregateInputType | true
    _min?: CareerMinAggregateInputType
    _max?: CareerMaxAggregateInputType
  }

  export type CareerGroupByOutputType = {
    name: string
    _count: CareerCountAggregateOutputType | null
    _min: CareerMinAggregateOutputType | null
    _max: CareerMaxAggregateOutputType | null
  }

  type GetCareerGroupByPayload<T extends CareerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CareerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CareerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CareerGroupByOutputType[P]>
            : GetScalarType<T[P], CareerGroupByOutputType[P]>
        }
      >
    >


  export type CareerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    name?: boolean
    enrolledStudents?: boolean | Career$enrolledStudentsArgs<ExtArgs>
    _count?: boolean | CareerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["career"]>

  export type CareerSelectScalar = {
    name?: boolean
  }

  export type CareerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrolledStudents?: boolean | Career$enrolledStudentsArgs<ExtArgs>
    _count?: boolean | CareerCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $CareerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Career"
    objects: {
      enrolledStudents: Prisma.$StudentCareerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      name: string
    }, ExtArgs["result"]["career"]>
    composites: {}
  }


  type CareerGetPayload<S extends boolean | null | undefined | CareerDefaultArgs> = $Result.GetResult<Prisma.$CareerPayload, S>

  type CareerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CareerFindManyArgs, 'select' | 'include' | 'distinct' > & {
      select?: CareerCountAggregateInputType | true
    }

  export interface CareerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Career'], meta: { name: 'Career' } }
    /**
     * Find zero or one Career that matches the filter.
     * @param {CareerFindUniqueArgs} args - Arguments to find a Career
     * @example
     * // Get one Career
     * const career = await prisma.career.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CareerFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, CareerFindUniqueArgs<ExtArgs>>
    ): Prisma__CareerClient<$Result.GetResult<Prisma.$CareerPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Career that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {CareerFindUniqueOrThrowArgs} args - Arguments to find a Career
     * @example
     * // Get one Career
     * const career = await prisma.career.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CareerFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, CareerFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__CareerClient<$Result.GetResult<Prisma.$CareerPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Career that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerFindFirstArgs} args - Arguments to find a Career
     * @example
     * // Get one Career
     * const career = await prisma.career.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CareerFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, CareerFindFirstArgs<ExtArgs>>
    ): Prisma__CareerClient<$Result.GetResult<Prisma.$CareerPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Career that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerFindFirstOrThrowArgs} args - Arguments to find a Career
     * @example
     * // Get one Career
     * const career = await prisma.career.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CareerFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, CareerFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__CareerClient<$Result.GetResult<Prisma.$CareerPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Careers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Careers
     * const careers = await prisma.career.findMany()
     * 
     * // Get first 10 Careers
     * const careers = await prisma.career.findMany({ take: 10 })
     * 
     * // Only select the `name`
     * const careerWithNameOnly = await prisma.career.findMany({ select: { name: true } })
     * 
    **/
    findMany<T extends CareerFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CareerFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CareerPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Career.
     * @param {CareerCreateArgs} args - Arguments to create a Career.
     * @example
     * // Create one Career
     * const Career = await prisma.career.create({
     *   data: {
     *     // ... data to create a Career
     *   }
     * })
     * 
    **/
    create<T extends CareerCreateArgs<ExtArgs>>(
      args: SelectSubset<T, CareerCreateArgs<ExtArgs>>
    ): Prisma__CareerClient<$Result.GetResult<Prisma.$CareerPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Careers.
     *     @param {CareerCreateManyArgs} args - Arguments to create many Careers.
     *     @example
     *     // Create many Careers
     *     const career = await prisma.career.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CareerCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CareerCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Career.
     * @param {CareerDeleteArgs} args - Arguments to delete one Career.
     * @example
     * // Delete one Career
     * const Career = await prisma.career.delete({
     *   where: {
     *     // ... filter to delete one Career
     *   }
     * })
     * 
    **/
    delete<T extends CareerDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, CareerDeleteArgs<ExtArgs>>
    ): Prisma__CareerClient<$Result.GetResult<Prisma.$CareerPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Career.
     * @param {CareerUpdateArgs} args - Arguments to update one Career.
     * @example
     * // Update one Career
     * const career = await prisma.career.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CareerUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, CareerUpdateArgs<ExtArgs>>
    ): Prisma__CareerClient<$Result.GetResult<Prisma.$CareerPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Careers.
     * @param {CareerDeleteManyArgs} args - Arguments to filter Careers to delete.
     * @example
     * // Delete a few Careers
     * const { count } = await prisma.career.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CareerDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CareerDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Careers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Careers
     * const career = await prisma.career.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CareerUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, CareerUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Career.
     * @param {CareerUpsertArgs} args - Arguments to update or create a Career.
     * @example
     * // Update or create a Career
     * const career = await prisma.career.upsert({
     *   create: {
     *     // ... data to create a Career
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Career we want to update
     *   }
     * })
    **/
    upsert<T extends CareerUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, CareerUpsertArgs<ExtArgs>>
    ): Prisma__CareerClient<$Result.GetResult<Prisma.$CareerPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Careers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerCountArgs} args - Arguments to filter Careers to count.
     * @example
     * // Count the number of Careers
     * const count = await prisma.career.count({
     *   where: {
     *     // ... the filter for the Careers we want to count
     *   }
     * })
    **/
    count<T extends CareerCountArgs>(
      args?: Subset<T, CareerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CareerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Career.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CareerAggregateArgs>(args: Subset<T, CareerAggregateArgs>): Prisma.PrismaPromise<GetCareerAggregateType<T>>

    /**
     * Group by Career.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CareerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CareerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CareerGroupByArgs['orderBy'] }
        : { orderBy?: CareerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CareerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCareerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Career model
   */
  readonly fields: CareerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Career.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CareerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    enrolledStudents<T extends Career$enrolledStudentsArgs<ExtArgs> = {}>(args?: Subset<T, Career$enrolledStudentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentCareerPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Career model
   */ 
  interface CareerFieldRefs {
    readonly name: FieldRef<"Career", 'String'>
  }
    

  // Custom InputTypes

  /**
   * Career findUnique
   */
  export type CareerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Career
     */
    select?: CareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CareerInclude<ExtArgs> | null
    /**
     * Filter, which Career to fetch.
     */
    where: CareerWhereUniqueInput
  }


  /**
   * Career findUniqueOrThrow
   */
  export type CareerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Career
     */
    select?: CareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CareerInclude<ExtArgs> | null
    /**
     * Filter, which Career to fetch.
     */
    where: CareerWhereUniqueInput
  }


  /**
   * Career findFirst
   */
  export type CareerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Career
     */
    select?: CareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CareerInclude<ExtArgs> | null
    /**
     * Filter, which Career to fetch.
     */
    where?: CareerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Careers to fetch.
     */
    orderBy?: CareerOrderByWithRelationInput | CareerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Careers.
     */
    cursor?: CareerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Careers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Careers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Careers.
     */
    distinct?: CareerScalarFieldEnum | CareerScalarFieldEnum[]
  }


  /**
   * Career findFirstOrThrow
   */
  export type CareerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Career
     */
    select?: CareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CareerInclude<ExtArgs> | null
    /**
     * Filter, which Career to fetch.
     */
    where?: CareerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Careers to fetch.
     */
    orderBy?: CareerOrderByWithRelationInput | CareerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Careers.
     */
    cursor?: CareerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Careers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Careers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Careers.
     */
    distinct?: CareerScalarFieldEnum | CareerScalarFieldEnum[]
  }


  /**
   * Career findMany
   */
  export type CareerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Career
     */
    select?: CareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CareerInclude<ExtArgs> | null
    /**
     * Filter, which Careers to fetch.
     */
    where?: CareerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Careers to fetch.
     */
    orderBy?: CareerOrderByWithRelationInput | CareerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Careers.
     */
    cursor?: CareerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Careers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Careers.
     */
    skip?: number
    distinct?: CareerScalarFieldEnum | CareerScalarFieldEnum[]
  }


  /**
   * Career create
   */
  export type CareerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Career
     */
    select?: CareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CareerInclude<ExtArgs> | null
    /**
     * The data needed to create a Career.
     */
    data: XOR<CareerCreateInput, CareerUncheckedCreateInput>
  }


  /**
   * Career createMany
   */
  export type CareerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Careers.
     */
    data: CareerCreateManyInput | CareerCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Career update
   */
  export type CareerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Career
     */
    select?: CareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CareerInclude<ExtArgs> | null
    /**
     * The data needed to update a Career.
     */
    data: XOR<CareerUpdateInput, CareerUncheckedUpdateInput>
    /**
     * Choose, which Career to update.
     */
    where: CareerWhereUniqueInput
  }


  /**
   * Career updateMany
   */
  export type CareerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Careers.
     */
    data: XOR<CareerUpdateManyMutationInput, CareerUncheckedUpdateManyInput>
    /**
     * Filter which Careers to update
     */
    where?: CareerWhereInput
  }


  /**
   * Career upsert
   */
  export type CareerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Career
     */
    select?: CareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CareerInclude<ExtArgs> | null
    /**
     * The filter to search for the Career to update in case it exists.
     */
    where: CareerWhereUniqueInput
    /**
     * In case the Career found by the `where` argument doesn't exist, create a new Career with this data.
     */
    create: XOR<CareerCreateInput, CareerUncheckedCreateInput>
    /**
     * In case the Career was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CareerUpdateInput, CareerUncheckedUpdateInput>
  }


  /**
   * Career delete
   */
  export type CareerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Career
     */
    select?: CareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CareerInclude<ExtArgs> | null
    /**
     * Filter which Career to delete.
     */
    where: CareerWhereUniqueInput
  }


  /**
   * Career deleteMany
   */
  export type CareerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Careers to delete
     */
    where?: CareerWhereInput
  }


  /**
   * Career.enrolledStudents
   */
  export type Career$enrolledStudentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCareer
     */
    select?: StudentCareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: StudentCareerInclude<ExtArgs> | null
    where?: StudentCareerWhereInput
    orderBy?: StudentCareerOrderByWithRelationInput | StudentCareerOrderByWithRelationInput[]
    cursor?: StudentCareerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudentCareerScalarFieldEnum | StudentCareerScalarFieldEnum[]
  }


  /**
   * Career without action
   */
  export type CareerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Career
     */
    select?: CareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CareerInclude<ExtArgs> | null
  }



  /**
   * Model CiapCourse
   */

  export type AggregateCiapCourse = {
    _count: CiapCourseCountAggregateOutputType | null
    _min: CiapCourseMinAggregateOutputType | null
    _max: CiapCourseMaxAggregateOutputType | null
  }

  export type CiapCourseMinAggregateOutputType = {
    id: string | null
    name: string | null
    completionDate: Date | null
  }

  export type CiapCourseMaxAggregateOutputType = {
    id: string | null
    name: string | null
    completionDate: Date | null
  }

  export type CiapCourseCountAggregateOutputType = {
    id: number
    name: number
    completionDate: number
    _all: number
  }


  export type CiapCourseMinAggregateInputType = {
    id?: true
    name?: true
    completionDate?: true
  }

  export type CiapCourseMaxAggregateInputType = {
    id?: true
    name?: true
    completionDate?: true
  }

  export type CiapCourseCountAggregateInputType = {
    id?: true
    name?: true
    completionDate?: true
    _all?: true
  }

  export type CiapCourseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CiapCourse to aggregate.
     */
    where?: CiapCourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CiapCourses to fetch.
     */
    orderBy?: CiapCourseOrderByWithRelationInput | CiapCourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CiapCourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CiapCourses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CiapCourses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CiapCourses
    **/
    _count?: true | CiapCourseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CiapCourseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CiapCourseMaxAggregateInputType
  }

  export type GetCiapCourseAggregateType<T extends CiapCourseAggregateArgs> = {
        [P in keyof T & keyof AggregateCiapCourse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCiapCourse[P]>
      : GetScalarType<T[P], AggregateCiapCourse[P]>
  }




  export type CiapCourseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CiapCourseWhereInput
    orderBy?: CiapCourseOrderByWithAggregationInput | CiapCourseOrderByWithAggregationInput[]
    by: CiapCourseScalarFieldEnum[] | CiapCourseScalarFieldEnum
    having?: CiapCourseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CiapCourseCountAggregateInputType | true
    _min?: CiapCourseMinAggregateInputType
    _max?: CiapCourseMaxAggregateInputType
  }

  export type CiapCourseGroupByOutputType = {
    id: string
    name: string
    completionDate: Date
    _count: CiapCourseCountAggregateOutputType | null
    _min: CiapCourseMinAggregateOutputType | null
    _max: CiapCourseMaxAggregateOutputType | null
  }

  type GetCiapCourseGroupByPayload<T extends CiapCourseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CiapCourseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CiapCourseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CiapCourseGroupByOutputType[P]>
            : GetScalarType<T[P], CiapCourseGroupByOutputType[P]>
        }
      >
    >


  export type CiapCourseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    completionDate?: boolean
    enrolledStudents?: boolean | CiapCourse$enrolledStudentsArgs<ExtArgs>
    _count?: boolean | CiapCourseCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["ciapCourse"]>

  export type CiapCourseSelectScalar = {
    id?: boolean
    name?: boolean
    completionDate?: boolean
  }

  export type CiapCourseInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    enrolledStudents?: boolean | CiapCourse$enrolledStudentsArgs<ExtArgs>
    _count?: boolean | CiapCourseCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $CiapCoursePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CiapCourse"
    objects: {
      enrolledStudents: Prisma.$StudentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      completionDate: Date
    }, ExtArgs["result"]["ciapCourse"]>
    composites: {}
  }


  type CiapCourseGetPayload<S extends boolean | null | undefined | CiapCourseDefaultArgs> = $Result.GetResult<Prisma.$CiapCoursePayload, S>

  type CiapCourseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CiapCourseFindManyArgs, 'select' | 'include' | 'distinct' > & {
      select?: CiapCourseCountAggregateInputType | true
    }

  export interface CiapCourseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CiapCourse'], meta: { name: 'CiapCourse' } }
    /**
     * Find zero or one CiapCourse that matches the filter.
     * @param {CiapCourseFindUniqueArgs} args - Arguments to find a CiapCourse
     * @example
     * // Get one CiapCourse
     * const ciapCourse = await prisma.ciapCourse.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CiapCourseFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, CiapCourseFindUniqueArgs<ExtArgs>>
    ): Prisma__CiapCourseClient<$Result.GetResult<Prisma.$CiapCoursePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one CiapCourse that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {CiapCourseFindUniqueOrThrowArgs} args - Arguments to find a CiapCourse
     * @example
     * // Get one CiapCourse
     * const ciapCourse = await prisma.ciapCourse.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CiapCourseFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, CiapCourseFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__CiapCourseClient<$Result.GetResult<Prisma.$CiapCoursePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first CiapCourse that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CiapCourseFindFirstArgs} args - Arguments to find a CiapCourse
     * @example
     * // Get one CiapCourse
     * const ciapCourse = await prisma.ciapCourse.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CiapCourseFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, CiapCourseFindFirstArgs<ExtArgs>>
    ): Prisma__CiapCourseClient<$Result.GetResult<Prisma.$CiapCoursePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first CiapCourse that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CiapCourseFindFirstOrThrowArgs} args - Arguments to find a CiapCourse
     * @example
     * // Get one CiapCourse
     * const ciapCourse = await prisma.ciapCourse.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CiapCourseFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, CiapCourseFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__CiapCourseClient<$Result.GetResult<Prisma.$CiapCoursePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more CiapCourses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CiapCourseFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CiapCourses
     * const ciapCourses = await prisma.ciapCourse.findMany()
     * 
     * // Get first 10 CiapCourses
     * const ciapCourses = await prisma.ciapCourse.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ciapCourseWithIdOnly = await prisma.ciapCourse.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CiapCourseFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CiapCourseFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CiapCoursePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a CiapCourse.
     * @param {CiapCourseCreateArgs} args - Arguments to create a CiapCourse.
     * @example
     * // Create one CiapCourse
     * const CiapCourse = await prisma.ciapCourse.create({
     *   data: {
     *     // ... data to create a CiapCourse
     *   }
     * })
     * 
    **/
    create<T extends CiapCourseCreateArgs<ExtArgs>>(
      args: SelectSubset<T, CiapCourseCreateArgs<ExtArgs>>
    ): Prisma__CiapCourseClient<$Result.GetResult<Prisma.$CiapCoursePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many CiapCourses.
     *     @param {CiapCourseCreateManyArgs} args - Arguments to create many CiapCourses.
     *     @example
     *     // Create many CiapCourses
     *     const ciapCourse = await prisma.ciapCourse.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CiapCourseCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CiapCourseCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CiapCourse.
     * @param {CiapCourseDeleteArgs} args - Arguments to delete one CiapCourse.
     * @example
     * // Delete one CiapCourse
     * const CiapCourse = await prisma.ciapCourse.delete({
     *   where: {
     *     // ... filter to delete one CiapCourse
     *   }
     * })
     * 
    **/
    delete<T extends CiapCourseDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, CiapCourseDeleteArgs<ExtArgs>>
    ): Prisma__CiapCourseClient<$Result.GetResult<Prisma.$CiapCoursePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one CiapCourse.
     * @param {CiapCourseUpdateArgs} args - Arguments to update one CiapCourse.
     * @example
     * // Update one CiapCourse
     * const ciapCourse = await prisma.ciapCourse.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CiapCourseUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, CiapCourseUpdateArgs<ExtArgs>>
    ): Prisma__CiapCourseClient<$Result.GetResult<Prisma.$CiapCoursePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more CiapCourses.
     * @param {CiapCourseDeleteManyArgs} args - Arguments to filter CiapCourses to delete.
     * @example
     * // Delete a few CiapCourses
     * const { count } = await prisma.ciapCourse.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CiapCourseDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CiapCourseDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CiapCourses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CiapCourseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CiapCourses
     * const ciapCourse = await prisma.ciapCourse.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CiapCourseUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, CiapCourseUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CiapCourse.
     * @param {CiapCourseUpsertArgs} args - Arguments to update or create a CiapCourse.
     * @example
     * // Update or create a CiapCourse
     * const ciapCourse = await prisma.ciapCourse.upsert({
     *   create: {
     *     // ... data to create a CiapCourse
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CiapCourse we want to update
     *   }
     * })
    **/
    upsert<T extends CiapCourseUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, CiapCourseUpsertArgs<ExtArgs>>
    ): Prisma__CiapCourseClient<$Result.GetResult<Prisma.$CiapCoursePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of CiapCourses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CiapCourseCountArgs} args - Arguments to filter CiapCourses to count.
     * @example
     * // Count the number of CiapCourses
     * const count = await prisma.ciapCourse.count({
     *   where: {
     *     // ... the filter for the CiapCourses we want to count
     *   }
     * })
    **/
    count<T extends CiapCourseCountArgs>(
      args?: Subset<T, CiapCourseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CiapCourseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CiapCourse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CiapCourseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CiapCourseAggregateArgs>(args: Subset<T, CiapCourseAggregateArgs>): Prisma.PrismaPromise<GetCiapCourseAggregateType<T>>

    /**
     * Group by CiapCourse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CiapCourseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CiapCourseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CiapCourseGroupByArgs['orderBy'] }
        : { orderBy?: CiapCourseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CiapCourseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCiapCourseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CiapCourse model
   */
  readonly fields: CiapCourseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CiapCourse.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CiapCourseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    enrolledStudents<T extends CiapCourse$enrolledStudentsArgs<ExtArgs> = {}>(args?: Subset<T, CiapCourse$enrolledStudentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the CiapCourse model
   */ 
  interface CiapCourseFieldRefs {
    readonly id: FieldRef<"CiapCourse", 'String'>
    readonly name: FieldRef<"CiapCourse", 'String'>
    readonly completionDate: FieldRef<"CiapCourse", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * CiapCourse findUnique
   */
  export type CiapCourseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CiapCourse
     */
    select?: CiapCourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CiapCourseInclude<ExtArgs> | null
    /**
     * Filter, which CiapCourse to fetch.
     */
    where: CiapCourseWhereUniqueInput
  }


  /**
   * CiapCourse findUniqueOrThrow
   */
  export type CiapCourseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CiapCourse
     */
    select?: CiapCourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CiapCourseInclude<ExtArgs> | null
    /**
     * Filter, which CiapCourse to fetch.
     */
    where: CiapCourseWhereUniqueInput
  }


  /**
   * CiapCourse findFirst
   */
  export type CiapCourseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CiapCourse
     */
    select?: CiapCourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CiapCourseInclude<ExtArgs> | null
    /**
     * Filter, which CiapCourse to fetch.
     */
    where?: CiapCourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CiapCourses to fetch.
     */
    orderBy?: CiapCourseOrderByWithRelationInput | CiapCourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CiapCourses.
     */
    cursor?: CiapCourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CiapCourses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CiapCourses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CiapCourses.
     */
    distinct?: CiapCourseScalarFieldEnum | CiapCourseScalarFieldEnum[]
  }


  /**
   * CiapCourse findFirstOrThrow
   */
  export type CiapCourseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CiapCourse
     */
    select?: CiapCourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CiapCourseInclude<ExtArgs> | null
    /**
     * Filter, which CiapCourse to fetch.
     */
    where?: CiapCourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CiapCourses to fetch.
     */
    orderBy?: CiapCourseOrderByWithRelationInput | CiapCourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CiapCourses.
     */
    cursor?: CiapCourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CiapCourses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CiapCourses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CiapCourses.
     */
    distinct?: CiapCourseScalarFieldEnum | CiapCourseScalarFieldEnum[]
  }


  /**
   * CiapCourse findMany
   */
  export type CiapCourseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CiapCourse
     */
    select?: CiapCourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CiapCourseInclude<ExtArgs> | null
    /**
     * Filter, which CiapCourses to fetch.
     */
    where?: CiapCourseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CiapCourses to fetch.
     */
    orderBy?: CiapCourseOrderByWithRelationInput | CiapCourseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CiapCourses.
     */
    cursor?: CiapCourseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CiapCourses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CiapCourses.
     */
    skip?: number
    distinct?: CiapCourseScalarFieldEnum | CiapCourseScalarFieldEnum[]
  }


  /**
   * CiapCourse create
   */
  export type CiapCourseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CiapCourse
     */
    select?: CiapCourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CiapCourseInclude<ExtArgs> | null
    /**
     * The data needed to create a CiapCourse.
     */
    data: XOR<CiapCourseCreateInput, CiapCourseUncheckedCreateInput>
  }


  /**
   * CiapCourse createMany
   */
  export type CiapCourseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CiapCourses.
     */
    data: CiapCourseCreateManyInput | CiapCourseCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * CiapCourse update
   */
  export type CiapCourseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CiapCourse
     */
    select?: CiapCourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CiapCourseInclude<ExtArgs> | null
    /**
     * The data needed to update a CiapCourse.
     */
    data: XOR<CiapCourseUpdateInput, CiapCourseUncheckedUpdateInput>
    /**
     * Choose, which CiapCourse to update.
     */
    where: CiapCourseWhereUniqueInput
  }


  /**
   * CiapCourse updateMany
   */
  export type CiapCourseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CiapCourses.
     */
    data: XOR<CiapCourseUpdateManyMutationInput, CiapCourseUncheckedUpdateManyInput>
    /**
     * Filter which CiapCourses to update
     */
    where?: CiapCourseWhereInput
  }


  /**
   * CiapCourse upsert
   */
  export type CiapCourseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CiapCourse
     */
    select?: CiapCourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CiapCourseInclude<ExtArgs> | null
    /**
     * The filter to search for the CiapCourse to update in case it exists.
     */
    where: CiapCourseWhereUniqueInput
    /**
     * In case the CiapCourse found by the `where` argument doesn't exist, create a new CiapCourse with this data.
     */
    create: XOR<CiapCourseCreateInput, CiapCourseUncheckedCreateInput>
    /**
     * In case the CiapCourse was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CiapCourseUpdateInput, CiapCourseUncheckedUpdateInput>
  }


  /**
   * CiapCourse delete
   */
  export type CiapCourseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CiapCourse
     */
    select?: CiapCourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CiapCourseInclude<ExtArgs> | null
    /**
     * Filter which CiapCourse to delete.
     */
    where: CiapCourseWhereUniqueInput
  }


  /**
   * CiapCourse deleteMany
   */
  export type CiapCourseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CiapCourses to delete
     */
    where?: CiapCourseWhereInput
  }


  /**
   * CiapCourse.enrolledStudents
   */
  export type CiapCourse$enrolledStudentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: StudentInclude<ExtArgs> | null
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    cursor?: StudentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }


  /**
   * CiapCourse without action
   */
  export type CiapCourseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CiapCourse
     */
    select?: CiapCourseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CiapCourseInclude<ExtArgs> | null
  }



  /**
   * Model StudentCareer
   */

  export type AggregateStudentCareer = {
    _count: StudentCareerCountAggregateOutputType | null
    _min: StudentCareerMinAggregateOutputType | null
    _max: StudentCareerMaxAggregateOutputType | null
  }

  export type StudentCareerMinAggregateOutputType = {
    studentEmail: string | null
    careerName: string | null
    status: $Enums.StudentCareerStatus | null
    graduationDate: Date | null
  }

  export type StudentCareerMaxAggregateOutputType = {
    studentEmail: string | null
    careerName: string | null
    status: $Enums.StudentCareerStatus | null
    graduationDate: Date | null
  }

  export type StudentCareerCountAggregateOutputType = {
    studentEmail: number
    careerName: number
    status: number
    graduationDate: number
    _all: number
  }


  export type StudentCareerMinAggregateInputType = {
    studentEmail?: true
    careerName?: true
    status?: true
    graduationDate?: true
  }

  export type StudentCareerMaxAggregateInputType = {
    studentEmail?: true
    careerName?: true
    status?: true
    graduationDate?: true
  }

  export type StudentCareerCountAggregateInputType = {
    studentEmail?: true
    careerName?: true
    status?: true
    graduationDate?: true
    _all?: true
  }

  export type StudentCareerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudentCareer to aggregate.
     */
    where?: StudentCareerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentCareers to fetch.
     */
    orderBy?: StudentCareerOrderByWithRelationInput | StudentCareerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentCareerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentCareers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentCareers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StudentCareers
    **/
    _count?: true | StudentCareerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentCareerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentCareerMaxAggregateInputType
  }

  export type GetStudentCareerAggregateType<T extends StudentCareerAggregateArgs> = {
        [P in keyof T & keyof AggregateStudentCareer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudentCareer[P]>
      : GetScalarType<T[P], AggregateStudentCareer[P]>
  }




  export type StudentCareerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentCareerWhereInput
    orderBy?: StudentCareerOrderByWithAggregationInput | StudentCareerOrderByWithAggregationInput[]
    by: StudentCareerScalarFieldEnum[] | StudentCareerScalarFieldEnum
    having?: StudentCareerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentCareerCountAggregateInputType | true
    _min?: StudentCareerMinAggregateInputType
    _max?: StudentCareerMaxAggregateInputType
  }

  export type StudentCareerGroupByOutputType = {
    studentEmail: string
    careerName: string
    status: $Enums.StudentCareerStatus
    graduationDate: Date | null
    _count: StudentCareerCountAggregateOutputType | null
    _min: StudentCareerMinAggregateOutputType | null
    _max: StudentCareerMaxAggregateOutputType | null
  }

  type GetStudentCareerGroupByPayload<T extends StudentCareerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentCareerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentCareerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentCareerGroupByOutputType[P]>
            : GetScalarType<T[P], StudentCareerGroupByOutputType[P]>
        }
      >
    >


  export type StudentCareerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    studentEmail?: boolean
    careerName?: boolean
    status?: boolean
    graduationDate?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    career?: boolean | CareerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["studentCareer"]>

  export type StudentCareerSelectScalar = {
    studentEmail?: boolean
    careerName?: boolean
    status?: boolean
    graduationDate?: boolean
  }

  export type StudentCareerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    career?: boolean | CareerDefaultArgs<ExtArgs>
  }


  export type $StudentCareerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StudentCareer"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
      career: Prisma.$CareerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      studentEmail: string
      careerName: string
      status: $Enums.StudentCareerStatus
      graduationDate: Date | null
    }, ExtArgs["result"]["studentCareer"]>
    composites: {}
  }


  type StudentCareerGetPayload<S extends boolean | null | undefined | StudentCareerDefaultArgs> = $Result.GetResult<Prisma.$StudentCareerPayload, S>

  type StudentCareerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StudentCareerFindManyArgs, 'select' | 'include' | 'distinct' > & {
      select?: StudentCareerCountAggregateInputType | true
    }

  export interface StudentCareerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StudentCareer'], meta: { name: 'StudentCareer' } }
    /**
     * Find zero or one StudentCareer that matches the filter.
     * @param {StudentCareerFindUniqueArgs} args - Arguments to find a StudentCareer
     * @example
     * // Get one StudentCareer
     * const studentCareer = await prisma.studentCareer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends StudentCareerFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, StudentCareerFindUniqueArgs<ExtArgs>>
    ): Prisma__StudentCareerClient<$Result.GetResult<Prisma.$StudentCareerPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one StudentCareer that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {StudentCareerFindUniqueOrThrowArgs} args - Arguments to find a StudentCareer
     * @example
     * // Get one StudentCareer
     * const studentCareer = await prisma.studentCareer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends StudentCareerFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, StudentCareerFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__StudentCareerClient<$Result.GetResult<Prisma.$StudentCareerPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first StudentCareer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCareerFindFirstArgs} args - Arguments to find a StudentCareer
     * @example
     * // Get one StudentCareer
     * const studentCareer = await prisma.studentCareer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends StudentCareerFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, StudentCareerFindFirstArgs<ExtArgs>>
    ): Prisma__StudentCareerClient<$Result.GetResult<Prisma.$StudentCareerPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first StudentCareer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCareerFindFirstOrThrowArgs} args - Arguments to find a StudentCareer
     * @example
     * // Get one StudentCareer
     * const studentCareer = await prisma.studentCareer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends StudentCareerFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, StudentCareerFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__StudentCareerClient<$Result.GetResult<Prisma.$StudentCareerPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more StudentCareers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCareerFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StudentCareers
     * const studentCareers = await prisma.studentCareer.findMany()
     * 
     * // Get first 10 StudentCareers
     * const studentCareers = await prisma.studentCareer.findMany({ take: 10 })
     * 
     * // Only select the `studentEmail`
     * const studentCareerWithStudentEmailOnly = await prisma.studentCareer.findMany({ select: { studentEmail: true } })
     * 
    **/
    findMany<T extends StudentCareerFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, StudentCareerFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentCareerPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a StudentCareer.
     * @param {StudentCareerCreateArgs} args - Arguments to create a StudentCareer.
     * @example
     * // Create one StudentCareer
     * const StudentCareer = await prisma.studentCareer.create({
     *   data: {
     *     // ... data to create a StudentCareer
     *   }
     * })
     * 
    **/
    create<T extends StudentCareerCreateArgs<ExtArgs>>(
      args: SelectSubset<T, StudentCareerCreateArgs<ExtArgs>>
    ): Prisma__StudentCareerClient<$Result.GetResult<Prisma.$StudentCareerPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many StudentCareers.
     *     @param {StudentCareerCreateManyArgs} args - Arguments to create many StudentCareers.
     *     @example
     *     // Create many StudentCareers
     *     const studentCareer = await prisma.studentCareer.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends StudentCareerCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, StudentCareerCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a StudentCareer.
     * @param {StudentCareerDeleteArgs} args - Arguments to delete one StudentCareer.
     * @example
     * // Delete one StudentCareer
     * const StudentCareer = await prisma.studentCareer.delete({
     *   where: {
     *     // ... filter to delete one StudentCareer
     *   }
     * })
     * 
    **/
    delete<T extends StudentCareerDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, StudentCareerDeleteArgs<ExtArgs>>
    ): Prisma__StudentCareerClient<$Result.GetResult<Prisma.$StudentCareerPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one StudentCareer.
     * @param {StudentCareerUpdateArgs} args - Arguments to update one StudentCareer.
     * @example
     * // Update one StudentCareer
     * const studentCareer = await prisma.studentCareer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends StudentCareerUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, StudentCareerUpdateArgs<ExtArgs>>
    ): Prisma__StudentCareerClient<$Result.GetResult<Prisma.$StudentCareerPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more StudentCareers.
     * @param {StudentCareerDeleteManyArgs} args - Arguments to filter StudentCareers to delete.
     * @example
     * // Delete a few StudentCareers
     * const { count } = await prisma.studentCareer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends StudentCareerDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, StudentCareerDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StudentCareers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCareerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StudentCareers
     * const studentCareer = await prisma.studentCareer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends StudentCareerUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, StudentCareerUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one StudentCareer.
     * @param {StudentCareerUpsertArgs} args - Arguments to update or create a StudentCareer.
     * @example
     * // Update or create a StudentCareer
     * const studentCareer = await prisma.studentCareer.upsert({
     *   create: {
     *     // ... data to create a StudentCareer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StudentCareer we want to update
     *   }
     * })
    **/
    upsert<T extends StudentCareerUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, StudentCareerUpsertArgs<ExtArgs>>
    ): Prisma__StudentCareerClient<$Result.GetResult<Prisma.$StudentCareerPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of StudentCareers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCareerCountArgs} args - Arguments to filter StudentCareers to count.
     * @example
     * // Count the number of StudentCareers
     * const count = await prisma.studentCareer.count({
     *   where: {
     *     // ... the filter for the StudentCareers we want to count
     *   }
     * })
    **/
    count<T extends StudentCareerCountArgs>(
      args?: Subset<T, StudentCareerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentCareerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StudentCareer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCareerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StudentCareerAggregateArgs>(args: Subset<T, StudentCareerAggregateArgs>): Prisma.PrismaPromise<GetStudentCareerAggregateType<T>>

    /**
     * Group by StudentCareer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCareerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StudentCareerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentCareerGroupByArgs['orderBy'] }
        : { orderBy?: StudentCareerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StudentCareerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentCareerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StudentCareer model
   */
  readonly fields: StudentCareerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StudentCareer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentCareerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    career<T extends CareerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CareerDefaultArgs<ExtArgs>>): Prisma__CareerClient<$Result.GetResult<Prisma.$CareerPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the StudentCareer model
   */ 
  interface StudentCareerFieldRefs {
    readonly studentEmail: FieldRef<"StudentCareer", 'String'>
    readonly careerName: FieldRef<"StudentCareer", 'String'>
    readonly status: FieldRef<"StudentCareer", 'StudentCareerStatus'>
    readonly graduationDate: FieldRef<"StudentCareer", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * StudentCareer findUnique
   */
  export type StudentCareerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCareer
     */
    select?: StudentCareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: StudentCareerInclude<ExtArgs> | null
    /**
     * Filter, which StudentCareer to fetch.
     */
    where: StudentCareerWhereUniqueInput
  }


  /**
   * StudentCareer findUniqueOrThrow
   */
  export type StudentCareerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCareer
     */
    select?: StudentCareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: StudentCareerInclude<ExtArgs> | null
    /**
     * Filter, which StudentCareer to fetch.
     */
    where: StudentCareerWhereUniqueInput
  }


  /**
   * StudentCareer findFirst
   */
  export type StudentCareerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCareer
     */
    select?: StudentCareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: StudentCareerInclude<ExtArgs> | null
    /**
     * Filter, which StudentCareer to fetch.
     */
    where?: StudentCareerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentCareers to fetch.
     */
    orderBy?: StudentCareerOrderByWithRelationInput | StudentCareerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudentCareers.
     */
    cursor?: StudentCareerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentCareers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentCareers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentCareers.
     */
    distinct?: StudentCareerScalarFieldEnum | StudentCareerScalarFieldEnum[]
  }


  /**
   * StudentCareer findFirstOrThrow
   */
  export type StudentCareerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCareer
     */
    select?: StudentCareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: StudentCareerInclude<ExtArgs> | null
    /**
     * Filter, which StudentCareer to fetch.
     */
    where?: StudentCareerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentCareers to fetch.
     */
    orderBy?: StudentCareerOrderByWithRelationInput | StudentCareerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StudentCareers.
     */
    cursor?: StudentCareerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentCareers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentCareers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StudentCareers.
     */
    distinct?: StudentCareerScalarFieldEnum | StudentCareerScalarFieldEnum[]
  }


  /**
   * StudentCareer findMany
   */
  export type StudentCareerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCareer
     */
    select?: StudentCareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: StudentCareerInclude<ExtArgs> | null
    /**
     * Filter, which StudentCareers to fetch.
     */
    where?: StudentCareerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StudentCareers to fetch.
     */
    orderBy?: StudentCareerOrderByWithRelationInput | StudentCareerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StudentCareers.
     */
    cursor?: StudentCareerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StudentCareers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StudentCareers.
     */
    skip?: number
    distinct?: StudentCareerScalarFieldEnum | StudentCareerScalarFieldEnum[]
  }


  /**
   * StudentCareer create
   */
  export type StudentCareerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCareer
     */
    select?: StudentCareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: StudentCareerInclude<ExtArgs> | null
    /**
     * The data needed to create a StudentCareer.
     */
    data: XOR<StudentCareerCreateInput, StudentCareerUncheckedCreateInput>
  }


  /**
   * StudentCareer createMany
   */
  export type StudentCareerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StudentCareers.
     */
    data: StudentCareerCreateManyInput | StudentCareerCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * StudentCareer update
   */
  export type StudentCareerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCareer
     */
    select?: StudentCareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: StudentCareerInclude<ExtArgs> | null
    /**
     * The data needed to update a StudentCareer.
     */
    data: XOR<StudentCareerUpdateInput, StudentCareerUncheckedUpdateInput>
    /**
     * Choose, which StudentCareer to update.
     */
    where: StudentCareerWhereUniqueInput
  }


  /**
   * StudentCareer updateMany
   */
  export type StudentCareerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StudentCareers.
     */
    data: XOR<StudentCareerUpdateManyMutationInput, StudentCareerUncheckedUpdateManyInput>
    /**
     * Filter which StudentCareers to update
     */
    where?: StudentCareerWhereInput
  }


  /**
   * StudentCareer upsert
   */
  export type StudentCareerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCareer
     */
    select?: StudentCareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: StudentCareerInclude<ExtArgs> | null
    /**
     * The filter to search for the StudentCareer to update in case it exists.
     */
    where: StudentCareerWhereUniqueInput
    /**
     * In case the StudentCareer found by the `where` argument doesn't exist, create a new StudentCareer with this data.
     */
    create: XOR<StudentCareerCreateInput, StudentCareerUncheckedCreateInput>
    /**
     * In case the StudentCareer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentCareerUpdateInput, StudentCareerUncheckedUpdateInput>
  }


  /**
   * StudentCareer delete
   */
  export type StudentCareerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCareer
     */
    select?: StudentCareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: StudentCareerInclude<ExtArgs> | null
    /**
     * Filter which StudentCareer to delete.
     */
    where: StudentCareerWhereUniqueInput
  }


  /**
   * StudentCareer deleteMany
   */
  export type StudentCareerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StudentCareers to delete
     */
    where?: StudentCareerWhereInput
  }


  /**
   * StudentCareer without action
   */
  export type StudentCareerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCareer
     */
    select?: StudentCareerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: StudentCareerInclude<ExtArgs> | null
  }



  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const StudentScalarFieldEnum: {
    email: 'email',
    names: 'names',
    surnames: 'surnames'
  };

  export type StudentScalarFieldEnum = (typeof StudentScalarFieldEnum)[keyof typeof StudentScalarFieldEnum]


  export const CareerScalarFieldEnum: {
    name: 'name'
  };

  export type CareerScalarFieldEnum = (typeof CareerScalarFieldEnum)[keyof typeof CareerScalarFieldEnum]


  export const CiapCourseScalarFieldEnum: {
    id: 'id',
    name: 'name',
    completionDate: 'completionDate'
  };

  export type CiapCourseScalarFieldEnum = (typeof CiapCourseScalarFieldEnum)[keyof typeof CiapCourseScalarFieldEnum]


  export const StudentCareerScalarFieldEnum: {
    studentEmail: 'studentEmail',
    careerName: 'careerName',
    status: 'status',
    graduationDate: 'graduationDate'
  };

  export type StudentCareerScalarFieldEnum = (typeof StudentCareerScalarFieldEnum)[keyof typeof StudentCareerScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'StudentCareerStatus'
   */
  export type EnumStudentCareerStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StudentCareerStatus'>
    


  /**
   * Reference to a field of type 'StudentCareerStatus[]'
   */
  export type ListEnumStudentCareerStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StudentCareerStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    
  /**
   * Deep Input Types
   */


  export type StudentWhereInput = {
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    email?: StringFilter<"Student"> | string
    names?: StringFilter<"Student"> | string
    surnames?: StringFilter<"Student"> | string
    enrolledCareers?: StudentCareerListRelationFilter
    coursesTaken?: CiapCourseListRelationFilter
  }

  export type StudentOrderByWithRelationInput = {
    email?: SortOrder
    names?: SortOrder
    surnames?: SortOrder
    enrolledCareers?: StudentCareerOrderByRelationAggregateInput
    coursesTaken?: CiapCourseOrderByRelationAggregateInput
  }

  export type StudentWhereUniqueInput = Prisma.AtLeast<{
    email?: string
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    names?: StringFilter<"Student"> | string
    surnames?: StringFilter<"Student"> | string
    enrolledCareers?: StudentCareerListRelationFilter
    coursesTaken?: CiapCourseListRelationFilter
  }, "email">

  export type StudentOrderByWithAggregationInput = {
    email?: SortOrder
    names?: SortOrder
    surnames?: SortOrder
    _count?: StudentCountOrderByAggregateInput
    _max?: StudentMaxOrderByAggregateInput
    _min?: StudentMinOrderByAggregateInput
  }

  export type StudentScalarWhereWithAggregatesInput = {
    AND?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    OR?: StudentScalarWhereWithAggregatesInput[]
    NOT?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    email?: StringWithAggregatesFilter<"Student"> | string
    names?: StringWithAggregatesFilter<"Student"> | string
    surnames?: StringWithAggregatesFilter<"Student"> | string
  }

  export type CareerWhereInput = {
    AND?: CareerWhereInput | CareerWhereInput[]
    OR?: CareerWhereInput[]
    NOT?: CareerWhereInput | CareerWhereInput[]
    name?: StringFilter<"Career"> | string
    enrolledStudents?: StudentCareerListRelationFilter
  }

  export type CareerOrderByWithRelationInput = {
    name?: SortOrder
    enrolledStudents?: StudentCareerOrderByRelationAggregateInput
  }

  export type CareerWhereUniqueInput = Prisma.AtLeast<{
    name?: string
    AND?: CareerWhereInput | CareerWhereInput[]
    OR?: CareerWhereInput[]
    NOT?: CareerWhereInput | CareerWhereInput[]
    enrolledStudents?: StudentCareerListRelationFilter
  }, "name">

  export type CareerOrderByWithAggregationInput = {
    name?: SortOrder
    _count?: CareerCountOrderByAggregateInput
    _max?: CareerMaxOrderByAggregateInput
    _min?: CareerMinOrderByAggregateInput
  }

  export type CareerScalarWhereWithAggregatesInput = {
    AND?: CareerScalarWhereWithAggregatesInput | CareerScalarWhereWithAggregatesInput[]
    OR?: CareerScalarWhereWithAggregatesInput[]
    NOT?: CareerScalarWhereWithAggregatesInput | CareerScalarWhereWithAggregatesInput[]
    name?: StringWithAggregatesFilter<"Career"> | string
  }

  export type CiapCourseWhereInput = {
    AND?: CiapCourseWhereInput | CiapCourseWhereInput[]
    OR?: CiapCourseWhereInput[]
    NOT?: CiapCourseWhereInput | CiapCourseWhereInput[]
    id?: UuidFilter<"CiapCourse"> | string
    name?: StringFilter<"CiapCourse"> | string
    completionDate?: DateTimeFilter<"CiapCourse"> | Date | string
    enrolledStudents?: StudentListRelationFilter
  }

  export type CiapCourseOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    completionDate?: SortOrder
    enrolledStudents?: StudentOrderByRelationAggregateInput
  }

  export type CiapCourseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CiapCourseWhereInput | CiapCourseWhereInput[]
    OR?: CiapCourseWhereInput[]
    NOT?: CiapCourseWhereInput | CiapCourseWhereInput[]
    name?: StringFilter<"CiapCourse"> | string
    completionDate?: DateTimeFilter<"CiapCourse"> | Date | string
    enrolledStudents?: StudentListRelationFilter
  }, "id">

  export type CiapCourseOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    completionDate?: SortOrder
    _count?: CiapCourseCountOrderByAggregateInput
    _max?: CiapCourseMaxOrderByAggregateInput
    _min?: CiapCourseMinOrderByAggregateInput
  }

  export type CiapCourseScalarWhereWithAggregatesInput = {
    AND?: CiapCourseScalarWhereWithAggregatesInput | CiapCourseScalarWhereWithAggregatesInput[]
    OR?: CiapCourseScalarWhereWithAggregatesInput[]
    NOT?: CiapCourseScalarWhereWithAggregatesInput | CiapCourseScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"CiapCourse"> | string
    name?: StringWithAggregatesFilter<"CiapCourse"> | string
    completionDate?: DateTimeWithAggregatesFilter<"CiapCourse"> | Date | string
  }

  export type StudentCareerWhereInput = {
    AND?: StudentCareerWhereInput | StudentCareerWhereInput[]
    OR?: StudentCareerWhereInput[]
    NOT?: StudentCareerWhereInput | StudentCareerWhereInput[]
    studentEmail?: StringFilter<"StudentCareer"> | string
    careerName?: StringFilter<"StudentCareer"> | string
    status?: EnumStudentCareerStatusFilter<"StudentCareer"> | $Enums.StudentCareerStatus
    graduationDate?: DateTimeNullableFilter<"StudentCareer"> | Date | string | null
    student?: XOR<StudentRelationFilter, StudentWhereInput>
    career?: XOR<CareerRelationFilter, CareerWhereInput>
  }

  export type StudentCareerOrderByWithRelationInput = {
    studentEmail?: SortOrder
    careerName?: SortOrder
    status?: SortOrder
    graduationDate?: SortOrderInput | SortOrder
    student?: StudentOrderByWithRelationInput
    career?: CareerOrderByWithRelationInput
  }

  export type StudentCareerWhereUniqueInput = Prisma.AtLeast<{
    studentEmail_careerName?: StudentCareerStudentEmailCareerNameCompoundUniqueInput
    AND?: StudentCareerWhereInput | StudentCareerWhereInput[]
    OR?: StudentCareerWhereInput[]
    NOT?: StudentCareerWhereInput | StudentCareerWhereInput[]
    studentEmail?: StringFilter<"StudentCareer"> | string
    careerName?: StringFilter<"StudentCareer"> | string
    status?: EnumStudentCareerStatusFilter<"StudentCareer"> | $Enums.StudentCareerStatus
    graduationDate?: DateTimeNullableFilter<"StudentCareer"> | Date | string | null
    student?: XOR<StudentRelationFilter, StudentWhereInput>
    career?: XOR<CareerRelationFilter, CareerWhereInput>
  }, "studentEmail_careerName">

  export type StudentCareerOrderByWithAggregationInput = {
    studentEmail?: SortOrder
    careerName?: SortOrder
    status?: SortOrder
    graduationDate?: SortOrderInput | SortOrder
    _count?: StudentCareerCountOrderByAggregateInput
    _max?: StudentCareerMaxOrderByAggregateInput
    _min?: StudentCareerMinOrderByAggregateInput
  }

  export type StudentCareerScalarWhereWithAggregatesInput = {
    AND?: StudentCareerScalarWhereWithAggregatesInput | StudentCareerScalarWhereWithAggregatesInput[]
    OR?: StudentCareerScalarWhereWithAggregatesInput[]
    NOT?: StudentCareerScalarWhereWithAggregatesInput | StudentCareerScalarWhereWithAggregatesInput[]
    studentEmail?: StringWithAggregatesFilter<"StudentCareer"> | string
    careerName?: StringWithAggregatesFilter<"StudentCareer"> | string
    status?: EnumStudentCareerStatusWithAggregatesFilter<"StudentCareer"> | $Enums.StudentCareerStatus
    graduationDate?: DateTimeNullableWithAggregatesFilter<"StudentCareer"> | Date | string | null
  }

  export type StudentCreateInput = {
    email: string
    names: string
    surnames: string
    enrolledCareers?: StudentCareerCreateNestedManyWithoutStudentInput
    coursesTaken?: CiapCourseCreateNestedManyWithoutEnrolledStudentsInput
  }

  export type StudentUncheckedCreateInput = {
    email: string
    names: string
    surnames: string
    enrolledCareers?: StudentCareerUncheckedCreateNestedManyWithoutStudentInput
    coursesTaken?: CiapCourseUncheckedCreateNestedManyWithoutEnrolledStudentsInput
  }

  export type StudentUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    names?: StringFieldUpdateOperationsInput | string
    surnames?: StringFieldUpdateOperationsInput | string
    enrolledCareers?: StudentCareerUpdateManyWithoutStudentNestedInput
    coursesTaken?: CiapCourseUpdateManyWithoutEnrolledStudentsNestedInput
  }

  export type StudentUncheckedUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    names?: StringFieldUpdateOperationsInput | string
    surnames?: StringFieldUpdateOperationsInput | string
    enrolledCareers?: StudentCareerUncheckedUpdateManyWithoutStudentNestedInput
    coursesTaken?: CiapCourseUncheckedUpdateManyWithoutEnrolledStudentsNestedInput
  }

  export type StudentCreateManyInput = {
    email: string
    names: string
    surnames: string
  }

  export type StudentUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    names?: StringFieldUpdateOperationsInput | string
    surnames?: StringFieldUpdateOperationsInput | string
  }

  export type StudentUncheckedUpdateManyInput = {
    email?: StringFieldUpdateOperationsInput | string
    names?: StringFieldUpdateOperationsInput | string
    surnames?: StringFieldUpdateOperationsInput | string
  }

  export type CareerCreateInput = {
    name: string
    enrolledStudents?: StudentCareerCreateNestedManyWithoutCareerInput
  }

  export type CareerUncheckedCreateInput = {
    name: string
    enrolledStudents?: StudentCareerUncheckedCreateNestedManyWithoutCareerInput
  }

  export type CareerUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    enrolledStudents?: StudentCareerUpdateManyWithoutCareerNestedInput
  }

  export type CareerUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    enrolledStudents?: StudentCareerUncheckedUpdateManyWithoutCareerNestedInput
  }

  export type CareerCreateManyInput = {
    name: string
  }

  export type CareerUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CareerUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CiapCourseCreateInput = {
    id?: string
    name: string
    completionDate: Date | string
    enrolledStudents?: StudentCreateNestedManyWithoutCoursesTakenInput
  }

  export type CiapCourseUncheckedCreateInput = {
    id?: string
    name: string
    completionDate: Date | string
    enrolledStudents?: StudentUncheckedCreateNestedManyWithoutCoursesTakenInput
  }

  export type CiapCourseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    completionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    enrolledStudents?: StudentUpdateManyWithoutCoursesTakenNestedInput
  }

  export type CiapCourseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    completionDate?: DateTimeFieldUpdateOperationsInput | Date | string
    enrolledStudents?: StudentUncheckedUpdateManyWithoutCoursesTakenNestedInput
  }

  export type CiapCourseCreateManyInput = {
    id?: string
    name: string
    completionDate: Date | string
  }

  export type CiapCourseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    completionDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CiapCourseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    completionDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentCareerCreateInput = {
    status: $Enums.StudentCareerStatus
    graduationDate?: Date | string | null
    student: StudentCreateNestedOneWithoutEnrolledCareersInput
    career: CareerCreateNestedOneWithoutEnrolledStudentsInput
  }

  export type StudentCareerUncheckedCreateInput = {
    studentEmail: string
    careerName: string
    status: $Enums.StudentCareerStatus
    graduationDate?: Date | string | null
  }

  export type StudentCareerUpdateInput = {
    status?: EnumStudentCareerStatusFieldUpdateOperationsInput | $Enums.StudentCareerStatus
    graduationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    student?: StudentUpdateOneRequiredWithoutEnrolledCareersNestedInput
    career?: CareerUpdateOneRequiredWithoutEnrolledStudentsNestedInput
  }

  export type StudentCareerUncheckedUpdateInput = {
    studentEmail?: StringFieldUpdateOperationsInput | string
    careerName?: StringFieldUpdateOperationsInput | string
    status?: EnumStudentCareerStatusFieldUpdateOperationsInput | $Enums.StudentCareerStatus
    graduationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StudentCareerCreateManyInput = {
    studentEmail: string
    careerName: string
    status: $Enums.StudentCareerStatus
    graduationDate?: Date | string | null
  }

  export type StudentCareerUpdateManyMutationInput = {
    status?: EnumStudentCareerStatusFieldUpdateOperationsInput | $Enums.StudentCareerStatus
    graduationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StudentCareerUncheckedUpdateManyInput = {
    studentEmail?: StringFieldUpdateOperationsInput | string
    careerName?: StringFieldUpdateOperationsInput | string
    status?: EnumStudentCareerStatusFieldUpdateOperationsInput | $Enums.StudentCareerStatus
    graduationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StudentCareerListRelationFilter = {
    every?: StudentCareerWhereInput
    some?: StudentCareerWhereInput
    none?: StudentCareerWhereInput
  }

  export type CiapCourseListRelationFilter = {
    every?: CiapCourseWhereInput
    some?: CiapCourseWhereInput
    none?: CiapCourseWhereInput
  }

  export type StudentCareerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CiapCourseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentCountOrderByAggregateInput = {
    email?: SortOrder
    names?: SortOrder
    surnames?: SortOrder
  }

  export type StudentMaxOrderByAggregateInput = {
    email?: SortOrder
    names?: SortOrder
    surnames?: SortOrder
  }

  export type StudentMinOrderByAggregateInput = {
    email?: SortOrder
    names?: SortOrder
    surnames?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type CareerCountOrderByAggregateInput = {
    name?: SortOrder
  }

  export type CareerMaxOrderByAggregateInput = {
    name?: SortOrder
  }

  export type CareerMinOrderByAggregateInput = {
    name?: SortOrder
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StudentListRelationFilter = {
    every?: StudentWhereInput
    some?: StudentWhereInput
    none?: StudentWhereInput
  }

  export type StudentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CiapCourseCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    completionDate?: SortOrder
  }

  export type CiapCourseMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    completionDate?: SortOrder
  }

  export type CiapCourseMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    completionDate?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumStudentCareerStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.StudentCareerStatus | EnumStudentCareerStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StudentCareerStatus[] | ListEnumStudentCareerStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StudentCareerStatus[] | ListEnumStudentCareerStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStudentCareerStatusFilter<$PrismaModel> | $Enums.StudentCareerStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StudentRelationFilter = {
    is?: StudentWhereInput
    isNot?: StudentWhereInput
  }

  export type CareerRelationFilter = {
    is?: CareerWhereInput
    isNot?: CareerWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type StudentCareerStudentEmailCareerNameCompoundUniqueInput = {
    studentEmail: string
    careerName: string
  }

  export type StudentCareerCountOrderByAggregateInput = {
    studentEmail?: SortOrder
    careerName?: SortOrder
    status?: SortOrder
    graduationDate?: SortOrder
  }

  export type StudentCareerMaxOrderByAggregateInput = {
    studentEmail?: SortOrder
    careerName?: SortOrder
    status?: SortOrder
    graduationDate?: SortOrder
  }

  export type StudentCareerMinOrderByAggregateInput = {
    studentEmail?: SortOrder
    careerName?: SortOrder
    status?: SortOrder
    graduationDate?: SortOrder
  }

  export type EnumStudentCareerStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StudentCareerStatus | EnumStudentCareerStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StudentCareerStatus[] | ListEnumStudentCareerStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StudentCareerStatus[] | ListEnumStudentCareerStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStudentCareerStatusWithAggregatesFilter<$PrismaModel> | $Enums.StudentCareerStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStudentCareerStatusFilter<$PrismaModel>
    _max?: NestedEnumStudentCareerStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StudentCareerCreateNestedManyWithoutStudentInput = {
    create?: XOR<StudentCareerCreateWithoutStudentInput, StudentCareerUncheckedCreateWithoutStudentInput> | StudentCareerCreateWithoutStudentInput[] | StudentCareerUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: StudentCareerCreateOrConnectWithoutStudentInput | StudentCareerCreateOrConnectWithoutStudentInput[]
    createMany?: StudentCareerCreateManyStudentInputEnvelope
    connect?: StudentCareerWhereUniqueInput | StudentCareerWhereUniqueInput[]
  }

  export type CiapCourseCreateNestedManyWithoutEnrolledStudentsInput = {
    create?: XOR<CiapCourseCreateWithoutEnrolledStudentsInput, CiapCourseUncheckedCreateWithoutEnrolledStudentsInput> | CiapCourseCreateWithoutEnrolledStudentsInput[] | CiapCourseUncheckedCreateWithoutEnrolledStudentsInput[]
    connectOrCreate?: CiapCourseCreateOrConnectWithoutEnrolledStudentsInput | CiapCourseCreateOrConnectWithoutEnrolledStudentsInput[]
    connect?: CiapCourseWhereUniqueInput | CiapCourseWhereUniqueInput[]
  }

  export type StudentCareerUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<StudentCareerCreateWithoutStudentInput, StudentCareerUncheckedCreateWithoutStudentInput> | StudentCareerCreateWithoutStudentInput[] | StudentCareerUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: StudentCareerCreateOrConnectWithoutStudentInput | StudentCareerCreateOrConnectWithoutStudentInput[]
    createMany?: StudentCareerCreateManyStudentInputEnvelope
    connect?: StudentCareerWhereUniqueInput | StudentCareerWhereUniqueInput[]
  }

  export type CiapCourseUncheckedCreateNestedManyWithoutEnrolledStudentsInput = {
    create?: XOR<CiapCourseCreateWithoutEnrolledStudentsInput, CiapCourseUncheckedCreateWithoutEnrolledStudentsInput> | CiapCourseCreateWithoutEnrolledStudentsInput[] | CiapCourseUncheckedCreateWithoutEnrolledStudentsInput[]
    connectOrCreate?: CiapCourseCreateOrConnectWithoutEnrolledStudentsInput | CiapCourseCreateOrConnectWithoutEnrolledStudentsInput[]
    connect?: CiapCourseWhereUniqueInput | CiapCourseWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type StudentCareerUpdateManyWithoutStudentNestedInput = {
    create?: XOR<StudentCareerCreateWithoutStudentInput, StudentCareerUncheckedCreateWithoutStudentInput> | StudentCareerCreateWithoutStudentInput[] | StudentCareerUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: StudentCareerCreateOrConnectWithoutStudentInput | StudentCareerCreateOrConnectWithoutStudentInput[]
    upsert?: StudentCareerUpsertWithWhereUniqueWithoutStudentInput | StudentCareerUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: StudentCareerCreateManyStudentInputEnvelope
    set?: StudentCareerWhereUniqueInput | StudentCareerWhereUniqueInput[]
    disconnect?: StudentCareerWhereUniqueInput | StudentCareerWhereUniqueInput[]
    delete?: StudentCareerWhereUniqueInput | StudentCareerWhereUniqueInput[]
    connect?: StudentCareerWhereUniqueInput | StudentCareerWhereUniqueInput[]
    update?: StudentCareerUpdateWithWhereUniqueWithoutStudentInput | StudentCareerUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: StudentCareerUpdateManyWithWhereWithoutStudentInput | StudentCareerUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: StudentCareerScalarWhereInput | StudentCareerScalarWhereInput[]
  }

  export type CiapCourseUpdateManyWithoutEnrolledStudentsNestedInput = {
    create?: XOR<CiapCourseCreateWithoutEnrolledStudentsInput, CiapCourseUncheckedCreateWithoutEnrolledStudentsInput> | CiapCourseCreateWithoutEnrolledStudentsInput[] | CiapCourseUncheckedCreateWithoutEnrolledStudentsInput[]
    connectOrCreate?: CiapCourseCreateOrConnectWithoutEnrolledStudentsInput | CiapCourseCreateOrConnectWithoutEnrolledStudentsInput[]
    upsert?: CiapCourseUpsertWithWhereUniqueWithoutEnrolledStudentsInput | CiapCourseUpsertWithWhereUniqueWithoutEnrolledStudentsInput[]
    set?: CiapCourseWhereUniqueInput | CiapCourseWhereUniqueInput[]
    disconnect?: CiapCourseWhereUniqueInput | CiapCourseWhereUniqueInput[]
    delete?: CiapCourseWhereUniqueInput | CiapCourseWhereUniqueInput[]
    connect?: CiapCourseWhereUniqueInput | CiapCourseWhereUniqueInput[]
    update?: CiapCourseUpdateWithWhereUniqueWithoutEnrolledStudentsInput | CiapCourseUpdateWithWhereUniqueWithoutEnrolledStudentsInput[]
    updateMany?: CiapCourseUpdateManyWithWhereWithoutEnrolledStudentsInput | CiapCourseUpdateManyWithWhereWithoutEnrolledStudentsInput[]
    deleteMany?: CiapCourseScalarWhereInput | CiapCourseScalarWhereInput[]
  }

  export type StudentCareerUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<StudentCareerCreateWithoutStudentInput, StudentCareerUncheckedCreateWithoutStudentInput> | StudentCareerCreateWithoutStudentInput[] | StudentCareerUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: StudentCareerCreateOrConnectWithoutStudentInput | StudentCareerCreateOrConnectWithoutStudentInput[]
    upsert?: StudentCareerUpsertWithWhereUniqueWithoutStudentInput | StudentCareerUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: StudentCareerCreateManyStudentInputEnvelope
    set?: StudentCareerWhereUniqueInput | StudentCareerWhereUniqueInput[]
    disconnect?: StudentCareerWhereUniqueInput | StudentCareerWhereUniqueInput[]
    delete?: StudentCareerWhereUniqueInput | StudentCareerWhereUniqueInput[]
    connect?: StudentCareerWhereUniqueInput | StudentCareerWhereUniqueInput[]
    update?: StudentCareerUpdateWithWhereUniqueWithoutStudentInput | StudentCareerUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: StudentCareerUpdateManyWithWhereWithoutStudentInput | StudentCareerUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: StudentCareerScalarWhereInput | StudentCareerScalarWhereInput[]
  }

  export type CiapCourseUncheckedUpdateManyWithoutEnrolledStudentsNestedInput = {
    create?: XOR<CiapCourseCreateWithoutEnrolledStudentsInput, CiapCourseUncheckedCreateWithoutEnrolledStudentsInput> | CiapCourseCreateWithoutEnrolledStudentsInput[] | CiapCourseUncheckedCreateWithoutEnrolledStudentsInput[]
    connectOrCreate?: CiapCourseCreateOrConnectWithoutEnrolledStudentsInput | CiapCourseCreateOrConnectWithoutEnrolledStudentsInput[]
    upsert?: CiapCourseUpsertWithWhereUniqueWithoutEnrolledStudentsInput | CiapCourseUpsertWithWhereUniqueWithoutEnrolledStudentsInput[]
    set?: CiapCourseWhereUniqueInput | CiapCourseWhereUniqueInput[]
    disconnect?: CiapCourseWhereUniqueInput | CiapCourseWhereUniqueInput[]
    delete?: CiapCourseWhereUniqueInput | CiapCourseWhereUniqueInput[]
    connect?: CiapCourseWhereUniqueInput | CiapCourseWhereUniqueInput[]
    update?: CiapCourseUpdateWithWhereUniqueWithoutEnrolledStudentsInput | CiapCourseUpdateWithWhereUniqueWithoutEnrolledStudentsInput[]
    updateMany?: CiapCourseUpdateManyWithWhereWithoutEnrolledStudentsInput | CiapCourseUpdateManyWithWhereWithoutEnrolledStudentsInput[]
    deleteMany?: CiapCourseScalarWhereInput | CiapCourseScalarWhereInput[]
  }

  export type StudentCareerCreateNestedManyWithoutCareerInput = {
    create?: XOR<StudentCareerCreateWithoutCareerInput, StudentCareerUncheckedCreateWithoutCareerInput> | StudentCareerCreateWithoutCareerInput[] | StudentCareerUncheckedCreateWithoutCareerInput[]
    connectOrCreate?: StudentCareerCreateOrConnectWithoutCareerInput | StudentCareerCreateOrConnectWithoutCareerInput[]
    createMany?: StudentCareerCreateManyCareerInputEnvelope
    connect?: StudentCareerWhereUniqueInput | StudentCareerWhereUniqueInput[]
  }

  export type StudentCareerUncheckedCreateNestedManyWithoutCareerInput = {
    create?: XOR<StudentCareerCreateWithoutCareerInput, StudentCareerUncheckedCreateWithoutCareerInput> | StudentCareerCreateWithoutCareerInput[] | StudentCareerUncheckedCreateWithoutCareerInput[]
    connectOrCreate?: StudentCareerCreateOrConnectWithoutCareerInput | StudentCareerCreateOrConnectWithoutCareerInput[]
    createMany?: StudentCareerCreateManyCareerInputEnvelope
    connect?: StudentCareerWhereUniqueInput | StudentCareerWhereUniqueInput[]
  }

  export type StudentCareerUpdateManyWithoutCareerNestedInput = {
    create?: XOR<StudentCareerCreateWithoutCareerInput, StudentCareerUncheckedCreateWithoutCareerInput> | StudentCareerCreateWithoutCareerInput[] | StudentCareerUncheckedCreateWithoutCareerInput[]
    connectOrCreate?: StudentCareerCreateOrConnectWithoutCareerInput | StudentCareerCreateOrConnectWithoutCareerInput[]
    upsert?: StudentCareerUpsertWithWhereUniqueWithoutCareerInput | StudentCareerUpsertWithWhereUniqueWithoutCareerInput[]
    createMany?: StudentCareerCreateManyCareerInputEnvelope
    set?: StudentCareerWhereUniqueInput | StudentCareerWhereUniqueInput[]
    disconnect?: StudentCareerWhereUniqueInput | StudentCareerWhereUniqueInput[]
    delete?: StudentCareerWhereUniqueInput | StudentCareerWhereUniqueInput[]
    connect?: StudentCareerWhereUniqueInput | StudentCareerWhereUniqueInput[]
    update?: StudentCareerUpdateWithWhereUniqueWithoutCareerInput | StudentCareerUpdateWithWhereUniqueWithoutCareerInput[]
    updateMany?: StudentCareerUpdateManyWithWhereWithoutCareerInput | StudentCareerUpdateManyWithWhereWithoutCareerInput[]
    deleteMany?: StudentCareerScalarWhereInput | StudentCareerScalarWhereInput[]
  }

  export type StudentCareerUncheckedUpdateManyWithoutCareerNestedInput = {
    create?: XOR<StudentCareerCreateWithoutCareerInput, StudentCareerUncheckedCreateWithoutCareerInput> | StudentCareerCreateWithoutCareerInput[] | StudentCareerUncheckedCreateWithoutCareerInput[]
    connectOrCreate?: StudentCareerCreateOrConnectWithoutCareerInput | StudentCareerCreateOrConnectWithoutCareerInput[]
    upsert?: StudentCareerUpsertWithWhereUniqueWithoutCareerInput | StudentCareerUpsertWithWhereUniqueWithoutCareerInput[]
    createMany?: StudentCareerCreateManyCareerInputEnvelope
    set?: StudentCareerWhereUniqueInput | StudentCareerWhereUniqueInput[]
    disconnect?: StudentCareerWhereUniqueInput | StudentCareerWhereUniqueInput[]
    delete?: StudentCareerWhereUniqueInput | StudentCareerWhereUniqueInput[]
    connect?: StudentCareerWhereUniqueInput | StudentCareerWhereUniqueInput[]
    update?: StudentCareerUpdateWithWhereUniqueWithoutCareerInput | StudentCareerUpdateWithWhereUniqueWithoutCareerInput[]
    updateMany?: StudentCareerUpdateManyWithWhereWithoutCareerInput | StudentCareerUpdateManyWithWhereWithoutCareerInput[]
    deleteMany?: StudentCareerScalarWhereInput | StudentCareerScalarWhereInput[]
  }

  export type StudentCreateNestedManyWithoutCoursesTakenInput = {
    create?: XOR<StudentCreateWithoutCoursesTakenInput, StudentUncheckedCreateWithoutCoursesTakenInput> | StudentCreateWithoutCoursesTakenInput[] | StudentUncheckedCreateWithoutCoursesTakenInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutCoursesTakenInput | StudentCreateOrConnectWithoutCoursesTakenInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
  }

  export type StudentUncheckedCreateNestedManyWithoutCoursesTakenInput = {
    create?: XOR<StudentCreateWithoutCoursesTakenInput, StudentUncheckedCreateWithoutCoursesTakenInput> | StudentCreateWithoutCoursesTakenInput[] | StudentUncheckedCreateWithoutCoursesTakenInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutCoursesTakenInput | StudentCreateOrConnectWithoutCoursesTakenInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StudentUpdateManyWithoutCoursesTakenNestedInput = {
    create?: XOR<StudentCreateWithoutCoursesTakenInput, StudentUncheckedCreateWithoutCoursesTakenInput> | StudentCreateWithoutCoursesTakenInput[] | StudentUncheckedCreateWithoutCoursesTakenInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutCoursesTakenInput | StudentCreateOrConnectWithoutCoursesTakenInput[]
    upsert?: StudentUpsertWithWhereUniqueWithoutCoursesTakenInput | StudentUpsertWithWhereUniqueWithoutCoursesTakenInput[]
    set?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    disconnect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    delete?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    update?: StudentUpdateWithWhereUniqueWithoutCoursesTakenInput | StudentUpdateWithWhereUniqueWithoutCoursesTakenInput[]
    updateMany?: StudentUpdateManyWithWhereWithoutCoursesTakenInput | StudentUpdateManyWithWhereWithoutCoursesTakenInput[]
    deleteMany?: StudentScalarWhereInput | StudentScalarWhereInput[]
  }

  export type StudentUncheckedUpdateManyWithoutCoursesTakenNestedInput = {
    create?: XOR<StudentCreateWithoutCoursesTakenInput, StudentUncheckedCreateWithoutCoursesTakenInput> | StudentCreateWithoutCoursesTakenInput[] | StudentUncheckedCreateWithoutCoursesTakenInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutCoursesTakenInput | StudentCreateOrConnectWithoutCoursesTakenInput[]
    upsert?: StudentUpsertWithWhereUniqueWithoutCoursesTakenInput | StudentUpsertWithWhereUniqueWithoutCoursesTakenInput[]
    set?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    disconnect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    delete?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    update?: StudentUpdateWithWhereUniqueWithoutCoursesTakenInput | StudentUpdateWithWhereUniqueWithoutCoursesTakenInput[]
    updateMany?: StudentUpdateManyWithWhereWithoutCoursesTakenInput | StudentUpdateManyWithWhereWithoutCoursesTakenInput[]
    deleteMany?: StudentScalarWhereInput | StudentScalarWhereInput[]
  }

  export type StudentCreateNestedOneWithoutEnrolledCareersInput = {
    create?: XOR<StudentCreateWithoutEnrolledCareersInput, StudentUncheckedCreateWithoutEnrolledCareersInput>
    connectOrCreate?: StudentCreateOrConnectWithoutEnrolledCareersInput
    connect?: StudentWhereUniqueInput
  }

  export type CareerCreateNestedOneWithoutEnrolledStudentsInput = {
    create?: XOR<CareerCreateWithoutEnrolledStudentsInput, CareerUncheckedCreateWithoutEnrolledStudentsInput>
    connectOrCreate?: CareerCreateOrConnectWithoutEnrolledStudentsInput
    connect?: CareerWhereUniqueInput
  }

  export type EnumStudentCareerStatusFieldUpdateOperationsInput = {
    set?: $Enums.StudentCareerStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type StudentUpdateOneRequiredWithoutEnrolledCareersNestedInput = {
    create?: XOR<StudentCreateWithoutEnrolledCareersInput, StudentUncheckedCreateWithoutEnrolledCareersInput>
    connectOrCreate?: StudentCreateOrConnectWithoutEnrolledCareersInput
    upsert?: StudentUpsertWithoutEnrolledCareersInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutEnrolledCareersInput, StudentUpdateWithoutEnrolledCareersInput>, StudentUncheckedUpdateWithoutEnrolledCareersInput>
  }

  export type CareerUpdateOneRequiredWithoutEnrolledStudentsNestedInput = {
    create?: XOR<CareerCreateWithoutEnrolledStudentsInput, CareerUncheckedCreateWithoutEnrolledStudentsInput>
    connectOrCreate?: CareerCreateOrConnectWithoutEnrolledStudentsInput
    upsert?: CareerUpsertWithoutEnrolledStudentsInput
    connect?: CareerWhereUniqueInput
    update?: XOR<XOR<CareerUpdateToOneWithWhereWithoutEnrolledStudentsInput, CareerUpdateWithoutEnrolledStudentsInput>, CareerUncheckedUpdateWithoutEnrolledStudentsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumStudentCareerStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.StudentCareerStatus | EnumStudentCareerStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StudentCareerStatus[] | ListEnumStudentCareerStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StudentCareerStatus[] | ListEnumStudentCareerStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStudentCareerStatusFilter<$PrismaModel> | $Enums.StudentCareerStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumStudentCareerStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StudentCareerStatus | EnumStudentCareerStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StudentCareerStatus[] | ListEnumStudentCareerStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StudentCareerStatus[] | ListEnumStudentCareerStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStudentCareerStatusWithAggregatesFilter<$PrismaModel> | $Enums.StudentCareerStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStudentCareerStatusFilter<$PrismaModel>
    _max?: NestedEnumStudentCareerStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StudentCareerCreateWithoutStudentInput = {
    status: $Enums.StudentCareerStatus
    graduationDate?: Date | string | null
    career: CareerCreateNestedOneWithoutEnrolledStudentsInput
  }

  export type StudentCareerUncheckedCreateWithoutStudentInput = {
    careerName: string
    status: $Enums.StudentCareerStatus
    graduationDate?: Date | string | null
  }

  export type StudentCareerCreateOrConnectWithoutStudentInput = {
    where: StudentCareerWhereUniqueInput
    create: XOR<StudentCareerCreateWithoutStudentInput, StudentCareerUncheckedCreateWithoutStudentInput>
  }

  export type StudentCareerCreateManyStudentInputEnvelope = {
    data: StudentCareerCreateManyStudentInput | StudentCareerCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type CiapCourseCreateWithoutEnrolledStudentsInput = {
    id?: string
    name: string
    completionDate: Date | string
  }

  export type CiapCourseUncheckedCreateWithoutEnrolledStudentsInput = {
    id?: string
    name: string
    completionDate: Date | string
  }

  export type CiapCourseCreateOrConnectWithoutEnrolledStudentsInput = {
    where: CiapCourseWhereUniqueInput
    create: XOR<CiapCourseCreateWithoutEnrolledStudentsInput, CiapCourseUncheckedCreateWithoutEnrolledStudentsInput>
  }

  export type StudentCareerUpsertWithWhereUniqueWithoutStudentInput = {
    where: StudentCareerWhereUniqueInput
    update: XOR<StudentCareerUpdateWithoutStudentInput, StudentCareerUncheckedUpdateWithoutStudentInput>
    create: XOR<StudentCareerCreateWithoutStudentInput, StudentCareerUncheckedCreateWithoutStudentInput>
  }

  export type StudentCareerUpdateWithWhereUniqueWithoutStudentInput = {
    where: StudentCareerWhereUniqueInput
    data: XOR<StudentCareerUpdateWithoutStudentInput, StudentCareerUncheckedUpdateWithoutStudentInput>
  }

  export type StudentCareerUpdateManyWithWhereWithoutStudentInput = {
    where: StudentCareerScalarWhereInput
    data: XOR<StudentCareerUpdateManyMutationInput, StudentCareerUncheckedUpdateManyWithoutStudentInput>
  }

  export type StudentCareerScalarWhereInput = {
    AND?: StudentCareerScalarWhereInput | StudentCareerScalarWhereInput[]
    OR?: StudentCareerScalarWhereInput[]
    NOT?: StudentCareerScalarWhereInput | StudentCareerScalarWhereInput[]
    studentEmail?: StringFilter<"StudentCareer"> | string
    careerName?: StringFilter<"StudentCareer"> | string
    status?: EnumStudentCareerStatusFilter<"StudentCareer"> | $Enums.StudentCareerStatus
    graduationDate?: DateTimeNullableFilter<"StudentCareer"> | Date | string | null
  }

  export type CiapCourseUpsertWithWhereUniqueWithoutEnrolledStudentsInput = {
    where: CiapCourseWhereUniqueInput
    update: XOR<CiapCourseUpdateWithoutEnrolledStudentsInput, CiapCourseUncheckedUpdateWithoutEnrolledStudentsInput>
    create: XOR<CiapCourseCreateWithoutEnrolledStudentsInput, CiapCourseUncheckedCreateWithoutEnrolledStudentsInput>
  }

  export type CiapCourseUpdateWithWhereUniqueWithoutEnrolledStudentsInput = {
    where: CiapCourseWhereUniqueInput
    data: XOR<CiapCourseUpdateWithoutEnrolledStudentsInput, CiapCourseUncheckedUpdateWithoutEnrolledStudentsInput>
  }

  export type CiapCourseUpdateManyWithWhereWithoutEnrolledStudentsInput = {
    where: CiapCourseScalarWhereInput
    data: XOR<CiapCourseUpdateManyMutationInput, CiapCourseUncheckedUpdateManyWithoutEnrolledStudentsInput>
  }

  export type CiapCourseScalarWhereInput = {
    AND?: CiapCourseScalarWhereInput | CiapCourseScalarWhereInput[]
    OR?: CiapCourseScalarWhereInput[]
    NOT?: CiapCourseScalarWhereInput | CiapCourseScalarWhereInput[]
    id?: UuidFilter<"CiapCourse"> | string
    name?: StringFilter<"CiapCourse"> | string
    completionDate?: DateTimeFilter<"CiapCourse"> | Date | string
  }

  export type StudentCareerCreateWithoutCareerInput = {
    status: $Enums.StudentCareerStatus
    graduationDate?: Date | string | null
    student: StudentCreateNestedOneWithoutEnrolledCareersInput
  }

  export type StudentCareerUncheckedCreateWithoutCareerInput = {
    studentEmail: string
    status: $Enums.StudentCareerStatus
    graduationDate?: Date | string | null
  }

  export type StudentCareerCreateOrConnectWithoutCareerInput = {
    where: StudentCareerWhereUniqueInput
    create: XOR<StudentCareerCreateWithoutCareerInput, StudentCareerUncheckedCreateWithoutCareerInput>
  }

  export type StudentCareerCreateManyCareerInputEnvelope = {
    data: StudentCareerCreateManyCareerInput | StudentCareerCreateManyCareerInput[]
    skipDuplicates?: boolean
  }

  export type StudentCareerUpsertWithWhereUniqueWithoutCareerInput = {
    where: StudentCareerWhereUniqueInput
    update: XOR<StudentCareerUpdateWithoutCareerInput, StudentCareerUncheckedUpdateWithoutCareerInput>
    create: XOR<StudentCareerCreateWithoutCareerInput, StudentCareerUncheckedCreateWithoutCareerInput>
  }

  export type StudentCareerUpdateWithWhereUniqueWithoutCareerInput = {
    where: StudentCareerWhereUniqueInput
    data: XOR<StudentCareerUpdateWithoutCareerInput, StudentCareerUncheckedUpdateWithoutCareerInput>
  }

  export type StudentCareerUpdateManyWithWhereWithoutCareerInput = {
    where: StudentCareerScalarWhereInput
    data: XOR<StudentCareerUpdateManyMutationInput, StudentCareerUncheckedUpdateManyWithoutCareerInput>
  }

  export type StudentCreateWithoutCoursesTakenInput = {
    email: string
    names: string
    surnames: string
    enrolledCareers?: StudentCareerCreateNestedManyWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutCoursesTakenInput = {
    email: string
    names: string
    surnames: string
    enrolledCareers?: StudentCareerUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutCoursesTakenInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutCoursesTakenInput, StudentUncheckedCreateWithoutCoursesTakenInput>
  }

  export type StudentUpsertWithWhereUniqueWithoutCoursesTakenInput = {
    where: StudentWhereUniqueInput
    update: XOR<StudentUpdateWithoutCoursesTakenInput, StudentUncheckedUpdateWithoutCoursesTakenInput>
    create: XOR<StudentCreateWithoutCoursesTakenInput, StudentUncheckedCreateWithoutCoursesTakenInput>
  }

  export type StudentUpdateWithWhereUniqueWithoutCoursesTakenInput = {
    where: StudentWhereUniqueInput
    data: XOR<StudentUpdateWithoutCoursesTakenInput, StudentUncheckedUpdateWithoutCoursesTakenInput>
  }

  export type StudentUpdateManyWithWhereWithoutCoursesTakenInput = {
    where: StudentScalarWhereInput
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyWithoutCoursesTakenInput>
  }

  export type StudentScalarWhereInput = {
    AND?: StudentScalarWhereInput | StudentScalarWhereInput[]
    OR?: StudentScalarWhereInput[]
    NOT?: StudentScalarWhereInput | StudentScalarWhereInput[]
    email?: StringFilter<"Student"> | string
    names?: StringFilter<"Student"> | string
    surnames?: StringFilter<"Student"> | string
  }

  export type StudentCreateWithoutEnrolledCareersInput = {
    email: string
    names: string
    surnames: string
    coursesTaken?: CiapCourseCreateNestedManyWithoutEnrolledStudentsInput
  }

  export type StudentUncheckedCreateWithoutEnrolledCareersInput = {
    email: string
    names: string
    surnames: string
    coursesTaken?: CiapCourseUncheckedCreateNestedManyWithoutEnrolledStudentsInput
  }

  export type StudentCreateOrConnectWithoutEnrolledCareersInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutEnrolledCareersInput, StudentUncheckedCreateWithoutEnrolledCareersInput>
  }

  export type CareerCreateWithoutEnrolledStudentsInput = {
    name: string
  }

  export type CareerUncheckedCreateWithoutEnrolledStudentsInput = {
    name: string
  }

  export type CareerCreateOrConnectWithoutEnrolledStudentsInput = {
    where: CareerWhereUniqueInput
    create: XOR<CareerCreateWithoutEnrolledStudentsInput, CareerUncheckedCreateWithoutEnrolledStudentsInput>
  }

  export type StudentUpsertWithoutEnrolledCareersInput = {
    update: XOR<StudentUpdateWithoutEnrolledCareersInput, StudentUncheckedUpdateWithoutEnrolledCareersInput>
    create: XOR<StudentCreateWithoutEnrolledCareersInput, StudentUncheckedCreateWithoutEnrolledCareersInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutEnrolledCareersInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutEnrolledCareersInput, StudentUncheckedUpdateWithoutEnrolledCareersInput>
  }

  export type StudentUpdateWithoutEnrolledCareersInput = {
    email?: StringFieldUpdateOperationsInput | string
    names?: StringFieldUpdateOperationsInput | string
    surnames?: StringFieldUpdateOperationsInput | string
    coursesTaken?: CiapCourseUpdateManyWithoutEnrolledStudentsNestedInput
  }

  export type StudentUncheckedUpdateWithoutEnrolledCareersInput = {
    email?: StringFieldUpdateOperationsInput | string
    names?: StringFieldUpdateOperationsInput | string
    surnames?: StringFieldUpdateOperationsInput | string
    coursesTaken?: CiapCourseUncheckedUpdateManyWithoutEnrolledStudentsNestedInput
  }

  export type CareerUpsertWithoutEnrolledStudentsInput = {
    update: XOR<CareerUpdateWithoutEnrolledStudentsInput, CareerUncheckedUpdateWithoutEnrolledStudentsInput>
    create: XOR<CareerCreateWithoutEnrolledStudentsInput, CareerUncheckedCreateWithoutEnrolledStudentsInput>
    where?: CareerWhereInput
  }

  export type CareerUpdateToOneWithWhereWithoutEnrolledStudentsInput = {
    where?: CareerWhereInput
    data: XOR<CareerUpdateWithoutEnrolledStudentsInput, CareerUncheckedUpdateWithoutEnrolledStudentsInput>
  }

  export type CareerUpdateWithoutEnrolledStudentsInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CareerUncheckedUpdateWithoutEnrolledStudentsInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type StudentCareerCreateManyStudentInput = {
    careerName: string
    status: $Enums.StudentCareerStatus
    graduationDate?: Date | string | null
  }

  export type StudentCareerUpdateWithoutStudentInput = {
    status?: EnumStudentCareerStatusFieldUpdateOperationsInput | $Enums.StudentCareerStatus
    graduationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    career?: CareerUpdateOneRequiredWithoutEnrolledStudentsNestedInput
  }

  export type StudentCareerUncheckedUpdateWithoutStudentInput = {
    careerName?: StringFieldUpdateOperationsInput | string
    status?: EnumStudentCareerStatusFieldUpdateOperationsInput | $Enums.StudentCareerStatus
    graduationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StudentCareerUncheckedUpdateManyWithoutStudentInput = {
    careerName?: StringFieldUpdateOperationsInput | string
    status?: EnumStudentCareerStatusFieldUpdateOperationsInput | $Enums.StudentCareerStatus
    graduationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CiapCourseUpdateWithoutEnrolledStudentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    completionDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CiapCourseUncheckedUpdateWithoutEnrolledStudentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    completionDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CiapCourseUncheckedUpdateManyWithoutEnrolledStudentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    completionDate?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentCareerCreateManyCareerInput = {
    studentEmail: string
    status: $Enums.StudentCareerStatus
    graduationDate?: Date | string | null
  }

  export type StudentCareerUpdateWithoutCareerInput = {
    status?: EnumStudentCareerStatusFieldUpdateOperationsInput | $Enums.StudentCareerStatus
    graduationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    student?: StudentUpdateOneRequiredWithoutEnrolledCareersNestedInput
  }

  export type StudentCareerUncheckedUpdateWithoutCareerInput = {
    studentEmail?: StringFieldUpdateOperationsInput | string
    status?: EnumStudentCareerStatusFieldUpdateOperationsInput | $Enums.StudentCareerStatus
    graduationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StudentCareerUncheckedUpdateManyWithoutCareerInput = {
    studentEmail?: StringFieldUpdateOperationsInput | string
    status?: EnumStudentCareerStatusFieldUpdateOperationsInput | $Enums.StudentCareerStatus
    graduationDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StudentUpdateWithoutCoursesTakenInput = {
    email?: StringFieldUpdateOperationsInput | string
    names?: StringFieldUpdateOperationsInput | string
    surnames?: StringFieldUpdateOperationsInput | string
    enrolledCareers?: StudentCareerUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutCoursesTakenInput = {
    email?: StringFieldUpdateOperationsInput | string
    names?: StringFieldUpdateOperationsInput | string
    surnames?: StringFieldUpdateOperationsInput | string
    enrolledCareers?: StudentCareerUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateManyWithoutCoursesTakenInput = {
    email?: StringFieldUpdateOperationsInput | string
    names?: StringFieldUpdateOperationsInput | string
    surnames?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use StudentCountOutputTypeDefaultArgs instead
     */
    export type StudentCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StudentCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CareerCountOutputTypeDefaultArgs instead
     */
    export type CareerCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CareerCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CiapCourseCountOutputTypeDefaultArgs instead
     */
    export type CiapCourseCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CiapCourseCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StudentDefaultArgs instead
     */
    export type StudentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StudentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CareerDefaultArgs instead
     */
    export type CareerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CareerDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CiapCourseDefaultArgs instead
     */
    export type CiapCourseArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CiapCourseDefaultArgs<ExtArgs>
    /**
     * @deprecated Use StudentCareerDefaultArgs instead
     */
    export type StudentCareerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = StudentCareerDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}