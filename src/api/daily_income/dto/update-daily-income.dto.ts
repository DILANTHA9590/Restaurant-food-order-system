import { PartialType } from '@nestjs/mapped-types';
import { CreateDailyIncomeDto } from './create-daily-income.dto';

export class UpdateDailyIncomeDto extends PartialType(CreateDailyIncomeDto) {}