// ============================================
// PrimeNG Dropdown Cell Editor for AG Grid
// Custom cell editor using PrimeNG Select/Dropdown
// Using PT (Pass Through) API for styling - NO ng-deep!
// ============================================

import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';

interface DropdownOption {
  label: string;
  value: string;
}

// Extended params interface to include custom options
interface DropdownCellEditorParams extends ICellEditorParams {
  options?: DropdownOption[];
}

@Component({
  selector: 'app-dropdown-cell-editor',
  standalone: true,
  imports: [FormsModule, Select],
  template: `
    <p-select
      #dropdown
      [(ngModel)]="value"
      [options]="options"
      optionLabel="label"
      optionValue="value"
      appendTo="body"
      [showClear]="false"
      (onChange)="onSelect()"
      placeholder="Select..."
      [pt]="selectPT"
    />
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `]
})
export class DropdownCellEditorComponent implements ICellEditorAngularComp, AfterViewInit {
  @ViewChild('dropdown') dropdown!: Select;
  
  value: string = '';
  options: DropdownOption[] = [];
  private params!: DropdownCellEditorParams;

  // PT (Pass Through) configuration for Select/Dropdown styling
  selectPT = {
    root: {
      style: {
        width: '100%',
        height: '100%',
        border: '2px solid var(--color-primary)',
        borderRadius: '4px',
        background: 'var(--surface-card)'
      }
    },
    label: {
      style: {
        padding: '0 8px',
        fontSize: '14px',
        color: 'var(--darkgrey)',
        display: 'flex',
        alignItems: 'center'
      }
    },
    dropdown: {
      style: {
        background: 'var(--color-primary)',
        color: 'white',
        borderRadius: '0 2px 2px 0'
      }
    },
    listContainer: {
      style: {
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        border: '1px solid var(--greyborder)'
      }
    },
    list: {
      style: {
        padding: '4px'
      }
    },
    option: {
      style: {
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '14px',
        color: 'var(--darkgrey)'
      }
    },
    optionGroup: {
      style: {
        fontWeight: '600'
      }
    }
  };

  agInit(params: DropdownCellEditorParams): void {
    this.params = params;
    this.value = params.value || '';
    
    // Get options from params or use default status options
    this.options = params.options || [
      { label: 'Success', value: 'Success' },
      { label: 'Failed', value: 'Failed' },
      { label: 'Pending', value: 'Pending' },
      { label: 'In Progress', value: 'In Progress' }
    ];
  }

  ngAfterViewInit(): void {
    // Open the dropdown after view is initialized
    setTimeout(() => {
      if (this.dropdown) {
        this.dropdown.show();
      }
    }, 100);
  }

  getValue(): string {
    return this.value;
  }

  isPopup(): boolean {
    return false;
  }

  onSelect(): void {
    // Stop editing after selection
    setTimeout(() => {
      this.params.stopEditing();
    }, 100);
  }

  // Called when editing is about to start
  isCancelBeforeStart(): boolean {
    return false;
  }

  // Called when editing is about to end
  isCancelAfterEnd(): boolean {
    return false;
  }
}
