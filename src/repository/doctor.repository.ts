import { AuthModel, DoctorModel } from "../models";

class DoctorRepository {
  private async getDoctorList() {
    const doctorList = await DoctorModel.find();
    return doctorList;
  }

  private async getDoctorDetail(id: string) {
    const doctor = await DoctorModel.findById(id).populate('doctor_images');
    return doctor;
  }

  get default() {
    return {
      getDoctorList: this.getDoctorList,
      getDoctorDetail: this.getDoctorDetail,
    }
  }
}

export default DoctorRepository;