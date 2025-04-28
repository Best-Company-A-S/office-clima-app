
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Building
 * 
 */
export type Building = $Result.DefaultSelection<Prisma.$BuildingPayload>
/**
 * Model BuildingInvitation
 * 
 */
export type BuildingInvitation = $Result.DefaultSelection<Prisma.$BuildingInvitationPayload>
/**
 * Model BuildingMember
 * 
 */
export type BuildingMember = $Result.DefaultSelection<Prisma.$BuildingMemberPayload>
/**
 * Model BuildingSettings
 * 
 */
export type BuildingSettings = $Result.DefaultSelection<Prisma.$BuildingSettingsPayload>
/**
 * Model Room
 * 
 */
export type Room = $Result.DefaultSelection<Prisma.$RoomPayload>
/**
 * Model RoomSurvey
 * 
 */
export type RoomSurvey = $Result.DefaultSelection<Prisma.$RoomSurveyPayload>
/**
 * Model RoomSurveyResponse
 * 
 */
export type RoomSurveyResponse = $Result.DefaultSelection<Prisma.$RoomSurveyResponsePayload>
/**
 * Model Device
 * 
 */
export type Device = $Result.DefaultSelection<Prisma.$DevicePayload>
/**
 * Model DeviceReading
 * 
 */
export type DeviceReading = $Result.DefaultSelection<Prisma.$DeviceReadingPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const BuildingInvitationStatus: {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
};

export type BuildingInvitationStatus = (typeof BuildingInvitationStatus)[keyof typeof BuildingInvitationStatus]


export const BuildingMemberRole: {
  ADMIN: 'ADMIN',
  MEMBER: 'MEMBER'
};

export type BuildingMemberRole = (typeof BuildingMemberRole)[keyof typeof BuildingMemberRole]


export const TemperatureUnit: {
  CELSIUS: 'CELSIUS',
  FAHRENHEIT: 'FAHRENHEIT'
};

export type TemperatureUnit = (typeof TemperatureUnit)[keyof typeof TemperatureUnit]


export const HumidityUnit: {
  PERCENT: 'PERCENT',
  PPM: 'PPM'
};

export type HumidityUnit = (typeof HumidityUnit)[keyof typeof HumidityUnit]

}

export type BuildingInvitationStatus = $Enums.BuildingInvitationStatus

export const BuildingInvitationStatus: typeof $Enums.BuildingInvitationStatus

export type BuildingMemberRole = $Enums.BuildingMemberRole

export const BuildingMemberRole: typeof $Enums.BuildingMemberRole

export type TemperatureUnit = $Enums.TemperatureUnit

export const TemperatureUnit: typeof $Enums.TemperatureUnit

export type HumidityUnit = $Enums.HumidityUnit

