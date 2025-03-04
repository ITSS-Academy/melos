import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MatDialog } from '@angular/material/dialog';
import { DialogLoginComponent } from '../dialog-login/dialog-login.component';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrx/auth/auth.state';
import { Observable, Subscription } from 'rxjs';
import { AuthModel } from '../../../models/auth.model';
import * as AuthActions from '../../../ngrx/auth/auth.actions';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MaterialModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  auth$!: Observable<AuthModel | null>;
  subscription: Subscription[] = [];
  authData!: AuthModel | null;

  constructor(
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
          console.log(auth);
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
    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  onImageError(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src =
      'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg';
  }

  async logout() {
    this.store.dispatch(AuthActions.logout());
    this.authData = null;
  }
}
