import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { CreateUserDto } from 'src/modules/users/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  register(
    @Body()
    registerDto: CreateUserDto,
  ) {
    return this.authService.register(registerDto);
  }

  @Post('sign-in')
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }
}
