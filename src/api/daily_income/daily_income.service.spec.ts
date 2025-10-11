import { Test, TestingModule } from '@nestjs/testing';
import { DailyIncomeService } from './daily_income.service';

describe('DailyIncomeService', () => {
  let service: DailyIncomeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DailyIncomeService],
    }).compile();

    service = module.get<DailyIncomeService>(DailyIncomeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
