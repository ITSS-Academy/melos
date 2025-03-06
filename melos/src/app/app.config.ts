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
import {uploadReducer} from './ngrx/uploaded/uploaded.reducer';

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
      upload: uploadReducer,
    }),
    provideEffects(
      SongEffects,
      AuthEffects,
      CategoryEffects,
      HistoryEffects,
      // LikeEffects,
    ),
    provideHttpClient(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'melos-db2e8',
        appId: '1:494365343338:web:8a6e1d7e15eb2b73e7d413',
        storageBucket: 'melos-db2e8.firebasestorage.app',
        apiKey: 'AIzaSyDsWw2bJPQjDbqytgbU0FoH7I_v0Xz20iY',
        authDomain: 'melos-db2e8.firebaseapp.com',
        messagingSenderId: '494365343338',
      }),
    ),
    provideAuth(() => getAuth()),
  ],
};
