import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MaterialModule } from './shared/material.module';
import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { filter, Observable, Subscription } from 'rxjs';
import { HeaderComponent } from './shared/components/header/header.component';
import { MusicBarComponent } from './shared/components/music-bar/music-bar.component';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { AuthState } from './ngrx/auth/auth.state';
import { AuthModel } from './models/auth.model';
import * as AuthActions from './ngrx/auth/auth.actions';
import * as CategoryActions from './ngrx/category/category.actions';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MaterialModule,
    NgClass,
    NgIf,
    NgForOf,
    RouterOutlet,
    HeaderComponent,
    MusicBarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'melos';

  activeLink = '';
  isSongPlaying = false;
  auth$: Observable<any> | undefined;
  subscription: Subscription[] = [];
  authData: AuthModel | undefined;

  constructor(
    private router: Router,
    private auth: Auth,
    private store: Store<{ auth: AuthState }>,
  ) {
    this.auth$ = this.store.select('auth', 'auth');
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        const token = await user?.getIdToken();
        this.store.dispatch(AuthActions.getAuth({ idToken: token }));
        console.log(token);
        this.authData = {
          idToken: token,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        };
        this.store.dispatch(AuthActions.storeAuth({ authData: this.authData }));
      }
    });
  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setActiveLink();
        console.log(this.router.url);
      });
    this.store.dispatch(CategoryActions.getCategoryList());
    const savedState = localStorage.getItem('isExpanded');
    this.isExpanded = savedState ? JSON.parse(savedState) : true;

    // if (this.auth$) {
    //   this.auth$.subscribe((auth) => {
    //     if (auth?.uid) {
    //       console.log(auth);
    //       this.authData = {
    //         ...this.authData,
    //         photoURL: auth.picture,
    //         idToken: this.authData!.idToken,
    //         uid: auth.uid,
    //         displayName: auth.displayName,
    //         email: auth.email,
    //       };
    //
    //     }
    //   });
    // }

    this.subscription.push();
  }

  isExpanded = true; // Mở rộng sidebar mặc định

  menuItems = [
    { icon: 'home', title: 'Home', route: 'home' },
    { icon: 'playlist_play', title: 'Playlist', route: 'playlist' },
    { icon: 'category', title: 'Category', route: 'category' },
    { icon: 'cloud_upload', title: 'Upload', route: 'upload' },
    { icon: 'person', title: 'Profile', route: 'profile' },
  ];

  // Lấy route hiện tại

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
    localStorage.setItem('isExpanded', JSON.stringify(this.isExpanded)); // Đổi trạng thái mở/thu nhỏ
  }

  onMenuClick(route: string) {
    this.activeLink = route;
    this.router.navigate([route]); // Điều hướng
  }

  setActiveLink(): void {
    if (this.router.url.includes('/home')) {
      this.activeLink = this.menuItems[0].route;
      console.log(this.activeLink);
    } else if (this.router.url.includes('/playlist')) {
      this.activeLink = this.menuItems[1].route;
      console.log(this.activeLink);
    } else if (this.router.url.includes('/category')) {
      this.activeLink = this.menuItems[2].route;
      console.log(this.activeLink);
    } else if (this.router.url.includes('/upload')) {
      this.activeLink = this.menuItems[3].route;
      console.log(this.activeLink);
    } else if (this.router.url.includes('/profile')) {
      this.activeLink = this.menuItems[4].route;
      console.log(this.activeLink);
    } else {
      this.activeLink = '';
    }
  }

  onSongPlaying(isPlaying: boolean) {
    this.isSongPlaying = isPlaying;
  }
}
