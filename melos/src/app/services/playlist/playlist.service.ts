import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlaylistModel } from '../../models/playlist.model';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SongModel } from '../../models/song.model';
@Injectable({
  providedIn: 'root',
})
export class PlaylistService {
  constructor(private http: HttpClient) {}

  getPlaylistById(uid: string, idToken: string) {
    const headers = {
      Authorization: idToken,
    };

    return this.http.get<PlaylistModel[]>(
      `${environment.apiUrl}playlists/user?uid=${uid}`,
      { headers },
    );
  }
  getPlaylistDetail(playlistId: string) {
    return this.http.get<PlaylistModel>(
      `${environment.apiUrl}playlists/user/playlist?id=${playlistId}`,
    );
  }

  deletePlaylistById(playlistId: string, uid: string, idToken: string) {
    const headers = {
      Authorization: idToken,
    };
    console.log(`${environment.apiUrl}playlists?id=${playlistId}&uid=${uid}`);
    return this.http.delete(
      `${environment.apiUrl}playlists?id=${playlistId}&uid=${uid}`,
      {
        headers,
      },
    );
  }
  updatePlaylistById(playlist: PlaylistModel, idToken: string) {
    const headers = {
      Authorization: idToken,
    };

    const formData = new FormData();

    if (playlist.image_url instanceof File) {
      formData.append('uid', playlist.uid);
      formData.append('id', playlist.id);
      formData.append('name', playlist.name);
      formData.append('file', playlist.image_url);
      formData.append('description', playlist.description);
    } else {
      formData.append('uid', playlist.uid);
      formData.append('id', playlist.id);
      formData.append('name', playlist.name);
      formData.append('description', playlist.description);
    }

    return this.http.put<PlaylistModel>(
      `${environment.apiUrl}playlists/update-playlist`,
      formData,
      {
        headers,
      },
    );
  }

  createPlaylist(playlist: PlaylistModel, idToken: string) {
    const headers = {
      Authorization: idToken,
    };

    console.log('song services create playlist', playlist);
    console.log(playlist.uid);
    const formData = new FormData();
    formData.append('uid', playlist.uid);
    formData.append('name', playlist.name);
    formData.append('file', playlist.image_url);
    formData.append('created_at', playlist.created_at);
    formData.append('description', playlist.description);
    formData.append('is_pined', JSON.stringify(playlist.is_pined));
    formData.append('songs_id', JSON.stringify(playlist.songs_id));

    return this.http.post<PlaylistModel>(
      `${environment.apiUrl}playlists`,
      formData,
      {
        headers,
      },
    );
  }

  addSongToPlaylist(
    playlistId: string,
    songId: string,
    uid: string,
    idToken: string,
  ) {
    const headers = {
      Authorization: idToken,
    };
    const body = {
      id: playlistId,
      songId: songId,
      uid: uid,
    };
    return this.http.post<PlaylistModel>(
      `${environment.apiUrl}playlists/update-songList`,
      body,
      {
        headers,
      },
    );
  }
}
