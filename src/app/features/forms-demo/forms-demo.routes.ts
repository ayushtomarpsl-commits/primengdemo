// ============================================
// Forms Demo Routes
// ============================================

import { Routes } from '@angular/router';

export const FORMS_DEMO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/forms-demo/forms-demo.component').then(m => m.FormsDemoComponent),
  },
];

