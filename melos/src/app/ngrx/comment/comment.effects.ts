import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { catchError, exhaustMap, map, of } from 'rxjs';
import * as CommentActions from './comment.actions';
import { CommentService } from '../../services/comment/comment.service';
import { CommentModel } from '../../models/comment.model';

export const createComment = createEffect(
  (actions$ = inject(Actions), commentService = inject(CommentService)) => {
    return actions$.pipe(
      ofType(CommentActions.createComment),
      exhaustMap((action) =>
        commentService.createComment(action.comment, action.idToken).pipe(
          map((comment: CommentModel) => {
            return CommentActions.createCommentSuccess({
              comment: comment,
            });
          }),
          catchError((error) =>
            of(CommentActions.createCommentFail({ error })),
          ),
        ),
      ),
    );
  },
  { functional: true },
);

export const getCommentBySong = createEffect(
  (actions$ = inject(Actions), commentService = inject(CommentService)) => {
    return actions$.pipe(
      ofType(CommentActions.getCommentBySong),
      exhaustMap((action) =>
        commentService.getCommentBySong(action.songId).pipe(
          map((commentList: CommentModel[]) => {
            return CommentActions.getCommentBySongSuccess({
              commentList,
            });
          }),
          catchError((error) =>
            of(CommentActions.getCommentBySongFail({ error })),
          ),
        ),
      ),
    );
  },
  { functional: true },
);
