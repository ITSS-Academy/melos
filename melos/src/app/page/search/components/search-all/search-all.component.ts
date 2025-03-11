import {Component, OnDestroy, OnInit} from '@angular/core';
import {CardArtistComponent} from '../../../../shared/components/card-artist/card-artist.component';
import {MatTabsModule} from '@angular/material/tabs';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {MusicTabComponent} from '../../../../shared/components/music-tab/music-tab.component';
import {BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, map, Observable, Subscription} from 'rxjs';
import {SongModel} from '../../../../models/song.model';
import {SongState} from '../../../../ngrx/song/song.state';
import {Store} from '@ngrx/store';
import {AuthState} from '../../../../ngrx/auth/auth.state';
import {UploadState} from '../../../../ngrx/uploaded/uploaded.state';
import {AsyncPipe, NgIf} from '@angular/common';
import {AuthModel} from '../../../../models/auth.model';
import * as UploadActions from '../../../../ngrx/uploaded/uploaded.actions';
import * as SongActions from '../../../../ngrx/song/song.actions';
import {SearchState} from '../../../../ngrx/search/search.state';
import {LoadingComponent} from '../../../../shared/components/loading/loading.component';

@Component({
  selector: 'app-search-all',
  standalone: true,
  imports: [
    CardArtistComponent,
    MatTabsModule,
    RouterLink,
    RouterOutlet,
    MusicTabComponent,
    AsyncPipe,
    NgIf,
    LoadingComponent

  ],
  templateUrl: './search-all.component.html',
  styleUrl: './search-all.component.scss'
})
export class SearchAllComponent implements OnInit, OnDestroy {

  auth$!: Observable<AuthModel | null>;
  uploadSongList$!: Observable<SongModel[]>;
  subscription: Subscription[] = [];
  authData: AuthModel | null = null;
  uploadSongList: SongModel[] = [];
  isLoading$!: Observable<boolean>;
  songsList$!: Observable<SongModel[]>;
  searchUsers$!: Observable<AuthModel[]>; // Dành cho người dùng
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
    this.auth$ = this.store.select('auth', 'authData');
    this.isLoading$ = this.store.select('search', 'isLoading');
    this.songsList$ = this.store.select('songs', 'songList');
    this.uploadSongList$ = this.store.select('upload', 'uploadSongList');
    this.searchUsers$ = this.store.select((state) => state.search.search.auth || []); // Lấy người dùng từ auth
    this.searchSongs$ = this.store.select((state) => state.search.search.songs || []); // Lấy bài hát từ songs
    this.isLoading$ = this.store.select('search', 'isLoading');

  }


  ngOnInit() {
    this.subscription.push(
      this.auth$.subscribe((auth) => {
        if (auth?.uid) {
          this.authData = auth;
          console.log('authData', this.authData);
          this.store.dispatch(

            UploadActions.getUploadSongList({
              uid: this.authData.uid ?? '',
              idToken: this.authData.idToken ?? '',
            }),
          );
        }
      }),

      this.uploadSongList$.subscribe((uploadSongList) => {
        // console.log(uploadSongList);
        if (uploadSongList.length > 0) {
          this.uploadSongList = uploadSongList;
          console.log('uploadSongList', this.uploadSongList);
        } else {
          this.uploadSongList = []; // Đảm bảo luôn có giá trị mặc định
        }
      }),

      // this.searchUsers$.subscribe((results) => {
      //   console.log('Search results (users) from API:', results);
      // }),
      //
      // this.searchSongs$.subscribe((results) => {
      //   console.log('Search results (songs) from API:', results);
      // }),

    );

    // this.songsList$.subscribe((songs) => {
    //   console.log('Danh sách bài hát từ API:', songs);
    // });



    // Gọi API để lấy danh sách bài hát
    this.store.dispatch(SongActions.getSongList());


    if (this.authData) {
    }



  }





  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }


  onTabChange(event: any) {
    switch (event.index) {
      case 0:
        this.router.navigate(['/search/search-all']);
        break;
      case 1:
        this.router.navigate(['/search/search-peoples']);
        break;
      case 2:
        this.router.navigate(['/search/search-song']);
        break;
    }
  }
}


