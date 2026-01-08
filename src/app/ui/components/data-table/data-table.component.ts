// ============================================
// UI DataTable Component
// PrimeNG Table wrapper - upgrade-safe abstraction
// ============================================

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { CommonModule } from '@angular/common';

export interface TableColumn {
  field: string;
  header: string;
  sortable?: boolean;
  width?: string;
  template?: TemplateRef<unknown>;
}

export interface TableSortEvent {
  field: string;
  order: 1 | -1;
}

@Component({
  selector: 'ui-data-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  template: `
    <p-table
      [value]="data"
      [columns]="columns"
      [paginator]="paginator"
      [rows]="rows"
      [totalRecords]="totalRecords"
      [lazy]="lazy"
      [loading]="loading"
      [rowHover]="true"
      [showGridlines]="showGridlines"
      [stripedRows]="stripedRows"
      [styleClass]="styleClass"
      (onLazyLoad)="onLazyLoad.emit($event)"
      (onSort)="onSort.emit($event)"
    >
      <ng-template #header>
        <tr>
          @for (col of columns; track col.field) {
            <th [pSortableColumn]="col.sortable ? col.field : undefined" [style.width]="col.width">
              {{ col.header }}
              @if (col.sortable) {
                <p-sortIcon [field]="col.field" />
              }
            </th>
          }
        </tr>
      </ng-template>
      <ng-template #body let-rowData>
        <tr>
          @for (col of columns; track col.field) {
            <td>
              @if (col.template) {
                <ng-container *ngTemplateOutlet="col.template; context: { $implicit: rowData, column: col }" />
              } @else {
                {{ rowData[col.field] }}
              }
            </td>
          }
        </tr>
      </ng-template>
      <ng-template #emptymessage>
        <tr>
          <td [attr.colspan]="columns.length" class="text-center">
            {{ emptyMessage }}
          </td>
        </tr>
      </ng-template>
    </p-table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent<T = unknown> {
  @Input() data: T[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() paginator = true;
  @Input() rows = 10;
  @Input() totalRecords = 0;
  @Input() lazy = false;
  @Input() loading = false;
  @Input() showGridlines = false;
  @Input() stripedRows = true;
  @Input() emptyMessage = 'No records found';
  @Input() styleClass = '';

  @Output() onLazyLoad = new EventEmitter<TableLazyLoadEvent>();
  @Output() onSort = new EventEmitter<TableSortEvent>();
}

