// ============================================
// WFX Dialog Demo Component
// Showcase for WfxDialog wrapper component
// ============================================

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WfxDialog, DialogPosition } from '../../../../wfx-common-library/wfx-dialog/wfx-dialog';
import { WfxButton } from '../../../../wfx-common-library/wfx-button/wfx-button';
import { WfxInput } from '../../../../wfx-common-library/wfx-input/wfx-input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-wfx-dialog-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, WfxDialog, WfxButton, WfxInput],
  template: `
    <div class="wfx-dialog-demo">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <a routerLink="/wfx-library-test">
          <i class="pi pi-box"></i>
          WFX Library
        </a>
        <i class="pi pi-chevron-right"></i>
        <span>WfxDialog</span>
      </nav>

      <!-- Header -->
      <header class="demo-header">
        <div class="header-content">
          <h1>WfxDialog</h1>
          <p>A wrapper component for PrimeNG Dialog with modal, draggable, and resizable features</p>
        </div>
      </header>

      <!-- Import Section -->
      <section class="demo-section">
        <h2>Import</h2>
        <div class="code-block">
          <code>import {{ '{' }} WfxDialog {{ '}' }} from 'wfx-common-library/wfx-dialog';</code>
        </div>
      </section>

      <!-- Basic Dialog -->
      <section class="demo-section">
        <h2>Basic</h2>
        <p class="section-desc">Basic dialog with header and content.</p>
        <div class="demo-showcase">
          <wfx-button label="Open Dialog" icon="pi pi-external-link" (onClick)="basicVisible = true"></wfx-button>
          
          <wfx-dialog 
            [(visible)]="basicVisible" 
            header="Basic Dialog"
            [style]="{ width: '450px' }"
          >
            <p>This is a basic dialog. Click the X or press Escape to close it.</p>
          </wfx-dialog>
        </div>
        <div class="code-block">
          <code>&lt;wfx-dialog [(visible)]="visible" header="Dialog Title"&gt;
  &lt;p&gt;Dialog content&lt;/p&gt;
&lt;/wfx-dialog&gt;</code>
        </div>
      </section>

      <!-- Modal Dialog -->
      <section class="demo-section">
        <h2>Modal</h2>
        <p class="section-desc">Modal dialog that blocks the background.</p>
        <div class="demo-showcase">
          <wfx-button label="Open Modal" icon="pi pi-window-maximize" (onClick)="modalVisible = true"></wfx-button>
          
          <wfx-dialog 
            [(visible)]="modalVisible" 
            header="Modal Dialog"
            [modal]="true"
            [style]="{ width: '500px' }"
          >
            <p>This is a modal dialog. The background is blocked and clicking outside won't close it.</p>
            <div wfx-dialog-footer>
              <wfx-button label="Cancel" severity="secondary" [text]="true" (onClick)="modalVisible = false"></wfx-button>
              <wfx-button label="Confirm" icon="pi pi-check" (onClick)="modalVisible = false"></wfx-button>
            </div>
          </wfx-dialog>
        </div>
        <div class="code-block">
          <code>&lt;wfx-dialog [(visible)]="visible" [modal]="true" header="Modal"&gt;
  &lt;p&gt;Content&lt;/p&gt;
  &lt;div wfx-dialog-footer&gt;
    &lt;wfx-button label="Confirm"&gt;&lt;/wfx-button&gt;
  &lt;/div&gt;
&lt;/wfx-dialog&gt;</code>
        </div>
      </section>

      <!-- Dismissable Modal -->
      <section class="demo-section">
        <h2>Dismissable Mask</h2>
        <p class="section-desc">Modal dialog that closes when clicking outside.</p>
        <div class="demo-showcase">
          <wfx-button label="Open Dismissable" icon="pi pi-times-circle" (onClick)="dismissableVisible = true"></wfx-button>
          
          <wfx-dialog 
            [(visible)]="dismissableVisible" 
            header="Click Outside to Close"
            [modal]="true"
            [dismissableMask]="true"
            [style]="{ width: '450px' }"
          >
            <p>Click outside this dialog or on the backdrop to close it.</p>
          </wfx-dialog>
        </div>
        <div class="code-block">
          <code>&lt;wfx-dialog [modal]="true" [dismissableMask]="true"&gt;...&lt;/wfx-dialog&gt;</code>
        </div>
      </section>

      <!-- Positions -->
      <section class="demo-section">
        <h2>Positions</h2>
        <p class="section-desc">Dialog can be positioned in different areas of the screen.</p>
        <div class="demo-showcase">
          <div class="button-grid">
            @for (pos of positions; track pos) {
              <wfx-button 
                [label]="pos" 
                severity="secondary" 
                [outlined]="true"
                (onClick)="openPosition(pos)"
              ></wfx-button>
            }
          </div>
          
          <wfx-dialog 
            [(visible)]="positionVisible" 
            [header]="'Position: ' + currentPosition"
            [position]="currentPosition"
            [style]="{ width: '350px' }"
          >
            <p>This dialog is positioned at: {{ currentPosition }}</p>
          </wfx-dialog>
        </div>
        <div class="code-block">
          <code>&lt;wfx-dialog position="top-right" header="Top Right"&gt;...&lt;/wfx-dialog&gt;</code>
        </div>
      </section>

      <!-- Maximizable Dialog -->
      <section class="demo-section">
        <h2>Maximizable</h2>
        <p class="section-desc">Dialog with maximize/minimize button.</p>
        <div class="demo-showcase">
          <wfx-button label="Maximizable Dialog" icon="pi pi-window-maximize" (onClick)="maximizableVisible = true"></wfx-button>
          
          <wfx-dialog 
            [(visible)]="maximizableVisible" 
            header="Maximizable Dialog"
            [maximizable]="true"
            [style]="{ width: '600px' }"
          >
            <p>Click the maximize button in the header to toggle fullscreen mode.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </wfx-dialog>
        </div>
        <div class="code-block">
          <code>&lt;wfx-dialog [maximizable]="true" header="Title"&gt;...&lt;/wfx-dialog&gt;</code>
        </div>
      </section>

      <!-- Form Dialog -->
      <section class="demo-section">
        <h2>Form Dialog</h2>
        <p class="section-desc">Dialog with a form inside.</p>
        <div class="demo-showcase">
          <wfx-button label="Edit Profile" icon="pi pi-user-edit" (onClick)="formVisible = true"></wfx-button>
          
          <wfx-dialog 
            [(visible)]="formVisible" 
            header="Edit Profile"
            [modal]="true"
            [style]="{ width: '450px' }"
          >
            <div class="form-grid">
              <div class="form-field">
                <label>Name</label>
                <wfx-input [(ngModel)]="formData.name" placeholder="Enter your name" [fluid]="true"></wfx-input>
              </div>
              <div class="form-field">
                <label>Email</label>
                <wfx-input [(ngModel)]="formData.email" placeholder="Enter your email" [fluid]="true"></wfx-input>
              </div>
            </div>
            <div wfx-dialog-footer>
              <wfx-button label="Cancel" severity="secondary" [text]="true" (onClick)="formVisible = false"></wfx-button>
              <wfx-button label="Save" icon="pi pi-check" (onClick)="saveForm()"></wfx-button>
            </div>
          </wfx-dialog>
        </div>
      </section>

      <!-- Non-closable Dialog -->
      <section class="demo-section">
        <h2>Non-closable</h2>
        <p class="section-desc">Dialog without close button (must use buttons to close).</p>
        <div class="demo-showcase">
          <wfx-button label="Confirmation Required" icon="pi pi-exclamation-triangle" severity="warn" (onClick)="nonClosableVisible = true"></wfx-button>
          
          <wfx-dialog 
            [(visible)]="nonClosableVisible" 
            header="Confirmation"
            [modal]="true"
            [closable]="false"
            [closeOnEscape]="false"
            [style]="{ width: '400px' }"
          >
            <div class="confirmation-content">
              <i class="pi pi-exclamation-triangle" style="font-size: 2rem; color: var(--orange-500);"></i>
              <p>Are you sure you want to proceed? This action cannot be undone.</p>
            </div>
            <div wfx-dialog-footer>
              <wfx-button label="No" severity="secondary" [outlined]="true" (onClick)="nonClosableVisible = false"></wfx-button>
              <wfx-button label="Yes" severity="danger" (onClick)="nonClosableVisible = false"></wfx-button>
            </div>
          </wfx-dialog>
        </div>
        <div class="code-block">
          <code>&lt;wfx-dialog [closable]="false" [closeOnEscape]="false"&gt;...&lt;/wfx-dialog&gt;</code>
        </div>
      </section>

      <!-- API Reference -->
      <section class="demo-section api-section">
        <h2>
          <i class="pi pi-book"></i>
          API Reference
        </h2>
        <div class="api-table-wrapper">
          <table class="api-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>visible</code></td>
                <td>boolean</td>
                <td>false</td>
                <td>Visibility of the dialog (two-way bindable)</td>
              </tr>
              <tr>
                <td><code>header</code></td>
                <td>string</td>
                <td>-</td>
                <td>Title text of the dialog</td>
              </tr>
              <tr>
                <td><code>modal</code></td>
                <td>boolean</td>
                <td>false</td>
                <td>Block background when visible</td>
              </tr>
              <tr>
                <td><code>closable</code></td>
                <td>boolean</td>
                <td>true</td>
                <td>Show close button</td>
              </tr>
              <tr>
                <td><code>maximizable</code></td>
                <td>boolean</td>
                <td>false</td>
                <td>Enable fullscreen mode</td>
              </tr>
              <tr>
                <td><code>position</code></td>
                <td>string</td>
                <td>center</td>
                <td>Position on screen</td>
              </tr>
              <tr>
                <td><code>draggable</code></td>
                <td>boolean</td>
                <td>true</td>
                <td>Enable dragging</td>
              </tr>
              <tr>
                <td><code>resizable</code></td>
                <td>boolean</td>
                <td>true</td>
                <td>Enable resizing</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .wfx-dialog-demo { max-width: 1000px; margin: 0 auto; }

    .breadcrumb {
      display: flex; align-items: center; gap: var(--spacing-2);
      margin-bottom: var(--spacing-6); font-size: 0.875rem;
      a { display: flex; align-items: center; gap: var(--spacing-2); color: var(--color-primary); text-decoration: none; &:hover { text-decoration: underline; } }
      span { color: var(--grey); }
      .pi-chevron-right { font-size: 0.75rem; color: var(--grey); }
    }

    .demo-header {
      margin-bottom: var(--spacing-8); padding-bottom: var(--spacing-6); border-bottom: 1px solid var(--greyborder);
      h1 { margin: 0 0 var(--spacing-2) 0; font-size: 2rem; font-weight: 700; color: var(--darkgrey); }
      p { margin: 0; color: var(--grey); }
    }

    .demo-section {
      margin-bottom: var(--spacing-8);
      h2 { display: flex; align-items: center; gap: var(--spacing-2); font-size: 1.25rem; font-weight: 600; color: var(--darkgrey); margin: 0 0 var(--spacing-3) 0; i { color: var(--color-primary); } }
      .section-desc { color: var(--grey); margin: 0 0 var(--spacing-4) 0; font-size: 0.875rem; }
    }

    .demo-showcase {
      background: var(--surface-card); border: 1px solid var(--greyborder);
      border-radius: var(--radius-lg) var(--radius-lg) 0 0; padding: var(--spacing-6);
    }

    .code-block {
      background: #1e1e1e; border: 1px solid var(--greyborder); border-top: none;
      border-radius: 0 0 var(--radius-lg) var(--radius-lg); padding: var(--spacing-4); overflow-x: auto;
      code { color: #9cdcfe; font-family: 'Fira Code', monospace; font-size: 0.8125rem; white-space: pre; }
    }

    .button-grid { display: flex; flex-wrap: wrap; gap: var(--spacing-2); }

    .form-grid { display: flex; flex-direction: column; gap: var(--spacing-4); }
    .form-field { display: flex; flex-direction: column; gap: var(--spacing-2); label { font-weight: 500; color: var(--darkgrey); font-size: 0.875rem; } }

    .confirmation-content { display: flex; flex-direction: column; align-items: center; gap: var(--spacing-4); text-align: center; padding: var(--spacing-4); }

    .api-section { background: var(--surface-card); border: 1px solid var(--greyborder); border-radius: var(--radius-lg); padding: var(--spacing-6); }
    .api-table-wrapper { overflow-x: auto; }
    .api-table {
      width: 100%; border-collapse: collapse; font-size: 0.875rem;
      th, td { text-align: left; padding: var(--spacing-3) var(--spacing-4); border-bottom: 1px solid var(--greyborder); }
      th { background: var(--grey-background); font-weight: 600; color: var(--darkgrey); }
      td { color: var(--grey); code { background: var(--grey-background); padding: 2px 6px; border-radius: var(--radius-sm); font-size: 0.8125rem; color: var(--color-primary); } }
    }
  `]
})
export class WfxDialogDemoComponent {
  basicVisible = false;
  modalVisible = false;
  dismissableVisible = false;
  positionVisible = false;
  maximizableVisible = false;
  formVisible = false;
  nonClosableVisible = false;

  currentPosition: DialogPosition = 'center';
  positions: DialogPosition[] = ['center', 'top', 'bottom', 'left', 'right', 'topleft', 'topright', 'bottomleft', 'bottomright'];

  formData = {
    name: 'John Doe',
    email: 'john@example.com'
  };

  openPosition(position: DialogPosition): void {
    this.currentPosition = position;
    this.positionVisible = true;
  }

  saveForm(): void {
    console.log('Form saved:', this.formData);
    this.formVisible = false;
  }
}

