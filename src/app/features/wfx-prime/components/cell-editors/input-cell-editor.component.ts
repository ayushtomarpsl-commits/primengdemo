// ============================================
// PrimeNG InputText Cell Editor for AG Grid
// Custom cell editor using PrimeNG InputText
// ============================================

import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ICellEditorParams } from 'ag-grid-community';

@Component({
  selector: 'app-input-cell-editor',
  standalone: true,
  imports: [FormsModule, InputText],
  template: `
    <input 
      #inputField
      type="text"
      pInputText
      [(ngModel)]="value"
      (keydown)="onKeyDown($event)"
      class="cell-input"
    />
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }

    .cell-input {
      width: 100%;
      height: 100%;
      border: 2px solid #3b82f6;
      border-radius: 4px;
      padding: 0 8px;
      font-size: 14px;
      outline: none;
      box-sizing: border-box;

      &:focus {
        border-color: #2563eb;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
      }
    }
  `]
})
export class InputCellEditorComponent implements ICellEditorAngularComp, AfterViewInit {
  @ViewChild('inputField') inputField!: ElementRef<HTMLInputElement>;
  
  value: string = '';
  private params!: ICellEditorParams;

  agInit(params: ICellEditorParams): void {
    this.params = params;
    this.value = params.value || '';
  }

  ngAfterViewInit(): void {
    // Focus the input after view is initialized
    setTimeout(() => {
      if (this.inputField?.nativeElement) {
        this.inputField.nativeElement.focus();
        this.inputField.nativeElement.select();
      }
    }, 50);
  }

  getValue(): string {
    return this.value;
  }

  isPopup(): boolean {
    return false;
  }

  onKeyDown(event: KeyboardEvent): void {
    // Handle Enter key to stop editing
    if (event.key === 'Enter') {
      this.params.stopEditing();
    }
    // Handle Escape key to cancel editing
    if (event.key === 'Escape') {
      this.params.stopEditing(true); // true = cancel
    }
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

