import path from 'path';
import createError, { HttpError } from 'http-errors';
import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import { AppProps } from './types';

interface ExpressAppProps extends AppProps {}

function expressApp(options: ExpressAppProps) {
  const { modules } = options;

  const app = express();
  
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  for (const module of modules) {
    app.use(module);
  }
  
  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err: HttpError, req: express.Request, res: express.Response, next: express.NextFunction) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.send({ 'error': err.message });
  });

  return app;
}

export default expressApp;
