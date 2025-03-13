import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {AuthModel} from '../../../../models/auth.model';
import {SongModel} from '../../../../models/song.model';
import {Store} from '@ngrx/store';
import {AuthState} from '../../../../ngrx/auth/auth.state';
import {SongState} from '../../../../ngrx/song/song.state';
import {AsyncPipe} from '@angular/common';
import {LoadingComponent} from '../../../../shared/components/loading/loading.component';
import {MusicTabComponent} from '../../../../shared/components/music-tab/music-tab.component';
import * as SongActions from '../../../../ngrx/song/song.actions';
import {ActivatedRoute} from '@angular/router';
import {LikeState} from '../../../../ngrx/like/like.state';
import * as LikeActions from '../../../../ngrx/like/like.actions';
@Component({
  selector: 'app-like',
  standalone: true,
  imports: [
    AsyncPipe,
    LoadingComponent,
    MusicTabComponent,
  ],
  templateUrl: './like.component.html',
  styleUrl: './like.component.scss'
})
export class LikeComponent implements OnInit, OnDestroy {
  auth$!: Observable<AuthModel | null>;
  songListLiked$!: Observable<SongModel[]>;
  subscription: Subscription[] = [];
  authData: AuthModel | null = null;
  songListLiked: SongModel[] = [];
  isLoading$!: Observable<boolean>;
  orderAuth: any;
  likeList$!: Observable<string[]>;
  likeList: string[] = [];
  isLikedDeleteSuccess$!: Observable<boolean>
  isLikedSuccess$!: Observable<boolean>


  constructor(
    private activateRoute: ActivatedRoute,

    private store: Store<{
                 auth: AuthState;
                 song: SongState;
                 like: LikeState;
    }>,
  ) {
    this.auth$ = this.store.select('auth', 'authData');
    this.songListLiked$ = this.store.select('song', 'songListLiked');
    this.isLoading$ = this.store.select('song', 'isLoading');
    this.likeList$ = this.store.select('like', 'songIdLikes');
    this.isLikedDeleteSuccess$ = this.store.select('like', 'isLikedDeleteSuccess');
    this.isLikedSuccess$ = this.store.select('like', 'isLikedSuccess');
  }


  ngOnInit() {
    this.subscription.push(
      this.auth$.subscribe(auth => {
        if (auth?.uid && auth.idToken) {
          this.authData = auth;
        }
      }),


      this.activateRoute.params.subscribe(params => {
        const id = params['id'];
        if (id){
          this.orderAuth = id;
          if (this.authData?.idToken) {
            this.store.dispatch(
              SongActions.getSongLiked({
                uid: this.orderAuth,
                idToken: this.authData?.idToken
              }),
            );
          }

        }
      }),



      this.songListLiked$.subscribe((songList) => {
        //chose
        if (songList.length > 0 ) {
          console.log(songList)
        }
      }),

      this.likeList$.subscribe((likeLists) => {
        //chose
        if (likeLists.length > 0) {
          this.likeList = likeLists;
          console.log(likeLists);
        }
      }),

      this.isLikedDeleteSuccess$.subscribe((isLikedDeleteSuccess) => {
        if (isLikedDeleteSuccess) {
          console.log('like delete success');
          if (this.authData?.uid && this.authData.idToken){
            console.log('like delete success');

            this.store.dispatch(
              SongActions.getSongLiked({
                uid: this.authData?.uid,
                idToken: this.authData.idToken ,
              }),
            );
            this.store.dispatch(LikeActions.clearStateDeleteLikeSuccess());
          }
        }
      }),
      this.isLikedSuccess$.subscribe((isLikedDeleteSuccess) => {
        if (isLikedDeleteSuccess) {
          if (this.authData?.uid && this.authData.idToken){
            this.store.dispatch(
              SongActions.getSongLiked({
                uid: this.authData?.uid,
                idToken: this.authData.idToken ,
              }),
            );
            this.store.dispatch(LikeActions.clearStateLikeSuccess());
          }
        }
      }),

    );


  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
    this.store.dispatch(LikeActions.clearStateSongIdLikes());
  }

}
