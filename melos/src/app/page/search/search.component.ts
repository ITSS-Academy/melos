import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { CardArtistComponent } from '../../shared/components/card-artist/card-artist.component';
import { SearchAllComponent } from './components/search-all/search-all.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    RouterOutlet,
    MatTab,
    MatTabGroup,
    CardArtistComponent,
    RouterLink,
    SearchAllComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  constructor(private router: Router) {}

  onTabChange(event: any) {
    switch (event.index) {
      case 0:
        this.router.navigate(['/search/search-all']).then();
        break;
      case 1:
        this.router.navigate(['/search/search-peoples']).then();
        break;
      case 2:
        this.router.navigate(['/search/search-song']).then();
        break;
    }
  }
}
