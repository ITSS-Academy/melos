import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class QueueService {

  constructor(private http: HttpClient) { }

  getQueueList(uid: string) {
    const headers = {
      Authorization: uid
    };
    return this.http.post('http://localhost:3000/queue/add_to_queue', {headers});
  }
}
