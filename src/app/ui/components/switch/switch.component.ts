// ============================================
// UI Switch/Toggle Component
// PrimeNG ToggleSwitch wrapper - upgrade-safe abstraction
// ============================================

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'ui-switch',
  standalone: true,
  imports: [ToggleSwitchModule, FormsModule],
  template: `
    <div class="switch-wrapper">
      <p-toggleswitch
        [(ngModel)]="value"
        (ngModelChange)="onValueChange($event)"
        [disabled]="disabled"
        [inputId]="inputId"
        [styleClass]="styleClass"
        (onChange)="onChange.emit($event)"
      />
      @if (label) {
        <label [for]="inputId" class="switch-label">{{ label }}</label>
      }
    </div>
  `,
  styles: [`
    .switch-wrapper {
      display: flex;
      align-items: center;
      gap: var(--spacing-3);
    }

    .switch-label {
      cursor: pointer;
      user-select: none;
    }
  `],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchComponent implements ControlValueAccessor {
  @Input() label = '';
  @Input() disabled = false;
  @Input() inputId = 'switch_' + Math.random().toString(36).substring(7);
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
}

