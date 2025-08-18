// create-user.dto.ts
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsBoolean()
  isVerified: boolean;

  @IsString()
  matricule: string;

  @IsString()
  @IsEmail()
  email: string;

  @MinLength(6)
  @IsString()
  hashPassword: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsDate()
  dateOfBirth: Date;

  @IsString()
  sex: string;

  @IsString()
  telephone: string;

  @IsString()
  emergencyContact: string;

  @IsInt()
  height: number;

  @IsInt()
  pound: number;

  @IsString()
  bloodGroup: string;

  @IsString()
  specialty: string;
}
