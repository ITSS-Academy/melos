import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { catchError, from, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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
    return this.http.get('http://localhost:3000/auth', {
      headers: {
        Authorization: idToken,
      },
    });
  }

  getAuthByUid(uid: string) {
    return this.http.get(`http://localhost:3000/auth/user-id?uid=${uid}`);
  }
}
