import {
  IsNotEmpty,
  IsObject,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { ProjectSettingsType } from './projects.types';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  name: string;

  @IsString()
  description: string;

  @IsString()
  @IsUUID()
  userUuid: string;

  @IsObject()
  settings: ProjectSettingsType;
}
export class UpdateProjectDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  name?: string;

  @IsString()
  description?: string;

  @IsString()
  @IsUUID()
  userUuid: string;

  @IsObject()
  settings?: ProjectSettingsType;
}
