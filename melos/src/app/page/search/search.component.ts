import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { CardArtistComponent } from '../../shared/components/card-artist/card-artist.component';
import { SearchAllComponent } from './components/search-all/search-all.component';
import {SearchPeoplesComponent} from './components/search-peoples/search-peoples.component';
import {SearchSongsComponent} from './components/search-songs/search-songs.component';

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
    SearchPeoplesComponent,
    SearchSongsComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  constructor(private router: Router) {}

}
