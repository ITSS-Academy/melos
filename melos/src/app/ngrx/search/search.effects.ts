// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { inject } from '@angular/core';
// import { SongService } from '../../services/song/song.service';
// import * as SearchActions from './search.actions';
// import { catchError, exhaustMap, map, of } from 'rxjs';
// import { SearchService } from '../../services/search/search.service';
//
// export const createSong = createEffect(
//   (actions$ = inject(Actions), searchService = inject(SearchService)) => {
//     return actions$.pipe(
//       ofType(SearchActions.searchAll),
//       exhaustMap((action) =>
//         searchService.searchSong(action.query).pipe(
//           map((seach) => SearchActions.searchAllSuccess({ search })),
//           catchError((error) => of(SongActions.createSongFailure({ error }))),
//         ),
//       ),
//     );
//   },
//   { functional: true },
// );
