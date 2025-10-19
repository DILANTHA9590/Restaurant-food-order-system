import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({
    example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
    description: 'Array of image URLs related to the category',
    required: false,
    type: [String],
  })
  @IsArray({ message: 'Images must be an array' })
  @IsOptional()
  @IsNotEmpty({ message: 'Images array cannot be empty' })
  image?: string[];

  @ApiProperty({
    example: 4.5,
    description: 'Rating of the category (0–5)',
    required: false,
    type: Number,
  })
  @IsNumber({}, { message: 'Rating must be a number' })
  @IsOptional()
  rating?: number;

  @ApiProperty({
    example: 'Beverages',
    description: 'Name of the category',
  })
  @IsString({ message: 'Category name must be a string' })
  @IsNotEmpty({ message: 'Category name cannot be empty' })
  categoryName: string;

  @ApiProperty({
    example: 'Refreshing cold and hot drinks available in this category',
    description: 'Detailed description of the category',
    required: false,
  })
  @IsString({ message: 'Description must be a string' })
  @IsOptional()
  description?: string;
}
