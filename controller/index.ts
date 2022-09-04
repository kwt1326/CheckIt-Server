import post from './post';
import get from './get';
import { ControllerParams } from './types';

export default {
  post,
  get,
} as { [method: string]: (params: ControllerParams) => any }