export class CreateUserDto {
  uid?: string;
  name: string;
  email: string;
  password: string;
}
export class UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
}
