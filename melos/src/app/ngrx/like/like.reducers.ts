import { LikeState } from './like.state';
import * as LikeActions from './like.actions';
import { createReducer, on } from '@ngrx/store';


export const initialState: LikeState = {
  songIdLikes: [],
  isLoading: false,
  isLikedDeleteSuccess: false,
  isLikedSuccess: false,
  error: null,
};


export const likeReducer = createReducer(
  initialState,

  on(LikeActions.likeSong, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
      isLikedSuccess: false
    };
  }),

  on(LikeActions.likeSongSuccess, (state, { songId, type }) => {
    console.log(type);
    console.log(songId);
    return <LikeState>{
      ...state,
      songIdLikes: [...state.songIdLikes, songId],
      isLoading: false,
      isLikedSuccess: true,
    };
  }),

  on(LikeActions.likeSongFailure, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      error: error,
      isLoading: false,
      isLikedSuccess: false,
    };
  }),

  on(LikeActions.clearStateLikeSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLikedSuccess: false,
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

  on(LikeActions.clearStateSongIdLikes, (state) => {
    return {
      ...state,
      songIdLikes: [],
    };
  }),


  // Xử lý delete like
  on(LikeActions.deleteLike, (state, { songId }) => {
    console.log('Deleting like for song:', songId);
    return {
      ...state,
      isLoading: true,
      isLikedDeleteSuccess: false,
    };
  }),

  on(LikeActions.deleteLikeSuccess, (state, { songId }) => {
    console.log('Deleted like for song:', songId);
    return {
      ...state,
      songIdLikes: state.songIdLikes.filter((id) => id !== songId),
      isLikedDeleteSuccess: true,
      isLoading: false,
    };
  }),

  on(LikeActions.deleteLikeFailure, (state, { error }) => {
    console.error('Delete like failed:', error);
    return {
      ...state,
      error,
      isLikedDeleteSuccess: false,
      isLoading: false,
    };
  }),

  on(LikeActions.clearStateDeleteLikeSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLikedDeleteSuccess: false,
    };
  })


);
