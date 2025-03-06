import * as QueueActions from './queue.actions';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {QueueService} from "../../services/queue/queue.service";
import {catchError, exhaustMap, map, of} from "rxjs";
import {SongModel} from "../../models/song.model";

// export const getSongQueue = createEffect(
//     (actions$ = inject(Actions), queueService = inject(QueueService)) => {
//         return actions$.pipe(
//             ofType(QueueActions.getSongQueue),
//             exhaustMap((action) =>{
//                 return queueService.getQueueList(action.uid).pipe(
//                     map((queueList) => QueueActions.getSongQueueSuccess({ songsQueue: queueList })),
//                     catchError((error) => of(QueueActions.getSongQueueFailure({ error }))),
//                 );
//                 }
//
//             ),
//         );
//     },
//     { functional: true },
// )