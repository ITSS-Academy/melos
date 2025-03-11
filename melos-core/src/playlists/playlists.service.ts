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
          description: data.description,
          is_pined: false,
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
      created_at: new Date().toISOString(),
      image_url: publicUrl,
      description: data.description,
      is_pined: false,
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
          description: data.description,
          is_pined: false,
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
      created_at: new Date().toISOString(),
      image_url: data.image_url,
      description: data.description,
      is_pined: false,
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
    description: string,
    file: Express.Multer.File,
  ) {
    let playlist = await this.getPlaylistById(id);

    if (!playlist) {
      throw new HttpException('Playlist not found', HttpStatus.BAD_REQUEST);
    }

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
        .update({
          name: name,
          description: description,
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

  async updatePlaylistWithoutImage(
    id: string,
    uid: string,
    name: string,
    description: string,
  ) {
    let playlist = await this.getPlaylistById(id);
    if (playlist.uid !== uid) {
      throw new HttpException(
        'You are not authorized to update this playlist',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const { data: playlistData, error: playlistError } =
      await this.supabaseProvider
        .getClient()
        .from('playlists')
        .update({
          name: name,
          description: description,
        })
        .eq('id', id)
        .single();

    if (playlistError) {
      throw new HttpException(playlistError.message, HttpStatus.BAD_REQUEST);
    }

    let updatedPlaylist = await this.getPlaylistById(id);
    return updatedPlaylist;
  }

  async deletePlaylist(id: string, uid: string) {
    let playlist = await this.getPlaylistById(id);

    if (!playlist) {
      throw new HttpException('Playlist not found', HttpStatus.BAD_REQUEST);
    }

    if (playlist.uid !== uid) {
      throw new HttpException(
        'You are not authorized to delete this playlist',
        HttpStatus.UNAUTHORIZED,
      );
    }

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

    const { data: playlistData, error: playlistError } =
      await this.supabaseProvider
        .getClient()
        .from('playlists')
        .delete()
        .eq('id', id);

    if (playlistError) {
      throw new HttpException(playlistError.message, HttpStatus.BAD_REQUEST);
    }

    return true;
  }

  async getSongByPlaylistId(id: string): Promise<Song[]> {
    //call rpc
    const { data, error } = await this.supabaseProvider
      .getClient()
      .rpc('get_songs_with_playlist', { playlist_id: id });

    if (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }

    console.log('data', data);

    return data;
  }

  async updatePinedPlaylist(id: string, uid: string) {
    let playlist = await this.getPlaylistById(id);

    if (!playlist) {
      throw new HttpException('Playlist not found', HttpStatus.BAD_REQUEST);
    }

    if (playlist.uid !== uid) {
      throw new HttpException(
        'You are not authorized to update this playlist',
        HttpStatus.UNAUTHORIZED,
      );
    }

    console.log('playlist', playlist);
    let isPined = !playlist.is_pined;

    const { data: playlistData, error: playlistError } =
      await this.supabaseProvider
        .getClient()
        .from('playlists')
        .update({
          is_pined: isPined,
        })
        .eq('id', id)
        .single();

    if (playlistError) {
      throw new HttpException(playlistError.message, HttpStatus.BAD_REQUEST);
    }

    let updatedPlaylist = await this.getPlaylistById(id);
    return updatedPlaylist;
  }

  async removeSongFromPlaylist(
    playlistId: string,
    songId: string,
    uid: string,
  ) {
    let playListUser = await this.getPlaylistById(playlistId);

    if (!playListUser || playListUser === null || playListUser === undefined) {
      throw new HttpException('Playlist not found', HttpStatus.BAD_REQUEST);
    } else if (playListUser.uid !== uid) {
      throw new HttpException(
        'You are not authorized to update this playlist',
        HttpStatus.UNAUTHORIZED,
      );
    } else {
      if (playListUser.songs_id.includes(songId)) {
        playListUser.songs_id = playListUser.songs_id.filter(
          (song) => song !== songId,
        );

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
          'Song does not exist in playlist',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  async getListSongsIdAllPlaylists(uid: string) {
    const { data: listSongId, error: listSongIdError } =
      await this.supabaseProvider
        .getClient()
        .rpc('get_unique_songs_by_user', { p_uid: uid });

    if (listSongIdError) {
      throw new HttpException(listSongIdError.message, HttpStatus.BAD_REQUEST);
    }

    return listSongId;
  }
}
