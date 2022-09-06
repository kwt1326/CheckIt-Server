import path from 'path';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import serverRun from './framework/server';
import routerModule from './framework/modules/router';
import { RouterHandlerParams } from './framework/modules/router/types';
import { createModel } from './models';

const apiSchemaJson = require(path.join(__dirname, 'public/json/api.json'));
const apiSchema = Object.freeze(apiSchemaJson);

dotenv.config();
const { MONGO_DB_URI, NODE_ENV } = process.env;
const mongoUrl = NODE_ENV === 'development' ? 'mongodb://localhost:27017/checkit' : MONGO_DB_URI || '';

const routerModuleHandler = (params: RouterHandlerParams) => {
  const { request, response, key, spec } = params;
  
}

createModel();

mongoose
  .connect(mongoUrl, { retryWrites: true })
  .then(() => console.log('successfully connect mongo db'))
  .catch((e: any) => { console.error(e); console.log('failed db connection') });

serverRun('express', { modules: [routerModule({ schema: apiSchema, handler: routerModuleHandler })] });
