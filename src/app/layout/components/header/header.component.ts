// ============================================
// Layout Header Component
// Application top navigation bar
// ============================================

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../../../ui';

@Component({
  selector: 'layout-header',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <header class="header">
      <div class="header__left">
        <ui-button
          icon="pi pi-bars"
          variant="text"
          (onClick)="toggleSidebar.emit()"
          [styleClass]="'header__menu-btn'"
        />
        <h1 class="header__title">{{ title }}</h1>
      </div>
      <div class="header__right">
        <ui-button
          icon="pi pi-bell"
          variant="text"
          (onClick)="notificationsClick.emit()"
        />
        <ui-button
          icon="pi pi-user"
          variant="text"
          (onClick)="profileClick.emit()"
        />
      </div>
    </header>
  `,
  styles: [`
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 64px;
      padding: 0 var(--spacing-6);
      background: var(--color-white);
      border-bottom: 1px solid var(--greyborder);
      box-shadow: var(--card-box-shadow);
    }

    .header__left {
      display: flex;
      align-items: center;
      gap: var(--spacing-4);
    }

    .header__title {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-semibold);
      color: var(--darkgrey);
      margin: 0;
      background: var(--primary-button-gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .header__right {
      display: flex;
      align-items: center;
      gap: var(--spacing-2);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() title = 'Enterprise App';

  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() notificationsClick = new EventEmitter<void>();
  @Output() profileClick = new EventEmitter<void>();
}

