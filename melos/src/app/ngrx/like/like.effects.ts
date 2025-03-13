import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { LikeService } from '../../services/like/like.service';
import * as LikeActions from './like.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import {SongModel} from '../../models/song.model';

export const createSong = createEffect(
  (actions$ = inject(Actions), likeService = inject(LikeService)) => {
    return actions$.pipe(
      ofType(LikeActions.likeSong),
      exhaustMap((action) =>
        likeService.createLike(action.songId, action.uid, action.idToken).pipe(
          map((songId) => {
            console.log('songId', songId);
            return LikeActions.likeSongSuccess({ songId: songId.song_id });
          }),
          catchError((error) => of(LikeActions.likeSongFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);

export const getSongIdLiked = createEffect(
  (actions$ = inject(Actions), likeService = inject(LikeService)) => {
    return actions$.pipe(
      ofType(LikeActions.getSongIdLiked),
      exhaustMap((action) =>
        likeService.getSongIdLiked(action.uid, action.idToken).pipe(
          map((songIdLikes) => {
            console.log('songIdLikes', songIdLikes);
            return LikeActions.getSongIdLikedSuccess({ songIdLikes });
          }),
          catchError((error) =>
            of(LikeActions.getSongIdLikedFailure({ error })),
          ),
        ),
      ),
    );
  },
  { functional: true },
);


export const deleteSong = createEffect(
  (actions$ = inject(Actions), likeService = inject(LikeService)) => {
    return actions$.pipe(
      ofType(LikeActions.deleteLike),
      exhaustMap((action) =>
        likeService.deleteLike(action.songId, action.uid, action.idToken).pipe(
          map(() => {
            return LikeActions.deleteLikeSuccess({ songId: action.songId });
          }),
          catchError((error) => of(LikeActions.deleteLikeFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);

