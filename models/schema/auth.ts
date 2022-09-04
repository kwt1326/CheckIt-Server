import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  key: { type: String, required: true }, // password
  test: { type: String, require: false }
},
{
  timestamps: true,
})

export default authSchema;