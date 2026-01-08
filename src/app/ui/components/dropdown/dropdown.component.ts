// ============================================
// UI Dropdown Component
// PrimeNG Select wrapper - upgrade-safe abstraction
// ============================================

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectModule } from 'primeng/select';

export interface DropdownOption<T = unknown> {
  label: string;
  value: T;
  disabled?: boolean;
}

@Component({
  selector: 'ui-dropdown',
  standalone: true,
  imports: [SelectModule, FormsModule],
  template: `
    <p-select
      [options]="options"
      [optionLabel]="optionLabel"
      [optionValue]="optionValue"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [showClear]="showClear"
      [filter]="filter"
      [filterPlaceholder]="filterPlaceholder"
      [styleClass]="styleClass"
      [(ngModel)]="value"
      (ngModelChange)="onValueChange($event)"
      (onChange)="onChange.emit($event)"
    />
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent<T = unknown> implements ControlValueAccessor {
  @Input() options: DropdownOption<T>[] = [];
  @Input() optionLabel = 'label';
  @Input() optionValue = 'value';
  @Input() placeholder = 'Select an option';
  @Input() disabled = false;
  @Input() showClear = false;
  @Input() filter = false;
  @Input() filterPlaceholder = 'Search...';
  @Input() styleClass = '';

  @Output() onChange = new EventEmitter<{ value: T }>();

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
  }
}

