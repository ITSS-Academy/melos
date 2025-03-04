import { SongModel } from '../../models/song.model';

export interface HistoryState {
  historySongList: SongModel[];
  isLoading: boolean;
  error: any;
}
