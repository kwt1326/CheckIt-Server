import * as express from 'express';
import { UseLogger, Log } from "../framework/decorators";
import { RouterApiSpec } from '../framework/modules';
import { ResponseData } from '../framework/modules/router/types';
import { DoctorModel } from '../models';

@UseLogger
class Doctor {
  constructor() { }

  @Log
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
      doctorList: this.doctorList,
    }
  }
}

export default Doctor;