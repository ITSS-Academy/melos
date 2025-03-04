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
        { path: 'auth', method: RequestMethod.GET },
        { path: 'auth', method: RequestMethod.POST },
        { path: 'playlists', method: RequestMethod.POST },
        { path: 'playlists', method: RequestMethod.DELETE },
        { path: 'playlists', method: RequestMethod.PUT },
        { path: 'playlists', method: RequestMethod.GET },
        { path: 'history', method: RequestMethod.ALL },
      );
  }
}
