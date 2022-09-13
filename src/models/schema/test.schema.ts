import mongoose, { Schema } from "mongoose";

const testSchema = new mongoose.Schema({
  type: { type: String, require: true },
  url: { type: String, require: true },
});

export default mongoose.model('TEST', testSchema);
