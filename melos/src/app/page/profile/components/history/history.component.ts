import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../../ngrx/auth/auth.state';
import { HistoryState } from '../../../../ngrx/history/history.state';
import { Observable, Subscription } from 'rxjs';
import { AuthModel } from '../../../../models/auth.model';
import { SongModel } from '../../../../models/song.model';
import * as HistoryActions from '../../../../ngrx/history/history.actions';
import { CommonModule } from '@angular/common';
import { DialogLoginComponent } from '../../../../shared/components/dialog-login/dialog-login.component';
import { MusicTabComponent } from '../../../../shared/components/music-tab/music-tab.component';
import { LoadingComponent } from '../../../../shared/components/loading/loading.component';
import {LikeState} from '../../../../ngrx/like/like.state';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, MusicTabComponent, LoadingComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit, OnDestroy {
  auth$!: Observable<AuthModel | null>;
  historySongList$!: Observable<SongModel[]>;
  subscription: Subscription[] = [];
  authData: AuthModel | null = null;
  historySongList: SongModel[] = [];
  isLoading$!: Observable<boolean>;
  likeList$!: Observable<string[]>;
  likeList: string[] = [];

  constructor(
    private store: Store<{
      auth: AuthState;
      history: HistoryState;
      like: LikeState;
    }>,
  ) {
    this.auth$ = this.store.select('auth', 'authData');
    this.historySongList$ = this.store.select('history', 'historySongList');
    this.isLoading$ = this.store.select('history', 'isLoading');
    this.likeList$ = this.store.select('like', 'songIdLikes');
  }

  ngOnInit() {
    this.subscription.push(
      this.likeList$.subscribe((likeLists) => {
        //chose
        if (likeLists.length > 0) {
          this.likeList = likeLists;
        }
      }),
      this.historySongList$.subscribe((historySongList) => {
        if (historySongList.length > 0) {
          this.historySongList = historySongList;

        }
      }),
    );


  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
}
