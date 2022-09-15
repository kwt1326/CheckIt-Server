import { LoggerModule } from '../../framework/modules';
import { DoctorRepository } from "../repository";
import { verifyToken } from '../util/verifyToken';

class DoctorService {
  constructor() {}

  private async doctorList(token: string) {
    const repository = new DoctorRepository().default;

    try {
      const id = verifyToken(token);
      if (id) {
        const doctors = await repository.getDoctorList();
        const result = doctors.map((doctor: any) => ({
          id: doctor.id,
          doctor_display_name: doctor.doctor_display_name,
          doctor_image_url: doctor.doctor_image_url,
          hospital_name: doctor.hospital_name,
          hospital_address: doctor.hospital_address,
          description: doctor.description,
          hospital_img: doctor.hospital_img,
        }));

        return result;
      }
    } catch (error) {
      LoggerModule.printLog(JSON.stringify(error));
      return null;
    }
    return null;
  }

  private async doctor(id: number) {
    const repository = new DoctorRepository().default;

    try {
      if (id) {
        const doctor = await repository.getDoctorDetail(id);
        if (doctor) {
          const parsedDoctor = {
            available_hours: doctor.available_hours,
            available_weekday: doctor.available_weekday,
            description: doctor.description,
            doctor_display_name: doctor.doctor_display_name,
            doctor_image_url: doctor.doctor_image_url,
            doctor_tel: doctor.doctor_tel,
            doctor_tel_kakao: doctor.doctor_tel_kakao,
            hospital_addr: doctor.hospital_addr,
            hospital_name: doctor.hospital_name,
            lab_addr: doctor.lab_addr,
            lab_name: doctor.lab_name,
            lab_postal_code: doctor.lab_postal_code,
            lab_receiver_name: doctor.lab_receiver_name,
            lab_tel: doctor.lab_tel,
            lat: doctor.lat,
            lng: doctor.lng,
            professional_statement: doctor.professional_statement,
            subjects: doctor.subjects,
            doctor_images: JSON.stringify(doctor?.doctor_images.map((image: any) => ({ type: image.type, url: image.url }))),
          }
          return parsedDoctor;
        }
      }
    } catch (error) {
      LoggerModule.printLog(JSON.stringify(error));
      return null;
    }
    return null;
  }

  get default() {
    return {
      doctorList: this.doctorList,
      doctor: this.doctor,
    }
  }
}

export default DoctorService;