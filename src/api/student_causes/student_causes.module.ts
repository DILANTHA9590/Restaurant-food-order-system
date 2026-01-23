import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentCauses } from './entities/student_causes.entity';
import { StudentCausesService } from './student_causes.service';
import { StudentCausesController } from './student_causes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([StudentCauses])],
  controllers: [StudentCausesController],
  providers: [StudentCausesService],
  exports: [StudentCausesService],
})
export class StudentCausesModule {}
