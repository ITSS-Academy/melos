import { createAction, props } from '@ngrx/store';
import { SongModel } from '../../models/song.model';

export const getSongById = createAction(
  '[Song] Get Song Detail',
  props<{ id: string }>(),
);

export const getSongByIdSuccess = createAction(
  '[Song] Get Song Detail Success',
  props<{ songDetail: SongModel }>(),
);

export const getSongByIdFailure = createAction(
  '[Song] Get Song Detail Failure',
  props<{ error: any }>(),
);

//get list of songs

export const getSongList = createAction('[Song] Get Song List');

export const getSongListSuccess = createAction(
  '[Song] Get Song List Success',
  props<{ songList: SongModel[] }>(),
);

export const getSongListFailure = createAction(
  '[Song] Get Song List Failure',
  props<{ error: any }>(),
);

//create song

export const createSong = createAction(
  '[Song] Create Song',
  props<{ song: SongModel; idToken: string }>(),
);

export const createSongSuccess = createAction(
  '[Song] Create Song Success',
  props<{ song: SongModel }>(),
);

export const createSongFailure = createAction(
  '[Song] Create Song Failure',
  props<{ error: any }>(),
);

//upload views

export const updateSongViews = createAction(
  '[Song] Update Song Views',
  props<{ id: string }>(),
);

export const updateSongViewsSuccess = createAction(
  '[Song] Update Song Views Success',
);

export const updateSongViewsFailure = createAction(
  '[Song] Update Song Views Failure',
  props<{ error: any }>(),
);

//Song Categories
export const getSongCategories = createAction(
  '[Song] Get Song Categories',
  props<{ id: string }>(),
);
export const getSongCategoriesSuccess = createAction(
  '[Song] Get Song Categories Success',
  props<{ songCategories: SongModel[] }>(),
);
export const getSongCategoriesFailure = createAction(
  '[Song] Get Song Categories Failure',
  props<{ error: any }>(),
);

export const clearStateSongCategory = createAction(
  '[Song] Clear State Song Category',
);

//song liked

export const getSongLiked = createAction(
  '[Song] Get Song Liked',
  props<{ uid: string; idToken: string }>(),
);

export const getSongLikedSuccess = createAction(
  '[Song] Get Song Liked Success',
  props<{ songListLiked: SongModel[] }>(),
);

export const getSongLikedFailure = createAction(
  '[Song] Get Song Liked Failure',
  props<{ error: any }>(),
);


export const getSongQueue = createAction(
    '[Song] Get Song Queue',
    props<{ id: string }>(),
);
export const getSongQueueSuccess = createAction(
    '[Song] Get Song Queue Success',
    props<{ songQueue: SongModel[] }>(),
);
export const getSongQueueFailure = createAction(
    '[Song] Get Song Queue Failure',
    props<{ error: any }>(),
);