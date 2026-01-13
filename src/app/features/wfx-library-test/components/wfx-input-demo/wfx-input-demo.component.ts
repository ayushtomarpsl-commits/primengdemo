// ============================================
// WFX Input Demo Component
// Showcase for WfxInput wrapper component
// ============================================

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { WfxInput } from '../../../../wfx-common-library/wfx-input/wfx-input';
import { WfxButton } from '../../../../wfx-common-library/wfx-button/wfx-button';

@Component({
  selector: 'app-wfx-input-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, WfxInput, WfxButton],
  template: `
    <div class="wfx-input-demo">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <a routerLink="/wfx-library-test">
          <i class="pi pi-box"></i>
          WFX Library
        </a>
        <i class="pi pi-chevron-right"></i>
        <span>WfxInput</span>
      </nav>

      <!-- Header -->
      <header class="demo-header">
        <div class="header-content">
          <h1>WfxInput</h1>
          <p>A wrapper component for PrimeNG InputText with form integration and all properties exposed</p>
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
          <code>import {{ '{' }} WfxInput {{ '}' }} from 'wfx-common-library/wfx-input';</code>
        </div>
      </section>

      <!-- Basic Input -->
      <section class="demo-section">
        <h2>Basic</h2>
        <p class="section-desc">Basic text input with two-way data binding using ngModel.</p>
        <div class="demo-showcase">
          <div class="input-row">
            <wfx-input 
              [(ngModel)]="basicValue" 
              placeholder="Enter your name"
            ></wfx-input>
          </div>
          <div class="value-display">
            Value: <strong>{{ basicValue || '(empty)' }}</strong>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-input [(ngModel)]="value" placeholder="Enter your name"&gt;&lt;/wfx-input&gt;</code>
        </div>
      </section>

      <!-- Input Types -->
      <section class="demo-section">
        <h2>Types</h2>
        <p class="section-desc">Different input types for various data formats.</p>
        <div class="demo-showcase">
          <div class="input-grid">
            <div class="input-group">
              <label>Text</label>
              <wfx-input 
                [(ngModel)]="textValue" 
                type="text" 
                placeholder="Text input"
              ></wfx-input>
            </div>
            <div class="input-group">
              <label>Email</label>
              <wfx-input 
                [(ngModel)]="emailValue" 
                type="email" 
                placeholder="email@example.com"
              ></wfx-input>
            </div>
            <div class="input-group">
              <label>Password</label>
              <wfx-input 
                [(ngModel)]="passwordValue" 
                type="password" 
                placeholder="Enter password"
              ></wfx-input>
            </div>
            <div class="input-group">
              <label>Number</label>
              <wfx-input 
                [(ngModel)]="numberValue" 
                type="number" 
                placeholder="Enter number"
              ></wfx-input>
            </div>
            <div class="input-group">
              <label>Tel</label>
              <wfx-input 
                [(ngModel)]="telValue" 
                type="tel" 
                placeholder="+1 (555) 000-0000"
              ></wfx-input>
            </div>
            <div class="input-group">
              <label>Search</label>
              <wfx-input 
                [(ngModel)]="searchValue" 
                type="search" 
                placeholder="Search..."
              ></wfx-input>
            </div>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-input type="email" placeholder="email@example.com"&gt;&lt;/wfx-input&gt;</code>
        </div>
      </section>

      <!-- Sizes -->
      <section class="demo-section">
        <h2>Sizes</h2>
        <p class="section-desc">Input fields come in small, normal, and large sizes.</p>
        <div class="demo-showcase">
          <div class="input-row align-center">
            <wfx-input 
              [(ngModel)]="sizeSmall" 
              pSize="small" 
              placeholder="Small"
            ></wfx-input>
            <wfx-input 
              [(ngModel)]="sizeNormal" 
              placeholder="Normal"
            ></wfx-input>
            <wfx-input 
              [(ngModel)]="sizeLarge" 
              pSize="large" 
              placeholder="Large"
            ></wfx-input>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-input pSize="large" placeholder="Large input"&gt;&lt;/wfx-input&gt;</code>
        </div>
      </section>

      <!-- Variants -->
      <section class="demo-section">
        <h2>Variants</h2>
        <p class="section-desc">Different visual styles for input fields.</p>
        <div class="demo-showcase">
          <div class="input-row">
            <div class="input-group">
              <label>Outlined (default)</label>
              <wfx-input 
                [(ngModel)]="outlinedValue" 
                variant="outlined" 
                placeholder="Outlined"
              ></wfx-input>
            </div>
            <div class="input-group">
              <label>Filled</label>
              <wfx-input 
                [(ngModel)]="filledValue" 
                variant="filled" 
                placeholder="Filled"
              ></wfx-input>
            </div>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-input variant="filled" placeholder="Filled style"&gt;&lt;/wfx-input&gt;</code>
        </div>
      </section>

      <!-- States -->
      <section class="demo-section">
        <h2>States</h2>
        <p class="section-desc">Different states for input fields.</p>
        <div class="demo-showcase">
          <div class="input-row">
            <div class="input-group">
              <label>Normal</label>
              <wfx-input 
                [(ngModel)]="normalState" 
                placeholder="Normal input"
              ></wfx-input>
            </div>
            <div class="input-group">
              <label>Disabled</label>
              <wfx-input 
                [(ngModel)]="disabledState" 
                [disabled]="true" 
                placeholder="Disabled input"
              ></wfx-input>
            </div>
            <div class="input-group">
              <label>Read Only</label>
              <wfx-input 
                [(ngModel)]="readonlyState" 
                [readonly]="true" 
                placeholder="Read only"
              ></wfx-input>
            </div>
            <div class="input-group">
              <label>Invalid</label>
              <wfx-input 
                [(ngModel)]="invalidState" 
                [invalid]="true" 
                placeholder="Invalid input"
              ></wfx-input>
              <small class="error-text">This field has an error</small>
            </div>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-input [disabled]="true" placeholder="Disabled"&gt;&lt;/wfx-input&gt;</code>
        </div>
      </section>

      <!-- Fluid Width -->
      <section class="demo-section">
        <h2>Fluid</h2>
        <p class="section-desc">Fluid inputs span the full width of their container.</p>
        <div class="demo-showcase">
          <div class="input-column">
            <wfx-input 
              [(ngModel)]="fluidValue1" 
              [fluid]="true" 
              placeholder="Full width input"
            ></wfx-input>
            <wfx-input 
              [(ngModel)]="fluidValue2" 
              [fluid]="true" 
              pSize="large"
              placeholder="Full width large input"
            ></wfx-input>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-input [fluid]="true" placeholder="Full width"&gt;&lt;/wfx-input&gt;</code>
        </div>
      </section>

      <!-- With Icons (using wrapper) -->
      <section class="demo-section">
        <h2>With Icons</h2>
        <p class="section-desc">Input fields can be combined with icons using a wrapper.</p>
        <div class="demo-showcase">
          <div class="input-row">
            <div class="input-group">
              <label>Left Icon</label>
              <div class="input-icon-wrapper left">
                <i class="pi pi-search"></i>
                <wfx-input 
                  [(ngModel)]="iconLeftValue" 
                  placeholder="Search..."
                  styleClass="with-icon-left"
                ></wfx-input>
              </div>
            </div>
            <div class="input-group">
              <label>Right Icon</label>
              <div class="input-icon-wrapper right">
                <wfx-input 
                  [(ngModel)]="iconRightValue" 
                  placeholder="Email"
                  styleClass="with-icon-right"
                ></wfx-input>
                <i class="pi pi-envelope"></i>
              </div>
            </div>
            <div class="input-group">
              <label>Both Icons</label>
              <div class="input-icon-wrapper both">
                <i class="pi pi-user"></i>
                <wfx-input 
                  [(ngModel)]="iconBothValue" 
                  placeholder="Username"
                  styleClass="with-icon-both"
                ></wfx-input>
                <i class="pi pi-check"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;div class="input-icon-wrapper"&gt;&lt;i class="pi pi-search"&gt;&lt;/i&gt;&lt;wfx-input&gt;&lt;/wfx-input&gt;&lt;/div&gt;</code>
        </div>
      </section>

      <!-- Validation -->
      <section class="demo-section">
        <h2>Validation</h2>
        <p class="section-desc">Input validation with required, minlength, and pattern.</p>
        <div class="demo-showcase">
          <div class="input-row">
            <div class="input-group">
              <label>Required Field *</label>
              <wfx-input 
                [(ngModel)]="requiredValue" 
                [required]="true"
                [invalid]="!requiredValue"
                placeholder="This field is required"
              ></wfx-input>
              @if (!requiredValue) {
                <small class="error-text">This field is required</small>
              }
            </div>
            <div class="input-group">
              <label>Min Length (5)</label>
              <wfx-input 
                [(ngModel)]="minLengthValue" 
                [minlength]="5"
                [invalid]="minLengthValue.length > 0 && minLengthValue.length < 5"
                placeholder="At least 5 characters"
              ></wfx-input>
              @if (minLengthValue.length > 0 && minLengthValue.length < 5) {
                <small class="error-text">Minimum 5 characters required</small>
              }
            </div>
            <div class="input-group">
              <label>Max Length (10)</label>
              <wfx-input 
                [(ngModel)]="maxLengthValue" 
                [maxlength]="10"
                placeholder="Max 10 characters"
              ></wfx-input>
              <small class="helper-text">{{ maxLengthValue.length }}/10 characters</small>
            </div>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-input [required]="true" [minlength]="5" [maxlength]="10"&gt;&lt;/wfx-input&gt;</code>
        </div>
      </section>

      <!-- With PT Styling -->
      <section class="demo-section">
        <h2>Pass Through (PT)</h2>
        <p class="section-desc">Use PT to customize DOM elements and apply custom styles.</p>
        <div class="demo-showcase">
          <div class="input-row">
            <wfx-input 
              [(ngModel)]="ptValue1" 
              placeholder="Custom border color"
              [pt]="{
                root: { 
                  style: { 
                    borderColor: '#00d1cf',
                    borderWidth: '2px'
                  } 
                }
              }"
            ></wfx-input>
            <wfx-input 
              [(ngModel)]="ptValue2" 
              placeholder="Custom background"
              [pt]="{
                root: { 
                  style: { 
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                    borderRadius: '20px',
                    padding: '12px 20px'
                  } 
                }
              }"
            ></wfx-input>
            <wfx-input 
              [(ngModel)]="ptValue3" 
              placeholder="Neon style"
              [pt]="{
                root: { 
                  style: { 
                    background: '#1a1a2e',
                    border: '2px solid #00ff88',
                    color: '#00ff88',
                    boxShadow: '0 0 10px rgba(0, 255, 136, 0.3)'
                  } 
                }
              }"
            ></wfx-input>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-input [pt]="{{ '{' }} root: {{ '{' }} style: {{ '{' }} borderColor: '#00d1cf' {{ '}' }} {{ '}' }} {{ '}' }}"&gt;&lt;/wfx-input&gt;</code>
        </div>
      </section>

      <!-- Events Demo -->
      <section class="demo-section">
        <h2>Events</h2>
        <p class="section-desc">Input events: onInput, onFocus, onBlur, onKeyDown, onKeyUp.</p>
        <div class="demo-showcase">
          <div class="input-row">
            <wfx-input 
              [(ngModel)]="eventValue" 
              placeholder="Type to see events..."
              [fluid]="true"
              (onInput)="logEvent('input', $event)"
              (onFocus)="logEvent('focus', $event)"
              (onBlur)="logEvent('blur', $event)"
              (onKeyDown)="logEvent('keydown', $event)"
            ></wfx-input>
          </div>
        </div>
        <div class="event-log">
          @if (eventLog().length === 0) {
            <p class="event-log__empty">Interact with the input to see events...</p>
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
                <td><code>type</code></td>
                <td>text | password | email | number | tel | search</td>
                <td>text</td>
                <td>Type of the input element</td>
              </tr>
              <tr>
                <td><code>placeholder</code></td>
                <td>string</td>
                <td>-</td>
                <td>Placeholder text</td>
              </tr>
              <tr>
                <td><code>disabled</code></td>
                <td>boolean</td>
                <td>false</td>
                <td>Disables the input</td>
              </tr>
              <tr>
                <td><code>readonly</code></td>
                <td>boolean</td>
                <td>false</td>
                <td>Makes input read-only</td>
              </tr>
              <tr>
                <td><code>invalid</code></td>
                <td>boolean</td>
                <td>false</td>
                <td>Invalid state style</td>
              </tr>
              <tr>
                <td><code>pSize</code></td>
                <td>small | large</td>
                <td>-</td>
                <td>Size of the input</td>
              </tr>
              <tr>
                <td><code>variant</code></td>
                <td>outlined | filled</td>
                <td>outlined</td>
                <td>Visual variant</td>
              </tr>
              <tr>
                <td><code>fluid</code></td>
                <td>boolean</td>
                <td>false</td>
                <td>Full width</td>
              </tr>
              <tr>
                <td><code>pt</code></td>
                <td>object</td>
                <td>-</td>
                <td>Pass through options</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .wfx-input-demo {
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

    .input-row {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-4);
      
      &.align-center {
        align-items: center;
      }
    }

    .input-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: var(--spacing-4);
    }

    .input-column {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-4);
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-2);
      
      label {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--darkgrey);
      }
    }

    .value-display {
      margin-top: var(--spacing-4);
      padding: var(--spacing-3);
      background: var(--grey-background);
      border-radius: var(--radius-md);
      font-size: 0.875rem;
      color: var(--grey);
      
      strong {
        color: var(--darkgrey);
      }
    }

    .error-text {
      color: #dc2626;
      font-size: 0.75rem;
    }

    .helper-text {
      color: var(--grey);
      font-size: 0.75rem;
    }

    // Icon wrapper styles
    .input-icon-wrapper {
      position: relative;
      display: inline-flex;
      align-items: center;
      
      i {
        position: absolute;
        color: var(--grey);
        z-index: 1;
      }
      
      &.left i {
        left: 12px;
      }
      
      &.right i {
        right: 12px;
      }
      
      &.both i:first-child {
        left: 12px;
      }
      
      &.both i:last-child {
        right: 12px;
      }
    }

    :host ::ng-deep {
      .with-icon-left {
        padding-left: 36px !important;
      }
      
      .with-icon-right {
        padding-right: 36px !important;
      }
      
      .with-icon-both {
        padding-left: 36px !important;
        padding-right: 36px !important;
      }
    }

    // Event Log
    .event-log {
      background: var(--grey-background);
      border: 1px solid var(--greyborder);
      border-radius: var(--radius-md);
      padding: var(--spacing-4);
      margin: var(--spacing-4) 0;
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
      align-items: center;
      
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

    .event-log__type {
      font-size: 0.625rem;
      font-weight: 600;
      text-transform: uppercase;
      padding: 2px 8px;
      border-radius: var(--radius-full);
      
      &.type-input {
        background: #dbeafe;
        color: #1e40af;
      }
      
      &.type-focus {
        background: #dcfce7;
        color: #166534;
      }
      
      &.type-blur {
        background: #fee2e2;
        color: #991b1b;
      }
      
      &.type-keydown {
        background: #fef3c7;
        color: #92400e;
      }
    }

    .event-log__message {
      font-size: 0.875rem;
      color: var(--darkgrey);
    }

    // API Table
    .api-section {
      background: var(--surface-card);
      border: 1px solid var(--greyborder);
      border-radius: var(--radius-lg);
      padding: var(--spacing-6);
    }

    .api-table-wrapper {
      overflow-x: auto;
    }

    .api-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.875rem;
      
      th, td {
        text-align: left;
        padding: var(--spacing-3) var(--spacing-4);
        border-bottom: 1px solid var(--greyborder);
      }
      
      th {
        background: var(--grey-background);
        font-weight: 600;
        color: var(--darkgrey);
      }
      
      td {
        color: var(--grey);
        
        code {
          background: var(--grey-background);
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          font-size: 0.8125rem;
          color: var(--color-primary);
        }
      }
    }
  `]
})
export class WfxInputDemoComponent {
  // Basic
  basicValue = '';
  
