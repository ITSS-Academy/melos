import { PlaylistModel} from '../../models/playlist.model';

export interface PlaylistState{
   playlistDetail: PlaylistModel;
   playlistList: PlaylistModel[];
   isLoading: boolean;
   error: any;
}

