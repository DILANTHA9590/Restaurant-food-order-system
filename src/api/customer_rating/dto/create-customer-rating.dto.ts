import { IsInt, Min, Max, IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateCustomerRatingDto {
  @IsInt({ message: 'Rating must be an integer' })
  @Min(1, { message: 'Rating must be at least 1' })
  @Max(5, { message: 'Rating cannot be more than 5' })
  rating: number;

  @IsOptional()
  @IsString({ message: 'Comment must be a string' })
  comment?: string;

  @IsUUID()
  userId: string;
}
