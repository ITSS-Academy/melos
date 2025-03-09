import { createAction, props } from '@ngrx/store';
import { SongModel } from '../../models/song.model';

export const getHistorySongList = createAction(
  '[History] Get History Song List',
  props<{ uid: string; idToken: string }>(),
);

export const GetHistorySongListSuccess = createAction(
  '[History] Get History Song List Success',
  props<{ historySongList: SongModel[] }>(),
);

export const GetHistorySongListFailure = createAction(
  '[History] Get History Song List Failure',
  props<{ error: any }>(),
);

export const createHistory = createAction(
  '[History] Create History',
  props<{ uid: string; songId: string; idToken: string }>(),
);

export const createHistorySuccess = createAction(
  '[History] Create History Success',
);

export const createHistoryFailure = createAction(
  '[History] Create History Failure',
  props<{ error: any }>(),
);
