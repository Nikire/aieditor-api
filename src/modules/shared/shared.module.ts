import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';

/*
  The idea behind this module is to import various common Modules in a single Module call.
  This way, we can import this Module in other Modules and have access to all the common Modules.
  Helper Modules / Database Modules / Config Module / Logger Module / etc.
*/

@Module({
  imports: [DatabaseModule],
  exports: [DatabaseModule],
})
export class SharedModule {}
