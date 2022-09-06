import * as express from 'express';

type Method = 'get' | 'post';

type ResponseData = {
  [x: string]: {
    statusCode: number;
    json: any;
  }
}

interface RouterHandlerParams { request: express.Request; response: express.Response; key: string; spec: ApiSpec }

interface RouterParams {
  schema: { [key: string]: ApiSpec }
  handler: (params: RouterHandlerParams) => void;
}

interface ApiSpec {
  method: Method;
  url: string;
  response: Partial<ResponseData>;
  body?: any;
  description?: string;
  headers?: { Authorization: string };
}

export type { Method, ApiSpec, RouterHandlerParams, RouterParams }