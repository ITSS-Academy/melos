import {SongModel} from '../../models/song.model';

export interface LikeState {
  songIdLikes: string[];
  isLoading: boolean;
  isLikedDeleteSuccess: boolean
  isLikedSuccess: boolean;
  error: any;
}
