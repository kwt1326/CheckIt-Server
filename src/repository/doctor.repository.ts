import { DoctorModel } from "../models";

class DoctorRepository {
  private getDoctorList() {
    return DoctorModel.find().populate('');
  }

  private getDoctorDetail(id: number) {
    return DoctorModel.findById(id);
  }

  get default() {
    return {
      getDoctorList: this.getDoctorList,
      getDoctorDetail: this.getDoctorDetail,
    }
  }
}

export default DoctorRepository;