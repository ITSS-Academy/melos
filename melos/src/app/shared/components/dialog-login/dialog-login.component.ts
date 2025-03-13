import { Component, OnDestroy, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Store } from '@ngrx/store';
import { AuthState } from '../../../ngrx/auth/auth.state';
import * as AuthActions from '../../../ngrx/auth/auth.actions';
@Component({
  selector: 'app-dialog-login',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './dialog-login.component.html',
  styleUrl: './dialog-login.component.scss',
})
export class DialogLoginComponent {
  constructor(private store: Store<{ auth: AuthState }>) {
    this.store.select('auth').subscribe((auth) => {
      if (auth.isLogging) {
        this.store.dispatch(AuthActions.clearState());
      }
    });
  }

  login() {
    this.store.dispatch(AuthActions.login());
  }
}
