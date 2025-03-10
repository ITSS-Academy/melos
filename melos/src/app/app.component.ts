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
import * as LikeActions from './ngrx/like/like.actions';
import * as QueueActions from './ngrx/queue/queue.actions';
import * as SongActions from './ngrx/song/song.actions';
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
  subscription: Subscription[] = [];
  authData: AuthModel | undefined;

  constructor(
    private router: Router,
    private auth: Auth,
    private store: Store<{ auth: AuthState }>,
  ) {
    onAuthStateChanged(this.auth, async (user) => {
      if (user) {
        const token = await user?.getIdToken();
        console.log(token);
        this.authData = {
          idToken: token,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          uid: user.uid,
        };
        if (this.authData?.idToken && this.authData?.uid) {
          this.store.dispatch(
            LikeActions.getSongIdLiked({
              idToken: this.authData?.idToken,
              uid: this.authData?.uid,
            }),
          );
        }
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

    this.subscription.push();
  }

  isExpanded = true; // Mở rộng sidebar mặc định

  menuItems = [
    { icon: 'home', title: 'Home', route: 'home' },
    { icon: 'playlist_play', title: 'Playlist', route: 'playlist' },
    { icon: 'category', title: 'Category', route: 'category' },
    { icon: 'cloud_upload', title: 'Upload', route: 'upload' },
  ];

  menuItems2 = [{ icon: 'person', title: 'Profile', route: 'profile' }];

  // Lấy route hiện tại

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
    localStorage.setItem('isExpanded', JSON.stringify(this.isExpanded)); // Đổi trạng thái mở/thu nhỏ
  }

  onMenuClick(route: string) {
    this.activeLink = route;
    this.router.navigate([route]); // Điều hướng
  }

  navigateToProfile() {
    this.activeLink = 'profile';
    this.router.navigate(['profile', this.authData?.uid]);
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
      this.activeLink = this.menuItems2[0].route;
      console.log(this.activeLink);
    } else {
      this.activeLink = '';
    }
  }
}
