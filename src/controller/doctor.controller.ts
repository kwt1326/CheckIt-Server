import * as express from 'express';
import { ControllerDefaultClass, ResponseData, RouterApiSpec } from '../../framework/modules';
import { DoctorService } from '../service';
import { extractToken } from '../util/extractToken';

class DoctorController implements ControllerDefaultClass {
  constructor() {}

  private doctor(api: RouterApiSpec) {
    return async (req: express.Request, res: express.Response) => {
      const service = new DoctorService().default;
      const responseType: ResponseData = api.response;
      const jsonResult = responseType.success.json;
      const token = extractToken(req);

      jsonResult.data.doctors = service.doctor(0);

      res.status(responseType.success.statusCode).json(jsonResult);
    }
  }

  private doctorList(api: RouterApiSpec) {
    return async (req: express.Request, res: express.Response) => {
      const service = new DoctorService().default;
      const responseType: ResponseData = api.response;
      const jsonResult = responseType.success.json;

      jsonResult.data.doctors = service.doctorList();

      res.status(responseType.success.statusCode).json(jsonResult);
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