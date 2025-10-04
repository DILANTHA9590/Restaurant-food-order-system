import { Module } from '@nestjs/common';
import { MenuitemService } from './menuitem.service';
import { MenuitemController } from './menuitem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Menuitem } from './entities/menuitem.entity';
import { Category } from '../category/entities/category.entity';
import { OrderedItem } from '../ordered-item/entities/ordered-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Menuitem, Category, OrderedItem])],
  controllers: [MenuitemController],
  providers: [MenuitemService],
})
export class MenuitemModule {}
