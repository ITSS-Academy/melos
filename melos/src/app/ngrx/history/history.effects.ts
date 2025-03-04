import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import * as HistoryActions from './history.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { HistoryService } from '../../services/history/history.service';
import { SongModel } from '../../models/song.model';

export const getHistorySongList = createEffect(
  (actions$ = inject(Actions), historyService = inject(HistoryService)) => {
    return actions$.pipe(
      ofType(HistoryActions.getHistorySongList),
      exhaustMap((action) =>
        historyService.getHistoryList(action.idToken, action.uid).pipe(
          map((historySongList: SongModel[]) => {
            return HistoryActions.GetHistorySongListSuccess({
              historySongList,
            });
          }),
          catchError((error) =>
            of(HistoryActions.GetHistorySongListFailure({ error })),
          ),
        ),
      ),
    );
  },
  { functional: true },
);
