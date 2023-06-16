interface CustomConfig {
  DAEMON_URL: string
  REGISTRY_AUTH: string
  SWARM_WORKER_SHARED_FOLDER: string
}

interface Config extends CustomConfig {
  PATH: string
  HOSTNAME: string
  FN_TYPE: string
  FN_FN_ID: string
  FN_APP_ID: string
  FN_LISTENER: string
  FN_FORMAT: string
  FN_MEMORY: string
  HOME: string
  OCI_RESOURCE_PRINCIPAL_PRIVATE_PEM: string
  OCI_PRIVATEKEY: string
}

interface Context {
  _config: Config
  _body: any
  _headers: {
    [typeof string]: [string]
  }
  _responseHeaders: { 'Content-Type': ['application/json'] }
}
type fnFunction = (body: any, ctx: Context) => any
type handleReturn = (fnfunction: fnFunction, options: any) => () => void

declare module '@fnproject/fdk' {
  // eslint-disable-next-line no-unused-vars
  declare function handle(fnfunction: fnFunction, options?: any): handleReturn
}
