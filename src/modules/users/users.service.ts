import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
  constructor(private databaseService: DatabaseService) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.databaseService.user.create({
        data: createUserDto,
      });

      return {
        ...newUser,
        id: newUser.id.toString(),
        createdAt: JSON.stringify(newUser.createdAt),
        updatedAt: JSON.stringify(newUser.updatedAt),
      };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async findAll() {
    const users = await this.databaseService.user.findMany();
    return users.map((user) => ({
      ...user,
      id: user.id.toString(),
      createdAt: JSON.stringify(user.createdAt),
      updatedAt: JSON.stringify(user.updatedAt),
    }));
  }

  async findOne(uid: string) {
    const user = await this.databaseService.user.findUnique({
      where: { uid },
    });
    if (!user) {
      throw new NotFoundException(`User #${uid} not found`);
    }
    return {
      ...user,
      id: user.id.toString(),
      createdAt: JSON.stringify(user.createdAt),
      updatedAt: JSON.stringify(user.updatedAt),
    };
  }

  async update(uid: string, updateUserDto: UpdateUserDto) {
    if (!uid) {
      throw new NotFoundException(`User #${uid} not found`);
    }
    const existingUser = await this.databaseService.user.findUnique({
      where: { uid },
    });

    if (!existingUser) {
      throw new NotFoundException(`User #${uid} not found`);
    }

    const updatedUser = await this.databaseService.user.update({
      where: { uid },
      data: updateUserDto,
    });
    return {
      ...updatedUser,
      id: updatedUser.id.toString(),
      createdAt: JSON.stringify(updatedUser.createdAt),
      updatedAt: JSON.stringify(updatedUser.updatedAt),
    };
  }

  async remove(uid: string) {
    if (!uid) {
      throw new NotFoundException(`User #${uid} not found`);
    }
    const existingUser = await this.databaseService.user.findUnique({
      where: { uid },
    });
    if (!existingUser) {
      throw new NotFoundException(`User #${uid} not found`);
    }
    await this.databaseService.user.delete({ where: { uid } });
    return { message: `User deleted successfully` };
  }
}
