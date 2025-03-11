import { createAction, props } from '@ngrx/store';
import { CommentModel } from '../../models/comment.model';

export const createComment = createAction(
  '[Comment] Create Comment',
  props<{ comment: CommentModel; idToken: string }>(),
);

export const createCommentSuccess = createAction(
  '[Comment] Create Comment Success',
  props<{ comment: CommentModel }>(),
);

export const createCommentFail = createAction(
  '[Comment] Create Comment Fail',
  props<{ error: any }>(),
);

export const getCommentBySong = createAction(
  '[Comment] Get Comment By Song',
  props<{ songId: string }>(),
);

export const getCommentBySongSuccess = createAction(
  '[Comment] Get Comment By Song Success',
  props<{ commentList: CommentModel[] }>(),
);

export const getCommentBySongFail = createAction(
  '[Comment] Get Comment By Song Fail',
  props<{ error: any }>(),
);

export const clearStateComment = createAction(
    '[Comment] Clear State Comment',
);
