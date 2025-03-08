import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { songReducer } from './ngrx/song/song.reducers';
import * as SongEffects from './ngrx/song/song.effect';
import { authReducer } from './ngrx/auth/auth.reducer';
import * as AuthEffects from './ngrx/auth/auth.effects';
import { playReducer } from './ngrx/play/play.reducer';
import { categoryReducer } from './ngrx/category/category.reducers';
import * as CategoryEffects from './ngrx/category/category.effects';
import { historyReducer } from './ngrx/history/history.reducer';
import * as HistoryEffects from './ngrx/history/history.effects';
import {playlistReducer} from './ngrx/playlist/playlist.reducers';
import * as PlaylistEffects from './ngrx/playlist/playlist.effects';
import * as UploadEffects from './ngrx/uploaded/uploaded.effects';
import { uploadReducer } from './ngrx/uploaded/uploaded.reducer';
import { likeReducer } from './ngrx/like/like.reducers';
import * as LikeEffects from './ngrx/like/like.effects';
import { searchReducer } from './ngrx/search/search.reducers';
import * as SearchEffects from './ngrx/search/search.effects';
import { commentReducer } from './ngrx/comment/comment.reducer';
import * as CommentEffects from './ngrx/comment/comment.effects';
import { environment } from '../environments/environment.development';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore({
      song: songReducer,
      auth: authReducer,
      play: playReducer,
      category: categoryReducer,
      history: historyReducer,
      playlist: playlistReducer,
      upload: uploadReducer,
      like: likeReducer,
      search: searchReducer,
      comment: commentReducer,
    }),
    provideEffects(SongEffects, AuthEffects, CategoryEffects, HistoryEffects, PlaylistEffects),
    provideEffects(
      SongEffects,
      AuthEffects,
      CategoryEffects,
      HistoryEffects,
      UploadEffects,
      LikeEffects,
      SearchEffects,
      CommentEffects,
    ),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
  ],
};
