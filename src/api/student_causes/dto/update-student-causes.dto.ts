import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentCausesDto } from './create-student-causes.dto';

export class UpdateStudentCausesDto extends PartialType(CreateStudentCausesDto) {}
