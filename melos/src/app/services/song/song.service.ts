import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SongModel } from '../../models/song.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  constructor(private http: HttpClient) {}

  getSongDetail(songId: string) {
    return this.http.get<SongModel>(
      `http://localhost:3000/songs/${songId}/hls-url`,
    );
  }

  getSongList() {
    return this.http.get<SongModel[]>('http://localhost:3000/songs/all');
  }

  createSong(song: SongModel, idToken: string) {
    //with header Authorization
    const headers = {
      Authorization: idToken,
    };

    console.log('song services create song', song);
    const formData = new FormData();
    formData.append('title', song.title);
    formData.append('composer', song.composer);
    formData.append('performer', song.performer);
    formData.append('files', song.file_path);
    formData.append('files', song.image_url);
    formData.append('uuid', song.uuid);
    formData.append('views', song.views.toString());
    formData.append('category_id', song.category_id);
    return this.http.post<SongModel>('http://localhost:3000/songs', formData, {
      headers,
    });
  }

  updateSongViews(songId: string) {
    return this.http.put(
      `http://localhost:3000/songs/update-views?id=${songId}`,
      {},
    );
  }

  private currentSongSubject = new BehaviorSubject<SongModel | null>(null);
  currentSong$ = this.currentSongSubject.asObservable();

  setCurrentSong(song: SongModel) {
    this.currentSongSubject.next(song);
  }
}
