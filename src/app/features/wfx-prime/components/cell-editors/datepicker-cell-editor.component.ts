// ============================================
// PrimeNG DatePicker Cell Editor for AG Grid
// Custom cell editor using PrimeNG DatePicker
// ============================================

import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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
      styleClass="ag-cell-datepicker"
    />
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    :host ::ng-deep {
      .p-datepicker {
        width: 100%;
      }

      .p-datepicker input {
        width: 100%;
        height: 100%;
        border: none;
        padding: 0 8px;
        font-size: 14px;
      }

      .ag-cell-datepicker {
        width: 100%;
      }
    }
  `]
})
export class DatePickerCellEditorComponent implements ICellEditorAngularComp, AfterViewInit {
  @ViewChild('datepicker') datepicker!: DatePicker;
  
  value: Date | null = null;
  dateFormat = 'mm/dd/yy';
  private params!: ICellEditorParams;

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

