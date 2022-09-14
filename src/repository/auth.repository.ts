import { SignUpDto } from "../dto";
import { AuthModel, DoctorModel, ImagesModel } from "../models";

class AuthRepository {
  constructor() {}

  private async checkDuplicateEmail(email: string) {
    return Boolean(await AuthModel.findOne({ email }));
  }

  private async findUserByEmail(email: string) {
    return (await AuthModel.findOne({ email }));
  }

  private async createUser(dto: SignUpDto) {
    const user = await AuthModel.create(dto);

    const doctor = new DoctorModel({
      doctor_id: `test-${user.id}`,
      available_hours: "언제든 가능합니다.",
      available_weekday: "아무때나 진료 가능.",
      description: "안녕하세요!?",
      doctor_display_name: `윈터-${user.id}`,
      doctor_image_url: "https://photo.newsen.com/mphoto/2022/06/24/202206241807463510_1.jpg",
      doctor_tel: "01023456789",
      doctor_tel_kakao: "01023456789",
      hospital_addr: "서울특별시 성동구 왕십리로 83-21 에스엠엔터테인먼트",
      hospital_name: "SM 엔터테인먼트",
      hospital_img: "https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20210809_254%2F1628490646641wLE0B_JPEG%2FOYFVJ_qgIB14KM3Zz8AIhJxF.jpg",
      lab_addr: "서울특별시 성동구 왕십리로 83-21 에스엠엔터테인먼트",
      lab_name: "SM 엔터테인먼트",
      lab_postal_code: "123456",
      lab_receiver_name: `윈터-${user.id}`,
      lab_tel: "01023456789",
      lat: "37.5443766",
      lng: "127.043793",
      professional_statement: "음반, 기획",
      subjects: "에스파",
    });
    const doctorImages = new ImagesModel({
      type: 1,
      url: 'https://photo.newsen.com/mphoto/2022/06/24/202206241807463510_1.jpg',
    });
    const doctorImages2 = new ImagesModel({
      type: 1,
      url: 'https://photo.newsen.com/mphoto/2022/06/24/202206241807463510_1.jpg',
    });

    doctorImages.doctor = doctor.id;
    doctorImages2.doctor = doctor.id;
    doctor.doctor_images.push(doctorImages.id);
    doctor.doctor_images.push(doctorImages2.id);
    user.doctor = doctor.id;

    await user.save();
    await doctor.save();
    await doctorImages.save();
    await doctorImages2.save();
    return user;
  }

  private async deleteUser(id: number) {
    const result = await AuthModel.deleteOne({ _id: id });
    return result.acknowledged;
  }

  get default() {
    return {
      findUserByEmail: this.findUserByEmail,
      createUser: this.createUser,
      deleteUser: this.deleteUser,
      checkDuplicateEmail: this.checkDuplicateEmail,
    }
  }
}

export default AuthRepository;