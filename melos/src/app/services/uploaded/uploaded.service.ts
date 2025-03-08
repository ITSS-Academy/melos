import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SongModel } from '../../models/song.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadedService {
  constructor(private http: HttpClient) {}

  getUploadList(idToken: string, uid: string) {
    const headers = {
      Authorization: idToken,
    };
    return this.http.get<SongModel[]>(
      `${environment.apiUrl}songs/user-song?uid=${uid}`,
      {
        headers,
      },
    );
  }
}
