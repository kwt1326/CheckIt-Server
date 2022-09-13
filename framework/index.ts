import 'reflect-metadata';
import * as express from 'express';

import Server from './server';
import expressApp from './server/express';
import { ServerProps } from './server';
import { AppProps, Modules } from './server/types';

interface FrameworkProps {
  serverProps: ServerProps;
  appProps: AppProps;
}

type Instance = {
  modules: Modules;
  app: express.Express;
}

class Framework {
  private static _instance: Instance;
  private readonly _app: express.Express;
  private readonly _server: Server;
  private readonly _modules: Modules;

  constructor(params: FrameworkProps) {
    if (!Framework._instance) {
      Framework._instance = this.init();
    }
    
    this._app = expressApp.instance;
    this._server = new Server({});
    this._modules = params.appProps.modules;

    Object.values(this._modules).forEach((module) => module.init(this._app));
  }

  static get instance() {
    return Framework._instance;
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