import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { SupabaseProvider } from 'src/supabase/supabase';
import { Playlist } from './entities/playlist.entity';
import { v4 as uuidv4 } from 'uuid';
import { Song } from 'src/songs/entities/song.entity';

@Injectable()
export class PlaylistsService {
  constructor(private readonly supabaseProvider: SupabaseProvider) {}

  async getPlayListsByUserId(uid: string): Promise<Playlist[]> {
    const { data: playlistsData, error: playlistsDataError } =
      await this.supabaseProvider
        .getClient()
        .from('playlists')
        .select('*')
        .eq('uid', uid);

    if (playlistsDataError) {
      throw new HttpException(
        playlistsDataError.message,
        HttpStatus.BAD_REQUEST,
      );
    }

    console.log('playlistsData', playlistsData);
    return playlistsData;
  }

  async getPlaylistById(id: string): Promise<Playlist> {
    const { data: playlistsData, error: playlistsDataError } =
      await this.supabaseProvider
        .getClient()
        .from('playlists')
        .select('*')
        .eq('id', id)
        .single();

    if (playlistsDataError) {
      throw new HttpException(
        playlistsDataError.message,
        HttpStatus.BAD_REQUEST,
      );
    }

    return playlistsData;
  }

  async createPlaylistWithImage(file: Express.Multer.File, data: Partial<any>) {
    let id = uuidv4();
    const filePath = `${id}/${Date.now()}_${file.originalname}`;
    const { data: uploadData, error: uploadError } = await this.supabaseProvider
      .getClient()
      .storage.from('playlists')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (uploadError) {
      throw new HttpException(
        uploadError.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const publicUrl = this.supabaseProvider
      .getClient()
      .storage.from('playlists')
      .getPublicUrl(filePath).data.publicUrl;

    const { data: playlistData, error: playlistError } =
      await this.supabaseProvider
        .getClient()
        .from('playlists')
        .insert({
          id: id,
          uid: data.uid,
          name: data.name,
          image_url: publicUrl,
          songs_id: data.songs_id,
        })
        .single();

    if (playlistError) {
      throw new HttpException(playlistError.message, HttpStatus.BAD_REQUEST);
    }

    return playlistData;
  }

  async createPlaylistWithoutImage(data: Partial<any>) {
    const { data: playlistData, error: playlistError } =
      await this.supabaseProvider
        .getClient()
        .from('playlists')
        .insert({
          id: uuidv4(),
          uid: data.uid,
          name: data.name,
          songs_id: data.songs_id,
        })
        .single();

    if (playlistError) {
      throw new HttpException(playlistError.message, HttpStatus.BAD_REQUEST);
    }

    return playlistData;
  }
}
