// ============================================
// UI DatePicker Component
// PrimeNG DatePicker wrapper - upgrade-safe abstraction
// ============================================

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'ui-datepicker',
  standalone: true,
  imports: [DatePickerModule, FormsModule],
  template: `
    <p-datepicker
      [(ngModel)]="value"
      (ngModelChange)="onValueChange($event)"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [showIcon]="showIcon"
      [showTime]="showTime"
      [showSeconds]="showSeconds"
      [dateFormat]="dateFormat"
      [minDate]="minDate"
      [maxDate]="maxDate"
      [selectionMode]="selectionMode"
      [showButtonBar]="showButtonBar"
      [styleClass]="styleClass"
      [inputStyleClass]="'w-full'"
      (onSelect)="onSelect.emit($event)"
    />
  `,
  styles: [`
    :host {
      display: block;
    }
    :host ::ng-deep .p-datepicker {
      width: 100%;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent implements ControlValueAccessor {
  @Input() placeholder = 'Select date';
  @Input() disabled = false;
  @Input() showIcon = true;
  @Input() showTime = false;
  @Input() showSeconds = false;
  @Input() dateFormat = 'mm/dd/yy';
  @Input() minDate: Date | null = null;
  @Input() maxDate: Date | null = null;
  @Input() selectionMode: 'single' | 'multiple' | 'range' = 'single';
  @Input() showButtonBar = false;
  @Input() styleClass = '';

  @Output() onSelect = new EventEmitter<Date>();

  value: Date | Date[] | null = null;

  private onChangeFn: (value: Date | Date[] | null) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: Date | Date[] | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: Date | Date[] | null) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onValueChange(value: Date | Date[] | null): void {
    this.value = value;
    this.onChangeFn(value);
    this.onTouchedFn();
  }
}

