import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../../ngrx/auth/auth.state';
import { HistoryState } from '../../../../ngrx/history/history.state';
import { Observable, Subscription } from 'rxjs';
import { AuthModel } from '../../../../models/auth.model';
import { SongModel } from '../../../../models/song.model';
import * as HistoryActions from '../../../../ngrx/history/history.actions';
import {MusicTabComponent} from '../../../../shared/components/music-tab/music-tab.component';
import {DialogLoginComponent} from '../../../../shared/components/dialog-login/dialog-login.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    MusicTabComponent,
    DialogLoginComponent
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent implements OnInit {
  auth$!: Observable<AuthModel | null>;
  historySongList$!: Observable<SongModel[]>;
  subscription: Subscription[] = [];
  authData: AuthModel | null = null;
  historySongList: SongModel[] = [];

  constructor(
    private store: Store<{
      auth: AuthState;
      history: HistoryState;
    }>,
  ) {
    this.auth$ = this.store.select('auth', 'authData');
    this.historySongList$ = this.store.select('history', 'historySongList');
  }

  ngOnInit() {
    this.subscription.push(
      this.auth$.subscribe((auth) => {
        if (auth?.uid) {
          this.authData = auth;
          console.log('authData History', this.authData);
          this.store.dispatch(
            HistoryActions.getHistorySongList({
              uid: this.authData.uid ?? '',
              idToken: this.authData.idToken ?? '',
            }),
          );
        }
      }),

      this.historySongList$.subscribe((historySongList) => {
        console.log(historySongList);
        if (historySongList.length > 0) {
          this.historySongList = historySongList;
          console.log('historySongList', this.historySongList);
        }
      }),
    );

    if (this.authData) {
    }
  }
}
