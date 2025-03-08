import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import * as SearchActions from './search.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { SearchService } from '../../services/search/search.service';

export const searchAll = createEffect(
  (actions$ = inject(Actions), searchService = inject(SearchService)) => {
    return actions$.pipe(
      ofType(SearchActions.searchAll),
      exhaustMap((action) =>
        searchService.searchSong(action.query).pipe(
          map((search) => {
            console.log(search);
            return SearchActions.searchAllSuccess({ search });
          }),
          catchError((error) => of(SearchActions.searchAllFailure({ error }))),
        ),
      ),
    );
  },
  { functional: true },
);
