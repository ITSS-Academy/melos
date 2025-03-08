import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SongsModule } from './songs/songs.module';
import { AuthModule } from './auth/auth.module';
import { SupabaseModule } from './supabase/supabase.module';
import { CategoryModule } from './category/category.module';
import { AuthMiddleware } from './auth/firebase-auth.middleware';
import { PlaylistsModule } from './playlists/playlists.module';
import { HistoryModule } from './history/history.module';
import { QueueModule } from './queue/queue.module';
import { LikeModule } from './like/like.module';
import { SearchModule } from './search/search.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SongsModule,
    AuthModule,
    SupabaseModule,
    CategoryModule,
    PlaylistsModule,
    HistoryModule,
    QueueModule,
    LikeModule,
    SearchModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'songs', method: RequestMethod.POST },
        { path: 'songs', method: RequestMethod.DELETE },
        { path: 'auth', method: RequestMethod.POST },
        { path: 'playlists', method: RequestMethod.POST },
        { path: 'playlists', method: RequestMethod.DELETE },
        { path: 'playlists', method: RequestMethod.PUT },
        { path: 'playlists', method: RequestMethod.GET },
        { path: 'history', method: RequestMethod.ALL },
        { path: 'queue', method: RequestMethod.ALL },
        { path: 'like', method: RequestMethod.ALL },
        { path: 'comment', method: RequestMethod.POST },
      );
  }
}
