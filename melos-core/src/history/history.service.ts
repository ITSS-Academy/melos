import { Injectable } from '@nestjs/common';
import { SupabaseProvider } from 'src/supabase/supabase';

@Injectable()
export class HistoryService {
  constructor(private supabaseProvider: SupabaseProvider) {}

  async createHistory(uid: string, songId: string) {
    const { data, error } = await this.supabaseProvider
      .getClient()
      .rpc('upsert_history', { p_uid: uid, p_song_id: songId });

    if (error) {
      throw new Error(error.message);
    }

    const historyUser = await this.getHistoriesByUid(uid);

    return historyUser;
  }

  async getHistoriesByUid(uid: string): Promise<History[]> {
    const { data, error } = await this.supabaseProvider
      .getClient()
      .rpc('get_user_history_songs', { v_uid: uid });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
