import { Controller, UseLogger, Log } from "../framework/decorators";

@UseLogger
@Controller('/v3/doctor')
class Doctor {
  constructor() {}

  @Log
  getDoctors() {
    
  }
}

export default Doctor;
console.log(Doctor);