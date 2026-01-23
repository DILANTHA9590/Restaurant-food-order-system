import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Causes } from './entities/causes.entity';
import { CausesService } from './causes.service';
import { CausesController } from './causes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Causes])],
  controllers: [CausesController],
  providers: [CausesService],
  exports: [CausesService],
})
export class CausesModule {}
