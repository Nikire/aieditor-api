import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/projects.dto';
import { Auth } from '../shared/modules/auth/auth.decorator';

@Controller('projects')
@Auth()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    console.log(createProjectDto);
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  findAll(@Body('userUuid') userUuid: string) {
    return this.projectsService.findAll(userUuid);
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string, @Body('userUuid') userUuid: string) {
    return this.projectsService.findOne(uuid, userUuid);
  }

  @Put(':uuid')
  update(
    @Param('uuid') uuid: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return this.projectsService.update(uuid, updateProjectDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string, @Body('userUuid') userUuid: string) {
    return this.projectsService.remove(uuid, userUuid);
  }
}
