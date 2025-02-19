import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [
    // Import the SupabaseModule
    SupabaseModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
