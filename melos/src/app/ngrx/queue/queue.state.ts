import { QueueModel } from '../../models/queue.model';
export interface QueueState {
  songsQueue: QueueModel;
  error: any;
  isLoading: boolean;
  isCreateSuccess: boolean;
}
