import { Controller, Post, Body, Delete, Param, Patch, Put } from '@nestjs/common';
import { DailyIncomeService } from './daily_income.service';

import { Cron } from '@nestjs/schedule';
import { UpdateDailyIncomeDto } from './dto/update-daily-income.dto';

@Controller('daily-income')
export class DailyIncomeController {
  constructor(private readonly dailyIncomeService: DailyIncomeService) {}

  @Cron('0 0 23 * * *')
  create() {
    console.log("run me s1 min")
    return this.dailyIncomeService.create();
  }


  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDailyIncomeDto: UpdateDailyIncomeDto,
  ) {
    return this.dailyIncomeService.update(id, updateDailyIncomeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dailyIncomeService.remove(id);
  }
}
