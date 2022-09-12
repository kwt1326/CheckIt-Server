enum Method {
  GET = 'get',
  POST = 'post',
};

enum MetadataKeys {
  BASE_PATH = 'base_path',
  ROUTERS = 'router',
  LOGGERS = 'logger',
}

interface IRouter {
  method: Method;
  path: string;
  handlerName: string | symbol;
}

export type {
  IRouter
}
export {
  Method,
  MetadataKeys
}