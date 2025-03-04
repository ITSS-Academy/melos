import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SongService } from '../../services/song/song.service';
import * as SongActions from './song.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';

export const getDetailSong = createEffect(
  (actions$ = inject(Actions), songService = inject(SongService)) => {
    return actions$.pipe(
      ofType(SongActions.getSongById),
      exhaustMap((action) =>
        songService.getSongDetail(action.id).pipe(
          map((songDetail) => SongActions.getSongByIdSuccess({ songDetail })),
          catchError((error) => of(SongActions.getSongByIdFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const getListSongs = createEffect(
  (actions$ = inject(Actions), songService = inject(SongService)) => {
    return actions$.pipe(
      ofType(SongActions.getSongList),
      exhaustMap(() =>
        songService.getSongList().pipe(
          map((songList) => SongActions.getSongListSuccess({ songList })),
          catchError((error) => of(SongActions.getSongListFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const getSongByCategory = createEffect(
    (actions$ = inject(Actions), songService = inject(SongService)) => {
        return actions$.pipe(
            ofType(SongActions.getSongCategories),
            exhaustMap((action) =>{
                console.log(action.id);
                return songService.getSongByCategory(action.id).pipe(
                    map((songList) => SongActions.getSongCategoriesSuccess({ songCategories: songList })),
                    catchError((error) => of(SongActions.getSongCategoriesFailure({ error }))),
                );
                }

            ),
        );
    },
    { functional: true },
)

export const createSong = createEffect(
  (actions$ = inject(Actions), songService = inject(SongService)) => {
    return actions$.pipe(
      ofType(SongActions.createSong),
      exhaustMap((action) =>
        songService.createSong(action.song, action.idToken).pipe(
          map((song) => SongActions.createSongSuccess({ song })),
          catchError((error) => of(SongActions.createSongFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);

//update views
export const updateSongViews = createEffect(
  (actions$ = inject(Actions), songService = inject(SongService)) => {
    return actions$.pipe(
      ofType(SongActions.updateSongViews),
      exhaustMap((action) =>
        songService.updateSongViews(action.id).pipe(
          map(() => SongActions.updateSongViewsSuccess()),
          catchError((error) => of(SongActions.getSongByIdFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);
