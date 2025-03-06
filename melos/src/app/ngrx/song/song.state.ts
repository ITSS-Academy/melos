import { SongModel } from '../../models/song.model';
export interface SongState {
  songDetail: SongModel;
  songList: SongModel[];
  isLoading: boolean;
  error: any;
  songCategories: SongModel[];
  songQueue: SongModel[];
}
