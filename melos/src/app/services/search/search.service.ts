import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchModel } from '../../models/search.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  searchSong(query: string) {
    return this.http.get<SearchModel>(
      `http://localhost:3000/search/search-all?query=${query}`,
    );
  }
}
