// ============================================
// WFX Toast Demo Component
// Showcase for WfxToast wrapper component
// ============================================

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WfxToast, ToastPosition, ToastSeverity } from '../../../../wfx-common-library/wfx-toast/wfx-toast';
import { WfxButton } from '../../../../wfx-common-library/wfx-button/wfx-button';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-wfx-toast-demo',
  standalone: true,
  imports: [CommonModule, RouterLink, WfxToast, WfxButton],
  providers: [MessageService],
  template: `
    <div class="wfx-toast-demo">
      <!-- Toast Component -->
      <wfx-toast></wfx-toast>
      <wfx-toast key="tl" position="top-left"></wfx-toast>
      <wfx-toast key="tc" position="top-center"></wfx-toast>
      <wfx-toast key="bl" position="bottom-left"></wfx-toast>
      <wfx-toast key="bc" position="bottom-center"></wfx-toast>
      <wfx-toast key="br" position="bottom-right"></wfx-toast>

      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <a routerLink="/wfx-library-test">
          <i class="pi pi-box"></i>
          WFX Library
        </a>
        <i class="pi pi-chevron-right"></i>
        <span>WfxToast</span>
      </nav>

      <!-- Header -->
      <header class="demo-header">
        <div class="header-content">
          <h1>WfxToast</h1>
          <p>A wrapper component for PrimeNG Toast with convenient service methods</p>
        </div>
      </header>

      <!-- Import Section -->
      <section class="demo-section">
        <h2>Import</h2>
        <div class="code-block">
          <code>import {{ '{' }} WfxToast, WfxToastService {{ '}' }} from 'wfx-common-library/wfx-toast';

// In your component:
constructor(private messageService: MessageService) {{ '{' }}{{ '}' }}</code>
        </div>
      </section>

      <!-- Severities -->
      <section class="demo-section">
        <h2>Severities</h2>
        <p class="section-desc">Toast messages come in different severity levels.</p>
        <div class="demo-showcase">
          <div class="button-row">
            <wfx-button label="Success" severity="success" icon="pi pi-check" (onClick)="showSuccess()"></wfx-button>
            <wfx-button label="Info" severity="info" icon="pi pi-info-circle" (onClick)="showInfo()"></wfx-button>
            <wfx-button label="Warning" severity="warn" icon="pi pi-exclamation-triangle" (onClick)="showWarn()"></wfx-button>
            <wfx-button label="Error" severity="danger" icon="pi pi-times-circle" (onClick)="showError()"></wfx-button>
          </div>
        </div>
        <div class="code-block">
          <code>this.messageService.add({{ '{' }}
  severity: 'success',
  summary: 'Success',
  detail: 'Operation completed'
{{ '}' }});</code>
        </div>
      </section>

      <!-- Additional Severities -->
      <section class="demo-section">
        <h2>Additional Severities</h2>
        <p class="section-desc">Secondary and contrast severity options.</p>
        <div class="demo-showcase">
          <div class="button-row">
            <wfx-button label="Secondary" severity="secondary" (onClick)="showSecondary()"></wfx-button>
            <wfx-button label="Contrast" severity="contrast" (onClick)="showContrast()"></wfx-button>
          </div>
        </div>
      </section>

      <!-- Positions -->
      <section class="demo-section">
        <h2>Positions</h2>
        <p class="section-desc">Toast can appear in different positions on the screen.</p>
        <div class="demo-showcase">
          <div class="position-grid">
            <wfx-button label="Top Left" [outlined]="true" (onClick)="showPosition('tl', 'top-left')"></wfx-button>
            <wfx-button label="Top Center" [outlined]="true" (onClick)="showPosition('tc', 'top-center')"></wfx-button>
            <wfx-button label="Top Right" [outlined]="true" (onClick)="showPosition(null, 'top-right')"></wfx-button>
            <wfx-button label="Bottom Left" [outlined]="true" (onClick)="showPosition('bl', 'bottom-left')"></wfx-button>
            <wfx-button label="Bottom Center" [outlined]="true" (onClick)="showPosition('bc', 'bottom-center')"></wfx-button>
            <wfx-button label="Bottom Right" [outlined]="true" (onClick)="showPosition('br', 'bottom-right')"></wfx-button>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-toast position="top-left"&gt;&lt;/wfx-toast&gt;</code>
        </div>
      </section>

      <!-- Custom Life -->
      <section class="demo-section">
        <h2>Custom Duration</h2>
        <p class="section-desc">Control how long the toast is displayed.</p>
        <div class="demo-showcase">
          <div class="button-row">
            <wfx-button label="1 Second" severity="secondary" [outlined]="true" (onClick)="showCustomLife(1000)"></wfx-button>
            <wfx-button label="3 Seconds (default)" severity="secondary" [outlined]="true" (onClick)="showCustomLife(3000)"></wfx-button>
            <wfx-button label="5 Seconds" severity="secondary" [outlined]="true" (onClick)="showCustomLife(5000)"></wfx-button>
            <wfx-button label="10 Seconds" severity="secondary" [outlined]="true" (onClick)="showCustomLife(10000)"></wfx-button>
          </div>
        </div>
        <div class="code-block">
          <code>this.messageService.add({{ '{' }} severity: 'info', summary: 'Info', detail: 'Message', life: 5000 {{ '}' }});</code>
        </div>
      </section>

      <!-- Sticky Toast -->
      <section class="demo-section">
        <h2>Sticky Toast</h2>
        <p class="section-desc">Toast that stays until manually dismissed.</p>
        <div class="demo-showcase">
          <wfx-button label="Show Sticky Toast" icon="pi pi-thumbtack" (onClick)="showSticky()"></wfx-button>
        </div>
        <div class="code-block">
          <code>this.messageService.add({{ '{' }} severity: 'info', summary: 'Sticky', detail: 'Message', sticky: true {{ '}' }});</code>
        </div>
      </section>

      <!-- Multiple Messages -->
      <section class="demo-section">
        <h2>Multiple Messages</h2>
        <p class="section-desc">Show multiple toast messages at once.</p>
        <div class="demo-showcase">
          <wfx-button label="Show Multiple" icon="pi pi-clone" (onClick)="showMultiple()"></wfx-button>
        </div>
        <div class="code-block">
          <code>this.messageService.addAll([
  {{ '{' }} severity: 'success', summary: 'Success', detail: 'Message 1' {{ '}' }},
  {{ '{' }} severity: 'info', summary: 'Info', detail: 'Message 2' {{ '}' }}
]);</code>
        </div>
      </section>

      <!-- Clear Messages -->
      <section class="demo-section">
        <h2>Clear Messages</h2>
        <p class="section-desc">Clear all or specific toast messages.</p>
        <div class="demo-showcase">
          <div class="button-row">
            <wfx-button label="Show Multiple Sticky" severity="secondary" [outlined]="true" (onClick)="showMultipleSticky()"></wfx-button>
            <wfx-button label="Clear All" severity="danger" icon="pi pi-trash" (onClick)="clearAll()"></wfx-button>
          </div>
        </div>
        <div class="code-block">
          <code>this.messageService.clear(); // Clear all toasts</code>
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
                <td><code>key</code></td>
                <td>string</td>
                <td>-</td>
                <td>Key to target specific toast</td>
              </tr>
              <tr>
                <td><code>position</code></td>
                <td>string</td>
                <td>top-right</td>
                <td>Position on screen</td>
              </tr>
              <tr>
                <td><code>life</code></td>
                <td>number</td>
                <td>3000</td>
                <td>Display duration in ms</td>
              </tr>
              <tr>
                <td><code>preventDuplicates</code></td>
                <td>boolean</td>
                <td>false</td>
                <td>Prevent duplicate messages</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Message Properties</h3>
        <div class="api-table-wrapper">
          <table class="api-table">
            <thead>
              <tr>
                <th>Property</th>
                <th>Type</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>severity</code></td>
                <td>string</td>
                <td>success, info, warn, error, secondary, contrast</td>
              </tr>
              <tr>
                <td><code>summary</code></td>
                <td>string</td>
                <td>Title of the message</td>
              </tr>
              <tr>
                <td><code>detail</code></td>
                <td>string</td>
                <td>Detail text of the message</td>
              </tr>
              <tr>
                <td><code>life</code></td>
                <td>number</td>
                <td>Duration in milliseconds</td>
              </tr>
              <tr>
                <td><code>sticky</code></td>
                <td>boolean</td>
                <td>Stay until manually closed</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .wfx-toast-demo { max-width: 1000px; margin: 0 auto; }

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
      h3 { font-size: 1rem; font-weight: 600; color: var(--darkgrey); margin: var(--spacing-6) 0 var(--spacing-3) 0; }
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

    .button-row { display: flex; flex-wrap: wrap; gap: var(--spacing-3); }
    .position-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--spacing-3); }

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
export class WfxToastDemoComponent {
  constructor(private messageService: MessageService) {}

  showSuccess(): void {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Operation completed successfully' });
  }

  showInfo(): void {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Here is some information for you' });
  }

  showWarn(): void {
    this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please review before proceeding' });
  }

  showError(): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
  }

  showSecondary(): void {
    this.messageService.add({ severity: 'secondary', summary: 'Secondary', detail: 'Secondary message style' });
  }

  showContrast(): void {
    this.messageService.add({ severity: 'contrast', summary: 'Contrast', detail: 'High contrast message' });
  }

  showPosition(key: string | null, position: string): void {
    this.messageService.add({ key: key || undefined, severity: 'info', summary: position, detail: `Position: ${position}` });
  }

  showCustomLife(life: number): void {
    this.messageService.add({ severity: 'info', summary: 'Custom Duration', detail: `This message will display for ${life / 1000} second(s)`, life });
  }

  showSticky(): void {
    this.messageService.add({ severity: 'info', summary: 'Sticky', detail: 'This message stays until you close it', sticky: true });
  }

  showMultiple(): void {
    this.messageService.addAll([
      { severity: 'success', summary: 'Success', detail: 'First message' },
      { severity: 'info', summary: 'Info', detail: 'Second message' },
      { severity: 'warn', summary: 'Warning', detail: 'Third message' }
    ]);
  }

  showMultipleSticky(): void {
    this.messageService.addAll([
      { severity: 'success', summary: 'Task 1', detail: 'Completed successfully', sticky: true },
      { severity: 'info', summary: 'Task 2', detail: 'In progress', sticky: true },
      { severity: 'warn', summary: 'Task 3', detail: 'Needs attention', sticky: true }
    ]);
  }

  clearAll(): void {
    this.messageService.clear();
  }
}

