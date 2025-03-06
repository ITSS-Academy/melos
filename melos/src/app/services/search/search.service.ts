import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  searchSong(query: string) {
    return this.http.get<any>(
      `http://localhost:3000/songs/search?query=${query}`,
    );
  }
}
