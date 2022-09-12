import 'reflect-metadata';
import * as express from 'express';
import Server from './server';
import { ServerProps } from './server';
import { AppProps, Modules } from './server/types';
import expressApp from './server/express';

interface FrameworkProps {
  serverProps: ServerProps;
  appProps: AppProps;
}

type Instance = {
  modules: Modules;
  app: express.Express;
}

class Framework {
  static instance: Instance;
  private readonly _app: express.Express;
  private readonly _server: Server;
  private readonly _modules: Modules;

  constructor(params: FrameworkProps) {
    this._app = expressApp.instance;
    this._server = new Server({ type: 'express' });
    this._modules = params.appProps.modules;

    Object.values(this._modules).forEach((module) => module.init(this._app));

    if (!Framework.instance) {
      Framework.instance = this.init();
    }
  }

  init() {
    return {
      modules: this._modules,
      app: this._app,
    }
  }

  run() {
    this._server.init(this._app);
  }
}

export default Framework