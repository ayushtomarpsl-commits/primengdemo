// ============================================
// WFX Button Demo Component
// Showcase for WfxButton wrapper component
// ============================================

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WfxButton } from '../../../../wfx-common-library/wfx-button/wfx-button';

@Component({
  selector: 'app-wfx-button-demo',
  standalone: true,
  imports: [CommonModule, RouterLink, WfxButton],
  template: `
    <div class="wfx-button-demo">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <a routerLink="/wfx-library-test">
          <i class="pi pi-box"></i>
          WFX Library
        </a>
        <i class="pi pi-chevron-right"></i>
        <span>WfxButton</span>
      </nav>

      <!-- Header -->
      <header class="demo-header">
        <div class="header-content">
          <h1>WfxButton</h1>
          <p>A wrapper component for PrimeNG Button exposing all properties and events</p>
        </div>
        <div class="header-actions">
          <wfx-button 
            label="View Source" 
            icon="pi pi-code" 
            severity="secondary" 
            [outlined]="true"
          ></wfx-button>
        </div>
      </header>

      <!-- Import Section -->
      <section class="demo-section">
        <h2>Import</h2>
        <div class="code-block">
          <code>import {{ '{' }} WfxButton {{ '}' }} from 'wfx-common-library/wfx-button';</code>
        </div>
      </section>

      <!-- Basic Buttons -->
      <section class="demo-section">
        <h2>Basic</h2>
        <p class="section-desc">Buttons come in different severity levels to indicate importance.</p>
        <div class="demo-showcase">
          <div class="button-row">
            <wfx-button label="Primary" severity="primary" (onClick)="onButtonClick('Primary')"></wfx-button>
            <wfx-button label="Secondary" severity="secondary" (onClick)="onButtonClick('Secondary')"></wfx-button>
            <wfx-button label="Success" severity="success" (onClick)="onButtonClick('Success')"></wfx-button>
            <wfx-button label="Info" severity="info" (onClick)="onButtonClick('Info')"></wfx-button>
            <wfx-button label="Warn" severity="warn" (onClick)="onButtonClick('Warn')"></wfx-button>
            <wfx-button label="Danger" severity="danger" (onClick)="onButtonClick('Danger')"></wfx-button>
            <wfx-button label="Help" severity="help" (onClick)="onButtonClick('Help')"></wfx-button>
            <wfx-button label="Contrast" severity="contrast" (onClick)="onButtonClick('Contrast')"></wfx-button>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-button label="Primary" severity="primary"&gt;&lt;/wfx-button&gt;</code>
        </div>
      </section>

      <!-- Outlined Buttons -->
      <section class="demo-section">
        <h2>Outlined</h2>
        <p class="section-desc">Outlined buttons have a transparent background with colored borders.</p>
        <div class="demo-showcase">
          <div class="button-row">
            <wfx-button label="Primary" severity="primary" [outlined]="true"></wfx-button>
            <wfx-button label="Secondary" severity="secondary" [outlined]="true"></wfx-button>
            <wfx-button label="Success" severity="success" [outlined]="true"></wfx-button>
            <wfx-button label="Info" severity="info" [outlined]="true"></wfx-button>
            <wfx-button label="Warn" severity="warn" [outlined]="true"></wfx-button>
            <wfx-button label="Danger" severity="danger" [outlined]="true"></wfx-button>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-button label="Primary" severity="primary" [outlined]="true"&gt;&lt;/wfx-button&gt;</code>
        </div>
      </section>

      <!-- Text Buttons -->
      <section class="demo-section">
        <h2>Text</h2>
        <p class="section-desc">Text buttons have no background initially, great for secondary actions.</p>
        <div class="demo-showcase">
          <div class="button-row">
            <wfx-button label="Primary" severity="primary" [text]="true"></wfx-button>
            <wfx-button label="Secondary" severity="secondary" [text]="true"></wfx-button>
            <wfx-button label="Success" severity="success" [text]="true"></wfx-button>
            <wfx-button label="Info" severity="info" [text]="true"></wfx-button>
            <wfx-button label="Warn" severity="warn" [text]="true"></wfx-button>
            <wfx-button label="Danger" severity="danger" [text]="true"></wfx-button>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-button label="Primary" severity="primary" [text]="true"&gt;&lt;/wfx-button&gt;</code>
        </div>
      </section>

      <!-- Raised Buttons -->
      <section class="demo-section">
        <h2>Raised</h2>
        <p class="section-desc">Raised buttons have shadow to indicate elevation.</p>
        <div class="demo-showcase">
          <div class="button-row">
            <wfx-button label="Primary" severity="primary" [raised]="true"></wfx-button>
            <wfx-button label="Secondary" severity="secondary" [raised]="true"></wfx-button>
            <wfx-button label="Success" severity="success" [raised]="true"></wfx-button>
            <wfx-button label="Info" severity="info" [raised]="true"></wfx-button>
            <wfx-button label="Warn" severity="warn" [raised]="true"></wfx-button>
            <wfx-button label="Danger" severity="danger" [raised]="true"></wfx-button>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-button label="Primary" severity="primary" [raised]="true"&gt;&lt;/wfx-button&gt;</code>
        </div>
      </section>

      <!-- Rounded Buttons -->
      <section class="demo-section">
        <h2>Rounded</h2>
        <p class="section-desc">Rounded buttons have pill-shaped borders.</p>
        <div class="demo-showcase">
          <div class="button-row">
            <wfx-button label="Primary" severity="primary" [rounded]="true"></wfx-button>
            <wfx-button label="Secondary" severity="secondary" [rounded]="true"></wfx-button>
            <wfx-button label="Success" severity="success" [rounded]="true"></wfx-button>
            <wfx-button label="Info" severity="info" [rounded]="true"></wfx-button>
            <wfx-button label="Warn" severity="warn" [rounded]="true"></wfx-button>
            <wfx-button label="Danger" severity="danger" [rounded]="true"></wfx-button>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-button label="Primary" severity="primary" [rounded]="true"&gt;&lt;/wfx-button&gt;</code>
        </div>
      </section>

      <!-- Icon Buttons -->
      <section class="demo-section">
        <h2>Icons</h2>
        <p class="section-desc">Buttons can display icons alongside or instead of labels.</p>
        <div class="demo-showcase">
          <div class="button-row">
            <wfx-button label="Save" icon="pi pi-save" severity="primary"></wfx-button>
            <wfx-button label="Edit" icon="pi pi-pencil" severity="secondary"></wfx-button>
            <wfx-button label="Delete" icon="pi pi-trash" severity="danger"></wfx-button>
            <wfx-button label="Search" icon="pi pi-search" severity="info"></wfx-button>
            <wfx-button label="Download" icon="pi pi-download" severity="success"></wfx-button>
            <wfx-button label="Upload" icon="pi pi-upload" severity="warn"></wfx-button>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-button label="Save" icon="pi pi-save" severity="primary"&gt;&lt;/wfx-button&gt;</code>
        </div>
      </section>

      <!-- Icon Position -->
      <section class="demo-section">
        <h2>Icon Position</h2>
        <p class="section-desc">Icons can be positioned at different sides of the label.</p>
        <div class="demo-showcase">
          <div class="button-row">
            <wfx-button label="Left" icon="pi pi-arrow-left" iconPos="left" severity="primary"></wfx-button>
            <wfx-button label="Right" icon="pi pi-arrow-right" iconPos="right" severity="primary"></wfx-button>
            <wfx-button label="Top" icon="pi pi-arrow-up" iconPos="top" severity="primary"></wfx-button>
            <wfx-button label="Bottom" icon="pi pi-arrow-down" iconPos="bottom" severity="primary"></wfx-button>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-button label="Right" icon="pi pi-arrow-right" iconPos="right"&gt;&lt;/wfx-button&gt;</code>
        </div>
      </section>

      <!-- Icon Only Buttons -->
      <section class="demo-section">
        <h2>Icon Only</h2>
        <p class="section-desc">Buttons can be icon-only for compact UIs.</p>
        <div class="demo-showcase">
          <div class="button-row">
            <wfx-button icon="pi pi-check" severity="success" [rounded]="true" ariaLabel="Confirm"></wfx-button>
            <wfx-button icon="pi pi-times" severity="danger" [rounded]="true" ariaLabel="Cancel"></wfx-button>
            <wfx-button icon="pi pi-pencil" severity="primary" [rounded]="true" ariaLabel="Edit"></wfx-button>
            <wfx-button icon="pi pi-cog" severity="secondary" [rounded]="true" ariaLabel="Settings"></wfx-button>
            <wfx-button icon="pi pi-star" severity="warn" [rounded]="true" [outlined]="true" ariaLabel="Favorite"></wfx-button>
            <wfx-button icon="pi pi-heart" severity="danger" [rounded]="true" [text]="true" ariaLabel="Like"></wfx-button>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-button icon="pi pi-check" severity="success" [rounded]="true"&gt;&lt;/wfx-button&gt;</code>
        </div>
      </section>

      <!-- Sizes -->
      <section class="demo-section">
        <h2>Sizes</h2>
        <p class="section-desc">Buttons come in small, normal, and large sizes.</p>
        <div class="demo-showcase">
          <div class="button-row align-center">
            <wfx-button label="Small" icon="pi pi-check" size="small" severity="primary"></wfx-button>
            <wfx-button label="Normal" icon="pi pi-check" severity="primary"></wfx-button>
            <wfx-button label="Large" icon="pi pi-check" size="large" severity="primary"></wfx-button>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-button label="Large" icon="pi pi-check" size="large"&gt;&lt;/wfx-button&gt;</code>
        </div>
      </section>

      <!-- Loading State -->
      <section class="demo-section">
        <h2>Loading</h2>
        <p class="section-desc">Loading state indicates an ongoing operation.</p>
        <div class="demo-showcase">
          <div class="button-row">
            <wfx-button 
              label="Click to Load" 
              icon="pi pi-check"
              severity="primary" 
              [loading]="isLoading()"
              (onClick)="simulateLoading()"
            ></wfx-button>
            <wfx-button 
              label="Always Loading" 
              severity="secondary" 
              [loading]="true"
            ></wfx-button>
            <wfx-button 
              label="Custom Icon" 
              severity="success" 
              [loading]="true"
              loadingIcon="pi pi-spin pi-cog"
            ></wfx-button>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-button label="Loading" [loading]="true"&gt;&lt;/wfx-button&gt;</code>
        </div>
      </section>

      <!-- Disabled State -->
      <section class="demo-section">
        <h2>Disabled</h2>
        <p class="section-desc">Disabled buttons cannot be interacted with.</p>
        <div class="demo-showcase">
          <div class="button-row">
            <wfx-button label="Primary" severity="primary" [disabled]="true"></wfx-button>
            <wfx-button label="Secondary" severity="secondary" [disabled]="true"></wfx-button>
            <wfx-button label="Success" severity="success" [disabled]="true"></wfx-button>
            <wfx-button label="Outlined" severity="primary" [outlined]="true" [disabled]="true"></wfx-button>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-button label="Disabled" [disabled]="true"&gt;&lt;/wfx-button&gt;</code>
        </div>
      </section>

      <!-- Badge -->
      <section class="demo-section">
        <h2>Badge</h2>
        <p class="section-desc">Badges display notification counts or status indicators.</p>
        <div class="demo-showcase">
          <div class="button-row">
            <wfx-button label="Emails" icon="pi pi-envelope" severity="primary" badge="5"></wfx-button>
            <wfx-button label="Messages" icon="pi pi-comments" severity="secondary" badge="12" badgeSeverity="danger"></wfx-button>
            <wfx-button label="Notifications" icon="pi pi-bell" severity="info" badge="99+" badgeSeverity="warn"></wfx-button>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-button label="Emails" icon="pi pi-envelope" badge="5" badgeSeverity="danger"&gt;&lt;/wfx-button&gt;</code>
        </div>
      </section>

      <!-- Link Style -->
      <section class="demo-section">
        <h2>Link</h2>
        <p class="section-desc">Link styled buttons appear as hyperlinks.</p>
        <div class="demo-showcase">
          <div class="button-row">
            <wfx-button label="Learn More" [link]="true"></wfx-button>
            <wfx-button label="Documentation" icon="pi pi-external-link" iconPos="right" [link]="true"></wfx-button>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-button label="Learn More" [link]="true"&gt;&lt;/wfx-button&gt;</code>
        </div>
      </section>

      <!-- Fluid Width -->
      <section class="demo-section">
        <h2>Fluid</h2>
        <p class="section-desc">Fluid buttons span the full width of their container.</p>
        <div class="demo-showcase">
          <div class="button-column">
            <wfx-button label="Full Width Primary" severity="primary" [fluid]="true"></wfx-button>
            <wfx-button label="Full Width Secondary" severity="secondary" [fluid]="true" [outlined]="true"></wfx-button>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-button label="Full Width" [fluid]="true"&gt;&lt;/wfx-button&gt;</code>
        </div>
      </section>

      <!-- PT Styling -->
      <section class="demo-section">
        <h2>Pass Through (PT)</h2>
        <p class="section-desc">Use PT to customize DOM elements and apply custom styles.</p>
        <div class="demo-showcase">
          <div class="button-row">
            <wfx-button 
              label="Gradient Button" 
              icon="pi pi-sparkles"
              [pt]="{
                root: { 
                  style: { 
                    background: 'linear-gradient(135deg, #00d1cf 0%, #007bff 100%)',
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(0, 209, 207, 0.4)'
                  } 
                },
                label: { style: { fontWeight: '700' } }
              }"
            ></wfx-button>
            <wfx-button 
              label="Custom Rounded" 
              icon="pi pi-star"
              [pt]="{
                root: { 
                  style: { 
                    background: '#ff6b6b',
                    borderRadius: '50px',
                    padding: '12px 32px'
                  } 
                }
              }"
            ></wfx-button>
            <wfx-button 
              label="Neon Effect" 
              [pt]="{
                root: { 
                  style: { 
                    background: 'transparent',
                    border: '2px solid #00ff88',
                    color: '#00ff88',
                    boxShadow: '0 0 10px #00ff88, inset 0 0 10px rgba(0, 255, 136, 0.1)'
                  } 
                }
              }"
            ></wfx-button>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-button label="Custom" [pt]="{{ '{' }} root: {{ '{' }} style: {{ '{' }} background: 'red' {{ '}' }} {{ '}' }} {{ '}' }}"&gt;&lt;/wfx-button&gt;</code>
        </div>
      </section>

      <!-- Event Log -->
      <section class="demo-section event-log-section">
        <h2>
          <i class="pi pi-list"></i>
          Event Log
        </h2>
        <div class="event-log">
          @if (eventLog().length === 0) {
            <p class="event-log__empty">Click buttons to see events...</p>
          } @else {
            @for (event of eventLog(); track $index) {
              <div class="event-log__item">
                <span class="event-log__time">{{ event.time }}</span>
                <span class="event-log__message">{{ event.message }}</span>
              </div>
            }
          }
        </div>
        <wfx-button 
          label="Clear Log" 
          icon="pi pi-trash" 
          severity="secondary" 
          [text]="true"
          (onClick)="clearLog()"
        ></wfx-button>
      </section>
    </div>
  `,
  styles: [`
    .wfx-button-demo {
      max-width: 1000px;
      margin: 0 auto;
    }

    // Breadcrumb
    .breadcrumb {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
      margin-bottom: var(--spacing-6);
      font-size: 0.875rem;
      
      a {
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
        color: var(--color-primary);
        text-decoration: none;
        
        &:hover {
          text-decoration: underline;
        }
      }
      
      span {
        color: var(--grey);
      }
      
      .pi-chevron-right {
        font-size: 0.75rem;
        color: var(--grey);
      }
    }

    // Header
    .demo-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--spacing-8);
      padding-bottom: var(--spacing-6);
      border-bottom: 1px solid var(--greyborder);
      
      h1 {
        margin: 0 0 var(--spacing-2) 0;
        font-size: 2rem;
        font-weight: 700;
        color: var(--darkgrey);
      }
      
      p {
        margin: 0;
        color: var(--grey);
        max-width: 500px;
      }
    }

    // Section
    .demo-section {
      margin-bottom: var(--spacing-8);
      
      h2 {
        display: flex;
        align-items: center;
        gap: var(--spacing-2);
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--darkgrey);
        margin: 0 0 var(--spacing-3) 0;
        
        i {
          color: var(--color-primary);
        }
      }
      
      .section-desc {
        color: var(--grey);
        margin: 0 0 var(--spacing-4) 0;
        font-size: 0.875rem;
      }
    }

    .demo-showcase {
      background: var(--surface-card);
      border: 1px solid var(--greyborder);
      border-radius: var(--radius-lg) var(--radius-lg) 0 0;
      padding: var(--spacing-6);
    }

    .code-block {
      background: #1e1e1e;
      border: 1px solid var(--greyborder);
      border-top: none;
      border-radius: 0 0 var(--radius-lg) var(--radius-lg);
      padding: var(--spacing-4);
      overflow-x: auto;
      
      code {
        color: #9cdcfe;
        font-family: 'Fira Code', monospace;
        font-size: 0.8125rem;
        white-space: pre;
      }
    }

    .button-row {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-3);
      
      &.align-center {
        align-items: center;
      }
    }

    .button-column {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-3);
      max-width: 400px;
    }

    // Event Log
    .event-log-section {
      background: var(--surface-card);
      border: 1px solid var(--greyborder);
      border-radius: var(--radius-lg);
      padding: var(--spacing-6);
    }

    .event-log {
      background: var(--grey-background);
      border: 1px solid var(--greyborder);
      border-radius: var(--radius-md);
      padding: var(--spacing-4);
      margin-bottom: var(--spacing-4);
      max-height: 200px;
      overflow-y: auto;
    }

    .event-log__empty {
      color: var(--grey);
      font-style: italic;
      margin: 0;
      text-align: center;
      padding: var(--spacing-4);
    }

    .event-log__item {
      display: flex;
      gap: var(--spacing-3);
      padding: var(--spacing-2) 0;
      border-bottom: 1px solid var(--greyborder);
      
      &:last-child {
        border-bottom: none;
      }
    }

    .event-log__time {
      font-size: 0.75rem;
      color: var(--grey);
      font-family: monospace;
      white-space: nowrap;
    }

    .event-log__message {
      font-size: 0.875rem;
      color: var(--darkgrey);
    }
  `]
})
export class WfxButtonDemoComponent {
  isLoading = signal(false);
  eventLog = signal<{ time: string; message: string }[]>([]);

  onButtonClick(buttonName: string): void {
    this.addToLog(`Button clicked: ${buttonName}`);
  }

  simulateLoading(): void {
    this.isLoading.set(true);
    this.addToLog('Loading started...');
    
    setTimeout(() => {
      this.isLoading.set(false);
      this.addToLog('Loading completed!');
    }, 2000);
  }

  clearLog(): void {
    this.eventLog.set([]);
  }

  private addToLog(message: string): void {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
    
    this.eventLog.update(log => [{ time, message }, ...log].slice(0, 20));
  }
}

