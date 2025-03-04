import { Injectable } from '@nestjs/common';
import { SupabaseProvider } from 'src/supabase/supabase';

@Injectable()
export class HistoryService {
  constructor(private supabaseProvider: SupabaseProvider) {}

  async createHistory(uid: string, songId: string) {
    const { data, error } = await this.supabaseProvider
      .getClient()
      .from('histories')
      .insert({
        uid,
        song_id: songId,
      });

    if (error) {
      throw new Error(error.message);
    }

    return data;
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
