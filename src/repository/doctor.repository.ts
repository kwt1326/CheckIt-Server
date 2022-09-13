import { DoctorModel } from "../models";

class DoctorRepository {
  private getDoctorList() {
    return DoctorModel.find();
  }

  private getDoctorDetail() {
    return DoctorModel.findById(0);
  }

  get default() {
    return {
      getDoctorList: this.getDoctorList,
      getDoctorDetail: this.getDoctorDetail,
    }
  }
}

export default DoctorRepository;