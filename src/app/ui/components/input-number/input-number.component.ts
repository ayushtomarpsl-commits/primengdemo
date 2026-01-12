// ============================================
// UI InputNumber Component
// PrimeNG InputNumber wrapper - upgrade-safe abstraction
// Using PT (Pass Through) for styling - NO ng-deep!
// ============================================

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'ui-input-number',
  standalone: true,
  imports: [InputNumberModule, FormsModule],
  template: `
    <p-inputNumber
      [(ngModel)]="value"
      (ngModelChange)="onValueChange($event)"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [min]="min"
      [max]="max"
      [step]="step"
      [showButtons]="showButtons"
      [buttonLayout]="buttonLayout"
      [mode]="mode"
      [currency]="currency"
      [locale]="locale"
      [prefix]="prefix"
      [suffix]="suffix"
      [minFractionDigits]="minFractionDigits"
      [maxFractionDigits]="maxFractionDigits"
      [styleClass]="styleClass"
      [inputStyleClass]="'w-full'"
      (onBlur)="handleBlur($event)"
      (onFocus)="handleFocus($event)"
      [pt]="inputNumberPT"
    />
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputNumberComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputNumberComponent implements ControlValueAccessor {
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() min: number | null = null;
  @Input() max: number | null = null;
  @Input() step = 1;
  @Input() showButtons = false;
  @Input() buttonLayout: 'stacked' | 'horizontal' | 'vertical' = 'stacked';
  @Input() mode: 'decimal' | 'currency' = 'decimal';
  @Input() currency = 'USD';
  @Input() locale = 'en-US';
  @Input() prefix = '';
  @Input() suffix = '';
  @Input() minFractionDigits: number | null = null;
  @Input() maxFractionDigits: number | null = null;
  @Input() styleClass = '';

  @Output() onBlur = new EventEmitter<Event>();
  @Output() onFocus = new EventEmitter<Event>();

  value: number | null = null;

  // PT (Pass Through) for styling - replaces ::ng-deep
  inputNumberPT = {
    root: {
      style: {
        width: '100%'
      }
    }
  };

  private onChangeFn: (value: number | null) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: number | null): void {
    this.value = value;
  }

  registerOnChange(fn: (value: number | null) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onValueChange(value: number | null): void {
    this.value = value;
    this.onChangeFn(value);
    this.onTouchedFn();
  }

  handleBlur(event: Event): void {
    this.onBlur.emit(event);
  }

  handleFocus(event: Event): void {
    this.onFocus.emit(event);
  }
}
