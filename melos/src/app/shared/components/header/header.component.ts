import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginComponent } from '../dialog-login/dialog-login.component';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrx/auth/auth.state';
import { debounceTime, Observable, Subject, Subscription } from 'rxjs';
import { AuthModel } from '../../../models/auth.model';
import * as AuthActions from '../../../ngrx/auth/auth.actions';
import { Router, RouterLink } from '@angular/router';
import { ShareModule } from '../../share.module';
import * as SearchActions from '../../../ngrx/search/search.actions';
import * as HistoryActions from '../../../ngrx/history/history.actions';
import * as UploadedActions from '../../../ngrx/uploaded/uploaded.actions';
import * as SongActions from '../../../ngrx/song/song.actions';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, RouterLink, ShareModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  auth$!: Observable<AuthModel | null>;
  subscription: Subscription[] = [];
  authData!: AuthModel | null;
  searchSubject = new Subject<string>();

  constructor(
    private router: Router,
    private store: Store<{
      auth: AuthState;
    }>,
  ) {
    this.auth$ = this.store.select('auth', 'authData');
  }

  ngOnInit() {
    this.subscription.push(
      this.auth$.subscribe((auth) => {
        if (auth?.idToken) {
          this.authData = auth;
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subscription.forEach((sub) => sub.unsubscribe());
  }

  readonly dialog = inject(MatDialog);
  openDialog() {
    const dialogRef = this.dialog.open(DialogLoginComponent);
  }

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src =
      'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg';
  }

  async logout() {
    this.store.dispatch(AuthActions.logout());
    this.authData = null;
    this.store.dispatch(SongActions.clearStateSongLiked());
    this.store.dispatch(HistoryActions.clearState());
    this.store.dispatch(UploadedActions.clearState());
    this.store.dispatch(SongActions.clearStateQueue());
    this.router.navigate(['/']);
  }
  onValueChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value;
    this.searchSubject.next(query);
  }

  onEnter(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value;
    if (keyboardEvent.key === 'Enter') {
      this.store.dispatch(SearchActions.searchAll({ query }));
      inputElement.blur();
    }
  }

  selectText(event: FocusEvent) {
    (event.target as HTMLInputElement).select();
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
}
