import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { catchError, from, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private http: HttpClient,
  ) {}

  loginWithGoogle() {
    return from(signInWithPopup(this.auth, new GoogleAuthProvider())).pipe(
      catchError((error) => {
        return of(GoogleAuthProvider.credentialFromError(error));
      }),
    );
  }

  logout() {
    return this.auth.signOut();
  }

  getAuth(idToken: string) {
    console.log(idToken);
    return this.http.get(`${environment.apiUrl}auth`, {
      headers: {
        Authorization: idToken,
      },
    });
  }

  getAuthByUid(uid: string) {
    return this.http.get(`${environment.apiUrl}auth/user-id?uid=${uid}`);
  }
}
