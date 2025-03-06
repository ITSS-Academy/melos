import {SongModel} from '../../models/song.model';

export interface UploadState {
  uploadSongList: SongModel[];
  isLoading: boolean;
  error: any;
}
