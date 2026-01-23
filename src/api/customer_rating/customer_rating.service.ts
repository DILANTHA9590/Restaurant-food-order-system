import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerRating } from './entities/customer_rating.entity';
import { CreateCustomerRatingDto } from './dto/create-customer-rating.dto';
import { UpdateCustomerRatingDto } from './dto/update-customer-rating.dto';

@Injectable()
export class CustomerRatingService {
  constructor(
    @InjectRepository(CustomerRating)
    private readonly ratingRepository: Repository<CustomerRating>,
  ) {}

  async create(createCustomerRatingDto: CreateCustomerRatingDto) {
    const rating = this.ratingRepository.create(createCustomerRatingDto);
    return this.ratingRepository.save(rating);
  }

  async findAll() {
    return this.ratingRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    const rating = await this.ratingRepository.findOne({ where: { id } });
    if (!rating) {
      throw new NotFoundException('Rating not found');
    }
    return rating;
  }

  async findByUserId(userId: string) {
    return this.ratingRepository.find({ where: { user: { id: userId } } });
  }

  async getAverageRating() {
    const result = await this.ratingRepository
      .createQueryBuilder('rating')
      .select('AVG(rating.rating)', 'averageRating')
      .getRawOne();
    return result.averageRating;
  }

  async update(id: string, updateCustomerRatingDto: UpdateCustomerRatingDto) {
    const result = await this.ratingRepository.update(id, updateCustomerRatingDto);
    if (result.affected === 0) {
      throw new NotFoundException('Rating not found');
    }
    return this.ratingRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const result = await this.ratingRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Rating not found');
    }
    return { message: 'Rating deleted successfully' };
  }
}
