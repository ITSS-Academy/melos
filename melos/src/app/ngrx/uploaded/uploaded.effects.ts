import {Actions, createEffect, ofType} from '@ngrx/effects';
import {inject} from '@angular/core';
import {UploadedService} from '../../services/uploaded/uploaded.service';
import * as UploadActions from '../uploaded/uploaded.actions';
import {catchError, exhaustMap, map, of} from 'rxjs';
import {SongModel} from '../../models/song.model';


export const getUploadSongList = createEffect(
  (action$ = inject(Actions), uploadedService = inject(UploadedService)) => {
    return action$.pipe(
      ofType(UploadActions.getUploadSongList),
      exhaustMap((action) =>
        uploadedService.getUploadList(action.idToken, action.uid).pipe(
          map((uploadSongList: SongModel[]) => {
            return UploadActions.getUploadSongListSuccess({
              uploadSongList: uploadSongList,
            });
          }),
          catchError((error) =>
            of(UploadActions.getUploadSongListFailure({error}))
          ),
        ),
      ),
    );
  },
  {functional: true}
);
