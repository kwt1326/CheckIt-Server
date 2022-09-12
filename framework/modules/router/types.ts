import * as express from 'express';
import { ModuleDefaultProps } from '../types';

type ResponseData = {
  [x: string]: {
    statusCode: number;
    json: any;
  }
}

interface RouterHandlerParams { request: express.Request; response: express.Response; key: string; spec: RouterApiSpec }

interface RouterProps extends ModuleDefaultProps {
  path: string;
  routeFunctions: { [x: string]: any };
}

interface RouterApiSpec {
  method: 'get' | 'post';
  url: string;
  response: ResponseData;
  body?: any;
  description?: string;
  headers?: {
    Authorization: {
      type: string;
      required: boolean;
      description: string;
    }
  };
}

export type { RouterApiSpec, RouterHandlerParams, RouterProps, ResponseData }