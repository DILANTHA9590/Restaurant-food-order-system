import { Controller, Post, Body, Delete, Param, Patch } from '@nestjs/common';
import { DailyIncomeService } from './daily_income.service';
import { CreateDailyIncomeDto } from './dto/create-daily-income.dto';
import { UpdateDailyIncomeDto } from './dto/update-daily-income.dto';

@Controller('daily-income')
export class DailyIncomeController {
  constructor(private readonly dailyIncomeService: DailyIncomeService) {}

  @Post()
  create(@Body() createDailyIncomeDto: CreateDailyIncomeDto) {
    return this.dailyIncomeService.create(createDailyIncomeDto);
  }

  @Patch(':id')
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
