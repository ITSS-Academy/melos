import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SearchModel } from '../../models/search.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  searchSong(query: string) {
    return this.http.get<SearchModel>(
      `${environment.apiUrl}search/search-all?query=${query}`,
    );
  }
}