  // Types
  textValue = '';
  emailValue = '';
  passwordValue = '';
  numberValue = '';
  telValue = '';
  searchValue = '';
  
  // Sizes
  sizeSmall = '';
  sizeNormal = '';
  sizeLarge = '';
  
  // Variants
  outlinedValue = '';
  filledValue = '';
  
  // States
  normalState = '';
  disabledState = 'Disabled value';
  readonlyState = 'Read only value';
  invalidState = '';
  
  // Fluid
  fluidValue1 = '';
  fluidValue2 = '';
  
  // Icons
  iconLeftValue = '';
  iconRightValue = '';
  iconBothValue = '';
  
  // Validation
  requiredValue = '';
  minLengthValue = '';
  maxLengthValue = '';
  
  // PT
  ptValue1 = '';
  ptValue2 = '';
  ptValue3 = '';
  
  // Events
  eventValue = '';
  eventLog = signal<{ time: string; type: string; message: string }[]>([]);

  logEvent(type: string, event: any): void {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
    
    let message = '';
    if (type === 'input') {
      message = `Value: "${(event.target as HTMLInputElement).value}"`;
    } else if (type === 'keydown') {
      message = `Key: "${event.key}"`;
    } else {
      message = `Event fired`;
    }
    
    this.eventLog.update(log => [{ time, type, message }, ...log].slice(0, 15));
  }

  clearLog(): void {
    this.eventLog.set([]);
  }
}

