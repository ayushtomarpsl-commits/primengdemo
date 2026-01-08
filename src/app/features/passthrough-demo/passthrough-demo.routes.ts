// ============================================
// Passthrough Demo Routes
// ============================================

import { Routes } from '@angular/router';

export const PASSTHROUGH_DEMO_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/passthrough-demo/passthrough-demo.component').then(
        m => m.PassthroughDemoComponent
      ),
  },
];

