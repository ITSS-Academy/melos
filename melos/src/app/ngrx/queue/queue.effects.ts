import * as QueueActions from './queue.actions';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {inject} from "@angular/core";
import {QueueService} from "../../services/queue/queue.service";
import {catchError, exhaustMap, map, of} from "rxjs";

export const AddSongQueue = createEffect(
    (actions$ = inject(Actions), queueService = inject(QueueService)) => {
        return actions$.pipe(
            ofType(QueueActions.addToSongQueue),
            exhaustMap((action) =>{
                return queueService.addQueueSong(action.queue, action.idToken).pipe(
                    map((queue) => QueueActions.addToSongQueueSuccess({ queue })),
                    catchError((error) => of(QueueActions.addToSongQueueFailure({ error }))),
                );
                }

            ),
        );
    },
    { functional: true },
)

export const RemoveSongQueue = createEffect(
    (actions$ = inject(Actions), queueService = inject(QueueService)) => {
        return actions$.pipe(
            ofType(QueueActions.removeSongQueue),
            exhaustMap((action) =>{
                    return queueService.removeQueueSong(action.queue, action.idToken).pipe(
                        map((queue) => QueueActions.removeSongQueueSuccess({ queue })),
                        catchError((error) => of(QueueActions.removeSongQueueFailure({ error }))),
                    );
                }

            ),
        );
    },
    { functional: true },
)
