import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from './entities/school.entity';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School)
    private readonly schoolRepository: Repository<School>,
  ) {}

  async create(createSchoolDto: CreateSchoolDto) {
    const existing = await this.schoolRepository.findOne({
      where: { name: createSchoolDto.name },
    });
    if (existing) {
      throw new BadRequestException('School with this name already exists');
    }
    const school = this.schoolRepository.create(createSchoolDto);
    return this.schoolRepository.save(school);
  }

  async findAll() {
    return this.schoolRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    const school = await this.schoolRepository.findOne({ where: { id } });
    if (!school) {
      throw new NotFoundException('School not found');
    }
    return school;
  }

  async findByDistrict(district: string) {
    return this.schoolRepository.find({ where: { district } });
  }

  async findByProvince(province: string) {
    return this.schoolRepository.find({ where: { province } });
  }

  async findByStatus(status: string) {
    return this.schoolRepository.find({ where: { status } });
  }

  async update(id: string, updateSchoolDto: UpdateSchoolDto) {
    const result = await this.schoolRepository.update(id, updateSchoolDto);
    if (result.affected === 0) {
      throw new NotFoundException('School not found');
    }
    return this.schoolRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const result = await this.schoolRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('School not found');
    }
    return { message: 'School deleted successfully' };
  }
}
