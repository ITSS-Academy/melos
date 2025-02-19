import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {MaterialModule} from './shared/material.module';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {filter} from 'rxjs';
import {HeaderComponent} from './shared/components/header/header.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MaterialModule, NgClass, NgIf, NgForOf, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',

})
export class AppComponent implements OnInit {
  title = 'melos';

activeLink = '';

  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setActiveLink();
        console.log(this.router.url);

      });

    const savedState = localStorage.getItem('isExpanded');
    this.isExpanded = savedState ? JSON.parse(savedState) : true;
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
    localStorage.setItem('isExpanded', JSON.stringify(this.isExpanded));// Đổi trạng thái mở/thu nhỏ
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
    }
  }

}
