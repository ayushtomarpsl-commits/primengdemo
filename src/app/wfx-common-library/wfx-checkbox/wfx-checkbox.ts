import { Component, Input, Output, EventEmitter, forwardRef, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';

/**
 * Checkbox size types
 */
export type CheckboxSize = 'small' | 'large' | undefined;

/**
 * Checkbox variant types
 */
export type CheckboxVariant = 'outlined' | 'filled' | undefined;

/**
 * Checkbox change event interface
 */
export interface CheckboxChangeEvent {
  checked: boolean;
  originalEvent: Event;
}

/**
 * WfxCheckbox - A wrapper component for PrimeNG Checkbox
 * 
 * This component exposes all p-checkbox properties and provides
 * a consistent API for the WFX application.
 * 
 * @example
 * <wfx-checkbox [(ngModel)]="checked" label="Accept Terms"></wfx-checkbox>
 */
@Component({
  selector: 'wfx-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule, Checkbox],
  templateUrl: './wfx-checkbox.html',
  styleUrl: './wfx-checkbox.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WfxCheckbox),
      multi: true
    }
  ]
})
export class WfxCheckbox implements ControlValueAccessor {
  // ==================== INTERNAL STATE ====================
  
  modelValue: any = false;
  isDisabled: boolean = false;

  // ==================== BASIC PROPERTIES ====================

  /**
   * Value of the checkbox.
   */
  @Input() value: any;

  /**
   * Allows to select a boolean value instead of multiple values.
   * @default false
   */
  @Input({ transform: booleanAttribute }) binary: boolean = false;

  /**
   * Identifier of the focus input to match a label.
   */
  @Input() inputId: string | undefined;

  /**
   * Name of the input.
   */
  @Input() name: string | undefined;

  /**
   * When present, it specifies that the component should be disabled.
   * @default false
   */
  @Input({ transform: booleanAttribute }) disabled: boolean = false;

  /**
   * When present, it specifies that the component cannot be edited.
   * @default false
   */
  @Input({ transform: booleanAttribute }) readonly: boolean = false;

  /**
   * When present, it specifies that an input field must be filled out.
   * @default false
   */
  @Input({ transform: booleanAttribute }) required: boolean = false;

  /**
   * When present, it specifies that the component should automatically get focus.
   * @default false
   */
  @Input({ transform: booleanAttribute }) autofocus: boolean = false;

  /**
   * Index of the element in tabbing order.
   */
  @Input() tabindex: number | undefined;

  // ==================== STYLING PROPERTIES ====================

  /**
   * Specifies the size of the component.
   * @values 'small' | 'large'
   */
  @Input() size: CheckboxSize;

  /**
   * Specifies the input variant of the component.
   * @values 'outlined' | 'filled'
   */
  @Input() variant: CheckboxVariant;

  /**
   * When present, it specifies that the component should have invalid state style.
   * @default false
   */
  @Input({ transform: booleanAttribute }) invalid: boolean = false;

  /**
   * Style class of the component.
   */
  @Input() styleClass: string | undefined;

  /**
   * Inline style of the input element.
   */
  @Input() inputStyle: { [klass: string]: any } | undefined;

  /**
   * Style class of the input element.
   */
  @Input() inputClass: string | undefined;

  // ==================== STATE OPTIONS ====================

  /**
   * When present, it specifies input state as indeterminate.
   * @default false
   */
  @Input({ transform: booleanAttribute }) indeterminate: boolean = false;

  /**
   * Value in checked state.
   * @default true
   */
  @Input() trueValue: any = true;

  /**
   * Value in unchecked state.
   * @default false
   */
  @Input() falseValue: any = false;

  // ==================== ICON ====================

  /**
   * Icon class of the checkbox icon.
   */
  @Input() checkboxIcon: string | undefined;

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

  // ==================== ACCESSIBILITY ====================

  /**
   * Used to define a aria label attribute the current element.
   */
  @Input() ariaLabel: string | undefined;

  /**
   * Establishes relationships between the component and label(s).
   */
  @Input() ariaLabelledBy: string | undefined;

  // ==================== EVENTS ====================

  /**
   * Callback to invoke on value change.
   */
  @Output() onChange = new EventEmitter<CheckboxChangeEvent>();

  /**
   * Callback to invoke when the checkbox receives focus.
   */
  @Output() onFocus = new EventEmitter<Event>();

  /**
   * Callback to invoke when the checkbox loses focus.
   */
  @Output() onBlur = new EventEmitter<Event>();

  // ==================== CONTROL VALUE ACCESSOR ====================

  private onChangeCallback: (value: any) => void = () => {};
  private onTouchedCallback: () => void = () => {};

  writeValue(value: any): void {
    this.modelValue = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // ==================== EVENT HANDLERS ====================

  handleChange(event: any): void {
    this.onChangeCallback(this.modelValue);
    this.onChange.emit(event);
  }

  handleFocus(event: Event): void {
    this.onFocus.emit(event);
  }

  handleBlur(event: Event): void {
    this.onTouchedCallback();
    this.onBlur.emit(event);
  }

  // ==================== COMPUTED PROPERTIES ====================

  get isActuallyDisabled(): boolean {
    return this.disabled || this.isDisabled;
  }
}

