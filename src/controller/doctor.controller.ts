import * as express from 'express';
import { ControllerDefaultClass, ResponseData, RouterApiSpec } from '../../framework/modules';
import { DoctorModel } from '../models';

class DoctorController implements ControllerDefaultClass {
  constructor() {}

  private doctor(api: RouterApiSpec) {
    return (req: express.Request, res: express.Response) => {
      const responseType: ResponseData = api.response;
      const jsonResult = responseType.success.json;

      jsonResult.data.doctors = DoctorModel.find();

      res.status(responseType.success.statusCode).json(jsonResult);
    }
  }

  private doctorList(api: RouterApiSpec) {
    return (req: express.Request, res: express.Response) => {
      const responseType: ResponseData = api.response;
      const jsonResult = responseType.success.json;

      jsonResult.data.doctors = DoctorModel.find();

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