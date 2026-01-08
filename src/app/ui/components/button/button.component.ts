// ============================================
// UI Button Component
// PrimeNG Button wrapper - upgrade-safe abstraction
// ============================================

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | 'outlined';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonSeverity = 'secondary' | 'success' | 'info' | 'warn' | 'danger' | 'help' | 'contrast' | null | undefined;

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [ButtonModule],
  template: `
    <p-button
      [label]="label"
      [icon]="icon"
      [iconPos]="iconPos"
      [loading]="loading"
      [disabled]="disabled"
      [severity]="mappedSeverity"
      [text]="variant === 'text'"
      [outlined]="variant === 'outlined'"
      [size]="mappedSize"
      [styleClass]="styleClass"
      (onClick)="onClick.emit($event)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() label = '';
  @Input() icon = '';
  @Input() iconPos: 'left' | 'right' | 'top' | 'bottom' = 'left';
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'medium';
  @Input() loading = false;
  @Input() disabled = false;
  @Input() styleClass = '';

  @Output() onClick = new EventEmitter<MouseEvent>();

  get mappedSeverity(): ButtonSeverity {
    const severityMap: Record<ButtonVariant, ButtonSeverity> = {
      primary: undefined,
      secondary: 'secondary',
      success: 'success',
      warning: 'warn',
      danger: 'danger',
      info: 'info',
      text: undefined,
      outlined: undefined,
    };
    return severityMap[this.variant];
  }

  get mappedSize(): 'small' | 'large' | undefined {
    const sizeMap: Record<ButtonSize, 'small' | 'large' | undefined> = {
      small: 'small',
      medium: undefined,
      large: 'large',
    };
    return sizeMap[this.size];
  }
}

