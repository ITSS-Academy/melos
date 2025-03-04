import { Component } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {AuthModel} from '../../../../models/auth.model';
import {SongModel} from '../../../../models/song.model';
import  * as UploadActions from '../../../../ngrx/uploaded/uploaded.actions';
import {Store} from '@ngrx/store';
import {AuthState} from '../../../../ngrx/auth/auth.state';
import {HistoryState} from '../../../../ngrx/history/history.state';
import * as HistoryActions from '../../../../ngrx/history/history.actions';


@Component({
  selector: 'app-uploaded',
  standalone: true,
  imports: [],
  templateUrl: './uploaded.component.html',
  styleUrl: './uploaded.component.scss'
})
export class UploadedComponent {
  auth$!: Observable<AuthModel | null>;
  uploadSongList$!: Observable<SongModel[]>;
  subscription: Subscription[] = [];
  authData: AuthModel | null = null;
  uploadSongList: SongModel[] = [];

  constructor(
    private store: Store<{
      auth: AuthState;
      history: HistoryState;
    }>,
  ) {
    this.auth$ = this.store.select('auth', 'authData');
    this.uploadSongList$ = this.store.select('history', 'historySongList');
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

      this.uploadSongList$.subscribe((uploadSongList) => {
        console.log(uploadSongList);
        if (uploadSongList.length > 0) {
          this.uploadSongList = uploadSongList;
          console.log('uploadSongList', this.uploadSongList);
        }
      }),
    );

    if (this.authData) {
    }
  }
}






