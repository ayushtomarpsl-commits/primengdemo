// ============================================
// Passthrough Demo Component
// Showcases PrimeNG passthrough feature for deep customization
// Using PT with STYLE objects - NO ng-deep!
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
        <p>Customize internal DOM elements using the <code>pt</code> property with <strong>style objects</strong> (no ng-deep!)</p>
      </div>

      <!-- Button with Passthrough -->
      <section class="demo-section">
        <h3><i class="pi pi-bolt"></i> Buttons with Passthrough</h3>
        <p class="section-desc">Custom styling applied to button's internal elements using PT style objects</p>
        
        <div class="demo-row">
          <p-button
            label="Gradient Button"
            icon="pi pi-sparkles"
            [pt]="gradientButtonPT"
          />

          <p-button
            label="Outlined Glow"
            icon="pi pi-star"
            [outlined]="true"
            [pt]="outlinedGlowButtonPT"
          />

          <p-button
            label="Pill Button"
            icon="pi pi-check"
            severity="success"
            [pt]="pillButtonPT"
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
              [pt]="animatedInputPT"
            />
          </div>

          <div class="input-wrapper">
            <label>Search Input</label>
            <div class="search-input-container">
              <i class="pi pi-search search-icon"></i>
              <input
                pInputText
                placeholder="Search..."
                [pt]="searchInputPT"
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
              [pt]="selectPT"
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
              [pt]="datepickerPT"
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
          [pt]="tablePT"
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
                  [pt]="viewActionButtonPT"
                />
                <p-button
                  icon="pi pi-pencil"
                  [rounded]="true"
                  [text]="true"
                  pTooltip="Edit"
                  [pt]="editActionButtonPT"
                />
                <p-button
                  icon="pi pi-trash"
                  [rounded]="true"
                  [text]="true"
                  severity="danger"
                  pTooltip="Delete"
                  [pt]="deleteActionButtonPT"
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
            [pt]="analyticsCardPT"
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
            [pt]="revenueCardPT"
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
            [pt]="ordersCardPT"
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
        <h3><i class="pi pi-code"></i> Usage Example (Correct Way - Style Objects)</h3>
        <pre class="code-block"><code>// Define PT object with STYLE (not class!)
buttonPT = &#123;
  root: &#123;
    style: &#123;
      background: 'linear-gradient(...)',
      borderRadius: '12px',
      padding: '12px 24px'
    &#125;
  &#125;,
  label: &#123;
    style: &#123;
      fontWeight: '600',
      letterSpacing: '0.5px'
    &#125;
  &#125;
&#125;;

