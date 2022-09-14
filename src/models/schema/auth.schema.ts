import mongoose, { Schema } from "mongoose";

const authSchema = new mongoose.Schema({
  email: { type: String, required: true },
  key: { type: String, required: true }, // password
  name: { type: String, required: false },
  doctor: { type: Schema.Types.ObjectId, ref: "Doctor" },
},
{
  timestamps: true,
})

export default mongoose.model('Auth', authSchema);