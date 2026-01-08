// ============================================
// UI MultiSelect Component
// PrimeNG MultiSelect wrapper - upgrade-safe abstraction
// ============================================

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';

export interface MultiSelectOption<T = unknown> {
  label: string;
  value: T;
  disabled?: boolean;
}

@Component({
  selector: 'ui-multiselect',
  standalone: true,
  imports: [MultiSelectModule, FormsModule],
  template: `
    <p-multiselect
      [(ngModel)]="value"
      (ngModelChange)="onValueChange($event)"
      [options]="options"
      [optionLabel]="optionLabel"
      [optionValue]="optionValue"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [showClear]="showClear"
      [filter]="filter"
      [maxSelectedLabels]="maxSelectedLabels"
      [selectedItemsLabel]="selectedItemsLabel"
      [display]="display"
      [styleClass]="styleClass"
      (onChange)="onChange.emit($event)"
    />
  `,
  styles: [`
    :host {
      display: block;
    }
    :host ::ng-deep .p-multiselect {
      width: 100%;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectComponent<T = unknown> implements ControlValueAccessor {
  @Input() options: MultiSelectOption<T>[] = [];
  @Input() optionLabel = 'label';
  @Input() optionValue = 'value';
  @Input() placeholder = 'Select items';
  @Input() disabled = false;
  @Input() showClear = false;
  @Input() filter = true;
  @Input() maxSelectedLabels = 3;
  @Input() selectedItemsLabel = '{0} items selected';
  @Input() display: 'comma' | 'chip' = 'comma';
  @Input() styleClass = '';

  @Output() onChange = new EventEmitter<{ value: T[] }>();

  value: T[] = [];

  private onChangeFn: (value: T[]) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: T[]): void {
    this.value = value ?? [];
  }

  registerOnChange(fn: (value: T[]) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onValueChange(value: T[]): void {
    this.value = value;
    this.onChangeFn(value);
    this.onTouchedFn();
  }
}

