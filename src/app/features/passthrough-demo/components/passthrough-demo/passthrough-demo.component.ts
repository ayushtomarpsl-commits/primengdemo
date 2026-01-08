// ============================================
// Passthrough Demo Component
// Showcases PrimeNG passthrough feature for deep customization
// ============================================

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Components with Passthrough support
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { BadgeModule } from 'primeng/badge';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

@Component({
  selector: 'feature-passthrough-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    DatePickerModule,
    TableModule,
    CardModule,
    TooltipModule,
    BadgeModule,
  ],
  template: `
    <div class="passthrough-demo">
      <div class="demo-header">
        <h2>PrimeNG Passthrough Demo</h2>
        <p>Customize internal DOM elements using the <code>pt</code> property</p>
      </div>

      <!-- Button with Passthrough -->
      <section class="demo-section">
        <h3><i class="pi pi-bolt"></i> Buttons with Passthrough</h3>
        <p class="section-desc">Custom styling applied to button's internal elements</p>
        
        <div class="demo-row">
          <p-button
            label="Gradient Button"
            icon="pi pi-sparkles"
            [pt]="{
              root: {
                class: 'custom-gradient-btn',
                'data-testid': 'gradient-button'
              },
              label: {
                class: 'custom-btn-label'
              },
              icon: {
                class: 'custom-btn-icon'
              }
            }"
          />

          <p-button
            label="Outlined Glow"
            icon="pi pi-star"
            [outlined]="true"
            [pt]="{
              root: {
                class: 'custom-outlined-glow'
              }
            }"
          />

          <p-button
            label="Pill Button"
            icon="pi pi-check"
            severity="success"
            [pt]="{
              root: {
                class: 'custom-pill-btn'
              }
            }"
          />
        </div>
      </section>

      <!-- Input with Passthrough -->
      <section class="demo-section">
        <h3><i class="pi pi-pencil"></i> Input with Passthrough</h3>
        <p class="section-desc">Custom focus effects and styling on input elements</p>
        
        <div class="demo-row">
          <div class="input-wrapper">
            <label>Custom Focus Input</label>
            <input
              pInputText
              placeholder="Type something..."
              [pt]="{
                root: {
                  class: 'custom-input-animated',
                  'data-placeholder': 'Type something...'
                }
              }"
            />
          </div>

          <div class="input-wrapper">
            <label>Search Input</label>
            <div class="search-input-container">
              <i class="pi pi-search search-icon"></i>
              <input
                pInputText
                placeholder="Search..."
                [pt]="{
                  root: {
                    class: 'custom-search-input'
                  }
                }"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Select/Dropdown with Passthrough -->
      <section class="demo-section">
        <h3><i class="pi pi-list"></i> Select with Passthrough</h3>
        <p class="section-desc">Customize dropdown trigger, panel, and items</p>
        
        <div class="demo-row">
          <div class="input-wrapper">
            <label>Custom Styled Select</label>
            <p-select
              [(ngModel)]="selectedCity"
              [options]="cities"
              optionLabel="name"
              placeholder="Select a City"
              [pt]="{
                root: {
                  class: 'custom-select-root'
                },
                label: {
                  class: 'custom-select-label'
                },
                dropdown: {
                  class: 'custom-select-trigger'
                },
                listContainer: {
                  class: 'custom-select-panel'
                },
                option: {
                  class: 'custom-select-item'
                }
              }"
            />
          </div>
        </div>
      </section>

      <!-- DatePicker with Passthrough -->
      <section class="demo-section">
        <h3><i class="pi pi-calendar"></i> DatePicker with Passthrough</h3>
        <p class="section-desc">Styled calendar with custom header and day cells</p>
        
        <div class="demo-row">
          <div class="input-wrapper">
            <label>Custom Calendar</label>
            <p-datepicker
              [(ngModel)]="selectedDate"
              [showIcon]="true"
              [showButtonBar]="true"
              dateFormat="dd/mm/yy"
              placeholder="Pick a date"
              [pt]="datepickerPt"
            />
          </div>
        </div>
      </section>

      <!-- Table with Passthrough -->
      <section class="demo-section">
        <h3><i class="pi pi-table"></i> Table with Passthrough</h3>
        <p class="section-desc">Full table customization including headers, rows, and cells</p>
        
        <p-table
          [value]="products"
          [pt]="tablePt"
        >
          <ng-template #header>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </ng-template>
          <ng-template #body let-product>
            <tr>
              <td>
                <span class="product-name">{{ product.name }}</span>
              </td>
              <td>
                <span class="category-badge">{{ product.category }}</span>
              </td>
              <td>
                <span class="price">{{ product.price | currency }}</span>
              </td>
              <td>
                <span 
                  class="status-badge"
                  [class.status-instock]="product.status === 'In Stock'"
                  [class.status-lowstock]="product.status === 'Low Stock'"
                  [class.status-outofstock]="product.status === 'Out of Stock'"
                >
                  {{ product.status }}
                </span>
              </td>
              <td>
                <p-button
                  icon="pi pi-eye"
                  [rounded]="true"
                  [text]="true"
                  pTooltip="View Details"
                  [pt]="{
                    root: { class: 'action-btn action-btn--view' }
                  }"
                />
                <p-button
                  icon="pi pi-pencil"
                  [rounded]="true"
                  [text]="true"
                  pTooltip="Edit"
                  [pt]="{
                    root: { class: 'action-btn action-btn--edit' }
                  }"
                />
                <p-button
                  icon="pi pi-trash"
                  [rounded]="true"
                  [text]="true"
                  severity="danger"
                  pTooltip="Delete"
                  [pt]="{
                    root: { class: 'action-btn action-btn--delete' }
                  }"
                />
              </td>
            </tr>
          </ng-template>
        </p-table>
      </section>

      <!-- Card with Passthrough -->
      <section class="demo-section">
        <h3><i class="pi pi-id-card"></i> Card with Passthrough</h3>
        <p class="section-desc">Customized card with gradient header and styled content</p>
        
        <div class="demo-row cards-row">
          <p-card
            header="Analytics"
            subheader="Monthly Report"
            [pt]="{
              root: {
                class: 'custom-card-root custom-card--analytics'
              },
              header: {
                class: 'custom-card-header'
              },
              title: {
                class: 'custom-card-title'
              },
              subtitle: {
                class: 'custom-card-subtitle'
              },
              body: {
                class: 'custom-card-body'
              },
              content: {
                class: 'custom-card-content'
              }
            }"
          >
            <div class="card-stat">
              <span class="stat-value">12,543</span>
              <span class="stat-label">Total Visits</span>
              <span class="stat-change positive">+12.5%</span>
            </div>
          </p-card>

          <p-card
            header="Revenue"
            subheader="This Quarter"
            [pt]="{
              root: {
                class: 'custom-card-root custom-card--revenue'
              },
              header: {
                class: 'custom-card-header'
              },
              title: {
                class: 'custom-card-title'
              },
              body: {
                class: 'custom-card-body'
              }
            }"
          >
            <div class="card-stat">
              <span class="stat-value">$84,230</span>
              <span class="stat-label">Total Revenue</span>
              <span class="stat-change positive">+8.2%</span>
            </div>
          </p-card>

          <p-card
            header="Orders"
            subheader="Pending"
            [pt]="{
              root: {
                class: 'custom-card-root custom-card--orders'
              },
              header: {
                class: 'custom-card-header'
              },
              title: {
                class: 'custom-card-title'
              },
              body: {
                class: 'custom-card-body'
              }
            }"
          >
            <div class="card-stat">
              <span class="stat-value">156</span>
              <span class="stat-label">Pending Orders</span>
              <span class="stat-change negative">-3.1%</span>
            </div>
          </p-card>
        </div>
      </section>

      <!-- Code Example -->
      <section class="demo-section code-section">
        <h3><i class="pi pi-code"></i> Usage Example</h3>
        <pre class="code-block"><code>&lt;p-button
  label="Custom Button"
  [pt]="&#123;
    root: &#123;
      class: 'my-custom-class',
      style: &#123; '--custom-var': 'value' &#125;,
      'data-testid': 'my-button'
    &#125;,
    label: &#123;
      class: 'my-label-class'
    &#125;,
    icon: &#123;
      class: 'my-icon-class'
    &#125;
  &#125;"
/&gt;</code></pre>
      </section>
    </div>
  `,
  styles: [`
    .passthrough-demo {
      max-width: 1200px;
      margin: 0 auto;
    }

    .demo-header {
      margin-bottom: var(--spacing-8);
      text-align: center;

      h2 {
        margin: 0 0 var(--spacing-2);
        font-size: var(--font-size-3xl);
        font-weight: var(--font-weight-bold);
        background: var(--primary-button-gradient);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      p {
        color: var(--lightgrey);
        font-size: var(--font-size-lg);

        code {
          background: var(--grey-background);
          padding: 2px 8px;
          border-radius: var(--radius-sm);
          font-family: var(--font-family-mono);
          color: var(--color-primary);
        }
      }
    }

    .demo-section {
      background: var(--color-white);
      border: 1px solid var(--greyborder);
      border-radius: var(--radius-lg);
      padding: var(--spacing-6);
      margin-bottom: var(--spacing-6);
      box-shadow: var(--card-box-shadow);

      h3 {
        display: flex;
        align-items: center;
        gap: var(--spacing-3);
        margin: 0 0 var(--spacing-2);
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        color: var(--darkgrey);

        i {
          color: var(--color-primary);
        }
      }

      .section-desc {
        color: var(--lightgrey);
        margin-bottom: var(--spacing-6);
        font-size: var(--font-size-sm);
      }
    }

    .demo-row {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-4);
      align-items: flex-start;
    }

    .cards-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--spacing-6);
    }

    .input-wrapper {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-2);
      min-width: 250px;

      label {
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
        color: var(--darkgrey);
      }
    }

    .search-input-container {
      position: relative;

      .search-icon {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--lightgrey);
        z-index: 1;
      }
    }

    // ========================================
    // PASSTHROUGH CUSTOM STYLES
    // ========================================

    // Custom Gradient Button
    :host ::ng-deep .custom-gradient-btn {
      background: var(--primary-button-gradient) !important;
      border: none !important;
      border-radius: var(--radius-lg) !important;
      padding: 12px 24px !important;
      box-shadow: 0 4px 15px rgba(0, 209, 207, 0.4) !important;
      transition: all 0.3s ease !important;

      &:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 6px 20px rgba(0, 209, 207, 0.5) !important;
      }
    }

    :host ::ng-deep .custom-btn-label {
      font-weight: 600 !important;
      letter-spacing: 0.5px !important;
    }

    :host ::ng-deep .custom-btn-icon {
      animation: sparkle 1.5s ease-in-out infinite !important;
    }

    @keyframes sparkle {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    // Custom Outlined Glow Button
    :host ::ng-deep .custom-outlined-glow {
      border: 2px solid var(--lightbluegreen) !important;
      color: var(--lightbluegreen) !important;
      border-radius: var(--radius-lg) !important;
      transition: all 0.3s ease !important;

      &:hover {
        background: rgba(60, 187, 201, 0.1) !important;
        box-shadow: 0 0 20px rgba(60, 187, 201, 0.4) !important;
      }
    }

    // Custom Pill Button
    :host ::ng-deep .custom-pill-btn {
      border-radius: 50px !important;
      padding: 10px 28px !important;
    }

    // Custom Input with Animation
    :host ::ng-deep .custom-input-animated {
      border: 2px solid var(--greyborder) !important;
      border-radius: var(--radius-md) !important;
      padding: 12px 16px !important;
      transition: all 0.3s ease !important;
      width: 100% !important;

      &:focus {
        border-color: var(--color-primary) !important;
        box-shadow: 0 0 0 4px rgba(0, 209, 207, 0.15) !important;
        outline: none !important;
      }
    }

    // Custom Search Input
    :host ::ng-deep .custom-search-input {
      padding-left: 40px !important;
      border-radius: 50px !important;
      border: 2px solid var(--greyborder) !important;
      width: 100% !important;
      transition: all 0.3s ease !important;

      &:focus {
        border-color: var(--lightbluegreen) !important;
        box-shadow: 0 0 0 4px rgba(60, 187, 201, 0.15) !important;
      }
    }

    // Custom Select
    :host ::ng-deep .custom-select-root {
      border-radius: var(--radius-md) !important;
      border: 2px solid var(--greyborder) !important;
      min-width: 250px !important;
      transition: all 0.3s ease !important;

      &:hover {
        border-color: var(--lightgrey) !important;
      }

      &.p-focus {
        border-color: var(--color-primary) !important;
        box-shadow: 0 0 0 4px rgba(0, 209, 207, 0.15) !important;
      }
    }

    :host ::ng-deep .custom-select-trigger {
      background: var(--primary-button-gradient) !important;
      border-radius: 0 var(--radius-sm) var(--radius-sm) 0 !important;
    }

    :host ::ng-deep .custom-select-item {
      transition: all 0.2s ease !important;
      border-radius: var(--radius-sm) !important;
      margin: 2px 4px !important;

      &:hover {
        background: linear-gradient(92.58deg, rgba(0, 209, 207, 0.1) 0%, rgba(0, 153, 196, 0.1) 100%) !important;
      }

      &.p-select-option-selected {
        background: var(--primary-button-gradient) !important;
        color: white !important;
      }
    }

    // Custom DatePicker
    :host ::ng-deep .custom-datepicker-root {
      width: 100% !important;
    }

    :host ::ng-deep .custom-datepicker-input {
      border-radius: var(--radius-md) !important;
      border: 2px solid var(--greyborder) !important;
    }

    :host ::ng-deep .custom-datepicker-icon {
      color: var(--color-primary) !important;
    }

    :host ::ng-deep .custom-datepicker-panel {
      border-radius: var(--radius-lg) !important;
      box-shadow: var(--shadow-xl) !important;
      border: 1px solid var(--greyborder) !important;
    }

    :host ::ng-deep .custom-datepicker-header {
      background: var(--primary-button-gradient) !important;
      color: white !important;
      border-radius: var(--radius-lg) var(--radius-lg) 0 0 !important;
    }

    // Custom Table
    :host ::ng-deep .custom-table-root {
      border-radius: var(--radius-lg) !important;
      overflow: hidden !important;
      border: 1px solid var(--greyborder) !important;
    }

    :host ::ng-deep .custom-header-row {
      background: linear-gradient(92.58deg, rgba(0, 209, 207, 0.05) 0%, rgba(0, 153, 196, 0.05) 100%) !important;
    }

    :host ::ng-deep .custom-header-cell {
      background: transparent !important;
      color: var(--darkgrey) !important;
      font-weight: 600 !important;
      text-transform: uppercase !important;
      font-size: 12px !important;
      letter-spacing: 0.5px !important;
      padding: 16px !important;
      border-bottom: 2px solid var(--color-primary) !important;
    }

    :host ::ng-deep .custom-body-row {
      transition: all 0.2s ease !important;

      &:hover {
        background: var(--grey-background) !important;
      }
    }

    :host ::ng-deep .custom-body-cell {
      padding: 16px !important;
      border-bottom: 1px solid var(--greyborder) !important;
    }

    // Table Content Styling
    .product-name {
      font-weight: var(--font-weight-medium);
      color: var(--darkgrey);
    }

    .category-badge {
      background: var(--grey-background);
      padding: 4px 12px;
      border-radius: var(--radius-full);
      font-size: var(--font-size-xs);
      color: var(--darkgrey);
    }

    .price {
      font-weight: var(--font-weight-semibold);
      color: var(--green);
    }

    .status-badge {
      padding: 4px 12px;
      border-radius: var(--radius-full);
      font-size: var(--font-size-xs);
      font-weight: var(--font-weight-medium);

      &.status-instock {
        background: rgba(60, 201, 133, 0.15);
        color: var(--green);
      }

      &.status-lowstock {
        background: rgba(239, 166, 74, 0.15);
        color: var(--orange);
      }

      &.status-outofstock {
        background: rgba(229, 102, 102, 0.15);
        color: var(--red);
      }
    }

    :host ::ng-deep .action-btn {
      width: 32px !important;
      height: 32px !important;
      transition: all 0.2s ease !important;

      &--view:hover {
        background: rgba(60, 187, 201, 0.15) !important;
        color: var(--lightbluegreen) !important;
      }

      &--edit:hover {
        background: rgba(239, 166, 74, 0.15) !important;
        color: var(--orange) !important;
      }

      &--delete:hover {
        background: rgba(229, 102, 102, 0.15) !important;
        color: var(--red) !important;
      }
    }

    // Custom Cards
    :host ::ng-deep .custom-card-root {
      border-radius: var(--radius-xl) !important;
      overflow: hidden !important;
      border: none !important;
      box-shadow: var(--shadow-lg) !important;
      transition: all 0.3s ease !important;

      &:hover {
        transform: translateY(-4px) !important;
        box-shadow: var(--shadow-xl) !important;
      }
    }

    :host ::ng-deep .custom-card--analytics .custom-card-header {
      background: var(--primary-button-gradient) !important;
      padding: 20px !important;
    }

    :host ::ng-deep .custom-card--revenue .custom-card-header {
      background: linear-gradient(135deg, var(--green) 0%, #2da06b 100%) !important;
      padding: 20px !important;
    }

    :host ::ng-deep .custom-card--orders .custom-card-header {
      background: linear-gradient(135deg, var(--orange) 0%, #d4902f 100%) !important;
      padding: 20px !important;
    }

    :host ::ng-deep .custom-card-title {
      color: white !important;
      font-size: var(--font-size-lg) !important;
      font-weight: var(--font-weight-bold) !important;
      margin: 0 !important;
    }

    :host ::ng-deep .custom-card-subtitle {
      color: rgba(255, 255, 255, 0.8) !important;
      font-size: var(--font-size-sm) !important;
    }

    :host ::ng-deep .custom-card-body {
      padding: 0 !important;
    }

    :host ::ng-deep .custom-card-content {
      padding: var(--spacing-6) !important;
    }

    .card-stat {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-1);

      .stat-value {
        font-size: var(--font-size-3xl);
        font-weight: var(--font-weight-bold);
        color: var(--darkgrey);
      }

      .stat-label {
        font-size: var(--font-size-sm);
        color: var(--lightgrey);
      }

      .stat-change {
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);

        &.positive {
          color: var(--green);
        }

        &.negative {
          color: var(--red);
        }
      }
    }

    // Code Block
    .code-section {
      background: var(--darkgrey) !important;

      h3 {
        color: var(--color-white) !important;

        i {
          color: var(--lightbluegreen) !important;
        }
      }
    }

    .code-block {
      background: #1e1e1e;
      border-radius: var(--radius-md);
      padding: var(--spacing-4);
      overflow-x: auto;
      margin: 0;

      code {
        font-family: var(--font-family-mono);
        font-size: var(--font-size-sm);
        color: #d4d4d4;
        line-height: 1.6;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PassthroughDemoComponent {
  selectedCity: any = null;
  selectedDate: Date | null = null;

  // Passthrough objects with 'any' to bypass strict type checking for demo purposes
  datepickerPt: any = {
    root: { class: 'custom-datepicker-root' },
    inputIcon: { class: 'custom-datepicker-icon' },
    panel: { class: 'custom-datepicker-panel' },
    header: { class: 'custom-datepicker-header' },
    dayLabel: { class: 'custom-day-label' }
  };

  tablePt: any = {
    root: { class: 'custom-table-root' },
    tableContainer: { class: 'custom-table-container' },
    thead: { class: 'custom-table-thead' },
    headerRow: { class: 'custom-header-row' },
    headerCell: { class: 'custom-header-cell' },
    tbody: { class: 'custom-table-tbody' },
    bodyRow: { class: 'custom-body-row' },
    bodyCell: { class: 'custom-body-cell' }
  };

  cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Los Angeles', code: 'LA' },
    { name: 'Chicago', code: 'CHI' },
    { name: 'Houston', code: 'HOU' },
    { name: 'Phoenix', code: 'PHX' },
  ];

  products: Product[] = [
    { id: '1', name: 'MacBook Pro', category: 'Electronics', price: 2499, status: 'In Stock' },
    { id: '2', name: 'iPhone 15 Pro', category: 'Electronics', price: 1199, status: 'Low Stock' },
    { id: '3', name: 'AirPods Pro', category: 'Accessories', price: 249, status: 'In Stock' },
    { id: '4', name: 'iPad Air', category: 'Electronics', price: 799, status: 'Out of Stock' },
    { id: '5', name: 'Apple Watch', category: 'Wearables', price: 399, status: 'In Stock' },
  ];
}

