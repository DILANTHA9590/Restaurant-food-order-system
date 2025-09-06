import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { JwtPayload } from '../common/interfaces/jwt-payload.interface';
import { RolesGuard } from '../auth/role-guard/roles.guard';
import { Roles } from '../auth/role-guard/roles.decorator';

@Controller('category')
@UseGuards(JwtAuthGuard,RolesGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Roles('admin','staff')
  create(@Req() req: {user: JwtPayload}, @Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.getAllCategory();
  }



  @Put(':id')
  @Roles('admin','staff')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  @Roles('admin','staff')
  remove(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }
}
