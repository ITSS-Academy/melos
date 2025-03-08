import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { SupabaseProvider } from 'src/supabase/supabase';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(private supabaseProvider: SupabaseProvider) {}

  async createComment(song_id: string, uid: string, content: string) {
    const { data, error } = await this.supabaseProvider
      .getClient()
      .rpc('create_comment', {
        v_song_id: song_id,
        v_uid: uid,
        v_content: content,
      });
    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return data;
  }

  async getCommentBySongId(song_id: string) {
    const { data, error } = await this.supabaseProvider
      .getClient()
      .rpc('get_comments_by_song_id', {
        v_song_id: song_id,
      });
    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return data;
  }

  async deleteComeentById(id: string, uid: string) {
    const { data, error } = await this.supabaseProvider
      .getClient()
      .rpc('delete_comment', {
        v_id: id,
        v_uid: uid,
      });
    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return true;
  }
}
