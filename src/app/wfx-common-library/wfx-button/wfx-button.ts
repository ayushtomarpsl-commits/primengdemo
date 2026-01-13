import { Component, Input, Output, EventEmitter, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { ButtonProps } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';

/**
 * Button severity types
 */
export type ButtonSeverity = 'success' | 'info' | 'warn' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast' | null | undefined;

/**
 * Button icon position
 */
export type ButtonIconPosition = 'left' | 'right' | 'top' | 'bottom';

/**
 * Button size
 */
export type ButtonSize = 'small' | 'large' | undefined;

/**
 * Button variant
 */
export type ButtonVariant = 'text' | 'outlined' | undefined;

/**
 * Badge severity types
 */
export type BadgeSeverity = 'success' | 'info' | 'warn' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast';

/**
 * WfxButton - A wrapper component for PrimeNG Button
 * 
 * This component exposes all p-button properties and provides
 * a consistent API for the WFX application.
 * 
 * @example
 * <wfx-button label="Submit" severity="primary" (onClick)="onSubmit()"></wfx-button>
 * <wfx-button label="Cancel" severity="secondary" [outlined]="true"></wfx-button>
 * <wfx-button icon="pi pi-check" [rounded]="true" [text]="true"></wfx-button>
 */
@Component({
  selector: 'wfx-button',
  standalone: true,
  imports: [CommonModule, Button, BadgeModule],
  templateUrl: './wfx-button.html',
  styleUrl: './wfx-button.scss',
})
export class WfxButton {
  // ==================== BASIC PROPERTIES ====================

  /**
   * Text of the button.
   */
  @Input() label: string | undefined;

  /**
   * Type of the button.
   * @default 'button'
   */
  @Input() type: string = 'button';

  /**
   * Name of the icon.
   * @example 'pi pi-check', 'pi pi-times'
   */
  @Input() icon: string | undefined;

  /**
   * Position of the icon.
   * @default 'left'
   */
  @Input() iconPos: ButtonIconPosition = 'left';

  /**
   * When present, it specifies that the component should be disabled.
   * @default false
   */
  @Input({ transform: booleanAttribute }) disabled: boolean = false;

  /**
   * When present, it specifies that the component should automatically get focus on load.
   * @default false
   */
  @Input({ transform: booleanAttribute }) autofocus: boolean = false;

  /**
   * Add a tabindex to the button.
   */
  @Input() tabindex: number | undefined;

  // ==================== STYLING PROPERTIES ====================

  /**
   * Defines the style of the button.
   * @values 'success' | 'info' | 'warn' | 'danger' | 'help' | 'primary' | 'secondary' | 'contrast'
   */
  @Input() severity: ButtonSeverity;

  /**
   * Defines the size of the button.
   * @values 'small' | 'large'
   */
  @Input() size: ButtonSize;

  /**
   * Specifies the variant of the component.
   * @values 'text' | 'outlined'
   */
  @Input() variant: ButtonVariant;

  /**
   * Add a shadow to indicate elevation.
   * @default false
   */
  @Input({ transform: booleanAttribute }) raised: boolean = false;

  /**
   * Add a circular border radius to the button.
   * @default false
   */
  @Input({ transform: booleanAttribute }) rounded: boolean = false;

  /**
   * Add a textual class to the button without a background initially.
   * @default false
   */
  @Input({ transform: booleanAttribute }) text: boolean = false;

  /**
   * Add a plain textual class to the button without a background initially.
   * @default false
   */
  @Input({ transform: booleanAttribute }) plain: boolean = false;

  /**
   * Add a border class without a background initially.
   * @default false
   */
  @Input({ transform: booleanAttribute }) outlined: boolean = false;

  /**
   * Add a link style to the button.
   * @default false
   */
  @Input({ transform: booleanAttribute }) link: boolean = false;

  /**
   * Spans 100% width of the container when enabled.
   * @default false
   */
  @Input({ transform: booleanAttribute }) fluid: boolean = false;

  /**
   * Inline style of the element.
   */
  @Input() style: { [klass: string]: any } | undefined;

  /**
   * Class of the element.
   */
  @Input() styleClass: string | undefined;

  // ==================== LOADING STATE ====================

  /**
   * Whether the button is in loading state.
   * @default false
   */
  @Input({ transform: booleanAttribute }) loading: boolean = false;

  /**
   * Icon to display in loading state.
   * @default 'pi pi-spinner pi-spin'
   */
  @Input() loadingIcon: string | undefined;

  // ==================== BADGE PROPERTIES ====================

  /**
   * Value of the badge.
   */
  @Input() badge: string | undefined;

  /**
   * Severity type of the badge.
   * @default 'secondary'
   */
  @Input() badgeSeverity: BadgeSeverity = 'secondary';

  /**
   * Style class of the badge.
   * @deprecated use badgeSeverity instead.
   */
  @Input() badgeClass: string | undefined;

  // ==================== ACCESSIBILITY ====================

  /**
   * Used to define a string that labels the current element (accessibility).
   */
  @Input() ariaLabel: string | undefined;

  // ==================== PASS THROUGH ====================

  /**
   * Used to pass attributes to DOM elements inside the component.
   */
  @Input() pt: any;

  /**
   * Used to configure passthrough(pt) options of the component.
   */
  @Input() ptOptions: any;

  /**
   * Defines scoped design tokens of the component.
   */
  @Input() dt: object | undefined;

  /**
   * Indicates whether the component should be rendered without styles.
   * @default false
   */
  @Input({ transform: booleanAttribute }) unstyled: boolean = false;

  /**
   * Used to pass all properties of the ButtonProps to the Button component.
   */
  @Input() buttonProps: ButtonProps | undefined;

  // ==================== EVENTS ====================

  /**
   * Callback to execute when button is clicked.
   */
  @Output() onClick = new EventEmitter<MouseEvent>();

  /**
   * Callback to execute when button is focused.
   */
  @Output() onFocus = new EventEmitter<FocusEvent>();

  /**
   * Callback to execute when button loses focus.
   */
  @Output() onBlur = new EventEmitter<FocusEvent>();

  // ==================== EVENT HANDLERS ====================

  handleClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.onClick.emit(event);
    }
  }

  handleFocus(event: FocusEvent): void {
    this.onFocus.emit(event);
  }

  handleBlur(event: FocusEvent): void {
    this.onBlur.emit(event);
  }
}

