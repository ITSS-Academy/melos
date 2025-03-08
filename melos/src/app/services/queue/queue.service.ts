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
    const formData = new FormData();
    formData.append('uid', queue.uid);
    formData.append('song_id', queue.song_id);
    return this.http.post<QueueModel>('http://localhost:3000/queue/add_to_queue',formData, {headers});
  }
}
