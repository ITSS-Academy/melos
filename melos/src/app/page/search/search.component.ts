import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { SearchAllComponent } from './components/search-all/search-all.component';
import {SearchPeoplesComponent} from './components/search-peoples/search-peoples.component';
import {SearchSongsComponent} from './components/search-songs/search-songs.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatTab,
    MatTabGroup,

    SearchAllComponent,
    SearchPeoplesComponent,
    SearchSongsComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  constructor() {}

}
