import path from 'path';
import * as express from "express"
import { ApiSpec, RouterParams } from "./types";

/**
 * @description json schema router module - API 스펙을 파싱하여 경로를 라우팅합니다.
 * @param req 
 * @param res 
 * @returns 
 */
const router = ({
  schema,
  handler
}: RouterParams) => (request: express.Request, response: express.Response) => {
  const spec = Object.entries(schema).find(([, _spec]: [string, ApiSpec]) => _spec.url === request.url);

  if (!spec) return response.end();

  return handler({ request, response, key: spec[0], spec: spec[1] });
}

export default router;
