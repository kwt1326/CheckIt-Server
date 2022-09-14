import { ModuleDefaultClass } from "../modules/common";

interface AppProps {
  modules: Modules;
}

interface ServerProps {
  port?: number;
}

interface ExpressAppProps extends AppProps {}

type ServerType = 'express' | 'koa';

type Modules = {
  router: ModuleDefaultClass;
  // logger: ModuleDefaultClass;
  errorBoundary: ModuleDefaultClass;
};

export type {
  AppProps,
  ExpressAppProps,
  ServerProps,
  ServerType,
  Modules,
}