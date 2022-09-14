import path from 'path';
import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';

class ExpressApp {
  private readonly _instance: express.Express;

  constructor() {
    this._instance = this.init();
  }

  get instance() {
    return this._instance
  }

  private init() {
    const app = express();

    app.use(helmet());
    app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(express.static(path.join(__dirname, '../../src/public')));
  
    return app;
  }
}

export default new ExpressApp();
