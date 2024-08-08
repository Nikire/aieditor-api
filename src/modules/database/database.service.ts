import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from '../users/dto/user.dto';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async createUser(createUserDto: CreateUserDto) {
    return this.user.create({
      data: createUserDto,
    });
  }
}
