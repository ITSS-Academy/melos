import { Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: 'profile-history',
        loadComponent: () =>
          import('./components/history/history.component').then(
            (m) => m.HistoryComponent,
          ),
      },

      {
        path: 'profile-uploaded',
        loadComponent: () =>
          import('./components/uploaded/uploaded.component').then(
            (m) => m.UploadedComponent,
          ),
      },
      {
        path: '',
        redirectTo: 'profile-history',
        pathMatch: 'full',
      },
    ],
  },
];
