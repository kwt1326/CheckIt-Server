import { SignUpDto } from "../dto";
import { AuthModel } from "../models";

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