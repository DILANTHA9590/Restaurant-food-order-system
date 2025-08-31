import { IsArray, IsNumber, IsOptional, IsString, IsEmpty } from "class-validator";

export class CreateCategoryDto {

  @IsArray({ message: "Images must be an array" })
  @IsEmpty({ message: "Images field must be empty if not provided" })
  image?: string[];

  @IsNumber({}, { message: "Rating must be a number" })
  @IsOptional()
  rating?: number;

  @IsString({ message: "Category name must be a string" })
  @IsEmpty({ message: "Category name must be empty if not provided" })
  categoryName: string;

  @IsString({ message: "Description must be a string" })
  @IsOptional()
  description?: string;
}
