import mongoose, { Schema } from "mongoose";

const doctorSchema = new mongoose.Schema({
  doctor_id: { type: String, required: true },
  available_hours: { type: String, default: '' },
  available_weekday: { type: String, default: '' },
  description: { type: String, default: '' },
  doctor_display_name: { type: String, default: '' },
  doctor_image_url: { type: String, default: '', },
  doctor_tel: { type: String, default: '', },
  doctor_tel_kakao: { type: String, default: '', },
  hospital_addr: { type: String, required: true, },
  hospital_name: { type: String, required: true, },
  hospital_img: { type: String, required: true, },
  lab_addr: { type: String, default: '', },
  lab_name: { type: String, default: '', },
  lab_postal_code: { type: String, default: '', },
  lab_receiver_name: { type: String, default: '', },
  lab_tel: { type: String, default: '', },
  lat: { type: String, required: true, },
  lng: { type: String, required: true, },
  professional_statement: { type: String, default: '', },
  subjects: { type: String, default: '', },

  doctor_images: [{ type: Schema.Types.ObjectId, ref: 'Images' }],
},
{
  timestamps: true,
});

export default mongoose.model('Doctor', doctorSchema);
