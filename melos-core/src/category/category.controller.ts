import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
  HttpException,
  HttpStatus,
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
  async getCategoryById(@Request() req: any): Promise<Category> {
    try {
      const { id } = req.query;
      return this.categoryService.getCategoriesById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('all')
  async getAllCategories(): Promise<Category[]> {
    return this.categoryService.getAllCategories();
  }
}
