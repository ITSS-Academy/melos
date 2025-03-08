import {Component, OnDestroy, OnInit} from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
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
import {HistoryComponent} from './components/history/history.component';
import {UploadComponent} from '../upload/upload.component';
import {LikeComponent} from './components/like/like.component';
import {UploadedComponent} from './components/uploaded/uploaded.component';
import {IdToAvatarPipe} from '../../shared/pipes/id-to-avatar.pipe';
import {IdToNamePipe} from '../../shared/pipes/id-to-name.pipe';
import * as AuthActions from '../../ngrx/auth/auth.actions';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatTab, MatTabGroup, DialogLoginComponent, AsyncPipe,  HistoryComponent, LikeComponent, UploadedComponent, IdToAvatarPipe, IdToNamePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, OnDestroy {
  auth$!: Observable<AuthModel | null>;
  historySongList$!: Observable<SongModel[]>;
  subscription: Subscription[] = [];
  authData: AuthModel | null = null;
  historySongList: SongModel[] = [];
orderAuth$!: Observable<any>;
  orderAuth: any

  constructor(
    private activateRoute: ActivatedRoute,
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

      this.activateRoute.params.subscribe(params => {
        console.log('params-------------------', params['id']);
        const id = params['id'];
        if (id){
          this.orderAuth = id;
        }
      }),

      this.auth$.subscribe((auth) => {
        if (auth?.uid) {
          this.authData = auth;
          console.log('authData History', this.authData);
          if(this.authData.uid != this.orderAuth) {
            this.store.dispatch(
              HistoryActions.getHistorySongList({
                uid: this.authData.uid ?? '',
                idToken: this.authData.idToken ?? '',
              }),
            );
          }
        }
      }),
    );


  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }
  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src =
      'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg';
  }
}

