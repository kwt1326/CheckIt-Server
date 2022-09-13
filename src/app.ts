import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import Framework from '../framework';
import { RouterModule, LoggerModule, ErrorBoundaryModule } from '../framework/modules';

import DoctorController from './controller/doctor.controller';
import TestController from './controller/test.controller';

import { makeDoctorData } from './util/inputData';

dotenv.config();
const { MONGO_DB_URI, NODE_ENV } = process.env;
const mongoUrl = NODE_ENV === 'development' ? 'mongodb://localhost:27017/checkit' : MONGO_DB_URI || '';

mongoose
  .connect(mongoUrl, { retryWrites: true })
  .then(() => console.log('successfully connect mongo db'))
  .catch((e: any) => { console.error(e); console.log('failed db connection') });

// makeDoctorData();

const framework = new Framework({
  serverProps: {
    port: 3000,
  },
  appProps: {
    modules: {
      router: new RouterModule({ path: path.join(__dirname, 'public/json/api.json'), routeFunctions: {
        ...(new DoctorController().default),
        ...(new TestController().default)
      } }),
      logger: new LoggerModule({ options: {} }),
      errorBoundary: new ErrorBoundaryModule(),
    }
  }
});

framework.run();
