import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 3,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
  })
  password: string;
}
