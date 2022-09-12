import { ModuleDefaultProps } from "../modules/types";

interface AppProps {
  modules?: Partial<{
    router: ModuleDefaultProps;
    logger: ModuleDefaultProps;
  }>;
}

interface ServerProps {
  type: ServerType;
  appProps: AppProps;
}

interface ExpressAppProps extends AppProps {}

type ServerType = 'express' | 'koa';

type Modules = AppProps['modules'];

export type {
  AppProps,
  ExpressAppProps,
  ServerProps,
  ServerType,
  Modules,
}