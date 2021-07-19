import Koa, { Middleware } from 'koa'
import { getSwaggerJsonFromUrl, SwaggerPathInParameters } from './share'
import { initKoa } from './server'
import { KOA_PORT } from './server/config'

interface SardineOptions {
  url: string
  port?: number
  defaultFakeConfigs?: Record<string, any>
  koaMiddleware?: Middleware
  // TODO: nock config
}
export default class Sardine {
  public koa: Koa | undefined
  public swagger: SwaggerPathInParameters | undefined
  public url: SardineOptions['url']
  public port?: number
  public defaultFakeConfigs: SardineOptions['defaultFakeConfigs']
  public koaMiddleware: SardineOptions['koaMiddleware']
  constructor(options: SardineOptions) {
    this.url = options.url
    this.port = options.port || KOA_PORT
    //TODO default fake config
    this.defaultFakeConfigs = options.defaultFakeConfigs || {}
    this.koaMiddleware = options.koaMiddleware
    this.init()
  }

  /**
   * get swagger json and create koa server
   */
  init = async () => {
    this.swagger = await getSwaggerJsonFromUrl(this.url)
    this.koa = await initKoa(this.swagger)
    this.koaMiddleware && this.koa.use(this.koaMiddleware)
    const schemes = this.swagger.schemes ? this.swagger.schemes[0] : 'http'
    const fullScheme = schemes.endsWith('://') ? schemes : schemes + '://'
    console.log(
      '✨ fake server is start on: http://localhost:' + this.port + '\n',
      '💻 proxy target is ' + fullScheme + this.swagger.host + this.swagger.basePath
    )
    this.koa.listen(this.port)
  }
}
