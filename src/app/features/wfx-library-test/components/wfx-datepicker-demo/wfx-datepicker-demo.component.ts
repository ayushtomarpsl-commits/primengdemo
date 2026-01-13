// ============================================
// WFX DatePicker Demo Component
// Showcase for WfxDatePicker wrapper component
// ============================================

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { WfxDatePicker } from '../../../../wfx-common-library/wfx-datepicker/wfx-datepicker';
import { WfxButton } from '../../../../wfx-common-library/wfx-button/wfx-button';

@Component({
  selector: 'app-wfx-datepicker-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, WfxDatePicker, WfxButton],
  template: `
    <div class="wfx-datepicker-demo">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <a routerLink="/wfx-library-test">
          <i class="pi pi-box"></i>
          WFX Library
        </a>
        <i class="pi pi-chevron-right"></i>
        <span>WfxDatePicker</span>
      </nav>

      <!-- Header -->
      <header class="demo-header">
        <div class="header-content">
          <h1>WfxDatePicker</h1>
          <p>A wrapper component for PrimeNG DatePicker with form integration and all properties exposed</p>
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
          <code>import {{ '{' }} WfxDatePicker {{ '}' }} from 'wfx-common-library/wfx-datepicker';</code>
        </div>
      </section>

      <!-- Basic DatePicker -->
      <section class="demo-section">
        <h2>Basic</h2>
        <p class="section-desc">Basic date picker with two-way data binding.</p>
        <div class="demo-showcase">
          <div class="picker-row">
            <wfx-datepicker
              [(ngModel)]="basicDate"
              placeholder="Select a Date"
            ></wfx-datepicker>
          </div>
          <div class="value-display">
            Selected: <strong>{{ basicDate | date:'mediumDate' }}</strong>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-datepicker [(ngModel)]="date" placeholder="Select a Date"&gt;&lt;/wfx-datepicker&gt;</code>
        </div>
      </section>

      <!-- With Icon -->
      <section class="demo-section">
        <h2>With Icon</h2>
        <p class="section-desc">Display a calendar icon button next to the input.</p>
        <div class="demo-showcase">
          <div class="picker-row">
            <wfx-datepicker
              [(ngModel)]="iconDate"
              [showIcon]="true"
              placeholder="Select a Date"
            ></wfx-datepicker>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-datepicker [showIcon]="true" placeholder="Select a Date"&gt;&lt;/wfx-datepicker&gt;</code>
        </div>
      </section>

      <!-- Sizes -->
      <section class="demo-section">
        <h2>Sizes</h2>
        <p class="section-desc">DatePicker components come in small, normal, and large sizes.</p>
        <div class="demo-showcase">
          <div class="picker-row align-center">
            <wfx-datepicker
              [(ngModel)]="sizeSmall"
              size="small"
              placeholder="Small"
            ></wfx-datepicker>
            <wfx-datepicker
              [(ngModel)]="sizeNormal"
              placeholder="Normal"
            ></wfx-datepicker>
            <wfx-datepicker
              [(ngModel)]="sizeLarge"
              size="large"
              placeholder="Large"
            ></wfx-datepicker>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-datepicker size="large" placeholder="Large"&gt;&lt;/wfx-datepicker&gt;</code>
        </div>
      </section>

      <!-- Variants -->
      <section class="demo-section">
        <h2>Variants</h2>
        <p class="section-desc">Different visual styles for date picker components.</p>
        <div class="demo-showcase">
          <div class="picker-row">
            <div class="picker-group">
              <label>Outlined (default)</label>
              <wfx-datepicker
                [(ngModel)]="variantOutlined"
                variant="outlined"
                placeholder="Outlined"
              ></wfx-datepicker>
            </div>
            <div class="picker-group">
              <label>Filled</label>
              <wfx-datepicker
                [(ngModel)]="variantFilled"
                variant="filled"
                placeholder="Filled"
              ></wfx-datepicker>
            </div>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-datepicker variant="filled" placeholder="Filled"&gt;&lt;/wfx-datepicker&gt;</code>
        </div>
      </section>

      <!-- States -->
      <section class="demo-section">
        <h2>States</h2>
        <p class="section-desc">Different states for date picker components.</p>
        <div class="demo-showcase">
          <div class="picker-row">
            <div class="picker-group">
              <label>Normal</label>
              <wfx-datepicker
                [(ngModel)]="stateNormal"
                placeholder="Normal"
              ></wfx-datepicker>
            </div>
            <div class="picker-group">
              <label>Disabled</label>
              <wfx-datepicker
                [(ngModel)]="stateDisabled"
                [disabled]="true"
                placeholder="Disabled"
              ></wfx-datepicker>
            </div>
            <div class="picker-group">
              <label>Invalid</label>
              <wfx-datepicker
                [(ngModel)]="stateInvalid"
                [invalid]="true"
                placeholder="Invalid"
              ></wfx-datepicker>
              <small class="error-text">Please select a date</small>
            </div>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-datepicker [disabled]="true"&gt;&lt;/wfx-datepicker&gt;</code>
        </div>
      </section>

      <!-- Date Format -->
      <section class="demo-section">
        <h2>Date Format</h2>
        <p class="section-desc">Customize the date format displayed in the input.</p>
        <div class="demo-showcase">
          <div class="picker-row">
            <div class="picker-group">
              <label>dd/mm/yy</label>
              <wfx-datepicker
                [(ngModel)]="formatDate1"
                dateFormat="dd/mm/yy"
                placeholder="dd/mm/yy"
              ></wfx-datepicker>
            </div>
            <div class="picker-group">
              <label>mm-dd-yy</label>
              <wfx-datepicker
                [(ngModel)]="formatDate2"
                dateFormat="mm-dd-yy"
                placeholder="mm-dd-yy"
              ></wfx-datepicker>
            </div>
            <div class="picker-group">
              <label>yy/mm/dd</label>
              <wfx-datepicker
                [(ngModel)]="formatDate3"
                dateFormat="yy/mm/dd"
                placeholder="yy/mm/dd"
              ></wfx-datepicker>
            </div>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-datepicker dateFormat="dd/mm/yy"&gt;&lt;/wfx-datepicker&gt;</code>
        </div>
      </section>

      <!-- Min/Max Date -->
      <section class="demo-section">
        <h2>Min/Max Date</h2>
        <p class="section-desc">Restrict date selection to a specific range.</p>
        <div class="demo-showcase">
          <div class="picker-row">
            <wfx-datepicker
              [(ngModel)]="minMaxDate"
              [minDate]="minDate"
              [maxDate]="maxDate"
              placeholder="Select within range"
            ></wfx-datepicker>
          </div>
          <div class="value-display">
            Range: <strong>{{ minDate | date:'mediumDate' }} - {{ maxDate | date:'mediumDate' }}</strong>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-datepicker [minDate]="minDate" [maxDate]="maxDate"&gt;&lt;/wfx-datepicker&gt;</code>
        </div>
      </section>

      <!-- Range Selection -->
      <section class="demo-section">
        <h2>Range Selection</h2>
        <p class="section-desc">Select a date range.</p>
        <div class="demo-showcase">
          <div class="picker-row">
            <wfx-datepicker
              [(ngModel)]="rangeDates"
              selectionMode="range"
              placeholder="Select date range"
            ></wfx-datepicker>
          </div>
          <div class="value-display">
            @if (rangeDates && rangeDates.length === 2) {
              Range: <strong>{{ rangeDates[0] | date:'mediumDate' }} - {{ rangeDates[1] | date:'mediumDate' }}</strong>
            } @else {
              Range: <strong>(none)</strong>
            }
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-datepicker selectionMode="range"&gt;&lt;/wfx-datepicker&gt;</code>
        </div>
      </section>

      <!-- Multiple Selection -->
      <section class="demo-section">
        <h2>Multiple Selection</h2>
        <p class="section-desc">Select multiple dates.</p>
        <div class="demo-showcase">
          <div class="picker-row">
            <wfx-datepicker
              [(ngModel)]="multipleDates"
              selectionMode="multiple"
              placeholder="Select multiple dates"
            ></wfx-datepicker>
          </div>
          <div class="value-display">
            Selected: <strong>{{ multipleDates?.length || 0 }} dates</strong>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-datepicker selectionMode="multiple"&gt;&lt;/wfx-datepicker&gt;</code>
        </div>
      </section>

      <!-- With Time -->
      <section class="demo-section">
        <h2>With Time</h2>
        <p class="section-desc">Include time selection.</p>
        <div class="demo-showcase">
          <div class="picker-row">
            <wfx-datepicker
              [(ngModel)]="dateTime"
              [showTime]="true"
              hourFormat="12"
              placeholder="Select date and time"
            ></wfx-datepicker>
          </div>
          <div class="value-display">
            Selected: <strong>{{ dateTime | date:'medium' }}</strong>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-datepicker [showTime]="true" hourFormat="12"&gt;&lt;/wfx-datepicker&gt;</code>
        </div>
      </section>

      <!-- Time Only -->
      <section class="demo-section">
        <h2>Time Only</h2>
        <p class="section-desc">Display only time picker.</p>
        <div class="demo-showcase">
          <div class="picker-row">
            <wfx-datepicker
              [(ngModel)]="timeOnly"
              [timeOnly]="true"
              placeholder="Select time"
            ></wfx-datepicker>
          </div>
          <div class="value-display">
            Selected: <strong>{{ timeOnly | date:'shortTime' }}</strong>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-datepicker [timeOnly]="true"&gt;&lt;/wfx-datepicker&gt;</code>
        </div>
      </section>

      <!-- Month Picker -->
      <section class="demo-section">
        <h2>Month Picker</h2>
        <p class="section-desc">Select only month and year.</p>
        <div class="demo-showcase">
          <div class="picker-row">
            <wfx-datepicker
              [(ngModel)]="monthDate"
              view="month"
              dateFormat="mm/yy"
              placeholder="Select month"
            ></wfx-datepicker>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-datepicker view="month" dateFormat="mm/yy"&gt;&lt;/wfx-datepicker&gt;</code>
        </div>
      </section>

      <!-- Year Picker -->
      <section class="demo-section">
        <h2>Year Picker</h2>
        <p class="section-desc">Select only year.</p>
        <div class="demo-showcase">
          <div class="picker-row">
            <wfx-datepicker
              [(ngModel)]="yearDate"
              view="year"
              dateFormat="yy"
              placeholder="Select year"
            ></wfx-datepicker>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-datepicker view="year" dateFormat="yy"&gt;&lt;/wfx-datepicker&gt;</code>
        </div>
      </section>

      <!-- Button Bar -->
      <section class="demo-section">
        <h2>Button Bar</h2>
        <p class="section-desc">Show Today and Clear buttons.</p>
        <div class="demo-showcase">
          <div class="picker-row">
            <wfx-datepicker
              [(ngModel)]="buttonBarDate"
              [showButtonBar]="true"
              [showClear]="true"
              placeholder="With button bar"
            ></wfx-datepicker>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-datepicker [showButtonBar]="true" [showClear]="true"&gt;&lt;/wfx-datepicker&gt;</code>
        </div>
      </section>

      <!-- Inline -->
      <section class="demo-section">
        <h2>Inline</h2>
        <p class="section-desc">Display calendar inline without input.</p>
        <div class="demo-showcase">
          <div class="picker-row">
            <wfx-datepicker
              [(ngModel)]="inlineDate"
              [inline]="true"
            ></wfx-datepicker>
          </div>
          <div class="value-display">
            Selected: <strong>{{ inlineDate | date:'mediumDate' }}</strong>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-datepicker [inline]="true"&gt;&lt;/wfx-datepicker&gt;</code>
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
                <td><code>dateFormat</code></td>
                <td>string</td>
                <td>mm/dd/yy</td>
                <td>Format of the date</td>
              </tr>
              <tr>
                <td><code>selectionMode</code></td>
                <td>single | multiple | range</td>
                <td>single</td>
                <td>Selection mode</td>
              </tr>
              <tr>
                <td><code>showIcon</code></td>
                <td>boolean</td>
                <td>false</td>
                <td>Show calendar icon</td>
              </tr>
              <tr>
                <td><code>showTime</code></td>
                <td>boolean</td>
                <td>false</td>
                <td>Include time picker</td>
              </tr>
              <tr>
                <td><code>timeOnly</code></td>
                <td>boolean</td>
                <td>false</td>
                <td>Show only time picker</td>
              </tr>
              <tr>
                <td><code>minDate</code></td>
                <td>Date</td>
                <td>-</td>
                <td>Minimum selectable date</td>
              </tr>
              <tr>
                <td><code>maxDate</code></td>
                <td>Date</td>
                <td>-</td>
                <td>Maximum selectable date</td>
              </tr>
              <tr>
                <td><code>view</code></td>
                <td>date | month | year</td>
                <td>date</td>
                <td>Type of view</td>
              </tr>
              <tr>
                <td><code>inline</code></td>
                <td>boolean</td>
                <td>false</td>
                <td>Display inline</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .wfx-datepicker-demo {
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

    .picker-row {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-4);
      &.align-center { align-items: center; }
    }

    .picker-group {
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
export class WfxDatePickerDemoComponent {
  // Basic
  basicDate: Date | null = null;
  iconDate: Date | null = null;
  
  // Sizes
  sizeSmall: Date | null = null;
  sizeNormal: Date | null = null;
  sizeLarge: Date | null = null;
  
  // Variants
  variantOutlined: Date | null = null;
  variantFilled: Date | null = null;
  
  // States
  stateNormal: Date | null = null;
  stateDisabled: Date | null = new Date();
  stateInvalid: Date | null = null;
  
  // Formats
  formatDate1: Date | null = null;
  formatDate2: Date | null = null;
  formatDate3: Date | null = null;
  
  // Min/Max
  minDate: Date = new Date();
  maxDate: Date = new Date(new Date().setMonth(new Date().getMonth() + 3));
  minMaxDate: Date | null = null;
  
  // Selection modes
  rangeDates: Date[] | null = null;
  multipleDates: Date[] | null = null;
  
  // Time
  dateTime: Date | null = null;
  timeOnly: Date | null = null;
  
  // Views
  monthDate: Date | null = null;
  yearDate: Date | null = null;
  
  // Features
  buttonBarDate: Date | null = null;
  inlineDate: Date | null = null;
}

