// ============================================
// PrimeNG DatePicker Cell Editor for AG Grid
// Custom cell editor using PrimeNG DatePicker
// Using PT (Pass Through) API for styling - NO ng-deep!
// ============================================

import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';

@Component({
  selector: 'app-datepicker-cell-editor',
  standalone: true,
  imports: [FormsModule, DatePicker],
  template: `
    <p-datepicker
      #datepicker
      [(ngModel)]="value"
      [showIcon]="true"
      [showButtonBar]="true"
      [dateFormat]="dateFormat"
      appendTo="body"
      (onSelect)="onDateSelect()"
      (onClose)="onClose()"
      [pt]="datepickerPT"
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
export class DatePickerCellEditorComponent implements ICellEditorAngularComp, AfterViewInit {
  @ViewChild('datepicker') datepicker!: DatePicker;
  
  value: Date | null = null;
  dateFormat = 'mm/dd/yy';
  private params!: ICellEditorParams;

  // PT (Pass Through) configuration for DatePicker styling
  datepickerPT = {
    root: {
      style: {
        width: '100%'
      }
    },
    pcInput: {
      root: {
        style: {
          width: '100%',
          height: '100%',
          border: '2px solid var(--color-primary)',
          borderRadius: '4px',
          padding: '0 8px',
          fontSize: '14px',
          outline: 'none',
          boxSizing: 'border-box'
        }
      }
    },
    dropdown: {
      root: {
        style: {
          background: 'var(--color-primary)',
          borderColor: 'var(--color-primary)'
        }
      }
    },
    panel: {
      style: {
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
      }
    }
  };

  agInit(params: ICellEditorParams): void {
    this.params = params;
    
    // Convert string date to Date object
    if (params.value) {
      this.value = new Date(params.value);
    }
  }

  ngAfterViewInit(): void {
    // Focus and open the datepicker after view is initialized
    setTimeout(() => {
      if (this.datepicker) {
        this.datepicker.showOverlay();
      }
    }, 100);
  }

  getValue(): string {
    // Return ISO string format for the date
    return this.value ? this.value.toISOString() : '';
  }

  isPopup(): boolean {
    return false;
  }

  onDateSelect(): void {
    // Optionally auto-close after selection
    // this.params.stopEditing();
  }

  onClose(): void {
    // Stop editing when datepicker closes
    this.params.stopEditing();
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
