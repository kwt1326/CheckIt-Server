import { DoctorRepository } from "../repository";

class DoctorService {
  constructor() {}

  private doctorList() {
    const repository = new DoctorRepository().default;
    return repository.getDoctorList();
  }

  private doctor(id: number) {
    const repository = new DoctorRepository().default;
    return repository.getDoctorDetail(id);
  }

  get default() {
    return {
      doctorList: this.doctorList,
      doctor: this.doctor,
    }
  }
}

export default DoctorService;