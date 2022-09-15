import * as express from 'express';
import createError, { HttpError } from 'http-errors';
import { ModuleDefaultClass } from "../common";

class ErrorBoundaryModule implements ModuleDefaultClass {
  constructor() {}

  /**
   * @description error boundary
   */
  init(app: express.Express) {
    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
      // next(createError(404));
      res.status(200).json({ error: 'Not Found' });
    });

    // error handler
    app.use(function (err: HttpError, req: express.Request, res: express.Response, next: express.NextFunction) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.send({ 'error': err.message });
    });
  }
}

export { ErrorBoundaryModule };