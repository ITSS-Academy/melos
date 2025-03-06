import {SongModel} from "../../models/song.model";
import {QueueState} from "./queue.state";
import {createReducer, on} from "@ngrx/store";
import * as QueueActions from "./queue.actions";
import {getSongQueue} from "./queue.actions";
import {QueueModel} from "../../models/queue.model";

export const initialState: QueueState = {
    songsQueue: <QueueModel[]>[],
    error: null,
    isLoading: false
}

export const queueReducer = createReducer(
    initialState,
    on(QueueActions.getSongQueue, (state,{type}) => {
        console.log(type);
        return {
            ...state,
            isLoading: true
        }
    }),
    on(QueueActions.getSongQueueSuccess, (state, {songsQueue, type}) => {
        console.log(type);
        return <QueueState>{
            ...state,
            songsQueue: songsQueue,
            isLoading: false
        }
    }),
    on(QueueActions.getSongQueueFailure, (state, {error, type}) => {
        console.log(type);
        return {
            ...state,
            error: error,
            isLoading: false
        }
    })
)