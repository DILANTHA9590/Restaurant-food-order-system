import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerRating } from './entities/customer_rating.entity';
import { CustomerRatingService } from './customer_rating.service';
import { CustomerRatingController } from './customer_rating.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerRating])],
  controllers: [CustomerRatingController],
  providers: [CustomerRatingService],
  exports: [CustomerRatingService],
})
export class CustomerRatingModule {}
