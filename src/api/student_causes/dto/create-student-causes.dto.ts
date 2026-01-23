import { IsString, IsOptional, IsInt, Min, Max } from 'class-validator';

export class CreateStudentCausesDto {
  @IsString({ message: 'Title must be a string' })
  title: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsString({ message: 'Category must be a string' })
  category: string;

  @IsOptional()
  @IsInt({ message: 'Priority must be an integer' })
  @Min(1, { message: 'Priority must be at least 1' })
  @Max(10, { message: 'Priority cannot exceed 10' })
  priority?: number;

  @IsOptional()
  @IsString({ message: 'Status must be a string' })
  status?: string; // active, inactive, resolved
}
