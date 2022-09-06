type ServerType = 'express' | 'koa';

interface AppProps {
  modules: any[];
}

export type {
  ServerType,
  AppProps
}