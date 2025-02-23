import { Component,OnDestroy, OnInit } from '@angular/core';
import {MaterialModule} from '../../material.module';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

@Component({
  selector: 'app-dialog-login',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './dialog-login.component.html',
  styleUrl: './dialog-login.component.scss'
})
export class DialogLoginComponent  {
  currentUser: any;

  constructor(private auth: Auth) {
  }
  async login() {
    try {
      const credential = await signInWithPopup(this.auth, new GoogleAuthProvider());
      this.currentUser = credential.user;
      console.log(this.currentUser);
      const token = await credential.user.getIdToken();
      console.log(token);
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

}
