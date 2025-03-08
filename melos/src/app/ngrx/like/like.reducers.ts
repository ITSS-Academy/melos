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


  // Xử lý delete like
  on(LikeActions.deleteLike, (state, { songId }) => {
    console.log('Deleting like for song:', songId);
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(LikeActions.deleteLikeSuccess, (state, { songId }) => {
    console.log('Deleted like for song:', songId);
    return {
      ...state,
      songIdLikes: state.songIdLikes.filter((id) => id !== songId),
      isLoading: false,
    };
  }),

  on(LikeActions.deleteLikeFailure, (state, { error }) => {
    console.error('Delete like failed:', error);
    return {
      ...state,
      error,
      isLoading: false,
    };
  })


);
