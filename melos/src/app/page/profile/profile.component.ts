import { Component } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatTab, MatTabGroup, RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  constructor(private router: Router) {}

  onTabChange(event: any) {
    switch (event.index) {
      case 0:
        this.router.navigate(['/profile/profile-history']).then();
        break;
      case 1:
        this.router.navigate(['/profile/profile-uploaded']).then();
        break;
    }
  }
}
