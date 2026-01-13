import { Component, Input, Output, EventEmitter, forwardRef, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Select } from 'primeng/select';

/**
 * Select size types
 */
export type SelectSize = 'small' | 'large' | undefined;

/**
 * Select variant types
 */
export type SelectVariant = 'outlined' | 'filled' | undefined;

/**
 * Filter match modes
 */
export type FilterMatchMode = 'startsWith' | 'contains' | 'endsWith' | 'equals' | 'notEquals' | 'in' | 'lt' | 'lte' | 'gt' | 'gte';

/**
 * Tooltip position
 */
export type TooltipPosition = 'right' | 'left' | 'top' | 'bottom';

/**
 * Select change event interface
 */
export interface SelectChangeEvent {
  originalEvent: Event;
  value: any;
}

/**
 * Select filter event interface
 */
export interface SelectFilterEvent {
  originalEvent: Event;
  filter: string;
}

/**
 * WfxSelect - A wrapper component for PrimeNG Select
 * 
 * This component exposes all p-select properties and provides
 * a consistent API for the WFX application.
 * 
 * @example
 * <wfx-select [(ngModel)]="selectedCity" [options]="cities" optionLabel="name" placeholder="Select a City"></wfx-select>
 */
@Component({
  selector: 'wfx-select',
  standalone: true,
  imports: [CommonModule, FormsModule, Select],
  templateUrl: './wfx-select.html',
  styleUrl: './wfx-select.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => WfxSelect),
      multi: true
    }
  ]
})
export class WfxSelect implements ControlValueAccessor {
  // ==================== INTERNAL STATE ====================
  
  value: any = null;
  isDisabled: boolean = false;

  // ==================== BASIC PROPERTIES ====================

  /**
   * An array of objects to display as the available options.
   */
  @Input() options: any[] = [];

  /**
   * Name of the label field of an option.
   */
  @Input() optionLabel: string | undefined;

  /**
   * Name of the value field of an option.
   */
  @Input() optionValue: string | undefined;

  /**
   * Name of the disabled field of an option.
   */
  @Input() optionDisabled: string | undefined;

  /**
   * Default text to display when no option is selected.
   */
  @Input() placeholder: string = '';

  /**
   * Unique identifier of the component.
   */
  @Input() id: string | undefined;

  /**
   * Identifier of the accessible input element.
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
  @Input() tabindex: number = 0;

  // ==================== STYLING PROPERTIES ====================

  /**
   * Specifies the size of the component.
   * @values 'small' | 'large'
   */
  @Input() size: SelectSize;

  /**
   * Specifies the input variant of the component.
   * @values 'outlined' | 'filled'
   */
  @Input() variant: SelectVariant;

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
   * Style class of the element.
   */
  @Input() styleClass: string | undefined;

  /**
   * Inline style of the overlay panel element.
   */
  @Input() panelStyle: { [klass: string]: any } | undefined;

  /**
   * Style class of the overlay panel element.
   */
  @Input() panelStyleClass: string | undefined;

  // ==================== DROPDOWN OPTIONS ====================

  /**
   * Height of the viewport in pixels.
   * @default '200px'
   */
  @Input() scrollHeight: string = '200px';

  /**
   * When enabled, a clear icon is displayed to clear the value.
   * @default false
   */
  @Input({ transform: booleanAttribute }) showClear: boolean = false;

  /**
   * Whether the selected option will be shown with a check mark.
   * @default false
   */
  @Input({ transform: booleanAttribute }) checkmark: boolean = false;

  /**
   * Icon class of the dropdown icon.
   */
  @Input() dropdownIcon: string | undefined;

  /**
   * Whether the select is in loading state.
   * @default false
   */
  @Input({ transform: booleanAttribute }) loading: boolean = false;

  /**
   * Icon to display in loading state.
   */
  @Input() loadingIcon: string | undefined;

  /**
   * When present, custom value instead of predefined options can be entered.
   * @default false
   */
  @Input({ transform: booleanAttribute }) editable: boolean = false;

  // ==================== FILTER PROPERTIES ====================

  /**
   * When specified, displays an input field to filter the items.
   * @default false
   */
  @Input({ transform: booleanAttribute }) filter: boolean = false;

