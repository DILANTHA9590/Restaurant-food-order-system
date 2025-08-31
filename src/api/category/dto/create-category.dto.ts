import { IsArray, IsNumber, IsOptional, IsString, IsNotEmpty } from "class-validator";

export class CreateCategoryDto {

  @IsArray({ message: "Images must be an array" })
  @IsOptional()
  @IsNotEmpty({ message: "Images array cannot be empty" })
  image?: string[];

  @IsNumber({}, { message: "Rating must be a number" })
  @IsOptional()
  rating?: number;

  @IsString({ message: "Category name must be a string" })
  @IsNotEmpty({ message: "Category name cannot be empty" })
  categoryName: string;

  @IsString({ message: "Description must be a string" })
  @IsOptional()
  description?: string;
}
