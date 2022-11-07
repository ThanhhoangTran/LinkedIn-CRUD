import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/guards/admin.guard';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categorySevice: CategoriesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), AdminGuard)
  createCategory(@Body() body: CreateCategoryDto) {
    return this.categorySevice.createCategory(body);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAllCategory() {
    return this.categorySevice.findAllCategory();
  }
}
