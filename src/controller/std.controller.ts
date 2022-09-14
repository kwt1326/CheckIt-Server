import * as express from 'express';
import createError from 'http-errors';

import { ControllerDefaultClass, LoggerModule, ResponseData, RouterApiSpec } from '../../framework/modules';
import { RequestData } from '../../framework/modules/router/types';
import { validator } from '../util/validator';
import { extractToken } from '../util/extractToken';

class StdController implements ControllerDefaultClass {
  constructor() {}

  private register(api: RouterApiSpec) {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      LoggerModule.printLog(api.description || '');

      if (api.method === 'post') {
        const responseType: ResponseData = api.response;
        const token = extractToken(req);

        if (!token) return next(createError(401));

        const bodyType: RequestData = api.body;
        const body = req.body;

        const validateResult = validator(body, bodyType);

        // body 값이 유효하면 성공 처리
        if (validateResult) {
          const response = responseType.success;
          return res.status(response?.statusCode || 200).json(response?.json);
        }

        // body validate 통과하지 못하면 실패 처리
        const response = responseType.fail;
        return res.status(response?.statusCode || 200).json(response?.json);
      }
      return next(createError(404));
    }
  }

  get default() {
    return {
      register: this.register,
    }
  }
}

export default StdController;