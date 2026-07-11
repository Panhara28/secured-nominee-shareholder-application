
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model StaffRole
 * 
 */
export type StaffRole = $Result.DefaultSelection<Prisma.$StaffRolePayload>
/**
 * Model PermissionModule
 * 
 */
export type PermissionModule = $Result.DefaultSelection<Prisma.$PermissionModulePayload>
/**
 * Model StaffRolePermission
 * 
 */
export type StaffRolePermission = $Result.DefaultSelection<Prisma.$StaffRolePermissionPayload>
/**
 * Model BeneficiaryRequest
 * 
 */
export type BeneficiaryRequest = $Result.DefaultSelection<Prisma.$BeneficiaryRequestPayload>
/**
 * Model RequestLog
 * 
 */
export type RequestLog = $Result.DefaultSelection<Prisma.$RequestLogPayload>
/**
 * Model RequestRevision
 * 
 */
export type RequestRevision = $Result.DefaultSelection<Prisma.$RequestRevisionPayload>
/**
 * Model ActivityLog
 * 
 */
export type ActivityLog = $Result.DefaultSelection<Prisma.$ActivityLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  SHAREHOLDER: 'SHAREHOLDER'
};

export type Role = (typeof Role)[keyof typeof Role]


export const BeneficiaryRequestStatus: {
  DRAFT: 'DRAFT',
  PENDING: 'PENDING',
  IN_REVIEW: 'IN_REVIEW',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  RETURNED: 'RETURNED',
  UPDATE_REQUESTED: 'UPDATE_REQUESTED'
};

export type BeneficiaryRequestStatus = (typeof BeneficiaryRequestStatus)[keyof typeof BeneficiaryRequestStatus]


export const Gender: {
  M: 'M',
  F: 'F'
};

export type Gender = (typeof Gender)[keyof typeof Gender]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type BeneficiaryRequestStatus = $Enums.BeneficiaryRequestStatus

export const BeneficiaryRequestStatus: typeof $Enums.BeneficiaryRequestStatus

export type Gender = $Enums.Gender

export const Gender: typeof $Enums.Gender

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.staffRole`: Exposes CRUD operations for the **StaffRole** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StaffRoles
    * const staffRoles = await prisma.staffRole.findMany()
    * ```
    */
  get staffRole(): Prisma.StaffRoleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.permissionModule`: Exposes CRUD operations for the **PermissionModule** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PermissionModules
    * const permissionModules = await prisma.permissionModule.findMany()
    * ```
    */
  get permissionModule(): Prisma.PermissionModuleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.staffRolePermission`: Exposes CRUD operations for the **StaffRolePermission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more StaffRolePermissions
    * const staffRolePermissions = await prisma.staffRolePermission.findMany()
    * ```
    */
  get staffRolePermission(): Prisma.StaffRolePermissionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.beneficiaryRequest`: Exposes CRUD operations for the **BeneficiaryRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BeneficiaryRequests
    * const beneficiaryRequests = await prisma.beneficiaryRequest.findMany()
    * ```
    */
  get beneficiaryRequest(): Prisma.BeneficiaryRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.requestLog`: Exposes CRUD operations for the **RequestLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RequestLogs
    * const requestLogs = await prisma.requestLog.findMany()
    * ```
    */
  get requestLog(): Prisma.RequestLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.requestRevision`: Exposes CRUD operations for the **RequestRevision** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RequestRevisions
    * const requestRevisions = await prisma.requestRevision.findMany()
    * ```
    */
  get requestRevision(): Prisma.RequestRevisionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activityLog`: Exposes CRUD operations for the **ActivityLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActivityLogs
    * const activityLogs = await prisma.activityLog.findMany()
    * ```
    */
  get activityLog(): Prisma.ActivityLogDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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

  type SelectAndOmit = {
    select: any
    omit: any
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
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
    User: 'User',
    StaffRole: 'StaffRole',
    PermissionModule: 'PermissionModule',
    StaffRolePermission: 'StaffRolePermission',
    BeneficiaryRequest: 'BeneficiaryRequest',
    RequestLog: 'RequestLog',
    RequestRevision: 'RequestRevision',
    ActivityLog: 'ActivityLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "staffRole" | "permissionModule" | "staffRolePermission" | "beneficiaryRequest" | "requestLog" | "requestRevision" | "activityLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      StaffRole: {
        payload: Prisma.$StaffRolePayload<ExtArgs>
        fields: Prisma.StaffRoleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StaffRoleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffRolePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StaffRoleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffRolePayload>
          }
          findFirst: {
            args: Prisma.StaffRoleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffRolePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StaffRoleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffRolePayload>
          }
          findMany: {
            args: Prisma.StaffRoleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffRolePayload>[]
          }
          create: {
            args: Prisma.StaffRoleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffRolePayload>
          }
          createMany: {
            args: Prisma.StaffRoleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StaffRoleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffRolePayload>[]
          }
          delete: {
            args: Prisma.StaffRoleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffRolePayload>
          }
          update: {
            args: Prisma.StaffRoleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffRolePayload>
          }
          deleteMany: {
            args: Prisma.StaffRoleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StaffRoleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StaffRoleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffRolePayload>[]
          }
          upsert: {
            args: Prisma.StaffRoleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffRolePayload>
          }
          aggregate: {
            args: Prisma.StaffRoleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStaffRole>
          }
          groupBy: {
            args: Prisma.StaffRoleGroupByArgs<ExtArgs>
            result: $Utils.Optional<StaffRoleGroupByOutputType>[]
          }
          count: {
            args: Prisma.StaffRoleCountArgs<ExtArgs>
            result: $Utils.Optional<StaffRoleCountAggregateOutputType> | number
          }
        }
      }
      PermissionModule: {
        payload: Prisma.$PermissionModulePayload<ExtArgs>
        fields: Prisma.PermissionModuleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PermissionModuleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionModulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PermissionModuleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionModulePayload>
          }
          findFirst: {
            args: Prisma.PermissionModuleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionModulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PermissionModuleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionModulePayload>
          }
          findMany: {
            args: Prisma.PermissionModuleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionModulePayload>[]
          }
          create: {
            args: Prisma.PermissionModuleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionModulePayload>
          }
          createMany: {
            args: Prisma.PermissionModuleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PermissionModuleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionModulePayload>[]
          }
          delete: {
            args: Prisma.PermissionModuleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionModulePayload>
          }
          update: {
            args: Prisma.PermissionModuleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionModulePayload>
          }
          deleteMany: {
            args: Prisma.PermissionModuleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PermissionModuleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PermissionModuleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionModulePayload>[]
          }
          upsert: {
            args: Prisma.PermissionModuleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionModulePayload>
          }
          aggregate: {
            args: Prisma.PermissionModuleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePermissionModule>
          }
          groupBy: {
            args: Prisma.PermissionModuleGroupByArgs<ExtArgs>
            result: $Utils.Optional<PermissionModuleGroupByOutputType>[]
          }
          count: {
            args: Prisma.PermissionModuleCountArgs<ExtArgs>
            result: $Utils.Optional<PermissionModuleCountAggregateOutputType> | number
          }
        }
      }
      StaffRolePermission: {
        payload: Prisma.$StaffRolePermissionPayload<ExtArgs>
        fields: Prisma.StaffRolePermissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StaffRolePermissionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffRolePermissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StaffRolePermissionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffRolePermissionPayload>
          }
          findFirst: {
            args: Prisma.StaffRolePermissionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffRolePermissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StaffRolePermissionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffRolePermissionPayload>
          }
          findMany: {
            args: Prisma.StaffRolePermissionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffRolePermissionPayload>[]
          }
          create: {
            args: Prisma.StaffRolePermissionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffRolePermissionPayload>
          }
          createMany: {
            args: Prisma.StaffRolePermissionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StaffRolePermissionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffRolePermissionPayload>[]
          }
          delete: {
            args: Prisma.StaffRolePermissionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffRolePermissionPayload>
          }
          update: {
            args: Prisma.StaffRolePermissionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffRolePermissionPayload>
          }
          deleteMany: {
            args: Prisma.StaffRolePermissionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StaffRolePermissionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StaffRolePermissionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffRolePermissionPayload>[]
          }
          upsert: {
            args: Prisma.StaffRolePermissionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StaffRolePermissionPayload>
          }
          aggregate: {
            args: Prisma.StaffRolePermissionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStaffRolePermission>
          }
          groupBy: {
            args: Prisma.StaffRolePermissionGroupByArgs<ExtArgs>
            result: $Utils.Optional<StaffRolePermissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.StaffRolePermissionCountArgs<ExtArgs>
            result: $Utils.Optional<StaffRolePermissionCountAggregateOutputType> | number
          }
        }
      }
      BeneficiaryRequest: {
        payload: Prisma.$BeneficiaryRequestPayload<ExtArgs>
        fields: Prisma.BeneficiaryRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BeneficiaryRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeneficiaryRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BeneficiaryRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeneficiaryRequestPayload>
          }
          findFirst: {
            args: Prisma.BeneficiaryRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeneficiaryRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BeneficiaryRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeneficiaryRequestPayload>
          }
          findMany: {
            args: Prisma.BeneficiaryRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeneficiaryRequestPayload>[]
          }
          create: {
            args: Prisma.BeneficiaryRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeneficiaryRequestPayload>
          }
          createMany: {
            args: Prisma.BeneficiaryRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BeneficiaryRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeneficiaryRequestPayload>[]
          }
          delete: {
            args: Prisma.BeneficiaryRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeneficiaryRequestPayload>
          }
          update: {
            args: Prisma.BeneficiaryRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeneficiaryRequestPayload>
          }
          deleteMany: {
            args: Prisma.BeneficiaryRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BeneficiaryRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BeneficiaryRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeneficiaryRequestPayload>[]
          }
          upsert: {
            args: Prisma.BeneficiaryRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BeneficiaryRequestPayload>
          }
          aggregate: {
            args: Prisma.BeneficiaryRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBeneficiaryRequest>
          }
          groupBy: {
            args: Prisma.BeneficiaryRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<BeneficiaryRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.BeneficiaryRequestCountArgs<ExtArgs>
            result: $Utils.Optional<BeneficiaryRequestCountAggregateOutputType> | number
          }
        }
      }
      RequestLog: {
        payload: Prisma.$RequestLogPayload<ExtArgs>
        fields: Prisma.RequestLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RequestLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RequestLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogPayload>
          }
          findFirst: {
            args: Prisma.RequestLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RequestLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogPayload>
          }
          findMany: {
            args: Prisma.RequestLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogPayload>[]
          }
          create: {
            args: Prisma.RequestLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogPayload>
          }
          createMany: {
            args: Prisma.RequestLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RequestLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogPayload>[]
          }
          delete: {
            args: Prisma.RequestLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogPayload>
          }
          update: {
            args: Prisma.RequestLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogPayload>
          }
          deleteMany: {
            args: Prisma.RequestLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RequestLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RequestLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogPayload>[]
          }
          upsert: {
            args: Prisma.RequestLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestLogPayload>
          }
          aggregate: {
            args: Prisma.RequestLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRequestLog>
          }
          groupBy: {
            args: Prisma.RequestLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<RequestLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.RequestLogCountArgs<ExtArgs>
            result: $Utils.Optional<RequestLogCountAggregateOutputType> | number
          }
        }
      }
      RequestRevision: {
        payload: Prisma.$RequestRevisionPayload<ExtArgs>
        fields: Prisma.RequestRevisionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RequestRevisionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestRevisionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RequestRevisionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestRevisionPayload>
          }
          findFirst: {
            args: Prisma.RequestRevisionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestRevisionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RequestRevisionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestRevisionPayload>
          }
          findMany: {
            args: Prisma.RequestRevisionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestRevisionPayload>[]
          }
          create: {
            args: Prisma.RequestRevisionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestRevisionPayload>
          }
          createMany: {
            args: Prisma.RequestRevisionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RequestRevisionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestRevisionPayload>[]
          }
          delete: {
            args: Prisma.RequestRevisionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestRevisionPayload>
          }
          update: {
            args: Prisma.RequestRevisionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestRevisionPayload>
          }
          deleteMany: {
            args: Prisma.RequestRevisionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RequestRevisionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RequestRevisionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestRevisionPayload>[]
          }
          upsert: {
            args: Prisma.RequestRevisionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RequestRevisionPayload>
          }
          aggregate: {
            args: Prisma.RequestRevisionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRequestRevision>
          }
          groupBy: {
            args: Prisma.RequestRevisionGroupByArgs<ExtArgs>
            result: $Utils.Optional<RequestRevisionGroupByOutputType>[]
          }
          count: {
            args: Prisma.RequestRevisionCountArgs<ExtArgs>
            result: $Utils.Optional<RequestRevisionCountAggregateOutputType> | number
          }
        }
      }
      ActivityLog: {
        payload: Prisma.$ActivityLogPayload<ExtArgs>
        fields: Prisma.ActivityLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          findFirst: {
            args: Prisma.ActivityLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          findMany: {
            args: Prisma.ActivityLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          create: {
            args: Prisma.ActivityLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          createMany: {
            args: Prisma.ActivityLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivityLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          delete: {
            args: Prisma.ActivityLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          update: {
            args: Prisma.ActivityLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          deleteMany: {
            args: Prisma.ActivityLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActivityLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          upsert: {
            args: Prisma.ActivityLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          aggregate: {
            args: Prisma.ActivityLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivityLog>
          }
          groupBy: {
            args: Prisma.ActivityLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityLogCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    staffRole?: StaffRoleOmit
    permissionModule?: PermissionModuleOmit
    staffRolePermission?: StaffRolePermissionOmit
    beneficiaryRequest?: BeneficiaryRequestOmit
    requestLog?: RequestLogOmit
    requestRevision?: RequestRevisionOmit
    activityLog?: ActivityLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    beneficiaryRequests: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    beneficiaryRequests?: boolean | UserCountOutputTypeCountBeneficiaryRequestsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBeneficiaryRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BeneficiaryRequestWhereInput
  }


  /**
   * Count Type StaffRoleCountOutputType
   */

  export type StaffRoleCountOutputType = {
    users: number
    permissions: number
  }

  export type StaffRoleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | StaffRoleCountOutputTypeCountUsersArgs
    permissions?: boolean | StaffRoleCountOutputTypeCountPermissionsArgs
  }

  // Custom InputTypes
  /**
   * StaffRoleCountOutputType without action
   */
  export type StaffRoleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffRoleCountOutputType
     */
    select?: StaffRoleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StaffRoleCountOutputType without action
   */
  export type StaffRoleCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * StaffRoleCountOutputType without action
   */
  export type StaffRoleCountOutputTypeCountPermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StaffRolePermissionWhereInput
  }


  /**
   * Count Type PermissionModuleCountOutputType
   */

  export type PermissionModuleCountOutputType = {
    rolePermissions: number
  }

  export type PermissionModuleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rolePermissions?: boolean | PermissionModuleCountOutputTypeCountRolePermissionsArgs
  }

  // Custom InputTypes
  /**
   * PermissionModuleCountOutputType without action
   */
  export type PermissionModuleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionModuleCountOutputType
     */
    select?: PermissionModuleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PermissionModuleCountOutputType without action
   */
  export type PermissionModuleCountOutputTypeCountRolePermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StaffRolePermissionWhereInput
  }


  /**
   * Count Type BeneficiaryRequestCountOutputType
   */

  export type BeneficiaryRequestCountOutputType = {
    logs: number
    revisions: number
  }

  export type BeneficiaryRequestCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    logs?: boolean | BeneficiaryRequestCountOutputTypeCountLogsArgs
    revisions?: boolean | BeneficiaryRequestCountOutputTypeCountRevisionsArgs
  }

  // Custom InputTypes
  /**
   * BeneficiaryRequestCountOutputType without action
   */
  export type BeneficiaryRequestCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BeneficiaryRequestCountOutputType
     */
    select?: BeneficiaryRequestCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BeneficiaryRequestCountOutputType without action
   */
  export type BeneficiaryRequestCountOutputTypeCountLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RequestLogWhereInput
  }

  /**
   * BeneficiaryRequestCountOutputType without action
   */
  export type BeneficiaryRequestCountOutputTypeCountRevisionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RequestRevisionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
    staffRoleId: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
    staffRoleId: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    username: string | null
    email: string | null
    passwordHash: string | null
    fullName: string | null
    companyName: string | null
    firstName: string | null
    lastName: string | null
    phoneNumber: string | null
    role: $Enums.Role | null
    isActive: boolean | null
    registrationReturnReason: string | null
    registrationReturnedAt: Date | null
    resetToken: string | null
    resetTokenExpiry: Date | null
    notificationsSeenAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    staffRoleId: number | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    username: string | null
    email: string | null
    passwordHash: string | null
    fullName: string | null
    companyName: string | null
    firstName: string | null
    lastName: string | null
    phoneNumber: string | null
    role: $Enums.Role | null
    isActive: boolean | null
    registrationReturnReason: string | null
    registrationReturnedAt: Date | null
    resetToken: string | null
    resetTokenExpiry: Date | null
    notificationsSeenAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    staffRoleId: number | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    email: number
    passwordHash: number
    fullName: number
    companyName: number
    firstName: number
    lastName: number
    phoneNumber: number
    role: number
    isActive: number
    registrationReturnReason: number
    registrationReturnedAt: number
    resetToken: number
    resetTokenExpiry: number
    notificationsSeenAt: number
    createdAt: number
    updatedAt: number
    staffRoleId: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
    staffRoleId?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
    staffRoleId?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    passwordHash?: true
    fullName?: true
    companyName?: true
    firstName?: true
    lastName?: true
    phoneNumber?: true
    role?: true
    isActive?: true
    registrationReturnReason?: true
    registrationReturnedAt?: true
    resetToken?: true
    resetTokenExpiry?: true
    notificationsSeenAt?: true
    createdAt?: true
    updatedAt?: true
    staffRoleId?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    passwordHash?: true
    fullName?: true
    companyName?: true
    firstName?: true
    lastName?: true
    phoneNumber?: true
    role?: true
    isActive?: true
    registrationReturnReason?: true
    registrationReturnedAt?: true
    resetToken?: true
    resetTokenExpiry?: true
    notificationsSeenAt?: true
    createdAt?: true
    updatedAt?: true
    staffRoleId?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    passwordHash?: true
    fullName?: true
    companyName?: true
    firstName?: true
    lastName?: true
    phoneNumber?: true
    role?: true
    isActive?: true
    registrationReturnReason?: true
    registrationReturnedAt?: true
    resetToken?: true
    resetTokenExpiry?: true
    notificationsSeenAt?: true
    createdAt?: true
    updatedAt?: true
    staffRoleId?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    username: string
    email: string
    passwordHash: string
    fullName: string
    companyName: string | null
    firstName: string | null
    lastName: string | null
    phoneNumber: string | null
    role: $Enums.Role
    isActive: boolean
    registrationReturnReason: string | null
    registrationReturnedAt: Date | null
    resetToken: string | null
    resetTokenExpiry: Date | null
    notificationsSeenAt: Date | null
    createdAt: Date
    updatedAt: Date
    staffRoleId: number | null
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    companyName?: boolean
    firstName?: boolean
    lastName?: boolean
    phoneNumber?: boolean
    role?: boolean
    isActive?: boolean
    registrationReturnReason?: boolean
    registrationReturnedAt?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
    notificationsSeenAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    staffRoleId?: boolean
    beneficiaryRequests?: boolean | User$beneficiaryRequestsArgs<ExtArgs>
    staffRole?: boolean | User$staffRoleArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    companyName?: boolean
    firstName?: boolean
    lastName?: boolean
    phoneNumber?: boolean
    role?: boolean
    isActive?: boolean
    registrationReturnReason?: boolean
    registrationReturnedAt?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
    notificationsSeenAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    staffRoleId?: boolean
    staffRole?: boolean | User$staffRoleArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    companyName?: boolean
    firstName?: boolean
    lastName?: boolean
    phoneNumber?: boolean
    role?: boolean
    isActive?: boolean
    registrationReturnReason?: boolean
    registrationReturnedAt?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
    notificationsSeenAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    staffRoleId?: boolean
    staffRole?: boolean | User$staffRoleArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    passwordHash?: boolean
    fullName?: boolean
    companyName?: boolean
    firstName?: boolean
    lastName?: boolean
    phoneNumber?: boolean
    role?: boolean
    isActive?: boolean
    registrationReturnReason?: boolean
    registrationReturnedAt?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
    notificationsSeenAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    staffRoleId?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "passwordHash" | "fullName" | "companyName" | "firstName" | "lastName" | "phoneNumber" | "role" | "isActive" | "registrationReturnReason" | "registrationReturnedAt" | "resetToken" | "resetTokenExpiry" | "notificationsSeenAt" | "createdAt" | "updatedAt" | "staffRoleId", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    beneficiaryRequests?: boolean | User$beneficiaryRequestsArgs<ExtArgs>
    staffRole?: boolean | User$staffRoleArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    staffRole?: boolean | User$staffRoleArgs<ExtArgs>
  }
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    staffRole?: boolean | User$staffRoleArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      beneficiaryRequests: Prisma.$BeneficiaryRequestPayload<ExtArgs>[]
      staffRole: Prisma.$StaffRolePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      username: string
      email: string
      passwordHash: string
      fullName: string
      companyName: string | null
      firstName: string | null
      lastName: string | null
      phoneNumber: string | null
      role: $Enums.Role
      isActive: boolean
      registrationReturnReason: string | null
      registrationReturnedAt: Date | null
      resetToken: string | null
      resetTokenExpiry: Date | null
      notificationsSeenAt: Date | null
      createdAt: Date
      updatedAt: Date
      staffRoleId: number | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    beneficiaryRequests<T extends User$beneficiaryRequestsArgs<ExtArgs> = {}>(args?: Subset<T, User$beneficiaryRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BeneficiaryRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    staffRole<T extends User$staffRoleArgs<ExtArgs> = {}>(args?: Subset<T, User$staffRoleArgs<ExtArgs>>): Prisma__StaffRoleClient<$Result.GetResult<Prisma.$StaffRolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly fullName: FieldRef<"User", 'String'>
    readonly companyName: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly phoneNumber: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly registrationReturnReason: FieldRef<"User", 'String'>
    readonly registrationReturnedAt: FieldRef<"User", 'DateTime'>
    readonly resetToken: FieldRef<"User", 'String'>
    readonly resetTokenExpiry: FieldRef<"User", 'DateTime'>
    readonly notificationsSeenAt: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly staffRoleId: FieldRef<"User", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.beneficiaryRequests
   */
  export type User$beneficiaryRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BeneficiaryRequest
     */
    select?: BeneficiaryRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BeneficiaryRequest
     */
    omit?: BeneficiaryRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeneficiaryRequestInclude<ExtArgs> | null
    where?: BeneficiaryRequestWhereInput
    orderBy?: BeneficiaryRequestOrderByWithRelationInput | BeneficiaryRequestOrderByWithRelationInput[]
    cursor?: BeneficiaryRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BeneficiaryRequestScalarFieldEnum | BeneficiaryRequestScalarFieldEnum[]
  }

  /**
   * User.staffRole
   */
  export type User$staffRoleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffRole
     */
    select?: StaffRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffRole
     */
    omit?: StaffRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffRoleInclude<ExtArgs> | null
    where?: StaffRoleWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model StaffRole
   */

  export type AggregateStaffRole = {
    _count: StaffRoleCountAggregateOutputType | null
    _avg: StaffRoleAvgAggregateOutputType | null
    _sum: StaffRoleSumAggregateOutputType | null
    _min: StaffRoleMinAggregateOutputType | null
    _max: StaffRoleMaxAggregateOutputType | null
  }

  export type StaffRoleAvgAggregateOutputType = {
    id: number | null
  }

  export type StaffRoleSumAggregateOutputType = {
    id: number | null
  }

  export type StaffRoleMinAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StaffRoleMaxAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StaffRoleCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StaffRoleAvgAggregateInputType = {
    id?: true
  }

  export type StaffRoleSumAggregateInputType = {
    id?: true
  }

  export type StaffRoleMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StaffRoleMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StaffRoleCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StaffRoleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StaffRole to aggregate.
     */
    where?: StaffRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffRoles to fetch.
     */
    orderBy?: StaffRoleOrderByWithRelationInput | StaffRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StaffRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StaffRoles
    **/
    _count?: true | StaffRoleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StaffRoleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StaffRoleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StaffRoleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StaffRoleMaxAggregateInputType
  }

  export type GetStaffRoleAggregateType<T extends StaffRoleAggregateArgs> = {
        [P in keyof T & keyof AggregateStaffRole]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStaffRole[P]>
      : GetScalarType<T[P], AggregateStaffRole[P]>
  }




  export type StaffRoleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StaffRoleWhereInput
    orderBy?: StaffRoleOrderByWithAggregationInput | StaffRoleOrderByWithAggregationInput[]
    by: StaffRoleScalarFieldEnum[] | StaffRoleScalarFieldEnum
    having?: StaffRoleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StaffRoleCountAggregateInputType | true
    _avg?: StaffRoleAvgAggregateInputType
    _sum?: StaffRoleSumAggregateInputType
    _min?: StaffRoleMinAggregateInputType
    _max?: StaffRoleMaxAggregateInputType
  }

  export type StaffRoleGroupByOutputType = {
    id: number
    name: string
    slug: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    _count: StaffRoleCountAggregateOutputType | null
    _avg: StaffRoleAvgAggregateOutputType | null
    _sum: StaffRoleSumAggregateOutputType | null
    _min: StaffRoleMinAggregateOutputType | null
    _max: StaffRoleMaxAggregateOutputType | null
  }

  type GetStaffRoleGroupByPayload<T extends StaffRoleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StaffRoleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StaffRoleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StaffRoleGroupByOutputType[P]>
            : GetScalarType<T[P], StaffRoleGroupByOutputType[P]>
        }
      >
    >


  export type StaffRoleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    users?: boolean | StaffRole$usersArgs<ExtArgs>
    permissions?: boolean | StaffRole$permissionsArgs<ExtArgs>
    _count?: boolean | StaffRoleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["staffRole"]>

  export type StaffRoleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["staffRole"]>

  export type StaffRoleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["staffRole"]>

  export type StaffRoleSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StaffRoleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["staffRole"]>
  export type StaffRoleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    users?: boolean | StaffRole$usersArgs<ExtArgs>
    permissions?: boolean | StaffRole$permissionsArgs<ExtArgs>
    _count?: boolean | StaffRoleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StaffRoleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type StaffRoleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $StaffRolePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StaffRole"
    objects: {
      users: Prisma.$UserPayload<ExtArgs>[]
      permissions: Prisma.$StaffRolePermissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      slug: string
      description: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["staffRole"]>
    composites: {}
  }

  type StaffRoleGetPayload<S extends boolean | null | undefined | StaffRoleDefaultArgs> = $Result.GetResult<Prisma.$StaffRolePayload, S>

  type StaffRoleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StaffRoleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StaffRoleCountAggregateInputType | true
    }

  export interface StaffRoleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StaffRole'], meta: { name: 'StaffRole' } }
    /**
     * Find zero or one StaffRole that matches the filter.
     * @param {StaffRoleFindUniqueArgs} args - Arguments to find a StaffRole
     * @example
     * // Get one StaffRole
     * const staffRole = await prisma.staffRole.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StaffRoleFindUniqueArgs>(args: SelectSubset<T, StaffRoleFindUniqueArgs<ExtArgs>>): Prisma__StaffRoleClient<$Result.GetResult<Prisma.$StaffRolePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StaffRole that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StaffRoleFindUniqueOrThrowArgs} args - Arguments to find a StaffRole
     * @example
     * // Get one StaffRole
     * const staffRole = await prisma.staffRole.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StaffRoleFindUniqueOrThrowArgs>(args: SelectSubset<T, StaffRoleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StaffRoleClient<$Result.GetResult<Prisma.$StaffRolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StaffRole that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffRoleFindFirstArgs} args - Arguments to find a StaffRole
     * @example
     * // Get one StaffRole
     * const staffRole = await prisma.staffRole.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StaffRoleFindFirstArgs>(args?: SelectSubset<T, StaffRoleFindFirstArgs<ExtArgs>>): Prisma__StaffRoleClient<$Result.GetResult<Prisma.$StaffRolePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StaffRole that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffRoleFindFirstOrThrowArgs} args - Arguments to find a StaffRole
     * @example
     * // Get one StaffRole
     * const staffRole = await prisma.staffRole.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StaffRoleFindFirstOrThrowArgs>(args?: SelectSubset<T, StaffRoleFindFirstOrThrowArgs<ExtArgs>>): Prisma__StaffRoleClient<$Result.GetResult<Prisma.$StaffRolePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StaffRoles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffRoleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StaffRoles
     * const staffRoles = await prisma.staffRole.findMany()
     * 
     * // Get first 10 StaffRoles
     * const staffRoles = await prisma.staffRole.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const staffRoleWithIdOnly = await prisma.staffRole.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StaffRoleFindManyArgs>(args?: SelectSubset<T, StaffRoleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffRolePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StaffRole.
     * @param {StaffRoleCreateArgs} args - Arguments to create a StaffRole.
     * @example
     * // Create one StaffRole
     * const StaffRole = await prisma.staffRole.create({
     *   data: {
     *     // ... data to create a StaffRole
     *   }
     * })
     * 
     */
    create<T extends StaffRoleCreateArgs>(args: SelectSubset<T, StaffRoleCreateArgs<ExtArgs>>): Prisma__StaffRoleClient<$Result.GetResult<Prisma.$StaffRolePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StaffRoles.
     * @param {StaffRoleCreateManyArgs} args - Arguments to create many StaffRoles.
     * @example
     * // Create many StaffRoles
     * const staffRole = await prisma.staffRole.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StaffRoleCreateManyArgs>(args?: SelectSubset<T, StaffRoleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StaffRoles and returns the data saved in the database.
     * @param {StaffRoleCreateManyAndReturnArgs} args - Arguments to create many StaffRoles.
     * @example
     * // Create many StaffRoles
     * const staffRole = await prisma.staffRole.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StaffRoles and only return the `id`
     * const staffRoleWithIdOnly = await prisma.staffRole.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StaffRoleCreateManyAndReturnArgs>(args?: SelectSubset<T, StaffRoleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffRolePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StaffRole.
     * @param {StaffRoleDeleteArgs} args - Arguments to delete one StaffRole.
     * @example
     * // Delete one StaffRole
     * const StaffRole = await prisma.staffRole.delete({
     *   where: {
     *     // ... filter to delete one StaffRole
     *   }
     * })
     * 
     */
    delete<T extends StaffRoleDeleteArgs>(args: SelectSubset<T, StaffRoleDeleteArgs<ExtArgs>>): Prisma__StaffRoleClient<$Result.GetResult<Prisma.$StaffRolePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StaffRole.
     * @param {StaffRoleUpdateArgs} args - Arguments to update one StaffRole.
     * @example
     * // Update one StaffRole
     * const staffRole = await prisma.staffRole.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StaffRoleUpdateArgs>(args: SelectSubset<T, StaffRoleUpdateArgs<ExtArgs>>): Prisma__StaffRoleClient<$Result.GetResult<Prisma.$StaffRolePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StaffRoles.
     * @param {StaffRoleDeleteManyArgs} args - Arguments to filter StaffRoles to delete.
     * @example
     * // Delete a few StaffRoles
     * const { count } = await prisma.staffRole.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StaffRoleDeleteManyArgs>(args?: SelectSubset<T, StaffRoleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StaffRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffRoleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StaffRoles
     * const staffRole = await prisma.staffRole.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StaffRoleUpdateManyArgs>(args: SelectSubset<T, StaffRoleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StaffRoles and returns the data updated in the database.
     * @param {StaffRoleUpdateManyAndReturnArgs} args - Arguments to update many StaffRoles.
     * @example
     * // Update many StaffRoles
     * const staffRole = await prisma.staffRole.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StaffRoles and only return the `id`
     * const staffRoleWithIdOnly = await prisma.staffRole.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StaffRoleUpdateManyAndReturnArgs>(args: SelectSubset<T, StaffRoleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffRolePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StaffRole.
     * @param {StaffRoleUpsertArgs} args - Arguments to update or create a StaffRole.
     * @example
     * // Update or create a StaffRole
     * const staffRole = await prisma.staffRole.upsert({
     *   create: {
     *     // ... data to create a StaffRole
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StaffRole we want to update
     *   }
     * })
     */
    upsert<T extends StaffRoleUpsertArgs>(args: SelectSubset<T, StaffRoleUpsertArgs<ExtArgs>>): Prisma__StaffRoleClient<$Result.GetResult<Prisma.$StaffRolePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StaffRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffRoleCountArgs} args - Arguments to filter StaffRoles to count.
     * @example
     * // Count the number of StaffRoles
     * const count = await prisma.staffRole.count({
     *   where: {
     *     // ... the filter for the StaffRoles we want to count
     *   }
     * })
    **/
    count<T extends StaffRoleCountArgs>(
      args?: Subset<T, StaffRoleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StaffRoleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StaffRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffRoleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StaffRoleAggregateArgs>(args: Subset<T, StaffRoleAggregateArgs>): Prisma.PrismaPromise<GetStaffRoleAggregateType<T>>

    /**
     * Group by StaffRole.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffRoleGroupByArgs} args - Group by arguments.
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
      T extends StaffRoleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StaffRoleGroupByArgs['orderBy'] }
        : { orderBy?: StaffRoleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StaffRoleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStaffRoleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StaffRole model
   */
  readonly fields: StaffRoleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StaffRole.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StaffRoleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    users<T extends StaffRole$usersArgs<ExtArgs> = {}>(args?: Subset<T, StaffRole$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    permissions<T extends StaffRole$permissionsArgs<ExtArgs> = {}>(args?: Subset<T, StaffRole$permissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffRolePermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StaffRole model
   */
  interface StaffRoleFieldRefs {
    readonly id: FieldRef<"StaffRole", 'Int'>
    readonly name: FieldRef<"StaffRole", 'String'>
    readonly slug: FieldRef<"StaffRole", 'String'>
    readonly description: FieldRef<"StaffRole", 'String'>
    readonly createdAt: FieldRef<"StaffRole", 'DateTime'>
    readonly updatedAt: FieldRef<"StaffRole", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * StaffRole findUnique
   */
  export type StaffRoleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffRole
     */
    select?: StaffRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffRole
     */
    omit?: StaffRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffRoleInclude<ExtArgs> | null
    /**
     * Filter, which StaffRole to fetch.
     */
    where: StaffRoleWhereUniqueInput
  }

  /**
   * StaffRole findUniqueOrThrow
   */
  export type StaffRoleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffRole
     */
    select?: StaffRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffRole
     */
    omit?: StaffRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffRoleInclude<ExtArgs> | null
    /**
     * Filter, which StaffRole to fetch.
     */
    where: StaffRoleWhereUniqueInput
  }

  /**
   * StaffRole findFirst
   */
  export type StaffRoleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffRole
     */
    select?: StaffRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffRole
     */
    omit?: StaffRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffRoleInclude<ExtArgs> | null
    /**
     * Filter, which StaffRole to fetch.
     */
    where?: StaffRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffRoles to fetch.
     */
    orderBy?: StaffRoleOrderByWithRelationInput | StaffRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StaffRoles.
     */
    cursor?: StaffRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StaffRoles.
     */
    distinct?: StaffRoleScalarFieldEnum | StaffRoleScalarFieldEnum[]
  }

  /**
   * StaffRole findFirstOrThrow
   */
  export type StaffRoleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffRole
     */
    select?: StaffRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffRole
     */
    omit?: StaffRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffRoleInclude<ExtArgs> | null
    /**
     * Filter, which StaffRole to fetch.
     */
    where?: StaffRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffRoles to fetch.
     */
    orderBy?: StaffRoleOrderByWithRelationInput | StaffRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StaffRoles.
     */
    cursor?: StaffRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StaffRoles.
     */
    distinct?: StaffRoleScalarFieldEnum | StaffRoleScalarFieldEnum[]
  }

  /**
   * StaffRole findMany
   */
  export type StaffRoleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffRole
     */
    select?: StaffRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffRole
     */
    omit?: StaffRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffRoleInclude<ExtArgs> | null
    /**
     * Filter, which StaffRoles to fetch.
     */
    where?: StaffRoleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffRoles to fetch.
     */
    orderBy?: StaffRoleOrderByWithRelationInput | StaffRoleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StaffRoles.
     */
    cursor?: StaffRoleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StaffRoles.
     */
    distinct?: StaffRoleScalarFieldEnum | StaffRoleScalarFieldEnum[]
  }

  /**
   * StaffRole create
   */
  export type StaffRoleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffRole
     */
    select?: StaffRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffRole
     */
    omit?: StaffRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffRoleInclude<ExtArgs> | null
    /**
     * The data needed to create a StaffRole.
     */
    data: XOR<StaffRoleCreateInput, StaffRoleUncheckedCreateInput>
  }

  /**
   * StaffRole createMany
   */
  export type StaffRoleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StaffRoles.
     */
    data: StaffRoleCreateManyInput | StaffRoleCreateManyInput[]
  }

  /**
   * StaffRole createManyAndReturn
   */
  export type StaffRoleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffRole
     */
    select?: StaffRoleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StaffRole
     */
    omit?: StaffRoleOmit<ExtArgs> | null
    /**
     * The data used to create many StaffRoles.
     */
    data: StaffRoleCreateManyInput | StaffRoleCreateManyInput[]
  }

  /**
   * StaffRole update
   */
  export type StaffRoleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffRole
     */
    select?: StaffRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffRole
     */
    omit?: StaffRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffRoleInclude<ExtArgs> | null
    /**
     * The data needed to update a StaffRole.
     */
    data: XOR<StaffRoleUpdateInput, StaffRoleUncheckedUpdateInput>
    /**
     * Choose, which StaffRole to update.
     */
    where: StaffRoleWhereUniqueInput
  }

  /**
   * StaffRole updateMany
   */
  export type StaffRoleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StaffRoles.
     */
    data: XOR<StaffRoleUpdateManyMutationInput, StaffRoleUncheckedUpdateManyInput>
    /**
     * Filter which StaffRoles to update
     */
    where?: StaffRoleWhereInput
    /**
     * Limit how many StaffRoles to update.
     */
    limit?: number
  }

  /**
   * StaffRole updateManyAndReturn
   */
  export type StaffRoleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffRole
     */
    select?: StaffRoleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StaffRole
     */
    omit?: StaffRoleOmit<ExtArgs> | null
    /**
     * The data used to update StaffRoles.
     */
    data: XOR<StaffRoleUpdateManyMutationInput, StaffRoleUncheckedUpdateManyInput>
    /**
     * Filter which StaffRoles to update
     */
    where?: StaffRoleWhereInput
    /**
     * Limit how many StaffRoles to update.
     */
    limit?: number
  }

  /**
   * StaffRole upsert
   */
  export type StaffRoleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffRole
     */
    select?: StaffRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffRole
     */
    omit?: StaffRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffRoleInclude<ExtArgs> | null
    /**
     * The filter to search for the StaffRole to update in case it exists.
     */
    where: StaffRoleWhereUniqueInput
    /**
     * In case the StaffRole found by the `where` argument doesn't exist, create a new StaffRole with this data.
     */
    create: XOR<StaffRoleCreateInput, StaffRoleUncheckedCreateInput>
    /**
     * In case the StaffRole was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StaffRoleUpdateInput, StaffRoleUncheckedUpdateInput>
  }

  /**
   * StaffRole delete
   */
  export type StaffRoleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffRole
     */
    select?: StaffRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffRole
     */
    omit?: StaffRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffRoleInclude<ExtArgs> | null
    /**
     * Filter which StaffRole to delete.
     */
    where: StaffRoleWhereUniqueInput
  }

  /**
   * StaffRole deleteMany
   */
  export type StaffRoleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StaffRoles to delete
     */
    where?: StaffRoleWhereInput
    /**
     * Limit how many StaffRoles to delete.
     */
    limit?: number
  }

  /**
   * StaffRole.users
   */
  export type StaffRole$usersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * StaffRole.permissions
   */
  export type StaffRole$permissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffRolePermission
     */
    select?: StaffRolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffRolePermission
     */
    omit?: StaffRolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffRolePermissionInclude<ExtArgs> | null
    where?: StaffRolePermissionWhereInput
    orderBy?: StaffRolePermissionOrderByWithRelationInput | StaffRolePermissionOrderByWithRelationInput[]
    cursor?: StaffRolePermissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StaffRolePermissionScalarFieldEnum | StaffRolePermissionScalarFieldEnum[]
  }

  /**
   * StaffRole without action
   */
  export type StaffRoleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffRole
     */
    select?: StaffRoleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffRole
     */
    omit?: StaffRoleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffRoleInclude<ExtArgs> | null
  }


  /**
   * Model PermissionModule
   */

  export type AggregatePermissionModule = {
    _count: PermissionModuleCountAggregateOutputType | null
    _avg: PermissionModuleAvgAggregateOutputType | null
    _sum: PermissionModuleSumAggregateOutputType | null
    _min: PermissionModuleMinAggregateOutputType | null
    _max: PermissionModuleMaxAggregateOutputType | null
  }

  export type PermissionModuleAvgAggregateOutputType = {
    id: number | null
  }

  export type PermissionModuleSumAggregateOutputType = {
    id: number | null
  }

  export type PermissionModuleMinAggregateOutputType = {
    id: number | null
    name: string | null
    label: string | null
    description: string | null
  }

  export type PermissionModuleMaxAggregateOutputType = {
    id: number | null
    name: string | null
    label: string | null
    description: string | null
  }

  export type PermissionModuleCountAggregateOutputType = {
    id: number
    name: number
    label: number
    description: number
    _all: number
  }


  export type PermissionModuleAvgAggregateInputType = {
    id?: true
  }

  export type PermissionModuleSumAggregateInputType = {
    id?: true
  }

  export type PermissionModuleMinAggregateInputType = {
    id?: true
    name?: true
    label?: true
    description?: true
  }

  export type PermissionModuleMaxAggregateInputType = {
    id?: true
    name?: true
    label?: true
    description?: true
  }

  export type PermissionModuleCountAggregateInputType = {
    id?: true
    name?: true
    label?: true
    description?: true
    _all?: true
  }

  export type PermissionModuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PermissionModule to aggregate.
     */
    where?: PermissionModuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PermissionModules to fetch.
     */
    orderBy?: PermissionModuleOrderByWithRelationInput | PermissionModuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PermissionModuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PermissionModules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PermissionModules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PermissionModules
    **/
    _count?: true | PermissionModuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PermissionModuleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PermissionModuleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PermissionModuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PermissionModuleMaxAggregateInputType
  }

  export type GetPermissionModuleAggregateType<T extends PermissionModuleAggregateArgs> = {
        [P in keyof T & keyof AggregatePermissionModule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePermissionModule[P]>
      : GetScalarType<T[P], AggregatePermissionModule[P]>
  }




  export type PermissionModuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PermissionModuleWhereInput
    orderBy?: PermissionModuleOrderByWithAggregationInput | PermissionModuleOrderByWithAggregationInput[]
    by: PermissionModuleScalarFieldEnum[] | PermissionModuleScalarFieldEnum
    having?: PermissionModuleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PermissionModuleCountAggregateInputType | true
    _avg?: PermissionModuleAvgAggregateInputType
    _sum?: PermissionModuleSumAggregateInputType
    _min?: PermissionModuleMinAggregateInputType
    _max?: PermissionModuleMaxAggregateInputType
  }

  export type PermissionModuleGroupByOutputType = {
    id: number
    name: string
    label: string
    description: string | null
    _count: PermissionModuleCountAggregateOutputType | null
    _avg: PermissionModuleAvgAggregateOutputType | null
    _sum: PermissionModuleSumAggregateOutputType | null
    _min: PermissionModuleMinAggregateOutputType | null
    _max: PermissionModuleMaxAggregateOutputType | null
  }

  type GetPermissionModuleGroupByPayload<T extends PermissionModuleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PermissionModuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PermissionModuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PermissionModuleGroupByOutputType[P]>
            : GetScalarType<T[P], PermissionModuleGroupByOutputType[P]>
        }
      >
    >


  export type PermissionModuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    label?: boolean
    description?: boolean
    rolePermissions?: boolean | PermissionModule$rolePermissionsArgs<ExtArgs>
    _count?: boolean | PermissionModuleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["permissionModule"]>

  export type PermissionModuleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    label?: boolean
    description?: boolean
  }, ExtArgs["result"]["permissionModule"]>

  export type PermissionModuleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    label?: boolean
    description?: boolean
  }, ExtArgs["result"]["permissionModule"]>

  export type PermissionModuleSelectScalar = {
    id?: boolean
    name?: boolean
    label?: boolean
    description?: boolean
  }

  export type PermissionModuleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "label" | "description", ExtArgs["result"]["permissionModule"]>
  export type PermissionModuleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    rolePermissions?: boolean | PermissionModule$rolePermissionsArgs<ExtArgs>
    _count?: boolean | PermissionModuleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PermissionModuleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PermissionModuleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PermissionModulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PermissionModule"
    objects: {
      rolePermissions: Prisma.$StaffRolePermissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      label: string
      description: string | null
    }, ExtArgs["result"]["permissionModule"]>
    composites: {}
  }

  type PermissionModuleGetPayload<S extends boolean | null | undefined | PermissionModuleDefaultArgs> = $Result.GetResult<Prisma.$PermissionModulePayload, S>

  type PermissionModuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PermissionModuleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PermissionModuleCountAggregateInputType | true
    }

  export interface PermissionModuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PermissionModule'], meta: { name: 'PermissionModule' } }
    /**
     * Find zero or one PermissionModule that matches the filter.
     * @param {PermissionModuleFindUniqueArgs} args - Arguments to find a PermissionModule
     * @example
     * // Get one PermissionModule
     * const permissionModule = await prisma.permissionModule.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PermissionModuleFindUniqueArgs>(args: SelectSubset<T, PermissionModuleFindUniqueArgs<ExtArgs>>): Prisma__PermissionModuleClient<$Result.GetResult<Prisma.$PermissionModulePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PermissionModule that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PermissionModuleFindUniqueOrThrowArgs} args - Arguments to find a PermissionModule
     * @example
     * // Get one PermissionModule
     * const permissionModule = await prisma.permissionModule.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PermissionModuleFindUniqueOrThrowArgs>(args: SelectSubset<T, PermissionModuleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PermissionModuleClient<$Result.GetResult<Prisma.$PermissionModulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PermissionModule that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionModuleFindFirstArgs} args - Arguments to find a PermissionModule
     * @example
     * // Get one PermissionModule
     * const permissionModule = await prisma.permissionModule.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PermissionModuleFindFirstArgs>(args?: SelectSubset<T, PermissionModuleFindFirstArgs<ExtArgs>>): Prisma__PermissionModuleClient<$Result.GetResult<Prisma.$PermissionModulePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PermissionModule that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionModuleFindFirstOrThrowArgs} args - Arguments to find a PermissionModule
     * @example
     * // Get one PermissionModule
     * const permissionModule = await prisma.permissionModule.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PermissionModuleFindFirstOrThrowArgs>(args?: SelectSubset<T, PermissionModuleFindFirstOrThrowArgs<ExtArgs>>): Prisma__PermissionModuleClient<$Result.GetResult<Prisma.$PermissionModulePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PermissionModules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionModuleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PermissionModules
     * const permissionModules = await prisma.permissionModule.findMany()
     * 
     * // Get first 10 PermissionModules
     * const permissionModules = await prisma.permissionModule.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const permissionModuleWithIdOnly = await prisma.permissionModule.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PermissionModuleFindManyArgs>(args?: SelectSubset<T, PermissionModuleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionModulePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PermissionModule.
     * @param {PermissionModuleCreateArgs} args - Arguments to create a PermissionModule.
     * @example
     * // Create one PermissionModule
     * const PermissionModule = await prisma.permissionModule.create({
     *   data: {
     *     // ... data to create a PermissionModule
     *   }
     * })
     * 
     */
    create<T extends PermissionModuleCreateArgs>(args: SelectSubset<T, PermissionModuleCreateArgs<ExtArgs>>): Prisma__PermissionModuleClient<$Result.GetResult<Prisma.$PermissionModulePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PermissionModules.
     * @param {PermissionModuleCreateManyArgs} args - Arguments to create many PermissionModules.
     * @example
     * // Create many PermissionModules
     * const permissionModule = await prisma.permissionModule.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PermissionModuleCreateManyArgs>(args?: SelectSubset<T, PermissionModuleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PermissionModules and returns the data saved in the database.
     * @param {PermissionModuleCreateManyAndReturnArgs} args - Arguments to create many PermissionModules.
     * @example
     * // Create many PermissionModules
     * const permissionModule = await prisma.permissionModule.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PermissionModules and only return the `id`
     * const permissionModuleWithIdOnly = await prisma.permissionModule.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PermissionModuleCreateManyAndReturnArgs>(args?: SelectSubset<T, PermissionModuleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionModulePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PermissionModule.
     * @param {PermissionModuleDeleteArgs} args - Arguments to delete one PermissionModule.
     * @example
     * // Delete one PermissionModule
     * const PermissionModule = await prisma.permissionModule.delete({
     *   where: {
     *     // ... filter to delete one PermissionModule
     *   }
     * })
     * 
     */
    delete<T extends PermissionModuleDeleteArgs>(args: SelectSubset<T, PermissionModuleDeleteArgs<ExtArgs>>): Prisma__PermissionModuleClient<$Result.GetResult<Prisma.$PermissionModulePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PermissionModule.
     * @param {PermissionModuleUpdateArgs} args - Arguments to update one PermissionModule.
     * @example
     * // Update one PermissionModule
     * const permissionModule = await prisma.permissionModule.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PermissionModuleUpdateArgs>(args: SelectSubset<T, PermissionModuleUpdateArgs<ExtArgs>>): Prisma__PermissionModuleClient<$Result.GetResult<Prisma.$PermissionModulePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PermissionModules.
     * @param {PermissionModuleDeleteManyArgs} args - Arguments to filter PermissionModules to delete.
     * @example
     * // Delete a few PermissionModules
     * const { count } = await prisma.permissionModule.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PermissionModuleDeleteManyArgs>(args?: SelectSubset<T, PermissionModuleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PermissionModules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionModuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PermissionModules
     * const permissionModule = await prisma.permissionModule.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PermissionModuleUpdateManyArgs>(args: SelectSubset<T, PermissionModuleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PermissionModules and returns the data updated in the database.
     * @param {PermissionModuleUpdateManyAndReturnArgs} args - Arguments to update many PermissionModules.
     * @example
     * // Update many PermissionModules
     * const permissionModule = await prisma.permissionModule.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PermissionModules and only return the `id`
     * const permissionModuleWithIdOnly = await prisma.permissionModule.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PermissionModuleUpdateManyAndReturnArgs>(args: SelectSubset<T, PermissionModuleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionModulePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PermissionModule.
     * @param {PermissionModuleUpsertArgs} args - Arguments to update or create a PermissionModule.
     * @example
     * // Update or create a PermissionModule
     * const permissionModule = await prisma.permissionModule.upsert({
     *   create: {
     *     // ... data to create a PermissionModule
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PermissionModule we want to update
     *   }
     * })
     */
    upsert<T extends PermissionModuleUpsertArgs>(args: SelectSubset<T, PermissionModuleUpsertArgs<ExtArgs>>): Prisma__PermissionModuleClient<$Result.GetResult<Prisma.$PermissionModulePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PermissionModules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionModuleCountArgs} args - Arguments to filter PermissionModules to count.
     * @example
     * // Count the number of PermissionModules
     * const count = await prisma.permissionModule.count({
     *   where: {
     *     // ... the filter for the PermissionModules we want to count
     *   }
     * })
    **/
    count<T extends PermissionModuleCountArgs>(
      args?: Subset<T, PermissionModuleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PermissionModuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PermissionModule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionModuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PermissionModuleAggregateArgs>(args: Subset<T, PermissionModuleAggregateArgs>): Prisma.PrismaPromise<GetPermissionModuleAggregateType<T>>

    /**
     * Group by PermissionModule.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionModuleGroupByArgs} args - Group by arguments.
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
      T extends PermissionModuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PermissionModuleGroupByArgs['orderBy'] }
        : { orderBy?: PermissionModuleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PermissionModuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPermissionModuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PermissionModule model
   */
  readonly fields: PermissionModuleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PermissionModule.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PermissionModuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    rolePermissions<T extends PermissionModule$rolePermissionsArgs<ExtArgs> = {}>(args?: Subset<T, PermissionModule$rolePermissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffRolePermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PermissionModule model
   */
  interface PermissionModuleFieldRefs {
    readonly id: FieldRef<"PermissionModule", 'Int'>
    readonly name: FieldRef<"PermissionModule", 'String'>
    readonly label: FieldRef<"PermissionModule", 'String'>
    readonly description: FieldRef<"PermissionModule", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PermissionModule findUnique
   */
  export type PermissionModuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionModule
     */
    select?: PermissionModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionModule
     */
    omit?: PermissionModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionModuleInclude<ExtArgs> | null
    /**
     * Filter, which PermissionModule to fetch.
     */
    where: PermissionModuleWhereUniqueInput
  }

  /**
   * PermissionModule findUniqueOrThrow
   */
  export type PermissionModuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionModule
     */
    select?: PermissionModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionModule
     */
    omit?: PermissionModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionModuleInclude<ExtArgs> | null
    /**
     * Filter, which PermissionModule to fetch.
     */
    where: PermissionModuleWhereUniqueInput
  }

  /**
   * PermissionModule findFirst
   */
  export type PermissionModuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionModule
     */
    select?: PermissionModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionModule
     */
    omit?: PermissionModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionModuleInclude<ExtArgs> | null
    /**
     * Filter, which PermissionModule to fetch.
     */
    where?: PermissionModuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PermissionModules to fetch.
     */
    orderBy?: PermissionModuleOrderByWithRelationInput | PermissionModuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PermissionModules.
     */
    cursor?: PermissionModuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PermissionModules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PermissionModules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PermissionModules.
     */
    distinct?: PermissionModuleScalarFieldEnum | PermissionModuleScalarFieldEnum[]
  }

  /**
   * PermissionModule findFirstOrThrow
   */
  export type PermissionModuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionModule
     */
    select?: PermissionModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionModule
     */
    omit?: PermissionModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionModuleInclude<ExtArgs> | null
    /**
     * Filter, which PermissionModule to fetch.
     */
    where?: PermissionModuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PermissionModules to fetch.
     */
    orderBy?: PermissionModuleOrderByWithRelationInput | PermissionModuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PermissionModules.
     */
    cursor?: PermissionModuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PermissionModules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PermissionModules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PermissionModules.
     */
    distinct?: PermissionModuleScalarFieldEnum | PermissionModuleScalarFieldEnum[]
  }

  /**
   * PermissionModule findMany
   */
  export type PermissionModuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionModule
     */
    select?: PermissionModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionModule
     */
    omit?: PermissionModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionModuleInclude<ExtArgs> | null
    /**
     * Filter, which PermissionModules to fetch.
     */
    where?: PermissionModuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PermissionModules to fetch.
     */
    orderBy?: PermissionModuleOrderByWithRelationInput | PermissionModuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PermissionModules.
     */
    cursor?: PermissionModuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PermissionModules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PermissionModules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PermissionModules.
     */
    distinct?: PermissionModuleScalarFieldEnum | PermissionModuleScalarFieldEnum[]
  }

  /**
   * PermissionModule create
   */
  export type PermissionModuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionModule
     */
    select?: PermissionModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionModule
     */
    omit?: PermissionModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionModuleInclude<ExtArgs> | null
    /**
     * The data needed to create a PermissionModule.
     */
    data: XOR<PermissionModuleCreateInput, PermissionModuleUncheckedCreateInput>
  }

  /**
   * PermissionModule createMany
   */
  export type PermissionModuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PermissionModules.
     */
    data: PermissionModuleCreateManyInput | PermissionModuleCreateManyInput[]
  }

  /**
   * PermissionModule createManyAndReturn
   */
  export type PermissionModuleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionModule
     */
    select?: PermissionModuleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionModule
     */
    omit?: PermissionModuleOmit<ExtArgs> | null
    /**
     * The data used to create many PermissionModules.
     */
    data: PermissionModuleCreateManyInput | PermissionModuleCreateManyInput[]
  }

  /**
   * PermissionModule update
   */
  export type PermissionModuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionModule
     */
    select?: PermissionModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionModule
     */
    omit?: PermissionModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionModuleInclude<ExtArgs> | null
    /**
     * The data needed to update a PermissionModule.
     */
    data: XOR<PermissionModuleUpdateInput, PermissionModuleUncheckedUpdateInput>
    /**
     * Choose, which PermissionModule to update.
     */
    where: PermissionModuleWhereUniqueInput
  }

  /**
   * PermissionModule updateMany
   */
  export type PermissionModuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PermissionModules.
     */
    data: XOR<PermissionModuleUpdateManyMutationInput, PermissionModuleUncheckedUpdateManyInput>
    /**
     * Filter which PermissionModules to update
     */
    where?: PermissionModuleWhereInput
    /**
     * Limit how many PermissionModules to update.
     */
    limit?: number
  }

  /**
   * PermissionModule updateManyAndReturn
   */
  export type PermissionModuleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionModule
     */
    select?: PermissionModuleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionModule
     */
    omit?: PermissionModuleOmit<ExtArgs> | null
    /**
     * The data used to update PermissionModules.
     */
    data: XOR<PermissionModuleUpdateManyMutationInput, PermissionModuleUncheckedUpdateManyInput>
    /**
     * Filter which PermissionModules to update
     */
    where?: PermissionModuleWhereInput
    /**
     * Limit how many PermissionModules to update.
     */
    limit?: number
  }

  /**
   * PermissionModule upsert
   */
  export type PermissionModuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionModule
     */
    select?: PermissionModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionModule
     */
    omit?: PermissionModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionModuleInclude<ExtArgs> | null
    /**
     * The filter to search for the PermissionModule to update in case it exists.
     */
    where: PermissionModuleWhereUniqueInput
    /**
     * In case the PermissionModule found by the `where` argument doesn't exist, create a new PermissionModule with this data.
     */
    create: XOR<PermissionModuleCreateInput, PermissionModuleUncheckedCreateInput>
    /**
     * In case the PermissionModule was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PermissionModuleUpdateInput, PermissionModuleUncheckedUpdateInput>
  }

  /**
   * PermissionModule delete
   */
  export type PermissionModuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionModule
     */
    select?: PermissionModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionModule
     */
    omit?: PermissionModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionModuleInclude<ExtArgs> | null
    /**
     * Filter which PermissionModule to delete.
     */
    where: PermissionModuleWhereUniqueInput
  }

  /**
   * PermissionModule deleteMany
   */
  export type PermissionModuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PermissionModules to delete
     */
    where?: PermissionModuleWhereInput
    /**
     * Limit how many PermissionModules to delete.
     */
    limit?: number
  }

  /**
   * PermissionModule.rolePermissions
   */
  export type PermissionModule$rolePermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffRolePermission
     */
    select?: StaffRolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffRolePermission
     */
    omit?: StaffRolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffRolePermissionInclude<ExtArgs> | null
    where?: StaffRolePermissionWhereInput
    orderBy?: StaffRolePermissionOrderByWithRelationInput | StaffRolePermissionOrderByWithRelationInput[]
    cursor?: StaffRolePermissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StaffRolePermissionScalarFieldEnum | StaffRolePermissionScalarFieldEnum[]
  }

  /**
   * PermissionModule without action
   */
  export type PermissionModuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermissionModule
     */
    select?: PermissionModuleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermissionModule
     */
    omit?: PermissionModuleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionModuleInclude<ExtArgs> | null
  }


  /**
   * Model StaffRolePermission
   */

  export type AggregateStaffRolePermission = {
    _count: StaffRolePermissionCountAggregateOutputType | null
    _avg: StaffRolePermissionAvgAggregateOutputType | null
    _sum: StaffRolePermissionSumAggregateOutputType | null
    _min: StaffRolePermissionMinAggregateOutputType | null
    _max: StaffRolePermissionMaxAggregateOutputType | null
  }

  export type StaffRolePermissionAvgAggregateOutputType = {
    staffRoleId: number | null
    moduleId: number | null
  }

  export type StaffRolePermissionSumAggregateOutputType = {
    staffRoleId: number | null
    moduleId: number | null
  }

  export type StaffRolePermissionMinAggregateOutputType = {
    staffRoleId: number | null
    moduleId: number | null
    create: boolean | null
    read: boolean | null
    update: boolean | null
    delete: boolean | null
  }

  export type StaffRolePermissionMaxAggregateOutputType = {
    staffRoleId: number | null
    moduleId: number | null
    create: boolean | null
    read: boolean | null
    update: boolean | null
    delete: boolean | null
  }

  export type StaffRolePermissionCountAggregateOutputType = {
    staffRoleId: number
    moduleId: number
    create: number
    read: number
    update: number
    delete: number
    _all: number
  }


  export type StaffRolePermissionAvgAggregateInputType = {
    staffRoleId?: true
    moduleId?: true
  }

  export type StaffRolePermissionSumAggregateInputType = {
    staffRoleId?: true
    moduleId?: true
  }

  export type StaffRolePermissionMinAggregateInputType = {
    staffRoleId?: true
    moduleId?: true
    create?: true
    read?: true
    update?: true
    delete?: true
  }

  export type StaffRolePermissionMaxAggregateInputType = {
    staffRoleId?: true
    moduleId?: true
    create?: true
    read?: true
    update?: true
    delete?: true
  }

  export type StaffRolePermissionCountAggregateInputType = {
    staffRoleId?: true
    moduleId?: true
    create?: true
    read?: true
    update?: true
    delete?: true
    _all?: true
  }

  export type StaffRolePermissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StaffRolePermission to aggregate.
     */
    where?: StaffRolePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffRolePermissions to fetch.
     */
    orderBy?: StaffRolePermissionOrderByWithRelationInput | StaffRolePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StaffRolePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffRolePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffRolePermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned StaffRolePermissions
    **/
    _count?: true | StaffRolePermissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StaffRolePermissionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StaffRolePermissionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StaffRolePermissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StaffRolePermissionMaxAggregateInputType
  }

  export type GetStaffRolePermissionAggregateType<T extends StaffRolePermissionAggregateArgs> = {
        [P in keyof T & keyof AggregateStaffRolePermission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStaffRolePermission[P]>
      : GetScalarType<T[P], AggregateStaffRolePermission[P]>
  }




  export type StaffRolePermissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StaffRolePermissionWhereInput
    orderBy?: StaffRolePermissionOrderByWithAggregationInput | StaffRolePermissionOrderByWithAggregationInput[]
    by: StaffRolePermissionScalarFieldEnum[] | StaffRolePermissionScalarFieldEnum
    having?: StaffRolePermissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StaffRolePermissionCountAggregateInputType | true
    _avg?: StaffRolePermissionAvgAggregateInputType
    _sum?: StaffRolePermissionSumAggregateInputType
    _min?: StaffRolePermissionMinAggregateInputType
    _max?: StaffRolePermissionMaxAggregateInputType
  }

  export type StaffRolePermissionGroupByOutputType = {
    staffRoleId: number
    moduleId: number
    create: boolean
    read: boolean
    update: boolean
    delete: boolean
    _count: StaffRolePermissionCountAggregateOutputType | null
    _avg: StaffRolePermissionAvgAggregateOutputType | null
    _sum: StaffRolePermissionSumAggregateOutputType | null
    _min: StaffRolePermissionMinAggregateOutputType | null
    _max: StaffRolePermissionMaxAggregateOutputType | null
  }

  type GetStaffRolePermissionGroupByPayload<T extends StaffRolePermissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StaffRolePermissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StaffRolePermissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StaffRolePermissionGroupByOutputType[P]>
            : GetScalarType<T[P], StaffRolePermissionGroupByOutputType[P]>
        }
      >
    >


  export type StaffRolePermissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    staffRoleId?: boolean
    moduleId?: boolean
    create?: boolean
    read?: boolean
    update?: boolean
    delete?: boolean
    staffRole?: boolean | StaffRoleDefaultArgs<ExtArgs>
    module?: boolean | PermissionModuleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["staffRolePermission"]>

  export type StaffRolePermissionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    staffRoleId?: boolean
    moduleId?: boolean
    create?: boolean
    read?: boolean
    update?: boolean
    delete?: boolean
    staffRole?: boolean | StaffRoleDefaultArgs<ExtArgs>
    module?: boolean | PermissionModuleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["staffRolePermission"]>

  export type StaffRolePermissionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    staffRoleId?: boolean
    moduleId?: boolean
    create?: boolean
    read?: boolean
    update?: boolean
    delete?: boolean
    staffRole?: boolean | StaffRoleDefaultArgs<ExtArgs>
    module?: boolean | PermissionModuleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["staffRolePermission"]>

  export type StaffRolePermissionSelectScalar = {
    staffRoleId?: boolean
    moduleId?: boolean
    create?: boolean
    read?: boolean
    update?: boolean
    delete?: boolean
  }

  export type StaffRolePermissionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"staffRoleId" | "moduleId" | "create" | "read" | "update" | "delete", ExtArgs["result"]["staffRolePermission"]>
  export type StaffRolePermissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    staffRole?: boolean | StaffRoleDefaultArgs<ExtArgs>
    module?: boolean | PermissionModuleDefaultArgs<ExtArgs>
  }
  export type StaffRolePermissionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    staffRole?: boolean | StaffRoleDefaultArgs<ExtArgs>
    module?: boolean | PermissionModuleDefaultArgs<ExtArgs>
  }
  export type StaffRolePermissionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    staffRole?: boolean | StaffRoleDefaultArgs<ExtArgs>
    module?: boolean | PermissionModuleDefaultArgs<ExtArgs>
  }

  export type $StaffRolePermissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "StaffRolePermission"
    objects: {
      staffRole: Prisma.$StaffRolePayload<ExtArgs>
      module: Prisma.$PermissionModulePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      staffRoleId: number
      moduleId: number
      create: boolean
      read: boolean
      update: boolean
      delete: boolean
    }, ExtArgs["result"]["staffRolePermission"]>
    composites: {}
  }

  type StaffRolePermissionGetPayload<S extends boolean | null | undefined | StaffRolePermissionDefaultArgs> = $Result.GetResult<Prisma.$StaffRolePermissionPayload, S>

  type StaffRolePermissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StaffRolePermissionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StaffRolePermissionCountAggregateInputType | true
    }

  export interface StaffRolePermissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['StaffRolePermission'], meta: { name: 'StaffRolePermission' } }
    /**
     * Find zero or one StaffRolePermission that matches the filter.
     * @param {StaffRolePermissionFindUniqueArgs} args - Arguments to find a StaffRolePermission
     * @example
     * // Get one StaffRolePermission
     * const staffRolePermission = await prisma.staffRolePermission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StaffRolePermissionFindUniqueArgs>(args: SelectSubset<T, StaffRolePermissionFindUniqueArgs<ExtArgs>>): Prisma__StaffRolePermissionClient<$Result.GetResult<Prisma.$StaffRolePermissionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one StaffRolePermission that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StaffRolePermissionFindUniqueOrThrowArgs} args - Arguments to find a StaffRolePermission
     * @example
     * // Get one StaffRolePermission
     * const staffRolePermission = await prisma.staffRolePermission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StaffRolePermissionFindUniqueOrThrowArgs>(args: SelectSubset<T, StaffRolePermissionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StaffRolePermissionClient<$Result.GetResult<Prisma.$StaffRolePermissionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StaffRolePermission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffRolePermissionFindFirstArgs} args - Arguments to find a StaffRolePermission
     * @example
     * // Get one StaffRolePermission
     * const staffRolePermission = await prisma.staffRolePermission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StaffRolePermissionFindFirstArgs>(args?: SelectSubset<T, StaffRolePermissionFindFirstArgs<ExtArgs>>): Prisma__StaffRolePermissionClient<$Result.GetResult<Prisma.$StaffRolePermissionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first StaffRolePermission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffRolePermissionFindFirstOrThrowArgs} args - Arguments to find a StaffRolePermission
     * @example
     * // Get one StaffRolePermission
     * const staffRolePermission = await prisma.staffRolePermission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StaffRolePermissionFindFirstOrThrowArgs>(args?: SelectSubset<T, StaffRolePermissionFindFirstOrThrowArgs<ExtArgs>>): Prisma__StaffRolePermissionClient<$Result.GetResult<Prisma.$StaffRolePermissionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more StaffRolePermissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffRolePermissionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all StaffRolePermissions
     * const staffRolePermissions = await prisma.staffRolePermission.findMany()
     * 
     * // Get first 10 StaffRolePermissions
     * const staffRolePermissions = await prisma.staffRolePermission.findMany({ take: 10 })
     * 
     * // Only select the `staffRoleId`
     * const staffRolePermissionWithStaffRoleIdOnly = await prisma.staffRolePermission.findMany({ select: { staffRoleId: true } })
     * 
     */
    findMany<T extends StaffRolePermissionFindManyArgs>(args?: SelectSubset<T, StaffRolePermissionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffRolePermissionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a StaffRolePermission.
     * @param {StaffRolePermissionCreateArgs} args - Arguments to create a StaffRolePermission.
     * @example
     * // Create one StaffRolePermission
     * const StaffRolePermission = await prisma.staffRolePermission.create({
     *   data: {
     *     // ... data to create a StaffRolePermission
     *   }
     * })
     * 
     */
    create<T extends StaffRolePermissionCreateArgs>(args: SelectSubset<T, StaffRolePermissionCreateArgs<ExtArgs>>): Prisma__StaffRolePermissionClient<$Result.GetResult<Prisma.$StaffRolePermissionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many StaffRolePermissions.
     * @param {StaffRolePermissionCreateManyArgs} args - Arguments to create many StaffRolePermissions.
     * @example
     * // Create many StaffRolePermissions
     * const staffRolePermission = await prisma.staffRolePermission.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StaffRolePermissionCreateManyArgs>(args?: SelectSubset<T, StaffRolePermissionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many StaffRolePermissions and returns the data saved in the database.
     * @param {StaffRolePermissionCreateManyAndReturnArgs} args - Arguments to create many StaffRolePermissions.
     * @example
     * // Create many StaffRolePermissions
     * const staffRolePermission = await prisma.staffRolePermission.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many StaffRolePermissions and only return the `staffRoleId`
     * const staffRolePermissionWithStaffRoleIdOnly = await prisma.staffRolePermission.createManyAndReturn({
     *   select: { staffRoleId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StaffRolePermissionCreateManyAndReturnArgs>(args?: SelectSubset<T, StaffRolePermissionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffRolePermissionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a StaffRolePermission.
     * @param {StaffRolePermissionDeleteArgs} args - Arguments to delete one StaffRolePermission.
     * @example
     * // Delete one StaffRolePermission
     * const StaffRolePermission = await prisma.staffRolePermission.delete({
     *   where: {
     *     // ... filter to delete one StaffRolePermission
     *   }
     * })
     * 
     */
    delete<T extends StaffRolePermissionDeleteArgs>(args: SelectSubset<T, StaffRolePermissionDeleteArgs<ExtArgs>>): Prisma__StaffRolePermissionClient<$Result.GetResult<Prisma.$StaffRolePermissionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one StaffRolePermission.
     * @param {StaffRolePermissionUpdateArgs} args - Arguments to update one StaffRolePermission.
     * @example
     * // Update one StaffRolePermission
     * const staffRolePermission = await prisma.staffRolePermission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StaffRolePermissionUpdateArgs>(args: SelectSubset<T, StaffRolePermissionUpdateArgs<ExtArgs>>): Prisma__StaffRolePermissionClient<$Result.GetResult<Prisma.$StaffRolePermissionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more StaffRolePermissions.
     * @param {StaffRolePermissionDeleteManyArgs} args - Arguments to filter StaffRolePermissions to delete.
     * @example
     * // Delete a few StaffRolePermissions
     * const { count } = await prisma.staffRolePermission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StaffRolePermissionDeleteManyArgs>(args?: SelectSubset<T, StaffRolePermissionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StaffRolePermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffRolePermissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many StaffRolePermissions
     * const staffRolePermission = await prisma.staffRolePermission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StaffRolePermissionUpdateManyArgs>(args: SelectSubset<T, StaffRolePermissionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more StaffRolePermissions and returns the data updated in the database.
     * @param {StaffRolePermissionUpdateManyAndReturnArgs} args - Arguments to update many StaffRolePermissions.
     * @example
     * // Update many StaffRolePermissions
     * const staffRolePermission = await prisma.staffRolePermission.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more StaffRolePermissions and only return the `staffRoleId`
     * const staffRolePermissionWithStaffRoleIdOnly = await prisma.staffRolePermission.updateManyAndReturn({
     *   select: { staffRoleId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends StaffRolePermissionUpdateManyAndReturnArgs>(args: SelectSubset<T, StaffRolePermissionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StaffRolePermissionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one StaffRolePermission.
     * @param {StaffRolePermissionUpsertArgs} args - Arguments to update or create a StaffRolePermission.
     * @example
     * // Update or create a StaffRolePermission
     * const staffRolePermission = await prisma.staffRolePermission.upsert({
     *   create: {
     *     // ... data to create a StaffRolePermission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the StaffRolePermission we want to update
     *   }
     * })
     */
    upsert<T extends StaffRolePermissionUpsertArgs>(args: SelectSubset<T, StaffRolePermissionUpsertArgs<ExtArgs>>): Prisma__StaffRolePermissionClient<$Result.GetResult<Prisma.$StaffRolePermissionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of StaffRolePermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffRolePermissionCountArgs} args - Arguments to filter StaffRolePermissions to count.
     * @example
     * // Count the number of StaffRolePermissions
     * const count = await prisma.staffRolePermission.count({
     *   where: {
     *     // ... the filter for the StaffRolePermissions we want to count
     *   }
     * })
    **/
    count<T extends StaffRolePermissionCountArgs>(
      args?: Subset<T, StaffRolePermissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StaffRolePermissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a StaffRolePermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffRolePermissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StaffRolePermissionAggregateArgs>(args: Subset<T, StaffRolePermissionAggregateArgs>): Prisma.PrismaPromise<GetStaffRolePermissionAggregateType<T>>

    /**
     * Group by StaffRolePermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StaffRolePermissionGroupByArgs} args - Group by arguments.
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
      T extends StaffRolePermissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StaffRolePermissionGroupByArgs['orderBy'] }
        : { orderBy?: StaffRolePermissionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StaffRolePermissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStaffRolePermissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the StaffRolePermission model
   */
  readonly fields: StaffRolePermissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for StaffRolePermission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StaffRolePermissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    staffRole<T extends StaffRoleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StaffRoleDefaultArgs<ExtArgs>>): Prisma__StaffRoleClient<$Result.GetResult<Prisma.$StaffRolePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    module<T extends PermissionModuleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PermissionModuleDefaultArgs<ExtArgs>>): Prisma__PermissionModuleClient<$Result.GetResult<Prisma.$PermissionModulePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the StaffRolePermission model
   */
  interface StaffRolePermissionFieldRefs {
    readonly staffRoleId: FieldRef<"StaffRolePermission", 'Int'>
    readonly moduleId: FieldRef<"StaffRolePermission", 'Int'>
    readonly create: FieldRef<"StaffRolePermission", 'Boolean'>
    readonly read: FieldRef<"StaffRolePermission", 'Boolean'>
    readonly update: FieldRef<"StaffRolePermission", 'Boolean'>
    readonly delete: FieldRef<"StaffRolePermission", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * StaffRolePermission findUnique
   */
  export type StaffRolePermissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffRolePermission
     */
    select?: StaffRolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffRolePermission
     */
    omit?: StaffRolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffRolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which StaffRolePermission to fetch.
     */
    where: StaffRolePermissionWhereUniqueInput
  }

  /**
   * StaffRolePermission findUniqueOrThrow
   */
  export type StaffRolePermissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffRolePermission
     */
    select?: StaffRolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffRolePermission
     */
    omit?: StaffRolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffRolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which StaffRolePermission to fetch.
     */
    where: StaffRolePermissionWhereUniqueInput
  }

  /**
   * StaffRolePermission findFirst
   */
  export type StaffRolePermissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffRolePermission
     */
    select?: StaffRolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffRolePermission
     */
    omit?: StaffRolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffRolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which StaffRolePermission to fetch.
     */
    where?: StaffRolePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffRolePermissions to fetch.
     */
    orderBy?: StaffRolePermissionOrderByWithRelationInput | StaffRolePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StaffRolePermissions.
     */
    cursor?: StaffRolePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffRolePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffRolePermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StaffRolePermissions.
     */
    distinct?: StaffRolePermissionScalarFieldEnum | StaffRolePermissionScalarFieldEnum[]
  }

  /**
   * StaffRolePermission findFirstOrThrow
   */
  export type StaffRolePermissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffRolePermission
     */
    select?: StaffRolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffRolePermission
     */
    omit?: StaffRolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffRolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which StaffRolePermission to fetch.
     */
    where?: StaffRolePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffRolePermissions to fetch.
     */
    orderBy?: StaffRolePermissionOrderByWithRelationInput | StaffRolePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for StaffRolePermissions.
     */
    cursor?: StaffRolePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffRolePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffRolePermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StaffRolePermissions.
     */
    distinct?: StaffRolePermissionScalarFieldEnum | StaffRolePermissionScalarFieldEnum[]
  }

  /**
   * StaffRolePermission findMany
   */
  export type StaffRolePermissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffRolePermission
     */
    select?: StaffRolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffRolePermission
     */
    omit?: StaffRolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffRolePermissionInclude<ExtArgs> | null
    /**
     * Filter, which StaffRolePermissions to fetch.
     */
    where?: StaffRolePermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of StaffRolePermissions to fetch.
     */
    orderBy?: StaffRolePermissionOrderByWithRelationInput | StaffRolePermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing StaffRolePermissions.
     */
    cursor?: StaffRolePermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` StaffRolePermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` StaffRolePermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of StaffRolePermissions.
     */
    distinct?: StaffRolePermissionScalarFieldEnum | StaffRolePermissionScalarFieldEnum[]
  }

  /**
   * StaffRolePermission create
   */
  export type StaffRolePermissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffRolePermission
     */
    select?: StaffRolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffRolePermission
     */
    omit?: StaffRolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffRolePermissionInclude<ExtArgs> | null
    /**
     * The data needed to create a StaffRolePermission.
     */
    data: XOR<StaffRolePermissionCreateInput, StaffRolePermissionUncheckedCreateInput>
  }

  /**
   * StaffRolePermission createMany
   */
  export type StaffRolePermissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many StaffRolePermissions.
     */
    data: StaffRolePermissionCreateManyInput | StaffRolePermissionCreateManyInput[]
  }

  /**
   * StaffRolePermission createManyAndReturn
   */
  export type StaffRolePermissionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffRolePermission
     */
    select?: StaffRolePermissionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StaffRolePermission
     */
    omit?: StaffRolePermissionOmit<ExtArgs> | null
    /**
     * The data used to create many StaffRolePermissions.
     */
    data: StaffRolePermissionCreateManyInput | StaffRolePermissionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffRolePermissionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * StaffRolePermission update
   */
  export type StaffRolePermissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffRolePermission
     */
    select?: StaffRolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffRolePermission
     */
    omit?: StaffRolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffRolePermissionInclude<ExtArgs> | null
    /**
     * The data needed to update a StaffRolePermission.
     */
    data: XOR<StaffRolePermissionUpdateInput, StaffRolePermissionUncheckedUpdateInput>
    /**
     * Choose, which StaffRolePermission to update.
     */
    where: StaffRolePermissionWhereUniqueInput
  }

  /**
   * StaffRolePermission updateMany
   */
  export type StaffRolePermissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update StaffRolePermissions.
     */
    data: XOR<StaffRolePermissionUpdateManyMutationInput, StaffRolePermissionUncheckedUpdateManyInput>
    /**
     * Filter which StaffRolePermissions to update
     */
    where?: StaffRolePermissionWhereInput
    /**
     * Limit how many StaffRolePermissions to update.
     */
    limit?: number
  }

  /**
   * StaffRolePermission updateManyAndReturn
   */
  export type StaffRolePermissionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffRolePermission
     */
    select?: StaffRolePermissionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the StaffRolePermission
     */
    omit?: StaffRolePermissionOmit<ExtArgs> | null
    /**
     * The data used to update StaffRolePermissions.
     */
    data: XOR<StaffRolePermissionUpdateManyMutationInput, StaffRolePermissionUncheckedUpdateManyInput>
    /**
     * Filter which StaffRolePermissions to update
     */
    where?: StaffRolePermissionWhereInput
    /**
     * Limit how many StaffRolePermissions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffRolePermissionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * StaffRolePermission upsert
   */
  export type StaffRolePermissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffRolePermission
     */
    select?: StaffRolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffRolePermission
     */
    omit?: StaffRolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffRolePermissionInclude<ExtArgs> | null
    /**
     * The filter to search for the StaffRolePermission to update in case it exists.
     */
    where: StaffRolePermissionWhereUniqueInput
    /**
     * In case the StaffRolePermission found by the `where` argument doesn't exist, create a new StaffRolePermission with this data.
     */
    create: XOR<StaffRolePermissionCreateInput, StaffRolePermissionUncheckedCreateInput>
    /**
     * In case the StaffRolePermission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StaffRolePermissionUpdateInput, StaffRolePermissionUncheckedUpdateInput>
  }

  /**
   * StaffRolePermission delete
   */
  export type StaffRolePermissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffRolePermission
     */
    select?: StaffRolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffRolePermission
     */
    omit?: StaffRolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffRolePermissionInclude<ExtArgs> | null
    /**
     * Filter which StaffRolePermission to delete.
     */
    where: StaffRolePermissionWhereUniqueInput
  }

  /**
   * StaffRolePermission deleteMany
   */
  export type StaffRolePermissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which StaffRolePermissions to delete
     */
    where?: StaffRolePermissionWhereInput
    /**
     * Limit how many StaffRolePermissions to delete.
     */
    limit?: number
  }

  /**
   * StaffRolePermission without action
   */
  export type StaffRolePermissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StaffRolePermission
     */
    select?: StaffRolePermissionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the StaffRolePermission
     */
    omit?: StaffRolePermissionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StaffRolePermissionInclude<ExtArgs> | null
  }


  /**
   * Model BeneficiaryRequest
   */

  export type AggregateBeneficiaryRequest = {
    _count: BeneficiaryRequestCountAggregateOutputType | null
    _avg: BeneficiaryRequestAvgAggregateOutputType | null
    _sum: BeneficiaryRequestSumAggregateOutputType | null
    _min: BeneficiaryRequestMinAggregateOutputType | null
    _max: BeneficiaryRequestMaxAggregateOutputType | null
  }

  export type BeneficiaryRequestAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type BeneficiaryRequestSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type BeneficiaryRequestMinAggregateOutputType = {
    id: number | null
    requestNo: string | null
    userId: number | null
    status: $Enums.BeneficiaryRequestStatus | null
    type: string | null
    companyNameKh: string | null
    companyNameEn: string | null
    registrationNo: string | null
    registrationDate: Date | null
    companyProvince: string | null
    companyDistrict: string | null
    companyCommune: string | null
    companyVillage: string | null
    companyStreet: string | null
    companyHouse: string | null
    companyPhone: string | null
    companyOfficePhone: string | null
    companyEmail: string | null
    shLastNameKh: string | null
    shFirstNameKh: string | null
    shLastNameEn: string | null
    shFirstNameEn: string | null
    shDob: Date | null
    shNationality: string | null
    shGender: $Enums.Gender | null
    shIdCard: string | null
    shIdIssuedDate: Date | null
    shIdExpiredDate: Date | null
    shEmail: string | null
    shPhone: string | null
    shPhotoName: string | null
    shIdDocNames: string | null
    ownerLastNameKh: string | null
    ownerFirstNameKh: string | null
    ownerLastNameEn: string | null
    ownerFirstNameEn: string | null
    ownerDob: Date | null
    ownerNationality: string | null
    ownerGender: $Enums.Gender | null
    ownerIdCard: string | null
    ownerIdIssuedDate: Date | null
    ownerIdExpiredDate: Date | null
    ownerEmail: string | null
    ownerPhone: string | null
    ownerPhotoName: string | null
    ownerIdDocNames: string | null
    shareAmount: string | null
    shareholderContractDocNames: string | null
    otherDocNames: string | null
    consentAgreed: boolean | null
    rejectionReason: string | null
    submittedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BeneficiaryRequestMaxAggregateOutputType = {
    id: number | null
    requestNo: string | null
    userId: number | null
    status: $Enums.BeneficiaryRequestStatus | null
    type: string | null
    companyNameKh: string | null
    companyNameEn: string | null
    registrationNo: string | null
    registrationDate: Date | null
    companyProvince: string | null
    companyDistrict: string | null
    companyCommune: string | null
    companyVillage: string | null
    companyStreet: string | null
    companyHouse: string | null
    companyPhone: string | null
    companyOfficePhone: string | null
    companyEmail: string | null
    shLastNameKh: string | null
    shFirstNameKh: string | null
    shLastNameEn: string | null
    shFirstNameEn: string | null
    shDob: Date | null
    shNationality: string | null
    shGender: $Enums.Gender | null
    shIdCard: string | null
    shIdIssuedDate: Date | null
    shIdExpiredDate: Date | null
    shEmail: string | null
    shPhone: string | null
    shPhotoName: string | null
    shIdDocNames: string | null
    ownerLastNameKh: string | null
    ownerFirstNameKh: string | null
    ownerLastNameEn: string | null
    ownerFirstNameEn: string | null
    ownerDob: Date | null
    ownerNationality: string | null
    ownerGender: $Enums.Gender | null
    ownerIdCard: string | null
    ownerIdIssuedDate: Date | null
    ownerIdExpiredDate: Date | null
    ownerEmail: string | null
    ownerPhone: string | null
    ownerPhotoName: string | null
    ownerIdDocNames: string | null
    shareAmount: string | null
    shareholderContractDocNames: string | null
    otherDocNames: string | null
    consentAgreed: boolean | null
    rejectionReason: string | null
    submittedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BeneficiaryRequestCountAggregateOutputType = {
    id: number
    requestNo: number
    userId: number
    status: number
    type: number
    companyNameKh: number
    companyNameEn: number
    registrationNo: number
    registrationDate: number
    companyProvince: number
    companyDistrict: number
    companyCommune: number
    companyVillage: number
    companyStreet: number
    companyHouse: number
    companyPhone: number
    companyOfficePhone: number
    companyEmail: number
    shLastNameKh: number
    shFirstNameKh: number
    shLastNameEn: number
    shFirstNameEn: number
    shDob: number
    shNationality: number
    shGender: number
    shIdCard: number
    shIdIssuedDate: number
    shIdExpiredDate: number
    shEmail: number
    shPhone: number
    shPhotoName: number
    shIdDocNames: number
    ownerLastNameKh: number
    ownerFirstNameKh: number
    ownerLastNameEn: number
    ownerFirstNameEn: number
    ownerDob: number
    ownerNationality: number
    ownerGender: number
    ownerIdCard: number
    ownerIdIssuedDate: number
    ownerIdExpiredDate: number
    ownerEmail: number
    ownerPhone: number
    ownerPhotoName: number
    ownerIdDocNames: number
    shareAmount: number
    shareholderContractDocNames: number
    otherDocNames: number
    consentAgreed: number
    rejectionReason: number
    submittedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BeneficiaryRequestAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type BeneficiaryRequestSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type BeneficiaryRequestMinAggregateInputType = {
    id?: true
    requestNo?: true
    userId?: true
    status?: true
    type?: true
    companyNameKh?: true
    companyNameEn?: true
    registrationNo?: true
    registrationDate?: true
    companyProvince?: true
    companyDistrict?: true
    companyCommune?: true
    companyVillage?: true
    companyStreet?: true
    companyHouse?: true
    companyPhone?: true
    companyOfficePhone?: true
    companyEmail?: true
    shLastNameKh?: true
    shFirstNameKh?: true
    shLastNameEn?: true
    shFirstNameEn?: true
    shDob?: true
    shNationality?: true
    shGender?: true
    shIdCard?: true
    shIdIssuedDate?: true
    shIdExpiredDate?: true
    shEmail?: true
    shPhone?: true
    shPhotoName?: true
    shIdDocNames?: true
    ownerLastNameKh?: true
    ownerFirstNameKh?: true
    ownerLastNameEn?: true
    ownerFirstNameEn?: true
    ownerDob?: true
    ownerNationality?: true
    ownerGender?: true
    ownerIdCard?: true
    ownerIdIssuedDate?: true
    ownerIdExpiredDate?: true
    ownerEmail?: true
    ownerPhone?: true
    ownerPhotoName?: true
    ownerIdDocNames?: true
    shareAmount?: true
    shareholderContractDocNames?: true
    otherDocNames?: true
    consentAgreed?: true
    rejectionReason?: true
    submittedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BeneficiaryRequestMaxAggregateInputType = {
    id?: true
    requestNo?: true
    userId?: true
    status?: true
    type?: true
    companyNameKh?: true
    companyNameEn?: true
    registrationNo?: true
    registrationDate?: true
    companyProvince?: true
    companyDistrict?: true
    companyCommune?: true
    companyVillage?: true
    companyStreet?: true
    companyHouse?: true
    companyPhone?: true
    companyOfficePhone?: true
    companyEmail?: true
    shLastNameKh?: true
    shFirstNameKh?: true
    shLastNameEn?: true
    shFirstNameEn?: true
    shDob?: true
    shNationality?: true
    shGender?: true
    shIdCard?: true
    shIdIssuedDate?: true
    shIdExpiredDate?: true
    shEmail?: true
    shPhone?: true
    shPhotoName?: true
    shIdDocNames?: true
    ownerLastNameKh?: true
    ownerFirstNameKh?: true
    ownerLastNameEn?: true
    ownerFirstNameEn?: true
    ownerDob?: true
    ownerNationality?: true
    ownerGender?: true
    ownerIdCard?: true
    ownerIdIssuedDate?: true
    ownerIdExpiredDate?: true
    ownerEmail?: true
    ownerPhone?: true
    ownerPhotoName?: true
    ownerIdDocNames?: true
    shareAmount?: true
    shareholderContractDocNames?: true
    otherDocNames?: true
    consentAgreed?: true
    rejectionReason?: true
    submittedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BeneficiaryRequestCountAggregateInputType = {
    id?: true
    requestNo?: true
    userId?: true
    status?: true
    type?: true
    companyNameKh?: true
    companyNameEn?: true
    registrationNo?: true
    registrationDate?: true
    companyProvince?: true
    companyDistrict?: true
    companyCommune?: true
    companyVillage?: true
    companyStreet?: true
    companyHouse?: true
    companyPhone?: true
    companyOfficePhone?: true
    companyEmail?: true
    shLastNameKh?: true
    shFirstNameKh?: true
    shLastNameEn?: true
    shFirstNameEn?: true
    shDob?: true
    shNationality?: true
    shGender?: true
    shIdCard?: true
    shIdIssuedDate?: true
    shIdExpiredDate?: true
    shEmail?: true
    shPhone?: true
    shPhotoName?: true
    shIdDocNames?: true
    ownerLastNameKh?: true
    ownerFirstNameKh?: true
    ownerLastNameEn?: true
    ownerFirstNameEn?: true
    ownerDob?: true
    ownerNationality?: true
    ownerGender?: true
    ownerIdCard?: true
    ownerIdIssuedDate?: true
    ownerIdExpiredDate?: true
    ownerEmail?: true
    ownerPhone?: true
    ownerPhotoName?: true
    ownerIdDocNames?: true
    shareAmount?: true
    shareholderContractDocNames?: true
    otherDocNames?: true
    consentAgreed?: true
    rejectionReason?: true
    submittedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BeneficiaryRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BeneficiaryRequest to aggregate.
     */
    where?: BeneficiaryRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BeneficiaryRequests to fetch.
     */
    orderBy?: BeneficiaryRequestOrderByWithRelationInput | BeneficiaryRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BeneficiaryRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BeneficiaryRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BeneficiaryRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BeneficiaryRequests
    **/
    _count?: true | BeneficiaryRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BeneficiaryRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BeneficiaryRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BeneficiaryRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BeneficiaryRequestMaxAggregateInputType
  }

  export type GetBeneficiaryRequestAggregateType<T extends BeneficiaryRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateBeneficiaryRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBeneficiaryRequest[P]>
      : GetScalarType<T[P], AggregateBeneficiaryRequest[P]>
  }




  export type BeneficiaryRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BeneficiaryRequestWhereInput
    orderBy?: BeneficiaryRequestOrderByWithAggregationInput | BeneficiaryRequestOrderByWithAggregationInput[]
    by: BeneficiaryRequestScalarFieldEnum[] | BeneficiaryRequestScalarFieldEnum
    having?: BeneficiaryRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BeneficiaryRequestCountAggregateInputType | true
    _avg?: BeneficiaryRequestAvgAggregateInputType
    _sum?: BeneficiaryRequestSumAggregateInputType
    _min?: BeneficiaryRequestMinAggregateInputType
    _max?: BeneficiaryRequestMaxAggregateInputType
  }

  export type BeneficiaryRequestGroupByOutputType = {
    id: number
    requestNo: string
    userId: number
    status: $Enums.BeneficiaryRequestStatus
    type: string
    companyNameKh: string | null
    companyNameEn: string
    registrationNo: string
    registrationDate: Date
    companyProvince: string
    companyDistrict: string
    companyCommune: string
    companyVillage: string
    companyStreet: string
    companyHouse: string
    companyPhone: string
    companyOfficePhone: string | null
    companyEmail: string
    shLastNameKh: string | null
    shFirstNameKh: string | null
    shLastNameEn: string
    shFirstNameEn: string
    shDob: Date
    shNationality: string
    shGender: $Enums.Gender
    shIdCard: string | null
    shIdIssuedDate: Date | null
    shIdExpiredDate: Date | null
    shEmail: string | null
    shPhone: string | null
    shPhotoName: string | null
    shIdDocNames: string
    ownerLastNameKh: string | null
    ownerFirstNameKh: string | null
    ownerLastNameEn: string
    ownerFirstNameEn: string
    ownerDob: Date
    ownerNationality: string
    ownerGender: $Enums.Gender
    ownerIdCard: string | null
    ownerIdIssuedDate: Date | null
    ownerIdExpiredDate: Date | null
    ownerEmail: string | null
    ownerPhone: string | null
    ownerPhotoName: string | null
    ownerIdDocNames: string
    shareAmount: string
    shareholderContractDocNames: string
    otherDocNames: string
    consentAgreed: boolean
    rejectionReason: string | null
    submittedAt: Date
    createdAt: Date
    updatedAt: Date
    _count: BeneficiaryRequestCountAggregateOutputType | null
    _avg: BeneficiaryRequestAvgAggregateOutputType | null
    _sum: BeneficiaryRequestSumAggregateOutputType | null
    _min: BeneficiaryRequestMinAggregateOutputType | null
    _max: BeneficiaryRequestMaxAggregateOutputType | null
  }

  type GetBeneficiaryRequestGroupByPayload<T extends BeneficiaryRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BeneficiaryRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BeneficiaryRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BeneficiaryRequestGroupByOutputType[P]>
            : GetScalarType<T[P], BeneficiaryRequestGroupByOutputType[P]>
        }
      >
    >


  export type BeneficiaryRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requestNo?: boolean
    userId?: boolean
    status?: boolean
    type?: boolean
    companyNameKh?: boolean
    companyNameEn?: boolean
    registrationNo?: boolean
    registrationDate?: boolean
    companyProvince?: boolean
    companyDistrict?: boolean
    companyCommune?: boolean
    companyVillage?: boolean
    companyStreet?: boolean
    companyHouse?: boolean
    companyPhone?: boolean
    companyOfficePhone?: boolean
    companyEmail?: boolean
    shLastNameKh?: boolean
    shFirstNameKh?: boolean
    shLastNameEn?: boolean
    shFirstNameEn?: boolean
    shDob?: boolean
    shNationality?: boolean
    shGender?: boolean
    shIdCard?: boolean
    shIdIssuedDate?: boolean
    shIdExpiredDate?: boolean
    shEmail?: boolean
    shPhone?: boolean
    shPhotoName?: boolean
    shIdDocNames?: boolean
    ownerLastNameKh?: boolean
    ownerFirstNameKh?: boolean
    ownerLastNameEn?: boolean
    ownerFirstNameEn?: boolean
    ownerDob?: boolean
    ownerNationality?: boolean
    ownerGender?: boolean
    ownerIdCard?: boolean
    ownerIdIssuedDate?: boolean
    ownerIdExpiredDate?: boolean
    ownerEmail?: boolean
    ownerPhone?: boolean
    ownerPhotoName?: boolean
    ownerIdDocNames?: boolean
    shareAmount?: boolean
    shareholderContractDocNames?: boolean
    otherDocNames?: boolean
    consentAgreed?: boolean
    rejectionReason?: boolean
    submittedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    logs?: boolean | BeneficiaryRequest$logsArgs<ExtArgs>
    revisions?: boolean | BeneficiaryRequest$revisionsArgs<ExtArgs>
    _count?: boolean | BeneficiaryRequestCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["beneficiaryRequest"]>

  export type BeneficiaryRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requestNo?: boolean
    userId?: boolean
    status?: boolean
    type?: boolean
    companyNameKh?: boolean
    companyNameEn?: boolean
    registrationNo?: boolean
    registrationDate?: boolean
    companyProvince?: boolean
    companyDistrict?: boolean
    companyCommune?: boolean
    companyVillage?: boolean
    companyStreet?: boolean
    companyHouse?: boolean
    companyPhone?: boolean
    companyOfficePhone?: boolean
    companyEmail?: boolean
    shLastNameKh?: boolean
    shFirstNameKh?: boolean
    shLastNameEn?: boolean
    shFirstNameEn?: boolean
    shDob?: boolean
    shNationality?: boolean
    shGender?: boolean
    shIdCard?: boolean
    shIdIssuedDate?: boolean
    shIdExpiredDate?: boolean
    shEmail?: boolean
    shPhone?: boolean
    shPhotoName?: boolean
    shIdDocNames?: boolean
    ownerLastNameKh?: boolean
    ownerFirstNameKh?: boolean
    ownerLastNameEn?: boolean
    ownerFirstNameEn?: boolean
    ownerDob?: boolean
    ownerNationality?: boolean
    ownerGender?: boolean
    ownerIdCard?: boolean
    ownerIdIssuedDate?: boolean
    ownerIdExpiredDate?: boolean
    ownerEmail?: boolean
    ownerPhone?: boolean
    ownerPhotoName?: boolean
    ownerIdDocNames?: boolean
    shareAmount?: boolean
    shareholderContractDocNames?: boolean
    otherDocNames?: boolean
    consentAgreed?: boolean
    rejectionReason?: boolean
    submittedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["beneficiaryRequest"]>

  export type BeneficiaryRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requestNo?: boolean
    userId?: boolean
    status?: boolean
    type?: boolean
    companyNameKh?: boolean
    companyNameEn?: boolean
    registrationNo?: boolean
    registrationDate?: boolean
    companyProvince?: boolean
    companyDistrict?: boolean
    companyCommune?: boolean
    companyVillage?: boolean
    companyStreet?: boolean
    companyHouse?: boolean
    companyPhone?: boolean
    companyOfficePhone?: boolean
    companyEmail?: boolean
    shLastNameKh?: boolean
    shFirstNameKh?: boolean
    shLastNameEn?: boolean
    shFirstNameEn?: boolean
    shDob?: boolean
    shNationality?: boolean
    shGender?: boolean
    shIdCard?: boolean
    shIdIssuedDate?: boolean
    shIdExpiredDate?: boolean
    shEmail?: boolean
    shPhone?: boolean
    shPhotoName?: boolean
    shIdDocNames?: boolean
    ownerLastNameKh?: boolean
    ownerFirstNameKh?: boolean
    ownerLastNameEn?: boolean
    ownerFirstNameEn?: boolean
    ownerDob?: boolean
    ownerNationality?: boolean
    ownerGender?: boolean
    ownerIdCard?: boolean
    ownerIdIssuedDate?: boolean
    ownerIdExpiredDate?: boolean
    ownerEmail?: boolean
    ownerPhone?: boolean
    ownerPhotoName?: boolean
    ownerIdDocNames?: boolean
    shareAmount?: boolean
    shareholderContractDocNames?: boolean
    otherDocNames?: boolean
    consentAgreed?: boolean
    rejectionReason?: boolean
    submittedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["beneficiaryRequest"]>

  export type BeneficiaryRequestSelectScalar = {
    id?: boolean
    requestNo?: boolean
    userId?: boolean
    status?: boolean
    type?: boolean
    companyNameKh?: boolean
    companyNameEn?: boolean
    registrationNo?: boolean
    registrationDate?: boolean
    companyProvince?: boolean
    companyDistrict?: boolean
    companyCommune?: boolean
    companyVillage?: boolean
    companyStreet?: boolean
    companyHouse?: boolean
    companyPhone?: boolean
    companyOfficePhone?: boolean
    companyEmail?: boolean
    shLastNameKh?: boolean
    shFirstNameKh?: boolean
    shLastNameEn?: boolean
    shFirstNameEn?: boolean
    shDob?: boolean
    shNationality?: boolean
    shGender?: boolean
    shIdCard?: boolean
    shIdIssuedDate?: boolean
    shIdExpiredDate?: boolean
    shEmail?: boolean
    shPhone?: boolean
    shPhotoName?: boolean
    shIdDocNames?: boolean
    ownerLastNameKh?: boolean
    ownerFirstNameKh?: boolean
    ownerLastNameEn?: boolean
    ownerFirstNameEn?: boolean
    ownerDob?: boolean
    ownerNationality?: boolean
    ownerGender?: boolean
    ownerIdCard?: boolean
    ownerIdIssuedDate?: boolean
    ownerIdExpiredDate?: boolean
    ownerEmail?: boolean
    ownerPhone?: boolean
    ownerPhotoName?: boolean
    ownerIdDocNames?: boolean
    shareAmount?: boolean
    shareholderContractDocNames?: boolean
    otherDocNames?: boolean
    consentAgreed?: boolean
    rejectionReason?: boolean
    submittedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BeneficiaryRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "requestNo" | "userId" | "status" | "type" | "companyNameKh" | "companyNameEn" | "registrationNo" | "registrationDate" | "companyProvince" | "companyDistrict" | "companyCommune" | "companyVillage" | "companyStreet" | "companyHouse" | "companyPhone" | "companyOfficePhone" | "companyEmail" | "shLastNameKh" | "shFirstNameKh" | "shLastNameEn" | "shFirstNameEn" | "shDob" | "shNationality" | "shGender" | "shIdCard" | "shIdIssuedDate" | "shIdExpiredDate" | "shEmail" | "shPhone" | "shPhotoName" | "shIdDocNames" | "ownerLastNameKh" | "ownerFirstNameKh" | "ownerLastNameEn" | "ownerFirstNameEn" | "ownerDob" | "ownerNationality" | "ownerGender" | "ownerIdCard" | "ownerIdIssuedDate" | "ownerIdExpiredDate" | "ownerEmail" | "ownerPhone" | "ownerPhotoName" | "ownerIdDocNames" | "shareAmount" | "shareholderContractDocNames" | "otherDocNames" | "consentAgreed" | "rejectionReason" | "submittedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["beneficiaryRequest"]>
  export type BeneficiaryRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    logs?: boolean | BeneficiaryRequest$logsArgs<ExtArgs>
    revisions?: boolean | BeneficiaryRequest$revisionsArgs<ExtArgs>
    _count?: boolean | BeneficiaryRequestCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BeneficiaryRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type BeneficiaryRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $BeneficiaryRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BeneficiaryRequest"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      logs: Prisma.$RequestLogPayload<ExtArgs>[]
      revisions: Prisma.$RequestRevisionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      requestNo: string
      userId: number
      status: $Enums.BeneficiaryRequestStatus
      type: string
      companyNameKh: string | null
      companyNameEn: string
      registrationNo: string
      registrationDate: Date
      companyProvince: string
      companyDistrict: string
      companyCommune: string
      companyVillage: string
      companyStreet: string
      companyHouse: string
      companyPhone: string
      companyOfficePhone: string | null
      companyEmail: string
      shLastNameKh: string | null
      shFirstNameKh: string | null
      shLastNameEn: string
      shFirstNameEn: string
      shDob: Date
      shNationality: string
      shGender: $Enums.Gender
      shIdCard: string | null
      shIdIssuedDate: Date | null
      shIdExpiredDate: Date | null
      shEmail: string | null
      shPhone: string | null
      shPhotoName: string | null
      shIdDocNames: string
      ownerLastNameKh: string | null
      ownerFirstNameKh: string | null
      ownerLastNameEn: string
      ownerFirstNameEn: string
      ownerDob: Date
      ownerNationality: string
      ownerGender: $Enums.Gender
      ownerIdCard: string | null
      ownerIdIssuedDate: Date | null
      ownerIdExpiredDate: Date | null
      ownerEmail: string | null
      ownerPhone: string | null
      ownerPhotoName: string | null
      ownerIdDocNames: string
      shareAmount: string
      shareholderContractDocNames: string
      otherDocNames: string
      consentAgreed: boolean
      rejectionReason: string | null
      submittedAt: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["beneficiaryRequest"]>
    composites: {}
  }

  type BeneficiaryRequestGetPayload<S extends boolean | null | undefined | BeneficiaryRequestDefaultArgs> = $Result.GetResult<Prisma.$BeneficiaryRequestPayload, S>

  type BeneficiaryRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BeneficiaryRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BeneficiaryRequestCountAggregateInputType | true
    }

  export interface BeneficiaryRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BeneficiaryRequest'], meta: { name: 'BeneficiaryRequest' } }
    /**
     * Find zero or one BeneficiaryRequest that matches the filter.
     * @param {BeneficiaryRequestFindUniqueArgs} args - Arguments to find a BeneficiaryRequest
     * @example
     * // Get one BeneficiaryRequest
     * const beneficiaryRequest = await prisma.beneficiaryRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BeneficiaryRequestFindUniqueArgs>(args: SelectSubset<T, BeneficiaryRequestFindUniqueArgs<ExtArgs>>): Prisma__BeneficiaryRequestClient<$Result.GetResult<Prisma.$BeneficiaryRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BeneficiaryRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BeneficiaryRequestFindUniqueOrThrowArgs} args - Arguments to find a BeneficiaryRequest
     * @example
     * // Get one BeneficiaryRequest
     * const beneficiaryRequest = await prisma.beneficiaryRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BeneficiaryRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, BeneficiaryRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BeneficiaryRequestClient<$Result.GetResult<Prisma.$BeneficiaryRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BeneficiaryRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeneficiaryRequestFindFirstArgs} args - Arguments to find a BeneficiaryRequest
     * @example
     * // Get one BeneficiaryRequest
     * const beneficiaryRequest = await prisma.beneficiaryRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BeneficiaryRequestFindFirstArgs>(args?: SelectSubset<T, BeneficiaryRequestFindFirstArgs<ExtArgs>>): Prisma__BeneficiaryRequestClient<$Result.GetResult<Prisma.$BeneficiaryRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BeneficiaryRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeneficiaryRequestFindFirstOrThrowArgs} args - Arguments to find a BeneficiaryRequest
     * @example
     * // Get one BeneficiaryRequest
     * const beneficiaryRequest = await prisma.beneficiaryRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BeneficiaryRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, BeneficiaryRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__BeneficiaryRequestClient<$Result.GetResult<Prisma.$BeneficiaryRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BeneficiaryRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeneficiaryRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BeneficiaryRequests
     * const beneficiaryRequests = await prisma.beneficiaryRequest.findMany()
     * 
     * // Get first 10 BeneficiaryRequests
     * const beneficiaryRequests = await prisma.beneficiaryRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const beneficiaryRequestWithIdOnly = await prisma.beneficiaryRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BeneficiaryRequestFindManyArgs>(args?: SelectSubset<T, BeneficiaryRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BeneficiaryRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BeneficiaryRequest.
     * @param {BeneficiaryRequestCreateArgs} args - Arguments to create a BeneficiaryRequest.
     * @example
     * // Create one BeneficiaryRequest
     * const BeneficiaryRequest = await prisma.beneficiaryRequest.create({
     *   data: {
     *     // ... data to create a BeneficiaryRequest
     *   }
     * })
     * 
     */
    create<T extends BeneficiaryRequestCreateArgs>(args: SelectSubset<T, BeneficiaryRequestCreateArgs<ExtArgs>>): Prisma__BeneficiaryRequestClient<$Result.GetResult<Prisma.$BeneficiaryRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BeneficiaryRequests.
     * @param {BeneficiaryRequestCreateManyArgs} args - Arguments to create many BeneficiaryRequests.
     * @example
     * // Create many BeneficiaryRequests
     * const beneficiaryRequest = await prisma.beneficiaryRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BeneficiaryRequestCreateManyArgs>(args?: SelectSubset<T, BeneficiaryRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BeneficiaryRequests and returns the data saved in the database.
     * @param {BeneficiaryRequestCreateManyAndReturnArgs} args - Arguments to create many BeneficiaryRequests.
     * @example
     * // Create many BeneficiaryRequests
     * const beneficiaryRequest = await prisma.beneficiaryRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BeneficiaryRequests and only return the `id`
     * const beneficiaryRequestWithIdOnly = await prisma.beneficiaryRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BeneficiaryRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, BeneficiaryRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BeneficiaryRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BeneficiaryRequest.
     * @param {BeneficiaryRequestDeleteArgs} args - Arguments to delete one BeneficiaryRequest.
     * @example
     * // Delete one BeneficiaryRequest
     * const BeneficiaryRequest = await prisma.beneficiaryRequest.delete({
     *   where: {
     *     // ... filter to delete one BeneficiaryRequest
     *   }
     * })
     * 
     */
    delete<T extends BeneficiaryRequestDeleteArgs>(args: SelectSubset<T, BeneficiaryRequestDeleteArgs<ExtArgs>>): Prisma__BeneficiaryRequestClient<$Result.GetResult<Prisma.$BeneficiaryRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BeneficiaryRequest.
     * @param {BeneficiaryRequestUpdateArgs} args - Arguments to update one BeneficiaryRequest.
     * @example
     * // Update one BeneficiaryRequest
     * const beneficiaryRequest = await prisma.beneficiaryRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BeneficiaryRequestUpdateArgs>(args: SelectSubset<T, BeneficiaryRequestUpdateArgs<ExtArgs>>): Prisma__BeneficiaryRequestClient<$Result.GetResult<Prisma.$BeneficiaryRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BeneficiaryRequests.
     * @param {BeneficiaryRequestDeleteManyArgs} args - Arguments to filter BeneficiaryRequests to delete.
     * @example
     * // Delete a few BeneficiaryRequests
     * const { count } = await prisma.beneficiaryRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BeneficiaryRequestDeleteManyArgs>(args?: SelectSubset<T, BeneficiaryRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BeneficiaryRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeneficiaryRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BeneficiaryRequests
     * const beneficiaryRequest = await prisma.beneficiaryRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BeneficiaryRequestUpdateManyArgs>(args: SelectSubset<T, BeneficiaryRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BeneficiaryRequests and returns the data updated in the database.
     * @param {BeneficiaryRequestUpdateManyAndReturnArgs} args - Arguments to update many BeneficiaryRequests.
     * @example
     * // Update many BeneficiaryRequests
     * const beneficiaryRequest = await prisma.beneficiaryRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BeneficiaryRequests and only return the `id`
     * const beneficiaryRequestWithIdOnly = await prisma.beneficiaryRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends BeneficiaryRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, BeneficiaryRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BeneficiaryRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BeneficiaryRequest.
     * @param {BeneficiaryRequestUpsertArgs} args - Arguments to update or create a BeneficiaryRequest.
     * @example
     * // Update or create a BeneficiaryRequest
     * const beneficiaryRequest = await prisma.beneficiaryRequest.upsert({
     *   create: {
     *     // ... data to create a BeneficiaryRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BeneficiaryRequest we want to update
     *   }
     * })
     */
    upsert<T extends BeneficiaryRequestUpsertArgs>(args: SelectSubset<T, BeneficiaryRequestUpsertArgs<ExtArgs>>): Prisma__BeneficiaryRequestClient<$Result.GetResult<Prisma.$BeneficiaryRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BeneficiaryRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeneficiaryRequestCountArgs} args - Arguments to filter BeneficiaryRequests to count.
     * @example
     * // Count the number of BeneficiaryRequests
     * const count = await prisma.beneficiaryRequest.count({
     *   where: {
     *     // ... the filter for the BeneficiaryRequests we want to count
     *   }
     * })
    **/
    count<T extends BeneficiaryRequestCountArgs>(
      args?: Subset<T, BeneficiaryRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BeneficiaryRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BeneficiaryRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeneficiaryRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BeneficiaryRequestAggregateArgs>(args: Subset<T, BeneficiaryRequestAggregateArgs>): Prisma.PrismaPromise<GetBeneficiaryRequestAggregateType<T>>

    /**
     * Group by BeneficiaryRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BeneficiaryRequestGroupByArgs} args - Group by arguments.
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
      T extends BeneficiaryRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BeneficiaryRequestGroupByArgs['orderBy'] }
        : { orderBy?: BeneficiaryRequestGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BeneficiaryRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBeneficiaryRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BeneficiaryRequest model
   */
  readonly fields: BeneficiaryRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BeneficiaryRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BeneficiaryRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    logs<T extends BeneficiaryRequest$logsArgs<ExtArgs> = {}>(args?: Subset<T, BeneficiaryRequest$logsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    revisions<T extends BeneficiaryRequest$revisionsArgs<ExtArgs> = {}>(args?: Subset<T, BeneficiaryRequest$revisionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestRevisionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the BeneficiaryRequest model
   */
  interface BeneficiaryRequestFieldRefs {
    readonly id: FieldRef<"BeneficiaryRequest", 'Int'>
    readonly requestNo: FieldRef<"BeneficiaryRequest", 'String'>
    readonly userId: FieldRef<"BeneficiaryRequest", 'Int'>
    readonly status: FieldRef<"BeneficiaryRequest", 'BeneficiaryRequestStatus'>
    readonly type: FieldRef<"BeneficiaryRequest", 'String'>
    readonly companyNameKh: FieldRef<"BeneficiaryRequest", 'String'>
    readonly companyNameEn: FieldRef<"BeneficiaryRequest", 'String'>
    readonly registrationNo: FieldRef<"BeneficiaryRequest", 'String'>
    readonly registrationDate: FieldRef<"BeneficiaryRequest", 'DateTime'>
    readonly companyProvince: FieldRef<"BeneficiaryRequest", 'String'>
    readonly companyDistrict: FieldRef<"BeneficiaryRequest", 'String'>
    readonly companyCommune: FieldRef<"BeneficiaryRequest", 'String'>
    readonly companyVillage: FieldRef<"BeneficiaryRequest", 'String'>
    readonly companyStreet: FieldRef<"BeneficiaryRequest", 'String'>
    readonly companyHouse: FieldRef<"BeneficiaryRequest", 'String'>
    readonly companyPhone: FieldRef<"BeneficiaryRequest", 'String'>
    readonly companyOfficePhone: FieldRef<"BeneficiaryRequest", 'String'>
    readonly companyEmail: FieldRef<"BeneficiaryRequest", 'String'>
    readonly shLastNameKh: FieldRef<"BeneficiaryRequest", 'String'>
    readonly shFirstNameKh: FieldRef<"BeneficiaryRequest", 'String'>
    readonly shLastNameEn: FieldRef<"BeneficiaryRequest", 'String'>
    readonly shFirstNameEn: FieldRef<"BeneficiaryRequest", 'String'>
    readonly shDob: FieldRef<"BeneficiaryRequest", 'DateTime'>
    readonly shNationality: FieldRef<"BeneficiaryRequest", 'String'>
    readonly shGender: FieldRef<"BeneficiaryRequest", 'Gender'>
    readonly shIdCard: FieldRef<"BeneficiaryRequest", 'String'>
    readonly shIdIssuedDate: FieldRef<"BeneficiaryRequest", 'DateTime'>
    readonly shIdExpiredDate: FieldRef<"BeneficiaryRequest", 'DateTime'>
    readonly shEmail: FieldRef<"BeneficiaryRequest", 'String'>
    readonly shPhone: FieldRef<"BeneficiaryRequest", 'String'>
    readonly shPhotoName: FieldRef<"BeneficiaryRequest", 'String'>
    readonly shIdDocNames: FieldRef<"BeneficiaryRequest", 'String'>
    readonly ownerLastNameKh: FieldRef<"BeneficiaryRequest", 'String'>
    readonly ownerFirstNameKh: FieldRef<"BeneficiaryRequest", 'String'>
    readonly ownerLastNameEn: FieldRef<"BeneficiaryRequest", 'String'>
    readonly ownerFirstNameEn: FieldRef<"BeneficiaryRequest", 'String'>
    readonly ownerDob: FieldRef<"BeneficiaryRequest", 'DateTime'>
    readonly ownerNationality: FieldRef<"BeneficiaryRequest", 'String'>
    readonly ownerGender: FieldRef<"BeneficiaryRequest", 'Gender'>
    readonly ownerIdCard: FieldRef<"BeneficiaryRequest", 'String'>
    readonly ownerIdIssuedDate: FieldRef<"BeneficiaryRequest", 'DateTime'>
    readonly ownerIdExpiredDate: FieldRef<"BeneficiaryRequest", 'DateTime'>
    readonly ownerEmail: FieldRef<"BeneficiaryRequest", 'String'>
    readonly ownerPhone: FieldRef<"BeneficiaryRequest", 'String'>
    readonly ownerPhotoName: FieldRef<"BeneficiaryRequest", 'String'>
    readonly ownerIdDocNames: FieldRef<"BeneficiaryRequest", 'String'>
    readonly shareAmount: FieldRef<"BeneficiaryRequest", 'String'>
    readonly shareholderContractDocNames: FieldRef<"BeneficiaryRequest", 'String'>
    readonly otherDocNames: FieldRef<"BeneficiaryRequest", 'String'>
    readonly consentAgreed: FieldRef<"BeneficiaryRequest", 'Boolean'>
    readonly rejectionReason: FieldRef<"BeneficiaryRequest", 'String'>
    readonly submittedAt: FieldRef<"BeneficiaryRequest", 'DateTime'>
    readonly createdAt: FieldRef<"BeneficiaryRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"BeneficiaryRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BeneficiaryRequest findUnique
   */
  export type BeneficiaryRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BeneficiaryRequest
     */
    select?: BeneficiaryRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BeneficiaryRequest
     */
    omit?: BeneficiaryRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeneficiaryRequestInclude<ExtArgs> | null
    /**
     * Filter, which BeneficiaryRequest to fetch.
     */
    where: BeneficiaryRequestWhereUniqueInput
  }

  /**
   * BeneficiaryRequest findUniqueOrThrow
   */
  export type BeneficiaryRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BeneficiaryRequest
     */
    select?: BeneficiaryRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BeneficiaryRequest
     */
    omit?: BeneficiaryRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeneficiaryRequestInclude<ExtArgs> | null
    /**
     * Filter, which BeneficiaryRequest to fetch.
     */
    where: BeneficiaryRequestWhereUniqueInput
  }

  /**
   * BeneficiaryRequest findFirst
   */
  export type BeneficiaryRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BeneficiaryRequest
     */
    select?: BeneficiaryRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BeneficiaryRequest
     */
    omit?: BeneficiaryRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeneficiaryRequestInclude<ExtArgs> | null
    /**
     * Filter, which BeneficiaryRequest to fetch.
     */
    where?: BeneficiaryRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BeneficiaryRequests to fetch.
     */
    orderBy?: BeneficiaryRequestOrderByWithRelationInput | BeneficiaryRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BeneficiaryRequests.
     */
    cursor?: BeneficiaryRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BeneficiaryRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BeneficiaryRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BeneficiaryRequests.
     */
    distinct?: BeneficiaryRequestScalarFieldEnum | BeneficiaryRequestScalarFieldEnum[]
  }

  /**
   * BeneficiaryRequest findFirstOrThrow
   */
  export type BeneficiaryRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BeneficiaryRequest
     */
    select?: BeneficiaryRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BeneficiaryRequest
     */
    omit?: BeneficiaryRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeneficiaryRequestInclude<ExtArgs> | null
    /**
     * Filter, which BeneficiaryRequest to fetch.
     */
    where?: BeneficiaryRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BeneficiaryRequests to fetch.
     */
    orderBy?: BeneficiaryRequestOrderByWithRelationInput | BeneficiaryRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BeneficiaryRequests.
     */
    cursor?: BeneficiaryRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BeneficiaryRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BeneficiaryRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BeneficiaryRequests.
     */
    distinct?: BeneficiaryRequestScalarFieldEnum | BeneficiaryRequestScalarFieldEnum[]
  }

  /**
   * BeneficiaryRequest findMany
   */
  export type BeneficiaryRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BeneficiaryRequest
     */
    select?: BeneficiaryRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BeneficiaryRequest
     */
    omit?: BeneficiaryRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeneficiaryRequestInclude<ExtArgs> | null
    /**
     * Filter, which BeneficiaryRequests to fetch.
     */
    where?: BeneficiaryRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BeneficiaryRequests to fetch.
     */
    orderBy?: BeneficiaryRequestOrderByWithRelationInput | BeneficiaryRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BeneficiaryRequests.
     */
    cursor?: BeneficiaryRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BeneficiaryRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BeneficiaryRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BeneficiaryRequests.
     */
    distinct?: BeneficiaryRequestScalarFieldEnum | BeneficiaryRequestScalarFieldEnum[]
  }

  /**
   * BeneficiaryRequest create
   */
  export type BeneficiaryRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BeneficiaryRequest
     */
    select?: BeneficiaryRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BeneficiaryRequest
     */
    omit?: BeneficiaryRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeneficiaryRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a BeneficiaryRequest.
     */
    data: XOR<BeneficiaryRequestCreateInput, BeneficiaryRequestUncheckedCreateInput>
  }

  /**
   * BeneficiaryRequest createMany
   */
  export type BeneficiaryRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BeneficiaryRequests.
     */
    data: BeneficiaryRequestCreateManyInput | BeneficiaryRequestCreateManyInput[]
  }

  /**
   * BeneficiaryRequest createManyAndReturn
   */
  export type BeneficiaryRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BeneficiaryRequest
     */
    select?: BeneficiaryRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BeneficiaryRequest
     */
    omit?: BeneficiaryRequestOmit<ExtArgs> | null
    /**
     * The data used to create many BeneficiaryRequests.
     */
    data: BeneficiaryRequestCreateManyInput | BeneficiaryRequestCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeneficiaryRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BeneficiaryRequest update
   */
  export type BeneficiaryRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BeneficiaryRequest
     */
    select?: BeneficiaryRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BeneficiaryRequest
     */
    omit?: BeneficiaryRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeneficiaryRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a BeneficiaryRequest.
     */
    data: XOR<BeneficiaryRequestUpdateInput, BeneficiaryRequestUncheckedUpdateInput>
    /**
     * Choose, which BeneficiaryRequest to update.
     */
    where: BeneficiaryRequestWhereUniqueInput
  }

  /**
   * BeneficiaryRequest updateMany
   */
  export type BeneficiaryRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BeneficiaryRequests.
     */
    data: XOR<BeneficiaryRequestUpdateManyMutationInput, BeneficiaryRequestUncheckedUpdateManyInput>
    /**
     * Filter which BeneficiaryRequests to update
     */
    where?: BeneficiaryRequestWhereInput
    /**
     * Limit how many BeneficiaryRequests to update.
     */
    limit?: number
  }

  /**
   * BeneficiaryRequest updateManyAndReturn
   */
  export type BeneficiaryRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BeneficiaryRequest
     */
    select?: BeneficiaryRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BeneficiaryRequest
     */
    omit?: BeneficiaryRequestOmit<ExtArgs> | null
    /**
     * The data used to update BeneficiaryRequests.
     */
    data: XOR<BeneficiaryRequestUpdateManyMutationInput, BeneficiaryRequestUncheckedUpdateManyInput>
    /**
     * Filter which BeneficiaryRequests to update
     */
    where?: BeneficiaryRequestWhereInput
    /**
     * Limit how many BeneficiaryRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeneficiaryRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * BeneficiaryRequest upsert
   */
  export type BeneficiaryRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BeneficiaryRequest
     */
    select?: BeneficiaryRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BeneficiaryRequest
     */
    omit?: BeneficiaryRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeneficiaryRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the BeneficiaryRequest to update in case it exists.
     */
    where: BeneficiaryRequestWhereUniqueInput
    /**
     * In case the BeneficiaryRequest found by the `where` argument doesn't exist, create a new BeneficiaryRequest with this data.
     */
    create: XOR<BeneficiaryRequestCreateInput, BeneficiaryRequestUncheckedCreateInput>
    /**
     * In case the BeneficiaryRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BeneficiaryRequestUpdateInput, BeneficiaryRequestUncheckedUpdateInput>
  }

  /**
   * BeneficiaryRequest delete
   */
  export type BeneficiaryRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BeneficiaryRequest
     */
    select?: BeneficiaryRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BeneficiaryRequest
     */
    omit?: BeneficiaryRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeneficiaryRequestInclude<ExtArgs> | null
    /**
     * Filter which BeneficiaryRequest to delete.
     */
    where: BeneficiaryRequestWhereUniqueInput
  }

  /**
   * BeneficiaryRequest deleteMany
   */
  export type BeneficiaryRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BeneficiaryRequests to delete
     */
    where?: BeneficiaryRequestWhereInput
    /**
     * Limit how many BeneficiaryRequests to delete.
     */
    limit?: number
  }

  /**
   * BeneficiaryRequest.logs
   */
  export type BeneficiaryRequest$logsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLog
     */
    omit?: RequestLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogInclude<ExtArgs> | null
    where?: RequestLogWhereInput
    orderBy?: RequestLogOrderByWithRelationInput | RequestLogOrderByWithRelationInput[]
    cursor?: RequestLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RequestLogScalarFieldEnum | RequestLogScalarFieldEnum[]
  }

  /**
   * BeneficiaryRequest.revisions
   */
  export type BeneficiaryRequest$revisionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestRevision
     */
    select?: RequestRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestRevision
     */
    omit?: RequestRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestRevisionInclude<ExtArgs> | null
    where?: RequestRevisionWhereInput
    orderBy?: RequestRevisionOrderByWithRelationInput | RequestRevisionOrderByWithRelationInput[]
    cursor?: RequestRevisionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RequestRevisionScalarFieldEnum | RequestRevisionScalarFieldEnum[]
  }

  /**
   * BeneficiaryRequest without action
   */
  export type BeneficiaryRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BeneficiaryRequest
     */
    select?: BeneficiaryRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BeneficiaryRequest
     */
    omit?: BeneficiaryRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BeneficiaryRequestInclude<ExtArgs> | null
  }


  /**
   * Model RequestLog
   */

  export type AggregateRequestLog = {
    _count: RequestLogCountAggregateOutputType | null
    _avg: RequestLogAvgAggregateOutputType | null
    _sum: RequestLogSumAggregateOutputType | null
    _min: RequestLogMinAggregateOutputType | null
    _max: RequestLogMaxAggregateOutputType | null
  }

  export type RequestLogAvgAggregateOutputType = {
    id: number | null
    requestId: number | null
    actorUserId: number | null
  }

  export type RequestLogSumAggregateOutputType = {
    id: number | null
    requestId: number | null
    actorUserId: number | null
  }

  export type RequestLogMinAggregateOutputType = {
    id: number | null
    requestId: number | null
    action: string | null
    actorUserId: number | null
    actorRole: $Enums.Role | null
    actorName: string | null
    note: string | null
    createdAt: Date | null
  }

  export type RequestLogMaxAggregateOutputType = {
    id: number | null
    requestId: number | null
    action: string | null
    actorUserId: number | null
    actorRole: $Enums.Role | null
    actorName: string | null
    note: string | null
    createdAt: Date | null
  }

  export type RequestLogCountAggregateOutputType = {
    id: number
    requestId: number
    action: number
    actorUserId: number
    actorRole: number
    actorName: number
    note: number
    createdAt: number
    _all: number
  }


  export type RequestLogAvgAggregateInputType = {
    id?: true
    requestId?: true
    actorUserId?: true
  }

  export type RequestLogSumAggregateInputType = {
    id?: true
    requestId?: true
    actorUserId?: true
  }

  export type RequestLogMinAggregateInputType = {
    id?: true
    requestId?: true
    action?: true
    actorUserId?: true
    actorRole?: true
    actorName?: true
    note?: true
    createdAt?: true
  }

  export type RequestLogMaxAggregateInputType = {
    id?: true
    requestId?: true
    action?: true
    actorUserId?: true
    actorRole?: true
    actorName?: true
    note?: true
    createdAt?: true
  }

  export type RequestLogCountAggregateInputType = {
    id?: true
    requestId?: true
    action?: true
    actorUserId?: true
    actorRole?: true
    actorName?: true
    note?: true
    createdAt?: true
    _all?: true
  }

  export type RequestLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RequestLog to aggregate.
     */
    where?: RequestLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestLogs to fetch.
     */
    orderBy?: RequestLogOrderByWithRelationInput | RequestLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RequestLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RequestLogs
    **/
    _count?: true | RequestLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RequestLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RequestLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RequestLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RequestLogMaxAggregateInputType
  }

  export type GetRequestLogAggregateType<T extends RequestLogAggregateArgs> = {
        [P in keyof T & keyof AggregateRequestLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRequestLog[P]>
      : GetScalarType<T[P], AggregateRequestLog[P]>
  }




  export type RequestLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RequestLogWhereInput
    orderBy?: RequestLogOrderByWithAggregationInput | RequestLogOrderByWithAggregationInput[]
    by: RequestLogScalarFieldEnum[] | RequestLogScalarFieldEnum
    having?: RequestLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RequestLogCountAggregateInputType | true
    _avg?: RequestLogAvgAggregateInputType
    _sum?: RequestLogSumAggregateInputType
    _min?: RequestLogMinAggregateInputType
    _max?: RequestLogMaxAggregateInputType
  }

  export type RequestLogGroupByOutputType = {
    id: number
    requestId: number
    action: string
    actorUserId: number
    actorRole: $Enums.Role
    actorName: string
    note: string | null
    createdAt: Date
    _count: RequestLogCountAggregateOutputType | null
    _avg: RequestLogAvgAggregateOutputType | null
    _sum: RequestLogSumAggregateOutputType | null
    _min: RequestLogMinAggregateOutputType | null
    _max: RequestLogMaxAggregateOutputType | null
  }

  type GetRequestLogGroupByPayload<T extends RequestLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RequestLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RequestLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RequestLogGroupByOutputType[P]>
            : GetScalarType<T[P], RequestLogGroupByOutputType[P]>
        }
      >
    >


  export type RequestLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requestId?: boolean
    action?: boolean
    actorUserId?: boolean
    actorRole?: boolean
    actorName?: boolean
    note?: boolean
    createdAt?: boolean
    request?: boolean | BeneficiaryRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["requestLog"]>

  export type RequestLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requestId?: boolean
    action?: boolean
    actorUserId?: boolean
    actorRole?: boolean
    actorName?: boolean
    note?: boolean
    createdAt?: boolean
    request?: boolean | BeneficiaryRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["requestLog"]>

  export type RequestLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requestId?: boolean
    action?: boolean
    actorUserId?: boolean
    actorRole?: boolean
    actorName?: boolean
    note?: boolean
    createdAt?: boolean
    request?: boolean | BeneficiaryRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["requestLog"]>

  export type RequestLogSelectScalar = {
    id?: boolean
    requestId?: boolean
    action?: boolean
    actorUserId?: boolean
    actorRole?: boolean
    actorName?: boolean
    note?: boolean
    createdAt?: boolean
  }

  export type RequestLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "requestId" | "action" | "actorUserId" | "actorRole" | "actorName" | "note" | "createdAt", ExtArgs["result"]["requestLog"]>
  export type RequestLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    request?: boolean | BeneficiaryRequestDefaultArgs<ExtArgs>
  }
  export type RequestLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    request?: boolean | BeneficiaryRequestDefaultArgs<ExtArgs>
  }
  export type RequestLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    request?: boolean | BeneficiaryRequestDefaultArgs<ExtArgs>
  }

  export type $RequestLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RequestLog"
    objects: {
      request: Prisma.$BeneficiaryRequestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      requestId: number
      action: string
      actorUserId: number
      actorRole: $Enums.Role
      actorName: string
      note: string | null
      createdAt: Date
    }, ExtArgs["result"]["requestLog"]>
    composites: {}
  }

  type RequestLogGetPayload<S extends boolean | null | undefined | RequestLogDefaultArgs> = $Result.GetResult<Prisma.$RequestLogPayload, S>

  type RequestLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RequestLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RequestLogCountAggregateInputType | true
    }

  export interface RequestLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RequestLog'], meta: { name: 'RequestLog' } }
    /**
     * Find zero or one RequestLog that matches the filter.
     * @param {RequestLogFindUniqueArgs} args - Arguments to find a RequestLog
     * @example
     * // Get one RequestLog
     * const requestLog = await prisma.requestLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RequestLogFindUniqueArgs>(args: SelectSubset<T, RequestLogFindUniqueArgs<ExtArgs>>): Prisma__RequestLogClient<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RequestLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RequestLogFindUniqueOrThrowArgs} args - Arguments to find a RequestLog
     * @example
     * // Get one RequestLog
     * const requestLog = await prisma.requestLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RequestLogFindUniqueOrThrowArgs>(args: SelectSubset<T, RequestLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RequestLogClient<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RequestLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogFindFirstArgs} args - Arguments to find a RequestLog
     * @example
     * // Get one RequestLog
     * const requestLog = await prisma.requestLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RequestLogFindFirstArgs>(args?: SelectSubset<T, RequestLogFindFirstArgs<ExtArgs>>): Prisma__RequestLogClient<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RequestLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogFindFirstOrThrowArgs} args - Arguments to find a RequestLog
     * @example
     * // Get one RequestLog
     * const requestLog = await prisma.requestLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RequestLogFindFirstOrThrowArgs>(args?: SelectSubset<T, RequestLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__RequestLogClient<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RequestLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RequestLogs
     * const requestLogs = await prisma.requestLog.findMany()
     * 
     * // Get first 10 RequestLogs
     * const requestLogs = await prisma.requestLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const requestLogWithIdOnly = await prisma.requestLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RequestLogFindManyArgs>(args?: SelectSubset<T, RequestLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RequestLog.
     * @param {RequestLogCreateArgs} args - Arguments to create a RequestLog.
     * @example
     * // Create one RequestLog
     * const RequestLog = await prisma.requestLog.create({
     *   data: {
     *     // ... data to create a RequestLog
     *   }
     * })
     * 
     */
    create<T extends RequestLogCreateArgs>(args: SelectSubset<T, RequestLogCreateArgs<ExtArgs>>): Prisma__RequestLogClient<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RequestLogs.
     * @param {RequestLogCreateManyArgs} args - Arguments to create many RequestLogs.
     * @example
     * // Create many RequestLogs
     * const requestLog = await prisma.requestLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RequestLogCreateManyArgs>(args?: SelectSubset<T, RequestLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RequestLogs and returns the data saved in the database.
     * @param {RequestLogCreateManyAndReturnArgs} args - Arguments to create many RequestLogs.
     * @example
     * // Create many RequestLogs
     * const requestLog = await prisma.requestLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RequestLogs and only return the `id`
     * const requestLogWithIdOnly = await prisma.requestLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RequestLogCreateManyAndReturnArgs>(args?: SelectSubset<T, RequestLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RequestLog.
     * @param {RequestLogDeleteArgs} args - Arguments to delete one RequestLog.
     * @example
     * // Delete one RequestLog
     * const RequestLog = await prisma.requestLog.delete({
     *   where: {
     *     // ... filter to delete one RequestLog
     *   }
     * })
     * 
     */
    delete<T extends RequestLogDeleteArgs>(args: SelectSubset<T, RequestLogDeleteArgs<ExtArgs>>): Prisma__RequestLogClient<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RequestLog.
     * @param {RequestLogUpdateArgs} args - Arguments to update one RequestLog.
     * @example
     * // Update one RequestLog
     * const requestLog = await prisma.requestLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RequestLogUpdateArgs>(args: SelectSubset<T, RequestLogUpdateArgs<ExtArgs>>): Prisma__RequestLogClient<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RequestLogs.
     * @param {RequestLogDeleteManyArgs} args - Arguments to filter RequestLogs to delete.
     * @example
     * // Delete a few RequestLogs
     * const { count } = await prisma.requestLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RequestLogDeleteManyArgs>(args?: SelectSubset<T, RequestLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RequestLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RequestLogs
     * const requestLog = await prisma.requestLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RequestLogUpdateManyArgs>(args: SelectSubset<T, RequestLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RequestLogs and returns the data updated in the database.
     * @param {RequestLogUpdateManyAndReturnArgs} args - Arguments to update many RequestLogs.
     * @example
     * // Update many RequestLogs
     * const requestLog = await prisma.requestLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RequestLogs and only return the `id`
     * const requestLogWithIdOnly = await prisma.requestLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RequestLogUpdateManyAndReturnArgs>(args: SelectSubset<T, RequestLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RequestLog.
     * @param {RequestLogUpsertArgs} args - Arguments to update or create a RequestLog.
     * @example
     * // Update or create a RequestLog
     * const requestLog = await prisma.requestLog.upsert({
     *   create: {
     *     // ... data to create a RequestLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RequestLog we want to update
     *   }
     * })
     */
    upsert<T extends RequestLogUpsertArgs>(args: SelectSubset<T, RequestLogUpsertArgs<ExtArgs>>): Prisma__RequestLogClient<$Result.GetResult<Prisma.$RequestLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RequestLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogCountArgs} args - Arguments to filter RequestLogs to count.
     * @example
     * // Count the number of RequestLogs
     * const count = await prisma.requestLog.count({
     *   where: {
     *     // ... the filter for the RequestLogs we want to count
     *   }
     * })
    **/
    count<T extends RequestLogCountArgs>(
      args?: Subset<T, RequestLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RequestLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RequestLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RequestLogAggregateArgs>(args: Subset<T, RequestLogAggregateArgs>): Prisma.PrismaPromise<GetRequestLogAggregateType<T>>

    /**
     * Group by RequestLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestLogGroupByArgs} args - Group by arguments.
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
      T extends RequestLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RequestLogGroupByArgs['orderBy'] }
        : { orderBy?: RequestLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RequestLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRequestLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RequestLog model
   */
  readonly fields: RequestLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RequestLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RequestLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    request<T extends BeneficiaryRequestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BeneficiaryRequestDefaultArgs<ExtArgs>>): Prisma__BeneficiaryRequestClient<$Result.GetResult<Prisma.$BeneficiaryRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RequestLog model
   */
  interface RequestLogFieldRefs {
    readonly id: FieldRef<"RequestLog", 'Int'>
    readonly requestId: FieldRef<"RequestLog", 'Int'>
    readonly action: FieldRef<"RequestLog", 'String'>
    readonly actorUserId: FieldRef<"RequestLog", 'Int'>
    readonly actorRole: FieldRef<"RequestLog", 'Role'>
    readonly actorName: FieldRef<"RequestLog", 'String'>
    readonly note: FieldRef<"RequestLog", 'String'>
    readonly createdAt: FieldRef<"RequestLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RequestLog findUnique
   */
  export type RequestLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLog
     */
    omit?: RequestLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogInclude<ExtArgs> | null
    /**
     * Filter, which RequestLog to fetch.
     */
    where: RequestLogWhereUniqueInput
  }

  /**
   * RequestLog findUniqueOrThrow
   */
  export type RequestLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLog
     */
    omit?: RequestLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogInclude<ExtArgs> | null
    /**
     * Filter, which RequestLog to fetch.
     */
    where: RequestLogWhereUniqueInput
  }

  /**
   * RequestLog findFirst
   */
  export type RequestLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLog
     */
    omit?: RequestLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogInclude<ExtArgs> | null
    /**
     * Filter, which RequestLog to fetch.
     */
    where?: RequestLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestLogs to fetch.
     */
    orderBy?: RequestLogOrderByWithRelationInput | RequestLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RequestLogs.
     */
    cursor?: RequestLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequestLogs.
     */
    distinct?: RequestLogScalarFieldEnum | RequestLogScalarFieldEnum[]
  }

  /**
   * RequestLog findFirstOrThrow
   */
  export type RequestLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLog
     */
    omit?: RequestLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogInclude<ExtArgs> | null
    /**
     * Filter, which RequestLog to fetch.
     */
    where?: RequestLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestLogs to fetch.
     */
    orderBy?: RequestLogOrderByWithRelationInput | RequestLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RequestLogs.
     */
    cursor?: RequestLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequestLogs.
     */
    distinct?: RequestLogScalarFieldEnum | RequestLogScalarFieldEnum[]
  }

  /**
   * RequestLog findMany
   */
  export type RequestLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLog
     */
    omit?: RequestLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogInclude<ExtArgs> | null
    /**
     * Filter, which RequestLogs to fetch.
     */
    where?: RequestLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestLogs to fetch.
     */
    orderBy?: RequestLogOrderByWithRelationInput | RequestLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RequestLogs.
     */
    cursor?: RequestLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequestLogs.
     */
    distinct?: RequestLogScalarFieldEnum | RequestLogScalarFieldEnum[]
  }

  /**
   * RequestLog create
   */
  export type RequestLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLog
     */
    omit?: RequestLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogInclude<ExtArgs> | null
    /**
     * The data needed to create a RequestLog.
     */
    data: XOR<RequestLogCreateInput, RequestLogUncheckedCreateInput>
  }

  /**
   * RequestLog createMany
   */
  export type RequestLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RequestLogs.
     */
    data: RequestLogCreateManyInput | RequestLogCreateManyInput[]
  }

  /**
   * RequestLog createManyAndReturn
   */
  export type RequestLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLog
     */
    omit?: RequestLogOmit<ExtArgs> | null
    /**
     * The data used to create many RequestLogs.
     */
    data: RequestLogCreateManyInput | RequestLogCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RequestLog update
   */
  export type RequestLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLog
     */
    omit?: RequestLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogInclude<ExtArgs> | null
    /**
     * The data needed to update a RequestLog.
     */
    data: XOR<RequestLogUpdateInput, RequestLogUncheckedUpdateInput>
    /**
     * Choose, which RequestLog to update.
     */
    where: RequestLogWhereUniqueInput
  }

  /**
   * RequestLog updateMany
   */
  export type RequestLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RequestLogs.
     */
    data: XOR<RequestLogUpdateManyMutationInput, RequestLogUncheckedUpdateManyInput>
    /**
     * Filter which RequestLogs to update
     */
    where?: RequestLogWhereInput
    /**
     * Limit how many RequestLogs to update.
     */
    limit?: number
  }

  /**
   * RequestLog updateManyAndReturn
   */
  export type RequestLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLog
     */
    omit?: RequestLogOmit<ExtArgs> | null
    /**
     * The data used to update RequestLogs.
     */
    data: XOR<RequestLogUpdateManyMutationInput, RequestLogUncheckedUpdateManyInput>
    /**
     * Filter which RequestLogs to update
     */
    where?: RequestLogWhereInput
    /**
     * Limit how many RequestLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RequestLog upsert
   */
  export type RequestLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLog
     */
    omit?: RequestLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogInclude<ExtArgs> | null
    /**
     * The filter to search for the RequestLog to update in case it exists.
     */
    where: RequestLogWhereUniqueInput
    /**
     * In case the RequestLog found by the `where` argument doesn't exist, create a new RequestLog with this data.
     */
    create: XOR<RequestLogCreateInput, RequestLogUncheckedCreateInput>
    /**
     * In case the RequestLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RequestLogUpdateInput, RequestLogUncheckedUpdateInput>
  }

  /**
   * RequestLog delete
   */
  export type RequestLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLog
     */
    omit?: RequestLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogInclude<ExtArgs> | null
    /**
     * Filter which RequestLog to delete.
     */
    where: RequestLogWhereUniqueInput
  }

  /**
   * RequestLog deleteMany
   */
  export type RequestLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RequestLogs to delete
     */
    where?: RequestLogWhereInput
    /**
     * Limit how many RequestLogs to delete.
     */
    limit?: number
  }

  /**
   * RequestLog without action
   */
  export type RequestLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestLog
     */
    select?: RequestLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestLog
     */
    omit?: RequestLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestLogInclude<ExtArgs> | null
  }


  /**
   * Model RequestRevision
   */

  export type AggregateRequestRevision = {
    _count: RequestRevisionCountAggregateOutputType | null
    _avg: RequestRevisionAvgAggregateOutputType | null
    _sum: RequestRevisionSumAggregateOutputType | null
    _min: RequestRevisionMinAggregateOutputType | null
    _max: RequestRevisionMaxAggregateOutputType | null
  }

  export type RequestRevisionAvgAggregateOutputType = {
    id: number | null
    requestId: number | null
    editedByUserId: number | null
  }

  export type RequestRevisionSumAggregateOutputType = {
    id: number | null
    requestId: number | null
    editedByUserId: number | null
  }

  export type RequestRevisionMinAggregateOutputType = {
    id: number | null
    requestId: number | null
    editedByUserId: number | null
    editedByRole: $Enums.Role | null
    editedByName: string | null
    previousData: string | null
    newData: string | null
    approvedAt: Date | null
    createdAt: Date | null
  }

  export type RequestRevisionMaxAggregateOutputType = {
    id: number | null
    requestId: number | null
    editedByUserId: number | null
    editedByRole: $Enums.Role | null
    editedByName: string | null
    previousData: string | null
    newData: string | null
    approvedAt: Date | null
    createdAt: Date | null
  }

  export type RequestRevisionCountAggregateOutputType = {
    id: number
    requestId: number
    editedByUserId: number
    editedByRole: number
    editedByName: number
    previousData: number
    newData: number
    approvedAt: number
    createdAt: number
    _all: number
  }


  export type RequestRevisionAvgAggregateInputType = {
    id?: true
    requestId?: true
    editedByUserId?: true
  }

  export type RequestRevisionSumAggregateInputType = {
    id?: true
    requestId?: true
    editedByUserId?: true
  }

  export type RequestRevisionMinAggregateInputType = {
    id?: true
    requestId?: true
    editedByUserId?: true
    editedByRole?: true
    editedByName?: true
    previousData?: true
    newData?: true
    approvedAt?: true
    createdAt?: true
  }

  export type RequestRevisionMaxAggregateInputType = {
    id?: true
    requestId?: true
    editedByUserId?: true
    editedByRole?: true
    editedByName?: true
    previousData?: true
    newData?: true
    approvedAt?: true
    createdAt?: true
  }

  export type RequestRevisionCountAggregateInputType = {
    id?: true
    requestId?: true
    editedByUserId?: true
    editedByRole?: true
    editedByName?: true
    previousData?: true
    newData?: true
    approvedAt?: true
    createdAt?: true
    _all?: true
  }

  export type RequestRevisionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RequestRevision to aggregate.
     */
    where?: RequestRevisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestRevisions to fetch.
     */
    orderBy?: RequestRevisionOrderByWithRelationInput | RequestRevisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RequestRevisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestRevisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestRevisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RequestRevisions
    **/
    _count?: true | RequestRevisionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RequestRevisionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RequestRevisionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RequestRevisionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RequestRevisionMaxAggregateInputType
  }

  export type GetRequestRevisionAggregateType<T extends RequestRevisionAggregateArgs> = {
        [P in keyof T & keyof AggregateRequestRevision]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRequestRevision[P]>
      : GetScalarType<T[P], AggregateRequestRevision[P]>
  }




  export type RequestRevisionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RequestRevisionWhereInput
    orderBy?: RequestRevisionOrderByWithAggregationInput | RequestRevisionOrderByWithAggregationInput[]
    by: RequestRevisionScalarFieldEnum[] | RequestRevisionScalarFieldEnum
    having?: RequestRevisionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RequestRevisionCountAggregateInputType | true
    _avg?: RequestRevisionAvgAggregateInputType
    _sum?: RequestRevisionSumAggregateInputType
    _min?: RequestRevisionMinAggregateInputType
    _max?: RequestRevisionMaxAggregateInputType
  }

  export type RequestRevisionGroupByOutputType = {
    id: number
    requestId: number
    editedByUserId: number
    editedByRole: $Enums.Role
    editedByName: string
    previousData: string
    newData: string
    approvedAt: Date | null
    createdAt: Date
    _count: RequestRevisionCountAggregateOutputType | null
    _avg: RequestRevisionAvgAggregateOutputType | null
    _sum: RequestRevisionSumAggregateOutputType | null
    _min: RequestRevisionMinAggregateOutputType | null
    _max: RequestRevisionMaxAggregateOutputType | null
  }

  type GetRequestRevisionGroupByPayload<T extends RequestRevisionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RequestRevisionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RequestRevisionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RequestRevisionGroupByOutputType[P]>
            : GetScalarType<T[P], RequestRevisionGroupByOutputType[P]>
        }
      >
    >


  export type RequestRevisionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requestId?: boolean
    editedByUserId?: boolean
    editedByRole?: boolean
    editedByName?: boolean
    previousData?: boolean
    newData?: boolean
    approvedAt?: boolean
    createdAt?: boolean
    request?: boolean | BeneficiaryRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["requestRevision"]>

  export type RequestRevisionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requestId?: boolean
    editedByUserId?: boolean
    editedByRole?: boolean
    editedByName?: boolean
    previousData?: boolean
    newData?: boolean
    approvedAt?: boolean
    createdAt?: boolean
    request?: boolean | BeneficiaryRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["requestRevision"]>

  export type RequestRevisionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    requestId?: boolean
    editedByUserId?: boolean
    editedByRole?: boolean
    editedByName?: boolean
    previousData?: boolean
    newData?: boolean
    approvedAt?: boolean
    createdAt?: boolean
    request?: boolean | BeneficiaryRequestDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["requestRevision"]>

  export type RequestRevisionSelectScalar = {
    id?: boolean
    requestId?: boolean
    editedByUserId?: boolean
    editedByRole?: boolean
    editedByName?: boolean
    previousData?: boolean
    newData?: boolean
    approvedAt?: boolean
    createdAt?: boolean
  }

  export type RequestRevisionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "requestId" | "editedByUserId" | "editedByRole" | "editedByName" | "previousData" | "newData" | "approvedAt" | "createdAt", ExtArgs["result"]["requestRevision"]>
  export type RequestRevisionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    request?: boolean | BeneficiaryRequestDefaultArgs<ExtArgs>
  }
  export type RequestRevisionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    request?: boolean | BeneficiaryRequestDefaultArgs<ExtArgs>
  }
  export type RequestRevisionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    request?: boolean | BeneficiaryRequestDefaultArgs<ExtArgs>
  }

  export type $RequestRevisionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RequestRevision"
    objects: {
      request: Prisma.$BeneficiaryRequestPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      requestId: number
      editedByUserId: number
      editedByRole: $Enums.Role
      editedByName: string
      previousData: string
      newData: string
      approvedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["requestRevision"]>
    composites: {}
  }

  type RequestRevisionGetPayload<S extends boolean | null | undefined | RequestRevisionDefaultArgs> = $Result.GetResult<Prisma.$RequestRevisionPayload, S>

  type RequestRevisionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RequestRevisionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RequestRevisionCountAggregateInputType | true
    }

  export interface RequestRevisionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RequestRevision'], meta: { name: 'RequestRevision' } }
    /**
     * Find zero or one RequestRevision that matches the filter.
     * @param {RequestRevisionFindUniqueArgs} args - Arguments to find a RequestRevision
     * @example
     * // Get one RequestRevision
     * const requestRevision = await prisma.requestRevision.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RequestRevisionFindUniqueArgs>(args: SelectSubset<T, RequestRevisionFindUniqueArgs<ExtArgs>>): Prisma__RequestRevisionClient<$Result.GetResult<Prisma.$RequestRevisionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RequestRevision that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RequestRevisionFindUniqueOrThrowArgs} args - Arguments to find a RequestRevision
     * @example
     * // Get one RequestRevision
     * const requestRevision = await prisma.requestRevision.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RequestRevisionFindUniqueOrThrowArgs>(args: SelectSubset<T, RequestRevisionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RequestRevisionClient<$Result.GetResult<Prisma.$RequestRevisionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RequestRevision that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestRevisionFindFirstArgs} args - Arguments to find a RequestRevision
     * @example
     * // Get one RequestRevision
     * const requestRevision = await prisma.requestRevision.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RequestRevisionFindFirstArgs>(args?: SelectSubset<T, RequestRevisionFindFirstArgs<ExtArgs>>): Prisma__RequestRevisionClient<$Result.GetResult<Prisma.$RequestRevisionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RequestRevision that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestRevisionFindFirstOrThrowArgs} args - Arguments to find a RequestRevision
     * @example
     * // Get one RequestRevision
     * const requestRevision = await prisma.requestRevision.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RequestRevisionFindFirstOrThrowArgs>(args?: SelectSubset<T, RequestRevisionFindFirstOrThrowArgs<ExtArgs>>): Prisma__RequestRevisionClient<$Result.GetResult<Prisma.$RequestRevisionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RequestRevisions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestRevisionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RequestRevisions
     * const requestRevisions = await prisma.requestRevision.findMany()
     * 
     * // Get first 10 RequestRevisions
     * const requestRevisions = await prisma.requestRevision.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const requestRevisionWithIdOnly = await prisma.requestRevision.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RequestRevisionFindManyArgs>(args?: SelectSubset<T, RequestRevisionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestRevisionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RequestRevision.
     * @param {RequestRevisionCreateArgs} args - Arguments to create a RequestRevision.
     * @example
     * // Create one RequestRevision
     * const RequestRevision = await prisma.requestRevision.create({
     *   data: {
     *     // ... data to create a RequestRevision
     *   }
     * })
     * 
     */
    create<T extends RequestRevisionCreateArgs>(args: SelectSubset<T, RequestRevisionCreateArgs<ExtArgs>>): Prisma__RequestRevisionClient<$Result.GetResult<Prisma.$RequestRevisionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RequestRevisions.
     * @param {RequestRevisionCreateManyArgs} args - Arguments to create many RequestRevisions.
     * @example
     * // Create many RequestRevisions
     * const requestRevision = await prisma.requestRevision.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RequestRevisionCreateManyArgs>(args?: SelectSubset<T, RequestRevisionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RequestRevisions and returns the data saved in the database.
     * @param {RequestRevisionCreateManyAndReturnArgs} args - Arguments to create many RequestRevisions.
     * @example
     * // Create many RequestRevisions
     * const requestRevision = await prisma.requestRevision.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RequestRevisions and only return the `id`
     * const requestRevisionWithIdOnly = await prisma.requestRevision.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RequestRevisionCreateManyAndReturnArgs>(args?: SelectSubset<T, RequestRevisionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestRevisionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RequestRevision.
     * @param {RequestRevisionDeleteArgs} args - Arguments to delete one RequestRevision.
     * @example
     * // Delete one RequestRevision
     * const RequestRevision = await prisma.requestRevision.delete({
     *   where: {
     *     // ... filter to delete one RequestRevision
     *   }
     * })
     * 
     */
    delete<T extends RequestRevisionDeleteArgs>(args: SelectSubset<T, RequestRevisionDeleteArgs<ExtArgs>>): Prisma__RequestRevisionClient<$Result.GetResult<Prisma.$RequestRevisionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RequestRevision.
     * @param {RequestRevisionUpdateArgs} args - Arguments to update one RequestRevision.
     * @example
     * // Update one RequestRevision
     * const requestRevision = await prisma.requestRevision.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RequestRevisionUpdateArgs>(args: SelectSubset<T, RequestRevisionUpdateArgs<ExtArgs>>): Prisma__RequestRevisionClient<$Result.GetResult<Prisma.$RequestRevisionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RequestRevisions.
     * @param {RequestRevisionDeleteManyArgs} args - Arguments to filter RequestRevisions to delete.
     * @example
     * // Delete a few RequestRevisions
     * const { count } = await prisma.requestRevision.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RequestRevisionDeleteManyArgs>(args?: SelectSubset<T, RequestRevisionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RequestRevisions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestRevisionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RequestRevisions
     * const requestRevision = await prisma.requestRevision.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RequestRevisionUpdateManyArgs>(args: SelectSubset<T, RequestRevisionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RequestRevisions and returns the data updated in the database.
     * @param {RequestRevisionUpdateManyAndReturnArgs} args - Arguments to update many RequestRevisions.
     * @example
     * // Update many RequestRevisions
     * const requestRevision = await prisma.requestRevision.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RequestRevisions and only return the `id`
     * const requestRevisionWithIdOnly = await prisma.requestRevision.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RequestRevisionUpdateManyAndReturnArgs>(args: SelectSubset<T, RequestRevisionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RequestRevisionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RequestRevision.
     * @param {RequestRevisionUpsertArgs} args - Arguments to update or create a RequestRevision.
     * @example
     * // Update or create a RequestRevision
     * const requestRevision = await prisma.requestRevision.upsert({
     *   create: {
     *     // ... data to create a RequestRevision
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RequestRevision we want to update
     *   }
     * })
     */
    upsert<T extends RequestRevisionUpsertArgs>(args: SelectSubset<T, RequestRevisionUpsertArgs<ExtArgs>>): Prisma__RequestRevisionClient<$Result.GetResult<Prisma.$RequestRevisionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RequestRevisions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestRevisionCountArgs} args - Arguments to filter RequestRevisions to count.
     * @example
     * // Count the number of RequestRevisions
     * const count = await prisma.requestRevision.count({
     *   where: {
     *     // ... the filter for the RequestRevisions we want to count
     *   }
     * })
    **/
    count<T extends RequestRevisionCountArgs>(
      args?: Subset<T, RequestRevisionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RequestRevisionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RequestRevision.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestRevisionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RequestRevisionAggregateArgs>(args: Subset<T, RequestRevisionAggregateArgs>): Prisma.PrismaPromise<GetRequestRevisionAggregateType<T>>

    /**
     * Group by RequestRevision.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RequestRevisionGroupByArgs} args - Group by arguments.
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
      T extends RequestRevisionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RequestRevisionGroupByArgs['orderBy'] }
        : { orderBy?: RequestRevisionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RequestRevisionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRequestRevisionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RequestRevision model
   */
  readonly fields: RequestRevisionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RequestRevision.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RequestRevisionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    request<T extends BeneficiaryRequestDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BeneficiaryRequestDefaultArgs<ExtArgs>>): Prisma__BeneficiaryRequestClient<$Result.GetResult<Prisma.$BeneficiaryRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RequestRevision model
   */
  interface RequestRevisionFieldRefs {
    readonly id: FieldRef<"RequestRevision", 'Int'>
    readonly requestId: FieldRef<"RequestRevision", 'Int'>
    readonly editedByUserId: FieldRef<"RequestRevision", 'Int'>
    readonly editedByRole: FieldRef<"RequestRevision", 'Role'>
    readonly editedByName: FieldRef<"RequestRevision", 'String'>
    readonly previousData: FieldRef<"RequestRevision", 'String'>
    readonly newData: FieldRef<"RequestRevision", 'String'>
    readonly approvedAt: FieldRef<"RequestRevision", 'DateTime'>
    readonly createdAt: FieldRef<"RequestRevision", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RequestRevision findUnique
   */
  export type RequestRevisionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestRevision
     */
    select?: RequestRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestRevision
     */
    omit?: RequestRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestRevisionInclude<ExtArgs> | null
    /**
     * Filter, which RequestRevision to fetch.
     */
    where: RequestRevisionWhereUniqueInput
  }

  /**
   * RequestRevision findUniqueOrThrow
   */
  export type RequestRevisionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestRevision
     */
    select?: RequestRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestRevision
     */
    omit?: RequestRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestRevisionInclude<ExtArgs> | null
    /**
     * Filter, which RequestRevision to fetch.
     */
    where: RequestRevisionWhereUniqueInput
  }

  /**
   * RequestRevision findFirst
   */
  export type RequestRevisionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestRevision
     */
    select?: RequestRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestRevision
     */
    omit?: RequestRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestRevisionInclude<ExtArgs> | null
    /**
     * Filter, which RequestRevision to fetch.
     */
    where?: RequestRevisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestRevisions to fetch.
     */
    orderBy?: RequestRevisionOrderByWithRelationInput | RequestRevisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RequestRevisions.
     */
    cursor?: RequestRevisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestRevisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestRevisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequestRevisions.
     */
    distinct?: RequestRevisionScalarFieldEnum | RequestRevisionScalarFieldEnum[]
  }

  /**
   * RequestRevision findFirstOrThrow
   */
  export type RequestRevisionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestRevision
     */
    select?: RequestRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestRevision
     */
    omit?: RequestRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestRevisionInclude<ExtArgs> | null
    /**
     * Filter, which RequestRevision to fetch.
     */
    where?: RequestRevisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestRevisions to fetch.
     */
    orderBy?: RequestRevisionOrderByWithRelationInput | RequestRevisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RequestRevisions.
     */
    cursor?: RequestRevisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestRevisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestRevisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequestRevisions.
     */
    distinct?: RequestRevisionScalarFieldEnum | RequestRevisionScalarFieldEnum[]
  }

  /**
   * RequestRevision findMany
   */
  export type RequestRevisionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestRevision
     */
    select?: RequestRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestRevision
     */
    omit?: RequestRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestRevisionInclude<ExtArgs> | null
    /**
     * Filter, which RequestRevisions to fetch.
     */
    where?: RequestRevisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RequestRevisions to fetch.
     */
    orderBy?: RequestRevisionOrderByWithRelationInput | RequestRevisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RequestRevisions.
     */
    cursor?: RequestRevisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RequestRevisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RequestRevisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RequestRevisions.
     */
    distinct?: RequestRevisionScalarFieldEnum | RequestRevisionScalarFieldEnum[]
  }

  /**
   * RequestRevision create
   */
  export type RequestRevisionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestRevision
     */
    select?: RequestRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestRevision
     */
    omit?: RequestRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestRevisionInclude<ExtArgs> | null
    /**
     * The data needed to create a RequestRevision.
     */
    data: XOR<RequestRevisionCreateInput, RequestRevisionUncheckedCreateInput>
  }

  /**
   * RequestRevision createMany
   */
  export type RequestRevisionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RequestRevisions.
     */
    data: RequestRevisionCreateManyInput | RequestRevisionCreateManyInput[]
  }

  /**
   * RequestRevision createManyAndReturn
   */
  export type RequestRevisionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestRevision
     */
    select?: RequestRevisionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RequestRevision
     */
    omit?: RequestRevisionOmit<ExtArgs> | null
    /**
     * The data used to create many RequestRevisions.
     */
    data: RequestRevisionCreateManyInput | RequestRevisionCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestRevisionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RequestRevision update
   */
  export type RequestRevisionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestRevision
     */
    select?: RequestRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestRevision
     */
    omit?: RequestRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestRevisionInclude<ExtArgs> | null
    /**
     * The data needed to update a RequestRevision.
     */
    data: XOR<RequestRevisionUpdateInput, RequestRevisionUncheckedUpdateInput>
    /**
     * Choose, which RequestRevision to update.
     */
    where: RequestRevisionWhereUniqueInput
  }

  /**
   * RequestRevision updateMany
   */
  export type RequestRevisionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RequestRevisions.
     */
    data: XOR<RequestRevisionUpdateManyMutationInput, RequestRevisionUncheckedUpdateManyInput>
    /**
     * Filter which RequestRevisions to update
     */
    where?: RequestRevisionWhereInput
    /**
     * Limit how many RequestRevisions to update.
     */
    limit?: number
  }

  /**
   * RequestRevision updateManyAndReturn
   */
  export type RequestRevisionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestRevision
     */
    select?: RequestRevisionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RequestRevision
     */
    omit?: RequestRevisionOmit<ExtArgs> | null
    /**
     * The data used to update RequestRevisions.
     */
    data: XOR<RequestRevisionUpdateManyMutationInput, RequestRevisionUncheckedUpdateManyInput>
    /**
     * Filter which RequestRevisions to update
     */
    where?: RequestRevisionWhereInput
    /**
     * Limit how many RequestRevisions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestRevisionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RequestRevision upsert
   */
  export type RequestRevisionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestRevision
     */
    select?: RequestRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestRevision
     */
    omit?: RequestRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestRevisionInclude<ExtArgs> | null
    /**
     * The filter to search for the RequestRevision to update in case it exists.
     */
    where: RequestRevisionWhereUniqueInput
    /**
     * In case the RequestRevision found by the `where` argument doesn't exist, create a new RequestRevision with this data.
     */
    create: XOR<RequestRevisionCreateInput, RequestRevisionUncheckedCreateInput>
    /**
     * In case the RequestRevision was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RequestRevisionUpdateInput, RequestRevisionUncheckedUpdateInput>
  }

  /**
   * RequestRevision delete
   */
  export type RequestRevisionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestRevision
     */
    select?: RequestRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestRevision
     */
    omit?: RequestRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestRevisionInclude<ExtArgs> | null
    /**
     * Filter which RequestRevision to delete.
     */
    where: RequestRevisionWhereUniqueInput
  }

  /**
   * RequestRevision deleteMany
   */
  export type RequestRevisionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RequestRevisions to delete
     */
    where?: RequestRevisionWhereInput
    /**
     * Limit how many RequestRevisions to delete.
     */
    limit?: number
  }

  /**
   * RequestRevision without action
   */
  export type RequestRevisionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RequestRevision
     */
    select?: RequestRevisionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RequestRevision
     */
    omit?: RequestRevisionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RequestRevisionInclude<ExtArgs> | null
  }


  /**
   * Model ActivityLog
   */

  export type AggregateActivityLog = {
    _count: ActivityLogCountAggregateOutputType | null
    _avg: ActivityLogAvgAggregateOutputType | null
    _sum: ActivityLogSumAggregateOutputType | null
    _min: ActivityLogMinAggregateOutputType | null
    _max: ActivityLogMaxAggregateOutputType | null
  }

  export type ActivityLogAvgAggregateOutputType = {
    id: number | null
    entityId: number | null
    actorUserId: number | null
  }

  export type ActivityLogSumAggregateOutputType = {
    id: number | null
    entityId: number | null
    actorUserId: number | null
  }

  export type ActivityLogMinAggregateOutputType = {
    id: number | null
    action: string | null
    entityType: string | null
    entityId: number | null
    actorUserId: number | null
    actorRole: $Enums.Role | null
    actorName: string | null
    note: string | null
    createdAt: Date | null
  }

  export type ActivityLogMaxAggregateOutputType = {
    id: number | null
    action: string | null
    entityType: string | null
    entityId: number | null
    actorUserId: number | null
    actorRole: $Enums.Role | null
    actorName: string | null
    note: string | null
    createdAt: Date | null
  }

  export type ActivityLogCountAggregateOutputType = {
    id: number
    action: number
    entityType: number
    entityId: number
    actorUserId: number
    actorRole: number
    actorName: number
    note: number
    createdAt: number
    _all: number
  }


  export type ActivityLogAvgAggregateInputType = {
    id?: true
    entityId?: true
    actorUserId?: true
  }

  export type ActivityLogSumAggregateInputType = {
    id?: true
    entityId?: true
    actorUserId?: true
  }

  export type ActivityLogMinAggregateInputType = {
    id?: true
    action?: true
    entityType?: true
    entityId?: true
    actorUserId?: true
    actorRole?: true
    actorName?: true
    note?: true
    createdAt?: true
  }

  export type ActivityLogMaxAggregateInputType = {
    id?: true
    action?: true
    entityType?: true
    entityId?: true
    actorUserId?: true
    actorRole?: true
    actorName?: true
    note?: true
    createdAt?: true
  }

  export type ActivityLogCountAggregateInputType = {
    id?: true
    action?: true
    entityType?: true
    entityId?: true
    actorUserId?: true
    actorRole?: true
    actorName?: true
    note?: true
    createdAt?: true
    _all?: true
  }

  export type ActivityLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityLog to aggregate.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActivityLogs
    **/
    _count?: true | ActivityLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActivityLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActivityLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityLogMaxAggregateInputType
  }

  export type GetActivityLogAggregateType<T extends ActivityLogAggregateArgs> = {
        [P in keyof T & keyof AggregateActivityLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivityLog[P]>
      : GetScalarType<T[P], AggregateActivityLog[P]>
  }




  export type ActivityLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityLogWhereInput
    orderBy?: ActivityLogOrderByWithAggregationInput | ActivityLogOrderByWithAggregationInput[]
    by: ActivityLogScalarFieldEnum[] | ActivityLogScalarFieldEnum
    having?: ActivityLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityLogCountAggregateInputType | true
    _avg?: ActivityLogAvgAggregateInputType
    _sum?: ActivityLogSumAggregateInputType
    _min?: ActivityLogMinAggregateInputType
    _max?: ActivityLogMaxAggregateInputType
  }

  export type ActivityLogGroupByOutputType = {
    id: number
    action: string
    entityType: string | null
    entityId: number | null
    actorUserId: number | null
    actorRole: $Enums.Role | null
    actorName: string | null
    note: string | null
    createdAt: Date
    _count: ActivityLogCountAggregateOutputType | null
    _avg: ActivityLogAvgAggregateOutputType | null
    _sum: ActivityLogSumAggregateOutputType | null
    _min: ActivityLogMinAggregateOutputType | null
    _max: ActivityLogMaxAggregateOutputType | null
  }

  type GetActivityLogGroupByPayload<T extends ActivityLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityLogGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityLogGroupByOutputType[P]>
        }
      >
    >


  export type ActivityLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    actorUserId?: boolean
    actorRole?: boolean
    actorName?: boolean
    note?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    actorUserId?: boolean
    actorRole?: boolean
    actorName?: boolean
    note?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    actorUserId?: boolean
    actorRole?: boolean
    actorName?: boolean
    note?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectScalar = {
    id?: boolean
    action?: boolean
    entityType?: boolean
    entityId?: boolean
    actorUserId?: boolean
    actorRole?: boolean
    actorName?: boolean
    note?: boolean
    createdAt?: boolean
  }

  export type ActivityLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "action" | "entityType" | "entityId" | "actorUserId" | "actorRole" | "actorName" | "note" | "createdAt", ExtArgs["result"]["activityLog"]>

  export type $ActivityLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActivityLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      action: string
      entityType: string | null
      entityId: number | null
      actorUserId: number | null
      actorRole: $Enums.Role | null
      actorName: string | null
      note: string | null
      createdAt: Date
    }, ExtArgs["result"]["activityLog"]>
    composites: {}
  }

  type ActivityLogGetPayload<S extends boolean | null | undefined | ActivityLogDefaultArgs> = $Result.GetResult<Prisma.$ActivityLogPayload, S>

  type ActivityLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActivityLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivityLogCountAggregateInputType | true
    }

  export interface ActivityLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActivityLog'], meta: { name: 'ActivityLog' } }
    /**
     * Find zero or one ActivityLog that matches the filter.
     * @param {ActivityLogFindUniqueArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityLogFindUniqueArgs>(args: SelectSubset<T, ActivityLogFindUniqueArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ActivityLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActivityLogFindUniqueOrThrowArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivityLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindFirstArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityLogFindFirstArgs>(args?: SelectSubset<T, ActivityLogFindFirstArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivityLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindFirstOrThrowArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActivityLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActivityLogs
     * const activityLogs = await prisma.activityLog.findMany()
     * 
     * // Get first 10 ActivityLogs
     * const activityLogs = await prisma.activityLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityLogFindManyArgs>(args?: SelectSubset<T, ActivityLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ActivityLog.
     * @param {ActivityLogCreateArgs} args - Arguments to create a ActivityLog.
     * @example
     * // Create one ActivityLog
     * const ActivityLog = await prisma.activityLog.create({
     *   data: {
     *     // ... data to create a ActivityLog
     *   }
     * })
     * 
     */
    create<T extends ActivityLogCreateArgs>(args: SelectSubset<T, ActivityLogCreateArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ActivityLogs.
     * @param {ActivityLogCreateManyArgs} args - Arguments to create many ActivityLogs.
     * @example
     * // Create many ActivityLogs
     * const activityLog = await prisma.activityLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityLogCreateManyArgs>(args?: SelectSubset<T, ActivityLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActivityLogs and returns the data saved in the database.
     * @param {ActivityLogCreateManyAndReturnArgs} args - Arguments to create many ActivityLogs.
     * @example
     * // Create many ActivityLogs
     * const activityLog = await prisma.activityLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActivityLogs and only return the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivityLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivityLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ActivityLog.
     * @param {ActivityLogDeleteArgs} args - Arguments to delete one ActivityLog.
     * @example
     * // Delete one ActivityLog
     * const ActivityLog = await prisma.activityLog.delete({
     *   where: {
     *     // ... filter to delete one ActivityLog
     *   }
     * })
     * 
     */
    delete<T extends ActivityLogDeleteArgs>(args: SelectSubset<T, ActivityLogDeleteArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ActivityLog.
     * @param {ActivityLogUpdateArgs} args - Arguments to update one ActivityLog.
     * @example
     * // Update one ActivityLog
     * const activityLog = await prisma.activityLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityLogUpdateArgs>(args: SelectSubset<T, ActivityLogUpdateArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ActivityLogs.
     * @param {ActivityLogDeleteManyArgs} args - Arguments to filter ActivityLogs to delete.
     * @example
     * // Delete a few ActivityLogs
     * const { count } = await prisma.activityLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityLogDeleteManyArgs>(args?: SelectSubset<T, ActivityLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActivityLogs
     * const activityLog = await prisma.activityLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityLogUpdateManyArgs>(args: SelectSubset<T, ActivityLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityLogs and returns the data updated in the database.
     * @param {ActivityLogUpdateManyAndReturnArgs} args - Arguments to update many ActivityLogs.
     * @example
     * // Update many ActivityLogs
     * const activityLog = await prisma.activityLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ActivityLogs and only return the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActivityLogUpdateManyAndReturnArgs>(args: SelectSubset<T, ActivityLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ActivityLog.
     * @param {ActivityLogUpsertArgs} args - Arguments to update or create a ActivityLog.
     * @example
     * // Update or create a ActivityLog
     * const activityLog = await prisma.activityLog.upsert({
     *   create: {
     *     // ... data to create a ActivityLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActivityLog we want to update
     *   }
     * })
     */
    upsert<T extends ActivityLogUpsertArgs>(args: SelectSubset<T, ActivityLogUpsertArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogCountArgs} args - Arguments to filter ActivityLogs to count.
     * @example
     * // Count the number of ActivityLogs
     * const count = await prisma.activityLog.count({
     *   where: {
     *     // ... the filter for the ActivityLogs we want to count
     *   }
     * })
    **/
    count<T extends ActivityLogCountArgs>(
      args?: Subset<T, ActivityLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ActivityLogAggregateArgs>(args: Subset<T, ActivityLogAggregateArgs>): Prisma.PrismaPromise<GetActivityLogAggregateType<T>>

    /**
     * Group by ActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogGroupByArgs} args - Group by arguments.
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
      T extends ActivityLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityLogGroupByArgs['orderBy'] }
        : { orderBy?: ActivityLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ActivityLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActivityLog model
   */
  readonly fields: ActivityLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActivityLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActivityLog model
   */
  interface ActivityLogFieldRefs {
    readonly id: FieldRef<"ActivityLog", 'Int'>
    readonly action: FieldRef<"ActivityLog", 'String'>
    readonly entityType: FieldRef<"ActivityLog", 'String'>
    readonly entityId: FieldRef<"ActivityLog", 'Int'>
    readonly actorUserId: FieldRef<"ActivityLog", 'Int'>
    readonly actorRole: FieldRef<"ActivityLog", 'Role'>
    readonly actorName: FieldRef<"ActivityLog", 'String'>
    readonly note: FieldRef<"ActivityLog", 'String'>
    readonly createdAt: FieldRef<"ActivityLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ActivityLog findUnique
   */
  export type ActivityLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog findUniqueOrThrow
   */
  export type ActivityLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog findFirst
   */
  export type ActivityLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityLogs.
     */
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog findFirstOrThrow
   */
  export type ActivityLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityLogs.
     */
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog findMany
   */
  export type ActivityLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Filter, which ActivityLogs to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityLogs.
     */
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog create
   */
  export type ActivityLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The data needed to create a ActivityLog.
     */
    data: XOR<ActivityLogCreateInput, ActivityLogUncheckedCreateInput>
  }

  /**
   * ActivityLog createMany
   */
  export type ActivityLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActivityLogs.
     */
    data: ActivityLogCreateManyInput | ActivityLogCreateManyInput[]
  }

  /**
   * ActivityLog createManyAndReturn
   */
  export type ActivityLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The data used to create many ActivityLogs.
     */
    data: ActivityLogCreateManyInput | ActivityLogCreateManyInput[]
  }

  /**
   * ActivityLog update
   */
  export type ActivityLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The data needed to update a ActivityLog.
     */
    data: XOR<ActivityLogUpdateInput, ActivityLogUncheckedUpdateInput>
    /**
     * Choose, which ActivityLog to update.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog updateMany
   */
  export type ActivityLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActivityLogs.
     */
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which ActivityLogs to update
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to update.
     */
    limit?: number
  }

  /**
   * ActivityLog updateManyAndReturn
   */
  export type ActivityLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The data used to update ActivityLogs.
     */
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which ActivityLogs to update
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to update.
     */
    limit?: number
  }

  /**
   * ActivityLog upsert
   */
  export type ActivityLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The filter to search for the ActivityLog to update in case it exists.
     */
    where: ActivityLogWhereUniqueInput
    /**
     * In case the ActivityLog found by the `where` argument doesn't exist, create a new ActivityLog with this data.
     */
    create: XOR<ActivityLogCreateInput, ActivityLogUncheckedCreateInput>
    /**
     * In case the ActivityLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityLogUpdateInput, ActivityLogUncheckedUpdateInput>
  }

  /**
   * ActivityLog delete
   */
  export type ActivityLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Filter which ActivityLog to delete.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog deleteMany
   */
  export type ActivityLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityLogs to delete
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to delete.
     */
    limit?: number
  }

  /**
   * ActivityLog without action
   */
  export type ActivityLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    passwordHash: 'passwordHash',
    fullName: 'fullName',
    companyName: 'companyName',
    firstName: 'firstName',
    lastName: 'lastName',
    phoneNumber: 'phoneNumber',
    role: 'role',
    isActive: 'isActive',
    registrationReturnReason: 'registrationReturnReason',
    registrationReturnedAt: 'registrationReturnedAt',
    resetToken: 'resetToken',
    resetTokenExpiry: 'resetTokenExpiry',
    notificationsSeenAt: 'notificationsSeenAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    staffRoleId: 'staffRoleId'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const StaffRoleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StaffRoleScalarFieldEnum = (typeof StaffRoleScalarFieldEnum)[keyof typeof StaffRoleScalarFieldEnum]


  export const PermissionModuleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    label: 'label',
    description: 'description'
  };

  export type PermissionModuleScalarFieldEnum = (typeof PermissionModuleScalarFieldEnum)[keyof typeof PermissionModuleScalarFieldEnum]


  export const StaffRolePermissionScalarFieldEnum: {
    staffRoleId: 'staffRoleId',
    moduleId: 'moduleId',
    create: 'create',
    read: 'read',
    update: 'update',
    delete: 'delete'
  };

  export type StaffRolePermissionScalarFieldEnum = (typeof StaffRolePermissionScalarFieldEnum)[keyof typeof StaffRolePermissionScalarFieldEnum]


  export const BeneficiaryRequestScalarFieldEnum: {
    id: 'id',
    requestNo: 'requestNo',
    userId: 'userId',
    status: 'status',
    type: 'type',
    companyNameKh: 'companyNameKh',
    companyNameEn: 'companyNameEn',
    registrationNo: 'registrationNo',
    registrationDate: 'registrationDate',
    companyProvince: 'companyProvince',
    companyDistrict: 'companyDistrict',
    companyCommune: 'companyCommune',
    companyVillage: 'companyVillage',
    companyStreet: 'companyStreet',
    companyHouse: 'companyHouse',
    companyPhone: 'companyPhone',
    companyOfficePhone: 'companyOfficePhone',
    companyEmail: 'companyEmail',
    shLastNameKh: 'shLastNameKh',
    shFirstNameKh: 'shFirstNameKh',
    shLastNameEn: 'shLastNameEn',
    shFirstNameEn: 'shFirstNameEn',
    shDob: 'shDob',
    shNationality: 'shNationality',
    shGender: 'shGender',
    shIdCard: 'shIdCard',
    shIdIssuedDate: 'shIdIssuedDate',
    shIdExpiredDate: 'shIdExpiredDate',
    shEmail: 'shEmail',
    shPhone: 'shPhone',
    shPhotoName: 'shPhotoName',
    shIdDocNames: 'shIdDocNames',
    ownerLastNameKh: 'ownerLastNameKh',
    ownerFirstNameKh: 'ownerFirstNameKh',
    ownerLastNameEn: 'ownerLastNameEn',
    ownerFirstNameEn: 'ownerFirstNameEn',
    ownerDob: 'ownerDob',
    ownerNationality: 'ownerNationality',
    ownerGender: 'ownerGender',
    ownerIdCard: 'ownerIdCard',
    ownerIdIssuedDate: 'ownerIdIssuedDate',
    ownerIdExpiredDate: 'ownerIdExpiredDate',
    ownerEmail: 'ownerEmail',
    ownerPhone: 'ownerPhone',
    ownerPhotoName: 'ownerPhotoName',
    ownerIdDocNames: 'ownerIdDocNames',
    shareAmount: 'shareAmount',
    shareholderContractDocNames: 'shareholderContractDocNames',
    otherDocNames: 'otherDocNames',
    consentAgreed: 'consentAgreed',
    rejectionReason: 'rejectionReason',
    submittedAt: 'submittedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BeneficiaryRequestScalarFieldEnum = (typeof BeneficiaryRequestScalarFieldEnum)[keyof typeof BeneficiaryRequestScalarFieldEnum]


  export const RequestLogScalarFieldEnum: {
    id: 'id',
    requestId: 'requestId',
    action: 'action',
    actorUserId: 'actorUserId',
    actorRole: 'actorRole',
    actorName: 'actorName',
    note: 'note',
    createdAt: 'createdAt'
  };

  export type RequestLogScalarFieldEnum = (typeof RequestLogScalarFieldEnum)[keyof typeof RequestLogScalarFieldEnum]


  export const RequestRevisionScalarFieldEnum: {
    id: 'id',
    requestId: 'requestId',
    editedByUserId: 'editedByUserId',
    editedByRole: 'editedByRole',
    editedByName: 'editedByName',
    previousData: 'previousData',
    newData: 'newData',
    approvedAt: 'approvedAt',
    createdAt: 'createdAt'
  };

  export type RequestRevisionScalarFieldEnum = (typeof RequestRevisionScalarFieldEnum)[keyof typeof RequestRevisionScalarFieldEnum]


  export const ActivityLogScalarFieldEnum: {
    id: 'id',
    action: 'action',
    entityType: 'entityType',
    entityId: 'entityId',
    actorUserId: 'actorUserId',
    actorRole: 'actorRole',
    actorName: 'actorName',
    note: 'note',
    createdAt: 'createdAt'
  };

  export type ActivityLogScalarFieldEnum = (typeof ActivityLogScalarFieldEnum)[keyof typeof ActivityLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'BeneficiaryRequestStatus'
   */
  export type EnumBeneficiaryRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BeneficiaryRequestStatus'>
    


  /**
   * Reference to a field of type 'Gender'
   */
  export type EnumGenderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Gender'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    companyName?: StringNullableFilter<"User"> | string | null
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    phoneNumber?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isActive?: BoolFilter<"User"> | boolean
    registrationReturnReason?: StringNullableFilter<"User"> | string | null
    registrationReturnedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    resetToken?: StringNullableFilter<"User"> | string | null
    resetTokenExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    notificationsSeenAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    staffRoleId?: IntNullableFilter<"User"> | number | null
    beneficiaryRequests?: BeneficiaryRequestListRelationFilter
    staffRole?: XOR<StaffRoleNullableScalarRelationFilter, StaffRoleWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    companyName?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    role?: SortOrder
    isActive?: SortOrder
    registrationReturnReason?: SortOrderInput | SortOrder
    registrationReturnedAt?: SortOrderInput | SortOrder
    resetToken?: SortOrderInput | SortOrder
    resetTokenExpiry?: SortOrderInput | SortOrder
    notificationsSeenAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    staffRoleId?: SortOrderInput | SortOrder
    beneficiaryRequests?: BeneficiaryRequestOrderByRelationAggregateInput
    staffRole?: StaffRoleOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    passwordHash?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    companyName?: StringNullableFilter<"User"> | string | null
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    phoneNumber?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isActive?: BoolFilter<"User"> | boolean
    registrationReturnReason?: StringNullableFilter<"User"> | string | null
    registrationReturnedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    resetToken?: StringNullableFilter<"User"> | string | null
    resetTokenExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    notificationsSeenAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    staffRoleId?: IntNullableFilter<"User"> | number | null
    beneficiaryRequests?: BeneficiaryRequestListRelationFilter
    staffRole?: XOR<StaffRoleNullableScalarRelationFilter, StaffRoleWhereInput> | null
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    companyName?: SortOrderInput | SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    role?: SortOrder
    isActive?: SortOrder
    registrationReturnReason?: SortOrderInput | SortOrder
    registrationReturnedAt?: SortOrderInput | SortOrder
    resetToken?: SortOrderInput | SortOrder
    resetTokenExpiry?: SortOrderInput | SortOrder
    notificationsSeenAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    staffRoleId?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    fullName?: StringWithAggregatesFilter<"User"> | string
    companyName?: StringNullableWithAggregatesFilter<"User"> | string | null
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    phoneNumber?: StringNullableWithAggregatesFilter<"User"> | string | null
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    registrationReturnReason?: StringNullableWithAggregatesFilter<"User"> | string | null
    registrationReturnedAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    resetToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    resetTokenExpiry?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    notificationsSeenAt?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    staffRoleId?: IntNullableWithAggregatesFilter<"User"> | number | null
  }

  export type StaffRoleWhereInput = {
    AND?: StaffRoleWhereInput | StaffRoleWhereInput[]
    OR?: StaffRoleWhereInput[]
    NOT?: StaffRoleWhereInput | StaffRoleWhereInput[]
    id?: IntFilter<"StaffRole"> | number
    name?: StringFilter<"StaffRole"> | string
    slug?: StringFilter<"StaffRole"> | string
    description?: StringNullableFilter<"StaffRole"> | string | null
    createdAt?: DateTimeFilter<"StaffRole"> | Date | string
    updatedAt?: DateTimeFilter<"StaffRole"> | Date | string
    users?: UserListRelationFilter
    permissions?: StaffRolePermissionListRelationFilter
  }

  export type StaffRoleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    users?: UserOrderByRelationAggregateInput
    permissions?: StaffRolePermissionOrderByRelationAggregateInput
  }

  export type StaffRoleWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    slug?: string
    AND?: StaffRoleWhereInput | StaffRoleWhereInput[]
    OR?: StaffRoleWhereInput[]
    NOT?: StaffRoleWhereInput | StaffRoleWhereInput[]
    description?: StringNullableFilter<"StaffRole"> | string | null
    createdAt?: DateTimeFilter<"StaffRole"> | Date | string
    updatedAt?: DateTimeFilter<"StaffRole"> | Date | string
    users?: UserListRelationFilter
    permissions?: StaffRolePermissionListRelationFilter
  }, "id" | "name" | "slug">

  export type StaffRoleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StaffRoleCountOrderByAggregateInput
    _avg?: StaffRoleAvgOrderByAggregateInput
    _max?: StaffRoleMaxOrderByAggregateInput
    _min?: StaffRoleMinOrderByAggregateInput
    _sum?: StaffRoleSumOrderByAggregateInput
  }

  export type StaffRoleScalarWhereWithAggregatesInput = {
    AND?: StaffRoleScalarWhereWithAggregatesInput | StaffRoleScalarWhereWithAggregatesInput[]
    OR?: StaffRoleScalarWhereWithAggregatesInput[]
    NOT?: StaffRoleScalarWhereWithAggregatesInput | StaffRoleScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"StaffRole"> | number
    name?: StringWithAggregatesFilter<"StaffRole"> | string
    slug?: StringWithAggregatesFilter<"StaffRole"> | string
    description?: StringNullableWithAggregatesFilter<"StaffRole"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"StaffRole"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"StaffRole"> | Date | string
  }

  export type PermissionModuleWhereInput = {
    AND?: PermissionModuleWhereInput | PermissionModuleWhereInput[]
    OR?: PermissionModuleWhereInput[]
    NOT?: PermissionModuleWhereInput | PermissionModuleWhereInput[]
    id?: IntFilter<"PermissionModule"> | number
    name?: StringFilter<"PermissionModule"> | string
    label?: StringFilter<"PermissionModule"> | string
    description?: StringNullableFilter<"PermissionModule"> | string | null
    rolePermissions?: StaffRolePermissionListRelationFilter
  }

  export type PermissionModuleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    label?: SortOrder
    description?: SortOrderInput | SortOrder
    rolePermissions?: StaffRolePermissionOrderByRelationAggregateInput
  }

  export type PermissionModuleWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: PermissionModuleWhereInput | PermissionModuleWhereInput[]
    OR?: PermissionModuleWhereInput[]
    NOT?: PermissionModuleWhereInput | PermissionModuleWhereInput[]
    label?: StringFilter<"PermissionModule"> | string
    description?: StringNullableFilter<"PermissionModule"> | string | null
    rolePermissions?: StaffRolePermissionListRelationFilter
  }, "id" | "name">

  export type PermissionModuleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    label?: SortOrder
    description?: SortOrderInput | SortOrder
    _count?: PermissionModuleCountOrderByAggregateInput
    _avg?: PermissionModuleAvgOrderByAggregateInput
    _max?: PermissionModuleMaxOrderByAggregateInput
    _min?: PermissionModuleMinOrderByAggregateInput
    _sum?: PermissionModuleSumOrderByAggregateInput
  }

  export type PermissionModuleScalarWhereWithAggregatesInput = {
    AND?: PermissionModuleScalarWhereWithAggregatesInput | PermissionModuleScalarWhereWithAggregatesInput[]
    OR?: PermissionModuleScalarWhereWithAggregatesInput[]
    NOT?: PermissionModuleScalarWhereWithAggregatesInput | PermissionModuleScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PermissionModule"> | number
    name?: StringWithAggregatesFilter<"PermissionModule"> | string
    label?: StringWithAggregatesFilter<"PermissionModule"> | string
    description?: StringNullableWithAggregatesFilter<"PermissionModule"> | string | null
  }

  export type StaffRolePermissionWhereInput = {
    AND?: StaffRolePermissionWhereInput | StaffRolePermissionWhereInput[]
    OR?: StaffRolePermissionWhereInput[]
    NOT?: StaffRolePermissionWhereInput | StaffRolePermissionWhereInput[]
    staffRoleId?: IntFilter<"StaffRolePermission"> | number
    moduleId?: IntFilter<"StaffRolePermission"> | number
    create?: BoolFilter<"StaffRolePermission"> | boolean
    read?: BoolFilter<"StaffRolePermission"> | boolean
    update?: BoolFilter<"StaffRolePermission"> | boolean
    delete?: BoolFilter<"StaffRolePermission"> | boolean
    staffRole?: XOR<StaffRoleScalarRelationFilter, StaffRoleWhereInput>
    module?: XOR<PermissionModuleScalarRelationFilter, PermissionModuleWhereInput>
  }

  export type StaffRolePermissionOrderByWithRelationInput = {
    staffRoleId?: SortOrder
    moduleId?: SortOrder
    create?: SortOrder
    read?: SortOrder
    update?: SortOrder
    delete?: SortOrder
    staffRole?: StaffRoleOrderByWithRelationInput
    module?: PermissionModuleOrderByWithRelationInput
  }

  export type StaffRolePermissionWhereUniqueInput = Prisma.AtLeast<{
    staffRoleId_moduleId?: StaffRolePermissionStaffRoleIdModuleIdCompoundUniqueInput
    AND?: StaffRolePermissionWhereInput | StaffRolePermissionWhereInput[]
    OR?: StaffRolePermissionWhereInput[]
    NOT?: StaffRolePermissionWhereInput | StaffRolePermissionWhereInput[]
    staffRoleId?: IntFilter<"StaffRolePermission"> | number
    moduleId?: IntFilter<"StaffRolePermission"> | number
    create?: BoolFilter<"StaffRolePermission"> | boolean
    read?: BoolFilter<"StaffRolePermission"> | boolean
    update?: BoolFilter<"StaffRolePermission"> | boolean
    delete?: BoolFilter<"StaffRolePermission"> | boolean
    staffRole?: XOR<StaffRoleScalarRelationFilter, StaffRoleWhereInput>
    module?: XOR<PermissionModuleScalarRelationFilter, PermissionModuleWhereInput>
  }, "staffRoleId_moduleId">

  export type StaffRolePermissionOrderByWithAggregationInput = {
    staffRoleId?: SortOrder
    moduleId?: SortOrder
    create?: SortOrder
    read?: SortOrder
    update?: SortOrder
    delete?: SortOrder
    _count?: StaffRolePermissionCountOrderByAggregateInput
    _avg?: StaffRolePermissionAvgOrderByAggregateInput
    _max?: StaffRolePermissionMaxOrderByAggregateInput
    _min?: StaffRolePermissionMinOrderByAggregateInput
    _sum?: StaffRolePermissionSumOrderByAggregateInput
  }

  export type StaffRolePermissionScalarWhereWithAggregatesInput = {
    AND?: StaffRolePermissionScalarWhereWithAggregatesInput | StaffRolePermissionScalarWhereWithAggregatesInput[]
    OR?: StaffRolePermissionScalarWhereWithAggregatesInput[]
    NOT?: StaffRolePermissionScalarWhereWithAggregatesInput | StaffRolePermissionScalarWhereWithAggregatesInput[]
    staffRoleId?: IntWithAggregatesFilter<"StaffRolePermission"> | number
    moduleId?: IntWithAggregatesFilter<"StaffRolePermission"> | number
    create?: BoolWithAggregatesFilter<"StaffRolePermission"> | boolean
    read?: BoolWithAggregatesFilter<"StaffRolePermission"> | boolean
    update?: BoolWithAggregatesFilter<"StaffRolePermission"> | boolean
    delete?: BoolWithAggregatesFilter<"StaffRolePermission"> | boolean
  }

  export type BeneficiaryRequestWhereInput = {
    AND?: BeneficiaryRequestWhereInput | BeneficiaryRequestWhereInput[]
    OR?: BeneficiaryRequestWhereInput[]
    NOT?: BeneficiaryRequestWhereInput | BeneficiaryRequestWhereInput[]
    id?: IntFilter<"BeneficiaryRequest"> | number
    requestNo?: StringFilter<"BeneficiaryRequest"> | string
    userId?: IntFilter<"BeneficiaryRequest"> | number
    status?: EnumBeneficiaryRequestStatusFilter<"BeneficiaryRequest"> | $Enums.BeneficiaryRequestStatus
    type?: StringFilter<"BeneficiaryRequest"> | string
    companyNameKh?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    companyNameEn?: StringFilter<"BeneficiaryRequest"> | string
    registrationNo?: StringFilter<"BeneficiaryRequest"> | string
    registrationDate?: DateTimeFilter<"BeneficiaryRequest"> | Date | string
    companyProvince?: StringFilter<"BeneficiaryRequest"> | string
    companyDistrict?: StringFilter<"BeneficiaryRequest"> | string
    companyCommune?: StringFilter<"BeneficiaryRequest"> | string
    companyVillage?: StringFilter<"BeneficiaryRequest"> | string
    companyStreet?: StringFilter<"BeneficiaryRequest"> | string
    companyHouse?: StringFilter<"BeneficiaryRequest"> | string
    companyPhone?: StringFilter<"BeneficiaryRequest"> | string
    companyOfficePhone?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    companyEmail?: StringFilter<"BeneficiaryRequest"> | string
    shLastNameKh?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    shFirstNameKh?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    shLastNameEn?: StringFilter<"BeneficiaryRequest"> | string
    shFirstNameEn?: StringFilter<"BeneficiaryRequest"> | string
    shDob?: DateTimeFilter<"BeneficiaryRequest"> | Date | string
    shNationality?: StringFilter<"BeneficiaryRequest"> | string
    shGender?: EnumGenderFilter<"BeneficiaryRequest"> | $Enums.Gender
    shIdCard?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    shIdIssuedDate?: DateTimeNullableFilter<"BeneficiaryRequest"> | Date | string | null
    shIdExpiredDate?: DateTimeNullableFilter<"BeneficiaryRequest"> | Date | string | null
    shEmail?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    shPhone?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    shPhotoName?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    shIdDocNames?: StringFilter<"BeneficiaryRequest"> | string
    ownerLastNameKh?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    ownerFirstNameKh?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    ownerLastNameEn?: StringFilter<"BeneficiaryRequest"> | string
    ownerFirstNameEn?: StringFilter<"BeneficiaryRequest"> | string
    ownerDob?: DateTimeFilter<"BeneficiaryRequest"> | Date | string
    ownerNationality?: StringFilter<"BeneficiaryRequest"> | string
    ownerGender?: EnumGenderFilter<"BeneficiaryRequest"> | $Enums.Gender
    ownerIdCard?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    ownerIdIssuedDate?: DateTimeNullableFilter<"BeneficiaryRequest"> | Date | string | null
    ownerIdExpiredDate?: DateTimeNullableFilter<"BeneficiaryRequest"> | Date | string | null
    ownerEmail?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    ownerPhone?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    ownerPhotoName?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    ownerIdDocNames?: StringFilter<"BeneficiaryRequest"> | string
    shareAmount?: StringFilter<"BeneficiaryRequest"> | string
    shareholderContractDocNames?: StringFilter<"BeneficiaryRequest"> | string
    otherDocNames?: StringFilter<"BeneficiaryRequest"> | string
    consentAgreed?: BoolFilter<"BeneficiaryRequest"> | boolean
    rejectionReason?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    submittedAt?: DateTimeFilter<"BeneficiaryRequest"> | Date | string
    createdAt?: DateTimeFilter<"BeneficiaryRequest"> | Date | string
    updatedAt?: DateTimeFilter<"BeneficiaryRequest"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    logs?: RequestLogListRelationFilter
    revisions?: RequestRevisionListRelationFilter
  }

  export type BeneficiaryRequestOrderByWithRelationInput = {
    id?: SortOrder
    requestNo?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    type?: SortOrder
    companyNameKh?: SortOrderInput | SortOrder
    companyNameEn?: SortOrder
    registrationNo?: SortOrder
    registrationDate?: SortOrder
    companyProvince?: SortOrder
    companyDistrict?: SortOrder
    companyCommune?: SortOrder
    companyVillage?: SortOrder
    companyStreet?: SortOrder
    companyHouse?: SortOrder
    companyPhone?: SortOrder
    companyOfficePhone?: SortOrderInput | SortOrder
    companyEmail?: SortOrder
    shLastNameKh?: SortOrderInput | SortOrder
    shFirstNameKh?: SortOrderInput | SortOrder
    shLastNameEn?: SortOrder
    shFirstNameEn?: SortOrder
    shDob?: SortOrder
    shNationality?: SortOrder
    shGender?: SortOrder
    shIdCard?: SortOrderInput | SortOrder
    shIdIssuedDate?: SortOrderInput | SortOrder
    shIdExpiredDate?: SortOrderInput | SortOrder
    shEmail?: SortOrderInput | SortOrder
    shPhone?: SortOrderInput | SortOrder
    shPhotoName?: SortOrderInput | SortOrder
    shIdDocNames?: SortOrder
    ownerLastNameKh?: SortOrderInput | SortOrder
    ownerFirstNameKh?: SortOrderInput | SortOrder
    ownerLastNameEn?: SortOrder
    ownerFirstNameEn?: SortOrder
    ownerDob?: SortOrder
    ownerNationality?: SortOrder
    ownerGender?: SortOrder
    ownerIdCard?: SortOrderInput | SortOrder
    ownerIdIssuedDate?: SortOrderInput | SortOrder
    ownerIdExpiredDate?: SortOrderInput | SortOrder
    ownerEmail?: SortOrderInput | SortOrder
    ownerPhone?: SortOrderInput | SortOrder
    ownerPhotoName?: SortOrderInput | SortOrder
    ownerIdDocNames?: SortOrder
    shareAmount?: SortOrder
    shareholderContractDocNames?: SortOrder
    otherDocNames?: SortOrder
    consentAgreed?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    submittedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    logs?: RequestLogOrderByRelationAggregateInput
    revisions?: RequestRevisionOrderByRelationAggregateInput
  }

  export type BeneficiaryRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    requestNo?: string
    AND?: BeneficiaryRequestWhereInput | BeneficiaryRequestWhereInput[]
    OR?: BeneficiaryRequestWhereInput[]
    NOT?: BeneficiaryRequestWhereInput | BeneficiaryRequestWhereInput[]
    userId?: IntFilter<"BeneficiaryRequest"> | number
    status?: EnumBeneficiaryRequestStatusFilter<"BeneficiaryRequest"> | $Enums.BeneficiaryRequestStatus
    type?: StringFilter<"BeneficiaryRequest"> | string
    companyNameKh?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    companyNameEn?: StringFilter<"BeneficiaryRequest"> | string
    registrationNo?: StringFilter<"BeneficiaryRequest"> | string
    registrationDate?: DateTimeFilter<"BeneficiaryRequest"> | Date | string
    companyProvince?: StringFilter<"BeneficiaryRequest"> | string
    companyDistrict?: StringFilter<"BeneficiaryRequest"> | string
    companyCommune?: StringFilter<"BeneficiaryRequest"> | string
    companyVillage?: StringFilter<"BeneficiaryRequest"> | string
    companyStreet?: StringFilter<"BeneficiaryRequest"> | string
    companyHouse?: StringFilter<"BeneficiaryRequest"> | string
    companyPhone?: StringFilter<"BeneficiaryRequest"> | string
    companyOfficePhone?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    companyEmail?: StringFilter<"BeneficiaryRequest"> | string
    shLastNameKh?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    shFirstNameKh?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    shLastNameEn?: StringFilter<"BeneficiaryRequest"> | string
    shFirstNameEn?: StringFilter<"BeneficiaryRequest"> | string
    shDob?: DateTimeFilter<"BeneficiaryRequest"> | Date | string
    shNationality?: StringFilter<"BeneficiaryRequest"> | string
    shGender?: EnumGenderFilter<"BeneficiaryRequest"> | $Enums.Gender
    shIdCard?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    shIdIssuedDate?: DateTimeNullableFilter<"BeneficiaryRequest"> | Date | string | null
    shIdExpiredDate?: DateTimeNullableFilter<"BeneficiaryRequest"> | Date | string | null
    shEmail?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    shPhone?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    shPhotoName?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    shIdDocNames?: StringFilter<"BeneficiaryRequest"> | string
    ownerLastNameKh?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    ownerFirstNameKh?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    ownerLastNameEn?: StringFilter<"BeneficiaryRequest"> | string
    ownerFirstNameEn?: StringFilter<"BeneficiaryRequest"> | string
    ownerDob?: DateTimeFilter<"BeneficiaryRequest"> | Date | string
    ownerNationality?: StringFilter<"BeneficiaryRequest"> | string
    ownerGender?: EnumGenderFilter<"BeneficiaryRequest"> | $Enums.Gender
    ownerIdCard?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    ownerIdIssuedDate?: DateTimeNullableFilter<"BeneficiaryRequest"> | Date | string | null
    ownerIdExpiredDate?: DateTimeNullableFilter<"BeneficiaryRequest"> | Date | string | null
    ownerEmail?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    ownerPhone?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    ownerPhotoName?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    ownerIdDocNames?: StringFilter<"BeneficiaryRequest"> | string
    shareAmount?: StringFilter<"BeneficiaryRequest"> | string
    shareholderContractDocNames?: StringFilter<"BeneficiaryRequest"> | string
    otherDocNames?: StringFilter<"BeneficiaryRequest"> | string
    consentAgreed?: BoolFilter<"BeneficiaryRequest"> | boolean
    rejectionReason?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    submittedAt?: DateTimeFilter<"BeneficiaryRequest"> | Date | string
    createdAt?: DateTimeFilter<"BeneficiaryRequest"> | Date | string
    updatedAt?: DateTimeFilter<"BeneficiaryRequest"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    logs?: RequestLogListRelationFilter
    revisions?: RequestRevisionListRelationFilter
  }, "id" | "requestNo">

  export type BeneficiaryRequestOrderByWithAggregationInput = {
    id?: SortOrder
    requestNo?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    type?: SortOrder
    companyNameKh?: SortOrderInput | SortOrder
    companyNameEn?: SortOrder
    registrationNo?: SortOrder
    registrationDate?: SortOrder
    companyProvince?: SortOrder
    companyDistrict?: SortOrder
    companyCommune?: SortOrder
    companyVillage?: SortOrder
    companyStreet?: SortOrder
    companyHouse?: SortOrder
    companyPhone?: SortOrder
    companyOfficePhone?: SortOrderInput | SortOrder
    companyEmail?: SortOrder
    shLastNameKh?: SortOrderInput | SortOrder
    shFirstNameKh?: SortOrderInput | SortOrder
    shLastNameEn?: SortOrder
    shFirstNameEn?: SortOrder
    shDob?: SortOrder
    shNationality?: SortOrder
    shGender?: SortOrder
    shIdCard?: SortOrderInput | SortOrder
    shIdIssuedDate?: SortOrderInput | SortOrder
    shIdExpiredDate?: SortOrderInput | SortOrder
    shEmail?: SortOrderInput | SortOrder
    shPhone?: SortOrderInput | SortOrder
    shPhotoName?: SortOrderInput | SortOrder
    shIdDocNames?: SortOrder
    ownerLastNameKh?: SortOrderInput | SortOrder
    ownerFirstNameKh?: SortOrderInput | SortOrder
    ownerLastNameEn?: SortOrder
    ownerFirstNameEn?: SortOrder
    ownerDob?: SortOrder
    ownerNationality?: SortOrder
    ownerGender?: SortOrder
    ownerIdCard?: SortOrderInput | SortOrder
    ownerIdIssuedDate?: SortOrderInput | SortOrder
    ownerIdExpiredDate?: SortOrderInput | SortOrder
    ownerEmail?: SortOrderInput | SortOrder
    ownerPhone?: SortOrderInput | SortOrder
    ownerPhotoName?: SortOrderInput | SortOrder
    ownerIdDocNames?: SortOrder
    shareAmount?: SortOrder
    shareholderContractDocNames?: SortOrder
    otherDocNames?: SortOrder
    consentAgreed?: SortOrder
    rejectionReason?: SortOrderInput | SortOrder
    submittedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BeneficiaryRequestCountOrderByAggregateInput
    _avg?: BeneficiaryRequestAvgOrderByAggregateInput
    _max?: BeneficiaryRequestMaxOrderByAggregateInput
    _min?: BeneficiaryRequestMinOrderByAggregateInput
    _sum?: BeneficiaryRequestSumOrderByAggregateInput
  }

  export type BeneficiaryRequestScalarWhereWithAggregatesInput = {
    AND?: BeneficiaryRequestScalarWhereWithAggregatesInput | BeneficiaryRequestScalarWhereWithAggregatesInput[]
    OR?: BeneficiaryRequestScalarWhereWithAggregatesInput[]
    NOT?: BeneficiaryRequestScalarWhereWithAggregatesInput | BeneficiaryRequestScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"BeneficiaryRequest"> | number
    requestNo?: StringWithAggregatesFilter<"BeneficiaryRequest"> | string
    userId?: IntWithAggregatesFilter<"BeneficiaryRequest"> | number
    status?: EnumBeneficiaryRequestStatusWithAggregatesFilter<"BeneficiaryRequest"> | $Enums.BeneficiaryRequestStatus
    type?: StringWithAggregatesFilter<"BeneficiaryRequest"> | string
    companyNameKh?: StringNullableWithAggregatesFilter<"BeneficiaryRequest"> | string | null
    companyNameEn?: StringWithAggregatesFilter<"BeneficiaryRequest"> | string
    registrationNo?: StringWithAggregatesFilter<"BeneficiaryRequest"> | string
    registrationDate?: DateTimeWithAggregatesFilter<"BeneficiaryRequest"> | Date | string
    companyProvince?: StringWithAggregatesFilter<"BeneficiaryRequest"> | string
    companyDistrict?: StringWithAggregatesFilter<"BeneficiaryRequest"> | string
    companyCommune?: StringWithAggregatesFilter<"BeneficiaryRequest"> | string
    companyVillage?: StringWithAggregatesFilter<"BeneficiaryRequest"> | string
    companyStreet?: StringWithAggregatesFilter<"BeneficiaryRequest"> | string
    companyHouse?: StringWithAggregatesFilter<"BeneficiaryRequest"> | string
    companyPhone?: StringWithAggregatesFilter<"BeneficiaryRequest"> | string
    companyOfficePhone?: StringNullableWithAggregatesFilter<"BeneficiaryRequest"> | string | null
    companyEmail?: StringWithAggregatesFilter<"BeneficiaryRequest"> | string
    shLastNameKh?: StringNullableWithAggregatesFilter<"BeneficiaryRequest"> | string | null
    shFirstNameKh?: StringNullableWithAggregatesFilter<"BeneficiaryRequest"> | string | null
    shLastNameEn?: StringWithAggregatesFilter<"BeneficiaryRequest"> | string
    shFirstNameEn?: StringWithAggregatesFilter<"BeneficiaryRequest"> | string
    shDob?: DateTimeWithAggregatesFilter<"BeneficiaryRequest"> | Date | string
    shNationality?: StringWithAggregatesFilter<"BeneficiaryRequest"> | string
    shGender?: EnumGenderWithAggregatesFilter<"BeneficiaryRequest"> | $Enums.Gender
    shIdCard?: StringNullableWithAggregatesFilter<"BeneficiaryRequest"> | string | null
    shIdIssuedDate?: DateTimeNullableWithAggregatesFilter<"BeneficiaryRequest"> | Date | string | null
    shIdExpiredDate?: DateTimeNullableWithAggregatesFilter<"BeneficiaryRequest"> | Date | string | null
    shEmail?: StringNullableWithAggregatesFilter<"BeneficiaryRequest"> | string | null
    shPhone?: StringNullableWithAggregatesFilter<"BeneficiaryRequest"> | string | null
    shPhotoName?: StringNullableWithAggregatesFilter<"BeneficiaryRequest"> | string | null
    shIdDocNames?: StringWithAggregatesFilter<"BeneficiaryRequest"> | string
    ownerLastNameKh?: StringNullableWithAggregatesFilter<"BeneficiaryRequest"> | string | null
    ownerFirstNameKh?: StringNullableWithAggregatesFilter<"BeneficiaryRequest"> | string | null
    ownerLastNameEn?: StringWithAggregatesFilter<"BeneficiaryRequest"> | string
    ownerFirstNameEn?: StringWithAggregatesFilter<"BeneficiaryRequest"> | string
    ownerDob?: DateTimeWithAggregatesFilter<"BeneficiaryRequest"> | Date | string
    ownerNationality?: StringWithAggregatesFilter<"BeneficiaryRequest"> | string
    ownerGender?: EnumGenderWithAggregatesFilter<"BeneficiaryRequest"> | $Enums.Gender
    ownerIdCard?: StringNullableWithAggregatesFilter<"BeneficiaryRequest"> | string | null
    ownerIdIssuedDate?: DateTimeNullableWithAggregatesFilter<"BeneficiaryRequest"> | Date | string | null
    ownerIdExpiredDate?: DateTimeNullableWithAggregatesFilter<"BeneficiaryRequest"> | Date | string | null
    ownerEmail?: StringNullableWithAggregatesFilter<"BeneficiaryRequest"> | string | null
    ownerPhone?: StringNullableWithAggregatesFilter<"BeneficiaryRequest"> | string | null
    ownerPhotoName?: StringNullableWithAggregatesFilter<"BeneficiaryRequest"> | string | null
    ownerIdDocNames?: StringWithAggregatesFilter<"BeneficiaryRequest"> | string
    shareAmount?: StringWithAggregatesFilter<"BeneficiaryRequest"> | string
    shareholderContractDocNames?: StringWithAggregatesFilter<"BeneficiaryRequest"> | string
    otherDocNames?: StringWithAggregatesFilter<"BeneficiaryRequest"> | string
    consentAgreed?: BoolWithAggregatesFilter<"BeneficiaryRequest"> | boolean
    rejectionReason?: StringNullableWithAggregatesFilter<"BeneficiaryRequest"> | string | null
    submittedAt?: DateTimeWithAggregatesFilter<"BeneficiaryRequest"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"BeneficiaryRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BeneficiaryRequest"> | Date | string
  }

  export type RequestLogWhereInput = {
    AND?: RequestLogWhereInput | RequestLogWhereInput[]
    OR?: RequestLogWhereInput[]
    NOT?: RequestLogWhereInput | RequestLogWhereInput[]
    id?: IntFilter<"RequestLog"> | number
    requestId?: IntFilter<"RequestLog"> | number
    action?: StringFilter<"RequestLog"> | string
    actorUserId?: IntFilter<"RequestLog"> | number
    actorRole?: EnumRoleFilter<"RequestLog"> | $Enums.Role
    actorName?: StringFilter<"RequestLog"> | string
    note?: StringNullableFilter<"RequestLog"> | string | null
    createdAt?: DateTimeFilter<"RequestLog"> | Date | string
    request?: XOR<BeneficiaryRequestScalarRelationFilter, BeneficiaryRequestWhereInput>
  }

  export type RequestLogOrderByWithRelationInput = {
    id?: SortOrder
    requestId?: SortOrder
    action?: SortOrder
    actorUserId?: SortOrder
    actorRole?: SortOrder
    actorName?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    request?: BeneficiaryRequestOrderByWithRelationInput
  }

  export type RequestLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RequestLogWhereInput | RequestLogWhereInput[]
    OR?: RequestLogWhereInput[]
    NOT?: RequestLogWhereInput | RequestLogWhereInput[]
    requestId?: IntFilter<"RequestLog"> | number
    action?: StringFilter<"RequestLog"> | string
    actorUserId?: IntFilter<"RequestLog"> | number
    actorRole?: EnumRoleFilter<"RequestLog"> | $Enums.Role
    actorName?: StringFilter<"RequestLog"> | string
    note?: StringNullableFilter<"RequestLog"> | string | null
    createdAt?: DateTimeFilter<"RequestLog"> | Date | string
    request?: XOR<BeneficiaryRequestScalarRelationFilter, BeneficiaryRequestWhereInput>
  }, "id">

  export type RequestLogOrderByWithAggregationInput = {
    id?: SortOrder
    requestId?: SortOrder
    action?: SortOrder
    actorUserId?: SortOrder
    actorRole?: SortOrder
    actorName?: SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: RequestLogCountOrderByAggregateInput
    _avg?: RequestLogAvgOrderByAggregateInput
    _max?: RequestLogMaxOrderByAggregateInput
    _min?: RequestLogMinOrderByAggregateInput
    _sum?: RequestLogSumOrderByAggregateInput
  }

  export type RequestLogScalarWhereWithAggregatesInput = {
    AND?: RequestLogScalarWhereWithAggregatesInput | RequestLogScalarWhereWithAggregatesInput[]
    OR?: RequestLogScalarWhereWithAggregatesInput[]
    NOT?: RequestLogScalarWhereWithAggregatesInput | RequestLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RequestLog"> | number
    requestId?: IntWithAggregatesFilter<"RequestLog"> | number
    action?: StringWithAggregatesFilter<"RequestLog"> | string
    actorUserId?: IntWithAggregatesFilter<"RequestLog"> | number
    actorRole?: EnumRoleWithAggregatesFilter<"RequestLog"> | $Enums.Role
    actorName?: StringWithAggregatesFilter<"RequestLog"> | string
    note?: StringNullableWithAggregatesFilter<"RequestLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RequestLog"> | Date | string
  }

  export type RequestRevisionWhereInput = {
    AND?: RequestRevisionWhereInput | RequestRevisionWhereInput[]
    OR?: RequestRevisionWhereInput[]
    NOT?: RequestRevisionWhereInput | RequestRevisionWhereInput[]
    id?: IntFilter<"RequestRevision"> | number
    requestId?: IntFilter<"RequestRevision"> | number
    editedByUserId?: IntFilter<"RequestRevision"> | number
    editedByRole?: EnumRoleFilter<"RequestRevision"> | $Enums.Role
    editedByName?: StringFilter<"RequestRevision"> | string
    previousData?: StringFilter<"RequestRevision"> | string
    newData?: StringFilter<"RequestRevision"> | string
    approvedAt?: DateTimeNullableFilter<"RequestRevision"> | Date | string | null
    createdAt?: DateTimeFilter<"RequestRevision"> | Date | string
    request?: XOR<BeneficiaryRequestScalarRelationFilter, BeneficiaryRequestWhereInput>
  }

  export type RequestRevisionOrderByWithRelationInput = {
    id?: SortOrder
    requestId?: SortOrder
    editedByUserId?: SortOrder
    editedByRole?: SortOrder
    editedByName?: SortOrder
    previousData?: SortOrder
    newData?: SortOrder
    approvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    request?: BeneficiaryRequestOrderByWithRelationInput
  }

  export type RequestRevisionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: RequestRevisionWhereInput | RequestRevisionWhereInput[]
    OR?: RequestRevisionWhereInput[]
    NOT?: RequestRevisionWhereInput | RequestRevisionWhereInput[]
    requestId?: IntFilter<"RequestRevision"> | number
    editedByUserId?: IntFilter<"RequestRevision"> | number
    editedByRole?: EnumRoleFilter<"RequestRevision"> | $Enums.Role
    editedByName?: StringFilter<"RequestRevision"> | string
    previousData?: StringFilter<"RequestRevision"> | string
    newData?: StringFilter<"RequestRevision"> | string
    approvedAt?: DateTimeNullableFilter<"RequestRevision"> | Date | string | null
    createdAt?: DateTimeFilter<"RequestRevision"> | Date | string
    request?: XOR<BeneficiaryRequestScalarRelationFilter, BeneficiaryRequestWhereInput>
  }, "id">

  export type RequestRevisionOrderByWithAggregationInput = {
    id?: SortOrder
    requestId?: SortOrder
    editedByUserId?: SortOrder
    editedByRole?: SortOrder
    editedByName?: SortOrder
    previousData?: SortOrder
    newData?: SortOrder
    approvedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: RequestRevisionCountOrderByAggregateInput
    _avg?: RequestRevisionAvgOrderByAggregateInput
    _max?: RequestRevisionMaxOrderByAggregateInput
    _min?: RequestRevisionMinOrderByAggregateInput
    _sum?: RequestRevisionSumOrderByAggregateInput
  }

  export type RequestRevisionScalarWhereWithAggregatesInput = {
    AND?: RequestRevisionScalarWhereWithAggregatesInput | RequestRevisionScalarWhereWithAggregatesInput[]
    OR?: RequestRevisionScalarWhereWithAggregatesInput[]
    NOT?: RequestRevisionScalarWhereWithAggregatesInput | RequestRevisionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RequestRevision"> | number
    requestId?: IntWithAggregatesFilter<"RequestRevision"> | number
    editedByUserId?: IntWithAggregatesFilter<"RequestRevision"> | number
    editedByRole?: EnumRoleWithAggregatesFilter<"RequestRevision"> | $Enums.Role
    editedByName?: StringWithAggregatesFilter<"RequestRevision"> | string
    previousData?: StringWithAggregatesFilter<"RequestRevision"> | string
    newData?: StringWithAggregatesFilter<"RequestRevision"> | string
    approvedAt?: DateTimeNullableWithAggregatesFilter<"RequestRevision"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RequestRevision"> | Date | string
  }

  export type ActivityLogWhereInput = {
    AND?: ActivityLogWhereInput | ActivityLogWhereInput[]
    OR?: ActivityLogWhereInput[]
    NOT?: ActivityLogWhereInput | ActivityLogWhereInput[]
    id?: IntFilter<"ActivityLog"> | number
    action?: StringFilter<"ActivityLog"> | string
    entityType?: StringNullableFilter<"ActivityLog"> | string | null
    entityId?: IntNullableFilter<"ActivityLog"> | number | null
    actorUserId?: IntNullableFilter<"ActivityLog"> | number | null
    actorRole?: EnumRoleNullableFilter<"ActivityLog"> | $Enums.Role | null
    actorName?: StringNullableFilter<"ActivityLog"> | string | null
    note?: StringNullableFilter<"ActivityLog"> | string | null
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
  }

  export type ActivityLogOrderByWithRelationInput = {
    id?: SortOrder
    action?: SortOrder
    entityType?: SortOrderInput | SortOrder
    entityId?: SortOrderInput | SortOrder
    actorUserId?: SortOrderInput | SortOrder
    actorRole?: SortOrderInput | SortOrder
    actorName?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type ActivityLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ActivityLogWhereInput | ActivityLogWhereInput[]
    OR?: ActivityLogWhereInput[]
    NOT?: ActivityLogWhereInput | ActivityLogWhereInput[]
    action?: StringFilter<"ActivityLog"> | string
    entityType?: StringNullableFilter<"ActivityLog"> | string | null
    entityId?: IntNullableFilter<"ActivityLog"> | number | null
    actorUserId?: IntNullableFilter<"ActivityLog"> | number | null
    actorRole?: EnumRoleNullableFilter<"ActivityLog"> | $Enums.Role | null
    actorName?: StringNullableFilter<"ActivityLog"> | string | null
    note?: StringNullableFilter<"ActivityLog"> | string | null
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
  }, "id">

  export type ActivityLogOrderByWithAggregationInput = {
    id?: SortOrder
    action?: SortOrder
    entityType?: SortOrderInput | SortOrder
    entityId?: SortOrderInput | SortOrder
    actorUserId?: SortOrderInput | SortOrder
    actorRole?: SortOrderInput | SortOrder
    actorName?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ActivityLogCountOrderByAggregateInput
    _avg?: ActivityLogAvgOrderByAggregateInput
    _max?: ActivityLogMaxOrderByAggregateInput
    _min?: ActivityLogMinOrderByAggregateInput
    _sum?: ActivityLogSumOrderByAggregateInput
  }

  export type ActivityLogScalarWhereWithAggregatesInput = {
    AND?: ActivityLogScalarWhereWithAggregatesInput | ActivityLogScalarWhereWithAggregatesInput[]
    OR?: ActivityLogScalarWhereWithAggregatesInput[]
    NOT?: ActivityLogScalarWhereWithAggregatesInput | ActivityLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"ActivityLog"> | number
    action?: StringWithAggregatesFilter<"ActivityLog"> | string
    entityType?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    entityId?: IntNullableWithAggregatesFilter<"ActivityLog"> | number | null
    actorUserId?: IntNullableWithAggregatesFilter<"ActivityLog"> | number | null
    actorRole?: EnumRoleNullableWithAggregatesFilter<"ActivityLog"> | $Enums.Role | null
    actorName?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    note?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ActivityLog"> | Date | string
  }

  export type UserCreateInput = {
    username: string
    email: string
    passwordHash: string
    fullName: string
    companyName?: string | null
    firstName?: string | null
    lastName?: string | null
    phoneNumber?: string | null
    role?: $Enums.Role
    isActive?: boolean
    registrationReturnReason?: string | null
    registrationReturnedAt?: Date | string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    notificationsSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    beneficiaryRequests?: BeneficiaryRequestCreateNestedManyWithoutUserInput
    staffRole?: StaffRoleCreateNestedOneWithoutUsersInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    username: string
    email: string
    passwordHash: string
    fullName: string
    companyName?: string | null
    firstName?: string | null
    lastName?: string | null
    phoneNumber?: string | null
    role?: $Enums.Role
    isActive?: boolean
    registrationReturnReason?: string | null
    registrationReturnedAt?: Date | string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    notificationsSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    staffRoleId?: number | null
    beneficiaryRequests?: BeneficiaryRequestUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    registrationReturnReason?: NullableStringFieldUpdateOperationsInput | string | null
    registrationReturnedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notificationsSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    beneficiaryRequests?: BeneficiaryRequestUpdateManyWithoutUserNestedInput
    staffRole?: StaffRoleUpdateOneWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    registrationReturnReason?: NullableStringFieldUpdateOperationsInput | string | null
    registrationReturnedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notificationsSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    staffRoleId?: NullableIntFieldUpdateOperationsInput | number | null
    beneficiaryRequests?: BeneficiaryRequestUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    username: string
    email: string
    passwordHash: string
    fullName: string
    companyName?: string | null
    firstName?: string | null
    lastName?: string | null
    phoneNumber?: string | null
    role?: $Enums.Role
    isActive?: boolean
    registrationReturnReason?: string | null
    registrationReturnedAt?: Date | string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    notificationsSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    staffRoleId?: number | null
  }

  export type UserUpdateManyMutationInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    registrationReturnReason?: NullableStringFieldUpdateOperationsInput | string | null
    registrationReturnedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notificationsSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    registrationReturnReason?: NullableStringFieldUpdateOperationsInput | string | null
    registrationReturnedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notificationsSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    staffRoleId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type StaffRoleCreateInput = {
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutStaffRoleInput
    permissions?: StaffRolePermissionCreateNestedManyWithoutStaffRoleInput
  }

  export type StaffRoleUncheckedCreateInput = {
    id?: number
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutStaffRoleInput
    permissions?: StaffRolePermissionUncheckedCreateNestedManyWithoutStaffRoleInput
  }

  export type StaffRoleUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutStaffRoleNestedInput
    permissions?: StaffRolePermissionUpdateManyWithoutStaffRoleNestedInput
  }

  export type StaffRoleUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutStaffRoleNestedInput
    permissions?: StaffRolePermissionUncheckedUpdateManyWithoutStaffRoleNestedInput
  }

  export type StaffRoleCreateManyInput = {
    id?: number
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StaffRoleUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffRoleUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PermissionModuleCreateInput = {
    name: string
    label: string
    description?: string | null
    rolePermissions?: StaffRolePermissionCreateNestedManyWithoutModuleInput
  }

  export type PermissionModuleUncheckedCreateInput = {
    id?: number
    name: string
    label: string
    description?: string | null
    rolePermissions?: StaffRolePermissionUncheckedCreateNestedManyWithoutModuleInput
  }

  export type PermissionModuleUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rolePermissions?: StaffRolePermissionUpdateManyWithoutModuleNestedInput
  }

  export type PermissionModuleUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    rolePermissions?: StaffRolePermissionUncheckedUpdateManyWithoutModuleNestedInput
  }

  export type PermissionModuleCreateManyInput = {
    id?: number
    name: string
    label: string
    description?: string | null
  }

  export type PermissionModuleUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PermissionModuleUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StaffRolePermissionCreateInput = {
    create?: boolean
    read?: boolean
    update?: boolean
    delete?: boolean
    staffRole: StaffRoleCreateNestedOneWithoutPermissionsInput
    module: PermissionModuleCreateNestedOneWithoutRolePermissionsInput
  }

  export type StaffRolePermissionUncheckedCreateInput = {
    staffRoleId: number
    moduleId: number
    create?: boolean
    read?: boolean
    update?: boolean
    delete?: boolean
  }

  export type StaffRolePermissionUpdateInput = {
    create?: BoolFieldUpdateOperationsInput | boolean
    read?: BoolFieldUpdateOperationsInput | boolean
    update?: BoolFieldUpdateOperationsInput | boolean
    delete?: BoolFieldUpdateOperationsInput | boolean
    staffRole?: StaffRoleUpdateOneRequiredWithoutPermissionsNestedInput
    module?: PermissionModuleUpdateOneRequiredWithoutRolePermissionsNestedInput
  }

  export type StaffRolePermissionUncheckedUpdateInput = {
    staffRoleId?: IntFieldUpdateOperationsInput | number
    moduleId?: IntFieldUpdateOperationsInput | number
    create?: BoolFieldUpdateOperationsInput | boolean
    read?: BoolFieldUpdateOperationsInput | boolean
    update?: BoolFieldUpdateOperationsInput | boolean
    delete?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StaffRolePermissionCreateManyInput = {
    staffRoleId: number
    moduleId: number
    create?: boolean
    read?: boolean
    update?: boolean
    delete?: boolean
  }

  export type StaffRolePermissionUpdateManyMutationInput = {
    create?: BoolFieldUpdateOperationsInput | boolean
    read?: BoolFieldUpdateOperationsInput | boolean
    update?: BoolFieldUpdateOperationsInput | boolean
    delete?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StaffRolePermissionUncheckedUpdateManyInput = {
    staffRoleId?: IntFieldUpdateOperationsInput | number
    moduleId?: IntFieldUpdateOperationsInput | number
    create?: BoolFieldUpdateOperationsInput | boolean
    read?: BoolFieldUpdateOperationsInput | boolean
    update?: BoolFieldUpdateOperationsInput | boolean
    delete?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BeneficiaryRequestCreateInput = {
    requestNo: string
    status?: $Enums.BeneficiaryRequestStatus
    type?: string
    companyNameKh?: string | null
    companyNameEn: string
    registrationNo: string
    registrationDate: Date | string
    companyProvince: string
    companyDistrict: string
    companyCommune: string
    companyVillage: string
    companyStreet: string
    companyHouse: string
    companyPhone: string
    companyOfficePhone?: string | null
    companyEmail: string
    shLastNameKh?: string | null
    shFirstNameKh?: string | null
    shLastNameEn: string
    shFirstNameEn: string
    shDob: Date | string
    shNationality: string
    shGender: $Enums.Gender
    shIdCard?: string | null
    shIdIssuedDate?: Date | string | null
    shIdExpiredDate?: Date | string | null
    shEmail?: string | null
    shPhone?: string | null
    shPhotoName?: string | null
    shIdDocNames?: string
    ownerLastNameKh?: string | null
    ownerFirstNameKh?: string | null
    ownerLastNameEn: string
    ownerFirstNameEn: string
    ownerDob: Date | string
    ownerNationality: string
    ownerGender: $Enums.Gender
    ownerIdCard?: string | null
    ownerIdIssuedDate?: Date | string | null
    ownerIdExpiredDate?: Date | string | null
    ownerEmail?: string | null
    ownerPhone?: string | null
    ownerPhotoName?: string | null
    ownerIdDocNames?: string
    shareAmount: string
    shareholderContractDocNames?: string
    otherDocNames?: string
    consentAgreed?: boolean
    rejectionReason?: string | null
    submittedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutBeneficiaryRequestsInput
    logs?: RequestLogCreateNestedManyWithoutRequestInput
    revisions?: RequestRevisionCreateNestedManyWithoutRequestInput
  }

  export type BeneficiaryRequestUncheckedCreateInput = {
    id?: number
    requestNo: string
    userId: number
    status?: $Enums.BeneficiaryRequestStatus
    type?: string
    companyNameKh?: string | null
    companyNameEn: string
    registrationNo: string
    registrationDate: Date | string
    companyProvince: string
    companyDistrict: string
    companyCommune: string
    companyVillage: string
    companyStreet: string
    companyHouse: string
    companyPhone: string
    companyOfficePhone?: string | null
    companyEmail: string
    shLastNameKh?: string | null
    shFirstNameKh?: string | null
    shLastNameEn: string
    shFirstNameEn: string
    shDob: Date | string
    shNationality: string
    shGender: $Enums.Gender
    shIdCard?: string | null
    shIdIssuedDate?: Date | string | null
    shIdExpiredDate?: Date | string | null
    shEmail?: string | null
    shPhone?: string | null
    shPhotoName?: string | null
    shIdDocNames?: string
    ownerLastNameKh?: string | null
    ownerFirstNameKh?: string | null
    ownerLastNameEn: string
    ownerFirstNameEn: string
    ownerDob: Date | string
    ownerNationality: string
    ownerGender: $Enums.Gender
    ownerIdCard?: string | null
    ownerIdIssuedDate?: Date | string | null
    ownerIdExpiredDate?: Date | string | null
    ownerEmail?: string | null
    ownerPhone?: string | null
    ownerPhotoName?: string | null
    ownerIdDocNames?: string
    shareAmount: string
    shareholderContractDocNames?: string
    otherDocNames?: string
    consentAgreed?: boolean
    rejectionReason?: string | null
    submittedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    logs?: RequestLogUncheckedCreateNestedManyWithoutRequestInput
    revisions?: RequestRevisionUncheckedCreateNestedManyWithoutRequestInput
  }

  export type BeneficiaryRequestUpdateInput = {
    requestNo?: StringFieldUpdateOperationsInput | string
    status?: EnumBeneficiaryRequestStatusFieldUpdateOperationsInput | $Enums.BeneficiaryRequestStatus
    type?: StringFieldUpdateOperationsInput | string
    companyNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    companyNameEn?: StringFieldUpdateOperationsInput | string
    registrationNo?: StringFieldUpdateOperationsInput | string
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    companyProvince?: StringFieldUpdateOperationsInput | string
    companyDistrict?: StringFieldUpdateOperationsInput | string
    companyCommune?: StringFieldUpdateOperationsInput | string
    companyVillage?: StringFieldUpdateOperationsInput | string
    companyStreet?: StringFieldUpdateOperationsInput | string
    companyHouse?: StringFieldUpdateOperationsInput | string
    companyPhone?: StringFieldUpdateOperationsInput | string
    companyOfficePhone?: NullableStringFieldUpdateOperationsInput | string | null
    companyEmail?: StringFieldUpdateOperationsInput | string
    shLastNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    shFirstNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    shLastNameEn?: StringFieldUpdateOperationsInput | string
    shFirstNameEn?: StringFieldUpdateOperationsInput | string
    shDob?: DateTimeFieldUpdateOperationsInput | Date | string
    shNationality?: StringFieldUpdateOperationsInput | string
    shGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    shIdCard?: NullableStringFieldUpdateOperationsInput | string | null
    shIdIssuedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shIdExpiredDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shEmail?: NullableStringFieldUpdateOperationsInput | string | null
    shPhone?: NullableStringFieldUpdateOperationsInput | string | null
    shPhotoName?: NullableStringFieldUpdateOperationsInput | string | null
    shIdDocNames?: StringFieldUpdateOperationsInput | string
    ownerLastNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    ownerFirstNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    ownerLastNameEn?: StringFieldUpdateOperationsInput | string
    ownerFirstNameEn?: StringFieldUpdateOperationsInput | string
    ownerDob?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerNationality?: StringFieldUpdateOperationsInput | string
    ownerGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    ownerIdCard?: NullableStringFieldUpdateOperationsInput | string | null
    ownerIdIssuedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerIdExpiredDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    ownerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    ownerPhotoName?: NullableStringFieldUpdateOperationsInput | string | null
    ownerIdDocNames?: StringFieldUpdateOperationsInput | string
    shareAmount?: StringFieldUpdateOperationsInput | string
    shareholderContractDocNames?: StringFieldUpdateOperationsInput | string
    otherDocNames?: StringFieldUpdateOperationsInput | string
    consentAgreed?: BoolFieldUpdateOperationsInput | boolean
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBeneficiaryRequestsNestedInput
    logs?: RequestLogUpdateManyWithoutRequestNestedInput
    revisions?: RequestRevisionUpdateManyWithoutRequestNestedInput
  }

  export type BeneficiaryRequestUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    requestNo?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    status?: EnumBeneficiaryRequestStatusFieldUpdateOperationsInput | $Enums.BeneficiaryRequestStatus
    type?: StringFieldUpdateOperationsInput | string
    companyNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    companyNameEn?: StringFieldUpdateOperationsInput | string
    registrationNo?: StringFieldUpdateOperationsInput | string
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    companyProvince?: StringFieldUpdateOperationsInput | string
    companyDistrict?: StringFieldUpdateOperationsInput | string
    companyCommune?: StringFieldUpdateOperationsInput | string
    companyVillage?: StringFieldUpdateOperationsInput | string
    companyStreet?: StringFieldUpdateOperationsInput | string
    companyHouse?: StringFieldUpdateOperationsInput | string
    companyPhone?: StringFieldUpdateOperationsInput | string
    companyOfficePhone?: NullableStringFieldUpdateOperationsInput | string | null
    companyEmail?: StringFieldUpdateOperationsInput | string
    shLastNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    shFirstNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    shLastNameEn?: StringFieldUpdateOperationsInput | string
    shFirstNameEn?: StringFieldUpdateOperationsInput | string
    shDob?: DateTimeFieldUpdateOperationsInput | Date | string
    shNationality?: StringFieldUpdateOperationsInput | string
    shGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    shIdCard?: NullableStringFieldUpdateOperationsInput | string | null
    shIdIssuedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shIdExpiredDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shEmail?: NullableStringFieldUpdateOperationsInput | string | null
    shPhone?: NullableStringFieldUpdateOperationsInput | string | null
    shPhotoName?: NullableStringFieldUpdateOperationsInput | string | null
    shIdDocNames?: StringFieldUpdateOperationsInput | string
    ownerLastNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    ownerFirstNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    ownerLastNameEn?: StringFieldUpdateOperationsInput | string
    ownerFirstNameEn?: StringFieldUpdateOperationsInput | string
    ownerDob?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerNationality?: StringFieldUpdateOperationsInput | string
    ownerGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    ownerIdCard?: NullableStringFieldUpdateOperationsInput | string | null
    ownerIdIssuedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerIdExpiredDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    ownerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    ownerPhotoName?: NullableStringFieldUpdateOperationsInput | string | null
    ownerIdDocNames?: StringFieldUpdateOperationsInput | string
    shareAmount?: StringFieldUpdateOperationsInput | string
    shareholderContractDocNames?: StringFieldUpdateOperationsInput | string
    otherDocNames?: StringFieldUpdateOperationsInput | string
    consentAgreed?: BoolFieldUpdateOperationsInput | boolean
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: RequestLogUncheckedUpdateManyWithoutRequestNestedInput
    revisions?: RequestRevisionUncheckedUpdateManyWithoutRequestNestedInput
  }

  export type BeneficiaryRequestCreateManyInput = {
    id?: number
    requestNo: string
    userId: number
    status?: $Enums.BeneficiaryRequestStatus
    type?: string
    companyNameKh?: string | null
    companyNameEn: string
    registrationNo: string
    registrationDate: Date | string
    companyProvince: string
    companyDistrict: string
    companyCommune: string
    companyVillage: string
    companyStreet: string
    companyHouse: string
    companyPhone: string
    companyOfficePhone?: string | null
    companyEmail: string
    shLastNameKh?: string | null
    shFirstNameKh?: string | null
    shLastNameEn: string
    shFirstNameEn: string
    shDob: Date | string
    shNationality: string
    shGender: $Enums.Gender
    shIdCard?: string | null
    shIdIssuedDate?: Date | string | null
    shIdExpiredDate?: Date | string | null
    shEmail?: string | null
    shPhone?: string | null
    shPhotoName?: string | null
    shIdDocNames?: string
    ownerLastNameKh?: string | null
    ownerFirstNameKh?: string | null
    ownerLastNameEn: string
    ownerFirstNameEn: string
    ownerDob: Date | string
    ownerNationality: string
    ownerGender: $Enums.Gender
    ownerIdCard?: string | null
    ownerIdIssuedDate?: Date | string | null
    ownerIdExpiredDate?: Date | string | null
    ownerEmail?: string | null
    ownerPhone?: string | null
    ownerPhotoName?: string | null
    ownerIdDocNames?: string
    shareAmount: string
    shareholderContractDocNames?: string
    otherDocNames?: string
    consentAgreed?: boolean
    rejectionReason?: string | null
    submittedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BeneficiaryRequestUpdateManyMutationInput = {
    requestNo?: StringFieldUpdateOperationsInput | string
    status?: EnumBeneficiaryRequestStatusFieldUpdateOperationsInput | $Enums.BeneficiaryRequestStatus
    type?: StringFieldUpdateOperationsInput | string
    companyNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    companyNameEn?: StringFieldUpdateOperationsInput | string
    registrationNo?: StringFieldUpdateOperationsInput | string
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    companyProvince?: StringFieldUpdateOperationsInput | string
    companyDistrict?: StringFieldUpdateOperationsInput | string
    companyCommune?: StringFieldUpdateOperationsInput | string
    companyVillage?: StringFieldUpdateOperationsInput | string
    companyStreet?: StringFieldUpdateOperationsInput | string
    companyHouse?: StringFieldUpdateOperationsInput | string
    companyPhone?: StringFieldUpdateOperationsInput | string
    companyOfficePhone?: NullableStringFieldUpdateOperationsInput | string | null
    companyEmail?: StringFieldUpdateOperationsInput | string
    shLastNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    shFirstNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    shLastNameEn?: StringFieldUpdateOperationsInput | string
    shFirstNameEn?: StringFieldUpdateOperationsInput | string
    shDob?: DateTimeFieldUpdateOperationsInput | Date | string
    shNationality?: StringFieldUpdateOperationsInput | string
    shGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    shIdCard?: NullableStringFieldUpdateOperationsInput | string | null
    shIdIssuedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shIdExpiredDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shEmail?: NullableStringFieldUpdateOperationsInput | string | null
    shPhone?: NullableStringFieldUpdateOperationsInput | string | null
    shPhotoName?: NullableStringFieldUpdateOperationsInput | string | null
    shIdDocNames?: StringFieldUpdateOperationsInput | string
    ownerLastNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    ownerFirstNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    ownerLastNameEn?: StringFieldUpdateOperationsInput | string
    ownerFirstNameEn?: StringFieldUpdateOperationsInput | string
    ownerDob?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerNationality?: StringFieldUpdateOperationsInput | string
    ownerGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    ownerIdCard?: NullableStringFieldUpdateOperationsInput | string | null
    ownerIdIssuedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerIdExpiredDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    ownerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    ownerPhotoName?: NullableStringFieldUpdateOperationsInput | string | null
    ownerIdDocNames?: StringFieldUpdateOperationsInput | string
    shareAmount?: StringFieldUpdateOperationsInput | string
    shareholderContractDocNames?: StringFieldUpdateOperationsInput | string
    otherDocNames?: StringFieldUpdateOperationsInput | string
    consentAgreed?: BoolFieldUpdateOperationsInput | boolean
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BeneficiaryRequestUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    requestNo?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    status?: EnumBeneficiaryRequestStatusFieldUpdateOperationsInput | $Enums.BeneficiaryRequestStatus
    type?: StringFieldUpdateOperationsInput | string
    companyNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    companyNameEn?: StringFieldUpdateOperationsInput | string
    registrationNo?: StringFieldUpdateOperationsInput | string
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    companyProvince?: StringFieldUpdateOperationsInput | string
    companyDistrict?: StringFieldUpdateOperationsInput | string
    companyCommune?: StringFieldUpdateOperationsInput | string
    companyVillage?: StringFieldUpdateOperationsInput | string
    companyStreet?: StringFieldUpdateOperationsInput | string
    companyHouse?: StringFieldUpdateOperationsInput | string
    companyPhone?: StringFieldUpdateOperationsInput | string
    companyOfficePhone?: NullableStringFieldUpdateOperationsInput | string | null
    companyEmail?: StringFieldUpdateOperationsInput | string
    shLastNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    shFirstNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    shLastNameEn?: StringFieldUpdateOperationsInput | string
    shFirstNameEn?: StringFieldUpdateOperationsInput | string
    shDob?: DateTimeFieldUpdateOperationsInput | Date | string
    shNationality?: StringFieldUpdateOperationsInput | string
    shGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    shIdCard?: NullableStringFieldUpdateOperationsInput | string | null
    shIdIssuedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shIdExpiredDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shEmail?: NullableStringFieldUpdateOperationsInput | string | null
    shPhone?: NullableStringFieldUpdateOperationsInput | string | null
    shPhotoName?: NullableStringFieldUpdateOperationsInput | string | null
    shIdDocNames?: StringFieldUpdateOperationsInput | string
    ownerLastNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    ownerFirstNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    ownerLastNameEn?: StringFieldUpdateOperationsInput | string
    ownerFirstNameEn?: StringFieldUpdateOperationsInput | string
    ownerDob?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerNationality?: StringFieldUpdateOperationsInput | string
    ownerGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    ownerIdCard?: NullableStringFieldUpdateOperationsInput | string | null
    ownerIdIssuedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerIdExpiredDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    ownerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    ownerPhotoName?: NullableStringFieldUpdateOperationsInput | string | null
    ownerIdDocNames?: StringFieldUpdateOperationsInput | string
    shareAmount?: StringFieldUpdateOperationsInput | string
    shareholderContractDocNames?: StringFieldUpdateOperationsInput | string
    otherDocNames?: StringFieldUpdateOperationsInput | string
    consentAgreed?: BoolFieldUpdateOperationsInput | boolean
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestLogCreateInput = {
    action: string
    actorUserId: number
    actorRole: $Enums.Role
    actorName: string
    note?: string | null
    createdAt?: Date | string
    request: BeneficiaryRequestCreateNestedOneWithoutLogsInput
  }

  export type RequestLogUncheckedCreateInput = {
    id?: number
    requestId: number
    action: string
    actorUserId: number
    actorRole: $Enums.Role
    actorName: string
    note?: string | null
    createdAt?: Date | string
  }

  export type RequestLogUpdateInput = {
    action?: StringFieldUpdateOperationsInput | string
    actorUserId?: IntFieldUpdateOperationsInput | number
    actorRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actorName?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    request?: BeneficiaryRequestUpdateOneRequiredWithoutLogsNestedInput
  }

  export type RequestLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    requestId?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    actorUserId?: IntFieldUpdateOperationsInput | number
    actorRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actorName?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestLogCreateManyInput = {
    id?: number
    requestId: number
    action: string
    actorUserId: number
    actorRole: $Enums.Role
    actorName: string
    note?: string | null
    createdAt?: Date | string
  }

  export type RequestLogUpdateManyMutationInput = {
    action?: StringFieldUpdateOperationsInput | string
    actorUserId?: IntFieldUpdateOperationsInput | number
    actorRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actorName?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    requestId?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    actorUserId?: IntFieldUpdateOperationsInput | number
    actorRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actorName?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestRevisionCreateInput = {
    editedByUserId: number
    editedByRole: $Enums.Role
    editedByName: string
    previousData: string
    newData: string
    approvedAt?: Date | string | null
    createdAt?: Date | string
    request: BeneficiaryRequestCreateNestedOneWithoutRevisionsInput
  }

  export type RequestRevisionUncheckedCreateInput = {
    id?: number
    requestId: number
    editedByUserId: number
    editedByRole: $Enums.Role
    editedByName: string
    previousData: string
    newData: string
    approvedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RequestRevisionUpdateInput = {
    editedByUserId?: IntFieldUpdateOperationsInput | number
    editedByRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    editedByName?: StringFieldUpdateOperationsInput | string
    previousData?: StringFieldUpdateOperationsInput | string
    newData?: StringFieldUpdateOperationsInput | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    request?: BeneficiaryRequestUpdateOneRequiredWithoutRevisionsNestedInput
  }

  export type RequestRevisionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    requestId?: IntFieldUpdateOperationsInput | number
    editedByUserId?: IntFieldUpdateOperationsInput | number
    editedByRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    editedByName?: StringFieldUpdateOperationsInput | string
    previousData?: StringFieldUpdateOperationsInput | string
    newData?: StringFieldUpdateOperationsInput | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestRevisionCreateManyInput = {
    id?: number
    requestId: number
    editedByUserId: number
    editedByRole: $Enums.Role
    editedByName: string
    previousData: string
    newData: string
    approvedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RequestRevisionUpdateManyMutationInput = {
    editedByUserId?: IntFieldUpdateOperationsInput | number
    editedByRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    editedByName?: StringFieldUpdateOperationsInput | string
    previousData?: StringFieldUpdateOperationsInput | string
    newData?: StringFieldUpdateOperationsInput | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestRevisionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    requestId?: IntFieldUpdateOperationsInput | number
    editedByUserId?: IntFieldUpdateOperationsInput | number
    editedByRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    editedByName?: StringFieldUpdateOperationsInput | string
    previousData?: StringFieldUpdateOperationsInput | string
    newData?: StringFieldUpdateOperationsInput | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogCreateInput = {
    action: string
    entityType?: string | null
    entityId?: number | null
    actorUserId?: number | null
    actorRole?: $Enums.Role | null
    actorName?: string | null
    note?: string | null
    createdAt?: Date | string
  }

  export type ActivityLogUncheckedCreateInput = {
    id?: number
    action: string
    entityType?: string | null
    entityId?: number | null
    actorUserId?: number | null
    actorRole?: $Enums.Role | null
    actorName?: string | null
    note?: string | null
    createdAt?: Date | string
  }

  export type ActivityLogUpdateInput = {
    action?: StringFieldUpdateOperationsInput | string
    entityType?: NullableStringFieldUpdateOperationsInput | string | null
    entityId?: NullableIntFieldUpdateOperationsInput | number | null
    actorUserId?: NullableIntFieldUpdateOperationsInput | number | null
    actorRole?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    actorName?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    entityType?: NullableStringFieldUpdateOperationsInput | string | null
    entityId?: NullableIntFieldUpdateOperationsInput | number | null
    actorUserId?: NullableIntFieldUpdateOperationsInput | number | null
    actorRole?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    actorName?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogCreateManyInput = {
    id?: number
    action: string
    entityType?: string | null
    entityId?: number | null
    actorUserId?: number | null
    actorRole?: $Enums.Role | null
    actorName?: string | null
    note?: string | null
    createdAt?: Date | string
  }

  export type ActivityLogUpdateManyMutationInput = {
    action?: StringFieldUpdateOperationsInput | string
    entityType?: NullableStringFieldUpdateOperationsInput | string | null
    entityId?: NullableIntFieldUpdateOperationsInput | number | null
    actorUserId?: NullableIntFieldUpdateOperationsInput | number | null
    actorRole?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    actorName?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    entityType?: NullableStringFieldUpdateOperationsInput | string | null
    entityId?: NullableIntFieldUpdateOperationsInput | number | null
    actorUserId?: NullableIntFieldUpdateOperationsInput | number | null
    actorRole?: NullableEnumRoleFieldUpdateOperationsInput | $Enums.Role | null
    actorName?: NullableStringFieldUpdateOperationsInput | string | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BeneficiaryRequestListRelationFilter = {
    every?: BeneficiaryRequestWhereInput
    some?: BeneficiaryRequestWhereInput
    none?: BeneficiaryRequestWhereInput
  }

  export type StaffRoleNullableScalarRelationFilter = {
    is?: StaffRoleWhereInput | null
    isNot?: StaffRoleWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BeneficiaryRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    companyName?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phoneNumber?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    registrationReturnReason?: SortOrder
    registrationReturnedAt?: SortOrder
    resetToken?: SortOrder
    resetTokenExpiry?: SortOrder
    notificationsSeenAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    staffRoleId?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
    staffRoleId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    companyName?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phoneNumber?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    registrationReturnReason?: SortOrder
    registrationReturnedAt?: SortOrder
    resetToken?: SortOrder
    resetTokenExpiry?: SortOrder
    notificationsSeenAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    staffRoleId?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    fullName?: SortOrder
    companyName?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    phoneNumber?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    registrationReturnReason?: SortOrder
    registrationReturnedAt?: SortOrder
    resetToken?: SortOrder
    resetTokenExpiry?: SortOrder
    notificationsSeenAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    staffRoleId?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
    staffRoleId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type StaffRolePermissionListRelationFilter = {
    every?: StaffRolePermissionWhereInput
    some?: StaffRolePermissionWhereInput
    none?: StaffRolePermissionWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StaffRolePermissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StaffRoleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StaffRoleAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StaffRoleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StaffRoleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StaffRoleSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PermissionModuleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    label?: SortOrder
    description?: SortOrder
  }

  export type PermissionModuleAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PermissionModuleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    label?: SortOrder
    description?: SortOrder
  }

  export type PermissionModuleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    label?: SortOrder
    description?: SortOrder
  }

  export type PermissionModuleSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StaffRoleScalarRelationFilter = {
    is?: StaffRoleWhereInput
    isNot?: StaffRoleWhereInput
  }

  export type PermissionModuleScalarRelationFilter = {
    is?: PermissionModuleWhereInput
    isNot?: PermissionModuleWhereInput
  }

  export type StaffRolePermissionStaffRoleIdModuleIdCompoundUniqueInput = {
    staffRoleId: number
    moduleId: number
  }

  export type StaffRolePermissionCountOrderByAggregateInput = {
    staffRoleId?: SortOrder
    moduleId?: SortOrder
    create?: SortOrder
    read?: SortOrder
    update?: SortOrder
    delete?: SortOrder
  }

  export type StaffRolePermissionAvgOrderByAggregateInput = {
    staffRoleId?: SortOrder
    moduleId?: SortOrder
  }

  export type StaffRolePermissionMaxOrderByAggregateInput = {
    staffRoleId?: SortOrder
    moduleId?: SortOrder
    create?: SortOrder
    read?: SortOrder
    update?: SortOrder
    delete?: SortOrder
  }

  export type StaffRolePermissionMinOrderByAggregateInput = {
    staffRoleId?: SortOrder
    moduleId?: SortOrder
    create?: SortOrder
    read?: SortOrder
    update?: SortOrder
    delete?: SortOrder
  }

  export type StaffRolePermissionSumOrderByAggregateInput = {
    staffRoleId?: SortOrder
    moduleId?: SortOrder
  }

  export type EnumBeneficiaryRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BeneficiaryRequestStatus | EnumBeneficiaryRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BeneficiaryRequestStatus[]
    notIn?: $Enums.BeneficiaryRequestStatus[]
    not?: NestedEnumBeneficiaryRequestStatusFilter<$PrismaModel> | $Enums.BeneficiaryRequestStatus
  }

  export type EnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[]
    notIn?: $Enums.Gender[]
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type RequestLogListRelationFilter = {
    every?: RequestLogWhereInput
    some?: RequestLogWhereInput
    none?: RequestLogWhereInput
  }

  export type RequestRevisionListRelationFilter = {
    every?: RequestRevisionWhereInput
    some?: RequestRevisionWhereInput
    none?: RequestRevisionWhereInput
  }

  export type RequestLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RequestRevisionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BeneficiaryRequestCountOrderByAggregateInput = {
    id?: SortOrder
    requestNo?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    type?: SortOrder
    companyNameKh?: SortOrder
    companyNameEn?: SortOrder
    registrationNo?: SortOrder
    registrationDate?: SortOrder
    companyProvince?: SortOrder
    companyDistrict?: SortOrder
    companyCommune?: SortOrder
    companyVillage?: SortOrder
    companyStreet?: SortOrder
    companyHouse?: SortOrder
    companyPhone?: SortOrder
    companyOfficePhone?: SortOrder
    companyEmail?: SortOrder
    shLastNameKh?: SortOrder
    shFirstNameKh?: SortOrder
    shLastNameEn?: SortOrder
    shFirstNameEn?: SortOrder
    shDob?: SortOrder
    shNationality?: SortOrder
    shGender?: SortOrder
    shIdCard?: SortOrder
    shIdIssuedDate?: SortOrder
    shIdExpiredDate?: SortOrder
    shEmail?: SortOrder
    shPhone?: SortOrder
    shPhotoName?: SortOrder
    shIdDocNames?: SortOrder
    ownerLastNameKh?: SortOrder
    ownerFirstNameKh?: SortOrder
    ownerLastNameEn?: SortOrder
    ownerFirstNameEn?: SortOrder
    ownerDob?: SortOrder
    ownerNationality?: SortOrder
    ownerGender?: SortOrder
    ownerIdCard?: SortOrder
    ownerIdIssuedDate?: SortOrder
    ownerIdExpiredDate?: SortOrder
    ownerEmail?: SortOrder
    ownerPhone?: SortOrder
    ownerPhotoName?: SortOrder
    ownerIdDocNames?: SortOrder
    shareAmount?: SortOrder
    shareholderContractDocNames?: SortOrder
    otherDocNames?: SortOrder
    consentAgreed?: SortOrder
    rejectionReason?: SortOrder
    submittedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BeneficiaryRequestAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type BeneficiaryRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    requestNo?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    type?: SortOrder
    companyNameKh?: SortOrder
    companyNameEn?: SortOrder
    registrationNo?: SortOrder
    registrationDate?: SortOrder
    companyProvince?: SortOrder
    companyDistrict?: SortOrder
    companyCommune?: SortOrder
    companyVillage?: SortOrder
    companyStreet?: SortOrder
    companyHouse?: SortOrder
    companyPhone?: SortOrder
    companyOfficePhone?: SortOrder
    companyEmail?: SortOrder
    shLastNameKh?: SortOrder
    shFirstNameKh?: SortOrder
    shLastNameEn?: SortOrder
    shFirstNameEn?: SortOrder
    shDob?: SortOrder
    shNationality?: SortOrder
    shGender?: SortOrder
    shIdCard?: SortOrder
    shIdIssuedDate?: SortOrder
    shIdExpiredDate?: SortOrder
    shEmail?: SortOrder
    shPhone?: SortOrder
    shPhotoName?: SortOrder
    shIdDocNames?: SortOrder
    ownerLastNameKh?: SortOrder
    ownerFirstNameKh?: SortOrder
    ownerLastNameEn?: SortOrder
    ownerFirstNameEn?: SortOrder
    ownerDob?: SortOrder
    ownerNationality?: SortOrder
    ownerGender?: SortOrder
    ownerIdCard?: SortOrder
    ownerIdIssuedDate?: SortOrder
    ownerIdExpiredDate?: SortOrder
    ownerEmail?: SortOrder
    ownerPhone?: SortOrder
    ownerPhotoName?: SortOrder
    ownerIdDocNames?: SortOrder
    shareAmount?: SortOrder
    shareholderContractDocNames?: SortOrder
    otherDocNames?: SortOrder
    consentAgreed?: SortOrder
    rejectionReason?: SortOrder
    submittedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BeneficiaryRequestMinOrderByAggregateInput = {
    id?: SortOrder
    requestNo?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    type?: SortOrder
    companyNameKh?: SortOrder
    companyNameEn?: SortOrder
    registrationNo?: SortOrder
    registrationDate?: SortOrder
    companyProvince?: SortOrder
    companyDistrict?: SortOrder
    companyCommune?: SortOrder
    companyVillage?: SortOrder
    companyStreet?: SortOrder
    companyHouse?: SortOrder
    companyPhone?: SortOrder
    companyOfficePhone?: SortOrder
    companyEmail?: SortOrder
    shLastNameKh?: SortOrder
    shFirstNameKh?: SortOrder
    shLastNameEn?: SortOrder
    shFirstNameEn?: SortOrder
    shDob?: SortOrder
    shNationality?: SortOrder
    shGender?: SortOrder
    shIdCard?: SortOrder
    shIdIssuedDate?: SortOrder
    shIdExpiredDate?: SortOrder
    shEmail?: SortOrder
    shPhone?: SortOrder
    shPhotoName?: SortOrder
    shIdDocNames?: SortOrder
    ownerLastNameKh?: SortOrder
    ownerFirstNameKh?: SortOrder
    ownerLastNameEn?: SortOrder
    ownerFirstNameEn?: SortOrder
    ownerDob?: SortOrder
    ownerNationality?: SortOrder
    ownerGender?: SortOrder
    ownerIdCard?: SortOrder
    ownerIdIssuedDate?: SortOrder
    ownerIdExpiredDate?: SortOrder
    ownerEmail?: SortOrder
    ownerPhone?: SortOrder
    ownerPhotoName?: SortOrder
    ownerIdDocNames?: SortOrder
    shareAmount?: SortOrder
    shareholderContractDocNames?: SortOrder
    otherDocNames?: SortOrder
    consentAgreed?: SortOrder
    rejectionReason?: SortOrder
    submittedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BeneficiaryRequestSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type EnumBeneficiaryRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BeneficiaryRequestStatus | EnumBeneficiaryRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BeneficiaryRequestStatus[]
    notIn?: $Enums.BeneficiaryRequestStatus[]
    not?: NestedEnumBeneficiaryRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.BeneficiaryRequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBeneficiaryRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumBeneficiaryRequestStatusFilter<$PrismaModel>
  }

  export type EnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[]
    notIn?: $Enums.Gender[]
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type BeneficiaryRequestScalarRelationFilter = {
    is?: BeneficiaryRequestWhereInput
    isNot?: BeneficiaryRequestWhereInput
  }

  export type RequestLogCountOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    action?: SortOrder
    actorUserId?: SortOrder
    actorRole?: SortOrder
    actorName?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type RequestLogAvgOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    actorUserId?: SortOrder
  }

  export type RequestLogMaxOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    action?: SortOrder
    actorUserId?: SortOrder
    actorRole?: SortOrder
    actorName?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type RequestLogMinOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    action?: SortOrder
    actorUserId?: SortOrder
    actorRole?: SortOrder
    actorName?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type RequestLogSumOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    actorUserId?: SortOrder
  }

  export type RequestRevisionCountOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    editedByUserId?: SortOrder
    editedByRole?: SortOrder
    editedByName?: SortOrder
    previousData?: SortOrder
    newData?: SortOrder
    approvedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type RequestRevisionAvgOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    editedByUserId?: SortOrder
  }

  export type RequestRevisionMaxOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    editedByUserId?: SortOrder
    editedByRole?: SortOrder
    editedByName?: SortOrder
    previousData?: SortOrder
    newData?: SortOrder
    approvedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type RequestRevisionMinOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    editedByUserId?: SortOrder
    editedByRole?: SortOrder
    editedByName?: SortOrder
    previousData?: SortOrder
    newData?: SortOrder
    approvedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type RequestRevisionSumOrderByAggregateInput = {
    id?: SortOrder
    requestId?: SortOrder
    editedByUserId?: SortOrder
  }

  export type EnumRoleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.Role[] | null
    notIn?: $Enums.Role[] | null
    not?: NestedEnumRoleNullableFilter<$PrismaModel> | $Enums.Role | null
  }

  export type ActivityLogCountOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    actorUserId?: SortOrder
    actorRole?: SortOrder
    actorName?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityLogAvgOrderByAggregateInput = {
    id?: SortOrder
    entityId?: SortOrder
    actorUserId?: SortOrder
  }

  export type ActivityLogMaxOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    actorUserId?: SortOrder
    actorRole?: SortOrder
    actorName?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityLogMinOrderByAggregateInput = {
    id?: SortOrder
    action?: SortOrder
    entityType?: SortOrder
    entityId?: SortOrder
    actorUserId?: SortOrder
    actorRole?: SortOrder
    actorName?: SortOrder
    note?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityLogSumOrderByAggregateInput = {
    id?: SortOrder
    entityId?: SortOrder
    actorUserId?: SortOrder
  }

  export type EnumRoleNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.Role[] | null
    notIn?: $Enums.Role[] | null
    not?: NestedEnumRoleNullableWithAggregatesFilter<$PrismaModel> | $Enums.Role | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumRoleNullableFilter<$PrismaModel>
    _max?: NestedEnumRoleNullableFilter<$PrismaModel>
  }

  export type BeneficiaryRequestCreateNestedManyWithoutUserInput = {
    create?: XOR<BeneficiaryRequestCreateWithoutUserInput, BeneficiaryRequestUncheckedCreateWithoutUserInput> | BeneficiaryRequestCreateWithoutUserInput[] | BeneficiaryRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BeneficiaryRequestCreateOrConnectWithoutUserInput | BeneficiaryRequestCreateOrConnectWithoutUserInput[]
    createMany?: BeneficiaryRequestCreateManyUserInputEnvelope
    connect?: BeneficiaryRequestWhereUniqueInput | BeneficiaryRequestWhereUniqueInput[]
  }

  export type StaffRoleCreateNestedOneWithoutUsersInput = {
    create?: XOR<StaffRoleCreateWithoutUsersInput, StaffRoleUncheckedCreateWithoutUsersInput>
    connectOrCreate?: StaffRoleCreateOrConnectWithoutUsersInput
    connect?: StaffRoleWhereUniqueInput
  }

  export type BeneficiaryRequestUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<BeneficiaryRequestCreateWithoutUserInput, BeneficiaryRequestUncheckedCreateWithoutUserInput> | BeneficiaryRequestCreateWithoutUserInput[] | BeneficiaryRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BeneficiaryRequestCreateOrConnectWithoutUserInput | BeneficiaryRequestCreateOrConnectWithoutUserInput[]
    createMany?: BeneficiaryRequestCreateManyUserInputEnvelope
    connect?: BeneficiaryRequestWhereUniqueInput | BeneficiaryRequestWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BeneficiaryRequestUpdateManyWithoutUserNestedInput = {
    create?: XOR<BeneficiaryRequestCreateWithoutUserInput, BeneficiaryRequestUncheckedCreateWithoutUserInput> | BeneficiaryRequestCreateWithoutUserInput[] | BeneficiaryRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BeneficiaryRequestCreateOrConnectWithoutUserInput | BeneficiaryRequestCreateOrConnectWithoutUserInput[]
    upsert?: BeneficiaryRequestUpsertWithWhereUniqueWithoutUserInput | BeneficiaryRequestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BeneficiaryRequestCreateManyUserInputEnvelope
    set?: BeneficiaryRequestWhereUniqueInput | BeneficiaryRequestWhereUniqueInput[]
    disconnect?: BeneficiaryRequestWhereUniqueInput | BeneficiaryRequestWhereUniqueInput[]
    delete?: BeneficiaryRequestWhereUniqueInput | BeneficiaryRequestWhereUniqueInput[]
    connect?: BeneficiaryRequestWhereUniqueInput | BeneficiaryRequestWhereUniqueInput[]
    update?: BeneficiaryRequestUpdateWithWhereUniqueWithoutUserInput | BeneficiaryRequestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BeneficiaryRequestUpdateManyWithWhereWithoutUserInput | BeneficiaryRequestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BeneficiaryRequestScalarWhereInput | BeneficiaryRequestScalarWhereInput[]
  }

  export type StaffRoleUpdateOneWithoutUsersNestedInput = {
    create?: XOR<StaffRoleCreateWithoutUsersInput, StaffRoleUncheckedCreateWithoutUsersInput>
    connectOrCreate?: StaffRoleCreateOrConnectWithoutUsersInput
    upsert?: StaffRoleUpsertWithoutUsersInput
    disconnect?: StaffRoleWhereInput | boolean
    delete?: StaffRoleWhereInput | boolean
    connect?: StaffRoleWhereUniqueInput
    update?: XOR<XOR<StaffRoleUpdateToOneWithWhereWithoutUsersInput, StaffRoleUpdateWithoutUsersInput>, StaffRoleUncheckedUpdateWithoutUsersInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BeneficiaryRequestUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<BeneficiaryRequestCreateWithoutUserInput, BeneficiaryRequestUncheckedCreateWithoutUserInput> | BeneficiaryRequestCreateWithoutUserInput[] | BeneficiaryRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: BeneficiaryRequestCreateOrConnectWithoutUserInput | BeneficiaryRequestCreateOrConnectWithoutUserInput[]
    upsert?: BeneficiaryRequestUpsertWithWhereUniqueWithoutUserInput | BeneficiaryRequestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: BeneficiaryRequestCreateManyUserInputEnvelope
    set?: BeneficiaryRequestWhereUniqueInput | BeneficiaryRequestWhereUniqueInput[]
    disconnect?: BeneficiaryRequestWhereUniqueInput | BeneficiaryRequestWhereUniqueInput[]
    delete?: BeneficiaryRequestWhereUniqueInput | BeneficiaryRequestWhereUniqueInput[]
    connect?: BeneficiaryRequestWhereUniqueInput | BeneficiaryRequestWhereUniqueInput[]
    update?: BeneficiaryRequestUpdateWithWhereUniqueWithoutUserInput | BeneficiaryRequestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: BeneficiaryRequestUpdateManyWithWhereWithoutUserInput | BeneficiaryRequestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: BeneficiaryRequestScalarWhereInput | BeneficiaryRequestScalarWhereInput[]
  }

  export type UserCreateNestedManyWithoutStaffRoleInput = {
    create?: XOR<UserCreateWithoutStaffRoleInput, UserUncheckedCreateWithoutStaffRoleInput> | UserCreateWithoutStaffRoleInput[] | UserUncheckedCreateWithoutStaffRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutStaffRoleInput | UserCreateOrConnectWithoutStaffRoleInput[]
    createMany?: UserCreateManyStaffRoleInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type StaffRolePermissionCreateNestedManyWithoutStaffRoleInput = {
    create?: XOR<StaffRolePermissionCreateWithoutStaffRoleInput, StaffRolePermissionUncheckedCreateWithoutStaffRoleInput> | StaffRolePermissionCreateWithoutStaffRoleInput[] | StaffRolePermissionUncheckedCreateWithoutStaffRoleInput[]
    connectOrCreate?: StaffRolePermissionCreateOrConnectWithoutStaffRoleInput | StaffRolePermissionCreateOrConnectWithoutStaffRoleInput[]
    createMany?: StaffRolePermissionCreateManyStaffRoleInputEnvelope
    connect?: StaffRolePermissionWhereUniqueInput | StaffRolePermissionWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutStaffRoleInput = {
    create?: XOR<UserCreateWithoutStaffRoleInput, UserUncheckedCreateWithoutStaffRoleInput> | UserCreateWithoutStaffRoleInput[] | UserUncheckedCreateWithoutStaffRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutStaffRoleInput | UserCreateOrConnectWithoutStaffRoleInput[]
    createMany?: UserCreateManyStaffRoleInputEnvelope
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type StaffRolePermissionUncheckedCreateNestedManyWithoutStaffRoleInput = {
    create?: XOR<StaffRolePermissionCreateWithoutStaffRoleInput, StaffRolePermissionUncheckedCreateWithoutStaffRoleInput> | StaffRolePermissionCreateWithoutStaffRoleInput[] | StaffRolePermissionUncheckedCreateWithoutStaffRoleInput[]
    connectOrCreate?: StaffRolePermissionCreateOrConnectWithoutStaffRoleInput | StaffRolePermissionCreateOrConnectWithoutStaffRoleInput[]
    createMany?: StaffRolePermissionCreateManyStaffRoleInputEnvelope
    connect?: StaffRolePermissionWhereUniqueInput | StaffRolePermissionWhereUniqueInput[]
  }

  export type UserUpdateManyWithoutStaffRoleNestedInput = {
    create?: XOR<UserCreateWithoutStaffRoleInput, UserUncheckedCreateWithoutStaffRoleInput> | UserCreateWithoutStaffRoleInput[] | UserUncheckedCreateWithoutStaffRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutStaffRoleInput | UserCreateOrConnectWithoutStaffRoleInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutStaffRoleInput | UserUpsertWithWhereUniqueWithoutStaffRoleInput[]
    createMany?: UserCreateManyStaffRoleInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutStaffRoleInput | UserUpdateWithWhereUniqueWithoutStaffRoleInput[]
    updateMany?: UserUpdateManyWithWhereWithoutStaffRoleInput | UserUpdateManyWithWhereWithoutStaffRoleInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type StaffRolePermissionUpdateManyWithoutStaffRoleNestedInput = {
    create?: XOR<StaffRolePermissionCreateWithoutStaffRoleInput, StaffRolePermissionUncheckedCreateWithoutStaffRoleInput> | StaffRolePermissionCreateWithoutStaffRoleInput[] | StaffRolePermissionUncheckedCreateWithoutStaffRoleInput[]
    connectOrCreate?: StaffRolePermissionCreateOrConnectWithoutStaffRoleInput | StaffRolePermissionCreateOrConnectWithoutStaffRoleInput[]
    upsert?: StaffRolePermissionUpsertWithWhereUniqueWithoutStaffRoleInput | StaffRolePermissionUpsertWithWhereUniqueWithoutStaffRoleInput[]
    createMany?: StaffRolePermissionCreateManyStaffRoleInputEnvelope
    set?: StaffRolePermissionWhereUniqueInput | StaffRolePermissionWhereUniqueInput[]
    disconnect?: StaffRolePermissionWhereUniqueInput | StaffRolePermissionWhereUniqueInput[]
    delete?: StaffRolePermissionWhereUniqueInput | StaffRolePermissionWhereUniqueInput[]
    connect?: StaffRolePermissionWhereUniqueInput | StaffRolePermissionWhereUniqueInput[]
    update?: StaffRolePermissionUpdateWithWhereUniqueWithoutStaffRoleInput | StaffRolePermissionUpdateWithWhereUniqueWithoutStaffRoleInput[]
    updateMany?: StaffRolePermissionUpdateManyWithWhereWithoutStaffRoleInput | StaffRolePermissionUpdateManyWithWhereWithoutStaffRoleInput[]
    deleteMany?: StaffRolePermissionScalarWhereInput | StaffRolePermissionScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutStaffRoleNestedInput = {
    create?: XOR<UserCreateWithoutStaffRoleInput, UserUncheckedCreateWithoutStaffRoleInput> | UserCreateWithoutStaffRoleInput[] | UserUncheckedCreateWithoutStaffRoleInput[]
    connectOrCreate?: UserCreateOrConnectWithoutStaffRoleInput | UserCreateOrConnectWithoutStaffRoleInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutStaffRoleInput | UserUpsertWithWhereUniqueWithoutStaffRoleInput[]
    createMany?: UserCreateManyStaffRoleInputEnvelope
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutStaffRoleInput | UserUpdateWithWhereUniqueWithoutStaffRoleInput[]
    updateMany?: UserUpdateManyWithWhereWithoutStaffRoleInput | UserUpdateManyWithWhereWithoutStaffRoleInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type StaffRolePermissionUncheckedUpdateManyWithoutStaffRoleNestedInput = {
    create?: XOR<StaffRolePermissionCreateWithoutStaffRoleInput, StaffRolePermissionUncheckedCreateWithoutStaffRoleInput> | StaffRolePermissionCreateWithoutStaffRoleInput[] | StaffRolePermissionUncheckedCreateWithoutStaffRoleInput[]
    connectOrCreate?: StaffRolePermissionCreateOrConnectWithoutStaffRoleInput | StaffRolePermissionCreateOrConnectWithoutStaffRoleInput[]
    upsert?: StaffRolePermissionUpsertWithWhereUniqueWithoutStaffRoleInput | StaffRolePermissionUpsertWithWhereUniqueWithoutStaffRoleInput[]
    createMany?: StaffRolePermissionCreateManyStaffRoleInputEnvelope
    set?: StaffRolePermissionWhereUniqueInput | StaffRolePermissionWhereUniqueInput[]
    disconnect?: StaffRolePermissionWhereUniqueInput | StaffRolePermissionWhereUniqueInput[]
    delete?: StaffRolePermissionWhereUniqueInput | StaffRolePermissionWhereUniqueInput[]
    connect?: StaffRolePermissionWhereUniqueInput | StaffRolePermissionWhereUniqueInput[]
    update?: StaffRolePermissionUpdateWithWhereUniqueWithoutStaffRoleInput | StaffRolePermissionUpdateWithWhereUniqueWithoutStaffRoleInput[]
    updateMany?: StaffRolePermissionUpdateManyWithWhereWithoutStaffRoleInput | StaffRolePermissionUpdateManyWithWhereWithoutStaffRoleInput[]
    deleteMany?: StaffRolePermissionScalarWhereInput | StaffRolePermissionScalarWhereInput[]
  }

  export type StaffRolePermissionCreateNestedManyWithoutModuleInput = {
    create?: XOR<StaffRolePermissionCreateWithoutModuleInput, StaffRolePermissionUncheckedCreateWithoutModuleInput> | StaffRolePermissionCreateWithoutModuleInput[] | StaffRolePermissionUncheckedCreateWithoutModuleInput[]
    connectOrCreate?: StaffRolePermissionCreateOrConnectWithoutModuleInput | StaffRolePermissionCreateOrConnectWithoutModuleInput[]
    createMany?: StaffRolePermissionCreateManyModuleInputEnvelope
    connect?: StaffRolePermissionWhereUniqueInput | StaffRolePermissionWhereUniqueInput[]
  }

  export type StaffRolePermissionUncheckedCreateNestedManyWithoutModuleInput = {
    create?: XOR<StaffRolePermissionCreateWithoutModuleInput, StaffRolePermissionUncheckedCreateWithoutModuleInput> | StaffRolePermissionCreateWithoutModuleInput[] | StaffRolePermissionUncheckedCreateWithoutModuleInput[]
    connectOrCreate?: StaffRolePermissionCreateOrConnectWithoutModuleInput | StaffRolePermissionCreateOrConnectWithoutModuleInput[]
    createMany?: StaffRolePermissionCreateManyModuleInputEnvelope
    connect?: StaffRolePermissionWhereUniqueInput | StaffRolePermissionWhereUniqueInput[]
  }

  export type StaffRolePermissionUpdateManyWithoutModuleNestedInput = {
    create?: XOR<StaffRolePermissionCreateWithoutModuleInput, StaffRolePermissionUncheckedCreateWithoutModuleInput> | StaffRolePermissionCreateWithoutModuleInput[] | StaffRolePermissionUncheckedCreateWithoutModuleInput[]
    connectOrCreate?: StaffRolePermissionCreateOrConnectWithoutModuleInput | StaffRolePermissionCreateOrConnectWithoutModuleInput[]
    upsert?: StaffRolePermissionUpsertWithWhereUniqueWithoutModuleInput | StaffRolePermissionUpsertWithWhereUniqueWithoutModuleInput[]
    createMany?: StaffRolePermissionCreateManyModuleInputEnvelope
    set?: StaffRolePermissionWhereUniqueInput | StaffRolePermissionWhereUniqueInput[]
    disconnect?: StaffRolePermissionWhereUniqueInput | StaffRolePermissionWhereUniqueInput[]
    delete?: StaffRolePermissionWhereUniqueInput | StaffRolePermissionWhereUniqueInput[]
    connect?: StaffRolePermissionWhereUniqueInput | StaffRolePermissionWhereUniqueInput[]
    update?: StaffRolePermissionUpdateWithWhereUniqueWithoutModuleInput | StaffRolePermissionUpdateWithWhereUniqueWithoutModuleInput[]
    updateMany?: StaffRolePermissionUpdateManyWithWhereWithoutModuleInput | StaffRolePermissionUpdateManyWithWhereWithoutModuleInput[]
    deleteMany?: StaffRolePermissionScalarWhereInput | StaffRolePermissionScalarWhereInput[]
  }

  export type StaffRolePermissionUncheckedUpdateManyWithoutModuleNestedInput = {
    create?: XOR<StaffRolePermissionCreateWithoutModuleInput, StaffRolePermissionUncheckedCreateWithoutModuleInput> | StaffRolePermissionCreateWithoutModuleInput[] | StaffRolePermissionUncheckedCreateWithoutModuleInput[]
    connectOrCreate?: StaffRolePermissionCreateOrConnectWithoutModuleInput | StaffRolePermissionCreateOrConnectWithoutModuleInput[]
    upsert?: StaffRolePermissionUpsertWithWhereUniqueWithoutModuleInput | StaffRolePermissionUpsertWithWhereUniqueWithoutModuleInput[]
    createMany?: StaffRolePermissionCreateManyModuleInputEnvelope
    set?: StaffRolePermissionWhereUniqueInput | StaffRolePermissionWhereUniqueInput[]
    disconnect?: StaffRolePermissionWhereUniqueInput | StaffRolePermissionWhereUniqueInput[]
    delete?: StaffRolePermissionWhereUniqueInput | StaffRolePermissionWhereUniqueInput[]
    connect?: StaffRolePermissionWhereUniqueInput | StaffRolePermissionWhereUniqueInput[]
    update?: StaffRolePermissionUpdateWithWhereUniqueWithoutModuleInput | StaffRolePermissionUpdateWithWhereUniqueWithoutModuleInput[]
    updateMany?: StaffRolePermissionUpdateManyWithWhereWithoutModuleInput | StaffRolePermissionUpdateManyWithWhereWithoutModuleInput[]
    deleteMany?: StaffRolePermissionScalarWhereInput | StaffRolePermissionScalarWhereInput[]
  }

  export type StaffRoleCreateNestedOneWithoutPermissionsInput = {
    create?: XOR<StaffRoleCreateWithoutPermissionsInput, StaffRoleUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: StaffRoleCreateOrConnectWithoutPermissionsInput
    connect?: StaffRoleWhereUniqueInput
  }

  export type PermissionModuleCreateNestedOneWithoutRolePermissionsInput = {
    create?: XOR<PermissionModuleCreateWithoutRolePermissionsInput, PermissionModuleUncheckedCreateWithoutRolePermissionsInput>
    connectOrCreate?: PermissionModuleCreateOrConnectWithoutRolePermissionsInput
    connect?: PermissionModuleWhereUniqueInput
  }

  export type StaffRoleUpdateOneRequiredWithoutPermissionsNestedInput = {
    create?: XOR<StaffRoleCreateWithoutPermissionsInput, StaffRoleUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: StaffRoleCreateOrConnectWithoutPermissionsInput
    upsert?: StaffRoleUpsertWithoutPermissionsInput
    connect?: StaffRoleWhereUniqueInput
    update?: XOR<XOR<StaffRoleUpdateToOneWithWhereWithoutPermissionsInput, StaffRoleUpdateWithoutPermissionsInput>, StaffRoleUncheckedUpdateWithoutPermissionsInput>
  }

  export type PermissionModuleUpdateOneRequiredWithoutRolePermissionsNestedInput = {
    create?: XOR<PermissionModuleCreateWithoutRolePermissionsInput, PermissionModuleUncheckedCreateWithoutRolePermissionsInput>
    connectOrCreate?: PermissionModuleCreateOrConnectWithoutRolePermissionsInput
    upsert?: PermissionModuleUpsertWithoutRolePermissionsInput
    connect?: PermissionModuleWhereUniqueInput
    update?: XOR<XOR<PermissionModuleUpdateToOneWithWhereWithoutRolePermissionsInput, PermissionModuleUpdateWithoutRolePermissionsInput>, PermissionModuleUncheckedUpdateWithoutRolePermissionsInput>
  }

  export type UserCreateNestedOneWithoutBeneficiaryRequestsInput = {
    create?: XOR<UserCreateWithoutBeneficiaryRequestsInput, UserUncheckedCreateWithoutBeneficiaryRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBeneficiaryRequestsInput
    connect?: UserWhereUniqueInput
  }

  export type RequestLogCreateNestedManyWithoutRequestInput = {
    create?: XOR<RequestLogCreateWithoutRequestInput, RequestLogUncheckedCreateWithoutRequestInput> | RequestLogCreateWithoutRequestInput[] | RequestLogUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: RequestLogCreateOrConnectWithoutRequestInput | RequestLogCreateOrConnectWithoutRequestInput[]
    createMany?: RequestLogCreateManyRequestInputEnvelope
    connect?: RequestLogWhereUniqueInput | RequestLogWhereUniqueInput[]
  }

  export type RequestRevisionCreateNestedManyWithoutRequestInput = {
    create?: XOR<RequestRevisionCreateWithoutRequestInput, RequestRevisionUncheckedCreateWithoutRequestInput> | RequestRevisionCreateWithoutRequestInput[] | RequestRevisionUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: RequestRevisionCreateOrConnectWithoutRequestInput | RequestRevisionCreateOrConnectWithoutRequestInput[]
    createMany?: RequestRevisionCreateManyRequestInputEnvelope
    connect?: RequestRevisionWhereUniqueInput | RequestRevisionWhereUniqueInput[]
  }

  export type RequestLogUncheckedCreateNestedManyWithoutRequestInput = {
    create?: XOR<RequestLogCreateWithoutRequestInput, RequestLogUncheckedCreateWithoutRequestInput> | RequestLogCreateWithoutRequestInput[] | RequestLogUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: RequestLogCreateOrConnectWithoutRequestInput | RequestLogCreateOrConnectWithoutRequestInput[]
    createMany?: RequestLogCreateManyRequestInputEnvelope
    connect?: RequestLogWhereUniqueInput | RequestLogWhereUniqueInput[]
  }

  export type RequestRevisionUncheckedCreateNestedManyWithoutRequestInput = {
    create?: XOR<RequestRevisionCreateWithoutRequestInput, RequestRevisionUncheckedCreateWithoutRequestInput> | RequestRevisionCreateWithoutRequestInput[] | RequestRevisionUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: RequestRevisionCreateOrConnectWithoutRequestInput | RequestRevisionCreateOrConnectWithoutRequestInput[]
    createMany?: RequestRevisionCreateManyRequestInputEnvelope
    connect?: RequestRevisionWhereUniqueInput | RequestRevisionWhereUniqueInput[]
  }

  export type EnumBeneficiaryRequestStatusFieldUpdateOperationsInput = {
    set?: $Enums.BeneficiaryRequestStatus
  }

  export type EnumGenderFieldUpdateOperationsInput = {
    set?: $Enums.Gender
  }

  export type UserUpdateOneRequiredWithoutBeneficiaryRequestsNestedInput = {
    create?: XOR<UserCreateWithoutBeneficiaryRequestsInput, UserUncheckedCreateWithoutBeneficiaryRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutBeneficiaryRequestsInput
    upsert?: UserUpsertWithoutBeneficiaryRequestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBeneficiaryRequestsInput, UserUpdateWithoutBeneficiaryRequestsInput>, UserUncheckedUpdateWithoutBeneficiaryRequestsInput>
  }

  export type RequestLogUpdateManyWithoutRequestNestedInput = {
    create?: XOR<RequestLogCreateWithoutRequestInput, RequestLogUncheckedCreateWithoutRequestInput> | RequestLogCreateWithoutRequestInput[] | RequestLogUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: RequestLogCreateOrConnectWithoutRequestInput | RequestLogCreateOrConnectWithoutRequestInput[]
    upsert?: RequestLogUpsertWithWhereUniqueWithoutRequestInput | RequestLogUpsertWithWhereUniqueWithoutRequestInput[]
    createMany?: RequestLogCreateManyRequestInputEnvelope
    set?: RequestLogWhereUniqueInput | RequestLogWhereUniqueInput[]
    disconnect?: RequestLogWhereUniqueInput | RequestLogWhereUniqueInput[]
    delete?: RequestLogWhereUniqueInput | RequestLogWhereUniqueInput[]
    connect?: RequestLogWhereUniqueInput | RequestLogWhereUniqueInput[]
    update?: RequestLogUpdateWithWhereUniqueWithoutRequestInput | RequestLogUpdateWithWhereUniqueWithoutRequestInput[]
    updateMany?: RequestLogUpdateManyWithWhereWithoutRequestInput | RequestLogUpdateManyWithWhereWithoutRequestInput[]
    deleteMany?: RequestLogScalarWhereInput | RequestLogScalarWhereInput[]
  }

  export type RequestRevisionUpdateManyWithoutRequestNestedInput = {
    create?: XOR<RequestRevisionCreateWithoutRequestInput, RequestRevisionUncheckedCreateWithoutRequestInput> | RequestRevisionCreateWithoutRequestInput[] | RequestRevisionUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: RequestRevisionCreateOrConnectWithoutRequestInput | RequestRevisionCreateOrConnectWithoutRequestInput[]
    upsert?: RequestRevisionUpsertWithWhereUniqueWithoutRequestInput | RequestRevisionUpsertWithWhereUniqueWithoutRequestInput[]
    createMany?: RequestRevisionCreateManyRequestInputEnvelope
    set?: RequestRevisionWhereUniqueInput | RequestRevisionWhereUniqueInput[]
    disconnect?: RequestRevisionWhereUniqueInput | RequestRevisionWhereUniqueInput[]
    delete?: RequestRevisionWhereUniqueInput | RequestRevisionWhereUniqueInput[]
    connect?: RequestRevisionWhereUniqueInput | RequestRevisionWhereUniqueInput[]
    update?: RequestRevisionUpdateWithWhereUniqueWithoutRequestInput | RequestRevisionUpdateWithWhereUniqueWithoutRequestInput[]
    updateMany?: RequestRevisionUpdateManyWithWhereWithoutRequestInput | RequestRevisionUpdateManyWithWhereWithoutRequestInput[]
    deleteMany?: RequestRevisionScalarWhereInput | RequestRevisionScalarWhereInput[]
  }

  export type RequestLogUncheckedUpdateManyWithoutRequestNestedInput = {
    create?: XOR<RequestLogCreateWithoutRequestInput, RequestLogUncheckedCreateWithoutRequestInput> | RequestLogCreateWithoutRequestInput[] | RequestLogUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: RequestLogCreateOrConnectWithoutRequestInput | RequestLogCreateOrConnectWithoutRequestInput[]
    upsert?: RequestLogUpsertWithWhereUniqueWithoutRequestInput | RequestLogUpsertWithWhereUniqueWithoutRequestInput[]
    createMany?: RequestLogCreateManyRequestInputEnvelope
    set?: RequestLogWhereUniqueInput | RequestLogWhereUniqueInput[]
    disconnect?: RequestLogWhereUniqueInput | RequestLogWhereUniqueInput[]
    delete?: RequestLogWhereUniqueInput | RequestLogWhereUniqueInput[]
    connect?: RequestLogWhereUniqueInput | RequestLogWhereUniqueInput[]
    update?: RequestLogUpdateWithWhereUniqueWithoutRequestInput | RequestLogUpdateWithWhereUniqueWithoutRequestInput[]
    updateMany?: RequestLogUpdateManyWithWhereWithoutRequestInput | RequestLogUpdateManyWithWhereWithoutRequestInput[]
    deleteMany?: RequestLogScalarWhereInput | RequestLogScalarWhereInput[]
  }

  export type RequestRevisionUncheckedUpdateManyWithoutRequestNestedInput = {
    create?: XOR<RequestRevisionCreateWithoutRequestInput, RequestRevisionUncheckedCreateWithoutRequestInput> | RequestRevisionCreateWithoutRequestInput[] | RequestRevisionUncheckedCreateWithoutRequestInput[]
    connectOrCreate?: RequestRevisionCreateOrConnectWithoutRequestInput | RequestRevisionCreateOrConnectWithoutRequestInput[]
    upsert?: RequestRevisionUpsertWithWhereUniqueWithoutRequestInput | RequestRevisionUpsertWithWhereUniqueWithoutRequestInput[]
    createMany?: RequestRevisionCreateManyRequestInputEnvelope
    set?: RequestRevisionWhereUniqueInput | RequestRevisionWhereUniqueInput[]
    disconnect?: RequestRevisionWhereUniqueInput | RequestRevisionWhereUniqueInput[]
    delete?: RequestRevisionWhereUniqueInput | RequestRevisionWhereUniqueInput[]
    connect?: RequestRevisionWhereUniqueInput | RequestRevisionWhereUniqueInput[]
    update?: RequestRevisionUpdateWithWhereUniqueWithoutRequestInput | RequestRevisionUpdateWithWhereUniqueWithoutRequestInput[]
    updateMany?: RequestRevisionUpdateManyWithWhereWithoutRequestInput | RequestRevisionUpdateManyWithWhereWithoutRequestInput[]
    deleteMany?: RequestRevisionScalarWhereInput | RequestRevisionScalarWhereInput[]
  }

  export type BeneficiaryRequestCreateNestedOneWithoutLogsInput = {
    create?: XOR<BeneficiaryRequestCreateWithoutLogsInput, BeneficiaryRequestUncheckedCreateWithoutLogsInput>
    connectOrCreate?: BeneficiaryRequestCreateOrConnectWithoutLogsInput
    connect?: BeneficiaryRequestWhereUniqueInput
  }

  export type BeneficiaryRequestUpdateOneRequiredWithoutLogsNestedInput = {
    create?: XOR<BeneficiaryRequestCreateWithoutLogsInput, BeneficiaryRequestUncheckedCreateWithoutLogsInput>
    connectOrCreate?: BeneficiaryRequestCreateOrConnectWithoutLogsInput
    upsert?: BeneficiaryRequestUpsertWithoutLogsInput
    connect?: BeneficiaryRequestWhereUniqueInput
    update?: XOR<XOR<BeneficiaryRequestUpdateToOneWithWhereWithoutLogsInput, BeneficiaryRequestUpdateWithoutLogsInput>, BeneficiaryRequestUncheckedUpdateWithoutLogsInput>
  }

  export type BeneficiaryRequestCreateNestedOneWithoutRevisionsInput = {
    create?: XOR<BeneficiaryRequestCreateWithoutRevisionsInput, BeneficiaryRequestUncheckedCreateWithoutRevisionsInput>
    connectOrCreate?: BeneficiaryRequestCreateOrConnectWithoutRevisionsInput
    connect?: BeneficiaryRequestWhereUniqueInput
  }

  export type BeneficiaryRequestUpdateOneRequiredWithoutRevisionsNestedInput = {
    create?: XOR<BeneficiaryRequestCreateWithoutRevisionsInput, BeneficiaryRequestUncheckedCreateWithoutRevisionsInput>
    connectOrCreate?: BeneficiaryRequestCreateOrConnectWithoutRevisionsInput
    upsert?: BeneficiaryRequestUpsertWithoutRevisionsInput
    connect?: BeneficiaryRequestWhereUniqueInput
    update?: XOR<XOR<BeneficiaryRequestUpdateToOneWithWhereWithoutRevisionsInput, BeneficiaryRequestUpdateWithoutRevisionsInput>, BeneficiaryRequestUncheckedUpdateWithoutRevisionsInput>
  }

  export type NullableEnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role | null
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
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

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumBeneficiaryRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BeneficiaryRequestStatus | EnumBeneficiaryRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BeneficiaryRequestStatus[]
    notIn?: $Enums.BeneficiaryRequestStatus[]
    not?: NestedEnumBeneficiaryRequestStatusFilter<$PrismaModel> | $Enums.BeneficiaryRequestStatus
  }

  export type NestedEnumGenderFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[]
    notIn?: $Enums.Gender[]
    not?: NestedEnumGenderFilter<$PrismaModel> | $Enums.Gender
  }

  export type NestedEnumBeneficiaryRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BeneficiaryRequestStatus | EnumBeneficiaryRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BeneficiaryRequestStatus[]
    notIn?: $Enums.BeneficiaryRequestStatus[]
    not?: NestedEnumBeneficiaryRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.BeneficiaryRequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBeneficiaryRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumBeneficiaryRequestStatusFilter<$PrismaModel>
  }

  export type NestedEnumGenderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Gender | EnumGenderFieldRefInput<$PrismaModel>
    in?: $Enums.Gender[]
    notIn?: $Enums.Gender[]
    not?: NestedEnumGenderWithAggregatesFilter<$PrismaModel> | $Enums.Gender
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumGenderFilter<$PrismaModel>
    _max?: NestedEnumGenderFilter<$PrismaModel>
  }

  export type NestedEnumRoleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.Role[] | null
    notIn?: $Enums.Role[] | null
    not?: NestedEnumRoleNullableFilter<$PrismaModel> | $Enums.Role | null
  }

  export type NestedEnumRoleNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.Role[] | null
    notIn?: $Enums.Role[] | null
    not?: NestedEnumRoleNullableWithAggregatesFilter<$PrismaModel> | $Enums.Role | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumRoleNullableFilter<$PrismaModel>
    _max?: NestedEnumRoleNullableFilter<$PrismaModel>
  }

  export type BeneficiaryRequestCreateWithoutUserInput = {
    requestNo: string
    status?: $Enums.BeneficiaryRequestStatus
    type?: string
    companyNameKh?: string | null
    companyNameEn: string
    registrationNo: string
    registrationDate: Date | string
    companyProvince: string
    companyDistrict: string
    companyCommune: string
    companyVillage: string
    companyStreet: string
    companyHouse: string
    companyPhone: string
    companyOfficePhone?: string | null
    companyEmail: string
    shLastNameKh?: string | null
    shFirstNameKh?: string | null
    shLastNameEn: string
    shFirstNameEn: string
    shDob: Date | string
    shNationality: string
    shGender: $Enums.Gender
    shIdCard?: string | null
    shIdIssuedDate?: Date | string | null
    shIdExpiredDate?: Date | string | null
    shEmail?: string | null
    shPhone?: string | null
    shPhotoName?: string | null
    shIdDocNames?: string
    ownerLastNameKh?: string | null
    ownerFirstNameKh?: string | null
    ownerLastNameEn: string
    ownerFirstNameEn: string
    ownerDob: Date | string
    ownerNationality: string
    ownerGender: $Enums.Gender
    ownerIdCard?: string | null
    ownerIdIssuedDate?: Date | string | null
    ownerIdExpiredDate?: Date | string | null
    ownerEmail?: string | null
    ownerPhone?: string | null
    ownerPhotoName?: string | null
    ownerIdDocNames?: string
    shareAmount: string
    shareholderContractDocNames?: string
    otherDocNames?: string
    consentAgreed?: boolean
    rejectionReason?: string | null
    submittedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    logs?: RequestLogCreateNestedManyWithoutRequestInput
    revisions?: RequestRevisionCreateNestedManyWithoutRequestInput
  }

  export type BeneficiaryRequestUncheckedCreateWithoutUserInput = {
    id?: number
    requestNo: string
    status?: $Enums.BeneficiaryRequestStatus
    type?: string
    companyNameKh?: string | null
    companyNameEn: string
    registrationNo: string
    registrationDate: Date | string
    companyProvince: string
    companyDistrict: string
    companyCommune: string
    companyVillage: string
    companyStreet: string
    companyHouse: string
    companyPhone: string
    companyOfficePhone?: string | null
    companyEmail: string
    shLastNameKh?: string | null
    shFirstNameKh?: string | null
    shLastNameEn: string
    shFirstNameEn: string
    shDob: Date | string
    shNationality: string
    shGender: $Enums.Gender
    shIdCard?: string | null
    shIdIssuedDate?: Date | string | null
    shIdExpiredDate?: Date | string | null
    shEmail?: string | null
    shPhone?: string | null
    shPhotoName?: string | null
    shIdDocNames?: string
    ownerLastNameKh?: string | null
    ownerFirstNameKh?: string | null
    ownerLastNameEn: string
    ownerFirstNameEn: string
    ownerDob: Date | string
    ownerNationality: string
    ownerGender: $Enums.Gender
    ownerIdCard?: string | null
    ownerIdIssuedDate?: Date | string | null
    ownerIdExpiredDate?: Date | string | null
    ownerEmail?: string | null
    ownerPhone?: string | null
    ownerPhotoName?: string | null
    ownerIdDocNames?: string
    shareAmount: string
    shareholderContractDocNames?: string
    otherDocNames?: string
    consentAgreed?: boolean
    rejectionReason?: string | null
    submittedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    logs?: RequestLogUncheckedCreateNestedManyWithoutRequestInput
    revisions?: RequestRevisionUncheckedCreateNestedManyWithoutRequestInput
  }

  export type BeneficiaryRequestCreateOrConnectWithoutUserInput = {
    where: BeneficiaryRequestWhereUniqueInput
    create: XOR<BeneficiaryRequestCreateWithoutUserInput, BeneficiaryRequestUncheckedCreateWithoutUserInput>
  }

  export type BeneficiaryRequestCreateManyUserInputEnvelope = {
    data: BeneficiaryRequestCreateManyUserInput | BeneficiaryRequestCreateManyUserInput[]
  }

  export type StaffRoleCreateWithoutUsersInput = {
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    permissions?: StaffRolePermissionCreateNestedManyWithoutStaffRoleInput
  }

  export type StaffRoleUncheckedCreateWithoutUsersInput = {
    id?: number
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    permissions?: StaffRolePermissionUncheckedCreateNestedManyWithoutStaffRoleInput
  }

  export type StaffRoleCreateOrConnectWithoutUsersInput = {
    where: StaffRoleWhereUniqueInput
    create: XOR<StaffRoleCreateWithoutUsersInput, StaffRoleUncheckedCreateWithoutUsersInput>
  }

  export type BeneficiaryRequestUpsertWithWhereUniqueWithoutUserInput = {
    where: BeneficiaryRequestWhereUniqueInput
    update: XOR<BeneficiaryRequestUpdateWithoutUserInput, BeneficiaryRequestUncheckedUpdateWithoutUserInput>
    create: XOR<BeneficiaryRequestCreateWithoutUserInput, BeneficiaryRequestUncheckedCreateWithoutUserInput>
  }

  export type BeneficiaryRequestUpdateWithWhereUniqueWithoutUserInput = {
    where: BeneficiaryRequestWhereUniqueInput
    data: XOR<BeneficiaryRequestUpdateWithoutUserInput, BeneficiaryRequestUncheckedUpdateWithoutUserInput>
  }

  export type BeneficiaryRequestUpdateManyWithWhereWithoutUserInput = {
    where: BeneficiaryRequestScalarWhereInput
    data: XOR<BeneficiaryRequestUpdateManyMutationInput, BeneficiaryRequestUncheckedUpdateManyWithoutUserInput>
  }

  export type BeneficiaryRequestScalarWhereInput = {
    AND?: BeneficiaryRequestScalarWhereInput | BeneficiaryRequestScalarWhereInput[]
    OR?: BeneficiaryRequestScalarWhereInput[]
    NOT?: BeneficiaryRequestScalarWhereInput | BeneficiaryRequestScalarWhereInput[]
    id?: IntFilter<"BeneficiaryRequest"> | number
    requestNo?: StringFilter<"BeneficiaryRequest"> | string
    userId?: IntFilter<"BeneficiaryRequest"> | number
    status?: EnumBeneficiaryRequestStatusFilter<"BeneficiaryRequest"> | $Enums.BeneficiaryRequestStatus
    type?: StringFilter<"BeneficiaryRequest"> | string
    companyNameKh?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    companyNameEn?: StringFilter<"BeneficiaryRequest"> | string
    registrationNo?: StringFilter<"BeneficiaryRequest"> | string
    registrationDate?: DateTimeFilter<"BeneficiaryRequest"> | Date | string
    companyProvince?: StringFilter<"BeneficiaryRequest"> | string
    companyDistrict?: StringFilter<"BeneficiaryRequest"> | string
    companyCommune?: StringFilter<"BeneficiaryRequest"> | string
    companyVillage?: StringFilter<"BeneficiaryRequest"> | string
    companyStreet?: StringFilter<"BeneficiaryRequest"> | string
    companyHouse?: StringFilter<"BeneficiaryRequest"> | string
    companyPhone?: StringFilter<"BeneficiaryRequest"> | string
    companyOfficePhone?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    companyEmail?: StringFilter<"BeneficiaryRequest"> | string
    shLastNameKh?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    shFirstNameKh?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    shLastNameEn?: StringFilter<"BeneficiaryRequest"> | string
    shFirstNameEn?: StringFilter<"BeneficiaryRequest"> | string
    shDob?: DateTimeFilter<"BeneficiaryRequest"> | Date | string
    shNationality?: StringFilter<"BeneficiaryRequest"> | string
    shGender?: EnumGenderFilter<"BeneficiaryRequest"> | $Enums.Gender
    shIdCard?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    shIdIssuedDate?: DateTimeNullableFilter<"BeneficiaryRequest"> | Date | string | null
    shIdExpiredDate?: DateTimeNullableFilter<"BeneficiaryRequest"> | Date | string | null
    shEmail?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    shPhone?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    shPhotoName?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    shIdDocNames?: StringFilter<"BeneficiaryRequest"> | string
    ownerLastNameKh?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    ownerFirstNameKh?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    ownerLastNameEn?: StringFilter<"BeneficiaryRequest"> | string
    ownerFirstNameEn?: StringFilter<"BeneficiaryRequest"> | string
    ownerDob?: DateTimeFilter<"BeneficiaryRequest"> | Date | string
    ownerNationality?: StringFilter<"BeneficiaryRequest"> | string
    ownerGender?: EnumGenderFilter<"BeneficiaryRequest"> | $Enums.Gender
    ownerIdCard?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    ownerIdIssuedDate?: DateTimeNullableFilter<"BeneficiaryRequest"> | Date | string | null
    ownerIdExpiredDate?: DateTimeNullableFilter<"BeneficiaryRequest"> | Date | string | null
    ownerEmail?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    ownerPhone?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    ownerPhotoName?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    ownerIdDocNames?: StringFilter<"BeneficiaryRequest"> | string
    shareAmount?: StringFilter<"BeneficiaryRequest"> | string
    shareholderContractDocNames?: StringFilter<"BeneficiaryRequest"> | string
    otherDocNames?: StringFilter<"BeneficiaryRequest"> | string
    consentAgreed?: BoolFilter<"BeneficiaryRequest"> | boolean
    rejectionReason?: StringNullableFilter<"BeneficiaryRequest"> | string | null
    submittedAt?: DateTimeFilter<"BeneficiaryRequest"> | Date | string
    createdAt?: DateTimeFilter<"BeneficiaryRequest"> | Date | string
    updatedAt?: DateTimeFilter<"BeneficiaryRequest"> | Date | string
  }

  export type StaffRoleUpsertWithoutUsersInput = {
    update: XOR<StaffRoleUpdateWithoutUsersInput, StaffRoleUncheckedUpdateWithoutUsersInput>
    create: XOR<StaffRoleCreateWithoutUsersInput, StaffRoleUncheckedCreateWithoutUsersInput>
    where?: StaffRoleWhereInput
  }

  export type StaffRoleUpdateToOneWithWhereWithoutUsersInput = {
    where?: StaffRoleWhereInput
    data: XOR<StaffRoleUpdateWithoutUsersInput, StaffRoleUncheckedUpdateWithoutUsersInput>
  }

  export type StaffRoleUpdateWithoutUsersInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: StaffRolePermissionUpdateManyWithoutStaffRoleNestedInput
  }

  export type StaffRoleUncheckedUpdateWithoutUsersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    permissions?: StaffRolePermissionUncheckedUpdateManyWithoutStaffRoleNestedInput
  }

  export type UserCreateWithoutStaffRoleInput = {
    username: string
    email: string
    passwordHash: string
    fullName: string
    companyName?: string | null
    firstName?: string | null
    lastName?: string | null
    phoneNumber?: string | null
    role?: $Enums.Role
    isActive?: boolean
    registrationReturnReason?: string | null
    registrationReturnedAt?: Date | string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    notificationsSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    beneficiaryRequests?: BeneficiaryRequestCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutStaffRoleInput = {
    id?: number
    username: string
    email: string
    passwordHash: string
    fullName: string
    companyName?: string | null
    firstName?: string | null
    lastName?: string | null
    phoneNumber?: string | null
    role?: $Enums.Role
    isActive?: boolean
    registrationReturnReason?: string | null
    registrationReturnedAt?: Date | string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    notificationsSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    beneficiaryRequests?: BeneficiaryRequestUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutStaffRoleInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStaffRoleInput, UserUncheckedCreateWithoutStaffRoleInput>
  }

  export type UserCreateManyStaffRoleInputEnvelope = {
    data: UserCreateManyStaffRoleInput | UserCreateManyStaffRoleInput[]
  }

  export type StaffRolePermissionCreateWithoutStaffRoleInput = {
    create?: boolean
    read?: boolean
    update?: boolean
    delete?: boolean
    module: PermissionModuleCreateNestedOneWithoutRolePermissionsInput
  }

  export type StaffRolePermissionUncheckedCreateWithoutStaffRoleInput = {
    moduleId: number
    create?: boolean
    read?: boolean
    update?: boolean
    delete?: boolean
  }

  export type StaffRolePermissionCreateOrConnectWithoutStaffRoleInput = {
    where: StaffRolePermissionWhereUniqueInput
    create: XOR<StaffRolePermissionCreateWithoutStaffRoleInput, StaffRolePermissionUncheckedCreateWithoutStaffRoleInput>
  }

  export type StaffRolePermissionCreateManyStaffRoleInputEnvelope = {
    data: StaffRolePermissionCreateManyStaffRoleInput | StaffRolePermissionCreateManyStaffRoleInput[]
  }

  export type UserUpsertWithWhereUniqueWithoutStaffRoleInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutStaffRoleInput, UserUncheckedUpdateWithoutStaffRoleInput>
    create: XOR<UserCreateWithoutStaffRoleInput, UserUncheckedCreateWithoutStaffRoleInput>
  }

  export type UserUpdateWithWhereUniqueWithoutStaffRoleInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutStaffRoleInput, UserUncheckedUpdateWithoutStaffRoleInput>
  }

  export type UserUpdateManyWithWhereWithoutStaffRoleInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutStaffRoleInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    id?: IntFilter<"User"> | number
    username?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    fullName?: StringFilter<"User"> | string
    companyName?: StringNullableFilter<"User"> | string | null
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    phoneNumber?: StringNullableFilter<"User"> | string | null
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isActive?: BoolFilter<"User"> | boolean
    registrationReturnReason?: StringNullableFilter<"User"> | string | null
    registrationReturnedAt?: DateTimeNullableFilter<"User"> | Date | string | null
    resetToken?: StringNullableFilter<"User"> | string | null
    resetTokenExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    notificationsSeenAt?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    staffRoleId?: IntNullableFilter<"User"> | number | null
  }

  export type StaffRolePermissionUpsertWithWhereUniqueWithoutStaffRoleInput = {
    where: StaffRolePermissionWhereUniqueInput
    update: XOR<StaffRolePermissionUpdateWithoutStaffRoleInput, StaffRolePermissionUncheckedUpdateWithoutStaffRoleInput>
    create: XOR<StaffRolePermissionCreateWithoutStaffRoleInput, StaffRolePermissionUncheckedCreateWithoutStaffRoleInput>
  }

  export type StaffRolePermissionUpdateWithWhereUniqueWithoutStaffRoleInput = {
    where: StaffRolePermissionWhereUniqueInput
    data: XOR<StaffRolePermissionUpdateWithoutStaffRoleInput, StaffRolePermissionUncheckedUpdateWithoutStaffRoleInput>
  }

  export type StaffRolePermissionUpdateManyWithWhereWithoutStaffRoleInput = {
    where: StaffRolePermissionScalarWhereInput
    data: XOR<StaffRolePermissionUpdateManyMutationInput, StaffRolePermissionUncheckedUpdateManyWithoutStaffRoleInput>
  }

  export type StaffRolePermissionScalarWhereInput = {
    AND?: StaffRolePermissionScalarWhereInput | StaffRolePermissionScalarWhereInput[]
    OR?: StaffRolePermissionScalarWhereInput[]
    NOT?: StaffRolePermissionScalarWhereInput | StaffRolePermissionScalarWhereInput[]
    staffRoleId?: IntFilter<"StaffRolePermission"> | number
    moduleId?: IntFilter<"StaffRolePermission"> | number
    create?: BoolFilter<"StaffRolePermission"> | boolean
    read?: BoolFilter<"StaffRolePermission"> | boolean
    update?: BoolFilter<"StaffRolePermission"> | boolean
    delete?: BoolFilter<"StaffRolePermission"> | boolean
  }

  export type StaffRolePermissionCreateWithoutModuleInput = {
    create?: boolean
    read?: boolean
    update?: boolean
    delete?: boolean
    staffRole: StaffRoleCreateNestedOneWithoutPermissionsInput
  }

  export type StaffRolePermissionUncheckedCreateWithoutModuleInput = {
    staffRoleId: number
    create?: boolean
    read?: boolean
    update?: boolean
    delete?: boolean
  }

  export type StaffRolePermissionCreateOrConnectWithoutModuleInput = {
    where: StaffRolePermissionWhereUniqueInput
    create: XOR<StaffRolePermissionCreateWithoutModuleInput, StaffRolePermissionUncheckedCreateWithoutModuleInput>
  }

  export type StaffRolePermissionCreateManyModuleInputEnvelope = {
    data: StaffRolePermissionCreateManyModuleInput | StaffRolePermissionCreateManyModuleInput[]
  }

  export type StaffRolePermissionUpsertWithWhereUniqueWithoutModuleInput = {
    where: StaffRolePermissionWhereUniqueInput
    update: XOR<StaffRolePermissionUpdateWithoutModuleInput, StaffRolePermissionUncheckedUpdateWithoutModuleInput>
    create: XOR<StaffRolePermissionCreateWithoutModuleInput, StaffRolePermissionUncheckedCreateWithoutModuleInput>
  }

  export type StaffRolePermissionUpdateWithWhereUniqueWithoutModuleInput = {
    where: StaffRolePermissionWhereUniqueInput
    data: XOR<StaffRolePermissionUpdateWithoutModuleInput, StaffRolePermissionUncheckedUpdateWithoutModuleInput>
  }

  export type StaffRolePermissionUpdateManyWithWhereWithoutModuleInput = {
    where: StaffRolePermissionScalarWhereInput
    data: XOR<StaffRolePermissionUpdateManyMutationInput, StaffRolePermissionUncheckedUpdateManyWithoutModuleInput>
  }

  export type StaffRoleCreateWithoutPermissionsInput = {
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserCreateNestedManyWithoutStaffRoleInput
  }

  export type StaffRoleUncheckedCreateWithoutPermissionsInput = {
    id?: number
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    users?: UserUncheckedCreateNestedManyWithoutStaffRoleInput
  }

  export type StaffRoleCreateOrConnectWithoutPermissionsInput = {
    where: StaffRoleWhereUniqueInput
    create: XOR<StaffRoleCreateWithoutPermissionsInput, StaffRoleUncheckedCreateWithoutPermissionsInput>
  }

  export type PermissionModuleCreateWithoutRolePermissionsInput = {
    name: string
    label: string
    description?: string | null
  }

  export type PermissionModuleUncheckedCreateWithoutRolePermissionsInput = {
    id?: number
    name: string
    label: string
    description?: string | null
  }

  export type PermissionModuleCreateOrConnectWithoutRolePermissionsInput = {
    where: PermissionModuleWhereUniqueInput
    create: XOR<PermissionModuleCreateWithoutRolePermissionsInput, PermissionModuleUncheckedCreateWithoutRolePermissionsInput>
  }

  export type StaffRoleUpsertWithoutPermissionsInput = {
    update: XOR<StaffRoleUpdateWithoutPermissionsInput, StaffRoleUncheckedUpdateWithoutPermissionsInput>
    create: XOR<StaffRoleCreateWithoutPermissionsInput, StaffRoleUncheckedCreateWithoutPermissionsInput>
    where?: StaffRoleWhereInput
  }

  export type StaffRoleUpdateToOneWithWhereWithoutPermissionsInput = {
    where?: StaffRoleWhereInput
    data: XOR<StaffRoleUpdateWithoutPermissionsInput, StaffRoleUncheckedUpdateWithoutPermissionsInput>
  }

  export type StaffRoleUpdateWithoutPermissionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUpdateManyWithoutStaffRoleNestedInput
  }

  export type StaffRoleUncheckedUpdateWithoutPermissionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    users?: UserUncheckedUpdateManyWithoutStaffRoleNestedInput
  }

  export type PermissionModuleUpsertWithoutRolePermissionsInput = {
    update: XOR<PermissionModuleUpdateWithoutRolePermissionsInput, PermissionModuleUncheckedUpdateWithoutRolePermissionsInput>
    create: XOR<PermissionModuleCreateWithoutRolePermissionsInput, PermissionModuleUncheckedCreateWithoutRolePermissionsInput>
    where?: PermissionModuleWhereInput
  }

  export type PermissionModuleUpdateToOneWithWhereWithoutRolePermissionsInput = {
    where?: PermissionModuleWhereInput
    data: XOR<PermissionModuleUpdateWithoutRolePermissionsInput, PermissionModuleUncheckedUpdateWithoutRolePermissionsInput>
  }

  export type PermissionModuleUpdateWithoutRolePermissionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PermissionModuleUncheckedUpdateWithoutRolePermissionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserCreateWithoutBeneficiaryRequestsInput = {
    username: string
    email: string
    passwordHash: string
    fullName: string
    companyName?: string | null
    firstName?: string | null
    lastName?: string | null
    phoneNumber?: string | null
    role?: $Enums.Role
    isActive?: boolean
    registrationReturnReason?: string | null
    registrationReturnedAt?: Date | string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    notificationsSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    staffRole?: StaffRoleCreateNestedOneWithoutUsersInput
  }

  export type UserUncheckedCreateWithoutBeneficiaryRequestsInput = {
    id?: number
    username: string
    email: string
    passwordHash: string
    fullName: string
    companyName?: string | null
    firstName?: string | null
    lastName?: string | null
    phoneNumber?: string | null
    role?: $Enums.Role
    isActive?: boolean
    registrationReturnReason?: string | null
    registrationReturnedAt?: Date | string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    notificationsSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    staffRoleId?: number | null
  }

  export type UserCreateOrConnectWithoutBeneficiaryRequestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBeneficiaryRequestsInput, UserUncheckedCreateWithoutBeneficiaryRequestsInput>
  }

  export type RequestLogCreateWithoutRequestInput = {
    action: string
    actorUserId: number
    actorRole: $Enums.Role
    actorName: string
    note?: string | null
    createdAt?: Date | string
  }

  export type RequestLogUncheckedCreateWithoutRequestInput = {
    id?: number
    action: string
    actorUserId: number
    actorRole: $Enums.Role
    actorName: string
    note?: string | null
    createdAt?: Date | string
  }

  export type RequestLogCreateOrConnectWithoutRequestInput = {
    where: RequestLogWhereUniqueInput
    create: XOR<RequestLogCreateWithoutRequestInput, RequestLogUncheckedCreateWithoutRequestInput>
  }

  export type RequestLogCreateManyRequestInputEnvelope = {
    data: RequestLogCreateManyRequestInput | RequestLogCreateManyRequestInput[]
  }

  export type RequestRevisionCreateWithoutRequestInput = {
    editedByUserId: number
    editedByRole: $Enums.Role
    editedByName: string
    previousData: string
    newData: string
    approvedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RequestRevisionUncheckedCreateWithoutRequestInput = {
    id?: number
    editedByUserId: number
    editedByRole: $Enums.Role
    editedByName: string
    previousData: string
    newData: string
    approvedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RequestRevisionCreateOrConnectWithoutRequestInput = {
    where: RequestRevisionWhereUniqueInput
    create: XOR<RequestRevisionCreateWithoutRequestInput, RequestRevisionUncheckedCreateWithoutRequestInput>
  }

  export type RequestRevisionCreateManyRequestInputEnvelope = {
    data: RequestRevisionCreateManyRequestInput | RequestRevisionCreateManyRequestInput[]
  }

  export type UserUpsertWithoutBeneficiaryRequestsInput = {
    update: XOR<UserUpdateWithoutBeneficiaryRequestsInput, UserUncheckedUpdateWithoutBeneficiaryRequestsInput>
    create: XOR<UserCreateWithoutBeneficiaryRequestsInput, UserUncheckedCreateWithoutBeneficiaryRequestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBeneficiaryRequestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBeneficiaryRequestsInput, UserUncheckedUpdateWithoutBeneficiaryRequestsInput>
  }

  export type UserUpdateWithoutBeneficiaryRequestsInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    registrationReturnReason?: NullableStringFieldUpdateOperationsInput | string | null
    registrationReturnedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notificationsSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    staffRole?: StaffRoleUpdateOneWithoutUsersNestedInput
  }

  export type UserUncheckedUpdateWithoutBeneficiaryRequestsInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    registrationReturnReason?: NullableStringFieldUpdateOperationsInput | string | null
    registrationReturnedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notificationsSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    staffRoleId?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type RequestLogUpsertWithWhereUniqueWithoutRequestInput = {
    where: RequestLogWhereUniqueInput
    update: XOR<RequestLogUpdateWithoutRequestInput, RequestLogUncheckedUpdateWithoutRequestInput>
    create: XOR<RequestLogCreateWithoutRequestInput, RequestLogUncheckedCreateWithoutRequestInput>
  }

  export type RequestLogUpdateWithWhereUniqueWithoutRequestInput = {
    where: RequestLogWhereUniqueInput
    data: XOR<RequestLogUpdateWithoutRequestInput, RequestLogUncheckedUpdateWithoutRequestInput>
  }

  export type RequestLogUpdateManyWithWhereWithoutRequestInput = {
    where: RequestLogScalarWhereInput
    data: XOR<RequestLogUpdateManyMutationInput, RequestLogUncheckedUpdateManyWithoutRequestInput>
  }

  export type RequestLogScalarWhereInput = {
    AND?: RequestLogScalarWhereInput | RequestLogScalarWhereInput[]
    OR?: RequestLogScalarWhereInput[]
    NOT?: RequestLogScalarWhereInput | RequestLogScalarWhereInput[]
    id?: IntFilter<"RequestLog"> | number
    requestId?: IntFilter<"RequestLog"> | number
    action?: StringFilter<"RequestLog"> | string
    actorUserId?: IntFilter<"RequestLog"> | number
    actorRole?: EnumRoleFilter<"RequestLog"> | $Enums.Role
    actorName?: StringFilter<"RequestLog"> | string
    note?: StringNullableFilter<"RequestLog"> | string | null
    createdAt?: DateTimeFilter<"RequestLog"> | Date | string
  }

  export type RequestRevisionUpsertWithWhereUniqueWithoutRequestInput = {
    where: RequestRevisionWhereUniqueInput
    update: XOR<RequestRevisionUpdateWithoutRequestInput, RequestRevisionUncheckedUpdateWithoutRequestInput>
    create: XOR<RequestRevisionCreateWithoutRequestInput, RequestRevisionUncheckedCreateWithoutRequestInput>
  }

  export type RequestRevisionUpdateWithWhereUniqueWithoutRequestInput = {
    where: RequestRevisionWhereUniqueInput
    data: XOR<RequestRevisionUpdateWithoutRequestInput, RequestRevisionUncheckedUpdateWithoutRequestInput>
  }

  export type RequestRevisionUpdateManyWithWhereWithoutRequestInput = {
    where: RequestRevisionScalarWhereInput
    data: XOR<RequestRevisionUpdateManyMutationInput, RequestRevisionUncheckedUpdateManyWithoutRequestInput>
  }

  export type RequestRevisionScalarWhereInput = {
    AND?: RequestRevisionScalarWhereInput | RequestRevisionScalarWhereInput[]
    OR?: RequestRevisionScalarWhereInput[]
    NOT?: RequestRevisionScalarWhereInput | RequestRevisionScalarWhereInput[]
    id?: IntFilter<"RequestRevision"> | number
    requestId?: IntFilter<"RequestRevision"> | number
    editedByUserId?: IntFilter<"RequestRevision"> | number
    editedByRole?: EnumRoleFilter<"RequestRevision"> | $Enums.Role
    editedByName?: StringFilter<"RequestRevision"> | string
    previousData?: StringFilter<"RequestRevision"> | string
    newData?: StringFilter<"RequestRevision"> | string
    approvedAt?: DateTimeNullableFilter<"RequestRevision"> | Date | string | null
    createdAt?: DateTimeFilter<"RequestRevision"> | Date | string
  }

  export type BeneficiaryRequestCreateWithoutLogsInput = {
    requestNo: string
    status?: $Enums.BeneficiaryRequestStatus
    type?: string
    companyNameKh?: string | null
    companyNameEn: string
    registrationNo: string
    registrationDate: Date | string
    companyProvince: string
    companyDistrict: string
    companyCommune: string
    companyVillage: string
    companyStreet: string
    companyHouse: string
    companyPhone: string
    companyOfficePhone?: string | null
    companyEmail: string
    shLastNameKh?: string | null
    shFirstNameKh?: string | null
    shLastNameEn: string
    shFirstNameEn: string
    shDob: Date | string
    shNationality: string
    shGender: $Enums.Gender
    shIdCard?: string | null
    shIdIssuedDate?: Date | string | null
    shIdExpiredDate?: Date | string | null
    shEmail?: string | null
    shPhone?: string | null
    shPhotoName?: string | null
    shIdDocNames?: string
    ownerLastNameKh?: string | null
    ownerFirstNameKh?: string | null
    ownerLastNameEn: string
    ownerFirstNameEn: string
    ownerDob: Date | string
    ownerNationality: string
    ownerGender: $Enums.Gender
    ownerIdCard?: string | null
    ownerIdIssuedDate?: Date | string | null
    ownerIdExpiredDate?: Date | string | null
    ownerEmail?: string | null
    ownerPhone?: string | null
    ownerPhotoName?: string | null
    ownerIdDocNames?: string
    shareAmount: string
    shareholderContractDocNames?: string
    otherDocNames?: string
    consentAgreed?: boolean
    rejectionReason?: string | null
    submittedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutBeneficiaryRequestsInput
    revisions?: RequestRevisionCreateNestedManyWithoutRequestInput
  }

  export type BeneficiaryRequestUncheckedCreateWithoutLogsInput = {
    id?: number
    requestNo: string
    userId: number
    status?: $Enums.BeneficiaryRequestStatus
    type?: string
    companyNameKh?: string | null
    companyNameEn: string
    registrationNo: string
    registrationDate: Date | string
    companyProvince: string
    companyDistrict: string
    companyCommune: string
    companyVillage: string
    companyStreet: string
    companyHouse: string
    companyPhone: string
    companyOfficePhone?: string | null
    companyEmail: string
    shLastNameKh?: string | null
    shFirstNameKh?: string | null
    shLastNameEn: string
    shFirstNameEn: string
    shDob: Date | string
    shNationality: string
    shGender: $Enums.Gender
    shIdCard?: string | null
    shIdIssuedDate?: Date | string | null
    shIdExpiredDate?: Date | string | null
    shEmail?: string | null
    shPhone?: string | null
    shPhotoName?: string | null
    shIdDocNames?: string
    ownerLastNameKh?: string | null
    ownerFirstNameKh?: string | null
    ownerLastNameEn: string
    ownerFirstNameEn: string
    ownerDob: Date | string
    ownerNationality: string
    ownerGender: $Enums.Gender
    ownerIdCard?: string | null
    ownerIdIssuedDate?: Date | string | null
    ownerIdExpiredDate?: Date | string | null
    ownerEmail?: string | null
    ownerPhone?: string | null
    ownerPhotoName?: string | null
    ownerIdDocNames?: string
    shareAmount: string
    shareholderContractDocNames?: string
    otherDocNames?: string
    consentAgreed?: boolean
    rejectionReason?: string | null
    submittedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    revisions?: RequestRevisionUncheckedCreateNestedManyWithoutRequestInput
  }

  export type BeneficiaryRequestCreateOrConnectWithoutLogsInput = {
    where: BeneficiaryRequestWhereUniqueInput
    create: XOR<BeneficiaryRequestCreateWithoutLogsInput, BeneficiaryRequestUncheckedCreateWithoutLogsInput>
  }

  export type BeneficiaryRequestUpsertWithoutLogsInput = {
    update: XOR<BeneficiaryRequestUpdateWithoutLogsInput, BeneficiaryRequestUncheckedUpdateWithoutLogsInput>
    create: XOR<BeneficiaryRequestCreateWithoutLogsInput, BeneficiaryRequestUncheckedCreateWithoutLogsInput>
    where?: BeneficiaryRequestWhereInput
  }

  export type BeneficiaryRequestUpdateToOneWithWhereWithoutLogsInput = {
    where?: BeneficiaryRequestWhereInput
    data: XOR<BeneficiaryRequestUpdateWithoutLogsInput, BeneficiaryRequestUncheckedUpdateWithoutLogsInput>
  }

  export type BeneficiaryRequestUpdateWithoutLogsInput = {
    requestNo?: StringFieldUpdateOperationsInput | string
    status?: EnumBeneficiaryRequestStatusFieldUpdateOperationsInput | $Enums.BeneficiaryRequestStatus
    type?: StringFieldUpdateOperationsInput | string
    companyNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    companyNameEn?: StringFieldUpdateOperationsInput | string
    registrationNo?: StringFieldUpdateOperationsInput | string
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    companyProvince?: StringFieldUpdateOperationsInput | string
    companyDistrict?: StringFieldUpdateOperationsInput | string
    companyCommune?: StringFieldUpdateOperationsInput | string
    companyVillage?: StringFieldUpdateOperationsInput | string
    companyStreet?: StringFieldUpdateOperationsInput | string
    companyHouse?: StringFieldUpdateOperationsInput | string
    companyPhone?: StringFieldUpdateOperationsInput | string
    companyOfficePhone?: NullableStringFieldUpdateOperationsInput | string | null
    companyEmail?: StringFieldUpdateOperationsInput | string
    shLastNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    shFirstNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    shLastNameEn?: StringFieldUpdateOperationsInput | string
    shFirstNameEn?: StringFieldUpdateOperationsInput | string
    shDob?: DateTimeFieldUpdateOperationsInput | Date | string
    shNationality?: StringFieldUpdateOperationsInput | string
    shGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    shIdCard?: NullableStringFieldUpdateOperationsInput | string | null
    shIdIssuedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shIdExpiredDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shEmail?: NullableStringFieldUpdateOperationsInput | string | null
    shPhone?: NullableStringFieldUpdateOperationsInput | string | null
    shPhotoName?: NullableStringFieldUpdateOperationsInput | string | null
    shIdDocNames?: StringFieldUpdateOperationsInput | string
    ownerLastNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    ownerFirstNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    ownerLastNameEn?: StringFieldUpdateOperationsInput | string
    ownerFirstNameEn?: StringFieldUpdateOperationsInput | string
    ownerDob?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerNationality?: StringFieldUpdateOperationsInput | string
    ownerGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    ownerIdCard?: NullableStringFieldUpdateOperationsInput | string | null
    ownerIdIssuedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerIdExpiredDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    ownerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    ownerPhotoName?: NullableStringFieldUpdateOperationsInput | string | null
    ownerIdDocNames?: StringFieldUpdateOperationsInput | string
    shareAmount?: StringFieldUpdateOperationsInput | string
    shareholderContractDocNames?: StringFieldUpdateOperationsInput | string
    otherDocNames?: StringFieldUpdateOperationsInput | string
    consentAgreed?: BoolFieldUpdateOperationsInput | boolean
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBeneficiaryRequestsNestedInput
    revisions?: RequestRevisionUpdateManyWithoutRequestNestedInput
  }

  export type BeneficiaryRequestUncheckedUpdateWithoutLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    requestNo?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    status?: EnumBeneficiaryRequestStatusFieldUpdateOperationsInput | $Enums.BeneficiaryRequestStatus
    type?: StringFieldUpdateOperationsInput | string
    companyNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    companyNameEn?: StringFieldUpdateOperationsInput | string
    registrationNo?: StringFieldUpdateOperationsInput | string
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    companyProvince?: StringFieldUpdateOperationsInput | string
    companyDistrict?: StringFieldUpdateOperationsInput | string
    companyCommune?: StringFieldUpdateOperationsInput | string
    companyVillage?: StringFieldUpdateOperationsInput | string
    companyStreet?: StringFieldUpdateOperationsInput | string
    companyHouse?: StringFieldUpdateOperationsInput | string
    companyPhone?: StringFieldUpdateOperationsInput | string
    companyOfficePhone?: NullableStringFieldUpdateOperationsInput | string | null
    companyEmail?: StringFieldUpdateOperationsInput | string
    shLastNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    shFirstNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    shLastNameEn?: StringFieldUpdateOperationsInput | string
    shFirstNameEn?: StringFieldUpdateOperationsInput | string
    shDob?: DateTimeFieldUpdateOperationsInput | Date | string
    shNationality?: StringFieldUpdateOperationsInput | string
    shGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    shIdCard?: NullableStringFieldUpdateOperationsInput | string | null
    shIdIssuedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shIdExpiredDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shEmail?: NullableStringFieldUpdateOperationsInput | string | null
    shPhone?: NullableStringFieldUpdateOperationsInput | string | null
    shPhotoName?: NullableStringFieldUpdateOperationsInput | string | null
    shIdDocNames?: StringFieldUpdateOperationsInput | string
    ownerLastNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    ownerFirstNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    ownerLastNameEn?: StringFieldUpdateOperationsInput | string
    ownerFirstNameEn?: StringFieldUpdateOperationsInput | string
    ownerDob?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerNationality?: StringFieldUpdateOperationsInput | string
    ownerGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    ownerIdCard?: NullableStringFieldUpdateOperationsInput | string | null
    ownerIdIssuedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerIdExpiredDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    ownerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    ownerPhotoName?: NullableStringFieldUpdateOperationsInput | string | null
    ownerIdDocNames?: StringFieldUpdateOperationsInput | string
    shareAmount?: StringFieldUpdateOperationsInput | string
    shareholderContractDocNames?: StringFieldUpdateOperationsInput | string
    otherDocNames?: StringFieldUpdateOperationsInput | string
    consentAgreed?: BoolFieldUpdateOperationsInput | boolean
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revisions?: RequestRevisionUncheckedUpdateManyWithoutRequestNestedInput
  }

  export type BeneficiaryRequestCreateWithoutRevisionsInput = {
    requestNo: string
    status?: $Enums.BeneficiaryRequestStatus
    type?: string
    companyNameKh?: string | null
    companyNameEn: string
    registrationNo: string
    registrationDate: Date | string
    companyProvince: string
    companyDistrict: string
    companyCommune: string
    companyVillage: string
    companyStreet: string
    companyHouse: string
    companyPhone: string
    companyOfficePhone?: string | null
    companyEmail: string
    shLastNameKh?: string | null
    shFirstNameKh?: string | null
    shLastNameEn: string
    shFirstNameEn: string
    shDob: Date | string
    shNationality: string
    shGender: $Enums.Gender
    shIdCard?: string | null
    shIdIssuedDate?: Date | string | null
    shIdExpiredDate?: Date | string | null
    shEmail?: string | null
    shPhone?: string | null
    shPhotoName?: string | null
    shIdDocNames?: string
    ownerLastNameKh?: string | null
    ownerFirstNameKh?: string | null
    ownerLastNameEn: string
    ownerFirstNameEn: string
    ownerDob: Date | string
    ownerNationality: string
    ownerGender: $Enums.Gender
    ownerIdCard?: string | null
    ownerIdIssuedDate?: Date | string | null
    ownerIdExpiredDate?: Date | string | null
    ownerEmail?: string | null
    ownerPhone?: string | null
    ownerPhotoName?: string | null
    ownerIdDocNames?: string
    shareAmount: string
    shareholderContractDocNames?: string
    otherDocNames?: string
    consentAgreed?: boolean
    rejectionReason?: string | null
    submittedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutBeneficiaryRequestsInput
    logs?: RequestLogCreateNestedManyWithoutRequestInput
  }

  export type BeneficiaryRequestUncheckedCreateWithoutRevisionsInput = {
    id?: number
    requestNo: string
    userId: number
    status?: $Enums.BeneficiaryRequestStatus
    type?: string
    companyNameKh?: string | null
    companyNameEn: string
    registrationNo: string
    registrationDate: Date | string
    companyProvince: string
    companyDistrict: string
    companyCommune: string
    companyVillage: string
    companyStreet: string
    companyHouse: string
    companyPhone: string
    companyOfficePhone?: string | null
    companyEmail: string
    shLastNameKh?: string | null
    shFirstNameKh?: string | null
    shLastNameEn: string
    shFirstNameEn: string
    shDob: Date | string
    shNationality: string
    shGender: $Enums.Gender
    shIdCard?: string | null
    shIdIssuedDate?: Date | string | null
    shIdExpiredDate?: Date | string | null
    shEmail?: string | null
    shPhone?: string | null
    shPhotoName?: string | null
    shIdDocNames?: string
    ownerLastNameKh?: string | null
    ownerFirstNameKh?: string | null
    ownerLastNameEn: string
    ownerFirstNameEn: string
    ownerDob: Date | string
    ownerNationality: string
    ownerGender: $Enums.Gender
    ownerIdCard?: string | null
    ownerIdIssuedDate?: Date | string | null
    ownerIdExpiredDate?: Date | string | null
    ownerEmail?: string | null
    ownerPhone?: string | null
    ownerPhotoName?: string | null
    ownerIdDocNames?: string
    shareAmount: string
    shareholderContractDocNames?: string
    otherDocNames?: string
    consentAgreed?: boolean
    rejectionReason?: string | null
    submittedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    logs?: RequestLogUncheckedCreateNestedManyWithoutRequestInput
  }

  export type BeneficiaryRequestCreateOrConnectWithoutRevisionsInput = {
    where: BeneficiaryRequestWhereUniqueInput
    create: XOR<BeneficiaryRequestCreateWithoutRevisionsInput, BeneficiaryRequestUncheckedCreateWithoutRevisionsInput>
  }

  export type BeneficiaryRequestUpsertWithoutRevisionsInput = {
    update: XOR<BeneficiaryRequestUpdateWithoutRevisionsInput, BeneficiaryRequestUncheckedUpdateWithoutRevisionsInput>
    create: XOR<BeneficiaryRequestCreateWithoutRevisionsInput, BeneficiaryRequestUncheckedCreateWithoutRevisionsInput>
    where?: BeneficiaryRequestWhereInput
  }

  export type BeneficiaryRequestUpdateToOneWithWhereWithoutRevisionsInput = {
    where?: BeneficiaryRequestWhereInput
    data: XOR<BeneficiaryRequestUpdateWithoutRevisionsInput, BeneficiaryRequestUncheckedUpdateWithoutRevisionsInput>
  }

  export type BeneficiaryRequestUpdateWithoutRevisionsInput = {
    requestNo?: StringFieldUpdateOperationsInput | string
    status?: EnumBeneficiaryRequestStatusFieldUpdateOperationsInput | $Enums.BeneficiaryRequestStatus
    type?: StringFieldUpdateOperationsInput | string
    companyNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    companyNameEn?: StringFieldUpdateOperationsInput | string
    registrationNo?: StringFieldUpdateOperationsInput | string
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    companyProvince?: StringFieldUpdateOperationsInput | string
    companyDistrict?: StringFieldUpdateOperationsInput | string
    companyCommune?: StringFieldUpdateOperationsInput | string
    companyVillage?: StringFieldUpdateOperationsInput | string
    companyStreet?: StringFieldUpdateOperationsInput | string
    companyHouse?: StringFieldUpdateOperationsInput | string
    companyPhone?: StringFieldUpdateOperationsInput | string
    companyOfficePhone?: NullableStringFieldUpdateOperationsInput | string | null
    companyEmail?: StringFieldUpdateOperationsInput | string
    shLastNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    shFirstNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    shLastNameEn?: StringFieldUpdateOperationsInput | string
    shFirstNameEn?: StringFieldUpdateOperationsInput | string
    shDob?: DateTimeFieldUpdateOperationsInput | Date | string
    shNationality?: StringFieldUpdateOperationsInput | string
    shGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    shIdCard?: NullableStringFieldUpdateOperationsInput | string | null
    shIdIssuedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shIdExpiredDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shEmail?: NullableStringFieldUpdateOperationsInput | string | null
    shPhone?: NullableStringFieldUpdateOperationsInput | string | null
    shPhotoName?: NullableStringFieldUpdateOperationsInput | string | null
    shIdDocNames?: StringFieldUpdateOperationsInput | string
    ownerLastNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    ownerFirstNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    ownerLastNameEn?: StringFieldUpdateOperationsInput | string
    ownerFirstNameEn?: StringFieldUpdateOperationsInput | string
    ownerDob?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerNationality?: StringFieldUpdateOperationsInput | string
    ownerGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    ownerIdCard?: NullableStringFieldUpdateOperationsInput | string | null
    ownerIdIssuedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerIdExpiredDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    ownerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    ownerPhotoName?: NullableStringFieldUpdateOperationsInput | string | null
    ownerIdDocNames?: StringFieldUpdateOperationsInput | string
    shareAmount?: StringFieldUpdateOperationsInput | string
    shareholderContractDocNames?: StringFieldUpdateOperationsInput | string
    otherDocNames?: StringFieldUpdateOperationsInput | string
    consentAgreed?: BoolFieldUpdateOperationsInput | boolean
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutBeneficiaryRequestsNestedInput
    logs?: RequestLogUpdateManyWithoutRequestNestedInput
  }

  export type BeneficiaryRequestUncheckedUpdateWithoutRevisionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    requestNo?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    status?: EnumBeneficiaryRequestStatusFieldUpdateOperationsInput | $Enums.BeneficiaryRequestStatus
    type?: StringFieldUpdateOperationsInput | string
    companyNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    companyNameEn?: StringFieldUpdateOperationsInput | string
    registrationNo?: StringFieldUpdateOperationsInput | string
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    companyProvince?: StringFieldUpdateOperationsInput | string
    companyDistrict?: StringFieldUpdateOperationsInput | string
    companyCommune?: StringFieldUpdateOperationsInput | string
    companyVillage?: StringFieldUpdateOperationsInput | string
    companyStreet?: StringFieldUpdateOperationsInput | string
    companyHouse?: StringFieldUpdateOperationsInput | string
    companyPhone?: StringFieldUpdateOperationsInput | string
    companyOfficePhone?: NullableStringFieldUpdateOperationsInput | string | null
    companyEmail?: StringFieldUpdateOperationsInput | string
    shLastNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    shFirstNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    shLastNameEn?: StringFieldUpdateOperationsInput | string
    shFirstNameEn?: StringFieldUpdateOperationsInput | string
    shDob?: DateTimeFieldUpdateOperationsInput | Date | string
    shNationality?: StringFieldUpdateOperationsInput | string
    shGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    shIdCard?: NullableStringFieldUpdateOperationsInput | string | null
    shIdIssuedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shIdExpiredDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shEmail?: NullableStringFieldUpdateOperationsInput | string | null
    shPhone?: NullableStringFieldUpdateOperationsInput | string | null
    shPhotoName?: NullableStringFieldUpdateOperationsInput | string | null
    shIdDocNames?: StringFieldUpdateOperationsInput | string
    ownerLastNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    ownerFirstNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    ownerLastNameEn?: StringFieldUpdateOperationsInput | string
    ownerFirstNameEn?: StringFieldUpdateOperationsInput | string
    ownerDob?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerNationality?: StringFieldUpdateOperationsInput | string
    ownerGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    ownerIdCard?: NullableStringFieldUpdateOperationsInput | string | null
    ownerIdIssuedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerIdExpiredDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    ownerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    ownerPhotoName?: NullableStringFieldUpdateOperationsInput | string | null
    ownerIdDocNames?: StringFieldUpdateOperationsInput | string
    shareAmount?: StringFieldUpdateOperationsInput | string
    shareholderContractDocNames?: StringFieldUpdateOperationsInput | string
    otherDocNames?: StringFieldUpdateOperationsInput | string
    consentAgreed?: BoolFieldUpdateOperationsInput | boolean
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: RequestLogUncheckedUpdateManyWithoutRequestNestedInput
  }

  export type BeneficiaryRequestCreateManyUserInput = {
    id?: number
    requestNo: string
    status?: $Enums.BeneficiaryRequestStatus
    type?: string
    companyNameKh?: string | null
    companyNameEn: string
    registrationNo: string
    registrationDate: Date | string
    companyProvince: string
    companyDistrict: string
    companyCommune: string
    companyVillage: string
    companyStreet: string
    companyHouse: string
    companyPhone: string
    companyOfficePhone?: string | null
    companyEmail: string
    shLastNameKh?: string | null
    shFirstNameKh?: string | null
    shLastNameEn: string
    shFirstNameEn: string
    shDob: Date | string
    shNationality: string
    shGender: $Enums.Gender
    shIdCard?: string | null
    shIdIssuedDate?: Date | string | null
    shIdExpiredDate?: Date | string | null
    shEmail?: string | null
    shPhone?: string | null
    shPhotoName?: string | null
    shIdDocNames?: string
    ownerLastNameKh?: string | null
    ownerFirstNameKh?: string | null
    ownerLastNameEn: string
    ownerFirstNameEn: string
    ownerDob: Date | string
    ownerNationality: string
    ownerGender: $Enums.Gender
    ownerIdCard?: string | null
    ownerIdIssuedDate?: Date | string | null
    ownerIdExpiredDate?: Date | string | null
    ownerEmail?: string | null
    ownerPhone?: string | null
    ownerPhotoName?: string | null
    ownerIdDocNames?: string
    shareAmount: string
    shareholderContractDocNames?: string
    otherDocNames?: string
    consentAgreed?: boolean
    rejectionReason?: string | null
    submittedAt?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BeneficiaryRequestUpdateWithoutUserInput = {
    requestNo?: StringFieldUpdateOperationsInput | string
    status?: EnumBeneficiaryRequestStatusFieldUpdateOperationsInput | $Enums.BeneficiaryRequestStatus
    type?: StringFieldUpdateOperationsInput | string
    companyNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    companyNameEn?: StringFieldUpdateOperationsInput | string
    registrationNo?: StringFieldUpdateOperationsInput | string
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    companyProvince?: StringFieldUpdateOperationsInput | string
    companyDistrict?: StringFieldUpdateOperationsInput | string
    companyCommune?: StringFieldUpdateOperationsInput | string
    companyVillage?: StringFieldUpdateOperationsInput | string
    companyStreet?: StringFieldUpdateOperationsInput | string
    companyHouse?: StringFieldUpdateOperationsInput | string
    companyPhone?: StringFieldUpdateOperationsInput | string
    companyOfficePhone?: NullableStringFieldUpdateOperationsInput | string | null
    companyEmail?: StringFieldUpdateOperationsInput | string
    shLastNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    shFirstNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    shLastNameEn?: StringFieldUpdateOperationsInput | string
    shFirstNameEn?: StringFieldUpdateOperationsInput | string
    shDob?: DateTimeFieldUpdateOperationsInput | Date | string
    shNationality?: StringFieldUpdateOperationsInput | string
    shGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    shIdCard?: NullableStringFieldUpdateOperationsInput | string | null
    shIdIssuedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shIdExpiredDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shEmail?: NullableStringFieldUpdateOperationsInput | string | null
    shPhone?: NullableStringFieldUpdateOperationsInput | string | null
    shPhotoName?: NullableStringFieldUpdateOperationsInput | string | null
    shIdDocNames?: StringFieldUpdateOperationsInput | string
    ownerLastNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    ownerFirstNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    ownerLastNameEn?: StringFieldUpdateOperationsInput | string
    ownerFirstNameEn?: StringFieldUpdateOperationsInput | string
    ownerDob?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerNationality?: StringFieldUpdateOperationsInput | string
    ownerGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    ownerIdCard?: NullableStringFieldUpdateOperationsInput | string | null
    ownerIdIssuedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerIdExpiredDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    ownerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    ownerPhotoName?: NullableStringFieldUpdateOperationsInput | string | null
    ownerIdDocNames?: StringFieldUpdateOperationsInput | string
    shareAmount?: StringFieldUpdateOperationsInput | string
    shareholderContractDocNames?: StringFieldUpdateOperationsInput | string
    otherDocNames?: StringFieldUpdateOperationsInput | string
    consentAgreed?: BoolFieldUpdateOperationsInput | boolean
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: RequestLogUpdateManyWithoutRequestNestedInput
    revisions?: RequestRevisionUpdateManyWithoutRequestNestedInput
  }

  export type BeneficiaryRequestUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    requestNo?: StringFieldUpdateOperationsInput | string
    status?: EnumBeneficiaryRequestStatusFieldUpdateOperationsInput | $Enums.BeneficiaryRequestStatus
    type?: StringFieldUpdateOperationsInput | string
    companyNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    companyNameEn?: StringFieldUpdateOperationsInput | string
    registrationNo?: StringFieldUpdateOperationsInput | string
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    companyProvince?: StringFieldUpdateOperationsInput | string
    companyDistrict?: StringFieldUpdateOperationsInput | string
    companyCommune?: StringFieldUpdateOperationsInput | string
    companyVillage?: StringFieldUpdateOperationsInput | string
    companyStreet?: StringFieldUpdateOperationsInput | string
    companyHouse?: StringFieldUpdateOperationsInput | string
    companyPhone?: StringFieldUpdateOperationsInput | string
    companyOfficePhone?: NullableStringFieldUpdateOperationsInput | string | null
    companyEmail?: StringFieldUpdateOperationsInput | string
    shLastNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    shFirstNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    shLastNameEn?: StringFieldUpdateOperationsInput | string
    shFirstNameEn?: StringFieldUpdateOperationsInput | string
    shDob?: DateTimeFieldUpdateOperationsInput | Date | string
    shNationality?: StringFieldUpdateOperationsInput | string
    shGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    shIdCard?: NullableStringFieldUpdateOperationsInput | string | null
    shIdIssuedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shIdExpiredDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shEmail?: NullableStringFieldUpdateOperationsInput | string | null
    shPhone?: NullableStringFieldUpdateOperationsInput | string | null
    shPhotoName?: NullableStringFieldUpdateOperationsInput | string | null
    shIdDocNames?: StringFieldUpdateOperationsInput | string
    ownerLastNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    ownerFirstNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    ownerLastNameEn?: StringFieldUpdateOperationsInput | string
    ownerFirstNameEn?: StringFieldUpdateOperationsInput | string
    ownerDob?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerNationality?: StringFieldUpdateOperationsInput | string
    ownerGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    ownerIdCard?: NullableStringFieldUpdateOperationsInput | string | null
    ownerIdIssuedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerIdExpiredDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    ownerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    ownerPhotoName?: NullableStringFieldUpdateOperationsInput | string | null
    ownerIdDocNames?: StringFieldUpdateOperationsInput | string
    shareAmount?: StringFieldUpdateOperationsInput | string
    shareholderContractDocNames?: StringFieldUpdateOperationsInput | string
    otherDocNames?: StringFieldUpdateOperationsInput | string
    consentAgreed?: BoolFieldUpdateOperationsInput | boolean
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    logs?: RequestLogUncheckedUpdateManyWithoutRequestNestedInput
    revisions?: RequestRevisionUncheckedUpdateManyWithoutRequestNestedInput
  }

  export type BeneficiaryRequestUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    requestNo?: StringFieldUpdateOperationsInput | string
    status?: EnumBeneficiaryRequestStatusFieldUpdateOperationsInput | $Enums.BeneficiaryRequestStatus
    type?: StringFieldUpdateOperationsInput | string
    companyNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    companyNameEn?: StringFieldUpdateOperationsInput | string
    registrationNo?: StringFieldUpdateOperationsInput | string
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    companyProvince?: StringFieldUpdateOperationsInput | string
    companyDistrict?: StringFieldUpdateOperationsInput | string
    companyCommune?: StringFieldUpdateOperationsInput | string
    companyVillage?: StringFieldUpdateOperationsInput | string
    companyStreet?: StringFieldUpdateOperationsInput | string
    companyHouse?: StringFieldUpdateOperationsInput | string
    companyPhone?: StringFieldUpdateOperationsInput | string
    companyOfficePhone?: NullableStringFieldUpdateOperationsInput | string | null
    companyEmail?: StringFieldUpdateOperationsInput | string
    shLastNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    shFirstNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    shLastNameEn?: StringFieldUpdateOperationsInput | string
    shFirstNameEn?: StringFieldUpdateOperationsInput | string
    shDob?: DateTimeFieldUpdateOperationsInput | Date | string
    shNationality?: StringFieldUpdateOperationsInput | string
    shGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    shIdCard?: NullableStringFieldUpdateOperationsInput | string | null
    shIdIssuedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shIdExpiredDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    shEmail?: NullableStringFieldUpdateOperationsInput | string | null
    shPhone?: NullableStringFieldUpdateOperationsInput | string | null
    shPhotoName?: NullableStringFieldUpdateOperationsInput | string | null
    shIdDocNames?: StringFieldUpdateOperationsInput | string
    ownerLastNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    ownerFirstNameKh?: NullableStringFieldUpdateOperationsInput | string | null
    ownerLastNameEn?: StringFieldUpdateOperationsInput | string
    ownerFirstNameEn?: StringFieldUpdateOperationsInput | string
    ownerDob?: DateTimeFieldUpdateOperationsInput | Date | string
    ownerNationality?: StringFieldUpdateOperationsInput | string
    ownerGender?: EnumGenderFieldUpdateOperationsInput | $Enums.Gender
    ownerIdCard?: NullableStringFieldUpdateOperationsInput | string | null
    ownerIdIssuedDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerIdExpiredDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    ownerEmail?: NullableStringFieldUpdateOperationsInput | string | null
    ownerPhone?: NullableStringFieldUpdateOperationsInput | string | null
    ownerPhotoName?: NullableStringFieldUpdateOperationsInput | string | null
    ownerIdDocNames?: StringFieldUpdateOperationsInput | string
    shareAmount?: StringFieldUpdateOperationsInput | string
    shareholderContractDocNames?: StringFieldUpdateOperationsInput | string
    otherDocNames?: StringFieldUpdateOperationsInput | string
    consentAgreed?: BoolFieldUpdateOperationsInput | boolean
    rejectionReason?: NullableStringFieldUpdateOperationsInput | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyStaffRoleInput = {
    id?: number
    username: string
    email: string
    passwordHash: string
    fullName: string
    companyName?: string | null
    firstName?: string | null
    lastName?: string | null
    phoneNumber?: string | null
    role?: $Enums.Role
    isActive?: boolean
    registrationReturnReason?: string | null
    registrationReturnedAt?: Date | string | null
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    notificationsSeenAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StaffRolePermissionCreateManyStaffRoleInput = {
    moduleId: number
    create?: boolean
    read?: boolean
    update?: boolean
    delete?: boolean
  }

  export type UserUpdateWithoutStaffRoleInput = {
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    registrationReturnReason?: NullableStringFieldUpdateOperationsInput | string | null
    registrationReturnedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notificationsSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    beneficiaryRequests?: BeneficiaryRequestUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutStaffRoleInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    registrationReturnReason?: NullableStringFieldUpdateOperationsInput | string | null
    registrationReturnedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notificationsSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    beneficiaryRequests?: BeneficiaryRequestUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutStaffRoleInput = {
    id?: IntFieldUpdateOperationsInput | number
    username?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    companyName?: NullableStringFieldUpdateOperationsInput | string | null
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    registrationReturnReason?: NullableStringFieldUpdateOperationsInput | string | null
    registrationReturnedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notificationsSeenAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StaffRolePermissionUpdateWithoutStaffRoleInput = {
    create?: BoolFieldUpdateOperationsInput | boolean
    read?: BoolFieldUpdateOperationsInput | boolean
    update?: BoolFieldUpdateOperationsInput | boolean
    delete?: BoolFieldUpdateOperationsInput | boolean
    module?: PermissionModuleUpdateOneRequiredWithoutRolePermissionsNestedInput
  }

  export type StaffRolePermissionUncheckedUpdateWithoutStaffRoleInput = {
    moduleId?: IntFieldUpdateOperationsInput | number
    create?: BoolFieldUpdateOperationsInput | boolean
    read?: BoolFieldUpdateOperationsInput | boolean
    update?: BoolFieldUpdateOperationsInput | boolean
    delete?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StaffRolePermissionUncheckedUpdateManyWithoutStaffRoleInput = {
    moduleId?: IntFieldUpdateOperationsInput | number
    create?: BoolFieldUpdateOperationsInput | boolean
    read?: BoolFieldUpdateOperationsInput | boolean
    update?: BoolFieldUpdateOperationsInput | boolean
    delete?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StaffRolePermissionCreateManyModuleInput = {
    staffRoleId: number
    create?: boolean
    read?: boolean
    update?: boolean
    delete?: boolean
  }

  export type StaffRolePermissionUpdateWithoutModuleInput = {
    create?: BoolFieldUpdateOperationsInput | boolean
    read?: BoolFieldUpdateOperationsInput | boolean
    update?: BoolFieldUpdateOperationsInput | boolean
    delete?: BoolFieldUpdateOperationsInput | boolean
    staffRole?: StaffRoleUpdateOneRequiredWithoutPermissionsNestedInput
  }

  export type StaffRolePermissionUncheckedUpdateWithoutModuleInput = {
    staffRoleId?: IntFieldUpdateOperationsInput | number
    create?: BoolFieldUpdateOperationsInput | boolean
    read?: BoolFieldUpdateOperationsInput | boolean
    update?: BoolFieldUpdateOperationsInput | boolean
    delete?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StaffRolePermissionUncheckedUpdateManyWithoutModuleInput = {
    staffRoleId?: IntFieldUpdateOperationsInput | number
    create?: BoolFieldUpdateOperationsInput | boolean
    read?: BoolFieldUpdateOperationsInput | boolean
    update?: BoolFieldUpdateOperationsInput | boolean
    delete?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RequestLogCreateManyRequestInput = {
    id?: number
    action: string
    actorUserId: number
    actorRole: $Enums.Role
    actorName: string
    note?: string | null
    createdAt?: Date | string
  }

  export type RequestRevisionCreateManyRequestInput = {
    id?: number
    editedByUserId: number
    editedByRole: $Enums.Role
    editedByName: string
    previousData: string
    newData: string
    approvedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RequestLogUpdateWithoutRequestInput = {
    action?: StringFieldUpdateOperationsInput | string
    actorUserId?: IntFieldUpdateOperationsInput | number
    actorRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actorName?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestLogUncheckedUpdateWithoutRequestInput = {
    id?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    actorUserId?: IntFieldUpdateOperationsInput | number
    actorRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actorName?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestLogUncheckedUpdateManyWithoutRequestInput = {
    id?: IntFieldUpdateOperationsInput | number
    action?: StringFieldUpdateOperationsInput | string
    actorUserId?: IntFieldUpdateOperationsInput | number
    actorRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    actorName?: StringFieldUpdateOperationsInput | string
    note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestRevisionUpdateWithoutRequestInput = {
    editedByUserId?: IntFieldUpdateOperationsInput | number
    editedByRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    editedByName?: StringFieldUpdateOperationsInput | string
    previousData?: StringFieldUpdateOperationsInput | string
    newData?: StringFieldUpdateOperationsInput | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestRevisionUncheckedUpdateWithoutRequestInput = {
    id?: IntFieldUpdateOperationsInput | number
    editedByUserId?: IntFieldUpdateOperationsInput | number
    editedByRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    editedByName?: StringFieldUpdateOperationsInput | string
    previousData?: StringFieldUpdateOperationsInput | string
    newData?: StringFieldUpdateOperationsInput | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RequestRevisionUncheckedUpdateManyWithoutRequestInput = {
    id?: IntFieldUpdateOperationsInput | number
    editedByUserId?: IntFieldUpdateOperationsInput | number
    editedByRole?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    editedByName?: StringFieldUpdateOperationsInput | string
    previousData?: StringFieldUpdateOperationsInput | string
    newData?: StringFieldUpdateOperationsInput | string
    approvedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



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