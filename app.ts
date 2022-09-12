import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import Framework from './framework';
import { RouterModule, LoggerModule } from './framework/modules';

import Doctor from './controller/doctor.controller';
import Test from './controller/test.controller';
import makeDoctorData from './inputModel';

dotenv.config();
const { MONGO_DB_URI, NODE_ENV } = process.env;
const mongoUrl = NODE_ENV === 'development' ? 'mongodb://localhost:27017/checkit' : MONGO_DB_URI || '';

mongoose
  .connect(mongoUrl, { retryWrites: true })
  .then(() => console.log('successfully connect mongo db'))
  .catch((e: any) => { console.error(e); console.log('failed db connection') });

makeDoctorData();

const framework = new Framework({
  serverProps: {
    port: 3000,
    type: 'express',
  },
  appProps: {
    modules: {
      router: new RouterModule({ path: path.join(__dirname, 'public/json/api.json'), routeFunctions: {
        ...(new Doctor().default),
        ...(new Test().default)
      } }),
      logger: new LoggerModule({ options: {} }),
    }
  }
});

framework.run();
