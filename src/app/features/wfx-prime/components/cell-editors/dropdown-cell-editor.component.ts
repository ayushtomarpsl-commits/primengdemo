// ============================================
// PrimeNG Dropdown Cell Editor for AG Grid
// Custom cell editor using PrimeNG Select/Dropdown
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
      styleClass="ag-cell-dropdown"
      placeholder="Select..."
    />
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    :host ::ng-deep {
      .p-select {
        width: 100%;
        height: 100%;
        border: 2px solid #3b82f6;
        border-radius: 4px;
      }

      .ag-cell-dropdown {
        width: 100%;
      }

      .p-select .p-select-label {
        padding: 0 8px;
        font-size: 14px;
      }
    }
  `]
})
export class DropdownCellEditorComponent implements ICellEditorAngularComp, AfterViewInit {
  @ViewChild('dropdown') dropdown!: Select;
  
  value: string = '';
  options: DropdownOption[] = [];
  private params!: DropdownCellEditorParams;

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

