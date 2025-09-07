import { IsString, IsNotEmpty, IsEmail, IsNumber, IsUUID } from "class-validator";

export class CreateOrderDto {
  @IsString({ message: "Order ID must be a string" })
  @IsNotEmpty({ message: "Order ID is required" })
  orderId: string;

  @IsNumber({}, { message: "Total price must be a valid number" })
  @IsNotEmpty({ message: "Total price is required" })
  totalPrice: number;

  @IsNumber({}, { message: "Discount price must be a valid number" })
  @IsNotEmpty({ message: "Discount price is required" })
  discountPrice: number;

  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty({ message: "Email is required" })
  email: string;

  @IsString({ message: "Mobile number must be a string" })
  @IsNotEmpty({ message: "Mobile number is required" })
  mobileNo: string;

  @IsString({ message: "Payment ID must be a string" })
  @IsNotEmpty({ message: "Payment ID is required" })
  paymentId: string;

  @IsString({ message: "Address must be a string" })
  @IsNotEmpty({ message: "Address is required" })
  address: string;

//   // relationship walata input
//   @IsUUID("all", { message: "Invalid user ID format" })
//   @IsNotEmpty({ message: "User ID is required" })
//   userId: string;
}
