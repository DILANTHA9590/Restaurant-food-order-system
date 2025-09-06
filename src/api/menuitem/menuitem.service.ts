import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuitemDto } from './dto/create-menuitem.dto';
import { UpdateMenuitemDto } from './dto/update-menuitem.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Menuitem } from './entities/menuitem.entity';
import { Repository } from 'typeorm';
import { Category } from '../category/entities/category.entity';
import { UpdateCategoryDto } from '../category/dto/update-category.dto';

@Injectable()
export class MenuitemService {

  constructor(
    @InjectRepository(Menuitem) private readonly menuItemRepository:Repository<Menuitem>,
      @InjectRepository(Category)private readonly categoryRepository: Repository<Category>
  ){}
async  createMenuItem(categoryId:string, createMenuitemDto: CreateMenuitemDto) {


    const {name} = createMenuitemDto


    const existingMenuItem =  await this.menuItemRepository.findOne({where:{name}})

    if(existingMenuItem){

      throw new ConflictException("This item name alread have")
    }

    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });

    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }


    const newItem = this.menuItemRepository.create({...createMenuitemDto ,
      category:{id:category.id} as Category
    })


    await this.menuItemRepository.save(newItem);



    return {

      message : "New item created successfully"

    }



  
  }

async findAllCategoryItem(categoryId: string) {

  const category = await this.categoryRepository.findOne({ where: { id: categoryId } });

  if (!category) {
    throw new NotFoundException(`Category with ID ${categoryId} not found`);
  }


  const allItems = await this.menuItemRepository.find({
    where: { category: { id: categoryId } },

  });

  // 3. Handle empty items
  if (allItems.length === 0) {
    return {
      message: `No menu items found for category ${category.categoryName}`,
      items: [],
    };
  }


  return {

    items: allItems,
  };
}

async updateMenuItem(menuId: string, updateMenuitemDto: UpdateMenuitemDto) {
  // 1. Check if menu item exists
  const existingItem = await this.menuItemRepository.findOne({ where: { id :menuId} });

  if (!existingItem) {
    throw new NotFoundException(`Menu item not found`);
  }

  // 2. Merge existing data with updated fields
  Object.assign(existingItem, updateMenuitemDto);

  // 3. Save updated item
  return await this.menuItemRepository.save(existingItem);
}

async removeMenuItem(id: string) {
  // 1. Check if menu item exists
  const existingItem = await this.menuItemRepository.findOne({ where: { id:id } });

  if (!existingItem) {
    throw new NotFoundException(`Menu item with ID ${id} not found`);
  }

  // 2. Remove item
  await this.menuItemRepository.remove(existingItem);

  return {
    message: `Menu item with ID ${id} has been removed successfully`,
  };
}

  

  
}
