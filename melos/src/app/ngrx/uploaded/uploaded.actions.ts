import {createAction, props} from '@ngrx/store';
import {SongModel} from '../../models/song.model';

export const getUploadSongList = createAction(
  '[Uploaded] Get Upload Song List',
  props<{ uid: string; idToken: string }>(),
);

export const getUploadSongListSuccess = createAction(
  '[Uploaded]  Get Update Song List Success',
  props<{ uploadSongList: SongModel[] }>(),
);

export const getUploadSongListFailure = createAction(
  '[Uploaded]  Get Update Song List Failure',
  props<{ error: any }>(),
);
