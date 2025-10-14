import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyIncome } from './entities/daily_income.entity';
import { DailyIncomeService } from './daily_income.service';
import { DailyIncomeController } from './daily_income.controller';
import { Order } from '../order/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DailyIncome,Order])],
  controllers: [DailyIncomeController],
  providers: [DailyIncomeService],
  exports: [DailyIncomeService],
})
export class DailyIncomeModule {}
