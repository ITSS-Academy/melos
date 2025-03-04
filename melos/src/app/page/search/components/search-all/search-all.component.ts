import { Component } from '@angular/core';
import {CardArtistComponent} from '../../../../shared/components/card-artist/card-artist.component';
import {MatTabsModule} from '@angular/material/tabs';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {MusicTabComponent} from '../../../../shared/components/music-tab/music-tab.component';

@Component({
  selector: 'app-search-all',
  standalone: true,
  imports: [
    CardArtistComponent,
    MatTabsModule,
    RouterLink,
    RouterOutlet,
    MusicTabComponent

  ],
  templateUrl: './search-all.component.html',
  styleUrl: './search-all.component.scss'
})
export class SearchAllComponent {

  constructor(private router: Router) {}

  onTabChange(event: any) {
    switch (event.index) {
      case 0:
        this.router.navigate(['/search/search-all']);
        break;
      case 1:
        this.router.navigate(['/search/search-peoples']);
        break;
      case 2:
        this.router.navigate(['/search/search-song']);
        break;
    }
  }
}


