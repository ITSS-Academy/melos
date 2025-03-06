import {Component, OnDestroy, OnInit} from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { Router, RouterOutlet } from '@angular/router';
import {Store} from '@ngrx/store';
import {AuthState} from '../../ngrx/auth/auth.state';
import {HistoryState} from '../../ngrx/history/history.state';
import * as HistoryActions from '../../../app/ngrx/history/history.actions';
import {Observable, Subscription} from 'rxjs';
import {AuthModel} from '../../models/auth.model';
import {SongModel} from '../../models/song.model';
import {DialogLoginComponent} from '../../shared/components/dialog-login/dialog-login.component';
import {AsyncPipe, NgIf} from '@angular/common';
import {LoadingComponent} from '../../shared/components/loading/loading.component';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatTab, MatTabGroup, RouterOutlet, DialogLoginComponent, AsyncPipe, LoadingComponent, NgIf],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
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

    private router: Router,
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
        console.log('[History Component] Received historySongList:', historySongList);
        if (historySongList.length > 0) {
          this.historySongList = historySongList;
          console.log('[History Component] Updated historySongList:', this.historySongList);
        }
      }),
    );


    if (this.authData) {
    }
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  onTabchange(event: any) {

    switch (event.index) {
      case 0:
        this.router.navigate(['/profile/profile-history']).then();
        break;

      case 1:
        this.router.navigate(['/profile/profile-uploaded']).then();
        break;
    }


  }
}

