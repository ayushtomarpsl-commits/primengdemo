// ============================================
// WFX Checkbox Demo Component
// Showcase for WfxCheckbox wrapper component
// ============================================

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { WfxCheckbox, CheckboxChangeEvent } from '../../../../wfx-common-library/wfx-checkbox/wfx-checkbox';
import { WfxButton } from '../../../../wfx-common-library/wfx-button/wfx-button';

@Component({
  selector: 'app-wfx-checkbox-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, WfxCheckbox, WfxButton],
  template: `
    <div class="wfx-checkbox-demo">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <a routerLink="/wfx-library-test">
          <i class="pi pi-box"></i>
          WFX Library
        </a>
        <i class="pi pi-chevron-right"></i>
        <span>WfxCheckbox</span>
      </nav>

      <!-- Header -->
      <header class="demo-header">
        <div class="header-content">
          <h1>WfxCheckbox</h1>
          <p>A wrapper component for PrimeNG Checkbox with form integration and all properties exposed</p>
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
          <code>import {{ '{' }} WfxCheckbox {{ '}' }} from 'wfx-common-library/wfx-checkbox';</code>
        </div>
      </section>

      <!-- Basic Checkbox -->
      <section class="demo-section">
        <h2>Basic</h2>
        <p class="section-desc">Basic checkbox with binary mode (true/false).</p>
        <div class="demo-showcase">
          <div class="checkbox-row">
            <wfx-checkbox
              [(ngModel)]="basicChecked"
              [binary]="true"
              inputId="basic"
            ></wfx-checkbox>
            <label for="basic">Accept Terms and Conditions</label>
          </div>
          <div class="value-display">
            Value: <strong>{{ basicChecked }}</strong>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-checkbox [(ngModel)]="checked" [binary]="true" inputId="basic"&gt;&lt;/wfx-checkbox&gt;
&lt;label for="basic"&gt;Accept Terms&lt;/label&gt;</code>
        </div>
      </section>

      <!-- Sizes -->
      <section class="demo-section">
        <h2>Sizes</h2>
        <p class="section-desc">Checkbox components come in small, normal, and large sizes.</p>
        <div class="demo-showcase">
          <div class="checkbox-row">
            <wfx-checkbox
              [(ngModel)]="sizeSmall"
              [binary]="true"
              size="small"
              inputId="small"
            ></wfx-checkbox>
            <label for="small">Small</label>
          </div>
          <div class="checkbox-row">
            <wfx-checkbox
              [(ngModel)]="sizeNormal"
              [binary]="true"
              inputId="normal"
            ></wfx-checkbox>
            <label for="normal">Normal</label>
          </div>
          <div class="checkbox-row">
            <wfx-checkbox
              [(ngModel)]="sizeLarge"
              [binary]="true"
              size="large"
              inputId="large"
            ></wfx-checkbox>
            <label for="large">Large</label>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-checkbox size="large" [binary]="true"&gt;&lt;/wfx-checkbox&gt;</code>
        </div>
      </section>

      <!-- Variants -->
      <section class="demo-section">
        <h2>Variants</h2>
        <p class="section-desc">Different visual styles for checkbox components.</p>
        <div class="demo-showcase">
          <div class="checkbox-row">
            <wfx-checkbox
              [(ngModel)]="variantOutlined"
              [binary]="true"
              variant="outlined"
              inputId="outlined"
            ></wfx-checkbox>
            <label for="outlined">Outlined</label>
          </div>
          <div class="checkbox-row">
            <wfx-checkbox
              [(ngModel)]="variantFilled"
              [binary]="true"
              variant="filled"
              inputId="filled"
            ></wfx-checkbox>
            <label for="filled">Filled</label>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-checkbox variant="filled" [binary]="true"&gt;&lt;/wfx-checkbox&gt;</code>
        </div>
      </section>

      <!-- States -->
      <section class="demo-section">
        <h2>States</h2>
        <p class="section-desc">Different states for checkbox components.</p>
        <div class="demo-showcase">
          <div class="checkbox-row">
            <wfx-checkbox
              [(ngModel)]="stateNormal"
              [binary]="true"
              inputId="stateNormal"
            ></wfx-checkbox>
            <label for="stateNormal">Normal</label>
          </div>
          <div class="checkbox-row">
            <wfx-checkbox
              [(ngModel)]="stateDisabled"
              [binary]="true"
              [disabled]="true"
              inputId="stateDisabled"
            ></wfx-checkbox>
            <label for="stateDisabled" class="disabled">Disabled</label>
          </div>
          <div class="checkbox-row">
            <wfx-checkbox
              [(ngModel)]="stateInvalid"
              [binary]="true"
              [invalid]="true"
              inputId="stateInvalid"
            ></wfx-checkbox>
            <label for="stateInvalid">Invalid</label>
            <small class="error-text">This field is required</small>
          </div>
          <div class="checkbox-row">
            <wfx-checkbox
              [(ngModel)]="stateReadonly"
              [binary]="true"
              [readonly]="true"
              inputId="stateReadonly"
            ></wfx-checkbox>
            <label for="stateReadonly">Readonly</label>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-checkbox [disabled]="true" [binary]="true"&gt;&lt;/wfx-checkbox&gt;</code>
        </div>
      </section>

      <!-- Indeterminate -->
      <section class="demo-section">
        <h2>Indeterminate</h2>
        <p class="section-desc">Display an indeterminate state for partial selection.</p>
        <div class="demo-showcase">
          <div class="checkbox-row">
            <wfx-checkbox
              [(ngModel)]="indeterminateValue"
              [binary]="true"
              [indeterminate]="isIndeterminate"
              inputId="indeterminate"
            ></wfx-checkbox>
            <label for="indeterminate">Select All ({{ getSelectedCount() }}/{{ items.length }} selected)</label>
          </div>
          <div class="checkbox-group">
            @for (item of items; track item.id) {
              <div class="checkbox-row">
                <wfx-checkbox
                  [(ngModel)]="item.checked"
                  [binary]="true"
                  [inputId]="'item-' + item.id"
                  (onChange)="updateIndeterminate()"
                ></wfx-checkbox>
                <label [for]="'item-' + item.id">{{ item.name }}</label>
              </div>
            }
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-checkbox [indeterminate]="isIndeterminate" [binary]="true"&gt;&lt;/wfx-checkbox&gt;</code>
        </div>
      </section>

      <!-- Multiple Values -->
      <section class="demo-section">
        <h2>Multiple Values</h2>
        <p class="section-desc">Use checkboxes to select multiple values from a list.</p>
        <div class="demo-showcase">
          <div class="checkbox-group">
            @for (city of cities; track city) {
              <div class="checkbox-row">
                <wfx-checkbox
                  [(ngModel)]="selectedCities"
                  [value]="city"
                  [inputId]="'city-' + city"
                ></wfx-checkbox>
                <label [for]="'city-' + city">{{ city }}</label>
              </div>
            }
          </div>
          <div class="value-display">
            Selected: <strong>{{ selectedCities.length > 0 ? selectedCities.join(', ') : '(none)' }}</strong>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-checkbox [(ngModel)]="selectedCities" [value]="'New York'"&gt;&lt;/wfx-checkbox&gt;</code>
        </div>
      </section>

      <!-- Custom True/False Values -->
      <section class="demo-section">
        <h2>Custom True/False Values</h2>
        <p class="section-desc">Use custom values instead of boolean true/false.</p>
        <div class="demo-showcase">
          <div class="checkbox-row">
            <wfx-checkbox
              [(ngModel)]="customValue"
              [binary]="true"
              trueValue="YES"
              falseValue="NO"
              inputId="customTrueFalse"
            ></wfx-checkbox>
            <label for="customTrueFalse">Subscribe to newsletter</label>
          </div>
          <div class="value-display">
            Value: <strong>{{ customValue }}</strong>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-checkbox [binary]="true" trueValue="YES" falseValue="NO"&gt;&lt;/wfx-checkbox&gt;</code>
        </div>
      </section>

      <!-- Events Demo -->
      <section class="demo-section">
        <h2>Events</h2>
        <p class="section-desc">Checkbox events: onChange, onFocus, onBlur.</p>
        <div class="demo-showcase">
          <div class="checkbox-row">
            <wfx-checkbox
              [(ngModel)]="eventValue"
              [binary]="true"
              inputId="events"
              (onChange)="logEvent('change', $event)"
              (onFocus)="logEvent('focus', $event)"
              (onBlur)="logEvent('blur', $event)"
            ></wfx-checkbox>
            <label for="events">Click to see events</label>
          </div>
        </div>
        <div class="event-log">
          @if (eventLog().length === 0) {
            <p class="event-log__empty">Interact with the checkbox to see events...</p>
          } @else {
            @for (event of eventLog(); track $index) {
              <div class="event-log__item">
                <span class="event-log__time">{{ event.time }}</span>
                <span class="event-log__type" [class]="'type-' + event.type">{{ event.type }}</span>
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
                <td><code>binary</code></td>
                <td>boolean</td>
                <td>false</td>
                <td>Use boolean value instead of array</td>
              </tr>
              <tr>
                <td><code>value</code></td>
                <td>any</td>
                <td>-</td>
                <td>Value of the checkbox for multi-select</td>
              </tr>
              <tr>
                <td><code>indeterminate</code></td>
                <td>boolean</td>
                <td>false</td>
                <td>Show indeterminate state</td>
              </tr>
              <tr>
                <td><code>trueValue</code></td>
                <td>any</td>
                <td>true</td>
                <td>Value when checked</td>
              </tr>
              <tr>
                <td><code>falseValue</code></td>
                <td>any</td>
                <td>false</td>
                <td>Value when unchecked</td>
              </tr>
              <tr>
                <td><code>disabled</code></td>
                <td>boolean</td>
                <td>false</td>
                <td>Disable the checkbox</td>
              </tr>
              <tr>
                <td><code>size</code></td>
                <td>small | large</td>
                <td>-</td>
                <td>Size of the checkbox</td>
              </tr>
              <tr>
                <td><code>variant</code></td>
                <td>outlined | filled</td>
                <td>-</td>
                <td>Visual variant</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .wfx-checkbox-demo {
      max-width: 1000px;
      margin: 0 auto;
    }

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
        &:hover { text-decoration: underline; }
      }
      
      span { color: var(--grey); }
      .pi-chevron-right { font-size: 0.75rem; color: var(--grey); }
    }

    .demo-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: var(--spacing-8);
      padding-bottom: var(--spacing-6);
      border-bottom: 1px solid var(--greyborder);
      
      h1 { margin: 0 0 var(--spacing-2) 0; font-size: 2rem; font-weight: 700; color: var(--darkgrey); }
      p { margin: 0; color: var(--grey); max-width: 500px; }
    }

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
        i { color: var(--color-primary); }
      }
      
      .section-desc { color: var(--grey); margin: 0 0 var(--spacing-4) 0; font-size: 0.875rem; }
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
      code { color: #9cdcfe; font-family: 'Fira Code', monospace; font-size: 0.8125rem; white-space: pre; }
    }

    .checkbox-row {
      display: flex;
      align-items: center;
      gap: var(--spacing-3);
      margin-bottom: var(--spacing-3);
      
      &:last-child { margin-bottom: 0; }
      
      label {
        cursor: pointer;
        color: var(--darkgrey);
        font-size: 0.875rem;
        
        &.disabled {
          cursor: not-allowed;
          color: var(--grey);
        }
      }
    }

    .checkbox-group {
      margin-top: var(--spacing-4);
      padding-left: var(--spacing-6);
      border-left: 2px solid var(--greyborder);
    }

    .value-display {
      margin-top: var(--spacing-4);
      padding: var(--spacing-3);
      background: var(--grey-background);
      border-radius: var(--radius-md);
      font-size: 0.875rem;
      color: var(--grey);
      strong { color: var(--darkgrey); }
    }

    .error-text { color: #dc2626; font-size: 0.75rem; margin-left: auto; }

    .event-log {
      background: var(--grey-background);
      border: 1px solid var(--greyborder);
      border-radius: var(--radius-md);
      padding: var(--spacing-4);
      margin: var(--spacing-4) 0;
      max-height: 200px;
      overflow-y: auto;
    }

    .event-log__empty { color: var(--grey); font-style: italic; margin: 0; text-align: center; padding: var(--spacing-4); }

    .event-log__item {
      display: flex;
      gap: var(--spacing-3);
      padding: var(--spacing-2) 0;
      border-bottom: 1px solid var(--greyborder);
      align-items: center;
      &:last-child { border-bottom: none; }
    }

    .event-log__time { font-size: 0.75rem; color: var(--grey); font-family: monospace; white-space: nowrap; }

    .event-log__type {
      font-size: 0.625rem;
      font-weight: 600;
      text-transform: uppercase;
      padding: 2px 8px;
      border-radius: var(--radius-full);
      
      &.type-change { background: #dbeafe; color: #1e40af; }
      &.type-focus { background: #dcfce7; color: #166534; }
      &.type-blur { background: #fee2e2; color: #991b1b; }
    }

    .event-log__message { font-size: 0.875rem; color: var(--darkgrey); }

    .api-section {
      background: var(--surface-card);
      border: 1px solid var(--greyborder);
      border-radius: var(--radius-lg);
      padding: var(--spacing-6);
    }

    .api-table-wrapper { overflow-x: auto; }

    .api-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
      
      th, td {
        text-align: left;
        padding: var(--spacing-3) var(--spacing-4);
        border-bottom: 1px solid var(--greyborder);
      }
      
      th { background: var(--grey-background); font-weight: 600; color: var(--darkgrey); }
      
      td {
        color: var(--grey);
        code { background: var(--grey-background); padding: 2px 6px; border-radius: var(--radius-sm); font-size: 0.8125rem; color: var(--color-primary); }
      }
    }
  `]
})
export class WfxCheckboxDemoComponent {
  // Basic
  basicChecked: boolean = false;
  
