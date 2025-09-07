import { IsString, IsNotEmpty, IsNumber, IsUUID } from "class-validator";

export class CreateOrderedItemDto {
  @IsString({ message: "Product name must be a string" })
  @IsNotEmpty({ message: "Product name is required" })
  productName: string;

  @IsNumber({}, { message: "Quantity must be a number" })
  @IsNotEmpty({ message: "Quantity is required" })
  quantity: number;

  @IsNumber({}, { message: "Last price must be a valid number" })
  @IsNotEmpty({ message: "Last price is required" })
  lastPrice: number;

  @IsString({ message: "Image URL must be a string" })
  @IsNotEmpty({ message: "Image is required" })
  image: string;

  // Relationship walata ids gannawa
//   @IsUUID("all", { message: "Invalid Order ID format" })
//   @IsNotEmpty({ message: "Order ID is required" })
//   orderId: string;

//   @IsUUID("all", { message: "Invalid MenuItem ID format" })
//   @IsNotEmpty({ message: "MenuItem ID is required" })
//   menuitemId: string;
}
