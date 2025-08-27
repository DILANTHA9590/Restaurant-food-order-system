import { 
  IsEmail, 
  IsEnum, 
  IsNotEmpty, 
  IsPhoneNumber, 
  IsString, 
  MinLength 
} from "class-validator";
import { UserRole } from "../entities/user.entity";

export class CreateUserDto {
  @IsNotEmpty({ message: "Name is required" })
  @IsString({ message: "Name must be a valid string" })
  name: string;

  @IsNotEmpty({ message: "Phone number is required" })
  @IsString({ message: "Phone number must be a valid string" })
  @IsPhoneNumber("LK", { message: "Phone number must be a valid Sri Lankan number (e.g. +94771234567)" })
  phone: string;

  @IsNotEmpty({ message: "Email is required" })
  @IsEmail({}, { message: "Email must be a valid email address" })
  email: string;

  @IsNotEmpty({ message: "Password is required" })
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password: string;

  @IsNotEmpty({ message: "Role is required" })
  @IsEnum(UserRole, { message: "Role must be one of: admin, customer, staff" })
  role: UserRole;
}
