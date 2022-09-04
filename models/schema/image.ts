import mongoose, { Schema } from "mongoose";

const imageSchema = new mongoose.Schema({
  type: { type: String, require: true },
  url: { type: String, require: true },
  doctorId: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  }
});

export default imageSchema;
