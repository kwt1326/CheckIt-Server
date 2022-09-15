import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { LoggerModule } from '../../framework/modules';
import { SignInDto, SignUpDto } from "../dto";
import { AuthRepository } from "../repository";
import { verifyToken } from '../util/verifyToken';

class AuthService {
  constructor() {}

  private async signIn(dto: SignInDto) {
    const repository = new AuthRepository().default;

    const secret = process.env.JWT_SECRET;
    const user = await repository.findUserByEmail(dto.email);

    if (!user) {
      return { status: 'nouser', token: undefined };
    }

    const isEqual = await bcrypt.compare(dto.key, user.key);

    if (!secret || !isEqual) {
      return { status: 'fail', token: undefined };
    }

    const token = jsonwebtoken.sign({ id: user._id }, secret);
    return { status: 'success', token };
  }

  private async signUp(dto: SignUpDto) {
    const repository = new AuthRepository().default;

    const secret = process.env.JWT_SECRET;
    const hashedPassword = await bcrypt.hash(dto.key, 10);

    if (await repository.checkDuplicateEmail(dto.email)) {
      return { status: 'duplicated', token: undefined }
    }
    const user = await repository.createUser({ ...dto, key: hashedPassword });
    if (!user || !secret) {
      return { status: 'fail', token: undefined };
    }

    const token = jsonwebtoken.sign({ id: user._id }, secret);
    return { status: 'success', token };
  }

  private async withDrawal(token: string) {
    const repository = new AuthRepository().default;

    try {
      const id = verifyToken(token);
      if (id) {
        const isDeleted = await repository.deleteUser(id);
        return isDeleted ?
          { status: 'ok', message: '회원탈퇴가 완료되었습니다.' } :
          { status: 'fail', message: '회원탈퇴에 실패했습니다.' };
      }
    } catch (error) {
      LoggerModule.printLog(JSON.stringify(error));
      return { status: 'fail', message: '유효하지 않거나 만료된 토큰입니다.' };
    }
    return { status: 'fail', message: '유효하지 않거나 만료된 토큰입니다.' };
  }

  get default() {
    return {
      signIn: this.signIn,
      signUp: this.signUp,
      withDrawal: this.withDrawal,
    }
  }
}

export default AuthService;