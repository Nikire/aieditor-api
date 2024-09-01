import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { Auth } from '../shared/modules/auth/decorators/auth.decorator';

@Controller('users')
@Auth(['USER'])
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Auth(['ADMIN'])
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':uid')
  findOne(@Param('uid') uid: string) {
    return this.usersService.findOne(uid);
  }

  @Put(':uid')
  update(@Param('uid') uid: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(uid, updateUserDto);
  }

  @Delete(':uid')
  @Auth(['SUPER_ADMIN'])
  remove(@Param('uid') uid: string) {
    return this.usersService.remove(uid);
  }
}
