import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MaxLength(20)
  @IsStrongPassword({
    minLength: 3,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
  })
  password: string;
}
export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @MaxLength(20)
  @IsStrongPassword({
    minLength: 3,
    minLowercase: 1,
    minNumbers: 1,
    minUppercase: 1,
  })
  password?: string;
}
