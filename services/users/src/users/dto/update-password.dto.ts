// create-user.dto.ts
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @MinLength(6)
  @IsString()
  newPassword: string;
}
