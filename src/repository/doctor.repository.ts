import { AuthModel, DoctorModel } from "../models";

class DoctorRepository {
  private async getDoctorList() {
    const doctorList = await DoctorModel.find();
    return doctorList;
  }

  private async getDoctorDetail(id: number) {
    const user = await AuthModel.findById(id);
    if (user) {
      const doctorId = user.doctor?._id;
      if (doctorId) {
        const doctor = await DoctorModel.findById(doctorId).populate('doctor_images');
        return doctor;
      }
    }
    return null;
  }

  get default() {
    return {
      getDoctorList: this.getDoctorList,
      getDoctorDetail: this.getDoctorDetail,
    }
  }
}

export default DoctorRepository;