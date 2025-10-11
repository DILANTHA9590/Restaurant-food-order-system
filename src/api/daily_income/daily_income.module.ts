import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyIncome } from './entities/daily_income.entity';
import { DailyIncomeService } from './daily_income.service';
import { DailyIncomeController } from './daily_income.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DailyIncome])],
  controllers: [DailyIncomeController],
  providers: [DailyIncomeService],
  exports: [DailyIncomeService],
})
export class DailyIncomeModule {}
