import { SongState } from './song.state';
import { SongModel } from '../../models/song.model';
import { createReducer, on } from '@ngrx/store';
import * as SongActions from './song.actions';

export const initialSongState: SongState = {
  songDetail: <SongModel>{},
  songList: <SongModel[]>[],
  isLoading: false,
  error: null,
  songCategories: <SongModel[]>[],
  songListLiked: <SongModel[]>[],
};

export const songReducer = createReducer(
  initialSongState,
  on(SongActions.getSongById, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(SongActions.getSongByIdSuccess, (state, { songDetail, type }) => {
    console.log(type);
    return <SongState>{
      ...state,
      songDetail: songDetail,
      isLoading: false,
    };
  }),

  on(SongActions.getSongByIdFailure, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  }),

  on(SongActions.getSongList, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(SongActions.getSongListSuccess, (state, { songList, type }) => {
    console.log(type);
    return <SongState>{
      ...state,
      songList: songList,
      isLoading: false,
    };
  }),

  on(SongActions.getSongListFailure, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  }),

  //create song
  on(SongActions.createSong, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(SongActions.createSongSuccess, (state, { song, type }) => {
    console.log(type);
    return <SongState>{
      ...state,
      songDetail: song,
      isLoading: false,
    };
  }),

  on(SongActions.createSongFailure, (state, { error, type }) => {
    console.log(type);
    console.log(error);
    console.log(error.message);
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  }),

  //upload views
  on(SongActions.updateSongViews, (state, { type }) => {
    console.log(type);
    return {
      ...state,
    };
  }),

  on(SongActions.updateSongViewsSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
    };
  }),

  on(SongActions.updateSongViewsFailure, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      error: error,
    };
  }),

  on(SongActions.getSongCategories, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    SongActions.getSongCategoriesSuccess,
    (state, { songCategories, type }) => {
      console.log(type);
      return <SongState>{
        ...state,
        songCategories: songCategories,
        isLoading: false,
      };
    },
  ),
  on(SongActions.getSongCategoriesFailure, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  }),
  on(SongActions.clearStateSongCategory, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      songCategories: [],
    };
  }),



  //get song liked

  on(SongActions.getSongLiked, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(SongActions.getSongLikedSuccess, (state, { songListLiked, type }) => {
    console.log(type);
    return <SongState>{
      ...state,
      songListLiked: songListLiked,
      isLoading: false,
    };
  }),

  on(SongActions.getSongLikedFailure, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  }),


);


