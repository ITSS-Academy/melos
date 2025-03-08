import { AuthState } from './auth.state';
import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export const initialState: AuthState = {
  authData: null,
  isLogging: false,
  error: null,
  auth: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state, { type }) => {
    console.log(type);
    return <AuthState>{
      authData: null,
      isLogging: true,
    };
  }),
  on(AuthActions.loginSuccess, (state, { type }) => {
    console.log(type);
    return <AuthState>{
      ...state,
      isLogging: false,
    };
  }),
  on(AuthActions.loginFailure, (state, { error, type }) => {
    console.log(type);
    return <AuthState>{
      ...state,
      isLogging: false,
      error: error,
    };
  }),
  on(AuthActions.storeAuth, (state, { authData, type }) => {
    console.log(type);
    return <AuthState>{
      authData: authData,
    };
  }),
  on(AuthActions.logout, (state, { type }) => {
    console.log(type);
    return <AuthState>{
      isLogging: false,
      authData: null,
      error: null,
    };
  }),

  on(AuthActions.logoutSuccess, (state, { type }) => {
    console.log(type);
    return <AuthState>{
      isLogging: false,
      authData: null,
      error: null,
    };
  }),

  on(AuthActions.logoutFailure, (state, { error, type }) => {
    console.log(type);
    return <AuthState>{
      ...state,
      error: error,
    };
  }),

  //getAuth
  on(AuthActions.getAuth, (state, { type }) => {
    console.log(type);
    return <AuthState>{
      ...state,
      isLogging: true,
    };
  }),

  on(AuthActions.getAuthSuccess, (state, { auth, type }) => {
    console.log(type);
    return <AuthState>{
      ...state,
      auth: auth,
      isLogging: false,
    };
  }),

  on(AuthActions.getAuthFailure, (state, { error, type }) => {
    console.log(type);
    return <AuthState>{
      ...state,
      isLogging: false,
      error: error,
    };
  }),

    on(AuthActions.getAuthByUid, (state, { type }) => {
        console.log(type);
        return <AuthState>{
        ...state,
        isLogging: true,
        };
    }),

    on(AuthActions.getAuthByUidSuccess, (state, { auth, type }) => {
        console.log(type);
        return <AuthState>{
        ...state,
        auth: auth,
        isLogging: false,
        };
    }),

    on(AuthActions.getAuthByUidFailure, (state, { error, type }) => {
        console.log(type);
        return <AuthState>{
        ...state,
        isLogging: false,
        error: error,
        };
    }),

    on(AuthActions.clearState, (state, { type }) => {
        console.log(type);
        return <AuthState>{
        authData: null,
        isLogging: false,
        error: null,
        auth: null,
        };
    }),
);
