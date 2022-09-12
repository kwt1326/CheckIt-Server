import * as express from 'express';

abstract class ModuleDefaultClass {
  public abstract init(app: express.Express): void
}

export { ModuleDefaultClass }