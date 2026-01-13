// ============================================
// WFX Card Demo Component
// Showcase for WfxCard wrapper component
// ============================================

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WfxCard } from '../../../../wfx-common-library/wfx-card/wfx-card';
import { WfxButton } from '../../../../wfx-common-library/wfx-button/wfx-button';

@Component({
  selector: 'app-wfx-card-demo',
  standalone: true,
  imports: [CommonModule, RouterLink, WfxCard, WfxButton],
  template: `
    <div class="wfx-card-demo">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <a routerLink="/wfx-library-test">
          <i class="pi pi-box"></i>
          WFX Library
        </a>
        <i class="pi pi-chevron-right"></i>
        <span>WfxCard</span>
      </nav>

      <!-- Header -->
      <header class="demo-header">
        <div class="header-content">
          <h1>WfxCard</h1>
          <p>A wrapper component for PrimeNG Card with content projection slots</p>
        </div>
      </header>

      <!-- Import Section -->
      <section class="demo-section">
        <h2>Import</h2>
        <div class="code-block">
          <code>import {{ '{' }} WfxCard {{ '}' }} from 'wfx-common-library/wfx-card';</code>
        </div>
      </section>

      <!-- Basic Card -->
      <section class="demo-section">
        <h2>Basic</h2>
        <p class="section-desc">Basic card with header and content.</p>
        <div class="demo-showcase">
          <wfx-card header="Simple Card" subheader="Subtitle goes here">
            <p>This is the card content. You can put any content here.</p>
          </wfx-card>
        </div>
        <div class="code-block">
          <code>&lt;wfx-card header="Simple Card" subheader="Subtitle"&gt;
  &lt;p&gt;Card content&lt;/p&gt;
&lt;/wfx-card&gt;</code>
        </div>
      </section>

      <!-- Card with Image Header -->
      <section class="demo-section">
        <h2>With Image Header</h2>
        <p class="section-desc">Card with an image in the header slot.</p>
        <div class="demo-showcase">
          <div class="card-grid">
            <wfx-card header="Product Card">
              <img wfx-card-header src="https://primefaces.org/cdn/primeng/images/card-ng.jpg" alt="Card Image" style="width: 100%; border-radius: 8px 8px 0 0;">
              <p>This card has an image header using the wfx-card-header slot.</p>
              <div wfx-card-footer>
                <wfx-button label="Buy Now" icon="pi pi-shopping-cart"></wfx-button>
                <wfx-button label="Details" [outlined]="true" severity="secondary"></wfx-button>
              </div>
            </wfx-card>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-card header="Product Card"&gt;
  &lt;img wfx-card-header src="image.jpg" /&gt;
  &lt;p&gt;Content&lt;/p&gt;
  &lt;div wfx-card-footer&gt;
    &lt;wfx-button label="Buy Now"&gt;&lt;/wfx-button&gt;
  &lt;/div&gt;
&lt;/wfx-card&gt;</code>
        </div>
      </section>

      <!-- Card with Footer -->
      <section class="demo-section">
        <h2>With Footer</h2>
        <p class="section-desc">Card with action buttons in the footer.</p>
        <div class="demo-showcase">
          <div class="card-grid">
            <wfx-card header="User Profile" subheader="Account Settings">
              <p>Manage your account settings and preferences.</p>
              <div wfx-card-footer>
                <wfx-button label="Save" icon="pi pi-check"></wfx-button>
                <wfx-button label="Cancel" [text]="true" severity="secondary"></wfx-button>
              </div>
            </wfx-card>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-card header="User Profile"&gt;
  &lt;p&gt;Content&lt;/p&gt;
  &lt;div wfx-card-footer&gt;
    &lt;wfx-button label="Save"&gt;&lt;/wfx-button&gt;
  &lt;/div&gt;
&lt;/wfx-card&gt;</code>
        </div>
      </section>

      <!-- Multiple Cards -->
      <section class="demo-section">
        <h2>Card Grid</h2>
        <p class="section-desc">Multiple cards in a responsive grid layout.</p>
        <div class="demo-showcase">
          <div class="card-grid three-col">
            @for (card of sampleCards; track card.title) {
              <wfx-card [header]="card.title" [subheader]="card.subtitle">
                <p>{{ card.description }}</p>
                <div wfx-card-footer>
                  <wfx-button label="Learn More" [text]="true" icon="pi pi-arrow-right" iconPos="right"></wfx-button>
                </div>
              </wfx-card>
            }
          </div>
        </div>
      </section>

      <!-- Styled Card -->
      <section class="demo-section">
        <h2>Custom Styling</h2>
        <p class="section-desc">Card with custom styles applied via style input.</p>
        <div class="demo-showcase">
          <div class="card-grid">
            <wfx-card 
              header="Premium Feature" 
              subheader="Exclusive Access"
              [style]="{ 'background': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 'color': 'white' }"
            >
              <p style="color: rgba(255,255,255,0.9)">This card has a custom gradient background. Perfect for highlighting special content.</p>
              <div wfx-card-footer>
                <wfx-button label="Upgrade" severity="contrast"></wfx-button>
              </div>
            </wfx-card>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-card [style]="{{ '{' }}'background': 'linear-gradient(...)' {{ '}' }}"&gt;
  ...
&lt;/wfx-card&gt;</code>
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
                <td><code>header</code></td>
                <td>string</td>
                <td>-</td>
                <td>Header text of the card</td>
              </tr>
              <tr>
                <td><code>subheader</code></td>
                <td>string</td>
                <td>-</td>
                <td>Subheader text of the card</td>
              </tr>
              <tr>
                <td><code>style</code></td>
                <td>object</td>
                <td>-</td>
                <td>Inline style of the element</td>
              </tr>
              <tr>
                <td><code>styleClass</code></td>
                <td>string</td>
                <td>-</td>
                <td>Style class of the element</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h3>Content Projection Slots</h3>
        <div class="api-table-wrapper">
          <table class="api-table">
            <thead>
              <tr>
                <th>Slot</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>[wfx-card-header]</code></td>
                <td>Content for the header area (e.g., image)</td>
              </tr>
              <tr>
                <td><code>[wfx-card-title]</code></td>
                <td>Custom title content</td>
              </tr>
              <tr>
                <td><code>[wfx-card-subtitle]</code></td>
                <td>Custom subtitle content</td>
              </tr>
              <tr>
                <td><code>[wfx-card-footer]</code></td>
                <td>Content for the footer area</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .wfx-card-demo { max-width: 1000px; margin: 0 auto; }

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

    .card-grid {
      display: grid; gap: var(--spacing-4);
      &.three-col { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
    }

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
export class WfxCardDemoComponent {
  sampleCards = [
    { title: 'Analytics', subtitle: 'Data Insights', description: 'Track your metrics and gain valuable insights from your data.' },
    { title: 'Security', subtitle: 'Protection', description: 'Enterprise-grade security to keep your data safe and secure.' },
    { title: 'Performance', subtitle: 'Speed', description: 'Optimized for speed and efficiency across all devices.' }
  ];
}

