import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body() createCategoryDto: Category): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  async getCategoryById(@Query('id') id: string): Promise<Category> {
    return this.categoryService.getCategoriesById(id);
  }

  @Get('all')
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }
}
