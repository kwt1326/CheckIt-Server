import * as express from 'express';
import { ApiSpec } from '../routes/types';

interface ControllerParams {
  req: express.Request;
  res: express.Response;
  spec: ApiSpec;
}

type Method = 'get' | 'post';

export type { ControllerParams, Method }