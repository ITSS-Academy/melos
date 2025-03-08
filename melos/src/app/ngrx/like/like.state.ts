import {SongModel} from '../../models/song.model';

export interface LikeState {
  songIdLikes: string[];
  isLoading: boolean;
  error: any;
}
