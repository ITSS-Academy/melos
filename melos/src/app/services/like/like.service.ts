import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {SongModel} from '../../models/song.model';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  constructor(private http: HttpClient) {}

  createLike(songId: string, uid: string, idToken: string) {
    const headers = {
      Authorization: idToken,
    };

    return this.http.post<any>(
      `http://localhost:3000/like/create-like`,
      { song_id: songId, uid: uid },
      { headers },
    );
  }

  getSongIdLiked(uid: string, idToken: string) {
    const headers = {
      Authorization: idToken,
    };

    return this.http.get<string[]>(
      `http://localhost:3000/like/get-song-id-liked-by-uid?uid=${uid}`,
      { headers },
    );
  }


}