// In template
&lt;p-button label="Custom" [pt]="buttonPT" /&gt;</code></pre>
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

        strong {
          color: var(--green);
        }
      }
    }

    .demo-section {
      background: var(--surface-card);
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

    // Table Content Styling (local styles - no ng-deep needed)
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
      background: var(--darkgrey);

      h3 {
        color: var(--color-white);

        i {
          color: var(--lightbluegreen);
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

  // ============================================
  // PT OBJECTS WITH STYLE (NO ng-deep needed!)
  // ============================================

  // Gradient Button PT
  gradientButtonPT = {
    root: {
      style: {
        background: 'linear-gradient(92.58deg, #00d1cf 0%, #0099c4 100%)',
        border: 'none',
        borderRadius: '12px',
        padding: '12px 24px',
        boxShadow: '0 4px 15px rgba(0, 209, 207, 0.4)',
        transition: 'all 0.3s ease'
      }
    },
    label: {
      style: {
        fontWeight: '600',
        letterSpacing: '0.5px'
      }
    }
  };

  // Outlined Glow Button PT
  outlinedGlowButtonPT = {
    root: {
      style: {
        border: '2px solid #3cbbc9',
        color: '#3cbbc9',
        borderRadius: '12px',
        transition: 'all 0.3s ease'
      }
    }
  };

  // Pill Button PT
  pillButtonPT = {
    root: {
      style: {
        borderRadius: '50px',
        padding: '10px 28px'
      }
    }
  };

  // Animated Input PT
  animatedInputPT = {
    root: {
      style: {
        border: '2px solid var(--greyborder)',
        borderRadius: '8px',
        padding: '12px 16px',
        transition: 'all 0.3s ease',
        width: '100%'
      }
    }
  };

  // Search Input PT
  searchInputPT = {
    root: {
      style: {
        paddingLeft: '40px',
        borderRadius: '50px',
        border: '2px solid var(--greyborder)',
        width: '100%',
        transition: 'all 0.3s ease'
      }
    }
  };

  // Select PT
  selectPT = {
    root: {
      style: {
        borderRadius: '8px',
        border: '2px solid var(--greyborder)',
        minWidth: '250px',
        transition: 'all 0.3s ease'
      }
    },
    dropdown: {
      style: {
        background: 'linear-gradient(92.58deg, #00d1cf 0%, #0099c4 100%)',
        borderRadius: '0 6px 6px 0'
      }
    },
    option: {
      style: {
        transition: 'all 0.2s ease',
        borderRadius: '4px',
        margin: '2px 4px'
      }
    }
  };

  // DatePicker PT
  datepickerPT = {
    root: {
      style: {
        width: '100%'
      }
    },
    pcInput: {
      root: {
        style: {
          borderRadius: '8px',
          border: '2px solid var(--greyborder)'
        }
      }
    },
    dropdown: {
      root: {
        style: {
          background: 'linear-gradient(92.58deg, #00d1cf 0%, #0099c4 100%)'
        }
      }
    },
    panel: {
      style: {
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
        border: '1px solid var(--greyborder)'
      }
    },
    header: {
      style: {
        background: 'linear-gradient(92.58deg, #00d1cf 0%, #0099c4 100%)',
        color: 'white',
        borderRadius: '12px 12px 0 0'
      }
    }
  };

  // Table PT
  tablePT = {
    root: {
      style: {
        borderRadius: '12px',
        overflow: 'hidden',
        border: '1px solid var(--greyborder)'
      }
    },
    headerRow: {
      style: {
        background: 'linear-gradient(92.58deg, rgba(0, 209, 207, 0.05) 0%, rgba(0, 153, 196, 0.05) 100%)'
      }
    },
    headerCell: {
      style: {
        background: 'transparent',
        color: 'var(--darkgrey)',
        fontWeight: '600',
        textTransform: 'uppercase',
        fontSize: '12px',
        letterSpacing: '0.5px',
        padding: '16px',
        borderBottom: '2px solid var(--color-primary)'
      }
    },
    bodyRow: {
      style: {
        transition: 'all 0.2s ease'
      }
    },
    bodyCell: {
      style: {
        padding: '16px',
        borderBottom: '1px solid var(--greyborder)'
      }
    }
  };

  // Action Buttons PT
  viewActionButtonPT = {
    root: {
      style: {
        width: '32px',
        height: '32px',
        transition: 'all 0.2s ease'
      }
    }
  };

  editActionButtonPT = {
    root: {
      style: {
        width: '32px',
        height: '32px',
        transition: 'all 0.2s ease'
      }
    }
  };

  deleteActionButtonPT = {
    root: {
      style: {
        width: '32px',
        height: '32px',
        transition: 'all 0.2s ease'
      }
    }
  };

  // Card PT - Analytics
  analyticsCardPT = {
    root: {
      style: {
        borderRadius: '16px',
        overflow: 'hidden',
        border: 'none',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease'
      }
    },
    header: {
      style: {
        background: 'linear-gradient(92.58deg, #00d1cf 0%, #0099c4 100%)',
        padding: '20px'
      }
    },
    title: {
      style: {
        color: 'white',
        fontSize: '18px',
        fontWeight: '700',
        margin: '0'
      }
    },
    subtitle: {
      style: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '14px'
      }
    },
    body: {
      style: {
        padding: '0'
      }
    },
    content: {
      style: {
        padding: '24px'
      }
    }
  };

  // Card PT - Revenue
  revenueCardPT = {
    root: {
      style: {
        borderRadius: '16px',
        overflow: 'hidden',
        border: 'none',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease'
      }
    },
    header: {
      style: {
        background: 'linear-gradient(135deg, #3cc985 0%, #2da06b 100%)',
        padding: '20px'
      }
    },
    title: {
      style: {
        color: 'white',
        fontSize: '18px',
        fontWeight: '700',
        margin: '0'
      }
    },
    subtitle: {
      style: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '14px'
      }
    },
    body: {
      style: {
        padding: '0'
      }
    },
    content: {
      style: {
        padding: '24px'
      }
    }
  };

  // Card PT - Orders
  ordersCardPT = {
    root: {
      style: {
        borderRadius: '16px',
        overflow: 'hidden',
        border: 'none',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease'
      }
    },
    header: {
      style: {
        background: 'linear-gradient(135deg, #efa64a 0%, #d4902f 100%)',
        padding: '20px'
      }
    },
    title: {
      style: {
        color: 'white',
        fontSize: '18px',
        fontWeight: '700',
        margin: '0'
      }
    },
    subtitle: {
      style: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '14px'
      }
    },
    body: {
      style: {
        padding: '0'
      }
    },
    content: {
      style: {
        padding: '24px'
      }
    }
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
