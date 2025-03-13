import { createAction, props } from '@ngrx/store';


export const likeSong = createAction(
  '[Like] Like Song',
  props<{ songId: string; uid: string; idToken: string }>(),
);

export const likeSongSuccess = createAction(
  '[Like] Like Song Success',
  props<{ songId: string }>(),
);

export const likeSongFailure = createAction(
  '[Like] Like Song Failure',
  props<{ error: any }>(),
);

//get songId liked by uid

export const getSongIdLiked = createAction(
  '[Like] Get Song Id Liked',
  props<{ uid: string; idToken: string }>(),
);

export const getSongIdLikedSuccess = createAction(
  '[Like] Get Song Id Liked Success',
  props<{ songIdLikes: string[] }>(),
);

export const getSongIdLikedFailure = createAction(
  '[Like] Get Song Id Liked Failure',
  props<{ error: any }>(),
);

//delete like

export const deleteLike = createAction(
  '[Like] Delete Like',
  props<{ songId: string; uid: string; idToken: string }>()
);

export const deleteLikeSuccess = createAction(
  '[Like] Delete Like Success',
  props<{ songId: string }>()
);

export const deleteLikeFailure = createAction(
  '[Like] Delete Like Failure',
  props<{ error: any }>()
);


export const clearStateSongIdLikes = createAction(
  '[Like] Clear State Song Id Likes',
);
