import mongoose, { Schema } from "mongoose";

const imageSchema = new mongoose.Schema({
  type: { type: Number, require: true },
  url: { type: String, require: true },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
  }
});

export default mongoose.model('Images', imageSchema);
