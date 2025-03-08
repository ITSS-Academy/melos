import {QueueState} from "./queue.state";
import {createReducer, on} from "@ngrx/store";
import * as QueueActions from "./queue.actions";
import {QueueModel} from "../../models/queue.model";

export const initialState: QueueState = {
    songsQueue: <QueueModel>{},
    error: null,
    isLoading: false
}

export const queueReducer = createReducer(
    initialState,
    on(QueueActions.addToSongQueue, (state,{type}) => {
        console.log(type);
        return {
            ...state,
            isLoading: true
        }
    }),
    on(QueueActions.addToSongQueueSuccess, (state, {queue, type}) => {
        console.log(type);
        return <QueueState>{
            ...state,
            songsQueue: queue,
            isLoading: false
        }
    }),
    on(QueueActions.addToSongQueueFailure, (state, {error, type}) => {
        console.log(type);
        console.log(error.message);
        return {
            ...state,
            error: error,
            isLoading: false
        }
    })
)