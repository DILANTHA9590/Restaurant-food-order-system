import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentCauses } from './entities/student_causes.entity';
import { CreateStudentCausesDto } from './dto/create-student-causes.dto';
import { UpdateStudentCausesDto } from './dto/update-student-causes.dto';

@Injectable()
export class StudentCausesService {
  constructor(
    @InjectRepository(StudentCauses)
    private readonly causesRepository: Repository<StudentCauses>,
  ) {}

  async create(createStudentCausesDto: CreateStudentCausesDto) {
    const cause = this.causesRepository.create(createStudentCausesDto);
    return this.causesRepository.save(cause);
  }

  async findAll() {
    return this.causesRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string) {
    const cause = await this.causesRepository.findOne({ where: { id } });
    if (!cause) {
      throw new NotFoundException('Student cause not found');
    }
    return cause;
  }

  async findByStatus(status: string) {
    return this.causesRepository.find({ where: { status } });
  }

  async findByCategory(category: string) {
    return this.causesRepository.find({ where: { category } });
  }

  async update(id: string, updateStudentCausesDto: UpdateStudentCausesDto) {
    const result = await this.causesRepository.update(id, updateStudentCausesDto);
    if (result.affected === 0) {
      throw new NotFoundException('Student cause not found');
    }
    return this.causesRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    const result = await this.causesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Student cause not found');
    }
    return { message: 'Student cause deleted successfully' };
  }
}
