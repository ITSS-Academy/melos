import {UploadState} from '../uploaded/uploaded.state';
import {SongModel} from '../../models/song.model';
import {createReducer, on} from '@ngrx/store';
import * as uploadActions from '../uploaded/uploaded.actions';

export const initialState: UploadState = {
  uploadSongList: <SongModel[]>[],
  isLoading: false,
  error: null,
};

export const uploadReducer = createReducer(

  initialState,

  on(uploadActions.getUploadSongList, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(uploadActions.getUploadSongListSuccess,
    (state, { uploadSongList, type }) => {
      console.log(type);
      return <UploadState>{
        ...state,
        uploadSongList: uploadSongList,
        isLoading: false,
      };
    },
  ),

  on(uploadActions.getUploadSongListFailure, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  }),
);
