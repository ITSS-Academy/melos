import { Actions, createEffect, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, from, map, of, switchMap } from 'rxjs';

export const login = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(AuthActions.login),
      switchMap(() => {
        return authService
          .loginWithGoogle()
          .pipe(map(() => AuthActions.loginSuccess()));
      }),
      catchError((error) => {
        return of(AuthActions.loginFailure({ error: error.message }));
      }),
    );
  },
  { functional: true },
);

export const logout = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(AuthActions.logout),
      switchMap(() => {
        return from(authService.logout()).pipe(
          map(() => AuthActions.logoutSuccess()),
        );
      }),
      catchError((error) => {
        return of(AuthActions.logoutFailure({ error: error.message }));
      }),
    );
  },
  { functional: true },
);
