import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('../app/page/home/home.routes').then((m) => m.HOME_ROUTES),
  },
  {
    path: 'category',
    loadChildren: () =>
      import('../app/page/category/category.routes').then(
        (m) => m.CATEGORY_ROUTES,
      ),
  },
  {
    path: 'category-detail/:id',
    loadChildren: () =>
      import('../app/page/category-detail/category-detail.routes').then(
        (m) => m.CATEGORY_DETAIL,
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('../app/page/profile/profile.routes').then(
        (m) => m.PROFILE_ROUTES,
      ),
  },
  {
    path: 'upload',
    loadChildren: () =>
      import('../app/page/upload/upload.routes').then((m) => m.UPLOAD_ROUTES),
  },
  {
    path: 'search',
    loadChildren: () =>
      import('../app/page/search/search.routes').then((m) => m.SEARCH_ROUTES),
  },
  {
    path: 'playlist',
    loadChildren: () =>
      import('./page/playlist/playlist.routes').then((m) =>m.PLAYLIST_ROUTES),
  },
{
    path:'detail',
    loadChildren: () => import('../app/page/detail-song/detail-song.routes').then(m => m.DETAIL_SONG_ROUTES),
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
