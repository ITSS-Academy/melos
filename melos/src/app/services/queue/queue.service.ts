import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { QueueModel } from '../../models/queue.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QueueService {
  constructor(private http: HttpClient) {}

  addQueueSong(queue: QueueModel, idToken: string) {
    const headers = {
      Authorization: idToken,
    };
    const body = {
      uid: queue.uid,
      songId: queue.song_id,
    };
    return this.http.post<QueueModel>(
      `${environment.apiUrl}queue/create-song-queues`,
      body,
      { headers },
    );
  }

  removeQueueSong(queue: QueueModel, idToken: string) {
    const headers = {
      Authorization: idToken,
    };
    return this.http.delete<QueueModel>(
      `${environment.apiUrl}queue/delete-song-queues?uid=` +
        queue.uid +
        '&songId=' +
        queue.song_id,
      { headers },
    );
  }

  createQueueWithPlaylist(playlistId: string, idToken: string) {
    const headers = {
      Authorization: idToken,
    };
    const body = {
      playlistId: playlistId,
    };

    return this.http.post(`${environment.apiUrl}queue/playlist-queues`, body, {
      headers,
    });
  }

  createQueueWithPlaylistRandom(playlistId: string, idToken: string) {
    const headers = {
      Authorization: idToken,
    };

    const body = {
      playlistId: playlistId,
    };

    return this.http.post(
      `${environment.apiUrl}queue/playlist-queues-random`,
      body,
      {
        headers,
      },
    );
  }
}
