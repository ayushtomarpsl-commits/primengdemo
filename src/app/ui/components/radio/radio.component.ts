// ============================================
// UI Radio Button Component
// PrimeNG RadioButton wrapper - upgrade-safe abstraction
// ============================================

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CommonModule } from '@angular/common';

export interface RadioOption<T = unknown> {
  label: string;
  value: T;
  disabled?: boolean;
}

@Component({
  selector: 'ui-radio-group',
  standalone: true,
  imports: [CommonModule, RadioButtonModule, FormsModule],
  template: `
    <div class="radio-group" [class]="styleClass">
      @for (option of options; track option.value) {
        <div class="radio-item">
          <p-radioButton
            [name]="name"
            [value]="option.value"
            [(ngModel)]="value"
            (ngModelChange)="onValueChange($event)"
            [disabled]="option.disabled || disabled"
            [inputId]="name + '_' + $index"
          />
          <label [for]="name + '_' + $index">{{ option.label }}</label>
        </div>
      }
    </div>
  `,
  styles: [`
    .radio-group {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-3);
    }

    .radio-group.horizontal {
      flex-direction: row;
      gap: var(--spacing-6);
    }

    .radio-item {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);

      label {
        cursor: pointer;
      }
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupComponent<T = unknown> implements ControlValueAccessor {
  @Input() options: RadioOption<T>[] = [];
  @Input() name = 'radio_' + Math.random().toString(36).substring(7);
  @Input() disabled = false;
  @Input() styleClass = '';

  @Output() onChange = new EventEmitter<T>();

  value: T | null = null;

  private onChangeFn: (value: T | null) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: T | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onValueChange(value: T | null): void {
    this.value = value;
    this.onChangeFn(value);
    this.onTouchedFn();
    if (value !== null) {
      this.onChange.emit(value);
    }
  }
}

