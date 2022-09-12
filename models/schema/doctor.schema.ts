import mongoose, { Schema } from "mongoose";

const doctorSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  
  doctor_id: { type: String, required: true },
  available_hours: { type: String, default: '' },
  available_weekday: { type: String, default: '' },
  description: { type: String, default: '' },
  doctor_display_name: { type: String, default: '' },
  doctor_image_url: { type: String, default: '', },
  doctor_images: [{ type: String, default: '' }],
  doctor_tel: { type: String, default: '', },
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
},
{
  timestamps: true,
});

export default mongoose.model('Doctor', doctorSchema);

// const doctor = {
//   "doctor_id": "test",
//   "available_hours": "언제든 가능합니다.",
//   "available_weekday": "아무때나 진료 가능.",
//   "description": "안녕하세요!?",
//   "doctor_display_name": "윈터",
//   "doctor_image_url": "https://photo.newsen.com/mphoto/2022/06/24/202206241807463510_1.jpg",
//   "doctor_images": JSON.stringify([{ "type": 1, "url": "https://photo.newsen.com/mphoto/2022/06/24/202206241807463510_1.jpg" }]),
//   "doctor_tel": "01023456789",
//   "hospital_addr": "서울특별시 성동구 왕십리로 83-21 에스엠엔터테인먼트",
//   "hospital_name": "SM 엔터테인먼트",
//   "lab_addr": "서울특별시 성동구 왕십리로 83-21 에스엠엔터테인먼트",
//   "lab_name": "SM 엔터테인먼트",
//   "lab_postal_code": "123456",
//   "lab_receiver_name": "윈터",
//   "lab_tel": "01023456789",
//   "lat": "37.5443766",
//   "lng": "127.043793",
//   "professional_statement": "음반, 기획",
//   "subjects": "에스파"
// }