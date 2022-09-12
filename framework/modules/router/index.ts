import * as express from "express"
import { RouterApiSpec, RouterHandlerParams, RouterProps } from "./types";

class RouterModule {
  private schema: { [x: string]: RouterApiSpec } = {};
  private handler = (params: RouterHandlerParams) => {};

  constructor({ path, handler }: RouterProps) {
    const apiSchemaJson = require(path);
    const apiSchema = Object.freeze(apiSchemaJson);

    this.schema = apiSchema;
    this.handler = handler;
  }

  /**
   * @description json schema router module - API 스펙을 파싱하여 경로를 라우팅합니다.
   */
  route(url: string, request: express.Request, response: express.Response) {
    const spec = Object.entries(this.schema).find(([, _spec]: [string, RouterApiSpec]) => _spec.url === url);
    if (spec) {
      this.handler({ request, response, key: spec[0], spec: spec[1] });
    }
  }
}

export { RouterModule };
