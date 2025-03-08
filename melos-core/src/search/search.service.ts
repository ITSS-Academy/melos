import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import { SupabaseProvider } from 'src/supabase/supabase';

@Injectable()
export class SearchService {
  constructor(private supabaseProvider: SupabaseProvider) {}

  async searchAll(query: string) {
    console.log('query', query);
    const { data, error } = await this.supabaseProvider
      .getClient()
      .rpc('search_data', {
        search_text: query,
      });

    if (error) {
      return {
        auth: [],
        songs: [],
        categories: [],
      };
    }

    return data;
  }
}
