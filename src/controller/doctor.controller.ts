import * as express from 'express';
import createError from 'http-errors';

import { ControllerDefaultClass, LoggerModule, ResponseData, RouterApiSpec } from '../../framework/modules';
import { DoctorService } from '../service';
import { extractToken } from '../util/extractToken';

class DoctorController implements ControllerDefaultClass {
  constructor() {}

  private doctor(api: RouterApiSpec) {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      LoggerModule.printLog(api.description || '');
      
      if (api.method === 'get') {
        const service = new DoctorService().default;
        const responseType: ResponseData = api.response;
        const jsonResult = responseType.success.json;
        const token = extractToken(req);
        
        if (!token) return next(createError(401));

        const { doctor_id } = req.query;
  
        if (typeof doctor_id === 'string') {
          jsonResult.data.doctor = await service.doctor(doctor_id);
    
          return res.status(responseType.success.statusCode).json(jsonResult);
        }
        return next(createError(400));
      }
      return next(createError(404));
    }
  }

  private doctorList(api: RouterApiSpec) {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
      const service = new DoctorService().default;

      if (api.method === 'get') {
        const responseType: ResponseData = api.response;
        const jsonResult = responseType.success.json;
        const token = extractToken(req);
  
        if (!token) return next(createError(401));
  
        jsonResult.data.doctors = await service.doctorList(token);
  
        return res.status(responseType.success.statusCode).json(jsonResult);
      }
      return next(createError(404));
    }
  }

  get default() {
    return {
      doctor: this.doctor,
      doctorList: this.doctorList,
    }
  }
}

export default DoctorController;