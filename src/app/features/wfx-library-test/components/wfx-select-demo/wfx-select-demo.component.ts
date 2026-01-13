// ============================================
// WFX Select Demo Component
// Showcase for WfxSelect wrapper component
// ============================================

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { WfxSelect, SelectChangeEvent } from '../../../../wfx-common-library/wfx-select/wfx-select';
import { WfxButton } from '../../../../wfx-common-library/wfx-button/wfx-button';

interface City {
  name: string;
  code: string;
}

interface Country {
  name: string;
  code: string;
}

interface GroupedCity {
  label: string;
  value: string;
  items: City[];
}

@Component({
  selector: 'app-wfx-select-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, WfxSelect, WfxButton],
  template: `
    <div class="wfx-select-demo">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <a routerLink="/wfx-library-test">
          <i class="pi pi-box"></i>
          WFX Library
        </a>
        <i class="pi pi-chevron-right"></i>
        <span>WfxSelect</span>
      </nav>

      <!-- Header -->
      <header class="demo-header">
        <div class="header-content">
          <h1>WfxSelect</h1>
          <p>A wrapper component for PrimeNG Select (Dropdown) with form integration and all properties exposed</p>
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
          <code>import {{ '{' }} WfxSelect {{ '}' }} from 'wfx-common-library/wfx-select';</code>
        </div>
      </section>

      <!-- Basic Select -->
      <section class="demo-section">
        <h2>Basic</h2>
        <p class="section-desc">Basic select with options and two-way data binding.</p>
        <div class="demo-showcase">
          <div class="select-row">
            <wfx-select
              [(ngModel)]="selectedCity"
              [options]="cities"
              optionLabel="name"
              placeholder="Select a City"
            ></wfx-select>
          </div>
          <div class="value-display">
            Selected: <strong>{{ selectedCity?.name || '(none)' }}</strong>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-select [(ngModel)]="selectedCity" [options]="cities" optionLabel="name" placeholder="Select a City"&gt;&lt;/wfx-select&gt;</code>
        </div>
      </section>

      <!-- With Option Value -->
      <section class="demo-section">
        <h2>Option Value</h2>
        <p class="section-desc">Use optionValue to bind a specific property instead of the entire object.</p>
        <div class="demo-showcase">
          <div class="select-row">
            <wfx-select
              [(ngModel)]="selectedCityCode"
              [options]="cities"
              optionLabel="name"
              optionValue="code"
              placeholder="Select a City"
            ></wfx-select>
          </div>
          <div class="value-display">
            Selected Code: <strong>{{ selectedCityCode || '(none)' }}</strong>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-select [(ngModel)]="selectedCode" [options]="cities" optionLabel="name" optionValue="code"&gt;&lt;/wfx-select&gt;</code>
        </div>
      </section>

      <!-- Sizes -->
      <section class="demo-section">
        <h2>Sizes</h2>
        <p class="section-desc">Select components come in small, normal, and large sizes.</p>
        <div class="demo-showcase">
          <div class="select-row align-center">
            <wfx-select
              [(ngModel)]="sizeSmall"
              [options]="cities"
              optionLabel="name"
              size="small"
              placeholder="Small"
            ></wfx-select>
            <wfx-select
              [(ngModel)]="sizeNormal"
              [options]="cities"
              optionLabel="name"
              placeholder="Normal"
            ></wfx-select>
            <wfx-select
              [(ngModel)]="sizeLarge"
              [options]="cities"
              optionLabel="name"
              size="large"
              placeholder="Large"
            ></wfx-select>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-select size="large" [options]="cities" optionLabel="name"&gt;&lt;/wfx-select&gt;</code>
        </div>
      </section>

      <!-- Variants -->
      <section class="demo-section">
        <h2>Variants</h2>
        <p class="section-desc">Different visual styles for select components.</p>
        <div class="demo-showcase">
          <div class="select-row">
            <div class="select-group">
              <label>Outlined (default)</label>
              <wfx-select
                [(ngModel)]="variantOutlined"
                [options]="cities"
                optionLabel="name"
                variant="outlined"
                placeholder="Outlined"
              ></wfx-select>
            </div>
            <div class="select-group">
              <label>Filled</label>
              <wfx-select
                [(ngModel)]="variantFilled"
                [options]="cities"
                optionLabel="name"
                variant="filled"
                placeholder="Filled"
              ></wfx-select>
            </div>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-select variant="filled" [options]="cities" optionLabel="name"&gt;&lt;/wfx-select&gt;</code>
        </div>
      </section>

      <!-- States -->
      <section class="demo-section">
        <h2>States</h2>
        <p class="section-desc">Different states for select components.</p>
        <div class="demo-showcase">
          <div class="select-row">
            <div class="select-group">
              <label>Normal</label>
              <wfx-select
                [(ngModel)]="stateNormal"
                [options]="cities"
                optionLabel="name"
                placeholder="Normal"
              ></wfx-select>
            </div>
            <div class="select-group">
              <label>Disabled</label>
              <wfx-select
                [(ngModel)]="stateDisabled"
                [options]="cities"
                optionLabel="name"
                [disabled]="true"
                placeholder="Disabled"
              ></wfx-select>
            </div>
            <div class="select-group">
              <label>Invalid</label>
              <wfx-select
                [(ngModel)]="stateInvalid"
                [options]="cities"
                optionLabel="name"
                [invalid]="true"
                placeholder="Invalid"
              ></wfx-select>
              <small class="error-text">Please select a city</small>
            </div>
            <div class="select-group">
              <label>Loading</label>
              <wfx-select
                [(ngModel)]="stateLoading"
                [options]="cities"
                optionLabel="name"
                [loading]="true"
                placeholder="Loading..."
              ></wfx-select>
            </div>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-select [disabled]="true" [options]="cities"&gt;&lt;/wfx-select&gt;</code>
        </div>
      </section>

      <!-- Fluid Width -->
      <section class="demo-section">
        <h2>Fluid</h2>
        <p class="section-desc">Fluid selects span the full width of their container.</p>
        <div class="demo-showcase">
          <div class="select-column">
            <wfx-select
              [(ngModel)]="fluidValue"
              [options]="cities"
              optionLabel="name"
              [fluid]="true"
              placeholder="Full width select"
            ></wfx-select>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-select [fluid]="true" [options]="cities" optionLabel="name"&gt;&lt;/wfx-select&gt;</code>
        </div>
      </section>

      <!-- With Filter -->
      <section class="demo-section">
        <h2>Filter</h2>
        <p class="section-desc">Enable filtering to search through options.</p>
        <div class="demo-showcase">
          <div class="select-row">
            <wfx-select
              [(ngModel)]="filterValue"
              [options]="countries"
              optionLabel="name"
              [filter]="true"
              filterPlaceholder="Search country..."
              placeholder="Select a Country"
            ></wfx-select>
          </div>
          <div class="value-display">
            Selected: <strong>{{ filterValue?.name || '(none)' }}</strong>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-select [filter]="true" filterPlaceholder="Search..." [options]="countries"&gt;&lt;/wfx-select&gt;</code>
        </div>
      </section>

      <!-- With Clear Button -->
      <section class="demo-section">
        <h2>Clear Button</h2>
        <p class="section-desc">Show a clear button to reset the selection.</p>
        <div class="demo-showcase">
          <div class="select-row">
            <wfx-select
              [(ngModel)]="clearValue"
              [options]="cities"
              optionLabel="name"
              [showClear]="true"
              placeholder="Select a City"
            ></wfx-select>
          </div>
          <div class="value-display">
            Selected: <strong>{{ clearValue?.name || '(none)' }}</strong>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-select [showClear]="true" [options]="cities" optionLabel="name"&gt;&lt;/wfx-select&gt;</code>
        </div>
      </section>

      <!-- With Checkmark -->
      <section class="demo-section">
        <h2>Checkmark</h2>
        <p class="section-desc">Show a checkmark next to the selected option.</p>
        <div class="demo-showcase">
          <div class="select-row">
            <wfx-select
              [(ngModel)]="checkmarkValue"
              [options]="cities"
              optionLabel="name"
              [checkmark]="true"
              placeholder="Select a City"
            ></wfx-select>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-select [checkmark]="true" [options]="cities" optionLabel="name"&gt;&lt;/wfx-select&gt;</code>
        </div>
      </section>

      <!-- Grouped Options -->
      <section class="demo-section">
        <h2>Grouped</h2>
        <p class="section-desc">Display options in groups.</p>
        <div class="demo-showcase">
          <div class="select-row">
            <wfx-select
              [(ngModel)]="groupedValue"
              [options]="groupedCities"
              [group]="true"
              optionLabel="name"
              optionGroupLabel="label"
              optionGroupChildren="items"
              placeholder="Select a City"
            ></wfx-select>
          </div>
          <div class="value-display">
            Selected: <strong>{{ groupedValue?.name || '(none)' }}</strong>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-select [group]="true" [options]="groupedCities" optionGroupLabel="label" optionGroupChildren="items"&gt;&lt;/wfx-select&gt;</code>
        </div>
      </section>

      <!-- Editable -->
      <section class="demo-section">
        <h2>Editable</h2>
        <p class="section-desc">Allow custom values to be entered.</p>
        <div class="demo-showcase">
          <div class="select-row">
            <wfx-select
              [(ngModel)]="editableValue"
              [options]="cities"
              optionLabel="name"
              [editable]="true"
              placeholder="Select or type a city"
            ></wfx-select>
          </div>
          <div class="value-display">
            Value: <strong>{{ editableValue || '(none)' }}</strong>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-select [editable]="true" [options]="cities" optionLabel="name"&gt;&lt;/wfx-select&gt;</code>
        </div>
      </section>

      <!-- Events Demo -->
      <section class="demo-section">
        <h2>Events</h2>
        <p class="section-desc">Select events: onChange, onFocus, onBlur, onShow, onHide, onClear.</p>
        <div class="demo-showcase">
          <div class="select-row">
            <wfx-select
              [(ngModel)]="eventValue"
              [options]="cities"
              optionLabel="name"
              [showClear]="true"
              placeholder="Select to see events..."
              (onChange)="logEvent('change', $event)"
              (onFocus)="logEvent('focus', $event)"
              (onBlur)="logEvent('blur', $event)"
              (onShow)="logEvent('show', $event)"
              (onHide)="logEvent('hide', $event)"
              (onClear)="logEvent('clear', $event)"
            ></wfx-select>
          </div>
        </div>
        <div class="event-log">
          @if (eventLog().length === 0) {
            <p class="event-log__empty">Interact with the select to see events...</p>
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
                <td><code>options</code></td>
                <td>any[]</td>
                <td>[]</td>
                <td>Array of options to display</td>
              </tr>
              <tr>
                <td><code>optionLabel</code></td>
                <td>string</td>
                <td>-</td>
                <td>Property name for option label</td>
              </tr>
              <tr>
                <td><code>optionValue</code></td>
                <td>string</td>
                <td>-</td>
                <td>Property name for option value</td>
              </tr>
              <tr>
                <td><code>placeholder</code></td>
                <td>string</td>
                <td>-</td>
                <td>Placeholder text</td>
              </tr>
              <tr>
                <td><code>filter</code></td>
                <td>boolean</td>
                <td>false</td>
                <td>Enable filtering</td>
              </tr>
              <tr>
                <td><code>showClear</code></td>
                <td>boolean</td>
                <td>false</td>
                <td>Show clear button</td>
              </tr>
              <tr>
                <td><code>disabled</code></td>
                <td>boolean</td>
                <td>false</td>
                <td>Disable the select</td>
              </tr>
              <tr>
                <td><code>size</code></td>
                <td>small | large</td>
                <td>-</td>
                <td>Size of the select</td>
              </tr>
              <tr>
                <td><code>fluid</code></td>
                <td>boolean</td>
                <td>false</td>
                <td>Full width</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .wfx-select-demo {
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

    .select-row {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-4);
      &.align-center { align-items: center; }
    }

    .select-column {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-4);
    }

    .select-group {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-2);
      label { font-size: 0.875rem; font-weight: 500; color: var(--darkgrey); }
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

    .error-text { color: #dc2626; font-size: 0.75rem; }

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
      &.type-show { background: #fef3c7; color: #92400e; }
      &.type-hide { background: #f3e8ff; color: #6b21a8; }
      &.type-clear { background: #fce7f3; color: #9d174d; }
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
export class WfxSelectDemoComponent {
  // Basic
  selectedCity: City | null = null;
  selectedCityCode: string = '';
  
  // Sizes
  sizeSmall: City | null = null;
  sizeNormal: City | null = null;
  sizeLarge: City | null = null;
  
  // Variants
  variantOutlined: City | null = null;
  variantFilled: City | null = null;
  
  // States
  stateNormal: City | null = null;
  stateDisabled: City | null = { name: 'New York', code: 'NY' };
  stateInvalid: City | null = null;
  stateLoading: City | null = null;
  
  // Features
  fluidValue: City | null = null;
  filterValue: Country | null = null;
  clearValue: City | null = null;
  checkmarkValue: City | null = null;
  groupedValue: City | null = null;
  editableValue: any = null;
  eventValue: City | null = null;

  // Event log
  eventLog = signal<{ time: string; type: string; message: string }[]>([]);

  // Options data
  cities: City[] = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
    { name: 'Tokyo', code: 'TKY' },
    { name: 'Sydney', code: 'SYD' },
    { name: 'Berlin', code: 'BER' }
  ];

  countries: Country[] = [
    { name: 'United States', code: 'US' },
    { name: 'United Kingdom', code: 'UK' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'Italy', code: 'IT' },
    { name: 'Spain', code: 'ES' },
    { name: 'Japan', code: 'JP' },
    { name: 'Australia', code: 'AU' },
    { name: 'Canada', code: 'CA' },
    { name: 'Brazil', code: 'BR' },
    { name: 'India', code: 'IN' },
    { name: 'China', code: 'CN' }
  ];

  groupedCities: GroupedCity[] = [
    {
      label: 'Germany',
      value: 'de',
      items: [
        { name: 'Berlin', code: 'BER' },
        { name: 'Frankfurt', code: 'FRA' },
        { name: 'Munich', code: 'MUN' }
      ]
    },
    {
      label: 'USA',
      value: 'us',
      items: [
        { name: 'Chicago', code: 'CHI' },
        { name: 'Los Angeles', code: 'LA' },
        { name: 'New York', code: 'NY' }
      ]
    },
    {
      label: 'Japan',
      value: 'jp',
      items: [
        { name: 'Kyoto', code: 'KYO' },
        { name: 'Osaka', code: 'OSA' },
        { name: 'Tokyo', code: 'TKY' }
      ]
    }
  ];

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
      message = `Value: ${event.value?.name || 'null'}`;
    } else {
      message = 'Event fired';
    }
    
    this.eventLog.update(log => [{ time, type, message }, ...log].slice(0, 15));
  }

  clearLog(): void {
    this.eventLog.set([]);
  }
}

