import {createAction, props} from '@ngrx/store';
import {PlaylistModel} from '../../models/playlist.model';



export const getPlaylistById = createAction(
  '[Playlist] Get PlayList Detail',
  props<{ id: string }>(),
);
export const getPlaylistByIdSuccess = createAction(
  '[Playlist]  Get Playlist Detail Success',
  props<{ playlistDetail: PlaylistModel }>()
)
export const getPlaylistByIdFailure = createAction(
  '[Playlist] Get PlayList Failure',
  props<{error: any}>()
)


// lấy List danh mục
export const getPlaylistByUserId = createAction(
  '[Playlist] Get Playlist List',
  props<{ uid: string; idToken: string }>()
);

export const getPlaylistByUserIdSuccess = createAction(
  '[PlaylistList] Get Playlist List Success',
  props<{ playlistList: PlaylistModel[] }>(),
);

export const getPlaylistUserIdFailure = createAction(
  '[PlaylistList] Get Playlist List Failure',
  props<{ error: any }>(),
);

// Tạo List mục mới
export const createPlaylist = createAction(
  '[Playlist] Create Playlist',
  props<{ playlist: PlaylistModel; idToken: string }>(),
);

export const createPlaylistSuccess = createAction(
  '[Playlist] Create Playlist Success',
  props<{ playlist: PlaylistModel }>(),
);

export const createPlaylistFailure = createAction(
  '[Playlist] Create Playlist Failure',
  props<{ error: any }>(),
);

export const clearPlaylistDetail = createAction(
  '[Playlist] Clear Playlist Detail'
);

