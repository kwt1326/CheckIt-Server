import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import Framework from '../framework';
import { RouterModule, LoggerModule, ErrorBoundaryModule } from '../framework/modules';
import { AuthController, DoctorController, StdController, TestController } from './controller';

dotenv.config();
const { MONGO_DB_URI, NODE_ENV } = process.env;
const mongoUrl = NODE_ENV === 'development' ? 'mongodb://localhost:27017/checkit' : MONGO_DB_URI || '';

mongoose
  .connect(mongoUrl, { retryWrites: true })
  .then(() => console.log('successfully connect mongo db'))
  .catch((e: any) => { console.error(e); console.log('failed db connection') });

LoggerModule.options = { level: 'warn' };

const framework = new Framework({
  serverProps: {
    port: 3000,
  },
  appProps: {
    modules: {
      router: new RouterModule({ path: path.join(__dirname, 'public/json/api.json'), routeFunctions: {
        ...(new AuthController()).default,
        ...(new DoctorController()).default,
        ...(new StdController()).default,
        ...(new TestController()).default,
      } }),
      errorBoundary: new ErrorBoundaryModule(),
    }
  }
});

framework.run();
