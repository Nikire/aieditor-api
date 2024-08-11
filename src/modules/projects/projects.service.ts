import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto, UpdateProjectDto } from './dto/projects.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ProjectsService {
  constructor(private databaseService: DatabaseService) {}
  async create(createProjectDto: CreateProjectDto) {
    const owner = await this.databaseService.user.findFirst({
      where: { uid: createProjectDto.userUuid },
    });
    console.log(owner);
    const newProject = await this.databaseService.project.create({
      data: {
        name: createProjectDto.name,
        description: createProjectDto.description,
        settings: JSON.stringify(createProjectDto.settings),
        owner: { connect: { id: owner.id } },
      },
    });
    return {
      ...newProject,
    };
  }

  async findAll(userUuid: string) {
    const allProjects = await this.databaseService.project.findMany({
      where: { owner: { uid: userUuid } },
    });
    return allProjects;
  }

  async findOne(uuid: string, userUuid: string) {
    const project = await this.databaseService.project.findFirst({
      where: { uid: uuid, owner: { uid: userUuid } },
    });
    return project;
  }

  async update(uuid: string, updateProjectDto: UpdateProjectDto) {
    const updatedProject = await this.databaseService.project.update({
      where: { uid: uuid, owner: { uid: updateProjectDto.userUuid } },
      data: {
        name: updateProjectDto.name,
        description: updateProjectDto.description,
        settings: JSON.stringify(updateProjectDto.settings),
      },
    });
    return updatedProject;
  }

  async remove(uuid: string, userUuid: string) {
    await this.databaseService.project.delete({
      where: { uid: uuid, owner: { uid: userUuid } },
    });
    return { message: 'Project deleted successfully' };
  }
}
