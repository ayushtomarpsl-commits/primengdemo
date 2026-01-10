// ============================================
// WFX Prime Component
// AG-Grid implementation with WFX API data
// ============================================

import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
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
  Theme
} from 'ag-grid-community';
import { catchError, of, tap } from 'rxjs';

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
        <p class="wfx-prime__subtitle">Error Resolution Data Grid powered by AG-Grid</p>
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
          [theme]="theme"
          [rowData]="rowData()"
          [columnDefs]="columnDefs"
          [defaultColDef]="defaultColDef"
          [animateRows]="true"
          [pagination]="true"
          [paginationPageSize]="10"
          [paginationPageSizeSelector]="[10, 25, 50]"
          (gridReady)="onGridReady($event)"
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
      }
    }

    .wfx-prime__subtitle {
      color: var(--lightgrey);
      margin-bottom: var(--spacing-6);
    }

    .wfx-prime__loading {
      display: flex;
      align-items: center;
      gap: var(--spacing-3);
      padding: var(--spacing-4);
      background: #e0f2fe;
      border-radius: var(--radius-md);
      margin-bottom: var(--spacing-4);
      color: #0369a1;

      i {
        font-size: 1.25rem;
      }
    }

    .wfx-prime__error {
      display: flex;
      align-items: center;
      gap: var(--spacing-3);
      padding: var(--spacing-4);
      background: #fee2e2;
      border-radius: var(--radius-md);
      margin-bottom: var(--spacing-4);
      color: #991b1b;

      i {
        font-size: 1.25rem;
      }
    }

    .wfx-prime__grid-container {
      background: var(--color-white);
      border: 1px solid var(--greyborder);
      border-radius: var(--radius-lg);
      box-shadow: var(--card-box-shadow);
      padding: var(--spacing-4);
      overflow: hidden;
    }

    .wfx-prime__grid {
      width: 100%;
      height: 600px;
    }

    :host ::ng-deep {
      .status-success {
        background: #dcfce7;
        color: #166534;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 500;
      }

      .status-error {
        background: #fee2e2;
        color: #991b1b;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 500;
      }

      .status-pending {
        background: #fef3c7;
        color: #92400e;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 500;
      }

      .error-cell {
        color: #991b1b;
        font-weight: 500;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WfxPrimeComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  private gridApi!: GridApi;

  // AG Grid Theme - using new Theming API
  readonly theme: Theme = themeQuartz.withParams({
    headerBackgroundColor: '#f8fafc',
    headerTextColor: '#334155',
    oddRowBackgroundColor: '#fafbfc',
    rowHoverColor: '#e0f2fe',
    selectedRowBackgroundColor: '#dbeafe',
    fontSize: 14,
    borderColor: '#e2e8f0',
    rowBorder: { color: '#f1f5f9', width: 1, style: 'solid' },
  });

  // Signals for reactive state
  readonly rowData = signal<ErrorResolutionData[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  
  // GUID from query params
  private guid = '';

  // API Configuration
  private readonly API_URL = 'https://wfxqa.worldfashionexchange.com/WFXDotNetCoreAPI/WFXWebAIAPI/api/WFXAI/GetErrorResolutionData';

  // Column definitions based on API response structure
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
      filter: 'agTextColumnFilter'
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
      width: 120,
      cellRenderer: (params: { value: string }) => {
        const status = params.value?.toLowerCase();
        const statusClass = status === 'completed' ? 'status-success' : 
                           status === 'failed' ? 'status-error' : 'status-pending';
        return `<span class="${statusClass}">${params.value || ''}</span>`;
      },
      filter: 'agTextColumnFilter'
    },
    { 
      field: 'TransactionStatus', 
      headerName: 'Transaction Status',
      width: 150,
      cellRenderer: (params: { value: string }) => {
        const status = params.value?.toLowerCase();
        const statusClass = status === 'success' ? 'status-success' : 
                           status === 'failed' ? 'status-error' : 'status-pending';
        return `<span class="${statusClass}">${params.value || ''}</span>`;
      },
      filter: 'agTextColumnFilter'
    },
    { 
      field: 'DataImported', 
      headerName: 'Data Imported',
      width: 130,
      cellRenderer: (params: { value: string }) => {
        const status = params.value?.toLowerCase();
        const statusClass = status === 'success' ? 'status-success' : 
                           status === 'failed' ? 'status-error' : 'status-pending';
        return `<span class="${statusClass}">${params.value || ''}</span>`;
      },
      filter: 'agTextColumnFilter'
    },
    { 
      field: 'DataValidated', 
      headerName: 'Data Validated',
      width: 130,
      cellRenderer: (params: { value: string }) => {
        const status = params.value?.toLowerCase();
        const statusClass = status === 'success' ? 'status-success' : 
                           status === 'failed' ? 'status-error' : 'status-pending';
        return `<span class="${statusClass}">${params.value || ''}</span>`;
      },
      filter: 'agTextColumnFilter'
    },
    { 
      field: 'MappingResolved', 
      headerName: 'Mapping Resolved',
      width: 150,
      cellRenderer: (params: { value: string }) => {
        const status = params.value?.toLowerCase();
        const statusClass = status === 'success' ? 'status-success' : 
                           status === 'failed' ? 'status-error' : 'status-pending';
        return `<span class="${statusClass}">${params.value || ''}</span>`;
      },
      filter: 'agTextColumnFilter'
    },
    { 
      field: 'uploadedOn', 
      headerName: 'Uploaded On',
      width: 170,
      valueFormatter: params => params.value ? new Date(params.value).toLocaleString() : '',
      filter: 'agDateColumnFilter'
    },
    { 
      field: 'processedOn', 
      headerName: 'Processed On',
      width: 170,
      valueFormatter: params => params.value ? new Date(params.value).toLocaleString() : '',
      filter: 'agDateColumnFilter'
    },
    { 
      field: 'TransactionType', 
      headerName: 'Transaction Type',
      width: 140,
      filter: 'agTextColumnFilter'
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
      cellClass: (params) => params.value ? 'error-cell' : '',
      filter: 'agTextColumnFilter'
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
      this.guid = params['GUID'] || params['guid'] || '';
      
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
}
