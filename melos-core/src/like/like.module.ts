import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  imports: [SupabaseModule],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
