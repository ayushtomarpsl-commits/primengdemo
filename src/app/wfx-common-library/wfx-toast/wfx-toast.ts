import { Component, Input, Output, EventEmitter, Injectable, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

/**
 * Toast position type
 */
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center' | 'center';

/**
 * Toast severity type
 */
export type ToastSeverity = 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast';

/**
 * Toast message interface
 */
export interface ToastMessage {
  severity?: ToastSeverity;
  summary?: string;
  detail?: string;
  life?: number;
  sticky?: boolean;
  closable?: boolean;
  data?: any;
  key?: string;
  icon?: string;
}

/**
 * Toast close event interface
 */
export interface ToastCloseEvent {
  message: ToastMessage;
}

/**
 * WfxToastService - Service to show toast messages
 * 
 * This service wraps PrimeNG MessageService and provides
 * convenient methods for showing toasts.
 */
@Injectable({
  providedIn: 'root'
})
export class WfxToastService {
  constructor(private messageService: MessageService) {}

  /**
   * Show a success toast message.
   */
  success(summary: string, detail?: string, life: number = 3000): void {
    this.messageService.add({
      severity: 'success',
      summary,
      detail,
      life
    });
  }

  /**
   * Show an info toast message.
   */
  info(summary: string, detail?: string, life: number = 3000): void {
    this.messageService.add({
      severity: 'info',
      summary,
      detail,
      life
    });
  }

  /**
   * Show a warning toast message.
   */
  warn(summary: string, detail?: string, life: number = 3000): void {
    this.messageService.add({
      severity: 'warn',
      summary,
      detail,
      life
    });
  }

  /**
   * Show an error toast message.
   */
  error(summary: string, detail?: string, life: number = 5000): void {
    this.messageService.add({
      severity: 'error',
      summary,
      detail,
      life
    });
  }

  /**
   * Show a custom toast message.
   */
  show(message: ToastMessage): void {
    this.messageService.add(message);
  }

  /**
   * Show multiple toast messages.
   */
  showMultiple(messages: ToastMessage[]): void {
    this.messageService.addAll(messages);
  }

  /**
   * Clear all toast messages.
   */
  clear(key?: string): void {
    this.messageService.clear(key);
  }
}

/**
 * WfxToast - A wrapper component for PrimeNG Toast
 * 
 * This component exposes all p-toast properties and provides
 * a consistent API for the WFX application.
 * 
 * @example
 * <wfx-toast></wfx-toast>
 * 
 * // In component:
 * constructor(private toastService: WfxToastService) {}
 * this.toastService.success('Success', 'Operation completed');
 */
@Component({
  selector: 'wfx-toast',
  standalone: true,
  imports: [CommonModule, Toast],
  templateUrl: './wfx-toast.html',
  styleUrl: './wfx-toast.scss',
  providers: [MessageService]
})
export class WfxToast {
  // ==================== BASIC PROPERTIES ====================

  /**
   * Key of the message in case message is targeted to a specific toast.
   */
  @Input() key: string | undefined;

  /**
   * Position of the toast in viewport.
   * @default 'top-right'
   */
  @Input() position: ToastPosition = 'top-right';

  /**
   * The default time to display messages for in milliseconds.
   * @default 3000
   */
  @Input() life: number = 3000;

  // ==================== BEHAVIOR OPTIONS ====================

  /**
   * It does not add the new message if there is already a toast with the same content.
   * @default false
   */
  @Input({ transform: booleanAttribute }) preventOpenDuplicates: boolean = false;

  /**
   * Displays only once a message with the same content.
   * @default false
   */
  @Input({ transform: booleanAttribute }) preventDuplicates: boolean = false;

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

  // ==================== STYLING PROPERTIES ====================

  /**
   * Inline class of the component.
   */
  @Input() styleClass: string | undefined;

  /**
   * Object literal to define styles per screen size.
   */
  @Input() breakpoints: { [key: string]: any } | undefined;

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
   * Callback to invoke when a message is closed.
   */
  @Output() onClose = new EventEmitter<ToastCloseEvent>();

  // ==================== EVENT HANDLERS ====================

  handleClose(event: any): void {
    this.onClose.emit(event);
  }
}

