import { PlaylistState } from './playlist.state';
import { PlaylistModel } from '../../models/playlist.model';
import { createReducer, on } from '@ngrx/store';

import * as PlaylistActions from './playlist.actions';

export const initialPlaylistState: PlaylistState = {
  playlistDetail: <PlaylistModel>{},
  playlistList: <PlaylistModel[]>[],
  isLoading: false,
  isLoadingDetail: false,
  isDeletedSuccess: false,
  isAddSongSuccess: false,
  error: null,
};

export const playlistReducer = createReducer(
  initialPlaylistState,

  on(PlaylistActions.getPlaylistById, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoadingDetail: true,
    };
  }),

  on(
    PlaylistActions.getPlaylistByIdSuccess,
    (state, { playlistDetail, type }) => {
      console.log(type);
      return <PlaylistState>{
        ...state,
        playlistDetail: playlistDetail,
        isLoadingDetail: false,
      };
    },
  ),
  on(PlaylistActions.getPlaylistByIdFailure, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      error: error,
      isLoadingDetail: false,
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

  on(
    PlaylistActions.getPlaylistByUserIdSuccess,
    (state, { playlistList, type }) => {
      console.log(type);
      return <PlaylistState>{
        ...state,
        playlistList: playlistList,
        isLoading: false,
      };
    },
  ),

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
    return <PlaylistState>{
      ...state,
      playlistList: [...state.playlistList, playlist],
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
  on(PlaylistActions.clearStatePlaylist, (state, { type }) => {
    console.log(type);
    return {
      playlistDetail: <PlaylistModel>{},
      playlistList: <PlaylistModel[]>[],
      isLoading: false,
      isLoadingDetail: false,
      isDeletedSuccess: false,
      isAddSongSuccess: false,
      error: null,
    };
  }),

  // Delete Playlist
  on(PlaylistActions.deletePlaylistById, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
      isDeletedSuccess: false,
    };
  }),

  on(PlaylistActions.deletePlaylistByIdSuccess, (state, { type }) => {
    console.log(type);
    return <PlaylistState>{
      ...state,
      isLoading: false,
      isDeletedSuccess: true,
    };
  }),
  on(PlaylistActions.deletePlaylistByIdFailure, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      error: error,
      isLoading: false,
      isDeletedSuccess: true,
    };
  }),

  // Edit Playlist
  on(PlaylistActions.editPlaylistById, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
    };
  }),

  on(PlaylistActions.editPlaylistByIdSuccess, (state, { playlist, type }) => {
    return <PlaylistState>{
      ...state,
      playlistDetail: playlist,
      isLoading: false,
    };
  }),
  on(PlaylistActions.editPlaylistByIdFailure, (state, { error, type }) => {
    console.log(type);
    return {
      ...state,
      error: error,
      isLoading: false,
    };
  }),

  on(PlaylistActions.clearStatePlaylistDetail, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      playlistDetail: <PlaylistModel>{},
    };
  }),

  //add song to playlist
  on(PlaylistActions.addSongToPlaylist, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isLoading: true,
      isAddSongSuccess: false,
    };
  }),

  on(PlaylistActions.addSongToPlaylistSuccess, (state, { type }) => {
    console.log(type);
    return <PlaylistState>{
      ...state,
      isLoading: false,
      isAddSongSuccess: true,
    };
  }),

  on(PlaylistActions.addSongToPlaylistFailure, (state, { error, type }) => {
    console.log(type);
    console.log(error);
    return {
      ...state,
      error: error,
      isLoading: false,
      isAddSongSuccess: false,
    };
  }),

  on(PlaylistActions.clearStateAddSongToPlaylistSuccess, (state, { type }) => {
    console.log(type);
    return {
      ...state,
      isAddSongSuccess: false,
    };
  }),
);
