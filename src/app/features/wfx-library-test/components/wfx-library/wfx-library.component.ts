// ============================================
// WFX Library Main Component
// Navigation hub for all WFX Common Library components
// ============================================

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface LibraryComponent {
  name: string;
  description: string;
  icon: string;
  route: string;
  status: 'ready' | 'coming-soon';
  category: string;
}

@Component({
  selector: 'app-wfx-library',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="wfx-library">
      <!-- Header -->
      <header class="wfx-library__header">
        <div class="header-content">
          <div class="header-icon">
            <i class="pi pi-box"></i>
          </div>
          <div class="header-text">
            <h1>WFX Common Library</h1>
            <p>A collection of reusable wrapper components for PrimeNG</p>
          </div>
        </div>
        <div class="header-stats">
          <div class="stat">
            <span class="stat-value">{{ getReadyCount() }}</span>
            <span class="stat-label">Components</span>
          </div>
          <div class="stat">
            <span class="stat-value">{{ getCategories().length }}</span>
            <span class="stat-label">Categories</span>
          </div>
        </div>
      </header>

      <!-- Component Grid by Category -->
      @for (category of getCategories(); track category) {
        <section class="wfx-library__category">
          <h2 class="category-title">
            <i [class]="getCategoryIcon(category)"></i>
            {{ category }}
          </h2>
          <div class="component-grid">
            @for (comp of getComponentsByCategory(category); track comp.name) {
              <a 
                [routerLink]="comp.route" 
                class="component-card"
                [class.coming-soon]="comp.status === 'coming-soon'"
              >
                <div class="card-icon">
                  <i [class]="comp.icon"></i>
                </div>
                <div class="card-content">
                  <h3>{{ comp.name }}</h3>
                  <p>{{ comp.description }}</p>
                </div>
                <div class="card-status">
                  @if (comp.status === 'ready') {
                    <span class="status-badge ready">
                      <i class="pi pi-check-circle"></i>
                      Ready
                    </span>
                  } @else {
                    <span class="status-badge coming-soon">
                      <i class="pi pi-clock"></i>
                      Coming Soon
                    </span>
                  }
                </div>
                <div class="card-arrow">
                  <i class="pi pi-arrow-right"></i>
                </div>
              </a>
            }
          </div>
        </section>
      }

      <!-- Quick Start Guide -->
      <section class="wfx-library__quickstart">
        <h2>
          <i class="pi pi-bolt"></i>
          Quick Start
        </h2>
        <div class="quickstart-content">
          <div class="quickstart-step">
            <span class="step-number">1</span>
            <div class="step-content">
              <h4>Import the component</h4>
              <code>import {{ '{' }} WfxButton {{ '}' }} from 'wfx-common-library/wfx-button';</code>
            </div>
          </div>
          <div class="quickstart-step">
            <span class="step-number">2</span>
            <div class="step-content">
              <h4>Add to imports</h4>
              <code>imports: [WfxButton]</code>
            </div>
          </div>
          <div class="quickstart-step">
            <span class="step-number">3</span>
            <div class="step-content">
              <h4>Use in template</h4>
              <code>&lt;wfx-button label="Submit" severity="primary"&gt;&lt;/wfx-button&gt;</code>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .wfx-library {
      max-width: 1200px;
      margin: 0 auto;
    }

    // Header
    .wfx-library__header {
      background: linear-gradient(135deg, var(--color-primary) 0%, #007bff 100%);
      border-radius: var(--radius-xl);
      padding: var(--spacing-8);
      margin-bottom: var(--spacing-8);
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: white;
    }

    .header-content {
      display: flex;
      align-items: center;
      gap: var(--spacing-5);
    }

    .header-icon {
      width: 64px;
      height: 64px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      
      i {
        font-size: 2rem;
      }
    }

    .header-text {
      h1 {
        margin: 0 0 var(--spacing-2) 0;
        font-size: 1.75rem;
        font-weight: 700;
      }
      
      p {
        margin: 0;
        opacity: 0.9;
      }
    }

    .header-stats {
      display: flex;
      gap: var(--spacing-6);
    }

    .stat {
      text-align: center;
      padding: var(--spacing-4) var(--spacing-6);
      background: rgba(255, 255, 255, 0.15);
      border-radius: var(--radius-lg);
    }

    .stat-value {
      display: block;
      font-size: 2rem;
      font-weight: 700;
    }

    .stat-label {
      font-size: 0.875rem;
      opacity: 0.9;
    }

    // Category Section
    .wfx-library__category {
      margin-bottom: var(--spacing-8);
    }

    .category-title {
      display: flex;
      align-items: center;
      gap: var(--spacing-3);
      font-size: 1.25rem;
      font-weight: 600;
      color: var(--darkgrey);
      margin: 0 0 var(--spacing-5) 0;
      
      i {
        color: var(--color-primary);
      }
    }

    // Component Grid
    .component-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: var(--spacing-5);
    }

    .component-card {
      display: flex;
      align-items: center;
      gap: var(--spacing-4);
      background: var(--surface-card);
      border: 1px solid var(--greyborder);
      border-radius: var(--radius-lg);
      padding: var(--spacing-5);
      text-decoration: none;
      color: inherit;
      transition: all 0.2s ease;
      position: relative;
      overflow: hidden;
      
      &:hover {
        border-color: var(--color-primary);
        box-shadow: 0 4px 20px rgba(0, 209, 207, 0.15);
        transform: translateY(-2px);
        
        .card-arrow {
          opacity: 1;
          transform: translateX(0);
        }
        
        .card-icon {
          background: var(--color-primary);
          color: white;
        }
      }
      
      &.coming-soon {
        opacity: 0.6;
        pointer-events: none;
      }
    }

    .card-icon {
      width: 48px;
      height: 48px;
      min-width: 48px;
      background: var(--grey-background);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      
      i {
        font-size: 1.25rem;
        color: var(--color-primary);
      }
    }

    .card-content {
      flex: 1;
      min-width: 0;
      
      h3 {
        margin: 0 0 var(--spacing-1) 0;
        font-size: 1rem;
        font-weight: 600;
        color: var(--darkgrey);
      }
      
      p {
        margin: 0;
        font-size: 0.875rem;
        color: var(--grey);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .card-status {
      position: absolute;
      top: var(--spacing-3);
      right: var(--spacing-3);
    }

    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: var(--spacing-1);
      padding: var(--spacing-1) var(--spacing-2);
      border-radius: var(--radius-full);
      font-size: 0.625rem;
      font-weight: 600;
      text-transform: uppercase;
      
      &.ready {
        background: #dcfce7;
        color: #166534;
      }
      
      &.coming-soon {
        background: #fef3c7;
        color: #92400e;
      }
      
      i {
        font-size: 0.625rem;
      }
    }

    .card-arrow {
      opacity: 0;
      transform: translateX(-10px);
      transition: all 0.2s ease;
      color: var(--color-primary);
      
      i {
        font-size: 1rem;
      }
    }

    // Quick Start
    .wfx-library__quickstart {
      background: var(--surface-card);
      border: 1px solid var(--greyborder);
      border-radius: var(--radius-lg);
      padding: var(--spacing-6);
      
      h2 {
        display: flex;
        align-items: center;
        gap: var(--spacing-3);
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--darkgrey);
        margin: 0 0 var(--spacing-5) 0;
        
        i {
          color: var(--color-primary);
        }
      }
    }

    .quickstart-content {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-4);
    }

    .quickstart-step {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-4);
    }

    .step-number {
      width: 32px;
      height: 32px;
      min-width: 32px;
      background: var(--color-primary);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 0.875rem;
    }

    .step-content {
      flex: 1;
      
      h4 {
        margin: 0 0 var(--spacing-2) 0;
        font-size: 0.875rem;
        font-weight: 600;
        color: var(--darkgrey);
      }
      
      code {
        display: block;
        background: var(--grey-background);
        padding: var(--spacing-3);
        border-radius: var(--radius-md);
        font-size: 0.8125rem;
        color: var(--color-primary);
        font-family: 'Fira Code', monospace;
        overflow-x: auto;
      }
    }

    // Responsive
    @media (max-width: 768px) {
      .wfx-library__header {
        flex-direction: column;
        gap: var(--spacing-5);
        text-align: center;
      }
      
      .header-content {
        flex-direction: column;
      }
      
      .component-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class WfxLibraryComponent {
  readonly libraryComponents: LibraryComponent[] = [
    // Form Components
    {
      name: 'WfxButton',
      description: 'Wrapper for PrimeNG Button with all properties',
      icon: 'pi pi-stop',
      route: 'button',
      status: 'ready',
      category: 'Form'
    },
    {
      name: 'WfxInput',
      description: 'Text input wrapper component with form integration',
      icon: 'pi pi-pencil',
      route: 'input',
      status: 'ready',
      category: 'Form'
    },
    {
      name: 'WfxSelect',
      description: 'Dropdown select wrapper component',
      icon: 'pi pi-chevron-down',
      route: 'select',
      status: 'ready',
      category: 'Form'
    },
    {
      name: 'WfxDatePicker',
      description: 'Date picker wrapper component',
      icon: 'pi pi-calendar',
      route: 'datepicker',
      status: 'ready',
      category: 'Form'
    },
    {
      name: 'WfxCheckbox',
      description: 'Checkbox wrapper component',
      icon: 'pi pi-check-square',
      route: 'checkbox',
      status: 'ready',
      category: 'Form'
    },
    // Data Display
    {
      name: 'WfxTable',
      description: 'Data table wrapper component',
      icon: 'pi pi-table',
      route: 'table',
      status: 'ready',
      category: 'Data Display'
    },
    {
      name: 'WfxCard',
      description: 'Card container wrapper component',
      icon: 'pi pi-id-card',
      route: 'card',
      status: 'ready',
      category: 'Data Display'
    },
    // Overlay
    {
      name: 'WfxDialog',
      description: 'Modal dialog wrapper component',
      icon: 'pi pi-window-maximize',
      route: 'dialog',
      status: 'ready',
      category: 'Overlay'
    },
    {
      name: 'WfxToast',
      description: 'Toast notification wrapper',
      icon: 'pi pi-bell',
      route: 'toast',
      status: 'ready',
      category: 'Overlay'
    },
  ];

  getCategories(): string[] {
    return [...new Set(this.libraryComponents.map(c => c.category))];
  }

  getComponentsByCategory(category: string): LibraryComponent[] {
    return this.libraryComponents.filter(c => c.category === category);
  }

  getReadyCount(): number {
    return this.libraryComponents.filter(c => c.status === 'ready').length;
  }

  getCategoryIcon(category: string): string {
    const icons: Record<string, string> = {
      'Form': 'pi pi-file-edit',
      'Data Display': 'pi pi-database',
      'Overlay': 'pi pi-clone'
    };
    return icons[category] || 'pi pi-folder';
  }
}

