import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SupabaseProvider } from 'src/supabase/supabase';

@Injectable()
export class QueueService {
  constructor(private supabaseProvider: SupabaseProvider) {}

  async addSongToQueue(songId: string, uid: string) {
    // Add song to queue with RPC
    const { data, error } = await this.supabaseProvider
      .getClient()
      .rpc('add_to_queue', {
        v_song_id: songId,
        v_uid: uid,
      });

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return true;
  }

  async getSongQueue(uid: string) {
    // Get queue with RPC
    const { data, error } = await this.supabaseProvider
      .getClient()
      .rpc('get_queue_songs', {
        v_uid: uid,
      });

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return data;
  }

  async removeSongFromQueue(uid: string, songId: string) {
    // Remove song from queue with RPC
    const { data, error } = await this.supabaseProvider
      .getClient()
      .rpc('delete_queue_entry', {
        v_uid: uid,
        v_song_id: songId,
      });

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return data;
  }

  async addPlaylistToQueue(playlistId: string) {
    // Add playlist to queue with RPC
    const { data, error } = await this.supabaseProvider
      .getClient()
      .rpc('add_playlist_to_queue', {
        v_playlist_id: playlistId,
      });

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return true;
  }

  async addPlaylistToQueueRandom(playlistId: string) {
    // Add playlist to queue with RPC
    const { data, error } = await this.supabaseProvider
      .getClient()
      .rpc('add_playlist_to_queue_random', {
        v_playlist_id: playlistId,
      });

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    return true;
  }
}
