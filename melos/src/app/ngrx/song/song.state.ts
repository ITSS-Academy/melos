import { SongModel } from '../../models/song.model';
export interface SongState {
  songDetail: SongModel;
  songList: SongModel[];
  songListLiked: SongModel[];
  isLoading: boolean;
  error: any;
  songCategories: SongModel[];
  songQueue: SongModel[];
  songPlaylist: SongModel[];
}
