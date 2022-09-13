import { DoctorRepository } from "../repository";

class DoctorService {
  private readonly _repository;

  constructor() {
    this._repository = new DoctorRepository();
  }

  private doctorList() {
    return this._repository.default.getDoctorList();
  }

  private doctor() {
    return this._repository.default.getDoctorDetail();
  }

  get default() {
    return {
      doctorList: this.doctorList,
      doctor: this.doctor,
    }
  }
}

export default DoctorService;