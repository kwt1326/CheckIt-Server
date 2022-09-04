import mongoose from 'mongoose';
import authSchema from './schema/auth';
import doctorSchema from './schema/doctor';
import imageSchema from './schema/image';

function createModel() {
  mongoose.model('Auth', authSchema);
  mongoose.model('Doctor', doctorSchema);
  mongoose.model('Images', imageSchema);
}

export { createModel }
