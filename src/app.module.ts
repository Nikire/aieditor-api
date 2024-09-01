import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { SharedModule } from './modules/shared/shared.module';

@Module({
  imports: [UsersModule, ProjectsModule, SharedModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
