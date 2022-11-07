import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  createCategory(categoryData: CreateCategoryDto) {
    const category = this.categoryRepo.create(categoryData);
    return this.categoryRepo.save(category);
  }
  async findAllCategory() {
    return this.categoryRepo.find();
  }
}
