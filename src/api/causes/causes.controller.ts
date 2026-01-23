import { Controller, Post, Body, Delete, Param, Patch, Get } from '@nestjs/common';
import { CausesService } from './causes.service';
import { CreateCausesDto } from './dto/create-causes.dto';
import { UpdateCausesDto } from './dto/update-causes.dto';

@Controller('causes')
export class CausesController {
  constructor(private readonly causesService: CausesService) {}

  @Post()
  create(@Body() createCausesDto: CreateCausesDto) {
    return this.causesService.create(createCausesDto);
  }

  @Get()
  findAll() {
    return this.causesService.findAll();
  }

  @Get('status/:status')
  findByStatus(@Param('status') status: string) {
    return this.causesService.findByStatus(status);
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string) {
    return this.causesService.findByCategory(category);
  }

  @Get('priority/:priority')
  findByPriority(@Param('priority') priority: string) {
    return this.causesService.findByPriority(parseInt(priority));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.causesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCausesDto: UpdateCausesDto,
  ) {
    return this.causesService.update(id, updateCausesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.causesService.remove(id);
  }
}
