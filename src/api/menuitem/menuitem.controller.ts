import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MenuitemService } from './menuitem.service';

import { UpdateMenuitemDto } from './dto/update-menuitem.dto';
import { CreateMenuitemDto } from './dto/create-menuitem.dto';
import { Category } from '../category/entities/category.entity';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/role-guard/roles.guard';
import { Roles } from '../auth/role-guard/roles.decorator';

@Controller('menuitem')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MenuitemController {
  constructor(private readonly menuitemService: MenuitemService) {}

  @Post(':categoryId')
  @Roles('admin', 'staff')
  create(
    @Param('categoryId') categoryId: string,
    @Body() createMenuitemDto: CreateMenuitemDto,
  ) {
    return this.menuitemService.createMenuItem(categoryId, createMenuitemDto);
  }

  @Get(':categoryId')
  findAll(@Param('categoryId') categoryId: string) {
    return this.menuitemService.findAllCategoryItem(categoryId);
  }

  @Roles('admin', 'staff')
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateMenuitemDto: UpdateMenuitemDto,
  ) {
    return this.menuitemService.updateMenuItem(id, updateMenuitemDto);
  }

  @Roles('admin', 'staff')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuitemService.removeMenuItem(id);
  }
}
