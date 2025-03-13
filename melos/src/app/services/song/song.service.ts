import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SongModel } from '../../models/song.model';
import { BehaviorSubject } from 'rxjs';
import { idToken } from '@angular/fire/auth';
import { environment } from '../../../environments/environment';
import { LocalstoreSongService } from '../localstore-song/localstore.song.service';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  public currentPlaySong: any;
  constructor(
    private http: HttpClient,
    private localStoreSongService: LocalstoreSongService,
  ) {}

  getSongDetail(songId: string) {
    return this.http.get<SongModel>(`${environment.apiUrl}songs?id=${songId}`);
  }

  getSongList() {
    return this.http.get<SongModel[]>(`${environment.apiUrl}songs/all`);
  }

  getSongByCategory(categoryId: string) {
    return this.http.get<SongModel[]>(
      `${environment.apiUrl}songs/category-song?id=${categoryId}`,
    );
  }

  getSongQueue(uid: string, idToken: string) {
    const headers = {
      Authorization: idToken,
    };
    return this.http.get<SongModel[]>(
      `${environment.apiUrl}queue/get-song-queues-user?uid=` + uid,
      { headers },
    );
  }

  getSongByPlaylist(playlistId: string, idToken: string) {
    const headers = {
      Authorization: idToken,
    };
    return this.http.get<SongModel[]>(
      `${environment.apiUrl}playlists/playlist-song?id=${playlistId}`,
      { headers },
    );
  }

  createSong(song: SongModel, idToken: string) {
    //with header Authorization
    const headers = {
      Authorization: idToken,
    };

    const formData = new FormData();
    formData.append('title', song.title);
    formData.append('composer', song.composer);
    formData.append('performer', song.performer);
    formData.append('files', song.file_path);
    formData.append('files', song.image_url);
    formData.append('uuid', song.uuid);
    formData.append('views', song.views.toString());
    formData.append('category_id', song.category_id);
    return this.http.post<SongModel>(`${environment.apiUrl}songs`, formData, {
      headers,
    });
  }

  updateSongViews(songId: string) {
    return this.http.put(
      `${environment.apiUrl}songs/update-views?id=${songId}`,
      {},
    );
  }

  getSongLiked(uid: string, idToken: string) {
    const headers = {
      Authorization: idToken,
    };
    return this.http.get<SongModel[]>(
      `${environment.apiUrl}like/get-song-liked-by-uid?uid=${uid}`,
      { headers },
    );
  }

  removeSongFromPlaylist(
    playlistId: string,
    songId: string,
    uid: string,
    idToken: string,
  ) {
    const headers = {
      Authorization: idToken,
    };

    return this.http.delete<SongModel[]>(
      `${environment.apiUrl}playlists/song?id=${playlistId}&songId=${songId}&uid=${uid}`,
      { headers },
    );
  }

  private currentSongSubject = new BehaviorSubject<SongModel | null>(null);
  currentSong$ = this.currentSongSubject.asObservable();

  setCurrentSong(song: SongModel) {
    this.currentPlaySong = song;
    this.currentSongSubject.next(song);
    this.localStoreSongService.saveSong(song);
  }
}
