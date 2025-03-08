import { CommentModel } from '../../models/comment.model';

export interface CommentState {
  commentList: CommentModel[];
  isLoading: boolean;
  error: any;
}
