import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)private readonly categoryRepository: Repository<Category>,
  ){}
  async create(createCategoryDto: CreateCategoryDto) {


    const {categoryName} = createCategoryDto


    const existingCategory = await this.categoryRepository.findOne({where:{categoryName:categoryName}})

    if(existingCategory){
      throw new ConflictException("Category with this name already exists");
    }

    const category =  this.categoryRepository.create(
    createCategoryDto 
    )

  const savedCategory = await this.categoryRepository.save(category);


  return{
    savedCategory ,
    message:"Category created successfully"

  }

  }



  async getAllCategory():Promise<{message?:string , categories:Category[]}>{



    const categories = await this.categoryRepository.find()


    if(categories.length==0){

      return{
        message:"No Category items found",
        categories
      }
    }
    return {
      categories

    }


  }







}
