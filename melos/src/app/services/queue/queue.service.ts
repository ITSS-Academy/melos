import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {QueueModel} from "../../models/queue.model";

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor(private http: HttpClient) { }

  addQueueSong(queue: QueueModel, idToken: string) {
    const headers = {
      Authorization: idToken
    };
    const body = {
        uid: queue.uid,
        songId: queue.song_id
    }
    console.log(headers);
    return this.http.post<QueueModel>('http://localhost:3000/queue/create-song-queues',body, {headers});
  }

  removeQueueSong(queue: QueueModel, idToken: string) {
    const headers = {
      Authorization: idToken
    };
    return this.http.delete<QueueModel>('http://localhost:3000/queue/delete-song-queues?uid='+queue.uid+"&songId="+queue.song_id ,{headers});
  }
}
