// ============================================
// UI Textarea Component
// PrimeNG Textarea wrapper - upgrade-safe abstraction
// ============================================

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'ui-textarea',
  standalone: true,
  imports: [TextareaModule, FormsModule],
  template: `
    <textarea
      pTextarea
      [(ngModel)]="value"
      (ngModelChange)="onValueChange($event)"
      [placeholder]="placeholder"
      [disabled]="disabled"
      [readonly]="readonly"
      [rows]="rows"
      [cols]="cols"
      [autoResize]="autoResize"
      [class]="styleClass"
      (blur)="onBlur.emit($event)"
      (focus)="onFocus.emit($event)"
    ></textarea>
  `,
  styles: [`
    :host {
      display: block;
    }
    textarea {
      width: 100%;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent implements ControlValueAccessor {
  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() rows = 5;
  @Input() cols = 30;
  @Input() autoResize = false;
  @Input() styleClass = '';

  @Output() onBlur = new EventEmitter<FocusEvent>();
  @Output() onFocus = new EventEmitter<FocusEvent>();

  value = '';

  private onChangeFn: (value: string) => void = () => {};
  private onTouchedFn: () => void = () => {};

  writeValue(value: string): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onValueChange(value: string): void {
    this.value = value;
    this.onChangeFn(value);
    this.onTouchedFn();
  }
}

