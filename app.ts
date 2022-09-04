import path from 'path';
import createError, { HttpError } from 'http-errors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import { router } from './routes/index';
import { createModel } from './models';

dotenv.config();
const { MONGO_DB_URI, NODE_ENV } = process.env;
const mongoUrl = NODE_ENV === 'development' ? 'mongodb://localhost:27017/checkit' : MONGO_DB_URI || '';

createModel();

mongoose
  .connect(mongoUrl, { retryWrites: true })
  .then(() => console.log('successfully connect mongo db'))
  .catch((e: any) => { console.error(e); console.log('failed db connection') });

const db = mongoose.connection;

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(router);

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

export default app;
