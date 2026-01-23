import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerRatingDto } from './create-customer-rating.dto';

export class UpdateCustomerRatingDto extends PartialType(CreateCustomerRatingDto) {}
