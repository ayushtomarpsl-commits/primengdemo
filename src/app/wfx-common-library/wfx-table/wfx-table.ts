import { Component, Input, Output, EventEmitter, booleanAttribute, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

/**
 * Table size type
 */
export type TableSize = 'small' | 'large' | undefined;

/**
 * Sort mode type
 */
export type SortMode = 'single' | 'multiple';

/**
 * Selection mode type
 */
export type SelectionMode = 'single' | 'multiple' | undefined;

/**
 * Paginator position type
 */
export type PaginatorPosition = 'top' | 'bottom' | 'both';

/**
 * Column definition interface
 */
export interface WfxColumn {
  field: string;
  header: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  styleClass?: string;
}

/**
 * WfxTable - A wrapper component for PrimeNG Table
 * 
 * This component exposes common p-table properties and provides
 * a simplified API for the WFX application.
 * 
 * @example
 * <wfx-table [value]="products" [columns]="cols">
 *   <ng-template #body let-rowData let-columns="columns">
 *     <tr>
 *       <td *ngFor="let col of columns">{{ rowData[col.field] }}</td>
 *     </tr>
 *   </ng-template>
 * </wfx-table>
 */
@Component({
  selector: 'wfx-table',
  standalone: true,
  imports: [CommonModule, TableModule],
  templateUrl: './wfx-table.html',
  styleUrl: './wfx-table.scss',
})
export class WfxTable {
  // ==================== DATA ====================

  /**
   * An array of objects to display.
   */
  @Input() value: any[] = [];

  /**
   * An array of objects to represent dynamic columns.
   */
  @Input() columns: WfxColumn[] = [];

  /**
   * A property to uniquely identify a record in data.
   */
  @Input() dataKey: string | undefined;

  // ==================== PAGINATION ====================

  /**
   * When specified as true, enables the pagination.
   * @default false
   */
  @Input({ transform: booleanAttribute }) paginator: boolean = false;

  /**
   * Number of rows to display per page.
   */
  @Input() rows: number | undefined;

  /**
   * Array of integer/object values to display inside rows per page dropdown.
   */
  @Input() rowsPerPageOptions: any[] | undefined;

  /**
   * Position of the paginator.
   * @default 'bottom'
   */
  @Input() paginatorPosition: PaginatorPosition = 'bottom';

  /**
   * Whether to show current page report.
   * @default false
   */
  @Input({ transform: booleanAttribute }) showCurrentPageReport: boolean = false;

  /**
   * Template of the current page report element.
   * @default '{currentPage} of {totalPages}'
   */
  @Input() currentPageReportTemplate: string = '{currentPage} of {totalPages}';

  /**
   * Number of total records.
   */
  @Input() totalRecords: number = 0;

  // ==================== SORTING ====================

  /**
   * Defines whether sorting works on single column or on multiple columns.
   * @default 'single'
   */
  @Input() sortMode: SortMode = 'single';

  /**
   * Name of the field to sort data by default.
   */
  @Input() sortField: string | undefined;

  /**
   * Order to sort when default sorting is enabled.
   */
  @Input() sortOrder: number | undefined;

  // ==================== SELECTION ====================

  /**
   * Specifies the selection mode.
   */
  @Input() selectionMode: SelectionMode;

  /**
   * Selected row in single mode or an array of values in multiple mode.
   */
  @Input() selection: any;

  /**
   * Event emitter for selection changes.
   */
  @Output() selectionChange = new EventEmitter<any>();

  // ==================== FILTERING ====================

  /**
   * An array of fields as string to use in global filtering.
   */
  @Input() globalFilterFields: string[] | undefined;

  // ==================== STYLING ====================

  /**
   * Defines the size of the table.
   */
  @Input() size: TableSize;

  /**
   * Whether to show grid lines between cells.
   * @default false
   */
  @Input({ transform: booleanAttribute }) showGridlines: boolean = false;

  /**
   * Whether to display rows with alternating colors.
   * @default false
   */
  @Input({ transform: booleanAttribute }) stripedRows: boolean = false;

  /**
   * Adds hover effect to rows.
   * @default false
   */
  @Input({ transform: booleanAttribute }) rowHover: boolean = false;

  /**
   * Style class of the component.
   */
  @Input() styleClass: string | undefined;

  /**
   * Inline style of the table.
   */
  @Input() tableStyle: { [klass: string]: any } | undefined;

  /**
   * Style class of the table.
   */
  @Input() tableStyleClass: string | undefined;

  // ==================== SCROLLING ====================

  /**
   * Enables scrollable tables.
   * @default false
   */
  @Input({ transform: booleanAttribute }) scrollable: boolean = false;

  /**
   * Height of the scroll viewport.
   */
  @Input() scrollHeight: string | undefined;

  // ==================== LOADING ====================

  /**
   * Displays a loader to indicate data load is in progress.
   * @default false
   */
  @Input({ transform: booleanAttribute }) loading: boolean = false;

  /**
   * The icon to show while indicating data load is in progress.
   */
  @Input() loadingIcon: string | undefined;

  // ==================== LAZY LOADING ====================

  /**
   * Defines if data is loaded and interacted with in lazy manner.
   * @default false
   */
  @Input({ transform: booleanAttribute }) lazy: boolean = false;

  // ==================== COLUMN FEATURES ====================

  /**
   * When enabled, columns can be resized using drag and drop.
   * @default false
   */
  @Input({ transform: booleanAttribute }) resizableColumns: boolean = false;

  /**
   * When enabled, columns can be reordered using drag and drop.
   * @default false
   */
  @Input({ transform: booleanAttribute }) reorderableColumns: boolean = false;

  // ==================== PASS THROUGH ====================

  /**
   * Used to pass attributes to DOM elements inside the component.
   */
  @Input() pt: any;

  /**
   * Used to configure passthrough(pt) options of the component.
   */
  @Input() ptOptions: any;

  /**
   * Defines scoped design tokens of the component.
   */
  @Input() dt: object | undefined;

  /**
   * Indicates whether the component should be rendered without styles.
   * @default false
   */
  @Input({ transform: booleanAttribute }) unstyled: boolean = false;

  // ==================== TEMPLATES ====================

  @ContentChild('header') headerTemplate: TemplateRef<any> | undefined;
  @ContentChild('body') bodyTemplate: TemplateRef<any> | undefined;
  @ContentChild('footer') footerTemplate: TemplateRef<any> | undefined;
  @ContentChild('emptymessage') emptyMessageTemplate: TemplateRef<any> | undefined;

  // ==================== EVENTS ====================

  /**
   * Callback to invoke when a row is selected.
   */
  @Output() onRowSelect = new EventEmitter<any>();

  /**
   * Callback to invoke when a row is unselected.
   */
  @Output() onRowUnselect = new EventEmitter<any>();

  /**
   * Callback to invoke when pagination occurs.
   */
  @Output() onPage = new EventEmitter<any>();

  /**
   * Callback to invoke when a column gets sorted.
   */
  @Output() onSort = new EventEmitter<any>();

  /**
   * Callback to invoke when data is filtered.
   */
  @Output() onFilter = new EventEmitter<any>();

  /**
   * Callback to invoke in lazy mode to load new data.
   */
  @Output() onLazyLoad = new EventEmitter<any>();

  // ==================== EVENT HANDLERS ====================

  handleSelectionChange(selection: any): void {
    this.selection = selection;
    this.selectionChange.emit(selection);
  }

  handleRowSelect(event: any): void {
    this.onRowSelect.emit(event);
  }

  handleRowUnselect(event: any): void {
    this.onRowUnselect.emit(event);
  }

  handlePage(event: any): void {
    this.onPage.emit(event);
  }

  handleSort(event: any): void {
    this.onSort.emit(event);
  }

  handleFilter(event: any): void {
    this.onFilter.emit(event);
  }

  handleLazyLoad(event: any): void {
    this.onLazyLoad.emit(event);
  }
}

