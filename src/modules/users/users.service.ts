import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private database: DatabaseService) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.database.createUser(createUserDto);
      return {
        ...newUser,
        id: newUser.id.toString(),
        createdAt: newUser.createdAt.toISOString(),
        updatedAt: newUser.updatedAt.toISOString(),
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async findAll() {
    const users = await this.database.user.findMany();
    return users.map((user) => ({
      ...user,
      id: user.id.toString(),
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    }));
  }

  async findOne(uid: string) {
    const user = await this.database.user.findUnique({
      where: { uid },
    });
    if (!user) {
      throw new NotFoundException(`User #${uid} not found`);
    }
    return {
      ...user,
      id: user.id.toString(),
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }

  async update(uid: string, updateUserDto: UpdateUserDto) {
    if (!uid) {
      throw new NotFoundException(`User #${uid} not found`);
    }
    const existingUser = await this.database.user.findUnique({
      where: { uid },
    });

    if (!existingUser) {
      throw new NotFoundException(`User #${uid} not found`);
    }

    const updatedUser = await this.database.user.update({
      where: { uid },
      data: updateUserDto,
    });
    return {
      ...updatedUser,
      id: updatedUser.id.toString(),
      createdAt: updatedUser.createdAt.toISOString(),
      updatedAt: updatedUser.updatedAt.toISOString(),
    };
  }

  async remove(uid: string) {
    if (!uid) {
      throw new NotFoundException(`User #${uid} not found`);
    }
    const existingUser = await this.database.user.findUnique({
      where: { uid },
    });
    if (!existingUser) {
      throw new NotFoundException(`User #${uid} not found`);
    }
    await this.database.user.delete({ where: { uid } });
    return { message: `User deleted successfully` };
  }
}
