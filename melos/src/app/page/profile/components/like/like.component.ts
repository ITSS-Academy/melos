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
  }


  ngOnInit() {
    this.subscription.push(


      this.activateRoute.params.subscribe(params => {
        const id = params['id'];
        if (id){
          this.orderAuth = id;
          this.store.dispatch(
            SongActions.getSongLiked({
              uid: this.orderAuth,
              idToken: this.orderAuth.idToken ?? '1',
            }),
          );
        }
      }),

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
    this.store.dispatch(LikeActions.clearStateSongIdLikes());
  }

}
