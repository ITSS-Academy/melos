import { LikeState } from './like.state';
import * as LikeActions from './like.actions';
import { createReducer, on } from '@ngrx/store';

export const initialState: LikeState = {
  songIdLikes: [],
  isLoading: false,
  error: null,
};

export const likeReducer = createReducer(
  initialState,

  on(LikeActions.likeSong, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(LikeActions.likeSongSuccess, (state, { songId, type }) => {
    console.log(type);
    console.log(songId);
    return <LikeState>{
      ...state,
      songIdLikes: [...state.songIdLikes, songId],
      isLoading: false,
    };
  }),

  on(LikeActions.likeSongFailure, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  }),

  on(LikeActions.getSongIdLiked, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(LikeActions.getSongIdLikedSuccess, (state, { songIdLikes, type }) => {
    console.log(type);
    return {
      ...state,
      songIdLikes: songIdLikes,
      isLoading: false,
    };
  }),

  on(LikeActions.getSongIdLikedFailure, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  }),
);
