import { PartialType } from '@nestjs/swagger';
import { CreateUserVerificationDto } from './create-user-verification.dto';

export class UpdateUserVerificationDto extends PartialType(CreateUserVerificationDto) {}
