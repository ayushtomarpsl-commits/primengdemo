// ============================================
// UI Checkbox Component
// PrimeNG Checkbox wrapper - upgrade-safe abstraction
// ============================================

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CheckboxModule, CheckboxChangeEvent } from 'primeng/checkbox';

@Component({
  selector: 'ui-checkbox',
  standalone: true,
  imports: [CheckboxModule, FormsModule],
  template: `
    <div class="checkbox-wrapper">
      <p-checkbox
        [(ngModel)]="value"
        (ngModelChange)="onValueChange($event)"
        [binary]="binary"
        [disabled]="disabled"
        [inputId]="inputId"
        [styleClass]="styleClass"
        (onChange)="onCheckboxChange($event)"
      />
      @if (label) {
        <label [for]="inputId" class="checkbox-label">{{ label }}</label>
      }
    </div>
  `,
  styles: [`
    .checkbox-wrapper {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .checkbox-label {
      cursor: pointer;
      user-select: none;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() disabled = false;
  @Input() binary = true;
  @Input() inputId = '';
  @Input() styleClass = '';

  @Output() onChange = new EventEmitter<{ checked: boolean }>();

  value = false;

  private onChangeFn: (value: boolean) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: boolean): void {
    this.value = value ?? false;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onValueChange(value: boolean): void {
    this.value = value;
    this.onChangeFn(value);
    this.onTouchedFn();
  }

  onCheckboxChange(event: CheckboxChangeEvent): void {
    this.onChange.emit({ checked: event.checked ?? false });
  }
}

