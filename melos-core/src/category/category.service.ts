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
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    console.log(data);

    return data[0] as Category;
  }

  async getCategoriesById(id: string): Promise<Category> {
    const { data, error } = await this.supabaseProvider
      .getClient()
      .rpc('get_category_by_id', { p_id: id });

    if (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return data[0] as Category;
  }
}
