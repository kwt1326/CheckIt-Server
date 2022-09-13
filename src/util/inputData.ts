import mongoose from "mongoose";
import { DoctorModel, ImagesModel } from "../models";

/**
 * @description 몽고 DB 에 테스트 데이터를 넣기 위한 함수 입니다. 관계를 고려한 데이터 인풋 입니다.
 */
export async function makeDoctorData() {
  for (let i = 0; i < 51; ++i) {
    const doctor = new DoctorModel({
      _id: new mongoose.Types.ObjectId(),
      "doctor_id": `test-${i}`,
      "available_hours": "언제든 가능합니다.",
      "available_weekday": "아무때나 진료 가능.",
      "description": "안녕하세요!?",
      "doctor_display_name": `윈터-${i}`,
      "doctor_image_url": "https://photo.newsen.com/mphoto/2022/06/24/202206241807463510_1.jpg",
      "doctor_images": JSON.stringify([{ "type": 1, "url": "https://photo.newsen.com/mphoto/2022/06/24/202206241807463510_1.jpg" }]),
      "doctor_tel": "01023456789",
      "hospital_addr": "서울특별시 성동구 왕십리로 83-21 에스엠엔터테인먼트",
      "hospital_name": "SM 엔터테인먼트",
      "hospital_img": "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20210809_254%2F1628490646641wLE0B_JPEG%2FOYFVJ_qgIB14KM3Zz8AIhJxF.jpg",
      "lab_addr": "서울특별시 성동구 왕십리로 83-21 에스엠엔터테인먼트",
      "lab_name": "SM 엔터테인먼트",
      "lab_postal_code": "123456",
      "lab_receiver_name": `윈터-${i}`,
      "lab_tel": "01023456789",
      "lat": "37.5443766",
      "lng": "127.043793",
      "professional_statement": "음반, 기획",
      "subjects": "에스파",
    });
    const image = new ImagesModel({
      type: 1,
      url: 'https://photo.newsen.com/mphoto/2022/06/24/202206241807463510_1.jpg',
      doctorId: doctor._id,
    });
  }
}