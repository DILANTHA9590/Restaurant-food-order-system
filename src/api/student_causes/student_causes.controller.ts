import { Controller, Post, Body, Delete, Param, Patch, Get, Query } from '@nestjs/common';
import { StudentCausesService } from './student_causes.service';
import { CreateStudentCausesDto } from './dto/create-student-causes.dto';
import { UpdateStudentCausesDto } from './dto/update-student-causes.dto';

@Controller('student-causes')
export class StudentCausesController {
  constructor(private readonly studentCausesService: StudentCausesService) {}

  @Post()
  create(@Body() createStudentCausesDto: CreateStudentCausesDto) {
    return this.studentCausesService.create(createStudentCausesDto);
  }

  @Get()
  findAll() {
    return this.studentCausesService.findAll();
  }

  @Get('status/:status')
  findByStatus(@Param('status') status: string) {
    return this.studentCausesService.findByStatus(status);
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string) {
    return this.studentCausesService.findByCategory(category);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentCausesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateStudentCausesDto: UpdateStudentCausesDto,
  ) {
    return this.studentCausesService.update(id, updateStudentCausesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentCausesService.remove(id);
  }
}
