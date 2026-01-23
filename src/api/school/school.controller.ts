import { Controller, Post, Body, Delete, Param, Patch, Get } from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.create(createSchoolDto);
  }

  @Get()
  findAll() {
    return this.schoolService.findAll();
  }

  @Get('district/:district')
  findByDistrict(@Param('district') district: string) {
    return this.schoolService.findByDistrict(district);
  }

  @Get('province/:province')
  findByProvince(@Param('province') province: string) {
    return this.schoolService.findByProvince(province);
  }

  @Get('status/:status')
  findByStatus(@Param('status') status: string) {
    return this.schoolService.findByStatus(status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSchoolDto: UpdateSchoolDto,
  ) {
    return this.schoolService.update(id, updateSchoolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.schoolService.remove(id);
  }
}
