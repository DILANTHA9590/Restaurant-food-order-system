import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Causes } from './entities/causes.entity';
import { CreateCausesDto } from './dto/create-causes.dto';
import { UpdateCausesDto } from './dto/update-causes.dto';

@Injectable()
export class CausesService {
  constructor(
    @InjectRepository(Causes)
    private readonly causesRepository: Repository<Causes>,
  ) {}

  async create(createCausesDto: CreateCausesDto) {
    const cause = this.causesRepository.create(createCausesDto);
    return this.causesRepository.save(cause);
  }

  async findAll() {
    return this.causesRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    const cause = await this.causesRepository.findOne({ where: { id } });
    if (!cause) {
      throw new NotFoundException('Cause not found');
    }
    return cause;
  }

  async findByStatus(status: string) {
    return this.causesRepository.find({ where: { status } });
  }

  async findByCategory(category: string) {
    return this.causesRepository.find({ where: { category } });
  }

  async findByPriority(priority: number) {
    return this.causesRepository.find({ where: { priority } });
  }

  async update(id: string, updateCausesDto: UpdateCausesDto) {
    const result = await this.causesRepository.update(id, updateCausesDto);
    if (result.affected === 0) {
      throw new NotFoundException('Cause not found');
    }
    return this.causesRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const result = await this.causesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Cause not found');
    }
    return { message: 'Cause deleted successfully' };
  }
}
