// ============================================
// WFX Table Demo Component
// Showcase for WfxTable wrapper component
// ============================================

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WfxTable, WfxColumn } from '../../../../wfx-common-library/wfx-table/wfx-table';
import { WfxButton } from '../../../../wfx-common-library/wfx-button/wfx-button';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  status: string;
}

@Component({
  selector: 'app-wfx-table-demo',
  standalone: true,
  imports: [CommonModule, RouterLink, WfxTable, WfxButton],
  template: `
    <div class="wfx-table-demo">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <a routerLink="/wfx-library-test">
          <i class="pi pi-box"></i>
          WFX Library
        </a>
        <i class="pi pi-chevron-right"></i>
        <span>WfxTable</span>
      </nav>

      <!-- Header -->
      <header class="demo-header">
        <div class="header-content">
          <h1>WfxTable</h1>
          <p>A wrapper component for PrimeNG Table with pagination, sorting, and selection features</p>
        </div>
      </header>

      <!-- Import Section -->
      <section class="demo-section">
        <h2>Import</h2>
        <div class="code-block">
          <code>import {{ '{' }} WfxTable, WfxColumn {{ '}' }} from 'wfx-common-library/wfx-table';</code>
        </div>
      </section>

      <!-- Basic Table -->
      <section class="demo-section">
        <h2>Basic</h2>
        <p class="section-desc">Basic table with auto-generated columns.</p>
        <div class="demo-showcase">
          <wfx-table 
            [value]="products" 
            [columns]="basicColumns"
          ></wfx-table>
        </div>
        <div class="code-block">
          <code>&lt;wfx-table [value]="products" [columns]="columns"&gt;&lt;/wfx-table&gt;</code>
        </div>
      </section>

      <!-- Sortable Table -->
      <section class="demo-section">
        <h2>Sorting</h2>
        <p class="section-desc">Table with sortable columns. Click on headers to sort.</p>
        <div class="demo-showcase">
          <wfx-table 
            [value]="products" 
            [columns]="sortableColumns"
          ></wfx-table>
        </div>
        <div class="code-block">
          <code>columns = [
  {{ '{' }} field: 'name', header: 'Name', sortable: true {{ '}' }},
  {{ '{' }} field: 'price', header: 'Price', sortable: true {{ '}' }}
];</code>
        </div>
      </section>

      <!-- Paginated Table -->
      <section class="demo-section">
        <h2>Pagination</h2>
        <p class="section-desc">Table with pagination enabled.</p>
        <div class="demo-showcase">
          <wfx-table 
            [value]="products" 
            [columns]="basicColumns"
            [paginator]="true"
            [rows]="5"
            [rowsPerPageOptions]="[5, 10, 25]"
            [showCurrentPageReport]="true"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          ></wfx-table>
        </div>
        <div class="code-block">
          <code>&lt;wfx-table 
  [paginator]="true" 
  [rows]="5" 
  [rowsPerPageOptions]="[5, 10, 25]"
&gt;&lt;/wfx-table&gt;</code>
        </div>
      </section>

      <!-- Styled Table -->
      <section class="demo-section">
        <h2>Styling Options</h2>
        <p class="section-desc">Table with gridlines, striped rows, and row hover.</p>
        <div class="demo-showcase">
          <wfx-table 
            [value]="products" 
            [columns]="basicColumns"
            [showGridlines]="true"
            [stripedRows]="true"
            [rowHover]="true"
          ></wfx-table>
        </div>
        <div class="code-block">
          <code>&lt;wfx-table [showGridlines]="true" [stripedRows]="true" [rowHover]="true"&gt;&lt;/wfx-table&gt;</code>
        </div>
      </section>

      <!-- Size Variants -->
      <section class="demo-section">
        <h2>Sizes</h2>
        <p class="section-desc">Table size variants: small, normal, and large.</p>
        <div class="demo-showcase">
          <div class="size-demo">
            <h4>Small</h4>
            <wfx-table 
              [value]="products.slice(0, 3)" 
              [columns]="basicColumns"
              size="small"
            ></wfx-table>
            
            <h4>Large</h4>
            <wfx-table 
              [value]="products.slice(0, 3)" 
              [columns]="basicColumns"
              size="large"
            ></wfx-table>
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-table size="small"&gt;&lt;/wfx-table&gt;</code>
        </div>
      </section>

      <!-- Single Selection -->
      <section class="demo-section">
        <h2>Single Selection</h2>
        <p class="section-desc">Select a single row from the table.</p>
        <div class="demo-showcase">
          <wfx-table 
            [value]="products" 
            [columns]="basicColumns"
            selectionMode="single"
            [(selection)]="selectedProduct"
            dataKey="id"
            [rowHover]="true"
          ></wfx-table>
          <div class="selection-info">
            @if (selectedProduct) {
              <p><strong>Selected:</strong> {{ selectedProduct.name }} - \${{ selectedProduct.price }}</p>
            } @else {
              <p>No product selected</p>
            }
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-table 
  selectionMode="single" 
  [(selection)]="selectedProduct" 
  dataKey="id"
&gt;&lt;/wfx-table&gt;</code>
        </div>
      </section>

      <!-- Multiple Selection -->
      <section class="demo-section">
        <h2>Multiple Selection</h2>
        <p class="section-desc">Select multiple rows from the table.</p>
        <div class="demo-showcase">
          <wfx-table 
            [value]="products" 
            [columns]="basicColumns"
            selectionMode="multiple"
            [(selection)]="selectedProducts"
            dataKey="id"
            [rowHover]="true"
          ></wfx-table>
          <div class="selection-info">
            <p><strong>Selected:</strong> {{ selectedProducts.length }} product(s)</p>
            @if (selectedProducts.length > 0) {
              <ul>
                @for (p of selectedProducts; track p.id) {
                  <li>{{ p.name }}</li>
                }
              </ul>
            }
          </div>
        </div>
        <div class="code-block">
          <code>&lt;wfx-table selectionMode="multiple" [(selection)]="selectedProducts"&gt;&lt;/wfx-table&gt;</code>
        </div>
      </section>

      <!-- Scrollable Table -->
      <section class="demo-section">
        <h2>Scrollable</h2>
        <p class="section-desc">Table with fixed height and scrollable content.</p>
        <div class="demo-showcase">
          <wfx-table 
            [value]="manyProducts" 
            [columns]="basicColumns"
            [scrollable]="true"
            scrollHeight="300px"
          ></wfx-table>
        </div>
        <div class="code-block">
          <code>&lt;wfx-table [scrollable]="true" scrollHeight="300px"&gt;&lt;/wfx-table&gt;</code>
        </div>
      </section>

      <!-- Loading State -->
      <section class="demo-section">
        <h2>Loading</h2>
        <p class="section-desc">Table with loading indicator.</p>
        <div class="demo-showcase">
          <div class="button-row">
            <wfx-button 
              [label]="isLoading() ? 'Stop Loading' : 'Simulate Loading'" 
              [icon]="isLoading() ? 'pi pi-stop' : 'pi pi-spin pi-spinner'"
              (onClick)="toggleLoading()"
            ></wfx-button>
          </div>
          <wfx-table 
            [value]="products" 
            [columns]="basicColumns"
            [loading]="isLoading()"
          ></wfx-table>
        </div>
        <div class="code-block">
          <code>&lt;wfx-table [loading]="isLoading"&gt;&lt;/wfx-table&gt;</code>
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
                <td><code>value</code></td>
                <td>any[]</td>
                <td>[]</td>
                <td>Data to display</td>
              </tr>
              <tr>
                <td><code>columns</code></td>
                <td>WfxColumn[]</td>
                <td>[]</td>
                <td>Column definitions</td>
              </tr>
              <tr>
                <td><code>paginator</code></td>
                <td>boolean</td>
                <td>false</td>
                <td>Enable pagination</td>
              </tr>
              <tr>
                <td><code>rows</code></td>
                <td>number</td>
                <td>-</td>
                <td>Rows per page</td>
              </tr>
              <tr>
                <td><code>selectionMode</code></td>
                <td>single | multiple</td>
                <td>-</td>
                <td>Selection mode</td>
              </tr>
              <tr>
                <td><code>sortMode</code></td>
                <td>single | multiple</td>
                <td>single</td>
                <td>Sorting mode</td>
              </tr>
              <tr>
                <td><code>loading</code></td>
                <td>boolean</td>
                <td>false</td>
                <td>Show loading indicator</td>
              </tr>
              <tr>
                <td><code>scrollable</code></td>
                <td>boolean</td>
                <td>false</td>
                <td>Enable scrolling</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .wfx-table-demo { max-width: 1000px; margin: 0 auto; }

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

    .size-demo { display: flex; flex-direction: column; gap: var(--spacing-6); h4 { margin: 0 0 var(--spacing-2) 0; color: var(--grey); font-size: 0.875rem; } }
    .button-row { display: flex; gap: var(--spacing-3); margin-bottom: var(--spacing-4); }
    .selection-info { margin-top: var(--spacing-4); padding: var(--spacing-3); background: var(--grey-background); border-radius: var(--radius-md); p { margin: 0; color: var(--grey); font-size: 0.875rem; } ul { margin: var(--spacing-2) 0 0 var(--spacing-4); padding: 0; li { color: var(--darkgrey); font-size: 0.875rem; } } }

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
export class WfxTableDemoComponent {
  isLoading = signal(false);
  selectedProduct: Product | null = null;
  selectedProducts: Product[] = [];

  basicColumns: WfxColumn[] = [
    { field: 'name', header: 'Name' },
    { field: 'category', header: 'Category' },
    { field: 'price', header: 'Price' },
    { field: 'quantity', header: 'Quantity' },
    { field: 'status', header: 'Status' }
  ];

  sortableColumns: WfxColumn[] = [
    { field: 'name', header: 'Name', sortable: true },
    { field: 'category', header: 'Category', sortable: true },
    { field: 'price', header: 'Price', sortable: true },
    { field: 'quantity', header: 'Quantity', sortable: true },
    { field: 'status', header: 'Status', sortable: true }
  ];

  products: Product[] = [
    { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1299, quantity: 50, status: 'In Stock' },
    { id: 2, name: 'Wireless Mouse', category: 'Accessories', price: 49, quantity: 150, status: 'In Stock' },
    { id: 3, name: 'USB-C Hub', category: 'Accessories', price: 79, quantity: 0, status: 'Out of Stock' },
    { id: 4, name: 'Monitor 27"', category: 'Electronics', price: 399, quantity: 30, status: 'In Stock' },
    { id: 5, name: 'Keyboard', category: 'Accessories', price: 129, quantity: 75, status: 'In Stock' },
    { id: 6, name: 'Webcam HD', category: 'Electronics', price: 89, quantity: 45, status: 'Low Stock' },
    { id: 7, name: 'Headphones', category: 'Audio', price: 199, quantity: 60, status: 'In Stock' },
    { id: 8, name: 'Microphone', category: 'Audio', price: 149, quantity: 25, status: 'Low Stock' }
  ];

  manyProducts: Product[] = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    category: ['Electronics', 'Accessories', 'Audio'][i % 3],
    price: Math.floor(Math.random() * 500) + 50,
    quantity: Math.floor(Math.random() * 100),
    status: ['In Stock', 'Out of Stock', 'Low Stock'][i % 3]
  }));

  toggleLoading(): void {
    this.isLoading.update(v => !v);
    if (this.isLoading()) {
      setTimeout(() => this.isLoading.set(false), 3000);
    }
  }
}

