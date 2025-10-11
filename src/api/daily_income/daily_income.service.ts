import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DailyIncome } from './entities/daily_income.entity';
import { CreateDailyIncomeDto } from './dto/create-daily-income.dto';
import { UpdateDailyIncomeDto } from './dto/update-daily-income.dto';

@Injectable()
export class DailyIncomeService {
  constructor(
    @InjectRepository(DailyIncome)
    private readonly dailyIncomeRepository: Repository<DailyIncome>,
  ) {}

  async create(createDailyIncomeDto: CreateDailyIncomeDto) {
    const existing = await this.dailyIncomeRepository.findOne({
      where: { date: createDailyIncomeDto.date },
    });
    if (existing) {
      throw new BadRequestException('Daily income for this date already exists');
    }
    const dailyIncome = this.dailyIncomeRepository.create(createDailyIncomeDto);
    return this.dailyIncomeRepository.save(dailyIncome);
  }

  async findAll() {
    return this.dailyIncomeRepository.find({ order: { date: 'DESC' } });
  }

  async findOne(id: string) {
    const dailyIncome = await this.dailyIncomeRepository.findOne({ where: { id } });
    if (!dailyIncome) {
      throw new NotFoundException('Daily income not found');
    }
    return dailyIncome;
  }

  async update(id: string, updateDailyIncomeDto: UpdateDailyIncomeDto) {
    const result = await this.dailyIncomeRepository.update(id, updateDailyIncomeDto);
    if (result.affected === 0) {
      throw new NotFoundException('Daily income not found');
    }
    return this.dailyIncomeRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const result = await this.dailyIncomeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Daily income not found');
    }
    return { message: 'Daily income deleted successfully' };
  }
}
