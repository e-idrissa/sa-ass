// update-password.dto.ts
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class User {
  @IsString()
  sub: string;

  @IsString()
  role: string;

  @IsString()
  email: string;

  @IsString()
  passwordHash: string;
}

export class UserResponseDto {
  @IsNotEmpty()
  @IsInt()
  code: number;

  @IsNotEmpty()
  @IsString()
  message: string;

  @Type(() => User)
  result: User | null;
}
