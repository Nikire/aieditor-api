import { ProjectSettingsType } from './projects.types';

export class CreateProjectDto {
  name: string;
  description: string;
  userUuid: string;
  settings: ProjectSettingsType;
}
export class UpdateProjectDto {
  name?: string;
  description?: string;
  userUuid: string;
  settings?: ProjectSettingsType;
}
