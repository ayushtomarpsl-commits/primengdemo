// ============================================
// WFX Library Test Routes
// Routes for WFX Common Library component showcase
// ============================================

import { Routes } from '@angular/router';

export const WFX_LIBRARY_TEST_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/wfx-library/wfx-library.component').then(
        m => m.WfxLibraryComponent
      ),
  },
  {
    path: 'button',
    loadComponent: () =>
      import('./components/wfx-button-demo/wfx-button-demo.component').then(
        m => m.WfxButtonDemoComponent
      ),
  },
  {
    path: 'input',
    loadComponent: () =>
      import('./components/wfx-input-demo/wfx-input-demo.component').then(
        m => m.WfxInputDemoComponent
      ),
  },
  {
    path: 'select',
    loadComponent: () =>
      import('./components/wfx-select-demo/wfx-select-demo.component').then(
        m => m.WfxSelectDemoComponent
      ),
  },
  {
    path: 'datepicker',
    loadComponent: () =>
      import('./components/wfx-datepicker-demo/wfx-datepicker-demo.component').then(
        m => m.WfxDatePickerDemoComponent
      ),
  },
  {
    path: 'checkbox',
    loadComponent: () =>
      import('./components/wfx-checkbox-demo/wfx-checkbox-demo.component').then(
        m => m.WfxCheckboxDemoComponent
      ),
  },
  {
    path: 'table',
    loadComponent: () =>
      import('./components/wfx-table-demo/wfx-table-demo.component').then(
        m => m.WfxTableDemoComponent
      ),
  },
  {
    path: 'card',
    loadComponent: () =>
      import('./components/wfx-card-demo/wfx-card-demo.component').then(
        m => m.WfxCardDemoComponent
      ),
  },
  {
    path: 'dialog',
    loadComponent: () =>
      import('./components/wfx-dialog-demo/wfx-dialog-demo.component').then(
        m => m.WfxDialogDemoComponent
      ),
  },
  {
    path: 'toast',
    loadComponent: () =>
      import('./components/wfx-toast-demo/wfx-toast-demo.component').then(
        m => m.WfxToastDemoComponent
      ),
  },
];
