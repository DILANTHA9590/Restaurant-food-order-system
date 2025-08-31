import { IsArray, IsNumber, IsOptional, IsString, IsBoolean, IsNotEmpty } from "class-validator";

export class CreateMenuitemDto {

  @IsString({ message: "Image must be a string (URL or file path)" })
  @IsNotEmpty({ message: "Image cannot be empty" })
  image: string;

  @IsString({ message: "Name is required and must be a string" })
  @IsNotEmpty({ message: "Name cannot be empty" })
  name: string;

  @IsArray({ message: "altNames must be an array of strings" })
  @IsOptional()
  altNames?: string[];

  @IsNumber({}, { message: "Price must be a number" })
  @IsNotEmpty({ message: "Price cannot be empty" })
  price: number;

  @IsNumber({}, { message: "Last price must be a number" })
  @IsNotEmpty({ message: "Last price cannot be empty" })
  lastPrice: number;

  @IsString({ message: "Description must be a string" })
  @IsOptional()
  description?: string;

  @IsBoolean({ message: "Availability must be boolean" })
  @IsOptional()
  availability?: boolean;

  @IsString({ message: "Category ID must be a string" })
  @IsNotEmpty({ message: "Category ID cannot be empty" })
  categoryId: string;
}
