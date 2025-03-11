import { Component } from '@angular/core';
import {CardArtistComponent} from "../../../../shared/components/card-artist/card-artist.component";
import {AsyncPipe, NgIf} from '@angular/common';
import {Observable, Subscription} from 'rxjs';
import {SongModel} from '../../../../models/song.model';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AuthState} from '../../../../ngrx/auth/auth.state';
import {UploadState} from '../../../../ngrx/uploaded/uploaded.state';
import {SongState} from '../../../../ngrx/song/song.state';
import {SearchState} from '../../../../ngrx/search/search.state';
import {AuthModel} from '../../../../models/auth.model';

@Component({
  selector: 'app-search-peoples',
  standalone: true,
  imports: [
    CardArtistComponent,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './search-peoples.component.html',
  styleUrl: './search-peoples.component.scss'
})
export class SearchPeoplesComponent {

  isLoading$!: Observable<boolean>;
  songsList$!: Observable<SongModel[]>;
  subscription: Subscription[] = [];
  searchUsers$!: Observable<AuthModel[]>; // Dành cho người dùng

  constructor(
    private router: Router,

    private store: Store<{
      auth: AuthState;
      upload: UploadState;
      songs: SongState;
      search: SearchState;
    }>,
  ) {
    this.isLoading$ = this.store.select('search', 'isLoading');
    this.songsList$ = this.store.select('songs', 'songList');
    this.searchUsers$ = this.store.select((state) => state.search.search.auth || []); // Lấy người dùng từ auth
  }

  ngOnInit() {
    this.subscription.push(

      this.searchUsers$.subscribe((results) => {
        console.log('Search results (songs) from API:', results);
      }),
    )}

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }


}
