import { PlayState } from './play.state';
import { createReducer, on } from '@ngrx/store';
import * as PlayActions from './play.actions';

export const initialState: PlayState = {
  isPlaying: false,
};

export const playReducer = createReducer(
  initialState,

  on(PlayActions.play, (state, { type }) => {
    console.log(type);
    return <PlayState>{
      isPlaying: true,
    };
  }),

  on(PlayActions.pause, (state, { type }) => {
    console.log(type);
    return <PlayState>{
      isPlaying: false,
    };
  }),
);
