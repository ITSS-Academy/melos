import { Routes } from '@angular/router';
import { SearchComponent } from './search.component';

export const SEARCH_ROUTES: Routes = [
  {
    path: '',
    component: SearchComponent,
    children: [
      {
        path: 'search-all',
        loadComponent: () =>
          import('./components/search-all/search-all.component').then(
            (m) => m.SearchAllComponent,
          ),
      },
      {
        path: 'search-song',
        loadComponent: () =>
          import('./components/search-songs/search-songs.component').then(
            (m) => m.SearchSongsComponent,
          ),
      },
      {
        path: 'search-peoples',
        loadComponent: () =>
          import('./components/search-peoples/search-peoples.component').then(
            (m) => m.SearchPeoplesComponent,
          ),
      },
      {
        path: '',
        redirectTo: 'search-all',
        pathMatch: 'full',
      },
    ],
  },
];