  // Sizes
  sizeSmall: boolean = false;
  sizeNormal: boolean = false;
  sizeLarge: boolean = false;
  
  // Variants
  variantOutlined: boolean = false;
  variantFilled: boolean = false;
  
  // States
  stateNormal: boolean = false;
  stateDisabled: boolean = true;
  stateInvalid: boolean = false;
  stateReadonly: boolean = true;
  
  // Indeterminate
  indeterminateValue: boolean = false;
  isIndeterminate: boolean = true;
  items = [
    { id: 1, name: 'Item 1', checked: false },
    { id: 2, name: 'Item 2', checked: true },
    { id: 3, name: 'Item 3', checked: false },
    { id: 4, name: 'Item 4', checked: true }
  ];
  
  // Multiple values
  cities = ['New York', 'Rome', 'London', 'Paris', 'Tokyo'];
  selectedCities: string[] = [];
  
  // Custom values
  customValue: string = 'NO';
  
  // Events
  eventValue: boolean = false;
  eventLog = signal<{ time: string; type: string; message: string }[]>([]);

  getSelectedCount(): number {
    return this.items.filter(item => item.checked).length;
  }

  updateIndeterminate(): void {
    const checkedCount = this.getSelectedCount();
    this.isIndeterminate = checkedCount > 0 && checkedCount < this.items.length;
    this.indeterminateValue = checkedCount === this.items.length;
  }

  logEvent(type: string, event: any): void {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
    
    let message = '';
    if (type === 'change') {
      message = `Checked: ${event.checked}`;
    } else {
      message = 'Event fired';
    }
    
    this.eventLog.update(log => [{ time, type, message }, ...log].slice(0, 15));
  }

  clearLog(): void {
    this.eventLog.set([]);
  }
}

