import {createAction, props} from "@ngrx/store";
import {SongModel} from "../../models/song.model";
import {QueueService} from "../../services/queue/queue.service";
import {QueueModel} from "../../models/queue.model";

export const getSongQueue = createAction(
    '[Queue] Get Song Queue',
    props<{ uid: string }>(),
)

export const getSongQueueSuccess = createAction(
    '[Queue] Get Song Queue Success',
    props<{ songsQueue: QueueModel[] }>(),
)

export const getSongQueueFailure = createAction(
    '[Queue] Get Song Queue Failure',
    props<{ error: any }>(),
)