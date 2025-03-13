import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardArtistComponent } from '../../../../shared/components/card-artist/card-artist.component';
import { MatTabsModule } from '@angular/material/tabs';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MusicTabComponent } from '../../../../shared/components/music-tab/music-tab.component';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  Subscription,
} from 'rxjs';
import { SongModel } from '../../../../models/song.model';
import { SongState } from '../../../../ngrx/song/song.state';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../../ngrx/auth/auth.state';
import { UploadState } from '../../../../ngrx/uploaded/uploaded.state';
import { AsyncPipe, NgIf } from '@angular/common';
import { AuthModel } from '../../../../models/auth.model';
import * as UploadActions from '../../../../ngrx/uploaded/uploaded.actions';
import * as SongActions from '../../../../ngrx/song/song.actions';
import { SearchState } from '../../../../ngrx/search/search.state';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import { LikeState } from '../../../../ngrx/like/like.state';

@Component({
  selector: 'app-search-all',
  standalone: true,
  imports: [
    CardArtistComponent,
    MatTabsModule,

    MusicTabComponent,
    AsyncPipe,
    NgIf,
    LoadingComponent,
  ],
  templateUrl: './search-all.component.html',
  styleUrl: './search-all.component.scss',
})
export class SearchAllComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  authData: AuthModel | null = null;
  isLoading$!: Observable<boolean>;
  songsList$!: Observable<SongModel[]>;
  searchUsers$!: Observable<AuthModel[]>; // Dành cho người dùng
  searchSongs$!: Observable<SongModel[]>; // Dành cho bài hát
  likeList$!: Observable<string[]>;
  likeList: string[] = [];
  constructor(
    private store: Store<{
      auth: AuthState;
      upload: UploadState;
      songs: SongState;
      search: SearchState;
      like: LikeState;
    }>,
  ) {
    this.isLoading$ = this.store.select('search', 'isLoading');
    this.songsList$ = this.store.select('songs', 'songList');
    this.searchUsers$ = this.store.select(
      (state) => state.search.search.auth || [],
    ); // Lấy người dùng từ auth
    this.searchSongs$ = this.store.select(
      (state) => state.search.search.songs || [],
    ); // Lấy bài hát từ songs
    this.likeList$ = this.store.select('like', 'songIdLikes');
  }

  ngOnInit() {
    this.subscription.push(
      this.likeList$.subscribe((likeList) => {
        if (likeList.length > 0) {
          this.likeList = likeList;
        }
      }),

      this.likeList$.subscribe((likeLists) => {
        //chose
        if (likeLists.length > 0) {
          this.likeList = likeLists;
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
