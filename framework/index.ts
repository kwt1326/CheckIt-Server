import 'reflect-metadata';
import Server, * as server from './server';
import { ServerProps } from './server';
import { AppProps, Modules } from './server/types';

interface FrameworkProps {
  serverProps: ServerProps;
}

type Instance = {
  server: any;
  modules: Modules;
}

class Framework {
  static instance: Instance | null = null;
  static server: Server | undefined;

  constructor(params: FrameworkProps) {
    if (!Framework.instance) {
      Framework.instance = this.init(params);
      Framework.server = Framework.instance.server;
    }
  }

  init(params: FrameworkProps) {
    const server = new Server(params.serverProps);
    const modules = server.modules;
    return { server, modules };
  }

  listen(port?: number) {
    Framework.server?.server.listen(port || 3000);
  }
}

export default Framework