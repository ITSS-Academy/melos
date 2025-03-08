import {QueueModel} from "../../models/queue.model";
import {SongModel} from "../../models/song.model";
export interface QueueState {
    songsQueue: QueueModel;
    error: any;
    isLoading: boolean;
}