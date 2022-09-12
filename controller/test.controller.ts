import * as express from 'express';
import { RouterApiSpec } from '../framework/modules';

class Test {
  constructor() {}

  private test(api: RouterApiSpec) {
    return (req: express.Request, res: express.Response) => {
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

export default Test;