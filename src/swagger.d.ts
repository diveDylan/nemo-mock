/**
 * @description swagger types
 * @url https://swagger.io/specification/v2
 */
export type Type = 'object' | 'integer' | 'number' | 'string' | 'array' | 'boolean'
export interface HeadersObject extends Items {
  description: string
}
export interface Schema extends Partial<Omit<Items, 'type'>> {
  type: Exclude<AllTypes, 'file'>
  required?: string[]
  description?: string
  allOf?: any
  title?: string
  properties: Record<string, Partial<Items>>
  format?: string
  additionalProperties?: Record<string, Schema>
  xm?: Record<string, string>
}
export interface Items {
  type: Exclude<AllTypes, 'file' | 'object'>
  $ref: string
  enum: any[]
  format: string
  items: Items
  collectionFormat: string
  default: any
  maximum: number
  exclusiveMaximum: boolean
  minimum: number
  exclusiveMinimum: boolean
  maxLength: number
  minLength: number
  pattern: string
  maxItems: number
  minItems: number
  uniqueItems: boolean
  multipleOf: number
}
type ProtoExtend<T, U> = U &
  {
    [P in Exclude<keyof T, keyof U>]: T[P]
  }
type AllTypes = 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'file' | 'object'

export interface Definition extends Schema {}

type LicenseObject = Pick<Tag, 'description' | 'name'>

interface ContactObject extends LicenseObject {
  email: string
}
interface SwaggerInfo extends LicenseObject {
  title: Definition['title']
  license: LicenseObject
  termsOfService: string
  contact: ContactObject
}
export interface Swagger {
  swagger: string
  info: SwaggerInfo
  host: string
  basePath: string
  schemes?: string[]
  consumes?: string[]
  produces?: string[]
  tags: Tag[]
  paths: Path
  definitions: Record<string, Definition>
}
export type ParameterIn = 'body' | 'query' | 'path' | 'formData'
export interface Parameter extends Partial<Items> {
  in: ParameterIn
  name: string
  description?: string
  required?: boolean
  schema?: Partial<Definition>
}
type ResponseCode = '200' | '400' | '405' | '404' | '405'
interface Response {
  description: string
  examples?: Record<string, any>
  headers: HeadersObject
  schema?: Partial<Schema>
}
type SwaggerResponses = Partial<Record<ResponseCode, Response>>

interface BaseRequestPath {
  tags: string[]
  summary: string
  operationId: string
  consumes?: string[]
  produces?: string[]
  parameters: Parameter[]
  responses: SwaggerResponses
  externalDocs?: Pick<Tag, 'externalDocs'>
  schemes: string[]
  deprecated: boolean
  security?: Record<string, string[]>
}
export type Method = 'post' | 'get' | 'put' | 'delete' | 'head' | 'options' | 'patch' | 'trace'
export interface Path extends Partial<Record<Method, BaseRequestPath>> {
  $ref: Items['$ref']
  parameters: Array<Parameter | Reference>
}

interface Reference {
  $ref: Items['$ref']
}

export interface Tag {
  name: string
  description: string
  externalDocs?: ExternalDocs
}

export interface ExternalDocs {
  description: string
  url: string
}
