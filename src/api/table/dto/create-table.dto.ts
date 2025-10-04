import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TableStatus } from '../entities/table.entity';
import { PartialType } from '@nestjs/swagger';

// Create Table DTO
export class CreateTableDto {
  @ApiProperty({
    description: 'Unique table identifier',
    example: 'TBL-001',
  })
  @IsNotEmpty({ message: 'Table ID is required' })
  @IsString({ message: 'Table ID must be a string' })
  tableId: string;

  @ApiProperty({
    description: 'Table status',
    enum: TableStatus,
    default: TableStatus.AVAILABLE,
    example: TableStatus.AVAILABLE,
  })
  @IsEnum(TableStatus, {
    message: `Status must be one of: ${Object.values(TableStatus).join(', ')}`,
  })
  @IsOptional()
  status?: TableStatus;

  @ApiProperty({
    description: 'Images for the table',
    type: [String],
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
  })
  @IsArray({ message: 'Images must be an array of strings' })
  @IsNotEmpty({ message: 'Images cannot be empty' })
  image: string[];

  @ApiProperty({
    description: 'Description of the table',
    required: false,
    example: 'Near window with great view',
  })
  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;
}

// Update Table DTO (partial)
export class UpdateTableDto extends PartialType(CreateTableDto) {}
