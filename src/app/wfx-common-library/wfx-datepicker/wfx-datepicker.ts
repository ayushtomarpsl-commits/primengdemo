import { Component, Input, Output, EventEmitter, forwardRef, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { DatePicker } from 'primeng/datepicker';

/**
 * DatePicker size types
 */
export type DatePickerSize = 'small' | 'large' | undefined;

/**
 * DatePicker variant types
 */
export type DatePickerVariant = 'outlined' | 'filled' | undefined;

/**
 * DatePicker selection mode
 */
export type SelectionMode = 'single' | 'multiple' | 'range';

/**
 * DatePicker view type
 */
export type DatePickerView = 'date' | 'month' | 'year';

/**
 * WfxDatePicker - A wrapper component for PrimeNG DatePicker
 * 
 * This component exposes all p-datepicker properties and provides
 * a consistent API for the WFX application.
 * 
 * @example
 * <wfx-datepicker [(ngModel)]="date" placeholder="Select Date"></wfx-datepicker>
 */
@Component({
  selector: 'wfx-datepicker',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePicker],
  templateUrl: './wfx-datepicker.html',
  styleUrl: './wfx-datepicker.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WfxDatePicker),
      multi: true
    }
  ]
})
export class WfxDatePicker implements ControlValueAccessor {
  // ==================== INTERNAL STATE ====================
  
  value: Date | Date[] | null = null;
  isDisabled: boolean = false;

  // ==================== BASIC PROPERTIES ====================

  /**
   * Placeholder text for the input.
   */
  @Input() placeholder: string = '';

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
  @Input() size: DatePickerSize;

  /**
   * Specifies the input variant of the component.
   * @values 'outlined' | 'filled'
   */
  @Input() variant: DatePickerVariant;

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
   * Style class of the component.
   */
  @Input() styleClass: string | undefined;

  /**
   * Inline style of the input field.
   */
  @Input() inputStyle: { [klass: string]: any } | undefined;

  /**
   * Style class of the input field.
   */
  @Input() inputStyleClass: string | undefined;

  /**
   * Style class of the panel.
   */
  @Input() panelStyleClass: string | undefined;

  /**
   * Inline style of the panel.
   */
  @Input() panelStyle: any;

  // ==================== DATE FORMAT ====================

  /**
   * Format of the date.
   */
  @Input() dateFormat: string | undefined;

  /**
   * Separator for multiple selection mode.
   * @default ','
   */
  @Input() multipleSeparator: string = ',';

  /**
   * Separator for range selection mode.
   * @default '-'
   */
  @Input() rangeSeparator: string = '-';

  // ==================== SELECTION MODE ====================

  /**
   * Defines the quantity of the selection.
   * @values 'single' | 'multiple' | 'range'
   * @default 'single'
   */
  @Input() selectionMode: SelectionMode = 'single';

  /**
   * Maximum number of selectable dates in multiple mode.
   */
  @Input() maxDateCount: number | undefined;

  // ==================== DATE CONSTRAINTS ====================

  /**
   * The minimum selectable date.
   */
  @Input() minDate: Date | undefined;

  /**
   * The maximum selectable date.
   */
  @Input() maxDate: Date | undefined;

  /**
   * Array with dates that should be disabled.
   */
  @Input() disabledDates: Date[] | undefined;

  /**
   * Array with weekday numbers that should be disabled.
   */
  @Input() disabledDays: number[] | undefined;

  // ==================== VIEW OPTIONS ====================

  /**
   * Type of view to display.
   * @values 'date' | 'month' | 'year'
   */
  @Input() view: DatePickerView = 'date';

  /**
   * Number of months to display.
   */
  @Input() numberOfMonths: number = 1;

  /**
   * Defines the first day of the week.
   */
  @Input() firstDayOfWeek: number | undefined;

  /**
   * Set the date to highlight on first opening.
   */
  @Input() defaultDate: Date | undefined;

  // ==================== DISPLAY OPTIONS ====================

  /**
   * When enabled, displays the datepicker as inline.
   * @default false
   */
  @Input({ transform: booleanAttribute }) inline: boolean = false;

  /**
   * Whether to display dates in other months.
   * @default true
   */
  @Input({ transform: booleanAttribute }) showOtherMonths: boolean = true;

  /**
   * Whether days in other months are selectable.
   * @default false
   */
  @Input({ transform: booleanAttribute }) selectOtherMonths: boolean = false;

  /**
   * When enabled, displays a button with icon next to input.
   * @default false
   */
  @Input({ transform: booleanAttribute }) showIcon: boolean = false;

  /**
   * Icon of the datepicker button.
   */
  @Input() icon: string | undefined;

  /**
   * When enabled, a clear icon is displayed.
   * @default false
   */
  @Input({ transform: booleanAttribute }) showClear: boolean = false;

