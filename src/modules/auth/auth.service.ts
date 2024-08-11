import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import * as bycrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async register({ name, email, password }: RegisterDto) {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      throw new BadRequestException('User already exists');
    }

    const newUser = await this.usersService.create({
      name,
      email,
      password: await bycrypt.hash(password, 10),
    });

    return {
      ...newUser,
    };
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email is wrong');
    }

    const isPasswordValid = await bycrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Password is wrong');
    }

    const payload = {
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      token,
      email,
    };

    /*     return {
      name: user.name,
      email: user.email,
      // TODO: check why not is possible enter user, example: return {...user}
    }; */
  }
}
