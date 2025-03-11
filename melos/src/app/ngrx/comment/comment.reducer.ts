import { CommentState } from './comment.state';
import { CommentModel } from '../../models/comment.model';
import { createReducer, on } from '@ngrx/store';
import * as CommentActions from './comment.actions';
import {clearStateComment} from "./comment.actions";

export const initialState: CommentState = {
  commentList: <CommentModel[]>[],
  isLoading: false,
  error: null,
};

export const commentReducer = createReducer(
  initialState,

  on(CommentActions.createComment, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(CommentActions.createCommentSuccess, (state, { comment, type }) => {
    console.log(type);
    return {
      ...state,
      commentList: [...state.commentList, comment],
      isLoading: false,
    };
  }),

  on(CommentActions.createCommentFail, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  }),

  on(CommentActions.getCommentBySong, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(CommentActions.getCommentBySongSuccess, (state, { commentList, type }) => {
    console.log(type);
    return {
      ...state,
      commentList: commentList,
      isLoading: false,
    };
  }),

  on(CommentActions.getCommentBySongFail, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  }),
    on(CommentActions.clearStateComment, (state, { type }) => {
      console.log(type);
      return {
        ...state,
        commentList: [],
      };
    }),
);
