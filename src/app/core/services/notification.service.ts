// ============================================
// Core Notification Service
// Centralized toast/message notifications
// ============================================

import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

export type NotificationSeverity = 'success' | 'info' | 'warn' | 'error';

export interface NotificationOptions {
  summary: string;
  detail?: string;
  life?: number;
  sticky?: boolean;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly messageService = inject(MessageService);

  success(options: NotificationOptions): void {
    this.show('success', options);
  }

  info(options: NotificationOptions): void {
    this.show('info', options);
  }

  warn(options: NotificationOptions): void {
    this.show('warn', options);
  }

  error(options: NotificationOptions): void {
    this.show('error', options);
  }

  private show(severity: NotificationSeverity, options: NotificationOptions): void {
    this.messageService.add({
      severity,
      summary: options.summary,
      detail: options.detail,
      life: options.life ?? 3000,
      sticky: options.sticky ?? false,
    });
  }

  clear(): void {
    this.messageService.clear();
  }
}

