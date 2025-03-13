import { QueueState } from './queue.state';
import { createReducer, on } from '@ngrx/store';
import * as QueueActions from './queue.actions';
import { QueueModel } from '../../models/queue.model';
import {
  clearStateAddQueueRandomSuccess,
  removeSongQueue,
} from './queue.actions';
import { SongModel } from '../../models/song.model';

export const initialState: QueueState = {
  songsQueue: <QueueModel>{},
  songQueueRandom: <SongModel>{},
  error: null,
  isCreateSuccess: false,
  isRemoveSuccess: false,
  isLoading: false,
};

export const queueReducer = createReducer(
  initialState,
  on(QueueActions.addToSongQueue, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
      isCreateSuccess: false,
    };
  }),
  on(QueueActions.addToSongQueueSuccess, (state, { queue, type }) => {
    console.log(type);
    return <QueueState>{
      ...state,
      songsQueue: queue,
      isLoading: false,
    };
  }),
  on(QueueActions.addToSongQueueFailure, (state, { error, type }) => {
    console.log(type);
    console.log(error.message);
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  }),
  on(QueueActions.removeSongQueue, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
      isRemoveSuccess: false,
    };
  }),
  on(QueueActions.removeSongQueueSuccess, (state, { queue, type }) => {
    console.log(type);
    return <QueueState>{
      ...state,
      songsQueue: queue,
      isLoading: false,
      isRemoveSuccess: true,
    };
  }),
  on(QueueActions.removeSongQueueFailure, (state, { error, type }) => {
    console.log(type);
    console.log(error.message);
    return {
      ...state,
      error: error,
      isLoading: false,
      isRemoveSuccess: false,
    };
  }),

  on(QueueActions.createQueueWithPlaylist, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isCreating: true,
      isCreateSuccess: false,
      error: null,
    };
  }),

  on(QueueActions.createQueueWithPlaylistSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isCreating: false,
      isCreateSuccess: true,
      error: null,
    };
  }),

  on(QueueActions.createQueueWithPlaylistFailure, (state, { error, type }) => {
    console.log(type);
    console.log(error);
    return {
      ...state,
      isCreating: false,
      isCreateSuccess: false,
      error: error,
    };
  }),

  //create queue with playlist random

  on(QueueActions.createQueueWithPlaylistRandom, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isCreating: true,
      isCreateSuccess: false,
      error: null,
    };
  }),

  on(
    QueueActions.createQueueWithPlaylistRandomSuccess,
    (state, { type, songQueueRandom }) => {
      console.log(type);
      return {
        ...state,
        songQueueRandom: songQueueRandom,
        isCreating: false,
        isCreateSuccess: true,
        error: null,
      };
    },
  ),

  on(
    QueueActions.createQueueWithPlaylistRandomFailure,
    (state, { error, type }) => {
      console.log(type);
      console.log(error);
      return {
        ...state,
        isCreating: false,
        isCreateSuccess: false,
        error: error,
      };
    },
  ),

  //clear state
  on(QueueActions.clearStateCreateQueueSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isCreateSuccess: false,
    };
  }),

  on(QueueActions.clearStateAddQueueRandomSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      songQueueRandom: <SongModel>{},
    };
  }),
);
