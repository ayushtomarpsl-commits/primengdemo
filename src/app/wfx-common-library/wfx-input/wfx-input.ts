import { Component, Input, Output, EventEmitter, forwardRef, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { InputText } from 'primeng/inputtext';

/**
 * Input size types
 */
export type InputSize = 'small' | 'large' | undefined;

/**
 * Input variant types
 */
export type InputVariant = 'outlined' | 'filled' | undefined;

/**
 * Input types
 */
export type InputType = 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';

/**
 * WfxInput - A wrapper component for PrimeNG InputText
 * 
 * This component exposes all pInputText properties and provides
 * a consistent API for the WFX application. It also implements
 * ControlValueAccessor for seamless form integration.
 * 
 * @example
 * <wfx-input [(ngModel)]="name" placeholder="Enter name"></wfx-input>
 * <wfx-input [(ngModel)]="email" type="email" [invalid]="hasError"></wfx-input>
 * <wfx-input [(ngModel)]="search" pSize="large" [fluid]="true"></wfx-input>
 */
@Component({
  selector: 'wfx-input',
  standalone: true,
  imports: [CommonModule, FormsModule, InputText],
  templateUrl: './wfx-input.html',
  styleUrl: './wfx-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WfxInput),
      multi: true
    }
  ]
})
export class WfxInput implements ControlValueAccessor {
  // ==================== INTERNAL STATE ====================
  
  /**
   * Internal value for the input
   */
  value: string = '';

  /**
   * Disabled state managed by forms
   */
  isDisabled: boolean = false;

  // ==================== BASIC PROPERTIES ====================

  /**
   * Type of the input element.
   * @default 'text'
   */
  @Input() type: InputType = 'text';

  /**
   * Placeholder text for the input.
   */
  @Input() placeholder: string = '';

  /**
   * When present, it specifies that the component should be disabled.
   * @default false
   */
  @Input({ transform: booleanAttribute }) disabled: boolean = false;

  /**
   * When present, it specifies that the input is read-only.
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
   * Identifier of the input element.
   */
  @Input() inputId: string | undefined;

  /**
   * Name of the input element.
   */
  @Input() name: string | undefined;

  /**
   * Add a tabindex to the input.
   */
  @Input() tabindex: number | undefined;

  /**
   * Maximum length of text allowed.
   */
  @Input() maxlength: number | undefined;

  /**
   * Minimum length of text required.
   */
  @Input() minlength: number | undefined;

  /**
   * Pattern to validate the input.
   */
  @Input() pattern: string | undefined;

  /**
   * Autocomplete attribute for the input.
   */
  @Input() autocomplete: string | undefined;

  // ==================== STYLING PROPERTIES ====================

  /**
   * Defines the size of the component.
   * @values 'small' | 'large'
   */
  @Input() pSize: InputSize;

  /**
   * Specifies the input variant of the component.
   * @values 'outlined' | 'filled'
   */
  @Input() variant: InputVariant;

  /**
   * Spans 100% width of the container when enabled.
   * @default false
   */
  @Input({ transform: booleanAttribute }) fluid: boolean = false;

  /**
   * When present, it specifies that the component should have invalid state style.
   * @default false
   */
  @Input({ transform: booleanAttribute }) invalid: boolean = false;

  /**
   * Inline style of the element.
   */
  @Input() style: { [klass: string]: any } | undefined;

  /**
   * Class of the element.
   */
  @Input() styleClass: string | undefined;

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
   * Used to define a string that labels the current element (accessibility).
   */
  @Input() ariaLabel: string | undefined;

  /**
   * Establishes relationships between the component and label(s).
   */
  @Input() ariaLabelledBy: string | undefined;

  /**
   * Used to indicate the IDs of the elements that describe the input.
   */
  @Input() ariaDescribedBy: string | undefined;

  // ==================== EVENTS ====================

  /**
   * Callback to execute when input value changes.
   */
  @Output() onInput = new EventEmitter<Event>();

  /**
   * Callback to execute when input is focused.
   */
  @Output() onFocus = new EventEmitter<FocusEvent>();

  /**
   * Callback to execute when input loses focus.
   */
  @Output() onBlur = new EventEmitter<FocusEvent>();

  /**
   * Callback to execute on keydown.
   */
  @Output() onKeyDown = new EventEmitter<KeyboardEvent>();

  /**
   * Callback to execute on keyup.
   */
  @Output() onKeyUp = new EventEmitter<KeyboardEvent>();

  /**
   * Callback to execute when value changes.
   */
  @Output() valueChange = new EventEmitter<string>();

  // ==================== CONTROL VALUE ACCESSOR ====================

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // ==================== EVENT HANDLERS ====================

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
    this.onInput.emit(event);
  }

  handleFocus(event: FocusEvent): void {
    this.onFocus.emit(event);
  }

  handleBlur(event: FocusEvent): void {
    this.onTouched();
    this.onBlur.emit(event);
  }

  handleKeyDown(event: KeyboardEvent): void {
    this.onKeyDown.emit(event);
  }

  handleKeyUp(event: KeyboardEvent): void {
    this.onKeyUp.emit(event);
  }

  // ==================== COMPUTED PROPERTIES ====================

  get isActuallyDisabled(): boolean {
    return this.disabled || this.isDisabled;
  }
}

