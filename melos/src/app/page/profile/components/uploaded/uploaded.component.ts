import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {AuthModel} from '../../../../models/auth.model';
import {SongModel} from '../../../../models/song.model';
import  * as UploadActions from '../../../../ngrx/uploaded/uploaded.actions';
import {Store} from '@ngrx/store';
import {AuthState} from '../../../../ngrx/auth/auth.state';
import {UploadState} from '../../../../ngrx/uploaded/uploaded.state';
import {AsyncPipe, NgIf} from '@angular/common';
import {LoadingComponent} from '../../../../shared/components/loading/loading.component';
import {MusicTabComponent} from '../../../../shared/components/music-tab/music-tab.component';
import {SongState} from '../../../../ngrx/song/song.state';
import  * as SongActions from '../../../../ngrx/song/song.actions';
import {LikeState} from '../../../../ngrx/like/like.state';

@Component({
  selector: 'app-uploaded',
  standalone: true,
  imports: [
    AsyncPipe,
    LoadingComponent,
    MusicTabComponent,
    NgIf
  ],
  templateUrl: './uploaded.component.html',
  styleUrl: './uploaded.component.scss'
})
export class UploadedComponent implements OnInit, OnDestroy {
  auth$!: Observable<AuthModel | null>;
  uploadSongList$!: Observable<SongModel[]>;
  subscription: Subscription[] = [];
  authData: AuthModel | null = null;
  uploadSongList: SongModel[] = [];
  isLoading$!: Observable<boolean>;
  songsList$!: Observable<SongModel[]>;
  likeList$!: Observable<string[]>;
  likeList: string[] = [];

  constructor(
    private store: Store<{
      auth: AuthState;
      upload: UploadState;
      songs: SongState;
      like: LikeState;
    }>,
  ) {
    this.auth$ = this.store.select('auth', 'authData');
    this.isLoading$ = this.store.select('upload', 'isLoading');
    this.songsList$ = this.store.select('songs', 'songList');
    this.uploadSongList$ = this.store.select('upload', 'uploadSongList');
    this.likeList$ = this.store.select('like', 'songIdLikes');

  }

  ngOnInit() {
    this.subscription.push(
      this.likeList$.subscribe((likeLists) => {
        //chose
        if (likeLists.length > 0) {
          this.likeList = likeLists;
          console.log(likeLists);
        }
      }),
    )

  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}






