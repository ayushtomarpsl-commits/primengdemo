// ============================================
// WFX Prime Routes
// ============================================

import { Routes } from '@angular/router';

export const WFX_PRIME_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/wfx-prime/wfx-prime.component').then(m => m.WfxPrimeComponent),
  },
];