  /**
   * Placeholder text to show when filter input is empty.
   */
  @Input() filterPlaceholder: string | undefined;

  /**
   * When filtering is enabled, filterBy decides which field to search against.
   */
  @Input() filterBy: string | undefined;

  /**
   * Defines how the items are filtered.
   * @default 'contains'
   */
  @Input() filterMatchMode: FilterMatchMode = 'contains';

  /**
   * Clears the filter value when hiding the select.
   * @default false
   */
  @Input({ transform: booleanAttribute }) resetFilterOnHide: boolean = false;

  /**
   * Applies focus to the filter element when the overlay is shown.
   * @default true
   */
  @Input({ transform: booleanAttribute }) autofocusFilter: boolean = true;

  // ==================== GROUP OPTIONS ====================

  /**
   * Whether to display options as grouped.
   * @default false
   */
  @Input({ transform: booleanAttribute }) group: boolean = false;

  /**
   * Name of the label field of an option group.
   * @default 'label'
   */
  @Input() optionGroupLabel: string = 'label';

  /**
   * Name of the options field of an option group.
   * @default 'items'
   */
  @Input() optionGroupChildren: string = 'items';

  // ==================== VIRTUAL SCROLL ====================

  /**
   * Whether the data should be loaded on demand during scroll.
   * @default false
   */
  @Input({ transform: booleanAttribute }) virtualScroll: boolean = false;

  /**
   * Height of an item in the list for VirtualScrolling.
   */
  @Input() virtualScrollItemSize: number | undefined;

  // ==================== MESSAGES ====================

  /**
   * Text to display when filtering does not return any results.
   */
  @Input() emptyFilterMessage: string | undefined;

  /**
   * Text to display when there is no data.
   */
  @Input() emptyMessage: string | undefined;

  // ==================== TOOLTIP ====================

  /**
   * Advisory information to display in a tooltip on hover.
   */
  @Input() tooltip: string | undefined;

  /**
   * Position of the tooltip.
   * @default 'right'
   */
  @Input() tooltipPosition: TooltipPosition = 'right';

  /**
   * Style class of the tooltip.
   */
  @Input() tooltipStyleClass: string | undefined;

  // ==================== OVERLAY OPTIONS ====================

  /**
   * Target element to attach the overlay.
   * @default 'body'
   */
  @Input() appendTo: any = 'body';

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
   * Callback to invoke when value of select changes.
   */
  @Output() onChange = new EventEmitter<SelectChangeEvent>();

  /**
   * Callback to invoke when data is filtered.
   */
  @Output() onFilter = new EventEmitter<SelectFilterEvent>();

  /**
   * Callback to invoke when select gets focus.
   */
  @Output() onFocus = new EventEmitter<Event>();

  /**
   * Callback to invoke when select loses focus.
   */
  @Output() onBlur = new EventEmitter<Event>();

  /**
   * Callback to invoke when component is clicked.
   */
  @Output() onClick = new EventEmitter<MouseEvent>();

  /**
   * Callback to invoke when select overlay gets visible.
   */
  @Output() onShow = new EventEmitter<any>();

  /**
   * Callback to invoke when select overlay gets hidden.
   */
  @Output() onHide = new EventEmitter<any>();

  /**
   * Callback to invoke when select clears the value.
   */
  @Output() onClear = new EventEmitter<Event>();

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

  handleChange(event: SelectChangeEvent): void {
    this.value = event.value;
    this.onChangeCallback(this.value);
    this.onChange.emit(event);
  }

  handleFilter(event: SelectFilterEvent): void {
    this.onFilter.emit(event);
  }

  handleFocus(event: Event): void {
    this.onFocus.emit(event);
  }

  handleBlur(event: Event): void {
    this.onTouchedCallback();
    this.onBlur.emit(event);
  }

  handleClick(event: MouseEvent): void {
    this.onClick.emit(event);
  }

  handleShow(event: any): void {
    this.onShow.emit(event);
  }

  handleHide(event: any): void {
    this.onHide.emit(event);
  }

  handleClear(event: Event): void {
    this.onClear.emit(event);
  }

  // ==================== COMPUTED PROPERTIES ====================

  get isActuallyDisabled(): boolean {
    return this.disabled || this.isDisabled;
  }
}

