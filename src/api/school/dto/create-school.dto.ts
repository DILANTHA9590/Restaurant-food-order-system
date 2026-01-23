import { IsString, IsOptional, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateSchoolDto {
  @IsString({ message: 'Name must be a string' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Address must be a string' })
  address?: string;

  @IsOptional()
  @IsPhoneNumber('LK', { message: 'Phone must be a valid number' })
  phone?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email must be valid' })
  email?: string;

  @IsOptional()
  @IsString({ message: 'District must be a string' })
  district?: string;

  @IsOptional()
  @IsString({ message: 'Province must be a string' })
  province?: string;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description?: string;

  @IsOptional()
  @IsString({ message: 'Status must be a string' })
  status?: string; // active, inactive
}
