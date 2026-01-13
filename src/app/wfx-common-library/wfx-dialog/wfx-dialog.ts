import { Component, Input, Output, EventEmitter, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dialog } from 'primeng/dialog';

/**
 * Dialog position type
 */
export type DialogPosition = 'center' | 'top' | 'bottom' | 'left' | 'right' | 'topleft' | 'topright' | 'bottomleft' | 'bottomright';

/**
 * WfxDialog - A wrapper component for PrimeNG Dialog
 * 
 * This component exposes all p-dialog properties and provides
 * a consistent API for the WFX application.
 * 
 * @example
 * <wfx-dialog [(visible)]="showDialog" header="Dialog Title">
 *   <p>Dialog content</p>
 * </wfx-dialog>
 */
@Component({
  selector: 'wfx-dialog',
  standalone: true,
  imports: [CommonModule, Dialog],
  templateUrl: './wfx-dialog.html',
  styleUrl: './wfx-dialog.scss',
})
export class WfxDialog {
  // ==================== VISIBILITY ====================

  /**
   * Specifies the visibility of the dialog.
   */
  @Input() visible: boolean = false;

  /**
   * Event emitter for visibility changes (two-way binding).
   */
  @Output() visibleChange = new EventEmitter<boolean>();

  // ==================== BASIC PROPERTIES ====================

  /**
   * Title text of the dialog.
   */
  @Input() header: string | undefined;

  /**
   * Position of the dialog.
   * @default 'center'
   */
  @Input() position: DialogPosition = 'center';

  // ==================== BEHAVIOR OPTIONS ====================

  /**
   * Enables dragging to change the position using header.
   * @default true
   */
  @Input({ transform: booleanAttribute }) draggable: boolean = true;

  /**
   * Enables resizing of the content.
   * @default true
   */
  @Input({ transform: booleanAttribute }) resizable: boolean = true;

  /**
   * Defines if background should be blocked when dialog is displayed.
   * @default false
   */
  @Input({ transform: booleanAttribute }) modal: boolean = false;

  /**
   * Specifies if pressing escape key should hide the dialog.
   * @default true
   */
  @Input({ transform: booleanAttribute }) closeOnEscape: boolean = true;

  /**
   * Specifies if clicking the modal background should hide the dialog.
   * @default false
   */
  @Input({ transform: booleanAttribute }) dismissableMask: boolean = false;

  /**
   * Adds a close icon to the header to hide the dialog.
   * @default true
   */
  @Input({ transform: booleanAttribute }) closable: boolean = true;

  /**
   * Whether the dialog can be displayed full screen.
   * @default false
   */
  @Input({ transform: booleanAttribute }) maximizable: boolean = false;

  /**
   * Whether background scroll should be blocked when dialog is visible.
   * @default false
   */
  @Input({ transform: booleanAttribute }) blockScroll: boolean = false;

  /**
   * Keeps dialog in the viewport.
   * @default true
   */
  @Input({ transform: booleanAttribute }) keepInViewport: boolean = true;

  /**
   * When enabled, can only focus on elements inside the dialog.
   * @default true
   */
  @Input({ transform: booleanAttribute }) focusTrap: boolean = true;

  /**
   * When enabled, first focusable element receives focus on show.
   * @default true
   */
  @Input({ transform: booleanAttribute }) focusOnShow: boolean = true;

  // ==================== HEADER OPTIONS ====================

  /**
   * Whether to show the header or not.
   * @default true
   */
  @Input({ transform: booleanAttribute }) showHeader: boolean = true;

  /**
   * Name of the close icon.
   */
  @Input() closeIcon: string | undefined;

  /**
   * Defines a string that labels the close button for accessibility.
   */
  @Input() closeAriaLabel: string | undefined;

  /**
   * Name of the minimize icon.
   */
  @Input() minimizeIcon: string | undefined;

  /**
   * Name of the maximize icon.
   */
  @Input() maximizeIcon: string | undefined;

  // ==================== STYLING PROPERTIES ====================

  /**
   * Inline style of the component.
   */
  @Input() style: any;

  /**
   * Style class of the component.
   */
  @Input() styleClass: string | undefined;

  /**
   * Style of the content section.
   */
  @Input() contentStyle: any;

  /**
   * Style class of the content.
   */
  @Input() contentStyleClass: string | undefined;

  /**
   * Style class of the mask.
   */
  @Input() maskStyleClass: string | undefined;

  /**
   * Style of the mask.
   */
  @Input() maskStyle: { [klass: string]: any } | undefined;

  // ==================== Z-INDEX OPTIONS ====================

  /**
   * Whether to automatically manage layering.
   * @default true
   */
  @Input({ transform: booleanAttribute }) autoZIndex: boolean = true;

  /**
   * Base zIndex value to use in layering.
   * @default 0
   */
  @Input() baseZIndex: number = 0;

  // ==================== POSITION CONSTRAINTS ====================

  /**
   * Minimum value for the left coordinate of dialog in dragging.
   * @default 0
   */
  @Input() minX: number = 0;

  /**
   * Minimum value for the top coordinate of dialog in dragging.
   * @default 0
   */
  @Input() minY: number = 0;

  // ==================== RESPONSIVE ====================

  /**
   * Object literal to define widths per screen size.
   */
  @Input() breakpoints: any;

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

  // ==================== EVENTS ====================

  /**
   * Callback to invoke when dialog is shown.
   */
  @Output() onShow = new EventEmitter<any>();

  /**
   * Callback to invoke when dialog is hidden.
   */
  @Output() onHide = new EventEmitter<any>();

  /**
   * Callback to invoke when dialog resizing is initiated.
   */
  @Output() onResizeInit = new EventEmitter<MouseEvent>();

  /**
   * Callback to invoke when dialog resizing is completed.
   */
  @Output() onResizeEnd = new EventEmitter<MouseEvent>();

  /**
   * Callback to invoke when dialog dragging is completed.
   */
  @Output() onDragEnd = new EventEmitter<any>();

  /**
   * Callback to invoke when dialog maximized or unmaximized.
   */
  @Output() onMaximize = new EventEmitter<any>();

  // ==================== EVENT HANDLERS ====================

  handleVisibleChange(visible: boolean): void {
    this.visible = visible;
    this.visibleChange.emit(visible);
  }

  handleShow(event: any): void {
    this.onShow.emit(event);
  }

  handleHide(event: any): void {
    this.onHide.emit(event);
  }

  handleResizeInit(event: MouseEvent): void {
    this.onResizeInit.emit(event);
  }

  handleResizeEnd(event: MouseEvent): void {
    this.onResizeEnd.emit(event);
  }

  handleDragEnd(event: any): void {
    this.onDragEnd.emit(event);
  }

  handleMaximize(event: any): void {
    this.onMaximize.emit(event);
  }
}

