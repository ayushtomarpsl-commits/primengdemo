// ============================================
// Application Routes
// Root route configuration with lazy loading
// ============================================

import { Routes } from '@angular/router';
import { ShellComponent } from './layout';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/dashboard').then(m => m.DASHBOARD_ROUTES),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./features/user-management').then(m => m.USER_MANAGEMENT_ROUTES),
      },
      {
        path: 'forms',
        loadChildren: () =>
          import('./features/forms-demo').then(m => m.FORMS_DEMO_ROUTES),
      },
      {
        path: 'passthrough',
        loadChildren: () =>
          import('./features/passthrough-demo').then(m => m.PASSTHROUGH_DEMO_ROUTES),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./features/settings').then(m => m.SETTINGS_ROUTES),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
