// ============================================
// WFX Prime Component
// AG-Grid implementation with WFX API data
// ============================================

import { ChangeDetectionStrategy, Component, inject, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { 
  ColDef, 
  GridReadyEvent, 
  GridApi,
  ModuleRegistry,
  AllCommunityModule,
  themeQuartz,
  Theme as AgGridTheme,
  CellValueChangedEvent
} from 'ag-grid-community';
import { catchError, of, tap } from 'rxjs';

// Import PrimeNG Cell Editors
import { DatePickerCellEditorComponent } from '../cell-editors/datepicker-cell-editor.component';
import { InputCellEditorComponent } from '../cell-editors/input-cell-editor.component';
import { DropdownCellEditorComponent } from '../cell-editors/dropdown-cell-editor.component';

// Import Theme Service for reactive theming
import { ThemeService } from '../../../../core/services/theme.service';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

// Interface for API response
interface ErrorResolutionData {
  EDIPackageImportID: number;
  fileName: string;
  filetype: string;
  fileFormat: string;
  entityId: string;
  status: string;
  uploadedOn: string;
  processedOn: string;
  packageBundleId: number;
  lastModified: string;
  TransactionType: string;
  MasterPackageName: string;
  DataImported: string;
  DataValidated: string;
  MappingResolved: string;
  TransactionStatus: string;
  EDIPackageImportGroupId: number;
  ErrorMessage: string;
}

@Component({
  selector: 'feature-wfx-prime',
  standalone: true,
  imports: [AgGridAngular],
  template: `
    <div class="wfx-prime">
      <div class="wfx-prime__header">
        <h2>WFX Prime</h2>
        <p class="wfx-prime__subtitle">Error Resolution Data Grid powered by AG-Grid with PrimeNG Editors</p>
        <p class="wfx-prime__hint">
          <i class="pi pi-info-circle"></i>
          Double-click on editable cells (File Name, Status columns, Date columns, Error Message) to edit using PrimeNG components
        </p>
      </div>

      @if (loading()) {
        <div class="wfx-prime__loading">
          <i class="pi pi-spin pi-spinner"></i>
          <span>Loading data...</span>
        </div>
      }

      @if (error()) {
        <div class="wfx-prime__error">
          <i class="pi pi-exclamation-triangle"></i>
          <span>{{ error() }}</span>
        </div>
      }

      <div class="wfx-prime__grid-container">
        <ag-grid-angular
          class="wfx-prime__grid"
          [theme]="agGridTheme()"
          [rowData]="rowData()"
          [columnDefs]="columnDefs"
          [defaultColDef]="defaultColDef"
          [animateRows]="true"
          [pagination]="true"
          [paginationPageSize]="10"
          [paginationPageSizeSelector]="[10, 25, 50]"
          [stopEditingWhenCellsLoseFocus]="true"
          (gridReady)="onGridReady($event)"
          (cellValueChanged)="onCellValueChanged($event)"
        />
      </div>
    </div>
  `,
  styles: [`
    .wfx-prime {
      h2 {
        margin: 0 0 var(--spacing-2);
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-semibold);
        color: var(--darkgrey);
        transition: color 0.3s ease;
      }
    }

    .wfx-prime__subtitle {
      color: var(--lightgrey);
      margin-bottom: var(--spacing-2);
      transition: color 0.3s ease;
    }

    .wfx-prime__hint {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
      color: var(--color-primary);
      font-size: var(--font-size-sm);
      margin-bottom: var(--spacing-6);
      padding: var(--spacing-2) var(--spacing-3);
      background: var(--color-primary-light);
      border-radius: var(--radius-md);
      border-left: 3px solid var(--color-primary);
      transition: all 0.3s ease;

      i {
        font-size: 1rem;
      }
    }

    .wfx-prime__loading {
      display: flex;
      align-items: center;
      gap: var(--spacing-3);
      padding: var(--spacing-4);
      background: var(--color-primary-light);
      border-radius: var(--radius-md);
      margin-bottom: var(--spacing-4);
      color: var(--color-primary);
      border-left: 3px solid var(--color-primary);
      transition: all 0.3s ease;

      i {
        font-size: 1.25rem;
      }
    }

    .wfx-prime__error {
      display: flex;
      align-items: center;
      gap: var(--spacing-3);
      padding: var(--spacing-4);
      background: rgba(239, 68, 68, 0.1);
      border-radius: var(--radius-md);
      margin-bottom: var(--spacing-4);
      color: var(--red);
      border-left: 3px solid var(--red);
      transition: all 0.3s ease;

      i {
        font-size: 1.25rem;
      }
    }

    .wfx-prime__grid-container {
      background: var(--surface-card);
      border: 1px solid var(--greyborder);
      border-radius: var(--radius-lg);
      box-shadow: var(--card-box-shadow);
      padding: var(--spacing-4);
      overflow: hidden;
      transition: background-color 0.3s ease, border-color 0.3s ease;
    }

    .wfx-prime__grid {
      width: 100%;
      height: 600px;
      transition: all 0.3s ease;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WfxPrimeComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  private readonly themeService = inject(ThemeService);
  private gridApi!: GridApi;

  // ============================================
  // AG Grid Theme - REACTIVE to App Theme Changes
  // ============================================
  // This computed signal automatically updates when app theme changes
  readonly agGridTheme = computed<AgGridTheme>(() => {
    const currentTheme = this.themeService.currentTheme();
    const isDark = currentTheme.id === 'midnight';
    
    // Get theme colors for dynamic theming
    const themeColors = this.getAgGridThemeColors(currentTheme.id, isDark);
    
    return themeQuartz.withParams(themeColors);
  });

  // Theme color configurations for each app theme
  private getAgGridThemeColors(themeId: string, isDark: boolean) {
    // Dark theme (Midnight)
    if (isDark) {
      return {
        backgroundColor: '#1e1e2e',
        foregroundColor: '#cdd6f4',
        headerBackgroundColor: '#181825',
        headerTextColor: '#cdd6f4',
        oddRowBackgroundColor: '#1e1e2e',
        rowHoverColor: '#313244',
        selectedRowBackgroundColor: '#45475a',
        borderColor: '#45475a',
        fontSize: 14,
        rowBorder: { color: '#313244', width: 1, style: 'solid' as const },
        // Accent color based on theme
        accentColor: '#6366f1',
      };
    }

    // Light themes with different accent colors
    const themeAccentColors: Record<string, { primary: string; hover: string; selected: string }> = {
      elementary: { primary: '#00d1cf', hover: '#e0f7f6', selected: '#b2ebea' },
      ocean: { primary: '#667eea', hover: '#eef0fc', selected: '#d4d9f7' },
      sunset: { primary: '#f5576c', hover: '#feeced', selected: '#fcd4d9' },
      forest: { primary: '#11998e', hover: '#e6f5f4', selected: '#c2e8e5' },
      royal: { primary: '#7c3aed', hover: '#f3effe', selected: '#e4d9fc' },
      coral: { primary: '#ff6b6b', hover: '#ffeaea', selected: '#ffd1d1' },
    };

    const colors = themeAccentColors[themeId] || themeAccentColors['elementary'];

    return {
      backgroundColor: '#ffffff',
      foregroundColor: '#1e293b',
      headerBackgroundColor: '#f8fafc',
      headerTextColor: '#334155',
      oddRowBackgroundColor: '#fafbfc',
      rowHoverColor: colors.hover,
      selectedRowBackgroundColor: colors.selected,
      borderColor: '#e2e8f0',
      fontSize: 14,
      rowBorder: { color: '#f1f5f9', width: 1, style: 'solid' as const },
      // Accent color based on theme
      accentColor: colors.primary,
    };
  }

  // Signals for reactive state
  readonly rowData = signal<ErrorResolutionData[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  
  // GUID from query params
  private guid = 'bc7080e0-1afb-4ee3-b639-23eb0cfe185d_1LXy6u';

  // API Configuration
  private readonly API_URL = 'https://wfxqa.worldfashionexchange.com/WFXDotNetCoreAPI/WFXWebAIAPI/api/WFXAI/GetErrorResolutionData';

  // ============================================
  // Helper method for status badge with INLINE STYLES
  // No ::ng-deep needed! Styles are embedded in HTML
  // ============================================
  private getStatusBadgeHtml(value: string, type: 'completion' | 'status' = 'status'): string {
    const status = value?.toLowerCase();
    
    // Define inline styles for each status type
    const styles = {
      success: 'background:#dcfce7;color:#166534;padding:0px 12px;border-radius:20px;font-size:12px;font-weight:500;display:inline-block;',
      error: 'background:#fee2e2;color:#991b1b;padding:0px 12px;border-radius:20px;font-size:12px;font-weight:500;display:inline-block;',
      pending: 'background:#fef3c7;color:#92400e;padding:0px 12px;border-radius:20px;font-size:12px;font-weight:500;display:inline-block;',
    };

    let badgeStyle: string;
    
    if (type === 'completion') {
      // For status like 'completed', 'failed', 'pending'
      badgeStyle = status === 'completed' ? styles.success : 
                   status === 'failed' ? styles.error : styles.pending;
    } else {
      // For status like 'success', 'failed', 'pending'
      badgeStyle = status === 'success' ? styles.success : 
                   status === 'failed' ? styles.error : styles.pending;
    }

    return `<span style="${badgeStyle}">${value || ''}</span>`;
  }

  // Column definitions based on API response structure
  // Using PrimeNG components for cell editing
  columnDefs: ColDef<ErrorResolutionData>[] = [
    { 
      field: 'EDIPackageImportID', 
      headerName: 'Import ID', 
      width: 110,
      filter: 'agNumberColumnFilter'
    },
    { 
      field: 'fileName', 
      headerName: 'File Name',
      flex: 1,
      minWidth: 250,
      filter: 'agTextColumnFilter',
      // ✅ EDITABLE with PrimeNG InputText
      editable: true,
      cellEditor: InputCellEditorComponent
    },
    { 
      field: 'filetype', 
      headerName: 'File Type',
      width: 120,
      filter: 'agTextColumnFilter'
    },
    { 
      field: 'fileFormat', 
      headerName: 'Format',
      width: 100,
      filter: 'agTextColumnFilter'
    },
    { 
      field: 'status', 
      headerName: 'Status',
      width: 140,
      cellRenderer: (params: { value: string }) => this.getStatusBadgeHtml(params.value, 'completion'),
      filter: 'agTextColumnFilter',
      // ✅ EDITABLE with PrimeNG Dropdown
      editable: true,
      cellEditor: DropdownCellEditorComponent,
      cellEditorParams: {
        options: [
          { label: 'Completed', value: 'completed' },
          { label: 'Pending', value: 'pending' },
          { label: 'Failed', value: 'failed' },
          { label: 'In Progress', value: 'in_progress' }
        ]
      }
    },
    { 
      field: 'TransactionStatus', 
      headerName: 'Transaction Status',
      width: 160,
      cellRenderer: (params: { value: string }) => this.getStatusBadgeHtml(params.value, 'status'),
      filter: 'agTextColumnFilter',
      // ✅ EDITABLE with PrimeNG Dropdown
      editable: true,
      cellEditor: DropdownCellEditorComponent,
      cellEditorParams: {
        options: [
          { label: 'Success', value: 'Success' },
          { label: 'Failed', value: 'Failed' },
          { label: 'Pending', value: 'Pending' }
        ]
      }
    },
    { 
      field: 'DataImported', 
      headerName: 'Data Imported',
      width: 140,
      cellRenderer: (params: { value: string }) => this.getStatusBadgeHtml(params.value, 'status'),
      filter: 'agTextColumnFilter',
      // ✅ EDITABLE with PrimeNG Dropdown
      editable: true,
      cellEditor: DropdownCellEditorComponent
    },
    { 
      field: 'DataValidated', 
      headerName: 'Data Validated',
      width: 140,
      cellRenderer: (params: { value: string }) => this.getStatusBadgeHtml(params.value, 'status'),
      filter: 'agTextColumnFilter',
      // ✅ EDITABLE with PrimeNG Dropdown
      editable: true,
      cellEditor: DropdownCellEditorComponent
    },
    { 
      field: 'MappingResolved', 
      headerName: 'Mapping Resolved',
      width: 160,
      cellRenderer: (params: { value: string }) => this.getStatusBadgeHtml(params.value, 'status'),
      filter: 'agTextColumnFilter',
      // ✅ EDITABLE with PrimeNG Dropdown
      editable: true,
      cellEditor: DropdownCellEditorComponent
    },
    { 
      field: 'uploadedOn', 
      headerName: 'Uploaded On',
      width: 180,
      valueFormatter: params => params.value ? new Date(params.value).toLocaleString() : '',
      filter: 'agDateColumnFilter',
      // ✅ EDITABLE with PrimeNG DatePicker
      editable: true,
      cellEditor: DatePickerCellEditorComponent,
      cellClass: 'editable-cell'
    },
    { 
      field: 'processedOn', 
      headerName: 'Processed On',
      width: 180,
      valueFormatter: params => params.value ? new Date(params.value).toLocaleString() : '',
      filter: 'agDateColumnFilter',
      // ✅ EDITABLE with PrimeNG DatePicker
      editable: true,
      cellEditor: DatePickerCellEditorComponent,
      cellClass: 'editable-cell'
    },
    { 
      field: 'TransactionType', 
      headerName: 'Transaction Type',
      width: 140,
      filter: 'agTextColumnFilter',
      editable: true,
    },
    { 
      field: 'MasterPackageName', 
      headerName: 'Master Package',
      width: 200,
      filter: 'agTextColumnFilter'
    },
    { 
      field: 'entityId', 
      headerName: 'Entity ID',
      width: 220,
      filter: 'agTextColumnFilter'
    },
    { 
      field: 'packageBundleId', 
      headerName: 'Bundle ID',
      width: 110,
      filter: 'agNumberColumnFilter'
    },
    { 
      field: 'EDIPackageImportGroupId', 
      headerName: 'Group ID',
      width: 110,
      filter: 'agNumberColumnFilter'
    },
    { 
      field: 'ErrorMessage', 
      headerName: 'Error Message',
      flex: 1,
      minWidth: 200,
      // Using cellStyle instead of cellClass - NO ng-deep needed!
      cellStyle: (params) => params.value ? { color: '#991b1b', fontWeight: '500' } : null,
      filter: 'agTextColumnFilter',
      // ✅ EDITABLE with PrimeNG InputText
      editable: true,
      cellEditor: InputCellEditorComponent
    },
  ];

  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 100,
  };

  ngOnInit(): void {
    // Get GUID from query parameters
    this.route.queryParams.subscribe(params => {
      this.guid = params['GUID'] || params['guid'] || 'bc7080e0-1afb-4ee3-b639-23eb0cfe185d_1LXy6u';
      
      if (this.guid) {
        this.fetchData();
      } else {
        this.error.set('GUID is required. Please provide GUID in query parameters (e.g., ?GUID=your-guid-here)');
      }
    });
  }

  private fetchData(): void {
    this.loading.set(true);
    this.error.set(null);

    const headers = new HttpHeaders({
      'accept': 'application/json, text/plain, */*',
      'authorization': `Bearer ${this.guid}`,
      'cache-control': 'no-cache',
      'pragma': 'no-cache'
    });

    const params = {
      TransactionType: 'TechPack',
      GUID: this.guid
    };

    this.http.get<ErrorResolutionData | ErrorResolutionData[]>(this.API_URL, { headers, params })
      .pipe(
        tap(response => {
          console.log('API Response:', response);
          
          // Handle the response - it could be an array or a single object
          const data: any = Array.isArray(response) ? response : [response];

          this.rowData.set(data[0].responseData);
          this.loading.set(false);

          // Auto-size columns after data is loaded
          if (this.gridApi) {
            setTimeout(() => this.gridApi.sizeColumnsToFit(), 100);
          }
        }),
        catchError(err => {
          console.error('API Error:', err);
          this.error.set(`Failed to fetch data: ${err.message || 'Unknown error'}`);
          this.loading.set(false);
          return of([]);
        })
      )
      .subscribe();
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    if (this.rowData().length > 0) {
      this.gridApi.sizeColumnsToFit();
    }
  }

  // Handle cell value changes from PrimeNG editors
  onCellValueChanged(event: CellValueChangedEvent): void {
    console.log('Cell Value Changed:', {
      field: event.colDef.field,
      oldValue: event.oldValue,
      newValue: event.newValue,
      rowData: event.data
    });

    // Here you can implement API call to save the changes
    // Example:
    // this.saveChanges(event.data);
  }
}
