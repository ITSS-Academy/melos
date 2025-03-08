import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SongModel} from '../../models/song.model';

@Injectable({
  providedIn: 'root'
})
export class UploadedService {

  constructor(private http: HttpClient) {}

  getUploadList(idToken: string, uid: string) {
    const headers = {
      Authorization: idToken,
    };
    return this.http.get<SongModel[]>(
      `http://localhost:3000/songs/user-song?uid=${uid}`,
      {
        headers,
      },
    );
  }
}
