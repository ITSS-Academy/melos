import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { SupabaseProvider } from 'src/supabase/supabase';
import { Playlist } from './entities/playlist.entity';
import { v4 as uuidv4 } from 'uuid';
import { Song } from 'src/songs/entities/song.entity';
import { get } from 'http';
import { create } from 'domain';

@Injectable()
export class PlaylistsService {
  constructor(private readonly supabaseProvider: SupabaseProvider) {}

  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

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
        .eq('id', id);

    if (playlistsDataError) {
      throw new HttpException(
        playlistsDataError.message,
        HttpStatus.BAD_REQUEST,
      );
    }

    return playlistsData[0];
  }

  async createPlaylistWithImage(file: Express.Multer.File, data: Partial<any>) {
    let id = uuidv4();
    const min = 111111111111111111111;
    const max = 999999999999999999999;
    const randomNumber = this.getRandomNumber(min, max);
    const filePath = `${id}/${Date.now()}_${randomNumber}`;
    const { data: uploadData, error: uploadError } = await this.supabaseProvider
      .getClient()
      .storage.from('songs/playlists')
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
      .storage.from('songs/playlists')
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

    let playlist = {
      id: id,
      uid: data.uid,
      name: data.name,
      songs_id: data.songs_id,
      created_at: Date.now().toString(),
      image_url: publicUrl,
    };

    return playlist;
  }

  async createPlaylistWithoutImage(data: Partial<any>) {
    let id = uuidv4();
    const { data: playlistData, error: playlistError } =
      await this.supabaseProvider
        .getClient()
        .from('playlists')
        .insert({
          id: id,
          uid: data.uid,
          name: data.name,
          songs_id: data.songs_id,
          image_url: data.image_url,
        })
        .single();

    if (playlistError) {
      throw new HttpException(playlistError.message, HttpStatus.BAD_REQUEST);
    }

    let playlist = {
      id: id,
      uid: data.uid,
      name: data.name,
      songs_id: data.songs_id,
      created_at: Date.now().toString(),
      image_url: data.image_url,
    };

    return playlist;
  }

  async addSongToPlaylist(playlistId: string, songId: string, uid: string) {
    let playListUser = await this.getPlaylistById(playlistId);

    if (!playListUser || playListUser === null || playListUser === undefined) {
      let playlist = await this.createPlaylistWithoutImage({
        uid: uid,
        name: 'New Playlist',
        songs_id: [songId],
      });

      return playlist;
    } else {
      if (!playListUser.songs_id.includes(songId)) {
        playListUser.songs_id.push(songId);

        const { data: playlistData, error: playlistError } =
          await this.supabaseProvider
            .getClient()
            .from('playlists')
            .upsert({
              id: playlistId,
              songs_id: playListUser.songs_id,
            })
            .eq('id', playlistId)
            .single();

        if (playlistError) {
          throw new HttpException(
            playlistError.message,
            HttpStatus.BAD_REQUEST,
          );
        }

        let playlist = await this.getPlaylistById(playlistId);
        return playlist;
      } else {
        throw new HttpException(
          'Song already exist in playlist',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  async updatePlaylistWithImage(
    id: string,
    uid: string,
    name: string,
    file: Express.Multer.File,
  ) {
    let playlist = await this.getPlaylistById(id);
    if (playlist.uid !== uid) {
      throw new HttpException(
        'You are not authorized to update this playlist',
        HttpStatus.UNAUTHORIZED,
      );
    }

    console.log('playlist id', id);
    //remove folder with playlist id in storage
    if (playlist.image_url) {
      const filePath = playlist.image_url.split('/').slice(8).join('/');
      console.log('filePath', filePath);
      const { data: deleteData, error: deleteError } =
        await this.supabaseProvider
          .getClient()
          .storage.from('songs')
          .remove([filePath]);

      if (deleteError) {
        throw new HttpException(deleteError.message, HttpStatus.BAD_REQUEST);
      }
    }

    const min = 111111111111111111111;
    const max = 999999999999999999999;
    const randomNumber = this.getRandomNumber(min, max);
    const filePath = `${id}/${Date.now()}_${randomNumber}`;
    const { data: uploadData, error: uploadError } = await this.supabaseProvider
      .getClient()
      .storage.from('songs')
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
      .storage.from('songs/playlists')
      .getPublicUrl(filePath).data.publicUrl;

    const { data: playlistData, error: playlistError } =
      await this.supabaseProvider
        .getClient()
        .from('playlists')
        .upsert({
          id: id,
          uid: uid,
          name: name,
          image_url: publicUrl,
        })
        .eq('id', id)
        .single();

    if (playlistError) {
      throw new HttpException(playlistError.message, HttpStatus.BAD_REQUEST);
    }

    let updatedPlaylist = await this.getPlaylistById(id);
    return updatedPlaylist;
  }
}
