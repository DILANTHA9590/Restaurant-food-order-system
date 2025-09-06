import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { MenuitemService } from './menuitem.service';



import { UpdateMenuitemDto } from './dto/update-menuitem.dto';
import { CreateMenuitemDto } from './dto/create-menuitem.dto';
import { Category } from '../category/entities/category.entity';

@Controller('menuitem')
export class MenuitemController {
  constructor(private readonly menuitemService: MenuitemService) {}

  @Post(':categoryId')
  create( @Param('categoryId') categoryId:string ,   @Body() createMenuitemDto: CreateMenuitemDto) {
    return this.menuitemService.createMenuItem(categoryId,createMenuitemDto);
  }

  @Get(':categoryId')
  findAll(@Param('categoryId') categoryId:string) {
    return this.menuitemService.findAllCategoryItem(categoryId);
  }

  
  @Put(':id')
  update(@Param('id') id: string, @Body() updateMenuitemDto: UpdateMenuitemDto) {
    return this.menuitemService.updateMenuItem(id, updateMenuitemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuitemService.removeMenuItem(id);
  }
}
