import { IsEmail, IsNotEmpty } from 'class-validator';

export class VerifyRequestDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class VerifyResponseDto {
  code: number;
  message: string;
  result: {
    verificationLink: string;
  } | null;
}
