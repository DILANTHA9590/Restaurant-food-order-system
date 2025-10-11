import { IsDateString, IsInt, IsNumber, Min } from 'class-validator';

export class CreateDailyIncomeDto {
  @IsDateString({}, { message: 'Date must be a valid date string (YYYY-MM-DD)' })
  date: string;

  @IsInt({ message: 'Total orders must be an integer' })
  @Min(0, { message: 'Total orders cannot be negative' })
  totalOrders: number;

  @IsNumber({}, { message: 'Total income must be a number' })
  @Min(0, { message: 'Total income cannot be negative' })
  totalIncome: number;

  @IsNumber({}, { message: 'Total profit must be a number' })
  @Min(0, { message: 'Total profit cannot be negative' })
  totalProfit: number;
}