export const HumidityUnit: typeof $Enums.HumidityUnit

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Buildings
 * const buildings = await prisma.building.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
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
   * // Fetch zero or more Buildings
   * const buildings = await prisma.building.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.building`: Exposes CRUD operations for the **Building** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Buildings
    * const buildings = await prisma.building.findMany()
    * ```
    */
  get building(): Prisma.BuildingDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.buildingInvitation`: Exposes CRUD operations for the **BuildingInvitation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BuildingInvitations
    * const buildingInvitations = await prisma.buildingInvitation.findMany()
    * ```
    */
  get buildingInvitation(): Prisma.BuildingInvitationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.buildingMember`: Exposes CRUD operations for the **BuildingMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BuildingMembers
    * const buildingMembers = await prisma.buildingMember.findMany()
    * ```
    */
  get buildingMember(): Prisma.BuildingMemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.buildingSettings`: Exposes CRUD operations for the **BuildingSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BuildingSettings
    * const buildingSettings = await prisma.buildingSettings.findMany()
    * ```
    */
  get buildingSettings(): Prisma.BuildingSettingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.room`: Exposes CRUD operations for the **Room** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rooms
    * const rooms = await prisma.room.findMany()
    * ```
    */
  get room(): Prisma.RoomDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roomSurvey`: Exposes CRUD operations for the **RoomSurvey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoomSurveys
    * const roomSurveys = await prisma.roomSurvey.findMany()
    * ```
    */
  get roomSurvey(): Prisma.RoomSurveyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roomSurveyResponse`: Exposes CRUD operations for the **RoomSurveyResponse** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoomSurveyResponses
    * const roomSurveyResponses = await prisma.roomSurveyResponse.findMany()
    * ```
    */
  get roomSurveyResponse(): Prisma.RoomSurveyResponseDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.device`: Exposes CRUD operations for the **Device** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Devices
    * const devices = await prisma.device.findMany()
    * ```
    */
  get device(): Prisma.DeviceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.deviceReading`: Exposes CRUD operations for the **DeviceReading** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DeviceReadings
    * const deviceReadings = await prisma.deviceReading.findMany()
    * ```
    */
  get deviceReading(): Prisma.DeviceReadingDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


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
    Building: 'Building',
    BuildingInvitation: 'BuildingInvitation',
    BuildingMember: 'BuildingMember',
    BuildingSettings: 'BuildingSettings',
    Room: 'Room',
    RoomSurvey: 'RoomSurvey',
    RoomSurveyResponse: 'RoomSurveyResponse',
    Device: 'Device',
    DeviceReading: 'DeviceReading'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "building" | "buildingInvitation" | "buildingMember" | "buildingSettings" | "room" | "roomSurvey" | "roomSurveyResponse" | "device" | "deviceReading"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Building: {
        payload: Prisma.$BuildingPayload<ExtArgs>
        fields: Prisma.BuildingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BuildingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BuildingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingPayload>
          }
          findFirst: {
            args: Prisma.BuildingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BuildingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingPayload>
          }
          findMany: {
            args: Prisma.BuildingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingPayload>[]
          }
          create: {
            args: Prisma.BuildingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingPayload>
          }
          createMany: {
            args: Prisma.BuildingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BuildingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingPayload>[]
          }
          delete: {
            args: Prisma.BuildingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingPayload>
          }
          update: {
            args: Prisma.BuildingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingPayload>
          }
          deleteMany: {
            args: Prisma.BuildingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BuildingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BuildingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingPayload>[]
          }
          upsert: {
            args: Prisma.BuildingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingPayload>
          }
          aggregate: {
            args: Prisma.BuildingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBuilding>
          }
          groupBy: {
            args: Prisma.BuildingGroupByArgs<ExtArgs>
            result: $Utils.Optional<BuildingGroupByOutputType>[]
          }
          count: {
            args: Prisma.BuildingCountArgs<ExtArgs>
            result: $Utils.Optional<BuildingCountAggregateOutputType> | number
          }
        }
      }
      BuildingInvitation: {
        payload: Prisma.$BuildingInvitationPayload<ExtArgs>
        fields: Prisma.BuildingInvitationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BuildingInvitationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingInvitationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BuildingInvitationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingInvitationPayload>
          }
          findFirst: {
            args: Prisma.BuildingInvitationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingInvitationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BuildingInvitationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingInvitationPayload>
          }
          findMany: {
            args: Prisma.BuildingInvitationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingInvitationPayload>[]
          }
          create: {
            args: Prisma.BuildingInvitationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingInvitationPayload>
          }
          createMany: {
            args: Prisma.BuildingInvitationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BuildingInvitationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingInvitationPayload>[]
          }
          delete: {
            args: Prisma.BuildingInvitationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingInvitationPayload>
          }
          update: {
            args: Prisma.BuildingInvitationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingInvitationPayload>
          }
          deleteMany: {
            args: Prisma.BuildingInvitationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BuildingInvitationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BuildingInvitationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingInvitationPayload>[]
          }
          upsert: {
            args: Prisma.BuildingInvitationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingInvitationPayload>
          }
          aggregate: {
            args: Prisma.BuildingInvitationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBuildingInvitation>
          }
          groupBy: {
            args: Prisma.BuildingInvitationGroupByArgs<ExtArgs>
            result: $Utils.Optional<BuildingInvitationGroupByOutputType>[]
          }
          count: {
            args: Prisma.BuildingInvitationCountArgs<ExtArgs>
            result: $Utils.Optional<BuildingInvitationCountAggregateOutputType> | number
          }
        }
      }
      BuildingMember: {
        payload: Prisma.$BuildingMemberPayload<ExtArgs>
        fields: Prisma.BuildingMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BuildingMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BuildingMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingMemberPayload>
          }
          findFirst: {
            args: Prisma.BuildingMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BuildingMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingMemberPayload>
          }
          findMany: {
            args: Prisma.BuildingMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingMemberPayload>[]
          }
          create: {
            args: Prisma.BuildingMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingMemberPayload>
          }
          createMany: {
            args: Prisma.BuildingMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BuildingMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingMemberPayload>[]
          }
          delete: {
            args: Prisma.BuildingMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingMemberPayload>
          }
          update: {
            args: Prisma.BuildingMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingMemberPayload>
          }
          deleteMany: {
            args: Prisma.BuildingMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BuildingMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BuildingMemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingMemberPayload>[]
          }
          upsert: {
            args: Prisma.BuildingMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingMemberPayload>
          }
          aggregate: {
            args: Prisma.BuildingMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBuildingMember>
          }
          groupBy: {
            args: Prisma.BuildingMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<BuildingMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.BuildingMemberCountArgs<ExtArgs>
            result: $Utils.Optional<BuildingMemberCountAggregateOutputType> | number
          }
        }
      }
      BuildingSettings: {
        payload: Prisma.$BuildingSettingsPayload<ExtArgs>
        fields: Prisma.BuildingSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BuildingSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BuildingSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingSettingsPayload>
          }
          findFirst: {
            args: Prisma.BuildingSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BuildingSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingSettingsPayload>
          }
          findMany: {
            args: Prisma.BuildingSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingSettingsPayload>[]
          }
          create: {
            args: Prisma.BuildingSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingSettingsPayload>
          }
          createMany: {
            args: Prisma.BuildingSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BuildingSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingSettingsPayload>[]
          }
          delete: {
            args: Prisma.BuildingSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingSettingsPayload>
          }
          update: {
            args: Prisma.BuildingSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingSettingsPayload>
          }
          deleteMany: {
            args: Prisma.BuildingSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BuildingSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.BuildingSettingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingSettingsPayload>[]
          }
          upsert: {
            args: Prisma.BuildingSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BuildingSettingsPayload>
          }
          aggregate: {
            args: Prisma.BuildingSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBuildingSettings>
          }
          groupBy: {
            args: Prisma.BuildingSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<BuildingSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.BuildingSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<BuildingSettingsCountAggregateOutputType> | number
          }
        }
      }
      Room: {
        payload: Prisma.$RoomPayload<ExtArgs>
        fields: Prisma.RoomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findFirst: {
            args: Prisma.RoomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findMany: {
            args: Prisma.RoomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          create: {
            args: Prisma.RoomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          createMany: {
            args: Prisma.RoomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          delete: {
            args: Prisma.RoomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          update: {
            args: Prisma.RoomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          deleteMany: {
            args: Prisma.RoomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoomUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          upsert: {
            args: Prisma.RoomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          aggregate: {
            args: Prisma.RoomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoom>
          }
          groupBy: {
            args: Prisma.RoomGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomCountArgs<ExtArgs>
            result: $Utils.Optional<RoomCountAggregateOutputType> | number
          }
        }
      }
      RoomSurvey: {
        payload: Prisma.$RoomSurveyPayload<ExtArgs>
        fields: Prisma.RoomSurveyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomSurveyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomSurveyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomSurveyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomSurveyPayload>
          }
          findFirst: {
            args: Prisma.RoomSurveyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomSurveyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomSurveyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomSurveyPayload>
          }
          findMany: {
            args: Prisma.RoomSurveyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomSurveyPayload>[]
          }
          create: {
            args: Prisma.RoomSurveyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomSurveyPayload>
          }
          createMany: {
            args: Prisma.RoomSurveyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomSurveyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomSurveyPayload>[]
          }
          delete: {
            args: Prisma.RoomSurveyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomSurveyPayload>
          }
          update: {
            args: Prisma.RoomSurveyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomSurveyPayload>
          }
          deleteMany: {
            args: Prisma.RoomSurveyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomSurveyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoomSurveyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomSurveyPayload>[]
          }
          upsert: {
            args: Prisma.RoomSurveyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomSurveyPayload>
          }
          aggregate: {
            args: Prisma.RoomSurveyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoomSurvey>
          }
          groupBy: {
            args: Prisma.RoomSurveyGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomSurveyGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomSurveyCountArgs<ExtArgs>
            result: $Utils.Optional<RoomSurveyCountAggregateOutputType> | number
          }
        }
      }
      RoomSurveyResponse: {
        payload: Prisma.$RoomSurveyResponsePayload<ExtArgs>
        fields: Prisma.RoomSurveyResponseFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomSurveyResponseFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomSurveyResponsePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomSurveyResponseFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomSurveyResponsePayload>
          }
          findFirst: {
            args: Prisma.RoomSurveyResponseFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomSurveyResponsePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomSurveyResponseFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomSurveyResponsePayload>
          }
          findMany: {
            args: Prisma.RoomSurveyResponseFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomSurveyResponsePayload>[]
          }
          create: {
            args: Prisma.RoomSurveyResponseCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomSurveyResponsePayload>
          }
          createMany: {
            args: Prisma.RoomSurveyResponseCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomSurveyResponseCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomSurveyResponsePayload>[]
          }
          delete: {
            args: Prisma.RoomSurveyResponseDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomSurveyResponsePayload>
          }
          update: {
            args: Prisma.RoomSurveyResponseUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomSurveyResponsePayload>
          }
          deleteMany: {
            args: Prisma.RoomSurveyResponseDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomSurveyResponseUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoomSurveyResponseUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomSurveyResponsePayload>[]
          }
          upsert: {
            args: Prisma.RoomSurveyResponseUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomSurveyResponsePayload>
          }
          aggregate: {
            args: Prisma.RoomSurveyResponseAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoomSurveyResponse>
          }
          groupBy: {
            args: Prisma.RoomSurveyResponseGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomSurveyResponseGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomSurveyResponseCountArgs<ExtArgs>
            result: $Utils.Optional<RoomSurveyResponseCountAggregateOutputType> | number
          }
        }
      }
      Device: {
        payload: Prisma.$DevicePayload<ExtArgs>
        fields: Prisma.DeviceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeviceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeviceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          findFirst: {
            args: Prisma.DeviceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeviceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          findMany: {
            args: Prisma.DeviceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>[]
          }
          create: {
            args: Prisma.DeviceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          createMany: {
            args: Prisma.DeviceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DeviceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>[]
          }
          delete: {
            args: Prisma.DeviceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          update: {
            args: Prisma.DeviceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          deleteMany: {
            args: Prisma.DeviceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DeviceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DeviceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>[]
          }
          upsert: {
            args: Prisma.DeviceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DevicePayload>
          }
          aggregate: {
            args: Prisma.DeviceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDevice>
          }
          groupBy: {
            args: Prisma.DeviceGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeviceGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeviceCountArgs<ExtArgs>
            result: $Utils.Optional<DeviceCountAggregateOutputType> | number
          }
        }
      }
      DeviceReading: {
        payload: Prisma.$DeviceReadingPayload<ExtArgs>
        fields: Prisma.DeviceReadingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DeviceReadingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceReadingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DeviceReadingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceReadingPayload>
          }
          findFirst: {
            args: Prisma.DeviceReadingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceReadingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DeviceReadingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceReadingPayload>
          }
          findMany: {
            args: Prisma.DeviceReadingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceReadingPayload>[]
          }
          create: {
            args: Prisma.DeviceReadingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceReadingPayload>
          }
          createMany: {
            args: Prisma.DeviceReadingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DeviceReadingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceReadingPayload>[]
          }
          delete: {
            args: Prisma.DeviceReadingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceReadingPayload>
          }
          update: {
            args: Prisma.DeviceReadingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceReadingPayload>
          }
          deleteMany: {
            args: Prisma.DeviceReadingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DeviceReadingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DeviceReadingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceReadingPayload>[]
          }
          upsert: {
            args: Prisma.DeviceReadingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DeviceReadingPayload>
          }
          aggregate: {
            args: Prisma.DeviceReadingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDeviceReading>
          }
          groupBy: {
            args: Prisma.DeviceReadingGroupByArgs<ExtArgs>
            result: $Utils.Optional<DeviceReadingGroupByOutputType>[]
          }
          count: {
            args: Prisma.DeviceReadingCountArgs<ExtArgs>
            result: $Utils.Optional<DeviceReadingCountAggregateOutputType> | number
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
  }
  export type GlobalOmitConfig = {
    building?: BuildingOmit
    buildingInvitation?: BuildingInvitationOmit
    buildingMember?: BuildingMemberOmit
    buildingSettings?: BuildingSettingsOmit
    room?: RoomOmit
    roomSurvey?: RoomSurveyOmit
    roomSurveyResponse?: RoomSurveyResponseOmit
    device?: DeviceOmit
    deviceReading?: DeviceReadingOmit
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
   * Count Type RoomCountOutputType
   */

  export type RoomCountOutputType = {
    devices: number
  }

  export type RoomCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    devices?: boolean | RoomCountOutputTypeCountDevicesArgs
  }

  // Custom InputTypes
  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomCountOutputType
     */
    select?: RoomCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeCountDevicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeviceWhereInput
  }


  /**
   * Count Type DeviceCountOutputType
   */

  export type DeviceCountOutputType = {
    readings: number
  }

  export type DeviceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    readings?: boolean | DeviceCountOutputTypeCountReadingsArgs
  }

  // Custom InputTypes
  /**
   * DeviceCountOutputType without action
   */
  export type DeviceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceCountOutputType
     */
    select?: DeviceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DeviceCountOutputType without action
   */
  export type DeviceCountOutputTypeCountReadingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeviceReadingWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Building
   */

  export type AggregateBuilding = {
    _count: BuildingCountAggregateOutputType | null
    _min: BuildingMinAggregateOutputType | null
    _max: BuildingMaxAggregateOutputType | null
  }

  export type BuildingMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    logoUrl: string | null
    address: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BuildingMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    logoUrl: string | null
    address: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BuildingCountAggregateOutputType = {
    id: number
    name: number
    description: number
    logoUrl: number
    address: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BuildingMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    logoUrl?: true
    address?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BuildingMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    logoUrl?: true
    address?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BuildingCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    logoUrl?: true
    address?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BuildingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Building to aggregate.
     */
    where?: BuildingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Buildings to fetch.
     */
    orderBy?: BuildingOrderByWithRelationInput | BuildingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BuildingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Buildings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Buildings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Buildings
    **/
    _count?: true | BuildingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BuildingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BuildingMaxAggregateInputType
  }

  export type GetBuildingAggregateType<T extends BuildingAggregateArgs> = {
        [P in keyof T & keyof AggregateBuilding]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBuilding[P]>
      : GetScalarType<T[P], AggregateBuilding[P]>
  }




  export type BuildingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BuildingWhereInput
    orderBy?: BuildingOrderByWithAggregationInput | BuildingOrderByWithAggregationInput[]
    by: BuildingScalarFieldEnum[] | BuildingScalarFieldEnum
    having?: BuildingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BuildingCountAggregateInputType | true
    _min?: BuildingMinAggregateInputType
    _max?: BuildingMaxAggregateInputType
  }

  export type BuildingGroupByOutputType = {
    id: string
    name: string
    description: string | null
    logoUrl: string | null
    address: string | null
    createdAt: Date
    updatedAt: Date
    _count: BuildingCountAggregateOutputType | null
    _min: BuildingMinAggregateOutputType | null
    _max: BuildingMaxAggregateOutputType | null
  }

  type GetBuildingGroupByPayload<T extends BuildingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BuildingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BuildingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BuildingGroupByOutputType[P]>
            : GetScalarType<T[P], BuildingGroupByOutputType[P]>
        }
      >
    >


  export type BuildingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    logoUrl?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["building"]>

  export type BuildingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    logoUrl?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["building"]>

  export type BuildingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    logoUrl?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["building"]>

  export type BuildingSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    logoUrl?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BuildingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "logoUrl" | "address" | "createdAt" | "updatedAt", ExtArgs["result"]["building"]>

  export type $BuildingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Building"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      logoUrl: string | null
      address: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["building"]>
    composites: {}
  }

  type BuildingGetPayload<S extends boolean | null | undefined | BuildingDefaultArgs> = $Result.GetResult<Prisma.$BuildingPayload, S>

  type BuildingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BuildingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BuildingCountAggregateInputType | true
    }

  export interface BuildingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Building'], meta: { name: 'Building' } }
    /**
     * Find zero or one Building that matches the filter.
     * @param {BuildingFindUniqueArgs} args - Arguments to find a Building
     * @example
     * // Get one Building
     * const building = await prisma.building.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BuildingFindUniqueArgs>(args: SelectSubset<T, BuildingFindUniqueArgs<ExtArgs>>): Prisma__BuildingClient<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Building that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BuildingFindUniqueOrThrowArgs} args - Arguments to find a Building
     * @example
     * // Get one Building
     * const building = await prisma.building.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BuildingFindUniqueOrThrowArgs>(args: SelectSubset<T, BuildingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BuildingClient<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Building that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingFindFirstArgs} args - Arguments to find a Building
     * @example
     * // Get one Building
     * const building = await prisma.building.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BuildingFindFirstArgs>(args?: SelectSubset<T, BuildingFindFirstArgs<ExtArgs>>): Prisma__BuildingClient<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Building that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingFindFirstOrThrowArgs} args - Arguments to find a Building
     * @example
     * // Get one Building
     * const building = await prisma.building.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BuildingFindFirstOrThrowArgs>(args?: SelectSubset<T, BuildingFindFirstOrThrowArgs<ExtArgs>>): Prisma__BuildingClient<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Buildings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Buildings
     * const buildings = await prisma.building.findMany()
     * 
     * // Get first 10 Buildings
     * const buildings = await prisma.building.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const buildingWithIdOnly = await prisma.building.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BuildingFindManyArgs>(args?: SelectSubset<T, BuildingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Building.
     * @param {BuildingCreateArgs} args - Arguments to create a Building.
     * @example
     * // Create one Building
     * const Building = await prisma.building.create({
     *   data: {
     *     // ... data to create a Building
     *   }
     * })
     * 
     */
    create<T extends BuildingCreateArgs>(args: SelectSubset<T, BuildingCreateArgs<ExtArgs>>): Prisma__BuildingClient<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Buildings.
     * @param {BuildingCreateManyArgs} args - Arguments to create many Buildings.
     * @example
     * // Create many Buildings
     * const building = await prisma.building.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BuildingCreateManyArgs>(args?: SelectSubset<T, BuildingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Buildings and returns the data saved in the database.
     * @param {BuildingCreateManyAndReturnArgs} args - Arguments to create many Buildings.
     * @example
     * // Create many Buildings
     * const building = await prisma.building.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Buildings and only return the `id`
     * const buildingWithIdOnly = await prisma.building.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BuildingCreateManyAndReturnArgs>(args?: SelectSubset<T, BuildingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Building.
     * @param {BuildingDeleteArgs} args - Arguments to delete one Building.
     * @example
     * // Delete one Building
     * const Building = await prisma.building.delete({
     *   where: {
     *     // ... filter to delete one Building
     *   }
     * })
     * 
     */
    delete<T extends BuildingDeleteArgs>(args: SelectSubset<T, BuildingDeleteArgs<ExtArgs>>): Prisma__BuildingClient<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Building.
     * @param {BuildingUpdateArgs} args - Arguments to update one Building.
     * @example
     * // Update one Building
     * const building = await prisma.building.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BuildingUpdateArgs>(args: SelectSubset<T, BuildingUpdateArgs<ExtArgs>>): Prisma__BuildingClient<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Buildings.
     * @param {BuildingDeleteManyArgs} args - Arguments to filter Buildings to delete.
     * @example
     * // Delete a few Buildings
     * const { count } = await prisma.building.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BuildingDeleteManyArgs>(args?: SelectSubset<T, BuildingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Buildings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Buildings
     * const building = await prisma.building.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BuildingUpdateManyArgs>(args: SelectSubset<T, BuildingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Buildings and returns the data updated in the database.
     * @param {BuildingUpdateManyAndReturnArgs} args - Arguments to update many Buildings.
     * @example
     * // Update many Buildings
     * const building = await prisma.building.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Buildings and only return the `id`
     * const buildingWithIdOnly = await prisma.building.updateManyAndReturn({
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
    updateManyAndReturn<T extends BuildingUpdateManyAndReturnArgs>(args: SelectSubset<T, BuildingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Building.
     * @param {BuildingUpsertArgs} args - Arguments to update or create a Building.
     * @example
     * // Update or create a Building
     * const building = await prisma.building.upsert({
     *   create: {
     *     // ... data to create a Building
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Building we want to update
     *   }
     * })
     */
    upsert<T extends BuildingUpsertArgs>(args: SelectSubset<T, BuildingUpsertArgs<ExtArgs>>): Prisma__BuildingClient<$Result.GetResult<Prisma.$BuildingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Buildings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingCountArgs} args - Arguments to filter Buildings to count.
     * @example
     * // Count the number of Buildings
     * const count = await prisma.building.count({
     *   where: {
     *     // ... the filter for the Buildings we want to count
     *   }
     * })
    **/
    count<T extends BuildingCountArgs>(
      args?: Subset<T, BuildingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BuildingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Building.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BuildingAggregateArgs>(args: Subset<T, BuildingAggregateArgs>): Prisma.PrismaPromise<GetBuildingAggregateType<T>>

    /**
     * Group by Building.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingGroupByArgs} args - Group by arguments.
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
      T extends BuildingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BuildingGroupByArgs['orderBy'] }
        : { orderBy?: BuildingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BuildingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBuildingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Building model
   */
  readonly fields: BuildingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Building.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BuildingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the Building model
   */
  interface BuildingFieldRefs {
    readonly id: FieldRef<"Building", 'String'>
    readonly name: FieldRef<"Building", 'String'>
    readonly description: FieldRef<"Building", 'String'>
    readonly logoUrl: FieldRef<"Building", 'String'>
    readonly address: FieldRef<"Building", 'String'>
    readonly createdAt: FieldRef<"Building", 'DateTime'>
    readonly updatedAt: FieldRef<"Building", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Building findUnique
   */
  export type BuildingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * Filter, which Building to fetch.
     */
    where: BuildingWhereUniqueInput
  }

  /**
   * Building findUniqueOrThrow
   */
  export type BuildingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * Filter, which Building to fetch.
     */
    where: BuildingWhereUniqueInput
  }

  /**
   * Building findFirst
   */
  export type BuildingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * Filter, which Building to fetch.
     */
    where?: BuildingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Buildings to fetch.
     */
    orderBy?: BuildingOrderByWithRelationInput | BuildingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Buildings.
     */
    cursor?: BuildingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Buildings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Buildings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Buildings.
     */
    distinct?: BuildingScalarFieldEnum | BuildingScalarFieldEnum[]
  }

  /**
   * Building findFirstOrThrow
   */
  export type BuildingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * Filter, which Building to fetch.
     */
    where?: BuildingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Buildings to fetch.
     */
    orderBy?: BuildingOrderByWithRelationInput | BuildingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Buildings.
     */
    cursor?: BuildingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Buildings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Buildings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Buildings.
     */
    distinct?: BuildingScalarFieldEnum | BuildingScalarFieldEnum[]
  }

  /**
   * Building findMany
   */
  export type BuildingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * Filter, which Buildings to fetch.
     */
    where?: BuildingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Buildings to fetch.
     */
    orderBy?: BuildingOrderByWithRelationInput | BuildingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Buildings.
     */
    cursor?: BuildingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Buildings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Buildings.
     */
    skip?: number
    distinct?: BuildingScalarFieldEnum | BuildingScalarFieldEnum[]
  }

  /**
   * Building create
   */
  export type BuildingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * The data needed to create a Building.
     */
    data: XOR<BuildingCreateInput, BuildingUncheckedCreateInput>
  }

  /**
   * Building createMany
   */
  export type BuildingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Buildings.
     */
    data: BuildingCreateManyInput | BuildingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Building createManyAndReturn
   */
  export type BuildingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * The data used to create many Buildings.
     */
    data: BuildingCreateManyInput | BuildingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Building update
   */
  export type BuildingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * The data needed to update a Building.
     */
    data: XOR<BuildingUpdateInput, BuildingUncheckedUpdateInput>
    /**
     * Choose, which Building to update.
     */
    where: BuildingWhereUniqueInput
  }

  /**
   * Building updateMany
   */
  export type BuildingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Buildings.
     */
    data: XOR<BuildingUpdateManyMutationInput, BuildingUncheckedUpdateManyInput>
    /**
     * Filter which Buildings to update
     */
    where?: BuildingWhereInput
    /**
     * Limit how many Buildings to update.
     */
    limit?: number
  }

  /**
   * Building updateManyAndReturn
   */
  export type BuildingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * The data used to update Buildings.
     */
    data: XOR<BuildingUpdateManyMutationInput, BuildingUncheckedUpdateManyInput>
    /**
     * Filter which Buildings to update
     */
    where?: BuildingWhereInput
    /**
     * Limit how many Buildings to update.
     */
    limit?: number
  }

  /**
   * Building upsert
   */
  export type BuildingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * The filter to search for the Building to update in case it exists.
     */
    where: BuildingWhereUniqueInput
    /**
     * In case the Building found by the `where` argument doesn't exist, create a new Building with this data.
     */
    create: XOR<BuildingCreateInput, BuildingUncheckedCreateInput>
    /**
     * In case the Building was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BuildingUpdateInput, BuildingUncheckedUpdateInput>
  }

  /**
   * Building delete
   */
  export type BuildingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
    /**
     * Filter which Building to delete.
     */
    where: BuildingWhereUniqueInput
  }

  /**
   * Building deleteMany
   */
  export type BuildingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Buildings to delete
     */
    where?: BuildingWhereInput
    /**
     * Limit how many Buildings to delete.
     */
    limit?: number
  }

  /**
   * Building without action
   */
  export type BuildingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Building
     */
    select?: BuildingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Building
     */
    omit?: BuildingOmit<ExtArgs> | null
  }


  /**
   * Model BuildingInvitation
   */

  export type AggregateBuildingInvitation = {
    _count: BuildingInvitationCountAggregateOutputType | null
    _avg: BuildingInvitationAvgAggregateOutputType | null
    _sum: BuildingInvitationSumAggregateOutputType | null
    _min: BuildingInvitationMinAggregateOutputType | null
    _max: BuildingInvitationMaxAggregateOutputType | null
  }

  export type BuildingInvitationAvgAggregateOutputType = {
    createdByUserId: number | null
  }

  export type BuildingInvitationSumAggregateOutputType = {
    createdByUserId: number | null
  }

  export type BuildingInvitationMinAggregateOutputType = {
    id: string | null
    buildingId: string | null
    inviteCode: string | null
    createdByUserId: number | null
    status: $Enums.BuildingInvitationStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BuildingInvitationMaxAggregateOutputType = {
    id: string | null
    buildingId: string | null
    inviteCode: string | null
    createdByUserId: number | null
    status: $Enums.BuildingInvitationStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BuildingInvitationCountAggregateOutputType = {
    id: number
    buildingId: number
    inviteCode: number
    createdByUserId: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BuildingInvitationAvgAggregateInputType = {
    createdByUserId?: true
  }

  export type BuildingInvitationSumAggregateInputType = {
    createdByUserId?: true
  }

  export type BuildingInvitationMinAggregateInputType = {
    id?: true
    buildingId?: true
    inviteCode?: true
    createdByUserId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BuildingInvitationMaxAggregateInputType = {
    id?: true
    buildingId?: true
    inviteCode?: true
    createdByUserId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BuildingInvitationCountAggregateInputType = {
    id?: true
    buildingId?: true
    inviteCode?: true
    createdByUserId?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BuildingInvitationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BuildingInvitation to aggregate.
     */
    where?: BuildingInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BuildingInvitations to fetch.
     */
    orderBy?: BuildingInvitationOrderByWithRelationInput | BuildingInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BuildingInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BuildingInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BuildingInvitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BuildingInvitations
    **/
    _count?: true | BuildingInvitationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BuildingInvitationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BuildingInvitationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BuildingInvitationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BuildingInvitationMaxAggregateInputType
  }

  export type GetBuildingInvitationAggregateType<T extends BuildingInvitationAggregateArgs> = {
        [P in keyof T & keyof AggregateBuildingInvitation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBuildingInvitation[P]>
      : GetScalarType<T[P], AggregateBuildingInvitation[P]>
  }




  export type BuildingInvitationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BuildingInvitationWhereInput
    orderBy?: BuildingInvitationOrderByWithAggregationInput | BuildingInvitationOrderByWithAggregationInput[]
    by: BuildingInvitationScalarFieldEnum[] | BuildingInvitationScalarFieldEnum
    having?: BuildingInvitationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BuildingInvitationCountAggregateInputType | true
    _avg?: BuildingInvitationAvgAggregateInputType
    _sum?: BuildingInvitationSumAggregateInputType
    _min?: BuildingInvitationMinAggregateInputType
    _max?: BuildingInvitationMaxAggregateInputType
  }

  export type BuildingInvitationGroupByOutputType = {
    id: string
    buildingId: string
    inviteCode: string
    createdByUserId: number
    status: $Enums.BuildingInvitationStatus
    createdAt: Date
    updatedAt: Date
    _count: BuildingInvitationCountAggregateOutputType | null
    _avg: BuildingInvitationAvgAggregateOutputType | null
    _sum: BuildingInvitationSumAggregateOutputType | null
    _min: BuildingInvitationMinAggregateOutputType | null
    _max: BuildingInvitationMaxAggregateOutputType | null
  }

  type GetBuildingInvitationGroupByPayload<T extends BuildingInvitationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BuildingInvitationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BuildingInvitationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BuildingInvitationGroupByOutputType[P]>
            : GetScalarType<T[P], BuildingInvitationGroupByOutputType[P]>
        }
      >
    >


  export type BuildingInvitationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    buildingId?: boolean
    inviteCode?: boolean
    createdByUserId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["buildingInvitation"]>

  export type BuildingInvitationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    buildingId?: boolean
    inviteCode?: boolean
    createdByUserId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["buildingInvitation"]>

  export type BuildingInvitationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    buildingId?: boolean
    inviteCode?: boolean
    createdByUserId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["buildingInvitation"]>

  export type BuildingInvitationSelectScalar = {
    id?: boolean
    buildingId?: boolean
    inviteCode?: boolean
    createdByUserId?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BuildingInvitationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "buildingId" | "inviteCode" | "createdByUserId" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["buildingInvitation"]>

  export type $BuildingInvitationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BuildingInvitation"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      buildingId: string
      inviteCode: string
      createdByUserId: number
      status: $Enums.BuildingInvitationStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["buildingInvitation"]>
    composites: {}
  }

  type BuildingInvitationGetPayload<S extends boolean | null | undefined | BuildingInvitationDefaultArgs> = $Result.GetResult<Prisma.$BuildingInvitationPayload, S>

  type BuildingInvitationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BuildingInvitationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BuildingInvitationCountAggregateInputType | true
    }

  export interface BuildingInvitationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BuildingInvitation'], meta: { name: 'BuildingInvitation' } }
    /**
     * Find zero or one BuildingInvitation that matches the filter.
     * @param {BuildingInvitationFindUniqueArgs} args - Arguments to find a BuildingInvitation
     * @example
     * // Get one BuildingInvitation
     * const buildingInvitation = await prisma.buildingInvitation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BuildingInvitationFindUniqueArgs>(args: SelectSubset<T, BuildingInvitationFindUniqueArgs<ExtArgs>>): Prisma__BuildingInvitationClient<$Result.GetResult<Prisma.$BuildingInvitationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BuildingInvitation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BuildingInvitationFindUniqueOrThrowArgs} args - Arguments to find a BuildingInvitation
     * @example
     * // Get one BuildingInvitation
     * const buildingInvitation = await prisma.buildingInvitation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BuildingInvitationFindUniqueOrThrowArgs>(args: SelectSubset<T, BuildingInvitationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BuildingInvitationClient<$Result.GetResult<Prisma.$BuildingInvitationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BuildingInvitation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingInvitationFindFirstArgs} args - Arguments to find a BuildingInvitation
     * @example
     * // Get one BuildingInvitation
     * const buildingInvitation = await prisma.buildingInvitation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BuildingInvitationFindFirstArgs>(args?: SelectSubset<T, BuildingInvitationFindFirstArgs<ExtArgs>>): Prisma__BuildingInvitationClient<$Result.GetResult<Prisma.$BuildingInvitationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BuildingInvitation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingInvitationFindFirstOrThrowArgs} args - Arguments to find a BuildingInvitation
     * @example
     * // Get one BuildingInvitation
     * const buildingInvitation = await prisma.buildingInvitation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BuildingInvitationFindFirstOrThrowArgs>(args?: SelectSubset<T, BuildingInvitationFindFirstOrThrowArgs<ExtArgs>>): Prisma__BuildingInvitationClient<$Result.GetResult<Prisma.$BuildingInvitationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BuildingInvitations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingInvitationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BuildingInvitations
     * const buildingInvitations = await prisma.buildingInvitation.findMany()
     * 
     * // Get first 10 BuildingInvitations
     * const buildingInvitations = await prisma.buildingInvitation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const buildingInvitationWithIdOnly = await prisma.buildingInvitation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BuildingInvitationFindManyArgs>(args?: SelectSubset<T, BuildingInvitationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BuildingInvitationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BuildingInvitation.
     * @param {BuildingInvitationCreateArgs} args - Arguments to create a BuildingInvitation.
     * @example
     * // Create one BuildingInvitation
     * const BuildingInvitation = await prisma.buildingInvitation.create({
     *   data: {
     *     // ... data to create a BuildingInvitation
     *   }
     * })
     * 
     */
    create<T extends BuildingInvitationCreateArgs>(args: SelectSubset<T, BuildingInvitationCreateArgs<ExtArgs>>): Prisma__BuildingInvitationClient<$Result.GetResult<Prisma.$BuildingInvitationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BuildingInvitations.
     * @param {BuildingInvitationCreateManyArgs} args - Arguments to create many BuildingInvitations.
     * @example
     * // Create many BuildingInvitations
     * const buildingInvitation = await prisma.buildingInvitation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BuildingInvitationCreateManyArgs>(args?: SelectSubset<T, BuildingInvitationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BuildingInvitations and returns the data saved in the database.
     * @param {BuildingInvitationCreateManyAndReturnArgs} args - Arguments to create many BuildingInvitations.
     * @example
     * // Create many BuildingInvitations
     * const buildingInvitation = await prisma.buildingInvitation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BuildingInvitations and only return the `id`
     * const buildingInvitationWithIdOnly = await prisma.buildingInvitation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BuildingInvitationCreateManyAndReturnArgs>(args?: SelectSubset<T, BuildingInvitationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BuildingInvitationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BuildingInvitation.
     * @param {BuildingInvitationDeleteArgs} args - Arguments to delete one BuildingInvitation.
     * @example
     * // Delete one BuildingInvitation
     * const BuildingInvitation = await prisma.buildingInvitation.delete({
     *   where: {
     *     // ... filter to delete one BuildingInvitation
     *   }
     * })
     * 
     */
    delete<T extends BuildingInvitationDeleteArgs>(args: SelectSubset<T, BuildingInvitationDeleteArgs<ExtArgs>>): Prisma__BuildingInvitationClient<$Result.GetResult<Prisma.$BuildingInvitationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BuildingInvitation.
     * @param {BuildingInvitationUpdateArgs} args - Arguments to update one BuildingInvitation.
     * @example
     * // Update one BuildingInvitation
     * const buildingInvitation = await prisma.buildingInvitation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BuildingInvitationUpdateArgs>(args: SelectSubset<T, BuildingInvitationUpdateArgs<ExtArgs>>): Prisma__BuildingInvitationClient<$Result.GetResult<Prisma.$BuildingInvitationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BuildingInvitations.
     * @param {BuildingInvitationDeleteManyArgs} args - Arguments to filter BuildingInvitations to delete.
     * @example
     * // Delete a few BuildingInvitations
     * const { count } = await prisma.buildingInvitation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BuildingInvitationDeleteManyArgs>(args?: SelectSubset<T, BuildingInvitationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BuildingInvitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingInvitationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BuildingInvitations
     * const buildingInvitation = await prisma.buildingInvitation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BuildingInvitationUpdateManyArgs>(args: SelectSubset<T, BuildingInvitationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BuildingInvitations and returns the data updated in the database.
     * @param {BuildingInvitationUpdateManyAndReturnArgs} args - Arguments to update many BuildingInvitations.
     * @example
     * // Update many BuildingInvitations
     * const buildingInvitation = await prisma.buildingInvitation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BuildingInvitations and only return the `id`
     * const buildingInvitationWithIdOnly = await prisma.buildingInvitation.updateManyAndReturn({
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
    updateManyAndReturn<T extends BuildingInvitationUpdateManyAndReturnArgs>(args: SelectSubset<T, BuildingInvitationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BuildingInvitationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BuildingInvitation.
     * @param {BuildingInvitationUpsertArgs} args - Arguments to update or create a BuildingInvitation.
     * @example
     * // Update or create a BuildingInvitation
     * const buildingInvitation = await prisma.buildingInvitation.upsert({
     *   create: {
     *     // ... data to create a BuildingInvitation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BuildingInvitation we want to update
     *   }
     * })
     */
    upsert<T extends BuildingInvitationUpsertArgs>(args: SelectSubset<T, BuildingInvitationUpsertArgs<ExtArgs>>): Prisma__BuildingInvitationClient<$Result.GetResult<Prisma.$BuildingInvitationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BuildingInvitations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingInvitationCountArgs} args - Arguments to filter BuildingInvitations to count.
     * @example
     * // Count the number of BuildingInvitations
     * const count = await prisma.buildingInvitation.count({
     *   where: {
     *     // ... the filter for the BuildingInvitations we want to count
     *   }
     * })
    **/
    count<T extends BuildingInvitationCountArgs>(
      args?: Subset<T, BuildingInvitationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BuildingInvitationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BuildingInvitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingInvitationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BuildingInvitationAggregateArgs>(args: Subset<T, BuildingInvitationAggregateArgs>): Prisma.PrismaPromise<GetBuildingInvitationAggregateType<T>>

    /**
     * Group by BuildingInvitation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingInvitationGroupByArgs} args - Group by arguments.
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
      T extends BuildingInvitationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BuildingInvitationGroupByArgs['orderBy'] }
        : { orderBy?: BuildingInvitationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BuildingInvitationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBuildingInvitationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BuildingInvitation model
   */
  readonly fields: BuildingInvitationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BuildingInvitation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BuildingInvitationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the BuildingInvitation model
   */
  interface BuildingInvitationFieldRefs {
    readonly id: FieldRef<"BuildingInvitation", 'String'>
    readonly buildingId: FieldRef<"BuildingInvitation", 'String'>
    readonly inviteCode: FieldRef<"BuildingInvitation", 'String'>
    readonly createdByUserId: FieldRef<"BuildingInvitation", 'Int'>
    readonly status: FieldRef<"BuildingInvitation", 'BuildingInvitationStatus'>
    readonly createdAt: FieldRef<"BuildingInvitation", 'DateTime'>
    readonly updatedAt: FieldRef<"BuildingInvitation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BuildingInvitation findUnique
   */
  export type BuildingInvitationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingInvitation
     */
    select?: BuildingInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingInvitation
     */
    omit?: BuildingInvitationOmit<ExtArgs> | null
    /**
     * Filter, which BuildingInvitation to fetch.
     */
    where: BuildingInvitationWhereUniqueInput
  }

  /**
   * BuildingInvitation findUniqueOrThrow
   */
  export type BuildingInvitationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingInvitation
     */
    select?: BuildingInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingInvitation
     */
    omit?: BuildingInvitationOmit<ExtArgs> | null
    /**
     * Filter, which BuildingInvitation to fetch.
     */
    where: BuildingInvitationWhereUniqueInput
  }

  /**
   * BuildingInvitation findFirst
   */
  export type BuildingInvitationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingInvitation
     */
    select?: BuildingInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingInvitation
     */
    omit?: BuildingInvitationOmit<ExtArgs> | null
    /**
     * Filter, which BuildingInvitation to fetch.
     */
    where?: BuildingInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BuildingInvitations to fetch.
     */
    orderBy?: BuildingInvitationOrderByWithRelationInput | BuildingInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BuildingInvitations.
     */
    cursor?: BuildingInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BuildingInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BuildingInvitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BuildingInvitations.
     */
    distinct?: BuildingInvitationScalarFieldEnum | BuildingInvitationScalarFieldEnum[]
  }

  /**
   * BuildingInvitation findFirstOrThrow
   */
  export type BuildingInvitationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingInvitation
     */
    select?: BuildingInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingInvitation
     */
    omit?: BuildingInvitationOmit<ExtArgs> | null
    /**
     * Filter, which BuildingInvitation to fetch.
     */
    where?: BuildingInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BuildingInvitations to fetch.
     */
    orderBy?: BuildingInvitationOrderByWithRelationInput | BuildingInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BuildingInvitations.
     */
    cursor?: BuildingInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BuildingInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BuildingInvitations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BuildingInvitations.
     */
    distinct?: BuildingInvitationScalarFieldEnum | BuildingInvitationScalarFieldEnum[]
  }

  /**
   * BuildingInvitation findMany
   */
  export type BuildingInvitationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingInvitation
     */
    select?: BuildingInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingInvitation
     */
    omit?: BuildingInvitationOmit<ExtArgs> | null
    /**
     * Filter, which BuildingInvitations to fetch.
     */
    where?: BuildingInvitationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BuildingInvitations to fetch.
     */
    orderBy?: BuildingInvitationOrderByWithRelationInput | BuildingInvitationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BuildingInvitations.
     */
    cursor?: BuildingInvitationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BuildingInvitations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BuildingInvitations.
     */
    skip?: number
    distinct?: BuildingInvitationScalarFieldEnum | BuildingInvitationScalarFieldEnum[]
  }

  /**
   * BuildingInvitation create
   */
  export type BuildingInvitationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingInvitation
     */
    select?: BuildingInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingInvitation
     */
    omit?: BuildingInvitationOmit<ExtArgs> | null
    /**
     * The data needed to create a BuildingInvitation.
     */
    data: XOR<BuildingInvitationCreateInput, BuildingInvitationUncheckedCreateInput>
  }

  /**
   * BuildingInvitation createMany
   */
  export type BuildingInvitationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BuildingInvitations.
     */
    data: BuildingInvitationCreateManyInput | BuildingInvitationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BuildingInvitation createManyAndReturn
   */
  export type BuildingInvitationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingInvitation
     */
    select?: BuildingInvitationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingInvitation
     */
    omit?: BuildingInvitationOmit<ExtArgs> | null
    /**
     * The data used to create many BuildingInvitations.
     */
    data: BuildingInvitationCreateManyInput | BuildingInvitationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BuildingInvitation update
   */
  export type BuildingInvitationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingInvitation
     */
    select?: BuildingInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingInvitation
     */
    omit?: BuildingInvitationOmit<ExtArgs> | null
    /**
     * The data needed to update a BuildingInvitation.
     */
    data: XOR<BuildingInvitationUpdateInput, BuildingInvitationUncheckedUpdateInput>
    /**
     * Choose, which BuildingInvitation to update.
     */
    where: BuildingInvitationWhereUniqueInput
  }

  /**
   * BuildingInvitation updateMany
   */
  export type BuildingInvitationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BuildingInvitations.
     */
    data: XOR<BuildingInvitationUpdateManyMutationInput, BuildingInvitationUncheckedUpdateManyInput>
    /**
     * Filter which BuildingInvitations to update
     */
    where?: BuildingInvitationWhereInput
    /**
     * Limit how many BuildingInvitations to update.
     */
    limit?: number
  }

  /**
   * BuildingInvitation updateManyAndReturn
   */
  export type BuildingInvitationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingInvitation
     */
    select?: BuildingInvitationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingInvitation
     */
    omit?: BuildingInvitationOmit<ExtArgs> | null
    /**
     * The data used to update BuildingInvitations.
     */
    data: XOR<BuildingInvitationUpdateManyMutationInput, BuildingInvitationUncheckedUpdateManyInput>
    /**
     * Filter which BuildingInvitations to update
     */
    where?: BuildingInvitationWhereInput
    /**
     * Limit how many BuildingInvitations to update.
     */
    limit?: number
  }

  /**
   * BuildingInvitation upsert
   */
  export type BuildingInvitationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingInvitation
     */
    select?: BuildingInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingInvitation
     */
    omit?: BuildingInvitationOmit<ExtArgs> | null
    /**
     * The filter to search for the BuildingInvitation to update in case it exists.
     */
    where: BuildingInvitationWhereUniqueInput
    /**
     * In case the BuildingInvitation found by the `where` argument doesn't exist, create a new BuildingInvitation with this data.
     */
    create: XOR<BuildingInvitationCreateInput, BuildingInvitationUncheckedCreateInput>
    /**
     * In case the BuildingInvitation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BuildingInvitationUpdateInput, BuildingInvitationUncheckedUpdateInput>
  }

  /**
   * BuildingInvitation delete
   */
  export type BuildingInvitationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingInvitation
     */
    select?: BuildingInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingInvitation
     */
    omit?: BuildingInvitationOmit<ExtArgs> | null
    /**
     * Filter which BuildingInvitation to delete.
     */
    where: BuildingInvitationWhereUniqueInput
  }

  /**
   * BuildingInvitation deleteMany
   */
  export type BuildingInvitationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BuildingInvitations to delete
     */
    where?: BuildingInvitationWhereInput
    /**
     * Limit how many BuildingInvitations to delete.
     */
    limit?: number
  }

  /**
   * BuildingInvitation without action
   */
  export type BuildingInvitationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingInvitation
     */
    select?: BuildingInvitationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingInvitation
     */
    omit?: BuildingInvitationOmit<ExtArgs> | null
  }


  /**
   * Model BuildingMember
   */

  export type AggregateBuildingMember = {
    _count: BuildingMemberCountAggregateOutputType | null
    _avg: BuildingMemberAvgAggregateOutputType | null
    _sum: BuildingMemberSumAggregateOutputType | null
    _min: BuildingMemberMinAggregateOutputType | null
    _max: BuildingMemberMaxAggregateOutputType | null
  }

  export type BuildingMemberAvgAggregateOutputType = {
    userId: number | null
    invitedByUserId: number | null
  }

  export type BuildingMemberSumAggregateOutputType = {
    userId: number | null
    invitedByUserId: number | null
  }

  export type BuildingMemberMinAggregateOutputType = {
    id: string | null
    buildingId: string | null
    userId: number | null
    invitedByUserId: number | null
    role: $Enums.BuildingMemberRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BuildingMemberMaxAggregateOutputType = {
    id: string | null
    buildingId: string | null
    userId: number | null
    invitedByUserId: number | null
    role: $Enums.BuildingMemberRole | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BuildingMemberCountAggregateOutputType = {
    id: number
    buildingId: number
    userId: number
    invitedByUserId: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BuildingMemberAvgAggregateInputType = {
    userId?: true
    invitedByUserId?: true
  }

  export type BuildingMemberSumAggregateInputType = {
    userId?: true
    invitedByUserId?: true
  }

  export type BuildingMemberMinAggregateInputType = {
    id?: true
    buildingId?: true
    userId?: true
    invitedByUserId?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BuildingMemberMaxAggregateInputType = {
    id?: true
    buildingId?: true
    userId?: true
    invitedByUserId?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BuildingMemberCountAggregateInputType = {
    id?: true
    buildingId?: true
    userId?: true
    invitedByUserId?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BuildingMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BuildingMember to aggregate.
     */
    where?: BuildingMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BuildingMembers to fetch.
     */
    orderBy?: BuildingMemberOrderByWithRelationInput | BuildingMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BuildingMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BuildingMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BuildingMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BuildingMembers
    **/
    _count?: true | BuildingMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BuildingMemberAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BuildingMemberSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BuildingMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BuildingMemberMaxAggregateInputType
  }

  export type GetBuildingMemberAggregateType<T extends BuildingMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateBuildingMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBuildingMember[P]>
      : GetScalarType<T[P], AggregateBuildingMember[P]>
  }




  export type BuildingMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BuildingMemberWhereInput
    orderBy?: BuildingMemberOrderByWithAggregationInput | BuildingMemberOrderByWithAggregationInput[]
    by: BuildingMemberScalarFieldEnum[] | BuildingMemberScalarFieldEnum
    having?: BuildingMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BuildingMemberCountAggregateInputType | true
    _avg?: BuildingMemberAvgAggregateInputType
    _sum?: BuildingMemberSumAggregateInputType
    _min?: BuildingMemberMinAggregateInputType
    _max?: BuildingMemberMaxAggregateInputType
  }

  export type BuildingMemberGroupByOutputType = {
    id: string
    buildingId: string
    userId: number
    invitedByUserId: number
    role: $Enums.BuildingMemberRole
    createdAt: Date
    updatedAt: Date
    _count: BuildingMemberCountAggregateOutputType | null
    _avg: BuildingMemberAvgAggregateOutputType | null
    _sum: BuildingMemberSumAggregateOutputType | null
    _min: BuildingMemberMinAggregateOutputType | null
    _max: BuildingMemberMaxAggregateOutputType | null
  }

  type GetBuildingMemberGroupByPayload<T extends BuildingMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BuildingMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BuildingMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BuildingMemberGroupByOutputType[P]>
            : GetScalarType<T[P], BuildingMemberGroupByOutputType[P]>
        }
      >
    >


  export type BuildingMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    buildingId?: boolean
    userId?: boolean
    invitedByUserId?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["buildingMember"]>

  export type BuildingMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    buildingId?: boolean
    userId?: boolean
    invitedByUserId?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["buildingMember"]>

  export type BuildingMemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    buildingId?: boolean
    userId?: boolean
    invitedByUserId?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["buildingMember"]>

  export type BuildingMemberSelectScalar = {
    id?: boolean
    buildingId?: boolean
    userId?: boolean
    invitedByUserId?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BuildingMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "buildingId" | "userId" | "invitedByUserId" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["buildingMember"]>

  export type $BuildingMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BuildingMember"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      buildingId: string
      userId: number
      invitedByUserId: number
      role: $Enums.BuildingMemberRole
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["buildingMember"]>
    composites: {}
  }

  type BuildingMemberGetPayload<S extends boolean | null | undefined | BuildingMemberDefaultArgs> = $Result.GetResult<Prisma.$BuildingMemberPayload, S>

  type BuildingMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BuildingMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BuildingMemberCountAggregateInputType | true
    }

  export interface BuildingMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BuildingMember'], meta: { name: 'BuildingMember' } }
    /**
     * Find zero or one BuildingMember that matches the filter.
     * @param {BuildingMemberFindUniqueArgs} args - Arguments to find a BuildingMember
     * @example
     * // Get one BuildingMember
     * const buildingMember = await prisma.buildingMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BuildingMemberFindUniqueArgs>(args: SelectSubset<T, BuildingMemberFindUniqueArgs<ExtArgs>>): Prisma__BuildingMemberClient<$Result.GetResult<Prisma.$BuildingMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BuildingMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BuildingMemberFindUniqueOrThrowArgs} args - Arguments to find a BuildingMember
     * @example
     * // Get one BuildingMember
     * const buildingMember = await prisma.buildingMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BuildingMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, BuildingMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BuildingMemberClient<$Result.GetResult<Prisma.$BuildingMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BuildingMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingMemberFindFirstArgs} args - Arguments to find a BuildingMember
     * @example
     * // Get one BuildingMember
     * const buildingMember = await prisma.buildingMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BuildingMemberFindFirstArgs>(args?: SelectSubset<T, BuildingMemberFindFirstArgs<ExtArgs>>): Prisma__BuildingMemberClient<$Result.GetResult<Prisma.$BuildingMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BuildingMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingMemberFindFirstOrThrowArgs} args - Arguments to find a BuildingMember
     * @example
     * // Get one BuildingMember
     * const buildingMember = await prisma.buildingMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BuildingMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, BuildingMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__BuildingMemberClient<$Result.GetResult<Prisma.$BuildingMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BuildingMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BuildingMembers
     * const buildingMembers = await prisma.buildingMember.findMany()
     * 
     * // Get first 10 BuildingMembers
     * const buildingMembers = await prisma.buildingMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const buildingMemberWithIdOnly = await prisma.buildingMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BuildingMemberFindManyArgs>(args?: SelectSubset<T, BuildingMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BuildingMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BuildingMember.
     * @param {BuildingMemberCreateArgs} args - Arguments to create a BuildingMember.
     * @example
     * // Create one BuildingMember
     * const BuildingMember = await prisma.buildingMember.create({
     *   data: {
     *     // ... data to create a BuildingMember
     *   }
     * })
     * 
     */
    create<T extends BuildingMemberCreateArgs>(args: SelectSubset<T, BuildingMemberCreateArgs<ExtArgs>>): Prisma__BuildingMemberClient<$Result.GetResult<Prisma.$BuildingMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BuildingMembers.
     * @param {BuildingMemberCreateManyArgs} args - Arguments to create many BuildingMembers.
     * @example
     * // Create many BuildingMembers
     * const buildingMember = await prisma.buildingMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BuildingMemberCreateManyArgs>(args?: SelectSubset<T, BuildingMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BuildingMembers and returns the data saved in the database.
     * @param {BuildingMemberCreateManyAndReturnArgs} args - Arguments to create many BuildingMembers.
     * @example
     * // Create many BuildingMembers
     * const buildingMember = await prisma.buildingMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BuildingMembers and only return the `id`
     * const buildingMemberWithIdOnly = await prisma.buildingMember.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BuildingMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, BuildingMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BuildingMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BuildingMember.
     * @param {BuildingMemberDeleteArgs} args - Arguments to delete one BuildingMember.
     * @example
     * // Delete one BuildingMember
     * const BuildingMember = await prisma.buildingMember.delete({
     *   where: {
     *     // ... filter to delete one BuildingMember
     *   }
     * })
     * 
     */
    delete<T extends BuildingMemberDeleteArgs>(args: SelectSubset<T, BuildingMemberDeleteArgs<ExtArgs>>): Prisma__BuildingMemberClient<$Result.GetResult<Prisma.$BuildingMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BuildingMember.
     * @param {BuildingMemberUpdateArgs} args - Arguments to update one BuildingMember.
     * @example
     * // Update one BuildingMember
     * const buildingMember = await prisma.buildingMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BuildingMemberUpdateArgs>(args: SelectSubset<T, BuildingMemberUpdateArgs<ExtArgs>>): Prisma__BuildingMemberClient<$Result.GetResult<Prisma.$BuildingMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BuildingMembers.
     * @param {BuildingMemberDeleteManyArgs} args - Arguments to filter BuildingMembers to delete.
     * @example
     * // Delete a few BuildingMembers
     * const { count } = await prisma.buildingMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BuildingMemberDeleteManyArgs>(args?: SelectSubset<T, BuildingMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BuildingMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BuildingMembers
     * const buildingMember = await prisma.buildingMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BuildingMemberUpdateManyArgs>(args: SelectSubset<T, BuildingMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BuildingMembers and returns the data updated in the database.
     * @param {BuildingMemberUpdateManyAndReturnArgs} args - Arguments to update many BuildingMembers.
     * @example
     * // Update many BuildingMembers
     * const buildingMember = await prisma.buildingMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BuildingMembers and only return the `id`
     * const buildingMemberWithIdOnly = await prisma.buildingMember.updateManyAndReturn({
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
    updateManyAndReturn<T extends BuildingMemberUpdateManyAndReturnArgs>(args: SelectSubset<T, BuildingMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BuildingMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BuildingMember.
     * @param {BuildingMemberUpsertArgs} args - Arguments to update or create a BuildingMember.
     * @example
     * // Update or create a BuildingMember
     * const buildingMember = await prisma.buildingMember.upsert({
     *   create: {
     *     // ... data to create a BuildingMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BuildingMember we want to update
     *   }
     * })
     */
    upsert<T extends BuildingMemberUpsertArgs>(args: SelectSubset<T, BuildingMemberUpsertArgs<ExtArgs>>): Prisma__BuildingMemberClient<$Result.GetResult<Prisma.$BuildingMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BuildingMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingMemberCountArgs} args - Arguments to filter BuildingMembers to count.
     * @example
     * // Count the number of BuildingMembers
     * const count = await prisma.buildingMember.count({
     *   where: {
     *     // ... the filter for the BuildingMembers we want to count
     *   }
     * })
    **/
    count<T extends BuildingMemberCountArgs>(
      args?: Subset<T, BuildingMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BuildingMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BuildingMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BuildingMemberAggregateArgs>(args: Subset<T, BuildingMemberAggregateArgs>): Prisma.PrismaPromise<GetBuildingMemberAggregateType<T>>

    /**
     * Group by BuildingMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingMemberGroupByArgs} args - Group by arguments.
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
      T extends BuildingMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BuildingMemberGroupByArgs['orderBy'] }
        : { orderBy?: BuildingMemberGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BuildingMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBuildingMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BuildingMember model
   */
  readonly fields: BuildingMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BuildingMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BuildingMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the BuildingMember model
   */
  interface BuildingMemberFieldRefs {
    readonly id: FieldRef<"BuildingMember", 'String'>
    readonly buildingId: FieldRef<"BuildingMember", 'String'>
    readonly userId: FieldRef<"BuildingMember", 'Int'>
    readonly invitedByUserId: FieldRef<"BuildingMember", 'Int'>
    readonly role: FieldRef<"BuildingMember", 'BuildingMemberRole'>
    readonly createdAt: FieldRef<"BuildingMember", 'DateTime'>
    readonly updatedAt: FieldRef<"BuildingMember", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BuildingMember findUnique
   */
  export type BuildingMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingMember
     */
    select?: BuildingMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingMember
     */
    omit?: BuildingMemberOmit<ExtArgs> | null
    /**
     * Filter, which BuildingMember to fetch.
     */
    where: BuildingMemberWhereUniqueInput
  }

  /**
   * BuildingMember findUniqueOrThrow
   */
  export type BuildingMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingMember
     */
    select?: BuildingMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingMember
     */
    omit?: BuildingMemberOmit<ExtArgs> | null
    /**
     * Filter, which BuildingMember to fetch.
     */
    where: BuildingMemberWhereUniqueInput
  }

  /**
   * BuildingMember findFirst
   */
  export type BuildingMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingMember
     */
    select?: BuildingMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingMember
     */
    omit?: BuildingMemberOmit<ExtArgs> | null
    /**
     * Filter, which BuildingMember to fetch.
     */
    where?: BuildingMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BuildingMembers to fetch.
     */
    orderBy?: BuildingMemberOrderByWithRelationInput | BuildingMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BuildingMembers.
     */
    cursor?: BuildingMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BuildingMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BuildingMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BuildingMembers.
     */
    distinct?: BuildingMemberScalarFieldEnum | BuildingMemberScalarFieldEnum[]
  }

  /**
   * BuildingMember findFirstOrThrow
   */
  export type BuildingMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingMember
     */
    select?: BuildingMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingMember
     */
    omit?: BuildingMemberOmit<ExtArgs> | null
    /**
     * Filter, which BuildingMember to fetch.
     */
    where?: BuildingMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BuildingMembers to fetch.
     */
    orderBy?: BuildingMemberOrderByWithRelationInput | BuildingMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BuildingMembers.
     */
    cursor?: BuildingMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BuildingMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BuildingMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BuildingMembers.
     */
    distinct?: BuildingMemberScalarFieldEnum | BuildingMemberScalarFieldEnum[]
  }

  /**
   * BuildingMember findMany
   */
  export type BuildingMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingMember
     */
    select?: BuildingMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingMember
     */
    omit?: BuildingMemberOmit<ExtArgs> | null
    /**
     * Filter, which BuildingMembers to fetch.
     */
    where?: BuildingMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BuildingMembers to fetch.
     */
    orderBy?: BuildingMemberOrderByWithRelationInput | BuildingMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BuildingMembers.
     */
    cursor?: BuildingMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BuildingMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BuildingMembers.
     */
    skip?: number
    distinct?: BuildingMemberScalarFieldEnum | BuildingMemberScalarFieldEnum[]
  }

  /**
   * BuildingMember create
   */
  export type BuildingMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingMember
     */
    select?: BuildingMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingMember
     */
    omit?: BuildingMemberOmit<ExtArgs> | null
    /**
     * The data needed to create a BuildingMember.
     */
    data: XOR<BuildingMemberCreateInput, BuildingMemberUncheckedCreateInput>
  }

  /**
   * BuildingMember createMany
   */
  export type BuildingMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BuildingMembers.
     */
    data: BuildingMemberCreateManyInput | BuildingMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BuildingMember createManyAndReturn
   */
  export type BuildingMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingMember
     */
    select?: BuildingMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingMember
     */
    omit?: BuildingMemberOmit<ExtArgs> | null
    /**
     * The data used to create many BuildingMembers.
     */
    data: BuildingMemberCreateManyInput | BuildingMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BuildingMember update
   */
  export type BuildingMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingMember
     */
    select?: BuildingMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingMember
     */
    omit?: BuildingMemberOmit<ExtArgs> | null
    /**
     * The data needed to update a BuildingMember.
     */
    data: XOR<BuildingMemberUpdateInput, BuildingMemberUncheckedUpdateInput>
    /**
     * Choose, which BuildingMember to update.
     */
    where: BuildingMemberWhereUniqueInput
  }

  /**
   * BuildingMember updateMany
   */
  export type BuildingMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BuildingMembers.
     */
    data: XOR<BuildingMemberUpdateManyMutationInput, BuildingMemberUncheckedUpdateManyInput>
    /**
     * Filter which BuildingMembers to update
     */
    where?: BuildingMemberWhereInput
    /**
     * Limit how many BuildingMembers to update.
     */
    limit?: number
  }

  /**
   * BuildingMember updateManyAndReturn
   */
  export type BuildingMemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingMember
     */
    select?: BuildingMemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingMember
     */
    omit?: BuildingMemberOmit<ExtArgs> | null
    /**
     * The data used to update BuildingMembers.
     */
    data: XOR<BuildingMemberUpdateManyMutationInput, BuildingMemberUncheckedUpdateManyInput>
    /**
     * Filter which BuildingMembers to update
     */
    where?: BuildingMemberWhereInput
    /**
     * Limit how many BuildingMembers to update.
     */
    limit?: number
  }

  /**
   * BuildingMember upsert
   */
  export type BuildingMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingMember
     */
    select?: BuildingMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingMember
     */
    omit?: BuildingMemberOmit<ExtArgs> | null
    /**
     * The filter to search for the BuildingMember to update in case it exists.
     */
    where: BuildingMemberWhereUniqueInput
    /**
     * In case the BuildingMember found by the `where` argument doesn't exist, create a new BuildingMember with this data.
     */
    create: XOR<BuildingMemberCreateInput, BuildingMemberUncheckedCreateInput>
    /**
     * In case the BuildingMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BuildingMemberUpdateInput, BuildingMemberUncheckedUpdateInput>
  }

  /**
   * BuildingMember delete
   */
  export type BuildingMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingMember
     */
    select?: BuildingMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingMember
     */
    omit?: BuildingMemberOmit<ExtArgs> | null
    /**
     * Filter which BuildingMember to delete.
     */
    where: BuildingMemberWhereUniqueInput
  }

  /**
   * BuildingMember deleteMany
   */
  export type BuildingMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BuildingMembers to delete
     */
    where?: BuildingMemberWhereInput
    /**
     * Limit how many BuildingMembers to delete.
     */
    limit?: number
  }

  /**
   * BuildingMember without action
   */
  export type BuildingMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingMember
     */
    select?: BuildingMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingMember
     */
    omit?: BuildingMemberOmit<ExtArgs> | null
  }


  /**
   * Model BuildingSettings
   */

  export type AggregateBuildingSettings = {
    _count: BuildingSettingsCountAggregateOutputType | null
    _avg: BuildingSettingsAvgAggregateOutputType | null
    _sum: BuildingSettingsSumAggregateOutputType | null
    _min: BuildingSettingsMinAggregateOutputType | null
    _max: BuildingSettingsMaxAggregateOutputType | null
  }

  export type BuildingSettingsAvgAggregateOutputType = {
    temperatureThreshold: number | null
    humidityThreshold: number | null
  }

  export type BuildingSettingsSumAggregateOutputType = {
    temperatureThreshold: number | null
    humidityThreshold: number | null
  }

  export type BuildingSettingsMinAggregateOutputType = {
    id: string | null
    buildingId: string | null
    temperatureUnit: $Enums.TemperatureUnit | null
    humidityUnit: $Enums.HumidityUnit | null
    temperatureThreshold: number | null
    humidityThreshold: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BuildingSettingsMaxAggregateOutputType = {
    id: string | null
    buildingId: string | null
    temperatureUnit: $Enums.TemperatureUnit | null
    humidityUnit: $Enums.HumidityUnit | null
    temperatureThreshold: number | null
    humidityThreshold: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BuildingSettingsCountAggregateOutputType = {
    id: number
    buildingId: number
    temperatureUnit: number
    humidityUnit: number
    temperatureThreshold: number
    humidityThreshold: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BuildingSettingsAvgAggregateInputType = {
    temperatureThreshold?: true
    humidityThreshold?: true
  }

  export type BuildingSettingsSumAggregateInputType = {
    temperatureThreshold?: true
    humidityThreshold?: true
  }

  export type BuildingSettingsMinAggregateInputType = {
    id?: true
    buildingId?: true
    temperatureUnit?: true
    humidityUnit?: true
    temperatureThreshold?: true
    humidityThreshold?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BuildingSettingsMaxAggregateInputType = {
    id?: true
    buildingId?: true
    temperatureUnit?: true
    humidityUnit?: true
    temperatureThreshold?: true
    humidityThreshold?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BuildingSettingsCountAggregateInputType = {
    id?: true
    buildingId?: true
    temperatureUnit?: true
    humidityUnit?: true
    temperatureThreshold?: true
    humidityThreshold?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BuildingSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BuildingSettings to aggregate.
     */
    where?: BuildingSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BuildingSettings to fetch.
     */
    orderBy?: BuildingSettingsOrderByWithRelationInput | BuildingSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BuildingSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BuildingSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BuildingSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BuildingSettings
    **/
    _count?: true | BuildingSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BuildingSettingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BuildingSettingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BuildingSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BuildingSettingsMaxAggregateInputType
  }

  export type GetBuildingSettingsAggregateType<T extends BuildingSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateBuildingSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBuildingSettings[P]>
      : GetScalarType<T[P], AggregateBuildingSettings[P]>
  }




  export type BuildingSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BuildingSettingsWhereInput
    orderBy?: BuildingSettingsOrderByWithAggregationInput | BuildingSettingsOrderByWithAggregationInput[]
    by: BuildingSettingsScalarFieldEnum[] | BuildingSettingsScalarFieldEnum
    having?: BuildingSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BuildingSettingsCountAggregateInputType | true
    _avg?: BuildingSettingsAvgAggregateInputType
    _sum?: BuildingSettingsSumAggregateInputType
    _min?: BuildingSettingsMinAggregateInputType
    _max?: BuildingSettingsMaxAggregateInputType
  }

  export type BuildingSettingsGroupByOutputType = {
    id: string
    buildingId: string
    temperatureUnit: $Enums.TemperatureUnit
    humidityUnit: $Enums.HumidityUnit
    temperatureThreshold: number
    humidityThreshold: number
    createdAt: Date
    updatedAt: Date
    _count: BuildingSettingsCountAggregateOutputType | null
    _avg: BuildingSettingsAvgAggregateOutputType | null
    _sum: BuildingSettingsSumAggregateOutputType | null
    _min: BuildingSettingsMinAggregateOutputType | null
    _max: BuildingSettingsMaxAggregateOutputType | null
  }

  type GetBuildingSettingsGroupByPayload<T extends BuildingSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BuildingSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BuildingSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BuildingSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], BuildingSettingsGroupByOutputType[P]>
        }
      >
    >


  export type BuildingSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    buildingId?: boolean
    temperatureUnit?: boolean
    humidityUnit?: boolean
    temperatureThreshold?: boolean
    humidityThreshold?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["buildingSettings"]>

  export type BuildingSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    buildingId?: boolean
    temperatureUnit?: boolean
    humidityUnit?: boolean
    temperatureThreshold?: boolean
    humidityThreshold?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["buildingSettings"]>

  export type BuildingSettingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    buildingId?: boolean
    temperatureUnit?: boolean
    humidityUnit?: boolean
    temperatureThreshold?: boolean
    humidityThreshold?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["buildingSettings"]>

  export type BuildingSettingsSelectScalar = {
    id?: boolean
    buildingId?: boolean
    temperatureUnit?: boolean
    humidityUnit?: boolean
    temperatureThreshold?: boolean
    humidityThreshold?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BuildingSettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "buildingId" | "temperatureUnit" | "humidityUnit" | "temperatureThreshold" | "humidityThreshold" | "createdAt" | "updatedAt", ExtArgs["result"]["buildingSettings"]>

  export type $BuildingSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BuildingSettings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      buildingId: string
      temperatureUnit: $Enums.TemperatureUnit
      humidityUnit: $Enums.HumidityUnit
      temperatureThreshold: number
      humidityThreshold: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["buildingSettings"]>
    composites: {}
  }

  type BuildingSettingsGetPayload<S extends boolean | null | undefined | BuildingSettingsDefaultArgs> = $Result.GetResult<Prisma.$BuildingSettingsPayload, S>

  type BuildingSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BuildingSettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BuildingSettingsCountAggregateInputType | true
    }

  export interface BuildingSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BuildingSettings'], meta: { name: 'BuildingSettings' } }
    /**
     * Find zero or one BuildingSettings that matches the filter.
     * @param {BuildingSettingsFindUniqueArgs} args - Arguments to find a BuildingSettings
     * @example
     * // Get one BuildingSettings
     * const buildingSettings = await prisma.buildingSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BuildingSettingsFindUniqueArgs>(args: SelectSubset<T, BuildingSettingsFindUniqueArgs<ExtArgs>>): Prisma__BuildingSettingsClient<$Result.GetResult<Prisma.$BuildingSettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BuildingSettings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BuildingSettingsFindUniqueOrThrowArgs} args - Arguments to find a BuildingSettings
     * @example
     * // Get one BuildingSettings
     * const buildingSettings = await prisma.buildingSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BuildingSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, BuildingSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BuildingSettingsClient<$Result.GetResult<Prisma.$BuildingSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BuildingSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingSettingsFindFirstArgs} args - Arguments to find a BuildingSettings
     * @example
     * // Get one BuildingSettings
     * const buildingSettings = await prisma.buildingSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BuildingSettingsFindFirstArgs>(args?: SelectSubset<T, BuildingSettingsFindFirstArgs<ExtArgs>>): Prisma__BuildingSettingsClient<$Result.GetResult<Prisma.$BuildingSettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BuildingSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingSettingsFindFirstOrThrowArgs} args - Arguments to find a BuildingSettings
     * @example
     * // Get one BuildingSettings
     * const buildingSettings = await prisma.buildingSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BuildingSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, BuildingSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__BuildingSettingsClient<$Result.GetResult<Prisma.$BuildingSettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BuildingSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BuildingSettings
     * const buildingSettings = await prisma.buildingSettings.findMany()
     * 
     * // Get first 10 BuildingSettings
     * const buildingSettings = await prisma.buildingSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const buildingSettingsWithIdOnly = await prisma.buildingSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BuildingSettingsFindManyArgs>(args?: SelectSubset<T, BuildingSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BuildingSettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BuildingSettings.
     * @param {BuildingSettingsCreateArgs} args - Arguments to create a BuildingSettings.
     * @example
     * // Create one BuildingSettings
     * const BuildingSettings = await prisma.buildingSettings.create({
     *   data: {
     *     // ... data to create a BuildingSettings
     *   }
     * })
     * 
     */
    create<T extends BuildingSettingsCreateArgs>(args: SelectSubset<T, BuildingSettingsCreateArgs<ExtArgs>>): Prisma__BuildingSettingsClient<$Result.GetResult<Prisma.$BuildingSettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BuildingSettings.
     * @param {BuildingSettingsCreateManyArgs} args - Arguments to create many BuildingSettings.
     * @example
     * // Create many BuildingSettings
     * const buildingSettings = await prisma.buildingSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BuildingSettingsCreateManyArgs>(args?: SelectSubset<T, BuildingSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BuildingSettings and returns the data saved in the database.
     * @param {BuildingSettingsCreateManyAndReturnArgs} args - Arguments to create many BuildingSettings.
     * @example
     * // Create many BuildingSettings
     * const buildingSettings = await prisma.buildingSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BuildingSettings and only return the `id`
     * const buildingSettingsWithIdOnly = await prisma.buildingSettings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BuildingSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, BuildingSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BuildingSettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a BuildingSettings.
     * @param {BuildingSettingsDeleteArgs} args - Arguments to delete one BuildingSettings.
     * @example
     * // Delete one BuildingSettings
     * const BuildingSettings = await prisma.buildingSettings.delete({
     *   where: {
     *     // ... filter to delete one BuildingSettings
     *   }
     * })
     * 
     */
    delete<T extends BuildingSettingsDeleteArgs>(args: SelectSubset<T, BuildingSettingsDeleteArgs<ExtArgs>>): Prisma__BuildingSettingsClient<$Result.GetResult<Prisma.$BuildingSettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BuildingSettings.
     * @param {BuildingSettingsUpdateArgs} args - Arguments to update one BuildingSettings.
     * @example
     * // Update one BuildingSettings
     * const buildingSettings = await prisma.buildingSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BuildingSettingsUpdateArgs>(args: SelectSubset<T, BuildingSettingsUpdateArgs<ExtArgs>>): Prisma__BuildingSettingsClient<$Result.GetResult<Prisma.$BuildingSettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BuildingSettings.
     * @param {BuildingSettingsDeleteManyArgs} args - Arguments to filter BuildingSettings to delete.
     * @example
     * // Delete a few BuildingSettings
     * const { count } = await prisma.buildingSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BuildingSettingsDeleteManyArgs>(args?: SelectSubset<T, BuildingSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BuildingSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BuildingSettings
     * const buildingSettings = await prisma.buildingSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BuildingSettingsUpdateManyArgs>(args: SelectSubset<T, BuildingSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BuildingSettings and returns the data updated in the database.
     * @param {BuildingSettingsUpdateManyAndReturnArgs} args - Arguments to update many BuildingSettings.
     * @example
     * // Update many BuildingSettings
     * const buildingSettings = await prisma.buildingSettings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more BuildingSettings and only return the `id`
     * const buildingSettingsWithIdOnly = await prisma.buildingSettings.updateManyAndReturn({
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
    updateManyAndReturn<T extends BuildingSettingsUpdateManyAndReturnArgs>(args: SelectSubset<T, BuildingSettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BuildingSettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one BuildingSettings.
     * @param {BuildingSettingsUpsertArgs} args - Arguments to update or create a BuildingSettings.
     * @example
     * // Update or create a BuildingSettings
     * const buildingSettings = await prisma.buildingSettings.upsert({
     *   create: {
     *     // ... data to create a BuildingSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BuildingSettings we want to update
     *   }
     * })
     */
    upsert<T extends BuildingSettingsUpsertArgs>(args: SelectSubset<T, BuildingSettingsUpsertArgs<ExtArgs>>): Prisma__BuildingSettingsClient<$Result.GetResult<Prisma.$BuildingSettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BuildingSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingSettingsCountArgs} args - Arguments to filter BuildingSettings to count.
     * @example
     * // Count the number of BuildingSettings
     * const count = await prisma.buildingSettings.count({
     *   where: {
     *     // ... the filter for the BuildingSettings we want to count
     *   }
     * })
    **/
    count<T extends BuildingSettingsCountArgs>(
      args?: Subset<T, BuildingSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BuildingSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BuildingSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BuildingSettingsAggregateArgs>(args: Subset<T, BuildingSettingsAggregateArgs>): Prisma.PrismaPromise<GetBuildingSettingsAggregateType<T>>

    /**
     * Group by BuildingSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BuildingSettingsGroupByArgs} args - Group by arguments.
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
      T extends BuildingSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BuildingSettingsGroupByArgs['orderBy'] }
        : { orderBy?: BuildingSettingsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BuildingSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBuildingSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BuildingSettings model
   */
  readonly fields: BuildingSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BuildingSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BuildingSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the BuildingSettings model
   */
  interface BuildingSettingsFieldRefs {
    readonly id: FieldRef<"BuildingSettings", 'String'>
    readonly buildingId: FieldRef<"BuildingSettings", 'String'>
    readonly temperatureUnit: FieldRef<"BuildingSettings", 'TemperatureUnit'>
    readonly humidityUnit: FieldRef<"BuildingSettings", 'HumidityUnit'>
    readonly temperatureThreshold: FieldRef<"BuildingSettings", 'Float'>
    readonly humidityThreshold: FieldRef<"BuildingSettings", 'Float'>
    readonly createdAt: FieldRef<"BuildingSettings", 'DateTime'>
    readonly updatedAt: FieldRef<"BuildingSettings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BuildingSettings findUnique
   */
  export type BuildingSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingSettings
     */
    select?: BuildingSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingSettings
     */
    omit?: BuildingSettingsOmit<ExtArgs> | null
    /**
     * Filter, which BuildingSettings to fetch.
     */
    where: BuildingSettingsWhereUniqueInput
  }

  /**
   * BuildingSettings findUniqueOrThrow
   */
  export type BuildingSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingSettings
     */
    select?: BuildingSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingSettings
     */
    omit?: BuildingSettingsOmit<ExtArgs> | null
    /**
     * Filter, which BuildingSettings to fetch.
     */
    where: BuildingSettingsWhereUniqueInput
  }

  /**
   * BuildingSettings findFirst
   */
  export type BuildingSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingSettings
     */
    select?: BuildingSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingSettings
     */
    omit?: BuildingSettingsOmit<ExtArgs> | null
    /**
     * Filter, which BuildingSettings to fetch.
     */
    where?: BuildingSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BuildingSettings to fetch.
     */
    orderBy?: BuildingSettingsOrderByWithRelationInput | BuildingSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BuildingSettings.
     */
    cursor?: BuildingSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BuildingSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BuildingSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BuildingSettings.
     */
    distinct?: BuildingSettingsScalarFieldEnum | BuildingSettingsScalarFieldEnum[]
  }

  /**
   * BuildingSettings findFirstOrThrow
   */
  export type BuildingSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingSettings
     */
    select?: BuildingSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingSettings
     */
    omit?: BuildingSettingsOmit<ExtArgs> | null
    /**
     * Filter, which BuildingSettings to fetch.
     */
    where?: BuildingSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BuildingSettings to fetch.
     */
    orderBy?: BuildingSettingsOrderByWithRelationInput | BuildingSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BuildingSettings.
     */
    cursor?: BuildingSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BuildingSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BuildingSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BuildingSettings.
     */
    distinct?: BuildingSettingsScalarFieldEnum | BuildingSettingsScalarFieldEnum[]
  }

  /**
   * BuildingSettings findMany
   */
  export type BuildingSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingSettings
     */
    select?: BuildingSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingSettings
     */
    omit?: BuildingSettingsOmit<ExtArgs> | null
    /**
     * Filter, which BuildingSettings to fetch.
     */
    where?: BuildingSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BuildingSettings to fetch.
     */
    orderBy?: BuildingSettingsOrderByWithRelationInput | BuildingSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BuildingSettings.
     */
    cursor?: BuildingSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BuildingSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BuildingSettings.
     */
    skip?: number
    distinct?: BuildingSettingsScalarFieldEnum | BuildingSettingsScalarFieldEnum[]
  }

  /**
   * BuildingSettings create
   */
  export type BuildingSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingSettings
     */
    select?: BuildingSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingSettings
     */
    omit?: BuildingSettingsOmit<ExtArgs> | null
    /**
     * The data needed to create a BuildingSettings.
     */
    data: XOR<BuildingSettingsCreateInput, BuildingSettingsUncheckedCreateInput>
  }

  /**
   * BuildingSettings createMany
   */
  export type BuildingSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BuildingSettings.
     */
    data: BuildingSettingsCreateManyInput | BuildingSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BuildingSettings createManyAndReturn
   */
  export type BuildingSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingSettings
     */
    select?: BuildingSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingSettings
     */
    omit?: BuildingSettingsOmit<ExtArgs> | null
    /**
     * The data used to create many BuildingSettings.
     */
    data: BuildingSettingsCreateManyInput | BuildingSettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BuildingSettings update
   */
  export type BuildingSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingSettings
     */
    select?: BuildingSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingSettings
     */
    omit?: BuildingSettingsOmit<ExtArgs> | null
    /**
     * The data needed to update a BuildingSettings.
     */
    data: XOR<BuildingSettingsUpdateInput, BuildingSettingsUncheckedUpdateInput>
    /**
     * Choose, which BuildingSettings to update.
     */
    where: BuildingSettingsWhereUniqueInput
  }

  /**
   * BuildingSettings updateMany
   */
  export type BuildingSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BuildingSettings.
     */
    data: XOR<BuildingSettingsUpdateManyMutationInput, BuildingSettingsUncheckedUpdateManyInput>
    /**
     * Filter which BuildingSettings to update
     */
    where?: BuildingSettingsWhereInput
    /**
     * Limit how many BuildingSettings to update.
     */
    limit?: number
  }

  /**
   * BuildingSettings updateManyAndReturn
   */
  export type BuildingSettingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingSettings
     */
    select?: BuildingSettingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingSettings
     */
    omit?: BuildingSettingsOmit<ExtArgs> | null
    /**
     * The data used to update BuildingSettings.
     */
    data: XOR<BuildingSettingsUpdateManyMutationInput, BuildingSettingsUncheckedUpdateManyInput>
    /**
     * Filter which BuildingSettings to update
     */
    where?: BuildingSettingsWhereInput
    /**
     * Limit how many BuildingSettings to update.
     */
    limit?: number
  }

  /**
   * BuildingSettings upsert
   */
  export type BuildingSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingSettings
     */
    select?: BuildingSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingSettings
     */
    omit?: BuildingSettingsOmit<ExtArgs> | null
    /**
     * The filter to search for the BuildingSettings to update in case it exists.
     */
    where: BuildingSettingsWhereUniqueInput
    /**
     * In case the BuildingSettings found by the `where` argument doesn't exist, create a new BuildingSettings with this data.
     */
    create: XOR<BuildingSettingsCreateInput, BuildingSettingsUncheckedCreateInput>
    /**
     * In case the BuildingSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BuildingSettingsUpdateInput, BuildingSettingsUncheckedUpdateInput>
  }

  /**
   * BuildingSettings delete
   */
  export type BuildingSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingSettings
     */
    select?: BuildingSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingSettings
     */
    omit?: BuildingSettingsOmit<ExtArgs> | null
    /**
     * Filter which BuildingSettings to delete.
     */
    where: BuildingSettingsWhereUniqueInput
  }

  /**
   * BuildingSettings deleteMany
   */
  export type BuildingSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BuildingSettings to delete
     */
    where?: BuildingSettingsWhereInput
    /**
     * Limit how many BuildingSettings to delete.
     */
    limit?: number
  }

  /**
   * BuildingSettings without action
   */
  export type BuildingSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BuildingSettings
     */
    select?: BuildingSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BuildingSettings
     */
    omit?: BuildingSettingsOmit<ExtArgs> | null
  }


  /**
   * Model Room
   */

  export type AggregateRoom = {
    _count: RoomCountAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  export type RoomMinAggregateOutputType = {
    id: string | null
    buildingId: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomMaxAggregateOutputType = {
    id: string | null
    buildingId: string | null
    name: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomCountAggregateOutputType = {
    id: number
    buildingId: number
    name: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoomMinAggregateInputType = {
    id?: true
    buildingId?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomMaxAggregateInputType = {
    id?: true
    buildingId?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomCountAggregateInputType = {
    id?: true
    buildingId?: true
    name?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Room to aggregate.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rooms
    **/
    _count?: true | RoomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomMaxAggregateInputType
  }

  export type GetRoomAggregateType<T extends RoomAggregateArgs> = {
        [P in keyof T & keyof AggregateRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoom[P]>
      : GetScalarType<T[P], AggregateRoom[P]>
  }




  export type RoomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithAggregationInput | RoomOrderByWithAggregationInput[]
    by: RoomScalarFieldEnum[] | RoomScalarFieldEnum
    having?: RoomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomCountAggregateInputType | true
    _min?: RoomMinAggregateInputType
    _max?: RoomMaxAggregateInputType
  }

  export type RoomGroupByOutputType = {
    id: string
    buildingId: string
    name: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    _count: RoomCountAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  type GetRoomGroupByPayload<T extends RoomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomGroupByOutputType[P]>
            : GetScalarType<T[P], RoomGroupByOutputType[P]>
        }
      >
    >


  export type RoomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    buildingId?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    devices?: boolean | Room$devicesArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room"]>

  export type RoomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    buildingId?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["room"]>

  export type RoomSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    buildingId?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["room"]>

  export type RoomSelectScalar = {
    id?: boolean
    buildingId?: boolean
    name?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoomOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "buildingId" | "name" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["room"]>
  export type RoomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    devices?: boolean | Room$devicesArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoomIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type RoomIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RoomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Room"
    objects: {
      devices: Prisma.$DevicePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      buildingId: string
      name: string
      description: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["room"]>
    composites: {}
  }

  type RoomGetPayload<S extends boolean | null | undefined | RoomDefaultArgs> = $Result.GetResult<Prisma.$RoomPayload, S>

  type RoomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomCountAggregateInputType | true
    }

  export interface RoomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Room'], meta: { name: 'Room' } }
    /**
     * Find zero or one Room that matches the filter.
     * @param {RoomFindUniqueArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomFindUniqueArgs>(args: SelectSubset<T, RoomFindUniqueArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Room that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomFindUniqueOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomFindFirstArgs>(args?: SelectSubset<T, RoomFindFirstArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Rooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rooms
     * const rooms = await prisma.room.findMany()
     * 
     * // Get first 10 Rooms
     * const rooms = await prisma.room.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomWithIdOnly = await prisma.room.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomFindManyArgs>(args?: SelectSubset<T, RoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Room.
     * @param {RoomCreateArgs} args - Arguments to create a Room.
     * @example
     * // Create one Room
     * const Room = await prisma.room.create({
     *   data: {
     *     // ... data to create a Room
     *   }
     * })
     * 
     */
    create<T extends RoomCreateArgs>(args: SelectSubset<T, RoomCreateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Rooms.
     * @param {RoomCreateManyArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomCreateManyArgs>(args?: SelectSubset<T, RoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rooms and returns the data saved in the database.
     * @param {RoomCreateManyAndReturnArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rooms and only return the `id`
     * const roomWithIdOnly = await prisma.room.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Room.
     * @param {RoomDeleteArgs} args - Arguments to delete one Room.
     * @example
     * // Delete one Room
     * const Room = await prisma.room.delete({
     *   where: {
     *     // ... filter to delete one Room
     *   }
     * })
     * 
     */
    delete<T extends RoomDeleteArgs>(args: SelectSubset<T, RoomDeleteArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Room.
     * @param {RoomUpdateArgs} args - Arguments to update one Room.
     * @example
     * // Update one Room
     * const room = await prisma.room.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomUpdateArgs>(args: SelectSubset<T, RoomUpdateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Rooms.
     * @param {RoomDeleteManyArgs} args - Arguments to filter Rooms to delete.
     * @example
     * // Delete a few Rooms
     * const { count } = await prisma.room.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomDeleteManyArgs>(args?: SelectSubset<T, RoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomUpdateManyArgs>(args: SelectSubset<T, RoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms and returns the data updated in the database.
     * @param {RoomUpdateManyAndReturnArgs} args - Arguments to update many Rooms.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Rooms and only return the `id`
     * const roomWithIdOnly = await prisma.room.updateManyAndReturn({
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
    updateManyAndReturn<T extends RoomUpdateManyAndReturnArgs>(args: SelectSubset<T, RoomUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Room.
     * @param {RoomUpsertArgs} args - Arguments to update or create a Room.
     * @example
     * // Update or create a Room
     * const room = await prisma.room.upsert({
     *   create: {
     *     // ... data to create a Room
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Room we want to update
     *   }
     * })
     */
    upsert<T extends RoomUpsertArgs>(args: SelectSubset<T, RoomUpsertArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomCountArgs} args - Arguments to filter Rooms to count.
     * @example
     * // Count the number of Rooms
     * const count = await prisma.room.count({
     *   where: {
     *     // ... the filter for the Rooms we want to count
     *   }
     * })
    **/
    count<T extends RoomCountArgs>(
      args?: Subset<T, RoomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RoomAggregateArgs>(args: Subset<T, RoomAggregateArgs>): Prisma.PrismaPromise<GetRoomAggregateType<T>>

    /**
     * Group by Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomGroupByArgs} args - Group by arguments.
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
      T extends RoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomGroupByArgs['orderBy'] }
        : { orderBy?: RoomGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Room model
   */
  readonly fields: RoomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Room.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    devices<T extends Room$devicesArgs<ExtArgs> = {}>(args?: Subset<T, Room$devicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Room model
   */
  interface RoomFieldRefs {
    readonly id: FieldRef<"Room", 'String'>
    readonly buildingId: FieldRef<"Room", 'String'>
    readonly name: FieldRef<"Room", 'String'>
    readonly description: FieldRef<"Room", 'String'>
    readonly createdAt: FieldRef<"Room", 'DateTime'>
    readonly updatedAt: FieldRef<"Room", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Room findUnique
   */
  export type RoomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findUniqueOrThrow
   */
  export type RoomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findFirst
   */
  export type RoomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findFirstOrThrow
   */
  export type RoomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findMany
   */
  export type RoomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Rooms to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room create
   */
  export type RoomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to create a Room.
     */
    data: XOR<RoomCreateInput, RoomUncheckedCreateInput>
  }

  /**
   * Room createMany
   */
  export type RoomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Room createManyAndReturn
   */
  export type RoomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Room update
   */
  export type RoomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to update a Room.
     */
    data: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
    /**
     * Choose, which Room to update.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room updateMany
   */
  export type RoomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Rooms.
     */
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>
    /**
     * Filter which Rooms to update
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to update.
     */
    limit?: number
  }

  /**
   * Room updateManyAndReturn
   */
  export type RoomUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * The data used to update Rooms.
     */
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>
    /**
     * Filter which Rooms to update
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to update.
     */
    limit?: number
  }

  /**
   * Room upsert
   */
  export type RoomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The filter to search for the Room to update in case it exists.
     */
    where: RoomWhereUniqueInput
    /**
     * In case the Room found by the `where` argument doesn't exist, create a new Room with this data.
     */
    create: XOR<RoomCreateInput, RoomUncheckedCreateInput>
    /**
     * In case the Room was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
  }

  /**
   * Room delete
   */
  export type RoomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter which Room to delete.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room deleteMany
   */
  export type RoomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rooms to delete
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to delete.
     */
    limit?: number
  }

  /**
   * Room.devices
   */
  export type Room$devicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    where?: DeviceWhereInput
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    cursor?: DeviceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[]
  }

  /**
   * Room without action
   */
  export type RoomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
  }


  /**
   * Model RoomSurvey
   */

  export type AggregateRoomSurvey = {
    _count: RoomSurveyCountAggregateOutputType | null
    _min: RoomSurveyMinAggregateOutputType | null
    _max: RoomSurveyMaxAggregateOutputType | null
  }

  export type RoomSurveyMinAggregateOutputType = {
    id: string | null
    roomId: string | null
    title: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomSurveyMaxAggregateOutputType = {
    id: string | null
    roomId: string | null
    title: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomSurveyCountAggregateOutputType = {
    id: number
    roomId: number
    title: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoomSurveyMinAggregateInputType = {
    id?: true
    roomId?: true
    title?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomSurveyMaxAggregateInputType = {
    id?: true
    roomId?: true
    title?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomSurveyCountAggregateInputType = {
    id?: true
    roomId?: true
    title?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoomSurveyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomSurvey to aggregate.
     */
    where?: RoomSurveyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomSurveys to fetch.
     */
    orderBy?: RoomSurveyOrderByWithRelationInput | RoomSurveyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomSurveyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomSurveys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomSurveys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoomSurveys
    **/
    _count?: true | RoomSurveyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomSurveyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomSurveyMaxAggregateInputType
  }

  export type GetRoomSurveyAggregateType<T extends RoomSurveyAggregateArgs> = {
        [P in keyof T & keyof AggregateRoomSurvey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoomSurvey[P]>
      : GetScalarType<T[P], AggregateRoomSurvey[P]>
  }




  export type RoomSurveyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomSurveyWhereInput
    orderBy?: RoomSurveyOrderByWithAggregationInput | RoomSurveyOrderByWithAggregationInput[]
    by: RoomSurveyScalarFieldEnum[] | RoomSurveyScalarFieldEnum
    having?: RoomSurveyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomSurveyCountAggregateInputType | true
    _min?: RoomSurveyMinAggregateInputType
    _max?: RoomSurveyMaxAggregateInputType
  }

  export type RoomSurveyGroupByOutputType = {
    id: string
    roomId: string
    title: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    _count: RoomSurveyCountAggregateOutputType | null
    _min: RoomSurveyMinAggregateOutputType | null
    _max: RoomSurveyMaxAggregateOutputType | null
  }

  type GetRoomSurveyGroupByPayload<T extends RoomSurveyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomSurveyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomSurveyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomSurveyGroupByOutputType[P]>
            : GetScalarType<T[P], RoomSurveyGroupByOutputType[P]>
        }
      >
    >


  export type RoomSurveySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    title?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["roomSurvey"]>

  export type RoomSurveySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    title?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["roomSurvey"]>

  export type RoomSurveySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    roomId?: boolean
    title?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["roomSurvey"]>

  export type RoomSurveySelectScalar = {
    id?: boolean
    roomId?: boolean
    title?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoomSurveyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "roomId" | "title" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["roomSurvey"]>

  export type $RoomSurveyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoomSurvey"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      roomId: string
      title: string
      description: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["roomSurvey"]>
    composites: {}
  }

  type RoomSurveyGetPayload<S extends boolean | null | undefined | RoomSurveyDefaultArgs> = $Result.GetResult<Prisma.$RoomSurveyPayload, S>

  type RoomSurveyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomSurveyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomSurveyCountAggregateInputType | true
    }

  export interface RoomSurveyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoomSurvey'], meta: { name: 'RoomSurvey' } }
    /**
     * Find zero or one RoomSurvey that matches the filter.
     * @param {RoomSurveyFindUniqueArgs} args - Arguments to find a RoomSurvey
     * @example
     * // Get one RoomSurvey
     * const roomSurvey = await prisma.roomSurvey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomSurveyFindUniqueArgs>(args: SelectSubset<T, RoomSurveyFindUniqueArgs<ExtArgs>>): Prisma__RoomSurveyClient<$Result.GetResult<Prisma.$RoomSurveyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RoomSurvey that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomSurveyFindUniqueOrThrowArgs} args - Arguments to find a RoomSurvey
     * @example
     * // Get one RoomSurvey
     * const roomSurvey = await prisma.roomSurvey.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomSurveyFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomSurveyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomSurveyClient<$Result.GetResult<Prisma.$RoomSurveyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomSurvey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomSurveyFindFirstArgs} args - Arguments to find a RoomSurvey
     * @example
     * // Get one RoomSurvey
     * const roomSurvey = await prisma.roomSurvey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomSurveyFindFirstArgs>(args?: SelectSubset<T, RoomSurveyFindFirstArgs<ExtArgs>>): Prisma__RoomSurveyClient<$Result.GetResult<Prisma.$RoomSurveyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomSurvey that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomSurveyFindFirstOrThrowArgs} args - Arguments to find a RoomSurvey
     * @example
     * // Get one RoomSurvey
     * const roomSurvey = await prisma.roomSurvey.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomSurveyFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomSurveyFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomSurveyClient<$Result.GetResult<Prisma.$RoomSurveyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RoomSurveys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomSurveyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoomSurveys
     * const roomSurveys = await prisma.roomSurvey.findMany()
     * 
     * // Get first 10 RoomSurveys
     * const roomSurveys = await prisma.roomSurvey.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomSurveyWithIdOnly = await prisma.roomSurvey.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomSurveyFindManyArgs>(args?: SelectSubset<T, RoomSurveyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomSurveyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RoomSurvey.
     * @param {RoomSurveyCreateArgs} args - Arguments to create a RoomSurvey.
     * @example
     * // Create one RoomSurvey
     * const RoomSurvey = await prisma.roomSurvey.create({
     *   data: {
     *     // ... data to create a RoomSurvey
     *   }
     * })
     * 
     */
    create<T extends RoomSurveyCreateArgs>(args: SelectSubset<T, RoomSurveyCreateArgs<ExtArgs>>): Prisma__RoomSurveyClient<$Result.GetResult<Prisma.$RoomSurveyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RoomSurveys.
     * @param {RoomSurveyCreateManyArgs} args - Arguments to create many RoomSurveys.
     * @example
     * // Create many RoomSurveys
     * const roomSurvey = await prisma.roomSurvey.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomSurveyCreateManyArgs>(args?: SelectSubset<T, RoomSurveyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoomSurveys and returns the data saved in the database.
     * @param {RoomSurveyCreateManyAndReturnArgs} args - Arguments to create many RoomSurveys.
     * @example
     * // Create many RoomSurveys
     * const roomSurvey = await prisma.roomSurvey.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoomSurveys and only return the `id`
     * const roomSurveyWithIdOnly = await prisma.roomSurvey.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomSurveyCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomSurveyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomSurveyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RoomSurvey.
     * @param {RoomSurveyDeleteArgs} args - Arguments to delete one RoomSurvey.
     * @example
     * // Delete one RoomSurvey
     * const RoomSurvey = await prisma.roomSurvey.delete({
     *   where: {
     *     // ... filter to delete one RoomSurvey
     *   }
     * })
     * 
     */
    delete<T extends RoomSurveyDeleteArgs>(args: SelectSubset<T, RoomSurveyDeleteArgs<ExtArgs>>): Prisma__RoomSurveyClient<$Result.GetResult<Prisma.$RoomSurveyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RoomSurvey.
     * @param {RoomSurveyUpdateArgs} args - Arguments to update one RoomSurvey.
     * @example
     * // Update one RoomSurvey
     * const roomSurvey = await prisma.roomSurvey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomSurveyUpdateArgs>(args: SelectSubset<T, RoomSurveyUpdateArgs<ExtArgs>>): Prisma__RoomSurveyClient<$Result.GetResult<Prisma.$RoomSurveyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RoomSurveys.
     * @param {RoomSurveyDeleteManyArgs} args - Arguments to filter RoomSurveys to delete.
     * @example
     * // Delete a few RoomSurveys
     * const { count } = await prisma.roomSurvey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomSurveyDeleteManyArgs>(args?: SelectSubset<T, RoomSurveyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomSurveys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomSurveyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoomSurveys
     * const roomSurvey = await prisma.roomSurvey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomSurveyUpdateManyArgs>(args: SelectSubset<T, RoomSurveyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomSurveys and returns the data updated in the database.
     * @param {RoomSurveyUpdateManyAndReturnArgs} args - Arguments to update many RoomSurveys.
     * @example
     * // Update many RoomSurveys
     * const roomSurvey = await prisma.roomSurvey.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RoomSurveys and only return the `id`
     * const roomSurveyWithIdOnly = await prisma.roomSurvey.updateManyAndReturn({
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
    updateManyAndReturn<T extends RoomSurveyUpdateManyAndReturnArgs>(args: SelectSubset<T, RoomSurveyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomSurveyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RoomSurvey.
     * @param {RoomSurveyUpsertArgs} args - Arguments to update or create a RoomSurvey.
     * @example
     * // Update or create a RoomSurvey
     * const roomSurvey = await prisma.roomSurvey.upsert({
     *   create: {
     *     // ... data to create a RoomSurvey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoomSurvey we want to update
     *   }
     * })
     */
    upsert<T extends RoomSurveyUpsertArgs>(args: SelectSubset<T, RoomSurveyUpsertArgs<ExtArgs>>): Prisma__RoomSurveyClient<$Result.GetResult<Prisma.$RoomSurveyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RoomSurveys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomSurveyCountArgs} args - Arguments to filter RoomSurveys to count.
     * @example
     * // Count the number of RoomSurveys
     * const count = await prisma.roomSurvey.count({
     *   where: {
     *     // ... the filter for the RoomSurveys we want to count
     *   }
     * })
    **/
    count<T extends RoomSurveyCountArgs>(
      args?: Subset<T, RoomSurveyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomSurveyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoomSurvey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomSurveyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RoomSurveyAggregateArgs>(args: Subset<T, RoomSurveyAggregateArgs>): Prisma.PrismaPromise<GetRoomSurveyAggregateType<T>>

    /**
     * Group by RoomSurvey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomSurveyGroupByArgs} args - Group by arguments.
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
      T extends RoomSurveyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomSurveyGroupByArgs['orderBy'] }
        : { orderBy?: RoomSurveyGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RoomSurveyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomSurveyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoomSurvey model
   */
  readonly fields: RoomSurveyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoomSurvey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomSurveyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the RoomSurvey model
   */
  interface RoomSurveyFieldRefs {
    readonly id: FieldRef<"RoomSurvey", 'String'>
    readonly roomId: FieldRef<"RoomSurvey", 'String'>
    readonly title: FieldRef<"RoomSurvey", 'String'>
    readonly description: FieldRef<"RoomSurvey", 'String'>
    readonly createdAt: FieldRef<"RoomSurvey", 'DateTime'>
    readonly updatedAt: FieldRef<"RoomSurvey", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RoomSurvey findUnique
   */
  export type RoomSurveyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomSurvey
     */
    select?: RoomSurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomSurvey
     */
    omit?: RoomSurveyOmit<ExtArgs> | null
    /**
     * Filter, which RoomSurvey to fetch.
     */
    where: RoomSurveyWhereUniqueInput
  }

  /**
   * RoomSurvey findUniqueOrThrow
   */
  export type RoomSurveyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomSurvey
     */
    select?: RoomSurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomSurvey
     */
    omit?: RoomSurveyOmit<ExtArgs> | null
    /**
     * Filter, which RoomSurvey to fetch.
     */
    where: RoomSurveyWhereUniqueInput
  }

  /**
   * RoomSurvey findFirst
   */
  export type RoomSurveyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomSurvey
     */
    select?: RoomSurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomSurvey
     */
    omit?: RoomSurveyOmit<ExtArgs> | null
    /**
     * Filter, which RoomSurvey to fetch.
     */
    where?: RoomSurveyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomSurveys to fetch.
     */
    orderBy?: RoomSurveyOrderByWithRelationInput | RoomSurveyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomSurveys.
     */
    cursor?: RoomSurveyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomSurveys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomSurveys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomSurveys.
     */
    distinct?: RoomSurveyScalarFieldEnum | RoomSurveyScalarFieldEnum[]
  }

  /**
   * RoomSurvey findFirstOrThrow
   */
  export type RoomSurveyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomSurvey
     */
    select?: RoomSurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomSurvey
     */
    omit?: RoomSurveyOmit<ExtArgs> | null
    /**
     * Filter, which RoomSurvey to fetch.
     */
    where?: RoomSurveyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomSurveys to fetch.
     */
    orderBy?: RoomSurveyOrderByWithRelationInput | RoomSurveyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomSurveys.
     */
    cursor?: RoomSurveyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomSurveys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomSurveys.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomSurveys.
     */
    distinct?: RoomSurveyScalarFieldEnum | RoomSurveyScalarFieldEnum[]
  }

  /**
   * RoomSurvey findMany
   */
  export type RoomSurveyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomSurvey
     */
    select?: RoomSurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomSurvey
     */
    omit?: RoomSurveyOmit<ExtArgs> | null
    /**
     * Filter, which RoomSurveys to fetch.
     */
    where?: RoomSurveyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomSurveys to fetch.
     */
    orderBy?: RoomSurveyOrderByWithRelationInput | RoomSurveyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoomSurveys.
     */
    cursor?: RoomSurveyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomSurveys from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomSurveys.
     */
    skip?: number
    distinct?: RoomSurveyScalarFieldEnum | RoomSurveyScalarFieldEnum[]
  }

  /**
   * RoomSurvey create
   */
  export type RoomSurveyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomSurvey
     */
    select?: RoomSurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomSurvey
     */
    omit?: RoomSurveyOmit<ExtArgs> | null
    /**
     * The data needed to create a RoomSurvey.
     */
    data: XOR<RoomSurveyCreateInput, RoomSurveyUncheckedCreateInput>
  }

  /**
   * RoomSurvey createMany
   */
  export type RoomSurveyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoomSurveys.
     */
    data: RoomSurveyCreateManyInput | RoomSurveyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoomSurvey createManyAndReturn
   */
  export type RoomSurveyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomSurvey
     */
    select?: RoomSurveySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomSurvey
     */
    omit?: RoomSurveyOmit<ExtArgs> | null
    /**
     * The data used to create many RoomSurveys.
     */
    data: RoomSurveyCreateManyInput | RoomSurveyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoomSurvey update
   */
  export type RoomSurveyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomSurvey
     */
    select?: RoomSurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomSurvey
     */
    omit?: RoomSurveyOmit<ExtArgs> | null
    /**
     * The data needed to update a RoomSurvey.
     */
    data: XOR<RoomSurveyUpdateInput, RoomSurveyUncheckedUpdateInput>
    /**
     * Choose, which RoomSurvey to update.
     */
    where: RoomSurveyWhereUniqueInput
  }

  /**
   * RoomSurvey updateMany
   */
  export type RoomSurveyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoomSurveys.
     */
    data: XOR<RoomSurveyUpdateManyMutationInput, RoomSurveyUncheckedUpdateManyInput>
    /**
     * Filter which RoomSurveys to update
     */
    where?: RoomSurveyWhereInput
    /**
     * Limit how many RoomSurveys to update.
     */
    limit?: number
  }

  /**
   * RoomSurvey updateManyAndReturn
   */
  export type RoomSurveyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomSurvey
     */
    select?: RoomSurveySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomSurvey
     */
    omit?: RoomSurveyOmit<ExtArgs> | null
    /**
     * The data used to update RoomSurveys.
     */
    data: XOR<RoomSurveyUpdateManyMutationInput, RoomSurveyUncheckedUpdateManyInput>
    /**
     * Filter which RoomSurveys to update
     */
    where?: RoomSurveyWhereInput
    /**
     * Limit how many RoomSurveys to update.
     */
    limit?: number
  }

  /**
   * RoomSurvey upsert
   */
  export type RoomSurveyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomSurvey
     */
    select?: RoomSurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomSurvey
     */
    omit?: RoomSurveyOmit<ExtArgs> | null
    /**
     * The filter to search for the RoomSurvey to update in case it exists.
     */
    where: RoomSurveyWhereUniqueInput
    /**
     * In case the RoomSurvey found by the `where` argument doesn't exist, create a new RoomSurvey with this data.
     */
    create: XOR<RoomSurveyCreateInput, RoomSurveyUncheckedCreateInput>
    /**
     * In case the RoomSurvey was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomSurveyUpdateInput, RoomSurveyUncheckedUpdateInput>
  }

  /**
   * RoomSurvey delete
   */
  export type RoomSurveyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomSurvey
     */
    select?: RoomSurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomSurvey
     */
    omit?: RoomSurveyOmit<ExtArgs> | null
    /**
     * Filter which RoomSurvey to delete.
     */
    where: RoomSurveyWhereUniqueInput
  }

  /**
   * RoomSurvey deleteMany
   */
  export type RoomSurveyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomSurveys to delete
     */
    where?: RoomSurveyWhereInput
    /**
     * Limit how many RoomSurveys to delete.
     */
    limit?: number
  }

  /**
   * RoomSurvey without action
   */
  export type RoomSurveyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomSurvey
     */
    select?: RoomSurveySelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomSurvey
     */
    omit?: RoomSurveyOmit<ExtArgs> | null
  }


  /**
   * Model RoomSurveyResponse
   */

  export type AggregateRoomSurveyResponse = {
    _count: RoomSurveyResponseCountAggregateOutputType | null
    _avg: RoomSurveyResponseAvgAggregateOutputType | null
    _sum: RoomSurveyResponseSumAggregateOutputType | null
    _min: RoomSurveyResponseMinAggregateOutputType | null
    _max: RoomSurveyResponseMaxAggregateOutputType | null
  }

  export type RoomSurveyResponseAvgAggregateOutputType = {
    rating: number | null
  }

  export type RoomSurveyResponseSumAggregateOutputType = {
    rating: number | null
  }

  export type RoomSurveyResponseMinAggregateOutputType = {
    id: string | null
    surveyId: string | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomSurveyResponseMaxAggregateOutputType = {
    id: string | null
    surveyId: string | null
    rating: number | null
    comment: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomSurveyResponseCountAggregateOutputType = {
    id: number
    surveyId: number
    rating: number
    comment: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoomSurveyResponseAvgAggregateInputType = {
    rating?: true
  }

  export type RoomSurveyResponseSumAggregateInputType = {
    rating?: true
  }

  export type RoomSurveyResponseMinAggregateInputType = {
    id?: true
    surveyId?: true
    rating?: true
    comment?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomSurveyResponseMaxAggregateInputType = {
    id?: true
    surveyId?: true
    rating?: true
    comment?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomSurveyResponseCountAggregateInputType = {
    id?: true
    surveyId?: true
    rating?: true
    comment?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoomSurveyResponseAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomSurveyResponse to aggregate.
     */
    where?: RoomSurveyResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomSurveyResponses to fetch.
     */
    orderBy?: RoomSurveyResponseOrderByWithRelationInput | RoomSurveyResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomSurveyResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomSurveyResponses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomSurveyResponses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoomSurveyResponses
    **/
    _count?: true | RoomSurveyResponseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoomSurveyResponseAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoomSurveyResponseSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomSurveyResponseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomSurveyResponseMaxAggregateInputType
  }

  export type GetRoomSurveyResponseAggregateType<T extends RoomSurveyResponseAggregateArgs> = {
        [P in keyof T & keyof AggregateRoomSurveyResponse]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoomSurveyResponse[P]>
      : GetScalarType<T[P], AggregateRoomSurveyResponse[P]>
  }




  export type RoomSurveyResponseGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomSurveyResponseWhereInput
    orderBy?: RoomSurveyResponseOrderByWithAggregationInput | RoomSurveyResponseOrderByWithAggregationInput[]
    by: RoomSurveyResponseScalarFieldEnum[] | RoomSurveyResponseScalarFieldEnum
    having?: RoomSurveyResponseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomSurveyResponseCountAggregateInputType | true
    _avg?: RoomSurveyResponseAvgAggregateInputType
    _sum?: RoomSurveyResponseSumAggregateInputType
    _min?: RoomSurveyResponseMinAggregateInputType
    _max?: RoomSurveyResponseMaxAggregateInputType
  }

  export type RoomSurveyResponseGroupByOutputType = {
    id: string
    surveyId: string
    rating: number
    comment: string | null
    createdAt: Date
    updatedAt: Date
    _count: RoomSurveyResponseCountAggregateOutputType | null
    _avg: RoomSurveyResponseAvgAggregateOutputType | null
    _sum: RoomSurveyResponseSumAggregateOutputType | null
    _min: RoomSurveyResponseMinAggregateOutputType | null
    _max: RoomSurveyResponseMaxAggregateOutputType | null
  }

  type GetRoomSurveyResponseGroupByPayload<T extends RoomSurveyResponseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomSurveyResponseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomSurveyResponseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomSurveyResponseGroupByOutputType[P]>
            : GetScalarType<T[P], RoomSurveyResponseGroupByOutputType[P]>
        }
      >
    >


  export type RoomSurveyResponseSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    surveyId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["roomSurveyResponse"]>

  export type RoomSurveyResponseSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    surveyId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["roomSurveyResponse"]>

  export type RoomSurveyResponseSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    surveyId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["roomSurveyResponse"]>

  export type RoomSurveyResponseSelectScalar = {
    id?: boolean
    surveyId?: boolean
    rating?: boolean
    comment?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoomSurveyResponseOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "surveyId" | "rating" | "comment" | "createdAt" | "updatedAt", ExtArgs["result"]["roomSurveyResponse"]>

  export type $RoomSurveyResponsePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoomSurveyResponse"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      surveyId: string
      rating: number
      comment: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["roomSurveyResponse"]>
    composites: {}
  }

  type RoomSurveyResponseGetPayload<S extends boolean | null | undefined | RoomSurveyResponseDefaultArgs> = $Result.GetResult<Prisma.$RoomSurveyResponsePayload, S>

  type RoomSurveyResponseCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomSurveyResponseFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomSurveyResponseCountAggregateInputType | true
    }

  export interface RoomSurveyResponseDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoomSurveyResponse'], meta: { name: 'RoomSurveyResponse' } }
    /**
     * Find zero or one RoomSurveyResponse that matches the filter.
     * @param {RoomSurveyResponseFindUniqueArgs} args - Arguments to find a RoomSurveyResponse
     * @example
     * // Get one RoomSurveyResponse
     * const roomSurveyResponse = await prisma.roomSurveyResponse.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomSurveyResponseFindUniqueArgs>(args: SelectSubset<T, RoomSurveyResponseFindUniqueArgs<ExtArgs>>): Prisma__RoomSurveyResponseClient<$Result.GetResult<Prisma.$RoomSurveyResponsePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RoomSurveyResponse that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomSurveyResponseFindUniqueOrThrowArgs} args - Arguments to find a RoomSurveyResponse
     * @example
     * // Get one RoomSurveyResponse
     * const roomSurveyResponse = await prisma.roomSurveyResponse.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomSurveyResponseFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomSurveyResponseFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomSurveyResponseClient<$Result.GetResult<Prisma.$RoomSurveyResponsePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomSurveyResponse that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomSurveyResponseFindFirstArgs} args - Arguments to find a RoomSurveyResponse
     * @example
     * // Get one RoomSurveyResponse
     * const roomSurveyResponse = await prisma.roomSurveyResponse.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomSurveyResponseFindFirstArgs>(args?: SelectSubset<T, RoomSurveyResponseFindFirstArgs<ExtArgs>>): Prisma__RoomSurveyResponseClient<$Result.GetResult<Prisma.$RoomSurveyResponsePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomSurveyResponse that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomSurveyResponseFindFirstOrThrowArgs} args - Arguments to find a RoomSurveyResponse
     * @example
     * // Get one RoomSurveyResponse
     * const roomSurveyResponse = await prisma.roomSurveyResponse.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomSurveyResponseFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomSurveyResponseFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomSurveyResponseClient<$Result.GetResult<Prisma.$RoomSurveyResponsePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RoomSurveyResponses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomSurveyResponseFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoomSurveyResponses
     * const roomSurveyResponses = await prisma.roomSurveyResponse.findMany()
     * 
     * // Get first 10 RoomSurveyResponses
     * const roomSurveyResponses = await prisma.roomSurveyResponse.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomSurveyResponseWithIdOnly = await prisma.roomSurveyResponse.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomSurveyResponseFindManyArgs>(args?: SelectSubset<T, RoomSurveyResponseFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomSurveyResponsePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RoomSurveyResponse.
     * @param {RoomSurveyResponseCreateArgs} args - Arguments to create a RoomSurveyResponse.
     * @example
     * // Create one RoomSurveyResponse
     * const RoomSurveyResponse = await prisma.roomSurveyResponse.create({
     *   data: {
     *     // ... data to create a RoomSurveyResponse
     *   }
     * })
     * 
     */
    create<T extends RoomSurveyResponseCreateArgs>(args: SelectSubset<T, RoomSurveyResponseCreateArgs<ExtArgs>>): Prisma__RoomSurveyResponseClient<$Result.GetResult<Prisma.$RoomSurveyResponsePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RoomSurveyResponses.
     * @param {RoomSurveyResponseCreateManyArgs} args - Arguments to create many RoomSurveyResponses.
     * @example
     * // Create many RoomSurveyResponses
     * const roomSurveyResponse = await prisma.roomSurveyResponse.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomSurveyResponseCreateManyArgs>(args?: SelectSubset<T, RoomSurveyResponseCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoomSurveyResponses and returns the data saved in the database.
     * @param {RoomSurveyResponseCreateManyAndReturnArgs} args - Arguments to create many RoomSurveyResponses.
     * @example
     * // Create many RoomSurveyResponses
     * const roomSurveyResponse = await prisma.roomSurveyResponse.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoomSurveyResponses and only return the `id`
     * const roomSurveyResponseWithIdOnly = await prisma.roomSurveyResponse.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomSurveyResponseCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomSurveyResponseCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomSurveyResponsePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RoomSurveyResponse.
     * @param {RoomSurveyResponseDeleteArgs} args - Arguments to delete one RoomSurveyResponse.
     * @example
     * // Delete one RoomSurveyResponse
     * const RoomSurveyResponse = await prisma.roomSurveyResponse.delete({
     *   where: {
     *     // ... filter to delete one RoomSurveyResponse
     *   }
     * })
     * 
     */
    delete<T extends RoomSurveyResponseDeleteArgs>(args: SelectSubset<T, RoomSurveyResponseDeleteArgs<ExtArgs>>): Prisma__RoomSurveyResponseClient<$Result.GetResult<Prisma.$RoomSurveyResponsePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RoomSurveyResponse.
     * @param {RoomSurveyResponseUpdateArgs} args - Arguments to update one RoomSurveyResponse.
     * @example
     * // Update one RoomSurveyResponse
     * const roomSurveyResponse = await prisma.roomSurveyResponse.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomSurveyResponseUpdateArgs>(args: SelectSubset<T, RoomSurveyResponseUpdateArgs<ExtArgs>>): Prisma__RoomSurveyResponseClient<$Result.GetResult<Prisma.$RoomSurveyResponsePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RoomSurveyResponses.
     * @param {RoomSurveyResponseDeleteManyArgs} args - Arguments to filter RoomSurveyResponses to delete.
     * @example
     * // Delete a few RoomSurveyResponses
     * const { count } = await prisma.roomSurveyResponse.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomSurveyResponseDeleteManyArgs>(args?: SelectSubset<T, RoomSurveyResponseDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomSurveyResponses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomSurveyResponseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoomSurveyResponses
     * const roomSurveyResponse = await prisma.roomSurveyResponse.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomSurveyResponseUpdateManyArgs>(args: SelectSubset<T, RoomSurveyResponseUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomSurveyResponses and returns the data updated in the database.
     * @param {RoomSurveyResponseUpdateManyAndReturnArgs} args - Arguments to update many RoomSurveyResponses.
     * @example
     * // Update many RoomSurveyResponses
     * const roomSurveyResponse = await prisma.roomSurveyResponse.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RoomSurveyResponses and only return the `id`
     * const roomSurveyResponseWithIdOnly = await prisma.roomSurveyResponse.updateManyAndReturn({
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
    updateManyAndReturn<T extends RoomSurveyResponseUpdateManyAndReturnArgs>(args: SelectSubset<T, RoomSurveyResponseUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomSurveyResponsePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RoomSurveyResponse.
     * @param {RoomSurveyResponseUpsertArgs} args - Arguments to update or create a RoomSurveyResponse.
     * @example
     * // Update or create a RoomSurveyResponse
     * const roomSurveyResponse = await prisma.roomSurveyResponse.upsert({
     *   create: {
     *     // ... data to create a RoomSurveyResponse
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoomSurveyResponse we want to update
     *   }
     * })
     */
    upsert<T extends RoomSurveyResponseUpsertArgs>(args: SelectSubset<T, RoomSurveyResponseUpsertArgs<ExtArgs>>): Prisma__RoomSurveyResponseClient<$Result.GetResult<Prisma.$RoomSurveyResponsePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RoomSurveyResponses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomSurveyResponseCountArgs} args - Arguments to filter RoomSurveyResponses to count.
     * @example
     * // Count the number of RoomSurveyResponses
     * const count = await prisma.roomSurveyResponse.count({
     *   where: {
     *     // ... the filter for the RoomSurveyResponses we want to count
     *   }
     * })
    **/
    count<T extends RoomSurveyResponseCountArgs>(
      args?: Subset<T, RoomSurveyResponseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomSurveyResponseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoomSurveyResponse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomSurveyResponseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RoomSurveyResponseAggregateArgs>(args: Subset<T, RoomSurveyResponseAggregateArgs>): Prisma.PrismaPromise<GetRoomSurveyResponseAggregateType<T>>

    /**
     * Group by RoomSurveyResponse.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomSurveyResponseGroupByArgs} args - Group by arguments.
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
      T extends RoomSurveyResponseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomSurveyResponseGroupByArgs['orderBy'] }
        : { orderBy?: RoomSurveyResponseGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RoomSurveyResponseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomSurveyResponseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoomSurveyResponse model
   */
  readonly fields: RoomSurveyResponseFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoomSurveyResponse.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomSurveyResponseClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the RoomSurveyResponse model
   */
  interface RoomSurveyResponseFieldRefs {
    readonly id: FieldRef<"RoomSurveyResponse", 'String'>
    readonly surveyId: FieldRef<"RoomSurveyResponse", 'String'>
    readonly rating: FieldRef<"RoomSurveyResponse", 'Int'>
    readonly comment: FieldRef<"RoomSurveyResponse", 'String'>
    readonly createdAt: FieldRef<"RoomSurveyResponse", 'DateTime'>
    readonly updatedAt: FieldRef<"RoomSurveyResponse", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RoomSurveyResponse findUnique
   */
  export type RoomSurveyResponseFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomSurveyResponse
     */
    select?: RoomSurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomSurveyResponse
     */
    omit?: RoomSurveyResponseOmit<ExtArgs> | null
    /**
     * Filter, which RoomSurveyResponse to fetch.
     */
    where: RoomSurveyResponseWhereUniqueInput
  }

  /**
   * RoomSurveyResponse findUniqueOrThrow
   */
  export type RoomSurveyResponseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomSurveyResponse
     */
    select?: RoomSurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomSurveyResponse
     */
    omit?: RoomSurveyResponseOmit<ExtArgs> | null
    /**
     * Filter, which RoomSurveyResponse to fetch.
     */
    where: RoomSurveyResponseWhereUniqueInput
  }

  /**
   * RoomSurveyResponse findFirst
   */
  export type RoomSurveyResponseFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomSurveyResponse
     */
    select?: RoomSurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomSurveyResponse
     */
    omit?: RoomSurveyResponseOmit<ExtArgs> | null
    /**
     * Filter, which RoomSurveyResponse to fetch.
     */
    where?: RoomSurveyResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomSurveyResponses to fetch.
     */
    orderBy?: RoomSurveyResponseOrderByWithRelationInput | RoomSurveyResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomSurveyResponses.
     */
    cursor?: RoomSurveyResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomSurveyResponses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomSurveyResponses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomSurveyResponses.
     */
    distinct?: RoomSurveyResponseScalarFieldEnum | RoomSurveyResponseScalarFieldEnum[]
  }

  /**
   * RoomSurveyResponse findFirstOrThrow
   */
  export type RoomSurveyResponseFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomSurveyResponse
     */
    select?: RoomSurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomSurveyResponse
     */
    omit?: RoomSurveyResponseOmit<ExtArgs> | null
    /**
     * Filter, which RoomSurveyResponse to fetch.
     */
    where?: RoomSurveyResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomSurveyResponses to fetch.
     */
    orderBy?: RoomSurveyResponseOrderByWithRelationInput | RoomSurveyResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomSurveyResponses.
     */
    cursor?: RoomSurveyResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomSurveyResponses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomSurveyResponses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomSurveyResponses.
     */
    distinct?: RoomSurveyResponseScalarFieldEnum | RoomSurveyResponseScalarFieldEnum[]
  }

  /**
   * RoomSurveyResponse findMany
   */
  export type RoomSurveyResponseFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomSurveyResponse
     */
    select?: RoomSurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomSurveyResponse
     */
    omit?: RoomSurveyResponseOmit<ExtArgs> | null
    /**
     * Filter, which RoomSurveyResponses to fetch.
     */
    where?: RoomSurveyResponseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomSurveyResponses to fetch.
     */
    orderBy?: RoomSurveyResponseOrderByWithRelationInput | RoomSurveyResponseOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoomSurveyResponses.
     */
    cursor?: RoomSurveyResponseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomSurveyResponses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomSurveyResponses.
     */
    skip?: number
    distinct?: RoomSurveyResponseScalarFieldEnum | RoomSurveyResponseScalarFieldEnum[]
  }

  /**
   * RoomSurveyResponse create
   */
  export type RoomSurveyResponseCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomSurveyResponse
     */
    select?: RoomSurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomSurveyResponse
     */
    omit?: RoomSurveyResponseOmit<ExtArgs> | null
    /**
     * The data needed to create a RoomSurveyResponse.
     */
    data: XOR<RoomSurveyResponseCreateInput, RoomSurveyResponseUncheckedCreateInput>
  }

  /**
   * RoomSurveyResponse createMany
   */
  export type RoomSurveyResponseCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoomSurveyResponses.
     */
    data: RoomSurveyResponseCreateManyInput | RoomSurveyResponseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoomSurveyResponse createManyAndReturn
   */
  export type RoomSurveyResponseCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomSurveyResponse
     */
    select?: RoomSurveyResponseSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomSurveyResponse
     */
    omit?: RoomSurveyResponseOmit<ExtArgs> | null
    /**
     * The data used to create many RoomSurveyResponses.
     */
    data: RoomSurveyResponseCreateManyInput | RoomSurveyResponseCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoomSurveyResponse update
   */
  export type RoomSurveyResponseUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomSurveyResponse
     */
    select?: RoomSurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomSurveyResponse
     */
    omit?: RoomSurveyResponseOmit<ExtArgs> | null
    /**
     * The data needed to update a RoomSurveyResponse.
     */
    data: XOR<RoomSurveyResponseUpdateInput, RoomSurveyResponseUncheckedUpdateInput>
    /**
     * Choose, which RoomSurveyResponse to update.
     */
    where: RoomSurveyResponseWhereUniqueInput
  }

  /**
   * RoomSurveyResponse updateMany
   */
  export type RoomSurveyResponseUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoomSurveyResponses.
     */
    data: XOR<RoomSurveyResponseUpdateManyMutationInput, RoomSurveyResponseUncheckedUpdateManyInput>
    /**
     * Filter which RoomSurveyResponses to update
     */
    where?: RoomSurveyResponseWhereInput
    /**
     * Limit how many RoomSurveyResponses to update.
     */
    limit?: number
  }

  /**
   * RoomSurveyResponse updateManyAndReturn
   */
  export type RoomSurveyResponseUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomSurveyResponse
     */
    select?: RoomSurveyResponseSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomSurveyResponse
     */
    omit?: RoomSurveyResponseOmit<ExtArgs> | null
    /**
     * The data used to update RoomSurveyResponses.
     */
    data: XOR<RoomSurveyResponseUpdateManyMutationInput, RoomSurveyResponseUncheckedUpdateManyInput>
    /**
     * Filter which RoomSurveyResponses to update
     */
    where?: RoomSurveyResponseWhereInput
    /**
     * Limit how many RoomSurveyResponses to update.
     */
    limit?: number
  }

  /**
   * RoomSurveyResponse upsert
   */
  export type RoomSurveyResponseUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomSurveyResponse
     */
    select?: RoomSurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomSurveyResponse
     */
    omit?: RoomSurveyResponseOmit<ExtArgs> | null
    /**
     * The filter to search for the RoomSurveyResponse to update in case it exists.
     */
    where: RoomSurveyResponseWhereUniqueInput
    /**
     * In case the RoomSurveyResponse found by the `where` argument doesn't exist, create a new RoomSurveyResponse with this data.
     */
    create: XOR<RoomSurveyResponseCreateInput, RoomSurveyResponseUncheckedCreateInput>
    /**
     * In case the RoomSurveyResponse was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomSurveyResponseUpdateInput, RoomSurveyResponseUncheckedUpdateInput>
  }

  /**
   * RoomSurveyResponse delete
   */
  export type RoomSurveyResponseDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomSurveyResponse
     */
    select?: RoomSurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomSurveyResponse
     */
    omit?: RoomSurveyResponseOmit<ExtArgs> | null
    /**
     * Filter which RoomSurveyResponse to delete.
     */
    where: RoomSurveyResponseWhereUniqueInput
  }

  /**
   * RoomSurveyResponse deleteMany
   */
  export type RoomSurveyResponseDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomSurveyResponses to delete
     */
    where?: RoomSurveyResponseWhereInput
    /**
     * Limit how many RoomSurveyResponses to delete.
     */
    limit?: number
  }

  /**
   * RoomSurveyResponse without action
   */
  export type RoomSurveyResponseDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomSurveyResponse
     */
    select?: RoomSurveyResponseSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomSurveyResponse
     */
    omit?: RoomSurveyResponseOmit<ExtArgs> | null
  }


  /**
   * Model Device
   */

  export type AggregateDevice = {
    _count: DeviceCountAggregateOutputType | null
    _min: DeviceMinAggregateOutputType | null
    _max: DeviceMaxAggregateOutputType | null
  }

  export type DeviceMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    firmware: string | null
    isPaired: boolean | null
    roomId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DeviceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    firmware: string | null
    isPaired: boolean | null
    roomId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DeviceCountAggregateOutputType = {
    id: number
    name: number
    description: number
    firmware: number
    isPaired: number
    roomId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DeviceMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    firmware?: true
    isPaired?: true
    roomId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DeviceMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    firmware?: true
    isPaired?: true
    roomId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DeviceCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    firmware?: true
    isPaired?: true
    roomId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DeviceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Device to aggregate.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Devices
    **/
    _count?: true | DeviceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeviceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeviceMaxAggregateInputType
  }

  export type GetDeviceAggregateType<T extends DeviceAggregateArgs> = {
        [P in keyof T & keyof AggregateDevice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDevice[P]>
      : GetScalarType<T[P], AggregateDevice[P]>
  }




  export type DeviceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeviceWhereInput
    orderBy?: DeviceOrderByWithAggregationInput | DeviceOrderByWithAggregationInput[]
    by: DeviceScalarFieldEnum[] | DeviceScalarFieldEnum
    having?: DeviceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeviceCountAggregateInputType | true
    _min?: DeviceMinAggregateInputType
    _max?: DeviceMaxAggregateInputType
  }

  export type DeviceGroupByOutputType = {
    id: string
    name: string
    description: string | null
    firmware: string | null
    isPaired: boolean
    roomId: string | null
    createdAt: Date
    updatedAt: Date
    _count: DeviceCountAggregateOutputType | null
    _min: DeviceMinAggregateOutputType | null
    _max: DeviceMaxAggregateOutputType | null
  }

  type GetDeviceGroupByPayload<T extends DeviceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeviceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeviceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeviceGroupByOutputType[P]>
            : GetScalarType<T[P], DeviceGroupByOutputType[P]>
        }
      >
    >


  export type DeviceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    firmware?: boolean
    isPaired?: boolean
    roomId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    room?: boolean | Device$roomArgs<ExtArgs>
    readings?: boolean | Device$readingsArgs<ExtArgs>
    _count?: boolean | DeviceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["device"]>

  export type DeviceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    firmware?: boolean
    isPaired?: boolean
    roomId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    room?: boolean | Device$roomArgs<ExtArgs>
  }, ExtArgs["result"]["device"]>

  export type DeviceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    firmware?: boolean
    isPaired?: boolean
    roomId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    room?: boolean | Device$roomArgs<ExtArgs>
  }, ExtArgs["result"]["device"]>

  export type DeviceSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    firmware?: boolean
    isPaired?: boolean
    roomId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DeviceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "firmware" | "isPaired" | "roomId" | "createdAt" | "updatedAt", ExtArgs["result"]["device"]>
  export type DeviceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | Device$roomArgs<ExtArgs>
    readings?: boolean | Device$readingsArgs<ExtArgs>
    _count?: boolean | DeviceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DeviceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | Device$roomArgs<ExtArgs>
  }
  export type DeviceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | Device$roomArgs<ExtArgs>
  }

  export type $DevicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Device"
    objects: {
      room: Prisma.$RoomPayload<ExtArgs> | null
      readings: Prisma.$DeviceReadingPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      firmware: string | null
      isPaired: boolean
      roomId: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["device"]>
    composites: {}
  }

  type DeviceGetPayload<S extends boolean | null | undefined | DeviceDefaultArgs> = $Result.GetResult<Prisma.$DevicePayload, S>

  type DeviceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DeviceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DeviceCountAggregateInputType | true
    }

  export interface DeviceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Device'], meta: { name: 'Device' } }
    /**
     * Find zero or one Device that matches the filter.
     * @param {DeviceFindUniqueArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeviceFindUniqueArgs>(args: SelectSubset<T, DeviceFindUniqueArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Device that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DeviceFindUniqueOrThrowArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeviceFindUniqueOrThrowArgs>(args: SelectSubset<T, DeviceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Device that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceFindFirstArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeviceFindFirstArgs>(args?: SelectSubset<T, DeviceFindFirstArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Device that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceFindFirstOrThrowArgs} args - Arguments to find a Device
     * @example
     * // Get one Device
     * const device = await prisma.device.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeviceFindFirstOrThrowArgs>(args?: SelectSubset<T, DeviceFindFirstOrThrowArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Devices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Devices
     * const devices = await prisma.device.findMany()
     * 
     * // Get first 10 Devices
     * const devices = await prisma.device.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deviceWithIdOnly = await prisma.device.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DeviceFindManyArgs>(args?: SelectSubset<T, DeviceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Device.
     * @param {DeviceCreateArgs} args - Arguments to create a Device.
     * @example
     * // Create one Device
     * const Device = await prisma.device.create({
     *   data: {
     *     // ... data to create a Device
     *   }
     * })
     * 
     */
    create<T extends DeviceCreateArgs>(args: SelectSubset<T, DeviceCreateArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Devices.
     * @param {DeviceCreateManyArgs} args - Arguments to create many Devices.
     * @example
     * // Create many Devices
     * const device = await prisma.device.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DeviceCreateManyArgs>(args?: SelectSubset<T, DeviceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Devices and returns the data saved in the database.
     * @param {DeviceCreateManyAndReturnArgs} args - Arguments to create many Devices.
     * @example
     * // Create many Devices
     * const device = await prisma.device.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Devices and only return the `id`
     * const deviceWithIdOnly = await prisma.device.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DeviceCreateManyAndReturnArgs>(args?: SelectSubset<T, DeviceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Device.
     * @param {DeviceDeleteArgs} args - Arguments to delete one Device.
     * @example
     * // Delete one Device
     * const Device = await prisma.device.delete({
     *   where: {
     *     // ... filter to delete one Device
     *   }
     * })
     * 
     */
    delete<T extends DeviceDeleteArgs>(args: SelectSubset<T, DeviceDeleteArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Device.
     * @param {DeviceUpdateArgs} args - Arguments to update one Device.
     * @example
     * // Update one Device
     * const device = await prisma.device.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DeviceUpdateArgs>(args: SelectSubset<T, DeviceUpdateArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Devices.
     * @param {DeviceDeleteManyArgs} args - Arguments to filter Devices to delete.
     * @example
     * // Delete a few Devices
     * const { count } = await prisma.device.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DeviceDeleteManyArgs>(args?: SelectSubset<T, DeviceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Devices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Devices
     * const device = await prisma.device.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DeviceUpdateManyArgs>(args: SelectSubset<T, DeviceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Devices and returns the data updated in the database.
     * @param {DeviceUpdateManyAndReturnArgs} args - Arguments to update many Devices.
     * @example
     * // Update many Devices
     * const device = await prisma.device.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Devices and only return the `id`
     * const deviceWithIdOnly = await prisma.device.updateManyAndReturn({
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
    updateManyAndReturn<T extends DeviceUpdateManyAndReturnArgs>(args: SelectSubset<T, DeviceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Device.
     * @param {DeviceUpsertArgs} args - Arguments to update or create a Device.
     * @example
     * // Update or create a Device
     * const device = await prisma.device.upsert({
     *   create: {
     *     // ... data to create a Device
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Device we want to update
     *   }
     * })
     */
    upsert<T extends DeviceUpsertArgs>(args: SelectSubset<T, DeviceUpsertArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Devices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceCountArgs} args - Arguments to filter Devices to count.
     * @example
     * // Count the number of Devices
     * const count = await prisma.device.count({
     *   where: {
     *     // ... the filter for the Devices we want to count
     *   }
     * })
    **/
    count<T extends DeviceCountArgs>(
      args?: Subset<T, DeviceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeviceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Device.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DeviceAggregateArgs>(args: Subset<T, DeviceAggregateArgs>): Prisma.PrismaPromise<GetDeviceAggregateType<T>>

    /**
     * Group by Device.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceGroupByArgs} args - Group by arguments.
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
      T extends DeviceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeviceGroupByArgs['orderBy'] }
        : { orderBy?: DeviceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DeviceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeviceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Device model
   */
  readonly fields: DeviceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Device.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeviceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    room<T extends Device$roomArgs<ExtArgs> = {}>(args?: Subset<T, Device$roomArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    readings<T extends Device$readingsArgs<ExtArgs> = {}>(args?: Subset<T, Device$readingsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeviceReadingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Device model
   */
  interface DeviceFieldRefs {
    readonly id: FieldRef<"Device", 'String'>
    readonly name: FieldRef<"Device", 'String'>
    readonly description: FieldRef<"Device", 'String'>
    readonly firmware: FieldRef<"Device", 'String'>
    readonly isPaired: FieldRef<"Device", 'Boolean'>
    readonly roomId: FieldRef<"Device", 'String'>
    readonly createdAt: FieldRef<"Device", 'DateTime'>
    readonly updatedAt: FieldRef<"Device", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Device findUnique
   */
  export type DeviceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Device to fetch.
     */
    where: DeviceWhereUniqueInput
  }

  /**
   * Device findUniqueOrThrow
   */
  export type DeviceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Device to fetch.
     */
    where: DeviceWhereUniqueInput
  }

  /**
   * Device findFirst
   */
  export type DeviceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Device to fetch.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Devices.
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Devices.
     */
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[]
  }

  /**
   * Device findFirstOrThrow
   */
  export type DeviceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Device to fetch.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Devices.
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Devices.
     */
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[]
  }

  /**
   * Device findMany
   */
  export type DeviceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter, which Devices to fetch.
     */
    where?: DeviceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Devices to fetch.
     */
    orderBy?: DeviceOrderByWithRelationInput | DeviceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Devices.
     */
    cursor?: DeviceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Devices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Devices.
     */
    skip?: number
    distinct?: DeviceScalarFieldEnum | DeviceScalarFieldEnum[]
  }

  /**
   * Device create
   */
  export type DeviceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * The data needed to create a Device.
     */
    data: XOR<DeviceCreateInput, DeviceUncheckedCreateInput>
  }

  /**
   * Device createMany
   */
  export type DeviceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Devices.
     */
    data: DeviceCreateManyInput | DeviceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Device createManyAndReturn
   */
  export type DeviceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * The data used to create many Devices.
     */
    data: DeviceCreateManyInput | DeviceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Device update
   */
  export type DeviceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * The data needed to update a Device.
     */
    data: XOR<DeviceUpdateInput, DeviceUncheckedUpdateInput>
    /**
     * Choose, which Device to update.
     */
    where: DeviceWhereUniqueInput
  }

  /**
   * Device updateMany
   */
  export type DeviceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Devices.
     */
    data: XOR<DeviceUpdateManyMutationInput, DeviceUncheckedUpdateManyInput>
    /**
     * Filter which Devices to update
     */
    where?: DeviceWhereInput
    /**
     * Limit how many Devices to update.
     */
    limit?: number
  }

  /**
   * Device updateManyAndReturn
   */
  export type DeviceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * The data used to update Devices.
     */
    data: XOR<DeviceUpdateManyMutationInput, DeviceUncheckedUpdateManyInput>
    /**
     * Filter which Devices to update
     */
    where?: DeviceWhereInput
    /**
     * Limit how many Devices to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Device upsert
   */
  export type DeviceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * The filter to search for the Device to update in case it exists.
     */
    where: DeviceWhereUniqueInput
    /**
     * In case the Device found by the `where` argument doesn't exist, create a new Device with this data.
     */
    create: XOR<DeviceCreateInput, DeviceUncheckedCreateInput>
    /**
     * In case the Device was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeviceUpdateInput, DeviceUncheckedUpdateInput>
  }

  /**
   * Device delete
   */
  export type DeviceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
    /**
     * Filter which Device to delete.
     */
    where: DeviceWhereUniqueInput
  }

  /**
   * Device deleteMany
   */
  export type DeviceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Devices to delete
     */
    where?: DeviceWhereInput
    /**
     * Limit how many Devices to delete.
     */
    limit?: number
  }

  /**
   * Device.room
   */
  export type Device$roomArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    where?: RoomWhereInput
  }

  /**
   * Device.readings
   */
  export type Device$readingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceReading
     */
    select?: DeviceReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceReading
     */
    omit?: DeviceReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceReadingInclude<ExtArgs> | null
    where?: DeviceReadingWhereInput
    orderBy?: DeviceReadingOrderByWithRelationInput | DeviceReadingOrderByWithRelationInput[]
    cursor?: DeviceReadingWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DeviceReadingScalarFieldEnum | DeviceReadingScalarFieldEnum[]
  }

  /**
   * Device without action
   */
  export type DeviceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Device
     */
    select?: DeviceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Device
     */
    omit?: DeviceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceInclude<ExtArgs> | null
  }


  /**
   * Model DeviceReading
   */

  export type AggregateDeviceReading = {
    _count: DeviceReadingCountAggregateOutputType | null
    _avg: DeviceReadingAvgAggregateOutputType | null
    _sum: DeviceReadingSumAggregateOutputType | null
    _min: DeviceReadingMinAggregateOutputType | null
    _max: DeviceReadingMaxAggregateOutputType | null
  }

  export type DeviceReadingAvgAggregateOutputType = {
    temperature: number | null
    humidity: number | null
  }

  export type DeviceReadingSumAggregateOutputType = {
    temperature: number | null
    humidity: number | null
  }

  export type DeviceReadingMinAggregateOutputType = {
    id: string | null
    deviceId: string | null
    temperature: number | null
    humidity: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DeviceReadingMaxAggregateOutputType = {
    id: string | null
    deviceId: string | null
    temperature: number | null
    humidity: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DeviceReadingCountAggregateOutputType = {
    id: number
    deviceId: number
    temperature: number
    humidity: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DeviceReadingAvgAggregateInputType = {
    temperature?: true
    humidity?: true
  }

  export type DeviceReadingSumAggregateInputType = {
    temperature?: true
    humidity?: true
  }

  export type DeviceReadingMinAggregateInputType = {
    id?: true
    deviceId?: true
    temperature?: true
    humidity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DeviceReadingMaxAggregateInputType = {
    id?: true
    deviceId?: true
    temperature?: true
    humidity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DeviceReadingCountAggregateInputType = {
    id?: true
    deviceId?: true
    temperature?: true
    humidity?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DeviceReadingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeviceReading to aggregate.
     */
    where?: DeviceReadingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceReadings to fetch.
     */
    orderBy?: DeviceReadingOrderByWithRelationInput | DeviceReadingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DeviceReadingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceReadings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceReadings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DeviceReadings
    **/
    _count?: true | DeviceReadingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DeviceReadingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DeviceReadingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DeviceReadingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DeviceReadingMaxAggregateInputType
  }

  export type GetDeviceReadingAggregateType<T extends DeviceReadingAggregateArgs> = {
        [P in keyof T & keyof AggregateDeviceReading]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDeviceReading[P]>
      : GetScalarType<T[P], AggregateDeviceReading[P]>
  }




  export type DeviceReadingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DeviceReadingWhereInput
    orderBy?: DeviceReadingOrderByWithAggregationInput | DeviceReadingOrderByWithAggregationInput[]
    by: DeviceReadingScalarFieldEnum[] | DeviceReadingScalarFieldEnum
    having?: DeviceReadingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DeviceReadingCountAggregateInputType | true
    _avg?: DeviceReadingAvgAggregateInputType
    _sum?: DeviceReadingSumAggregateInputType
    _min?: DeviceReadingMinAggregateInputType
    _max?: DeviceReadingMaxAggregateInputType
  }

  export type DeviceReadingGroupByOutputType = {
    id: string
    deviceId: string
    temperature: number
    humidity: number
    createdAt: Date
    updatedAt: Date
    _count: DeviceReadingCountAggregateOutputType | null
    _avg: DeviceReadingAvgAggregateOutputType | null
    _sum: DeviceReadingSumAggregateOutputType | null
    _min: DeviceReadingMinAggregateOutputType | null
    _max: DeviceReadingMaxAggregateOutputType | null
  }

  type GetDeviceReadingGroupByPayload<T extends DeviceReadingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DeviceReadingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DeviceReadingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DeviceReadingGroupByOutputType[P]>
            : GetScalarType<T[P], DeviceReadingGroupByOutputType[P]>
        }
      >
    >


  export type DeviceReadingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deviceId?: boolean
    temperature?: boolean
    humidity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    device?: boolean | DeviceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deviceReading"]>

  export type DeviceReadingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deviceId?: boolean
    temperature?: boolean
    humidity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    device?: boolean | DeviceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deviceReading"]>

  export type DeviceReadingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deviceId?: boolean
    temperature?: boolean
    humidity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    device?: boolean | DeviceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["deviceReading"]>

  export type DeviceReadingSelectScalar = {
    id?: boolean
    deviceId?: boolean
    temperature?: boolean
    humidity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DeviceReadingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "deviceId" | "temperature" | "humidity" | "createdAt" | "updatedAt", ExtArgs["result"]["deviceReading"]>
  export type DeviceReadingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    device?: boolean | DeviceDefaultArgs<ExtArgs>
  }
  export type DeviceReadingIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    device?: boolean | DeviceDefaultArgs<ExtArgs>
  }
  export type DeviceReadingIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    device?: boolean | DeviceDefaultArgs<ExtArgs>
  }

  export type $DeviceReadingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DeviceReading"
    objects: {
      device: Prisma.$DevicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      deviceId: string
      temperature: number
      humidity: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["deviceReading"]>
    composites: {}
  }

  type DeviceReadingGetPayload<S extends boolean | null | undefined | DeviceReadingDefaultArgs> = $Result.GetResult<Prisma.$DeviceReadingPayload, S>

  type DeviceReadingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DeviceReadingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DeviceReadingCountAggregateInputType | true
    }

  export interface DeviceReadingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DeviceReading'], meta: { name: 'DeviceReading' } }
    /**
     * Find zero or one DeviceReading that matches the filter.
     * @param {DeviceReadingFindUniqueArgs} args - Arguments to find a DeviceReading
     * @example
     * // Get one DeviceReading
     * const deviceReading = await prisma.deviceReading.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DeviceReadingFindUniqueArgs>(args: SelectSubset<T, DeviceReadingFindUniqueArgs<ExtArgs>>): Prisma__DeviceReadingClient<$Result.GetResult<Prisma.$DeviceReadingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DeviceReading that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DeviceReadingFindUniqueOrThrowArgs} args - Arguments to find a DeviceReading
     * @example
     * // Get one DeviceReading
     * const deviceReading = await prisma.deviceReading.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DeviceReadingFindUniqueOrThrowArgs>(args: SelectSubset<T, DeviceReadingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DeviceReadingClient<$Result.GetResult<Prisma.$DeviceReadingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DeviceReading that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceReadingFindFirstArgs} args - Arguments to find a DeviceReading
     * @example
     * // Get one DeviceReading
     * const deviceReading = await prisma.deviceReading.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DeviceReadingFindFirstArgs>(args?: SelectSubset<T, DeviceReadingFindFirstArgs<ExtArgs>>): Prisma__DeviceReadingClient<$Result.GetResult<Prisma.$DeviceReadingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DeviceReading that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceReadingFindFirstOrThrowArgs} args - Arguments to find a DeviceReading
     * @example
     * // Get one DeviceReading
     * const deviceReading = await prisma.deviceReading.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DeviceReadingFindFirstOrThrowArgs>(args?: SelectSubset<T, DeviceReadingFindFirstOrThrowArgs<ExtArgs>>): Prisma__DeviceReadingClient<$Result.GetResult<Prisma.$DeviceReadingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DeviceReadings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceReadingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DeviceReadings
     * const deviceReadings = await prisma.deviceReading.findMany()
     * 
     * // Get first 10 DeviceReadings
     * const deviceReadings = await prisma.deviceReading.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const deviceReadingWithIdOnly = await prisma.deviceReading.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DeviceReadingFindManyArgs>(args?: SelectSubset<T, DeviceReadingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeviceReadingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DeviceReading.
     * @param {DeviceReadingCreateArgs} args - Arguments to create a DeviceReading.
     * @example
     * // Create one DeviceReading
     * const DeviceReading = await prisma.deviceReading.create({
     *   data: {
     *     // ... data to create a DeviceReading
     *   }
     * })
     * 
     */
    create<T extends DeviceReadingCreateArgs>(args: SelectSubset<T, DeviceReadingCreateArgs<ExtArgs>>): Prisma__DeviceReadingClient<$Result.GetResult<Prisma.$DeviceReadingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DeviceReadings.
     * @param {DeviceReadingCreateManyArgs} args - Arguments to create many DeviceReadings.
     * @example
     * // Create many DeviceReadings
     * const deviceReading = await prisma.deviceReading.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DeviceReadingCreateManyArgs>(args?: SelectSubset<T, DeviceReadingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DeviceReadings and returns the data saved in the database.
     * @param {DeviceReadingCreateManyAndReturnArgs} args - Arguments to create many DeviceReadings.
     * @example
     * // Create many DeviceReadings
     * const deviceReading = await prisma.deviceReading.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DeviceReadings and only return the `id`
     * const deviceReadingWithIdOnly = await prisma.deviceReading.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DeviceReadingCreateManyAndReturnArgs>(args?: SelectSubset<T, DeviceReadingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeviceReadingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DeviceReading.
     * @param {DeviceReadingDeleteArgs} args - Arguments to delete one DeviceReading.
     * @example
     * // Delete one DeviceReading
     * const DeviceReading = await prisma.deviceReading.delete({
     *   where: {
     *     // ... filter to delete one DeviceReading
     *   }
     * })
     * 
     */
    delete<T extends DeviceReadingDeleteArgs>(args: SelectSubset<T, DeviceReadingDeleteArgs<ExtArgs>>): Prisma__DeviceReadingClient<$Result.GetResult<Prisma.$DeviceReadingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DeviceReading.
     * @param {DeviceReadingUpdateArgs} args - Arguments to update one DeviceReading.
     * @example
     * // Update one DeviceReading
     * const deviceReading = await prisma.deviceReading.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DeviceReadingUpdateArgs>(args: SelectSubset<T, DeviceReadingUpdateArgs<ExtArgs>>): Prisma__DeviceReadingClient<$Result.GetResult<Prisma.$DeviceReadingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DeviceReadings.
     * @param {DeviceReadingDeleteManyArgs} args - Arguments to filter DeviceReadings to delete.
     * @example
     * // Delete a few DeviceReadings
     * const { count } = await prisma.deviceReading.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DeviceReadingDeleteManyArgs>(args?: SelectSubset<T, DeviceReadingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeviceReadings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceReadingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DeviceReadings
     * const deviceReading = await prisma.deviceReading.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DeviceReadingUpdateManyArgs>(args: SelectSubset<T, DeviceReadingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DeviceReadings and returns the data updated in the database.
     * @param {DeviceReadingUpdateManyAndReturnArgs} args - Arguments to update many DeviceReadings.
     * @example
     * // Update many DeviceReadings
     * const deviceReading = await prisma.deviceReading.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DeviceReadings and only return the `id`
     * const deviceReadingWithIdOnly = await prisma.deviceReading.updateManyAndReturn({
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
    updateManyAndReturn<T extends DeviceReadingUpdateManyAndReturnArgs>(args: SelectSubset<T, DeviceReadingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DeviceReadingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DeviceReading.
     * @param {DeviceReadingUpsertArgs} args - Arguments to update or create a DeviceReading.
     * @example
     * // Update or create a DeviceReading
     * const deviceReading = await prisma.deviceReading.upsert({
     *   create: {
     *     // ... data to create a DeviceReading
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DeviceReading we want to update
     *   }
     * })
     */
    upsert<T extends DeviceReadingUpsertArgs>(args: SelectSubset<T, DeviceReadingUpsertArgs<ExtArgs>>): Prisma__DeviceReadingClient<$Result.GetResult<Prisma.$DeviceReadingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DeviceReadings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceReadingCountArgs} args - Arguments to filter DeviceReadings to count.
     * @example
     * // Count the number of DeviceReadings
     * const count = await prisma.deviceReading.count({
     *   where: {
     *     // ... the filter for the DeviceReadings we want to count
     *   }
     * })
    **/
    count<T extends DeviceReadingCountArgs>(
      args?: Subset<T, DeviceReadingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DeviceReadingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DeviceReading.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceReadingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DeviceReadingAggregateArgs>(args: Subset<T, DeviceReadingAggregateArgs>): Prisma.PrismaPromise<GetDeviceReadingAggregateType<T>>

    /**
     * Group by DeviceReading.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DeviceReadingGroupByArgs} args - Group by arguments.
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
      T extends DeviceReadingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DeviceReadingGroupByArgs['orderBy'] }
        : { orderBy?: DeviceReadingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DeviceReadingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDeviceReadingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DeviceReading model
   */
  readonly fields: DeviceReadingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DeviceReading.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DeviceReadingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    device<T extends DeviceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DeviceDefaultArgs<ExtArgs>>): Prisma__DeviceClient<$Result.GetResult<Prisma.$DevicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the DeviceReading model
   */
  interface DeviceReadingFieldRefs {
    readonly id: FieldRef<"DeviceReading", 'String'>
    readonly deviceId: FieldRef<"DeviceReading", 'String'>
    readonly temperature: FieldRef<"DeviceReading", 'Float'>
    readonly humidity: FieldRef<"DeviceReading", 'Float'>
    readonly createdAt: FieldRef<"DeviceReading", 'DateTime'>
    readonly updatedAt: FieldRef<"DeviceReading", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DeviceReading findUnique
   */
  export type DeviceReadingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceReading
     */
    select?: DeviceReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceReading
     */
    omit?: DeviceReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceReadingInclude<ExtArgs> | null
    /**
     * Filter, which DeviceReading to fetch.
     */
    where: DeviceReadingWhereUniqueInput
  }

  /**
   * DeviceReading findUniqueOrThrow
   */
  export type DeviceReadingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceReading
     */
    select?: DeviceReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceReading
     */
    omit?: DeviceReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceReadingInclude<ExtArgs> | null
    /**
     * Filter, which DeviceReading to fetch.
     */
    where: DeviceReadingWhereUniqueInput
  }

  /**
   * DeviceReading findFirst
   */
  export type DeviceReadingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceReading
     */
    select?: DeviceReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceReading
     */
    omit?: DeviceReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceReadingInclude<ExtArgs> | null
    /**
     * Filter, which DeviceReading to fetch.
     */
    where?: DeviceReadingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceReadings to fetch.
     */
    orderBy?: DeviceReadingOrderByWithRelationInput | DeviceReadingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeviceReadings.
     */
    cursor?: DeviceReadingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceReadings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceReadings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeviceReadings.
     */
    distinct?: DeviceReadingScalarFieldEnum | DeviceReadingScalarFieldEnum[]
  }

  /**
   * DeviceReading findFirstOrThrow
   */
  export type DeviceReadingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceReading
     */
    select?: DeviceReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceReading
     */
    omit?: DeviceReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceReadingInclude<ExtArgs> | null
    /**
     * Filter, which DeviceReading to fetch.
     */
    where?: DeviceReadingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceReadings to fetch.
     */
    orderBy?: DeviceReadingOrderByWithRelationInput | DeviceReadingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DeviceReadings.
     */
    cursor?: DeviceReadingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceReadings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceReadings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DeviceReadings.
     */
    distinct?: DeviceReadingScalarFieldEnum | DeviceReadingScalarFieldEnum[]
  }

  /**
   * DeviceReading findMany
   */
  export type DeviceReadingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceReading
     */
    select?: DeviceReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceReading
     */
    omit?: DeviceReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceReadingInclude<ExtArgs> | null
    /**
     * Filter, which DeviceReadings to fetch.
     */
    where?: DeviceReadingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DeviceReadings to fetch.
     */
    orderBy?: DeviceReadingOrderByWithRelationInput | DeviceReadingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DeviceReadings.
     */
    cursor?: DeviceReadingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DeviceReadings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DeviceReadings.
     */
    skip?: number
    distinct?: DeviceReadingScalarFieldEnum | DeviceReadingScalarFieldEnum[]
  }

  /**
   * DeviceReading create
   */
  export type DeviceReadingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceReading
     */
    select?: DeviceReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceReading
     */
    omit?: DeviceReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceReadingInclude<ExtArgs> | null
    /**
     * The data needed to create a DeviceReading.
     */
    data: XOR<DeviceReadingCreateInput, DeviceReadingUncheckedCreateInput>
  }

  /**
   * DeviceReading createMany
   */
  export type DeviceReadingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DeviceReadings.
     */
    data: DeviceReadingCreateManyInput | DeviceReadingCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DeviceReading createManyAndReturn
   */
  export type DeviceReadingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceReading
     */
    select?: DeviceReadingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceReading
     */
    omit?: DeviceReadingOmit<ExtArgs> | null
    /**
     * The data used to create many DeviceReadings.
     */
    data: DeviceReadingCreateManyInput | DeviceReadingCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceReadingIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DeviceReading update
   */
  export type DeviceReadingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceReading
     */
    select?: DeviceReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceReading
     */
    omit?: DeviceReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceReadingInclude<ExtArgs> | null
    /**
     * The data needed to update a DeviceReading.
     */
    data: XOR<DeviceReadingUpdateInput, DeviceReadingUncheckedUpdateInput>
    /**
     * Choose, which DeviceReading to update.
     */
    where: DeviceReadingWhereUniqueInput
  }

  /**
   * DeviceReading updateMany
   */
  export type DeviceReadingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DeviceReadings.
     */
    data: XOR<DeviceReadingUpdateManyMutationInput, DeviceReadingUncheckedUpdateManyInput>
    /**
     * Filter which DeviceReadings to update
     */
    where?: DeviceReadingWhereInput
    /**
     * Limit how many DeviceReadings to update.
     */
    limit?: number
  }

  /**
   * DeviceReading updateManyAndReturn
   */
  export type DeviceReadingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceReading
     */
    select?: DeviceReadingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceReading
     */
    omit?: DeviceReadingOmit<ExtArgs> | null
    /**
     * The data used to update DeviceReadings.
     */
    data: XOR<DeviceReadingUpdateManyMutationInput, DeviceReadingUncheckedUpdateManyInput>
    /**
     * Filter which DeviceReadings to update
     */
    where?: DeviceReadingWhereInput
    /**
     * Limit how many DeviceReadings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceReadingIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DeviceReading upsert
   */
  export type DeviceReadingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceReading
     */
    select?: DeviceReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceReading
     */
    omit?: DeviceReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceReadingInclude<ExtArgs> | null
    /**
     * The filter to search for the DeviceReading to update in case it exists.
     */
    where: DeviceReadingWhereUniqueInput
    /**
     * In case the DeviceReading found by the `where` argument doesn't exist, create a new DeviceReading with this data.
     */
    create: XOR<DeviceReadingCreateInput, DeviceReadingUncheckedCreateInput>
    /**
     * In case the DeviceReading was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DeviceReadingUpdateInput, DeviceReadingUncheckedUpdateInput>
  }

  /**
   * DeviceReading delete
   */
  export type DeviceReadingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceReading
     */
    select?: DeviceReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceReading
     */
    omit?: DeviceReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceReadingInclude<ExtArgs> | null
    /**
     * Filter which DeviceReading to delete.
     */
    where: DeviceReadingWhereUniqueInput
  }

  /**
   * DeviceReading deleteMany
   */
  export type DeviceReadingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DeviceReadings to delete
     */
    where?: DeviceReadingWhereInput
    /**
     * Limit how many DeviceReadings to delete.
     */
    limit?: number
  }

  /**
   * DeviceReading without action
   */
  export type DeviceReadingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeviceReading
     */
    select?: DeviceReadingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DeviceReading
     */
    omit?: DeviceReadingOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DeviceReadingInclude<ExtArgs> | null
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


  export const BuildingScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    logoUrl: 'logoUrl',
    address: 'address',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BuildingScalarFieldEnum = (typeof BuildingScalarFieldEnum)[keyof typeof BuildingScalarFieldEnum]


  export const BuildingInvitationScalarFieldEnum: {
    id: 'id',
    buildingId: 'buildingId',
    inviteCode: 'inviteCode',
    createdByUserId: 'createdByUserId',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BuildingInvitationScalarFieldEnum = (typeof BuildingInvitationScalarFieldEnum)[keyof typeof BuildingInvitationScalarFieldEnum]


  export const BuildingMemberScalarFieldEnum: {
    id: 'id',
    buildingId: 'buildingId',
    userId: 'userId',
    invitedByUserId: 'invitedByUserId',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BuildingMemberScalarFieldEnum = (typeof BuildingMemberScalarFieldEnum)[keyof typeof BuildingMemberScalarFieldEnum]


  export const BuildingSettingsScalarFieldEnum: {
    id: 'id',
    buildingId: 'buildingId',
    temperatureUnit: 'temperatureUnit',
    humidityUnit: 'humidityUnit',
    temperatureThreshold: 'temperatureThreshold',
    humidityThreshold: 'humidityThreshold',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BuildingSettingsScalarFieldEnum = (typeof BuildingSettingsScalarFieldEnum)[keyof typeof BuildingSettingsScalarFieldEnum]


  export const RoomScalarFieldEnum: {
    id: 'id',
    buildingId: 'buildingId',
    name: 'name',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoomScalarFieldEnum = (typeof RoomScalarFieldEnum)[keyof typeof RoomScalarFieldEnum]


  export const RoomSurveyScalarFieldEnum: {
    id: 'id',
    roomId: 'roomId',
    title: 'title',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoomSurveyScalarFieldEnum = (typeof RoomSurveyScalarFieldEnum)[keyof typeof RoomSurveyScalarFieldEnum]


  export const RoomSurveyResponseScalarFieldEnum: {
    id: 'id',
    surveyId: 'surveyId',
    rating: 'rating',
    comment: 'comment',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoomSurveyResponseScalarFieldEnum = (typeof RoomSurveyResponseScalarFieldEnum)[keyof typeof RoomSurveyResponseScalarFieldEnum]


  export const DeviceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    firmware: 'firmware',
    isPaired: 'isPaired',
    roomId: 'roomId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DeviceScalarFieldEnum = (typeof DeviceScalarFieldEnum)[keyof typeof DeviceScalarFieldEnum]


  export const DeviceReadingScalarFieldEnum: {
    id: 'id',
    deviceId: 'deviceId',
    temperature: 'temperature',
    humidity: 'humidity',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DeviceReadingScalarFieldEnum = (typeof DeviceReadingScalarFieldEnum)[keyof typeof DeviceReadingScalarFieldEnum]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'BuildingInvitationStatus'
   */
  export type EnumBuildingInvitationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BuildingInvitationStatus'>
    


  /**
   * Reference to a field of type 'BuildingInvitationStatus[]'
   */
  export type ListEnumBuildingInvitationStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BuildingInvitationStatus[]'>
    


  /**
   * Reference to a field of type 'BuildingMemberRole'
   */
  export type EnumBuildingMemberRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BuildingMemberRole'>
    


  /**
   * Reference to a field of type 'BuildingMemberRole[]'
   */
  export type ListEnumBuildingMemberRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BuildingMemberRole[]'>
    


  /**
   * Reference to a field of type 'TemperatureUnit'
   */
  export type EnumTemperatureUnitFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TemperatureUnit'>
    


  /**
   * Reference to a field of type 'TemperatureUnit[]'
   */
  export type ListEnumTemperatureUnitFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TemperatureUnit[]'>
    


  /**
   * Reference to a field of type 'HumidityUnit'
   */
  export type EnumHumidityUnitFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HumidityUnit'>
    


  /**
   * Reference to a field of type 'HumidityUnit[]'
   */
  export type ListEnumHumidityUnitFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'HumidityUnit[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type BuildingWhereInput = {
    AND?: BuildingWhereInput | BuildingWhereInput[]
    OR?: BuildingWhereInput[]
    NOT?: BuildingWhereInput | BuildingWhereInput[]
    id?: StringFilter<"Building"> | string
    name?: StringFilter<"Building"> | string
    description?: StringNullableFilter<"Building"> | string | null
    logoUrl?: StringNullableFilter<"Building"> | string | null
    address?: StringNullableFilter<"Building"> | string | null
    createdAt?: DateTimeFilter<"Building"> | Date | string
    updatedAt?: DateTimeFilter<"Building"> | Date | string
  }

  export type BuildingOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BuildingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BuildingWhereInput | BuildingWhereInput[]
    OR?: BuildingWhereInput[]
    NOT?: BuildingWhereInput | BuildingWhereInput[]
    name?: StringFilter<"Building"> | string
    description?: StringNullableFilter<"Building"> | string | null
    logoUrl?: StringNullableFilter<"Building"> | string | null
    address?: StringNullableFilter<"Building"> | string | null
    createdAt?: DateTimeFilter<"Building"> | Date | string
    updatedAt?: DateTimeFilter<"Building"> | Date | string
  }, "id">

  export type BuildingOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    logoUrl?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BuildingCountOrderByAggregateInput
    _max?: BuildingMaxOrderByAggregateInput
    _min?: BuildingMinOrderByAggregateInput
  }

  export type BuildingScalarWhereWithAggregatesInput = {
    AND?: BuildingScalarWhereWithAggregatesInput | BuildingScalarWhereWithAggregatesInput[]
    OR?: BuildingScalarWhereWithAggregatesInput[]
    NOT?: BuildingScalarWhereWithAggregatesInput | BuildingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Building"> | string
    name?: StringWithAggregatesFilter<"Building"> | string
    description?: StringNullableWithAggregatesFilter<"Building"> | string | null
    logoUrl?: StringNullableWithAggregatesFilter<"Building"> | string | null
    address?: StringNullableWithAggregatesFilter<"Building"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Building"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Building"> | Date | string
  }

  export type BuildingInvitationWhereInput = {
    AND?: BuildingInvitationWhereInput | BuildingInvitationWhereInput[]
    OR?: BuildingInvitationWhereInput[]
    NOT?: BuildingInvitationWhereInput | BuildingInvitationWhereInput[]
    id?: StringFilter<"BuildingInvitation"> | string
    buildingId?: StringFilter<"BuildingInvitation"> | string
    inviteCode?: StringFilter<"BuildingInvitation"> | string
    createdByUserId?: IntFilter<"BuildingInvitation"> | number
    status?: EnumBuildingInvitationStatusFilter<"BuildingInvitation"> | $Enums.BuildingInvitationStatus
    createdAt?: DateTimeFilter<"BuildingInvitation"> | Date | string
    updatedAt?: DateTimeFilter<"BuildingInvitation"> | Date | string
  }

  export type BuildingInvitationOrderByWithRelationInput = {
    id?: SortOrder
    buildingId?: SortOrder
    inviteCode?: SortOrder
    createdByUserId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BuildingInvitationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BuildingInvitationWhereInput | BuildingInvitationWhereInput[]
    OR?: BuildingInvitationWhereInput[]
    NOT?: BuildingInvitationWhereInput | BuildingInvitationWhereInput[]
    buildingId?: StringFilter<"BuildingInvitation"> | string
    inviteCode?: StringFilter<"BuildingInvitation"> | string
    createdByUserId?: IntFilter<"BuildingInvitation"> | number
    status?: EnumBuildingInvitationStatusFilter<"BuildingInvitation"> | $Enums.BuildingInvitationStatus
    createdAt?: DateTimeFilter<"BuildingInvitation"> | Date | string
    updatedAt?: DateTimeFilter<"BuildingInvitation"> | Date | string
  }, "id">

  export type BuildingInvitationOrderByWithAggregationInput = {
    id?: SortOrder
    buildingId?: SortOrder
    inviteCode?: SortOrder
    createdByUserId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BuildingInvitationCountOrderByAggregateInput
    _avg?: BuildingInvitationAvgOrderByAggregateInput
    _max?: BuildingInvitationMaxOrderByAggregateInput
    _min?: BuildingInvitationMinOrderByAggregateInput
    _sum?: BuildingInvitationSumOrderByAggregateInput
  }

  export type BuildingInvitationScalarWhereWithAggregatesInput = {
    AND?: BuildingInvitationScalarWhereWithAggregatesInput | BuildingInvitationScalarWhereWithAggregatesInput[]
    OR?: BuildingInvitationScalarWhereWithAggregatesInput[]
    NOT?: BuildingInvitationScalarWhereWithAggregatesInput | BuildingInvitationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BuildingInvitation"> | string
    buildingId?: StringWithAggregatesFilter<"BuildingInvitation"> | string
    inviteCode?: StringWithAggregatesFilter<"BuildingInvitation"> | string
    createdByUserId?: IntWithAggregatesFilter<"BuildingInvitation"> | number
    status?: EnumBuildingInvitationStatusWithAggregatesFilter<"BuildingInvitation"> | $Enums.BuildingInvitationStatus
    createdAt?: DateTimeWithAggregatesFilter<"BuildingInvitation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BuildingInvitation"> | Date | string
  }

  export type BuildingMemberWhereInput = {
    AND?: BuildingMemberWhereInput | BuildingMemberWhereInput[]
    OR?: BuildingMemberWhereInput[]
    NOT?: BuildingMemberWhereInput | BuildingMemberWhereInput[]
    id?: StringFilter<"BuildingMember"> | string
    buildingId?: StringFilter<"BuildingMember"> | string
    userId?: IntFilter<"BuildingMember"> | number
    invitedByUserId?: IntFilter<"BuildingMember"> | number
    role?: EnumBuildingMemberRoleFilter<"BuildingMember"> | $Enums.BuildingMemberRole
    createdAt?: DateTimeFilter<"BuildingMember"> | Date | string
    updatedAt?: DateTimeFilter<"BuildingMember"> | Date | string
  }

  export type BuildingMemberOrderByWithRelationInput = {
    id?: SortOrder
    buildingId?: SortOrder
    userId?: SortOrder
    invitedByUserId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BuildingMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BuildingMemberWhereInput | BuildingMemberWhereInput[]
    OR?: BuildingMemberWhereInput[]
    NOT?: BuildingMemberWhereInput | BuildingMemberWhereInput[]
    buildingId?: StringFilter<"BuildingMember"> | string
    userId?: IntFilter<"BuildingMember"> | number
    invitedByUserId?: IntFilter<"BuildingMember"> | number
    role?: EnumBuildingMemberRoleFilter<"BuildingMember"> | $Enums.BuildingMemberRole
    createdAt?: DateTimeFilter<"BuildingMember"> | Date | string
    updatedAt?: DateTimeFilter<"BuildingMember"> | Date | string
  }, "id">

  export type BuildingMemberOrderByWithAggregationInput = {
    id?: SortOrder
    buildingId?: SortOrder
    userId?: SortOrder
    invitedByUserId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BuildingMemberCountOrderByAggregateInput
    _avg?: BuildingMemberAvgOrderByAggregateInput
    _max?: BuildingMemberMaxOrderByAggregateInput
    _min?: BuildingMemberMinOrderByAggregateInput
    _sum?: BuildingMemberSumOrderByAggregateInput
  }

  export type BuildingMemberScalarWhereWithAggregatesInput = {
    AND?: BuildingMemberScalarWhereWithAggregatesInput | BuildingMemberScalarWhereWithAggregatesInput[]
    OR?: BuildingMemberScalarWhereWithAggregatesInput[]
    NOT?: BuildingMemberScalarWhereWithAggregatesInput | BuildingMemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BuildingMember"> | string
    buildingId?: StringWithAggregatesFilter<"BuildingMember"> | string
    userId?: IntWithAggregatesFilter<"BuildingMember"> | number
    invitedByUserId?: IntWithAggregatesFilter<"BuildingMember"> | number
    role?: EnumBuildingMemberRoleWithAggregatesFilter<"BuildingMember"> | $Enums.BuildingMemberRole
    createdAt?: DateTimeWithAggregatesFilter<"BuildingMember"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BuildingMember"> | Date | string
  }

  export type BuildingSettingsWhereInput = {
    AND?: BuildingSettingsWhereInput | BuildingSettingsWhereInput[]
    OR?: BuildingSettingsWhereInput[]
    NOT?: BuildingSettingsWhereInput | BuildingSettingsWhereInput[]
    id?: StringFilter<"BuildingSettings"> | string
    buildingId?: StringFilter<"BuildingSettings"> | string
    temperatureUnit?: EnumTemperatureUnitFilter<"BuildingSettings"> | $Enums.TemperatureUnit
    humidityUnit?: EnumHumidityUnitFilter<"BuildingSettings"> | $Enums.HumidityUnit
    temperatureThreshold?: FloatFilter<"BuildingSettings"> | number
    humidityThreshold?: FloatFilter<"BuildingSettings"> | number
    createdAt?: DateTimeFilter<"BuildingSettings"> | Date | string
    updatedAt?: DateTimeFilter<"BuildingSettings"> | Date | string
  }

  export type BuildingSettingsOrderByWithRelationInput = {
    id?: SortOrder
    buildingId?: SortOrder
    temperatureUnit?: SortOrder
    humidityUnit?: SortOrder
    temperatureThreshold?: SortOrder
    humidityThreshold?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BuildingSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BuildingSettingsWhereInput | BuildingSettingsWhereInput[]
    OR?: BuildingSettingsWhereInput[]
    NOT?: BuildingSettingsWhereInput | BuildingSettingsWhereInput[]
    buildingId?: StringFilter<"BuildingSettings"> | string
    temperatureUnit?: EnumTemperatureUnitFilter<"BuildingSettings"> | $Enums.TemperatureUnit
    humidityUnit?: EnumHumidityUnitFilter<"BuildingSettings"> | $Enums.HumidityUnit
    temperatureThreshold?: FloatFilter<"BuildingSettings"> | number
    humidityThreshold?: FloatFilter<"BuildingSettings"> | number
    createdAt?: DateTimeFilter<"BuildingSettings"> | Date | string
    updatedAt?: DateTimeFilter<"BuildingSettings"> | Date | string
  }, "id">

  export type BuildingSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    buildingId?: SortOrder
    temperatureUnit?: SortOrder
    humidityUnit?: SortOrder
    temperatureThreshold?: SortOrder
    humidityThreshold?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BuildingSettingsCountOrderByAggregateInput
    _avg?: BuildingSettingsAvgOrderByAggregateInput
    _max?: BuildingSettingsMaxOrderByAggregateInput
    _min?: BuildingSettingsMinOrderByAggregateInput
    _sum?: BuildingSettingsSumOrderByAggregateInput
  }

  export type BuildingSettingsScalarWhereWithAggregatesInput = {
    AND?: BuildingSettingsScalarWhereWithAggregatesInput | BuildingSettingsScalarWhereWithAggregatesInput[]
    OR?: BuildingSettingsScalarWhereWithAggregatesInput[]
    NOT?: BuildingSettingsScalarWhereWithAggregatesInput | BuildingSettingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BuildingSettings"> | string
    buildingId?: StringWithAggregatesFilter<"BuildingSettings"> | string
    temperatureUnit?: EnumTemperatureUnitWithAggregatesFilter<"BuildingSettings"> | $Enums.TemperatureUnit
    humidityUnit?: EnumHumidityUnitWithAggregatesFilter<"BuildingSettings"> | $Enums.HumidityUnit
    temperatureThreshold?: FloatWithAggregatesFilter<"BuildingSettings"> | number
    humidityThreshold?: FloatWithAggregatesFilter<"BuildingSettings"> | number
    createdAt?: DateTimeWithAggregatesFilter<"BuildingSettings"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BuildingSettings"> | Date | string
  }

  export type RoomWhereInput = {
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    id?: StringFilter<"Room"> | string
    buildingId?: StringFilter<"Room"> | string
    name?: StringFilter<"Room"> | string
    description?: StringNullableFilter<"Room"> | string | null
    createdAt?: DateTimeFilter<"Room"> | Date | string
    updatedAt?: DateTimeFilter<"Room"> | Date | string
    devices?: DeviceListRelationFilter
  }

  export type RoomOrderByWithRelationInput = {
    id?: SortOrder
    buildingId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    devices?: DeviceOrderByRelationAggregateInput
  }

  export type RoomWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    buildingId?: StringFilter<"Room"> | string
    name?: StringFilter<"Room"> | string
    description?: StringNullableFilter<"Room"> | string | null
    createdAt?: DateTimeFilter<"Room"> | Date | string
    updatedAt?: DateTimeFilter<"Room"> | Date | string
    devices?: DeviceListRelationFilter
  }, "id">

  export type RoomOrderByWithAggregationInput = {
    id?: SortOrder
    buildingId?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoomCountOrderByAggregateInput
    _max?: RoomMaxOrderByAggregateInput
    _min?: RoomMinOrderByAggregateInput
  }

  export type RoomScalarWhereWithAggregatesInput = {
    AND?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    OR?: RoomScalarWhereWithAggregatesInput[]
    NOT?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Room"> | string
    buildingId?: StringWithAggregatesFilter<"Room"> | string
    name?: StringWithAggregatesFilter<"Room"> | string
    description?: StringNullableWithAggregatesFilter<"Room"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Room"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Room"> | Date | string
  }

  export type RoomSurveyWhereInput = {
    AND?: RoomSurveyWhereInput | RoomSurveyWhereInput[]
    OR?: RoomSurveyWhereInput[]
    NOT?: RoomSurveyWhereInput | RoomSurveyWhereInput[]
    id?: StringFilter<"RoomSurvey"> | string
    roomId?: StringFilter<"RoomSurvey"> | string
    title?: StringFilter<"RoomSurvey"> | string
    description?: StringNullableFilter<"RoomSurvey"> | string | null
    createdAt?: DateTimeFilter<"RoomSurvey"> | Date | string
    updatedAt?: DateTimeFilter<"RoomSurvey"> | Date | string
  }

  export type RoomSurveyOrderByWithRelationInput = {
    id?: SortOrder
    roomId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomSurveyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RoomSurveyWhereInput | RoomSurveyWhereInput[]
    OR?: RoomSurveyWhereInput[]
    NOT?: RoomSurveyWhereInput | RoomSurveyWhereInput[]
    roomId?: StringFilter<"RoomSurvey"> | string
    title?: StringFilter<"RoomSurvey"> | string
    description?: StringNullableFilter<"RoomSurvey"> | string | null
    createdAt?: DateTimeFilter<"RoomSurvey"> | Date | string
    updatedAt?: DateTimeFilter<"RoomSurvey"> | Date | string
  }, "id">

  export type RoomSurveyOrderByWithAggregationInput = {
    id?: SortOrder
    roomId?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoomSurveyCountOrderByAggregateInput
    _max?: RoomSurveyMaxOrderByAggregateInput
    _min?: RoomSurveyMinOrderByAggregateInput
  }

  export type RoomSurveyScalarWhereWithAggregatesInput = {
    AND?: RoomSurveyScalarWhereWithAggregatesInput | RoomSurveyScalarWhereWithAggregatesInput[]
    OR?: RoomSurveyScalarWhereWithAggregatesInput[]
    NOT?: RoomSurveyScalarWhereWithAggregatesInput | RoomSurveyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RoomSurvey"> | string
    roomId?: StringWithAggregatesFilter<"RoomSurvey"> | string
    title?: StringWithAggregatesFilter<"RoomSurvey"> | string
    description?: StringNullableWithAggregatesFilter<"RoomSurvey"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RoomSurvey"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RoomSurvey"> | Date | string
  }

  export type RoomSurveyResponseWhereInput = {
    AND?: RoomSurveyResponseWhereInput | RoomSurveyResponseWhereInput[]
    OR?: RoomSurveyResponseWhereInput[]
    NOT?: RoomSurveyResponseWhereInput | RoomSurveyResponseWhereInput[]
    id?: StringFilter<"RoomSurveyResponse"> | string
    surveyId?: StringFilter<"RoomSurveyResponse"> | string
    rating?: IntFilter<"RoomSurveyResponse"> | number
    comment?: StringNullableFilter<"RoomSurveyResponse"> | string | null
    createdAt?: DateTimeFilter<"RoomSurveyResponse"> | Date | string
    updatedAt?: DateTimeFilter<"RoomSurveyResponse"> | Date | string
  }

  export type RoomSurveyResponseOrderByWithRelationInput = {
    id?: SortOrder
    surveyId?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomSurveyResponseWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RoomSurveyResponseWhereInput | RoomSurveyResponseWhereInput[]
    OR?: RoomSurveyResponseWhereInput[]
    NOT?: RoomSurveyResponseWhereInput | RoomSurveyResponseWhereInput[]
    surveyId?: StringFilter<"RoomSurveyResponse"> | string
    rating?: IntFilter<"RoomSurveyResponse"> | number
    comment?: StringNullableFilter<"RoomSurveyResponse"> | string | null
    createdAt?: DateTimeFilter<"RoomSurveyResponse"> | Date | string
    updatedAt?: DateTimeFilter<"RoomSurveyResponse"> | Date | string
  }, "id">

  export type RoomSurveyResponseOrderByWithAggregationInput = {
    id?: SortOrder
    surveyId?: SortOrder
    rating?: SortOrder
    comment?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoomSurveyResponseCountOrderByAggregateInput
    _avg?: RoomSurveyResponseAvgOrderByAggregateInput
    _max?: RoomSurveyResponseMaxOrderByAggregateInput
    _min?: RoomSurveyResponseMinOrderByAggregateInput
    _sum?: RoomSurveyResponseSumOrderByAggregateInput
  }

  export type RoomSurveyResponseScalarWhereWithAggregatesInput = {
    AND?: RoomSurveyResponseScalarWhereWithAggregatesInput | RoomSurveyResponseScalarWhereWithAggregatesInput[]
    OR?: RoomSurveyResponseScalarWhereWithAggregatesInput[]
    NOT?: RoomSurveyResponseScalarWhereWithAggregatesInput | RoomSurveyResponseScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RoomSurveyResponse"> | string
    surveyId?: StringWithAggregatesFilter<"RoomSurveyResponse"> | string
    rating?: IntWithAggregatesFilter<"RoomSurveyResponse"> | number
    comment?: StringNullableWithAggregatesFilter<"RoomSurveyResponse"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RoomSurveyResponse"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RoomSurveyResponse"> | Date | string
  }

  export type DeviceWhereInput = {
    AND?: DeviceWhereInput | DeviceWhereInput[]
    OR?: DeviceWhereInput[]
    NOT?: DeviceWhereInput | DeviceWhereInput[]
    id?: StringFilter<"Device"> | string
    name?: StringFilter<"Device"> | string
    description?: StringNullableFilter<"Device"> | string | null
    firmware?: StringNullableFilter<"Device"> | string | null
    isPaired?: BoolFilter<"Device"> | boolean
    roomId?: StringNullableFilter<"Device"> | string | null
    createdAt?: DateTimeFilter<"Device"> | Date | string
    updatedAt?: DateTimeFilter<"Device"> | Date | string
    room?: XOR<RoomNullableScalarRelationFilter, RoomWhereInput> | null
    readings?: DeviceReadingListRelationFilter
  }

  export type DeviceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    firmware?: SortOrderInput | SortOrder
    isPaired?: SortOrder
    roomId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    room?: RoomOrderByWithRelationInput
    readings?: DeviceReadingOrderByRelationAggregateInput
  }

  export type DeviceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DeviceWhereInput | DeviceWhereInput[]
    OR?: DeviceWhereInput[]
    NOT?: DeviceWhereInput | DeviceWhereInput[]
    name?: StringFilter<"Device"> | string
    description?: StringNullableFilter<"Device"> | string | null
    firmware?: StringNullableFilter<"Device"> | string | null
    isPaired?: BoolFilter<"Device"> | boolean
    roomId?: StringNullableFilter<"Device"> | string | null
    createdAt?: DateTimeFilter<"Device"> | Date | string
    updatedAt?: DateTimeFilter<"Device"> | Date | string
    room?: XOR<RoomNullableScalarRelationFilter, RoomWhereInput> | null
    readings?: DeviceReadingListRelationFilter
  }, "id">

  export type DeviceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    firmware?: SortOrderInput | SortOrder
    isPaired?: SortOrder
    roomId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DeviceCountOrderByAggregateInput
    _max?: DeviceMaxOrderByAggregateInput
    _min?: DeviceMinOrderByAggregateInput
  }

  export type DeviceScalarWhereWithAggregatesInput = {
    AND?: DeviceScalarWhereWithAggregatesInput | DeviceScalarWhereWithAggregatesInput[]
    OR?: DeviceScalarWhereWithAggregatesInput[]
    NOT?: DeviceScalarWhereWithAggregatesInput | DeviceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Device"> | string
    name?: StringWithAggregatesFilter<"Device"> | string
    description?: StringNullableWithAggregatesFilter<"Device"> | string | null
    firmware?: StringNullableWithAggregatesFilter<"Device"> | string | null
    isPaired?: BoolWithAggregatesFilter<"Device"> | boolean
    roomId?: StringNullableWithAggregatesFilter<"Device"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Device"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Device"> | Date | string
  }

  export type DeviceReadingWhereInput = {
    AND?: DeviceReadingWhereInput | DeviceReadingWhereInput[]
    OR?: DeviceReadingWhereInput[]
    NOT?: DeviceReadingWhereInput | DeviceReadingWhereInput[]
    id?: StringFilter<"DeviceReading"> | string
    deviceId?: StringFilter<"DeviceReading"> | string
    temperature?: FloatFilter<"DeviceReading"> | number
    humidity?: FloatFilter<"DeviceReading"> | number
    createdAt?: DateTimeFilter<"DeviceReading"> | Date | string
    updatedAt?: DateTimeFilter<"DeviceReading"> | Date | string
    device?: XOR<DeviceScalarRelationFilter, DeviceWhereInput>
  }

  export type DeviceReadingOrderByWithRelationInput = {
    id?: SortOrder
    deviceId?: SortOrder
    temperature?: SortOrder
    humidity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    device?: DeviceOrderByWithRelationInput
  }

  export type DeviceReadingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DeviceReadingWhereInput | DeviceReadingWhereInput[]
    OR?: DeviceReadingWhereInput[]
    NOT?: DeviceReadingWhereInput | DeviceReadingWhereInput[]
    deviceId?: StringFilter<"DeviceReading"> | string
    temperature?: FloatFilter<"DeviceReading"> | number
    humidity?: FloatFilter<"DeviceReading"> | number
    createdAt?: DateTimeFilter<"DeviceReading"> | Date | string
    updatedAt?: DateTimeFilter<"DeviceReading"> | Date | string
    device?: XOR<DeviceScalarRelationFilter, DeviceWhereInput>
  }, "id">

  export type DeviceReadingOrderByWithAggregationInput = {
    id?: SortOrder
    deviceId?: SortOrder
    temperature?: SortOrder
    humidity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DeviceReadingCountOrderByAggregateInput
    _avg?: DeviceReadingAvgOrderByAggregateInput
    _max?: DeviceReadingMaxOrderByAggregateInput
    _min?: DeviceReadingMinOrderByAggregateInput
    _sum?: DeviceReadingSumOrderByAggregateInput
  }

  export type DeviceReadingScalarWhereWithAggregatesInput = {
    AND?: DeviceReadingScalarWhereWithAggregatesInput | DeviceReadingScalarWhereWithAggregatesInput[]
    OR?: DeviceReadingScalarWhereWithAggregatesInput[]
    NOT?: DeviceReadingScalarWhereWithAggregatesInput | DeviceReadingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DeviceReading"> | string
    deviceId?: StringWithAggregatesFilter<"DeviceReading"> | string
    temperature?: FloatWithAggregatesFilter<"DeviceReading"> | number
    humidity?: FloatWithAggregatesFilter<"DeviceReading"> | number
    createdAt?: DateTimeWithAggregatesFilter<"DeviceReading"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DeviceReading"> | Date | string
  }

  export type BuildingCreateInput = {
    id?: string
    name: string
    description?: string | null
    logoUrl?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BuildingUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    logoUrl?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BuildingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BuildingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BuildingCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    logoUrl?: string | null
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BuildingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BuildingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BuildingInvitationCreateInput = {
    id?: string
    buildingId: string
    inviteCode: string
    createdByUserId: number
    status: $Enums.BuildingInvitationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BuildingInvitationUncheckedCreateInput = {
    id?: string
    buildingId: string
    inviteCode: string
    createdByUserId: number
    status: $Enums.BuildingInvitationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BuildingInvitationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    buildingId?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdByUserId?: IntFieldUpdateOperationsInput | number
    status?: EnumBuildingInvitationStatusFieldUpdateOperationsInput | $Enums.BuildingInvitationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BuildingInvitationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    buildingId?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdByUserId?: IntFieldUpdateOperationsInput | number
    status?: EnumBuildingInvitationStatusFieldUpdateOperationsInput | $Enums.BuildingInvitationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BuildingInvitationCreateManyInput = {
    id?: string
    buildingId: string
    inviteCode: string
    createdByUserId: number
    status: $Enums.BuildingInvitationStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BuildingInvitationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    buildingId?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdByUserId?: IntFieldUpdateOperationsInput | number
    status?: EnumBuildingInvitationStatusFieldUpdateOperationsInput | $Enums.BuildingInvitationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BuildingInvitationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    buildingId?: StringFieldUpdateOperationsInput | string
    inviteCode?: StringFieldUpdateOperationsInput | string
    createdByUserId?: IntFieldUpdateOperationsInput | number
    status?: EnumBuildingInvitationStatusFieldUpdateOperationsInput | $Enums.BuildingInvitationStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BuildingMemberCreateInput = {
    id?: string
    buildingId: string
    userId: number
    invitedByUserId: number
    role: $Enums.BuildingMemberRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BuildingMemberUncheckedCreateInput = {
    id?: string
    buildingId: string
    userId: number
    invitedByUserId: number
    role: $Enums.BuildingMemberRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BuildingMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    buildingId?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    invitedByUserId?: IntFieldUpdateOperationsInput | number
    role?: EnumBuildingMemberRoleFieldUpdateOperationsInput | $Enums.BuildingMemberRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BuildingMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    buildingId?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    invitedByUserId?: IntFieldUpdateOperationsInput | number
    role?: EnumBuildingMemberRoleFieldUpdateOperationsInput | $Enums.BuildingMemberRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BuildingMemberCreateManyInput = {
    id?: string
    buildingId: string
    userId: number
    invitedByUserId: number
    role: $Enums.BuildingMemberRole
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BuildingMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    buildingId?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    invitedByUserId?: IntFieldUpdateOperationsInput | number
    role?: EnumBuildingMemberRoleFieldUpdateOperationsInput | $Enums.BuildingMemberRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BuildingMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    buildingId?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    invitedByUserId?: IntFieldUpdateOperationsInput | number
    role?: EnumBuildingMemberRoleFieldUpdateOperationsInput | $Enums.BuildingMemberRole
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BuildingSettingsCreateInput = {
    id?: string
    buildingId: string
    temperatureUnit: $Enums.TemperatureUnit
    humidityUnit: $Enums.HumidityUnit
    temperatureThreshold: number
    humidityThreshold: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BuildingSettingsUncheckedCreateInput = {
    id?: string
    buildingId: string
    temperatureUnit: $Enums.TemperatureUnit
    humidityUnit: $Enums.HumidityUnit
    temperatureThreshold: number
    humidityThreshold: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BuildingSettingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    buildingId?: StringFieldUpdateOperationsInput | string
    temperatureUnit?: EnumTemperatureUnitFieldUpdateOperationsInput | $Enums.TemperatureUnit
    humidityUnit?: EnumHumidityUnitFieldUpdateOperationsInput | $Enums.HumidityUnit
    temperatureThreshold?: FloatFieldUpdateOperationsInput | number
    humidityThreshold?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BuildingSettingsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    buildingId?: StringFieldUpdateOperationsInput | string
    temperatureUnit?: EnumTemperatureUnitFieldUpdateOperationsInput | $Enums.TemperatureUnit
    humidityUnit?: EnumHumidityUnitFieldUpdateOperationsInput | $Enums.HumidityUnit
    temperatureThreshold?: FloatFieldUpdateOperationsInput | number
    humidityThreshold?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BuildingSettingsCreateManyInput = {
    id?: string
    buildingId: string
    temperatureUnit: $Enums.TemperatureUnit
    humidityUnit: $Enums.HumidityUnit
    temperatureThreshold: number
    humidityThreshold: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BuildingSettingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    buildingId?: StringFieldUpdateOperationsInput | string
    temperatureUnit?: EnumTemperatureUnitFieldUpdateOperationsInput | $Enums.TemperatureUnit
    humidityUnit?: EnumHumidityUnitFieldUpdateOperationsInput | $Enums.HumidityUnit
    temperatureThreshold?: FloatFieldUpdateOperationsInput | number
    humidityThreshold?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BuildingSettingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    buildingId?: StringFieldUpdateOperationsInput | string
    temperatureUnit?: EnumTemperatureUnitFieldUpdateOperationsInput | $Enums.TemperatureUnit
    humidityUnit?: EnumHumidityUnitFieldUpdateOperationsInput | $Enums.HumidityUnit
    temperatureThreshold?: FloatFieldUpdateOperationsInput | number
    humidityThreshold?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomCreateInput = {
    id?: string
    buildingId: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    devices?: DeviceCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateInput = {
    id?: string
    buildingId: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    devices?: DeviceUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    buildingId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    devices?: DeviceUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    buildingId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    devices?: DeviceUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type RoomCreateManyInput = {
    id?: string
    buildingId: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    buildingId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    buildingId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomSurveyCreateInput = {
    id?: string
    roomId: string
    title: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomSurveyUncheckedCreateInput = {
    id?: string
    roomId: string
    title: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomSurveyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomSurveyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomSurveyCreateManyInput = {
    id?: string
    roomId: string
    title: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomSurveyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomSurveyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomSurveyResponseCreateInput = {
    id?: string
    surveyId: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomSurveyResponseUncheckedCreateInput = {
    id?: string
    surveyId: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomSurveyResponseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    surveyId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomSurveyResponseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    surveyId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomSurveyResponseCreateManyInput = {
    id?: string
    surveyId: string
    rating: number
    comment?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomSurveyResponseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    surveyId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomSurveyResponseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    surveyId?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceCreateInput = {
    id?: string
    name: string
    description?: string | null
    firmware?: string | null
    isPaired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    room?: RoomCreateNestedOneWithoutDevicesInput
    readings?: DeviceReadingCreateNestedManyWithoutDeviceInput
  }

  export type DeviceUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    firmware?: string | null
    isPaired?: boolean
    roomId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    readings?: DeviceReadingUncheckedCreateNestedManyWithoutDeviceInput
  }

  export type DeviceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    firmware?: NullableStringFieldUpdateOperationsInput | string | null
    isPaired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomUpdateOneWithoutDevicesNestedInput
    readings?: DeviceReadingUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    firmware?: NullableStringFieldUpdateOperationsInput | string | null
    isPaired?: BoolFieldUpdateOperationsInput | boolean
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readings?: DeviceReadingUncheckedUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    firmware?: string | null
    isPaired?: boolean
    roomId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeviceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    firmware?: NullableStringFieldUpdateOperationsInput | string | null
    isPaired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    firmware?: NullableStringFieldUpdateOperationsInput | string | null
    isPaired?: BoolFieldUpdateOperationsInput | boolean
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceReadingCreateInput = {
    id?: string
    temperature: number
    humidity: number
    createdAt?: Date | string
    updatedAt?: Date | string
    device: DeviceCreateNestedOneWithoutReadingsInput
  }

  export type DeviceReadingUncheckedCreateInput = {
    id?: string
    deviceId: string
    temperature: number
    humidity: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeviceReadingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    temperature?: FloatFieldUpdateOperationsInput | number
    humidity?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    device?: DeviceUpdateOneRequiredWithoutReadingsNestedInput
  }

  export type DeviceReadingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    temperature?: FloatFieldUpdateOperationsInput | number
    humidity?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceReadingCreateManyInput = {
    id?: string
    deviceId: string
    temperature: number
    humidity: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeviceReadingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    temperature?: FloatFieldUpdateOperationsInput | number
    humidity?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceReadingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    deviceId?: StringFieldUpdateOperationsInput | string
    temperature?: FloatFieldUpdateOperationsInput | number
    humidity?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
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

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BuildingCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    logoUrl?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BuildingMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    logoUrl?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BuildingMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    logoUrl?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
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

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type EnumBuildingInvitationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BuildingInvitationStatus | EnumBuildingInvitationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BuildingInvitationStatus[] | ListEnumBuildingInvitationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BuildingInvitationStatus[] | ListEnumBuildingInvitationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBuildingInvitationStatusFilter<$PrismaModel> | $Enums.BuildingInvitationStatus
  }

  export type BuildingInvitationCountOrderByAggregateInput = {
    id?: SortOrder
    buildingId?: SortOrder
    inviteCode?: SortOrder
    createdByUserId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BuildingInvitationAvgOrderByAggregateInput = {
    createdByUserId?: SortOrder
  }

  export type BuildingInvitationMaxOrderByAggregateInput = {
    id?: SortOrder
    buildingId?: SortOrder
    inviteCode?: SortOrder
    createdByUserId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BuildingInvitationMinOrderByAggregateInput = {
    id?: SortOrder
    buildingId?: SortOrder
    inviteCode?: SortOrder
    createdByUserId?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BuildingInvitationSumOrderByAggregateInput = {
    createdByUserId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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

  export type EnumBuildingInvitationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BuildingInvitationStatus | EnumBuildingInvitationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BuildingInvitationStatus[] | ListEnumBuildingInvitationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BuildingInvitationStatus[] | ListEnumBuildingInvitationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBuildingInvitationStatusWithAggregatesFilter<$PrismaModel> | $Enums.BuildingInvitationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBuildingInvitationStatusFilter<$PrismaModel>
    _max?: NestedEnumBuildingInvitationStatusFilter<$PrismaModel>
  }

  export type EnumBuildingMemberRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.BuildingMemberRole | EnumBuildingMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.BuildingMemberRole[] | ListEnumBuildingMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.BuildingMemberRole[] | ListEnumBuildingMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumBuildingMemberRoleFilter<$PrismaModel> | $Enums.BuildingMemberRole
  }

  export type BuildingMemberCountOrderByAggregateInput = {
    id?: SortOrder
    buildingId?: SortOrder
    userId?: SortOrder
    invitedByUserId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BuildingMemberAvgOrderByAggregateInput = {
    userId?: SortOrder
    invitedByUserId?: SortOrder
  }

  export type BuildingMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    buildingId?: SortOrder
    userId?: SortOrder
    invitedByUserId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BuildingMemberMinOrderByAggregateInput = {
    id?: SortOrder
    buildingId?: SortOrder
    userId?: SortOrder
    invitedByUserId?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BuildingMemberSumOrderByAggregateInput = {
    userId?: SortOrder
    invitedByUserId?: SortOrder
  }

  export type EnumBuildingMemberRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BuildingMemberRole | EnumBuildingMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.BuildingMemberRole[] | ListEnumBuildingMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.BuildingMemberRole[] | ListEnumBuildingMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumBuildingMemberRoleWithAggregatesFilter<$PrismaModel> | $Enums.BuildingMemberRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBuildingMemberRoleFilter<$PrismaModel>
    _max?: NestedEnumBuildingMemberRoleFilter<$PrismaModel>
  }

  export type EnumTemperatureUnitFilter<$PrismaModel = never> = {
    equals?: $Enums.TemperatureUnit | EnumTemperatureUnitFieldRefInput<$PrismaModel>
    in?: $Enums.TemperatureUnit[] | ListEnumTemperatureUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.TemperatureUnit[] | ListEnumTemperatureUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumTemperatureUnitFilter<$PrismaModel> | $Enums.TemperatureUnit
  }

  export type EnumHumidityUnitFilter<$PrismaModel = never> = {
    equals?: $Enums.HumidityUnit | EnumHumidityUnitFieldRefInput<$PrismaModel>
    in?: $Enums.HumidityUnit[] | ListEnumHumidityUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.HumidityUnit[] | ListEnumHumidityUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumHumidityUnitFilter<$PrismaModel> | $Enums.HumidityUnit
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BuildingSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    buildingId?: SortOrder
    temperatureUnit?: SortOrder
    humidityUnit?: SortOrder
    temperatureThreshold?: SortOrder
    humidityThreshold?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BuildingSettingsAvgOrderByAggregateInput = {
    temperatureThreshold?: SortOrder
    humidityThreshold?: SortOrder
  }

  export type BuildingSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    buildingId?: SortOrder
    temperatureUnit?: SortOrder
    humidityUnit?: SortOrder
    temperatureThreshold?: SortOrder
    humidityThreshold?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BuildingSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    buildingId?: SortOrder
    temperatureUnit?: SortOrder
    humidityUnit?: SortOrder
    temperatureThreshold?: SortOrder
    humidityThreshold?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BuildingSettingsSumOrderByAggregateInput = {
    temperatureThreshold?: SortOrder
    humidityThreshold?: SortOrder
  }

  export type EnumTemperatureUnitWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TemperatureUnit | EnumTemperatureUnitFieldRefInput<$PrismaModel>
    in?: $Enums.TemperatureUnit[] | ListEnumTemperatureUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.TemperatureUnit[] | ListEnumTemperatureUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumTemperatureUnitWithAggregatesFilter<$PrismaModel> | $Enums.TemperatureUnit
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTemperatureUnitFilter<$PrismaModel>
    _max?: NestedEnumTemperatureUnitFilter<$PrismaModel>
  }

  export type EnumHumidityUnitWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HumidityUnit | EnumHumidityUnitFieldRefInput<$PrismaModel>
    in?: $Enums.HumidityUnit[] | ListEnumHumidityUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.HumidityUnit[] | ListEnumHumidityUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumHumidityUnitWithAggregatesFilter<$PrismaModel> | $Enums.HumidityUnit
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumHumidityUnitFilter<$PrismaModel>
    _max?: NestedEnumHumidityUnitFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type DeviceListRelationFilter = {
    every?: DeviceWhereInput
    some?: DeviceWhereInput
    none?: DeviceWhereInput
  }

  export type DeviceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoomCountOrderByAggregateInput = {
    id?: SortOrder
    buildingId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomMaxOrderByAggregateInput = {
    id?: SortOrder
    buildingId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomMinOrderByAggregateInput = {
    id?: SortOrder
    buildingId?: SortOrder
    name?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomSurveyCountOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomSurveyMaxOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomSurveyMinOrderByAggregateInput = {
    id?: SortOrder
    roomId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomSurveyResponseCountOrderByAggregateInput = {
    id?: SortOrder
    surveyId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomSurveyResponseAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type RoomSurveyResponseMaxOrderByAggregateInput = {
    id?: SortOrder
    surveyId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomSurveyResponseMinOrderByAggregateInput = {
    id?: SortOrder
    surveyId?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomSurveyResponseSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type RoomNullableScalarRelationFilter = {
    is?: RoomWhereInput | null
    isNot?: RoomWhereInput | null
  }

  export type DeviceReadingListRelationFilter = {
    every?: DeviceReadingWhereInput
    some?: DeviceReadingWhereInput
    none?: DeviceReadingWhereInput
  }

  export type DeviceReadingOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DeviceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    firmware?: SortOrder
    isPaired?: SortOrder
    roomId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeviceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    firmware?: SortOrder
    isPaired?: SortOrder
    roomId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeviceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    firmware?: SortOrder
    isPaired?: SortOrder
    roomId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DeviceScalarRelationFilter = {
    is?: DeviceWhereInput
    isNot?: DeviceWhereInput
  }

  export type DeviceReadingCountOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
    temperature?: SortOrder
    humidity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeviceReadingAvgOrderByAggregateInput = {
    temperature?: SortOrder
    humidity?: SortOrder
  }

  export type DeviceReadingMaxOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
    temperature?: SortOrder
    humidity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeviceReadingMinOrderByAggregateInput = {
    id?: SortOrder
    deviceId?: SortOrder
    temperature?: SortOrder
    humidity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DeviceReadingSumOrderByAggregateInput = {
    temperature?: SortOrder
    humidity?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumBuildingInvitationStatusFieldUpdateOperationsInput = {
    set?: $Enums.BuildingInvitationStatus
  }

  export type EnumBuildingMemberRoleFieldUpdateOperationsInput = {
    set?: $Enums.BuildingMemberRole
  }

  export type EnumTemperatureUnitFieldUpdateOperationsInput = {
    set?: $Enums.TemperatureUnit
  }

  export type EnumHumidityUnitFieldUpdateOperationsInput = {
    set?: $Enums.HumidityUnit
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DeviceCreateNestedManyWithoutRoomInput = {
    create?: XOR<DeviceCreateWithoutRoomInput, DeviceUncheckedCreateWithoutRoomInput> | DeviceCreateWithoutRoomInput[] | DeviceUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: DeviceCreateOrConnectWithoutRoomInput | DeviceCreateOrConnectWithoutRoomInput[]
    createMany?: DeviceCreateManyRoomInputEnvelope
    connect?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
  }

  export type DeviceUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<DeviceCreateWithoutRoomInput, DeviceUncheckedCreateWithoutRoomInput> | DeviceCreateWithoutRoomInput[] | DeviceUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: DeviceCreateOrConnectWithoutRoomInput | DeviceCreateOrConnectWithoutRoomInput[]
    createMany?: DeviceCreateManyRoomInputEnvelope
    connect?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
  }

  export type DeviceUpdateManyWithoutRoomNestedInput = {
    create?: XOR<DeviceCreateWithoutRoomInput, DeviceUncheckedCreateWithoutRoomInput> | DeviceCreateWithoutRoomInput[] | DeviceUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: DeviceCreateOrConnectWithoutRoomInput | DeviceCreateOrConnectWithoutRoomInput[]
    upsert?: DeviceUpsertWithWhereUniqueWithoutRoomInput | DeviceUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: DeviceCreateManyRoomInputEnvelope
    set?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    disconnect?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    delete?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    connect?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    update?: DeviceUpdateWithWhereUniqueWithoutRoomInput | DeviceUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: DeviceUpdateManyWithWhereWithoutRoomInput | DeviceUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: DeviceScalarWhereInput | DeviceScalarWhereInput[]
  }

  export type DeviceUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<DeviceCreateWithoutRoomInput, DeviceUncheckedCreateWithoutRoomInput> | DeviceCreateWithoutRoomInput[] | DeviceUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: DeviceCreateOrConnectWithoutRoomInput | DeviceCreateOrConnectWithoutRoomInput[]
    upsert?: DeviceUpsertWithWhereUniqueWithoutRoomInput | DeviceUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: DeviceCreateManyRoomInputEnvelope
    set?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    disconnect?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    delete?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    connect?: DeviceWhereUniqueInput | DeviceWhereUniqueInput[]
    update?: DeviceUpdateWithWhereUniqueWithoutRoomInput | DeviceUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: DeviceUpdateManyWithWhereWithoutRoomInput | DeviceUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: DeviceScalarWhereInput | DeviceScalarWhereInput[]
  }

  export type RoomCreateNestedOneWithoutDevicesInput = {
    create?: XOR<RoomCreateWithoutDevicesInput, RoomUncheckedCreateWithoutDevicesInput>
    connectOrCreate?: RoomCreateOrConnectWithoutDevicesInput
    connect?: RoomWhereUniqueInput
  }

  export type DeviceReadingCreateNestedManyWithoutDeviceInput = {
    create?: XOR<DeviceReadingCreateWithoutDeviceInput, DeviceReadingUncheckedCreateWithoutDeviceInput> | DeviceReadingCreateWithoutDeviceInput[] | DeviceReadingUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: DeviceReadingCreateOrConnectWithoutDeviceInput | DeviceReadingCreateOrConnectWithoutDeviceInput[]
    createMany?: DeviceReadingCreateManyDeviceInputEnvelope
    connect?: DeviceReadingWhereUniqueInput | DeviceReadingWhereUniqueInput[]
  }

  export type DeviceReadingUncheckedCreateNestedManyWithoutDeviceInput = {
    create?: XOR<DeviceReadingCreateWithoutDeviceInput, DeviceReadingUncheckedCreateWithoutDeviceInput> | DeviceReadingCreateWithoutDeviceInput[] | DeviceReadingUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: DeviceReadingCreateOrConnectWithoutDeviceInput | DeviceReadingCreateOrConnectWithoutDeviceInput[]
    createMany?: DeviceReadingCreateManyDeviceInputEnvelope
    connect?: DeviceReadingWhereUniqueInput | DeviceReadingWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type RoomUpdateOneWithoutDevicesNestedInput = {
    create?: XOR<RoomCreateWithoutDevicesInput, RoomUncheckedCreateWithoutDevicesInput>
    connectOrCreate?: RoomCreateOrConnectWithoutDevicesInput
    upsert?: RoomUpsertWithoutDevicesInput
    disconnect?: RoomWhereInput | boolean
    delete?: RoomWhereInput | boolean
    connect?: RoomWhereUniqueInput
    update?: XOR<XOR<RoomUpdateToOneWithWhereWithoutDevicesInput, RoomUpdateWithoutDevicesInput>, RoomUncheckedUpdateWithoutDevicesInput>
  }

  export type DeviceReadingUpdateManyWithoutDeviceNestedInput = {
    create?: XOR<DeviceReadingCreateWithoutDeviceInput, DeviceReadingUncheckedCreateWithoutDeviceInput> | DeviceReadingCreateWithoutDeviceInput[] | DeviceReadingUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: DeviceReadingCreateOrConnectWithoutDeviceInput | DeviceReadingCreateOrConnectWithoutDeviceInput[]
    upsert?: DeviceReadingUpsertWithWhereUniqueWithoutDeviceInput | DeviceReadingUpsertWithWhereUniqueWithoutDeviceInput[]
    createMany?: DeviceReadingCreateManyDeviceInputEnvelope
    set?: DeviceReadingWhereUniqueInput | DeviceReadingWhereUniqueInput[]
    disconnect?: DeviceReadingWhereUniqueInput | DeviceReadingWhereUniqueInput[]
    delete?: DeviceReadingWhereUniqueInput | DeviceReadingWhereUniqueInput[]
    connect?: DeviceReadingWhereUniqueInput | DeviceReadingWhereUniqueInput[]
    update?: DeviceReadingUpdateWithWhereUniqueWithoutDeviceInput | DeviceReadingUpdateWithWhereUniqueWithoutDeviceInput[]
    updateMany?: DeviceReadingUpdateManyWithWhereWithoutDeviceInput | DeviceReadingUpdateManyWithWhereWithoutDeviceInput[]
    deleteMany?: DeviceReadingScalarWhereInput | DeviceReadingScalarWhereInput[]
  }

  export type DeviceReadingUncheckedUpdateManyWithoutDeviceNestedInput = {
    create?: XOR<DeviceReadingCreateWithoutDeviceInput, DeviceReadingUncheckedCreateWithoutDeviceInput> | DeviceReadingCreateWithoutDeviceInput[] | DeviceReadingUncheckedCreateWithoutDeviceInput[]
    connectOrCreate?: DeviceReadingCreateOrConnectWithoutDeviceInput | DeviceReadingCreateOrConnectWithoutDeviceInput[]
    upsert?: DeviceReadingUpsertWithWhereUniqueWithoutDeviceInput | DeviceReadingUpsertWithWhereUniqueWithoutDeviceInput[]
    createMany?: DeviceReadingCreateManyDeviceInputEnvelope
    set?: DeviceReadingWhereUniqueInput | DeviceReadingWhereUniqueInput[]
    disconnect?: DeviceReadingWhereUniqueInput | DeviceReadingWhereUniqueInput[]
    delete?: DeviceReadingWhereUniqueInput | DeviceReadingWhereUniqueInput[]
    connect?: DeviceReadingWhereUniqueInput | DeviceReadingWhereUniqueInput[]
    update?: DeviceReadingUpdateWithWhereUniqueWithoutDeviceInput | DeviceReadingUpdateWithWhereUniqueWithoutDeviceInput[]
    updateMany?: DeviceReadingUpdateManyWithWhereWithoutDeviceInput | DeviceReadingUpdateManyWithWhereWithoutDeviceInput[]
    deleteMany?: DeviceReadingScalarWhereInput | DeviceReadingScalarWhereInput[]
  }

  export type DeviceCreateNestedOneWithoutReadingsInput = {
    create?: XOR<DeviceCreateWithoutReadingsInput, DeviceUncheckedCreateWithoutReadingsInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutReadingsInput
    connect?: DeviceWhereUniqueInput
  }

  export type DeviceUpdateOneRequiredWithoutReadingsNestedInput = {
    create?: XOR<DeviceCreateWithoutReadingsInput, DeviceUncheckedCreateWithoutReadingsInput>
    connectOrCreate?: DeviceCreateOrConnectWithoutReadingsInput
    upsert?: DeviceUpsertWithoutReadingsInput
    connect?: DeviceWhereUniqueInput
    update?: XOR<XOR<DeviceUpdateToOneWithWhereWithoutReadingsInput, DeviceUpdateWithoutReadingsInput>, DeviceUncheckedUpdateWithoutReadingsInput>
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

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
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

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
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

  export type NestedEnumBuildingInvitationStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BuildingInvitationStatus | EnumBuildingInvitationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BuildingInvitationStatus[] | ListEnumBuildingInvitationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BuildingInvitationStatus[] | ListEnumBuildingInvitationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBuildingInvitationStatusFilter<$PrismaModel> | $Enums.BuildingInvitationStatus
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
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
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumBuildingInvitationStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BuildingInvitationStatus | EnumBuildingInvitationStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BuildingInvitationStatus[] | ListEnumBuildingInvitationStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BuildingInvitationStatus[] | ListEnumBuildingInvitationStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBuildingInvitationStatusWithAggregatesFilter<$PrismaModel> | $Enums.BuildingInvitationStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBuildingInvitationStatusFilter<$PrismaModel>
    _max?: NestedEnumBuildingInvitationStatusFilter<$PrismaModel>
  }

  export type NestedEnumBuildingMemberRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.BuildingMemberRole | EnumBuildingMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.BuildingMemberRole[] | ListEnumBuildingMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.BuildingMemberRole[] | ListEnumBuildingMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumBuildingMemberRoleFilter<$PrismaModel> | $Enums.BuildingMemberRole
  }

  export type NestedEnumBuildingMemberRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BuildingMemberRole | EnumBuildingMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.BuildingMemberRole[] | ListEnumBuildingMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.BuildingMemberRole[] | ListEnumBuildingMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumBuildingMemberRoleWithAggregatesFilter<$PrismaModel> | $Enums.BuildingMemberRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBuildingMemberRoleFilter<$PrismaModel>
    _max?: NestedEnumBuildingMemberRoleFilter<$PrismaModel>
  }

  export type NestedEnumTemperatureUnitFilter<$PrismaModel = never> = {
    equals?: $Enums.TemperatureUnit | EnumTemperatureUnitFieldRefInput<$PrismaModel>
    in?: $Enums.TemperatureUnit[] | ListEnumTemperatureUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.TemperatureUnit[] | ListEnumTemperatureUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumTemperatureUnitFilter<$PrismaModel> | $Enums.TemperatureUnit
  }

  export type NestedEnumHumidityUnitFilter<$PrismaModel = never> = {
    equals?: $Enums.HumidityUnit | EnumHumidityUnitFieldRefInput<$PrismaModel>
    in?: $Enums.HumidityUnit[] | ListEnumHumidityUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.HumidityUnit[] | ListEnumHumidityUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumHumidityUnitFilter<$PrismaModel> | $Enums.HumidityUnit
  }

  export type NestedEnumTemperatureUnitWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TemperatureUnit | EnumTemperatureUnitFieldRefInput<$PrismaModel>
    in?: $Enums.TemperatureUnit[] | ListEnumTemperatureUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.TemperatureUnit[] | ListEnumTemperatureUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumTemperatureUnitWithAggregatesFilter<$PrismaModel> | $Enums.TemperatureUnit
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTemperatureUnitFilter<$PrismaModel>
    _max?: NestedEnumTemperatureUnitFilter<$PrismaModel>
  }

  export type NestedEnumHumidityUnitWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.HumidityUnit | EnumHumidityUnitFieldRefInput<$PrismaModel>
    in?: $Enums.HumidityUnit[] | ListEnumHumidityUnitFieldRefInput<$PrismaModel>
    notIn?: $Enums.HumidityUnit[] | ListEnumHumidityUnitFieldRefInput<$PrismaModel>
    not?: NestedEnumHumidityUnitWithAggregatesFilter<$PrismaModel> | $Enums.HumidityUnit
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumHumidityUnitFilter<$PrismaModel>
    _max?: NestedEnumHumidityUnitFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DeviceCreateWithoutRoomInput = {
    id?: string
    name: string
    description?: string | null
    firmware?: string | null
    isPaired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    readings?: DeviceReadingCreateNestedManyWithoutDeviceInput
  }

  export type DeviceUncheckedCreateWithoutRoomInput = {
    id?: string
    name: string
    description?: string | null
    firmware?: string | null
    isPaired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    readings?: DeviceReadingUncheckedCreateNestedManyWithoutDeviceInput
  }

  export type DeviceCreateOrConnectWithoutRoomInput = {
    where: DeviceWhereUniqueInput
    create: XOR<DeviceCreateWithoutRoomInput, DeviceUncheckedCreateWithoutRoomInput>
  }

  export type DeviceCreateManyRoomInputEnvelope = {
    data: DeviceCreateManyRoomInput | DeviceCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type DeviceUpsertWithWhereUniqueWithoutRoomInput = {
    where: DeviceWhereUniqueInput
    update: XOR<DeviceUpdateWithoutRoomInput, DeviceUncheckedUpdateWithoutRoomInput>
    create: XOR<DeviceCreateWithoutRoomInput, DeviceUncheckedCreateWithoutRoomInput>
  }

  export type DeviceUpdateWithWhereUniqueWithoutRoomInput = {
    where: DeviceWhereUniqueInput
    data: XOR<DeviceUpdateWithoutRoomInput, DeviceUncheckedUpdateWithoutRoomInput>
  }

  export type DeviceUpdateManyWithWhereWithoutRoomInput = {
    where: DeviceScalarWhereInput
    data: XOR<DeviceUpdateManyMutationInput, DeviceUncheckedUpdateManyWithoutRoomInput>
  }

  export type DeviceScalarWhereInput = {
    AND?: DeviceScalarWhereInput | DeviceScalarWhereInput[]
    OR?: DeviceScalarWhereInput[]
    NOT?: DeviceScalarWhereInput | DeviceScalarWhereInput[]
    id?: StringFilter<"Device"> | string
    name?: StringFilter<"Device"> | string
    description?: StringNullableFilter<"Device"> | string | null
    firmware?: StringNullableFilter<"Device"> | string | null
    isPaired?: BoolFilter<"Device"> | boolean
    roomId?: StringNullableFilter<"Device"> | string | null
    createdAt?: DateTimeFilter<"Device"> | Date | string
    updatedAt?: DateTimeFilter<"Device"> | Date | string
  }

  export type RoomCreateWithoutDevicesInput = {
    id?: string
    buildingId: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomUncheckedCreateWithoutDevicesInput = {
    id?: string
    buildingId: string
    name: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomCreateOrConnectWithoutDevicesInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutDevicesInput, RoomUncheckedCreateWithoutDevicesInput>
  }

  export type DeviceReadingCreateWithoutDeviceInput = {
    id?: string
    temperature: number
    humidity: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeviceReadingUncheckedCreateWithoutDeviceInput = {
    id?: string
    temperature: number
    humidity: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeviceReadingCreateOrConnectWithoutDeviceInput = {
    where: DeviceReadingWhereUniqueInput
    create: XOR<DeviceReadingCreateWithoutDeviceInput, DeviceReadingUncheckedCreateWithoutDeviceInput>
  }

  export type DeviceReadingCreateManyDeviceInputEnvelope = {
    data: DeviceReadingCreateManyDeviceInput | DeviceReadingCreateManyDeviceInput[]
    skipDuplicates?: boolean
  }

  export type RoomUpsertWithoutDevicesInput = {
    update: XOR<RoomUpdateWithoutDevicesInput, RoomUncheckedUpdateWithoutDevicesInput>
    create: XOR<RoomCreateWithoutDevicesInput, RoomUncheckedCreateWithoutDevicesInput>
    where?: RoomWhereInput
  }

  export type RoomUpdateToOneWithWhereWithoutDevicesInput = {
    where?: RoomWhereInput
    data: XOR<RoomUpdateWithoutDevicesInput, RoomUncheckedUpdateWithoutDevicesInput>
  }

  export type RoomUpdateWithoutDevicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    buildingId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUncheckedUpdateWithoutDevicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    buildingId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceReadingUpsertWithWhereUniqueWithoutDeviceInput = {
    where: DeviceReadingWhereUniqueInput
    update: XOR<DeviceReadingUpdateWithoutDeviceInput, DeviceReadingUncheckedUpdateWithoutDeviceInput>
    create: XOR<DeviceReadingCreateWithoutDeviceInput, DeviceReadingUncheckedCreateWithoutDeviceInput>
  }

  export type DeviceReadingUpdateWithWhereUniqueWithoutDeviceInput = {
    where: DeviceReadingWhereUniqueInput
    data: XOR<DeviceReadingUpdateWithoutDeviceInput, DeviceReadingUncheckedUpdateWithoutDeviceInput>
  }

  export type DeviceReadingUpdateManyWithWhereWithoutDeviceInput = {
    where: DeviceReadingScalarWhereInput
    data: XOR<DeviceReadingUpdateManyMutationInput, DeviceReadingUncheckedUpdateManyWithoutDeviceInput>
  }

  export type DeviceReadingScalarWhereInput = {
    AND?: DeviceReadingScalarWhereInput | DeviceReadingScalarWhereInput[]
    OR?: DeviceReadingScalarWhereInput[]
    NOT?: DeviceReadingScalarWhereInput | DeviceReadingScalarWhereInput[]
    id?: StringFilter<"DeviceReading"> | string
    deviceId?: StringFilter<"DeviceReading"> | string
    temperature?: FloatFilter<"DeviceReading"> | number
    humidity?: FloatFilter<"DeviceReading"> | number
    createdAt?: DateTimeFilter<"DeviceReading"> | Date | string
    updatedAt?: DateTimeFilter<"DeviceReading"> | Date | string
  }

  export type DeviceCreateWithoutReadingsInput = {
    id?: string
    name: string
    description?: string | null
    firmware?: string | null
    isPaired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    room?: RoomCreateNestedOneWithoutDevicesInput
  }

  export type DeviceUncheckedCreateWithoutReadingsInput = {
    id?: string
    name: string
    description?: string | null
    firmware?: string | null
    isPaired?: boolean
    roomId?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeviceCreateOrConnectWithoutReadingsInput = {
    where: DeviceWhereUniqueInput
    create: XOR<DeviceCreateWithoutReadingsInput, DeviceUncheckedCreateWithoutReadingsInput>
  }

  export type DeviceUpsertWithoutReadingsInput = {
    update: XOR<DeviceUpdateWithoutReadingsInput, DeviceUncheckedUpdateWithoutReadingsInput>
    create: XOR<DeviceCreateWithoutReadingsInput, DeviceUncheckedCreateWithoutReadingsInput>
    where?: DeviceWhereInput
  }

  export type DeviceUpdateToOneWithWhereWithoutReadingsInput = {
    where?: DeviceWhereInput
    data: XOR<DeviceUpdateWithoutReadingsInput, DeviceUncheckedUpdateWithoutReadingsInput>
  }

  export type DeviceUpdateWithoutReadingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    firmware?: NullableStringFieldUpdateOperationsInput | string | null
    isPaired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomUpdateOneWithoutDevicesNestedInput
  }

  export type DeviceUncheckedUpdateWithoutReadingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    firmware?: NullableStringFieldUpdateOperationsInput | string | null
    isPaired?: BoolFieldUpdateOperationsInput | boolean
    roomId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceCreateManyRoomInput = {
    id?: string
    name: string
    description?: string | null
    firmware?: string | null
    isPaired?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeviceUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    firmware?: NullableStringFieldUpdateOperationsInput | string | null
    isPaired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readings?: DeviceReadingUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    firmware?: NullableStringFieldUpdateOperationsInput | string | null
    isPaired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    readings?: DeviceReadingUncheckedUpdateManyWithoutDeviceNestedInput
  }

  export type DeviceUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    firmware?: NullableStringFieldUpdateOperationsInput | string | null
    isPaired?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceReadingCreateManyDeviceInput = {
    id?: string
    temperature: number
    humidity: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DeviceReadingUpdateWithoutDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string
    temperature?: FloatFieldUpdateOperationsInput | number
    humidity?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceReadingUncheckedUpdateWithoutDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string
    temperature?: FloatFieldUpdateOperationsInput | number
    humidity?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DeviceReadingUncheckedUpdateManyWithoutDeviceInput = {
    id?: StringFieldUpdateOperationsInput | string
    temperature?: FloatFieldUpdateOperationsInput | number
    humidity?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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