import * as express from 'express';
import { RouterApiSpec } from './router/types';

abstract class ModuleDefaultClass {
  public abstract init(app: express.Express, args?: any): void
}

abstract class ControllerDefaultClass {
  public abstract get default(): { [x: string]: (api: RouterApiSpec) => Function }
}

export { ModuleDefaultClass, ControllerDefaultClass }