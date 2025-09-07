import { IsString, IsUUID, IsInt, IsOptional, IsNumber, IsNotEmpty, IsArray } from "class-validator";

export class CreateOrderedItemDto {
  @IsOptional()
  @IsString({ message: "ProductName must be a valid string" })
  ProductName?: string;

  @IsNotEmpty()
  id:string

  @IsNotEmpty()
  @IsInt({ message: "Quantity must be an integer number" })
  quantity: number;

  @IsOptional()
  @IsNumber({}, { message: "Last price must be a valid number" })
  lastprice?: number;

  @IsOptional()
@IsNumber({}, { message: "Total must be a number" })
  @IsNotEmpty({ message: "Total is required" })
  total?: number;  // quantity * lastPrice

  @IsArray({ message: "Images must be an array" })
  @IsOptional()
  @IsNotEmpty({ message: "Images array cannot be e mpty" })
  image?: string[];

  @IsOptional()
  @IsUUID("4", { message: "OrderId must be a valid UUID (v4)" })
  orderId?: string;

  @IsOptional()
  @IsUUID("4", { message: "MenuItemId must be a valid UUID (v4)" })
  menuItemId?: string;
}
