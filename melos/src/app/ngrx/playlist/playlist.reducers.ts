import {PlaylistState} from './playlist.state';
import {PlaylistModel} from '../../models/playlist.model';
import {createReducer, on} from '@ngrx/store';

import * as PlaylistActions from './playlist.actions'

export const initialPlaylistState: PlaylistState = {
  playlistDetail: <PlaylistModel>{},
  playlistList: <PlaylistModel[]>[],
  isLoading: false,
  error: null,
}

export const playlistReducer = createReducer(
  initialPlaylistState,

  on(PlaylistActions.getPlaylistById, (state, { type }) => {
    console.log(type);
    return{
      ...state,
      isLoading: true
    }
  }),

  on(PlaylistActions.getPlaylistByIdSuccess, (state, { playlistDetail, type}) =>{
    return <PlaylistState>{
      ...state,
      playlistDetail: playlistDetail,
      isLoading: false,
    }
  }),
  on(PlaylistActions.getPlaylistByIdFailure, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  }),

  // Lấy danh sách playlist

  on(PlaylistActions.getPlaylistByUserId, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(PlaylistActions.getPlaylistByUserIdSuccess, (state, { playlistList, type }) => {
    console.log(type);
    return <PlaylistState>{
      ...state,
      playlistList: playlistList,
      isLoading: false,
    };
  }),

  on(PlaylistActions.getPlaylistUserIdFailure, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  }),

  // Tạo danh mục Playlist mới
  on(PlaylistActions.createPlaylist, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(PlaylistActions.createPlaylistSuccess, (state, { playlist, type }) => {
    console.log(type);
    return <PlaylistState>{
      ...state,
      playlistDetail: playlist,
      isLoading: false,
    };
  }),

  on(PlaylistActions.createPlaylistFailure, (state, { error, type }) => {
    console.log(type);
    console.log(error);
    console.log(error.message);
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  }),
  on(PlaylistActions.clearPlaylistDetail, (state,{type}) => {
    console.log(type);
    return {
      ...state,
      playlistDetail: <PlaylistModel>{},
    };
  }),

)
