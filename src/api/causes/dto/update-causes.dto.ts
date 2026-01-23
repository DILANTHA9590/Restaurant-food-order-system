import { PartialType } from '@nestjs/mapped-types';
import { CreateCausesDto } from './create-causes.dto';

export class UpdateCausesDto extends PartialType(CreateCausesDto) {}
