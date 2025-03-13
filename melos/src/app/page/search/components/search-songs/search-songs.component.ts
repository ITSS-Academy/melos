import { Component } from '@angular/core';
import {CardArtistComponent} from "../../../../shared/components/card-artist/card-artist.component";
import {MusicTabComponent} from "../../../../shared/components/music-tab/music-tab.component";
import {Observable, Subscription} from 'rxjs';
import {SongModel} from '../../../../models/song.model';
import {Store} from '@ngrx/store';
import {AsyncPipe, NgIf} from '@angular/common';
import {Router} from '@angular/router';
import {AuthState} from '../../../../ngrx/auth/auth.state';
import {UploadState} from '../../../../ngrx/uploaded/uploaded.state';
import {SongState} from '../../../../ngrx/song/song.state';
import {SearchState} from '../../../../ngrx/search/search.state';


@Component({
  selector: 'app-search-songs',
  standalone: true,
  imports: [
    CardArtistComponent,
    MusicTabComponent,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './search-songs.component.html',
  styleUrl: './search-songs.component.scss'
})
export class SearchSongsComponent {
  isLoading$!: Observable<boolean>;
  songsList$!: Observable<SongModel[]>;
  subscription: Subscription[] = [];
  searchSongs$!: Observable<SongModel[]>; // Dành cho bài hát

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
    this.searchSongs$ = this.store.select((state) => state.search.search.songs || []); // Lấy bài hát từ songs
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }


}
