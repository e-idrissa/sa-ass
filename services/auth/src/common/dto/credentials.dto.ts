// update-password.dto.ts
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CredentialsDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @MinLength(6)
  @IsString()
  passwordHash: string;
}
