interface SignUpDto {
  email: string;
  key: string;
  name: string;
}

interface SignInDto {
  email: string;
  key: string;
}

export type { SignUpDto, SignInDto };