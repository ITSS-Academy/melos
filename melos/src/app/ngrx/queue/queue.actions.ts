import {createAction, props} from "@ngrx/store";
import {SongModel} from "../../models/song.model";
import {QueueService} from "../../services/queue/queue.service";
import {QueueModel} from "../../models/queue.model";

export const addToSongQueue = createAction(
    '[Queue] Add Song Queue',
    props<{ queue: QueueModel; idToken: string  }>(),
)

export const addToSongQueueSuccess = createAction(
    '[Queue] Add Song Queue Success',
    props<{ queue: QueueModel }>(),
)

export const addToSongQueueFailure = createAction(
    '[Queue] Add Song Queue Failure',
    props<{ error: any }>(),
)