import * as express from 'express';
import createError from 'http-errors';

import { ControllerDefaultClass, LoggerModule, ResponseData, RouterApiSpec } from '../../framework/modules';
import { RequestData } from '../../framework/modules/router/types';
import { AuthService } from '../service';
import { validator } from '../util/validator';
import { extractToken } from '../util/extractToken';

class AuthController implements ControllerDefaultClass {
  constructor() {}

  private signup(api: RouterApiSpec) {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      LoggerModule.printLog(api.description || '');

      const service = new AuthService().default;

      if (api.method === 'post') {
        const responseType: ResponseData = api.response;
        const bodyType: RequestData = api.body;
        const body = req.body;

        const validateResult = validator(body, bodyType);

        if (!Array.isArray(validateResult)) {
          const result = await service.signUp(body);
          let response;
  
          if (result.status === 'success') {
            response = responseType['success'];
            response.json.data.token = result.token;
          } else if (result.status === 'fail') {
            response = responseType['fail'];
          } else if (result.status === 'duplicated') {
            response = responseType['duplicated'];
          }
  
          return res.status(response?.statusCode || 200).json(response?.json);
        }

        validateResult.forEach((error) => {
          LoggerModule.printLog(error);
        });
        return next(createError(400));
      }
      return next(createError(404));
    }
  }

  private signin(api: RouterApiSpec) {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      LoggerModule.printLog(api.description || '');

      const service = new AuthService().default;

      if (api.method === 'post') {
        const responseType: ResponseData = api.response;
        const bodyType: RequestData = api.body;
        const body = req.body;

        const validateResult = validator(body, bodyType);

        if (!Array.isArray(validateResult)) {
          const result = await service.signIn(body);
          let response;
  
          if (result.status === 'success') {
            response = responseType['success'];
            response.json.data.token = result.token;
          } else if (result.status === 'fail') {
            response = responseType['fail'];
          } else if (result.status === 'nouser') {
            response = responseType['nouser'];
          }
  
          return res.status(response?.statusCode || 200).json(response);
        }

        validateResult.forEach((error) => {
          LoggerModule.printLog(error);
        });
        return next(createError(400));
      }
      return next(createError(404));
    }
  }

  private withdrawal(api: RouterApiSpec) {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      const service = new AuthService().default;

      if (api.method === 'post') {
        const responseType: ResponseData = api.response;
        const token = extractToken(req);

        if (!token) return next(createError(401));

        const result = await service.withDrawal(token);

        if (result.status === 'ok') {
          return res.status(responseType.ok.statusCode).json(responseType.ok.json);
        }
        return res.status(200).json({ status: 'fail' });
      }
      return next(createError(404));
    }
  }

  get default() {
    return {
      signin: this.signin,
      signup: this.signup,
      withdrawal: this.withdrawal,
    }
  }
}

export default AuthController;