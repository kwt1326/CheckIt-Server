import path from 'path';
import * as express from "express"
import controller from '../controller';
import { ApiSpec } from "./types";

const json = require(path.join(__dirname, '../public/json/api.json'));
const apis = Object.freeze(json);

const router = (req: express.Request, res: express.Response) => {
  const apiValues: ApiSpec[] = Object.values(apis);
  const spec = apiValues.find((api: ApiSpec) => api.url === req.url);

  if (spec) {
    const method = spec.method;
    controller[method]({ req, res, spec });
    return res.end();
  }
  if (req.url === '/') {
    res.send('server running!');
    return res.end();
  }
  res.status(401).json({ fail: { statusCode: '401', json: 'Not found request url' } })
  return res.end();
}

export { router };
