import * as express from 'express';
import { ControllerDefaultClass, RouterApiSpec } from '../../framework/modules';

class TestController implements ControllerDefaultClass {
  constructor() {}

  private test(api: RouterApiSpec) {
    return async (req: express.Request, res: express.Response) => {
      const responseType = api.response.ok;
      res.status(responseType?.statusCode || 200).send(responseType?.json);
    }
  }

  get default() {
    return {
      test: this.test
    }
  }
}

export default TestController;