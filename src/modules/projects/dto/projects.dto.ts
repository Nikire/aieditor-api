import {
  IsNotEmpty,
  IsObject,
  IsOptional,
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
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsUUID()
  userUuid: string;

  @IsOptional()
  @IsObject()
  settings?: ProjectSettingsType;
}