  /**
   * When enabled, displays week numbers.
   * @default false
   */
  @Input({ transform: booleanAttribute }) showWeek: boolean = false;

  /**
   * Whether to display today and clear buttons.
   * @default false
   */
  @Input({ transform: booleanAttribute }) showButtonBar: boolean = false;

  // ==================== TIME OPTIONS ====================

  /**
   * Whether to display timepicker.
   */
  @Input({ transform: booleanAttribute }) showTime: boolean = false;

  /**
   * Whether to display timepicker only.
   * @default false
   */
  @Input({ transform: booleanAttribute }) timeOnly: boolean = false;

  /**
   * Specifies 12 or 24 hour format.
   */
  @Input() hourFormat: string | undefined;

  /**
   * Hours to change per step.
   * @default 1
   */
  @Input() stepHour: number = 1;

  /**
   * Minutes to change per step.
   * @default 1
   */
  @Input() stepMinute: number = 1;

  /**
   * Seconds to change per step.
   * @default 1
   */
  @Input() stepSecond: number = 1;

  /**
   * Whether to show seconds.
   * @default false
   */
  @Input({ transform: booleanAttribute }) showSeconds: boolean = false;

  // ==================== INPUT OPTIONS ====================

  /**
   * Prevents entering the date manually with keyboard.
   * @default false
   */
  @Input({ transform: booleanAttribute }) readonlyInput: boolean = false;

  /**
   * When disabled, datepicker will not be visible with input focus.
   * @default true
   */
  @Input({ transform: booleanAttribute }) showOnFocus: boolean = true;

  /**
   * Keep invalid value when input blur.
   * @default false
   */
  @Input({ transform: booleanAttribute }) keepInvalid: boolean = false;

  // ==================== OVERLAY OPTIONS ====================

  /**
   * Target element to attach the overlay.
   * @default 'body'
   */
  @Input() appendTo: any = 'body';

  /**
   * Whether to hide the overlay on date selection.
   * @default true
   */
  @Input({ transform: booleanAttribute }) hideOnDateTimeSelect: boolean = true;

  /**
   * When enabled, datepicker is optimized for touch devices.
   * @default false
   */
  @Input({ transform: booleanAttribute }) touchUI: boolean = false;

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
   * Callback to invoke on date select.
   */
  @Output() onSelect = new EventEmitter<Date>();

  /**
   * Callback to invoke on focus of input field.
   */
  @Output() onFocus = new EventEmitter<Event>();

  /**
   * Callback to invoke on blur of input field.
   */
  @Output() onBlur = new EventEmitter<Event>();

  /**
   * Callback to invoke when input field cleared.
   */
  @Output() onClear = new EventEmitter<any>();

  /**
   * Callback to invoke when input field is being typed.
   */
  @Output() onInput = new EventEmitter<any>();

  /**
   * Callback to invoke when datepicker panel is shown.
   */
  @Output() onShow = new EventEmitter<any>();

  /**
   * Callback to invoke when date panel closed.
   */
  @Output() onClose = new EventEmitter<any>();

  /**
   * Callback to invoke when today button is clicked.
   */
  @Output() onTodayClick = new EventEmitter<Date>();

  /**
   * Callback to invoke when clear button is clicked.
   */
  @Output() onClearClick = new EventEmitter<any>();

  /**
   * Callback to invoke when a month is changed.
   */
  @Output() onMonthChange = new EventEmitter<any>();

  /**
   * Callback to invoke when a year is changed.
   */
  @Output() onYearChange = new EventEmitter<any>();

  // ==================== CONTROL VALUE ACCESSOR ====================

  private onChangeCallback: (value: any) => void = () => {};
  private onTouchedCallback: () => void = () => {};

  writeValue(value: any): void {
    this.value = value;
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

  handleSelect(date: Date): void {
    this.onChangeCallback(this.value);
    this.onSelect.emit(date);
  }

  handleFocus(event: Event): void {
    this.onFocus.emit(event);
  }

  handleBlur(event: Event): void {
    this.onTouchedCallback();
    this.onBlur.emit(event);
  }

  handleClear(event: any): void {
    this.onClear.emit(event);
  }

  handleInput(event: any): void {
    this.onInput.emit(event);
  }

  handleShow(event: any): void {
    this.onShow.emit(event);
  }

  handleClose(event: any): void {
    this.onClose.emit(event);
  }

  handleTodayClick(date: Date): void {
    this.onTodayClick.emit(date);
  }

  handleClearClick(event: any): void {
    this.onClearClick.emit(event);
  }

  handleMonthChange(event: any): void {
    this.onMonthChange.emit(event);
  }

  handleYearChange(event: any): void {
    this.onYearChange.emit(event);
  }

  // ==================== COMPUTED PROPERTIES ====================

  get isActuallyDisabled(): boolean {
    return this.disabled || this.isDisabled;
  }
}

