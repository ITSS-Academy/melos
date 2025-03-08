import {Component, OnDestroy, OnInit} from '@angular/core';
import {CardArtistComponent} from '../../../../shared/components/card-artist/card-artist.component';
import {MatTabsModule} from '@angular/material/tabs';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {MusicTabComponent} from '../../../../shared/components/music-tab/music-tab.component';
import {Observable, Subscription} from 'rxjs';
import {SongModel} from '../../../../models/song.model';
import {SongState} from '../../../../ngrx/song/song.state';
import {Store} from '@ngrx/store';
import {AuthState} from '../../../../ngrx/auth/auth.state';
import {UploadState} from '../../../../ngrx/uploaded/uploaded.state';
import {AsyncPipe, NgIf} from '@angular/common';
import {AuthModel} from '../../../../models/auth.model';
import * as UploadActions from '../../../../ngrx/uploaded/uploaded.actions';
import * as SongActions from '../../../../ngrx/song/song.actions';

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
    NgIf

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


  constructor(
    private router: Router,

    private store: Store<{
      auth: AuthState;
      upload: UploadState;
      songs: SongState;
    }>,
  ) {
    this.auth$ = this.store.select('auth', 'authData');
    this.isLoading$ = this.store.select('upload', 'isLoading');
    this.songsList$ = this.store.select('songs', 'songList');
    this.uploadSongList$ = this.store.select('upload', 'uploadSongList');
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


