import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { SupabaseProvider } from 'src/supabase/supabase';

@Injectable()
export class CategoryService {
  constructor(private supabaseProvider: SupabaseProvider) {}

  async create(category: Category): Promise<Category> {
    if (category.name === undefined || category.description === undefined) {
      throw new HttpException(
        'Name and description are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    const { data, error } = await this.supabaseProvider
      .getClient()
      .rpc('insert_category', {
        p_name: category.name,
        p_description: category.description,
      });

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    console.log(data);

    return data[0] as Category;
  }

  async getCategoriesById(id: string): Promise<Category> {
    const { data, error } = await this.supabaseProvider
      .getClient()
      .from('categories')
      .select('*')
      .eq('id', id);

    console.log(data);

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return data[0] as Category;
  }

  async getAllCategories(): Promise<Category[]> {
    const { data: categoryData, error: categoryError } =
      await this.supabaseProvider.getClient().from('categories').select('*');

    if (categoryError) {
      throw new HttpException(categoryError.message, HttpStatus.BAD_REQUEST);
    }

    return categoryData;
  }
}
