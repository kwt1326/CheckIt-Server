import * as express from 'express';
import { ModuleDefaultClass } from "../modules/common";

interface AppProps {
  modules: Modules;
}

interface ServerProps {
  port?: number;
  type: ServerType;
}

interface ExpressAppProps extends AppProps {}

type ServerType = 'express' | 'koa';

type Modules = {
  router: ModuleDefaultClass;
  logger: ModuleDefaultClass;
};

export type {
  AppProps,
  ExpressAppProps,
  ServerProps,
  ServerType,
  Modules,
}