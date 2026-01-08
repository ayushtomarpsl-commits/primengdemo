// ============================================
// Layout Sidebar Component
// Application side navigation
// ============================================

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface NavItem {
  label: string;
  icon: string;
  route: string;
  children?: NavItem[];
}

@Component({
  selector: 'layout-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar" [class.sidebar--collapsed]="collapsed">
      <nav class="sidebar__nav">
        @for (item of navItems; track item.route) {
          <a
            class="sidebar__item"
            [routerLink]="item.route"
            routerLinkActive="sidebar__item--active"
            [routerLinkActiveOptions]="{ exact: item.route === '/' }"
          >
            <i [class]="item.icon"></i>
            @if (!collapsed) {
              <span>{{ item.label }}</span>
            }
          </a>
        }
      </nav>
      <div class="sidebar__footer">
        <button class="sidebar__collapse-btn" (click)="toggle.emit()">
          <i [class]="collapsed ? 'pi pi-angle-right' : 'pi pi-angle-left'"></i>
        </button>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      display: flex;
      flex-direction: column;
      width: var(--sidebar-width);
      height: 100%;
      background: var(--color-white);
      border-right: 1px solid var(--greyborder);
      transition: width 0.2s ease;
    }

    .sidebar--collapsed {
      width: 64px;
    }

    .sidebar__nav {
      flex: 1;
      padding: var(--spacing-4);
      overflow-y: auto;
    }

    .sidebar__item {
      display: flex;
      align-items: center;
      gap: var(--spacing-3);
      padding: var(--spacing-3) var(--spacing-4);
      margin-bottom: var(--spacing-1);
      border-radius: var(--radius-md);
      color: var(--lightgrey);
      text-decoration: none;
      transition: all 0.2s ease;
      font-size: var(--font-size-sm);

      &:hover {
        background: var(--grey-background);
        color: var(--darkgrey);
      }

      &--active {
        background: linear-gradient(92.58deg, rgba(0, 209, 207, 0.1) 0%, rgba(0, 153, 196, 0.1) 100%);
        color: var(--color-primary);
        font-weight: var(--font-weight-medium);
        border-left: 3px solid var(--color-primary);
        margin-left: -3px;
      }

      i {
        font-size: 1.125rem;
        width: 1.5rem;
        text-align: center;
      }
    }

    .sidebar--collapsed .sidebar__item {
      justify-content: center;
      padding: var(--spacing-3);

      &--active {
        border-left: none;
        margin-left: 0;
        border-bottom: 3px solid var(--color-primary);
      }
    }

    .sidebar__footer {
      padding: var(--spacing-4);
      border-top: 1px solid var(--greyborder);
    }

    .sidebar__collapse-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: var(--spacing-2);
      background: var(--grey-background);
      border: 1px solid var(--greyborder);
      border-radius: var(--radius-md);
      color: var(--lightgrey);
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: var(--primary-button-gradient);
        border-color: transparent;
        color: var(--color-white);
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @Input() navItems: NavItem[] = [];
  @Input() collapsed = false;

  @Output() toggle = new EventEmitter<void>();
}

