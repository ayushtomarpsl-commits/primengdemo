// ============================================
// User Management Routes
// Feature-specific route configuration
// ============================================

import { Routes } from '@angular/router';

export const USER_MANAGEMENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/user-list/user-list.component').then(m => m.UserListComponent),
  },
  // Add more routes as needed:
  // { path: 'create', loadComponent: () => import('./components/user-form/user-form.component').then(m => m.UserFormComponent) },
  // { path: ':id', loadComponent: () => import('./components/user-detail/user-detail.component').then(m => m.UserDetailComponent) },
  // { path: ':id/edit', loadComponent: () => import('./components/user-form/user-form.component').then(m => m.UserFormComponent) },
];

