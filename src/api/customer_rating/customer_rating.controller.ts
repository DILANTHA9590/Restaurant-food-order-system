import { Controller, Post, Body, Delete, Param, Patch, Get } from '@nestjs/common';
import { CustomerRatingService } from './customer_rating.service';
import { CreateCustomerRatingDto } from './dto/create-customer-rating.dto';
import { UpdateCustomerRatingDto } from './dto/update-customer-rating.dto';

@Controller('customer-rating')
export class CustomerRatingController {
  constructor(private readonly customerRatingService: CustomerRatingService) {}

  @Post()
  create(@Body() createCustomerRatingDto: CreateCustomerRatingDto) {
    return this.customerRatingService.create(createCustomerRatingDto);
  }

  @Get()
  findAll() {
    return this.customerRatingService.findAll();
  }

  @Get('average')
  getAverageRating() {
    return this.customerRatingService.getAverageRating();
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.customerRatingService.findByUserId(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerRatingService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerRatingDto: UpdateCustomerRatingDto,
  ) {
    return this.customerRatingService.update(id, updateCustomerRatingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerRatingService.remove(id);
  }
}
