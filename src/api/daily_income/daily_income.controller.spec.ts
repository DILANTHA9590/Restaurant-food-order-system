import { Test, TestingModule } from '@nestjs/testing';
import { DailyIncomeController } from './daily_income.controller';
import { DailyIncomeService } from './daily_income.service';

describe('DailyIncomeController', () => {
  let controller: DailyIncomeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DailyIncomeController],
      providers: [DailyIncomeService],
    }).compile();

    controller = module.get<DailyIncomeController>(DailyIncomeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
