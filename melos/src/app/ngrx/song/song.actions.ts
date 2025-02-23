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
