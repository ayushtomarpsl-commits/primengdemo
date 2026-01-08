// ============================================
// Layout Shell Component
// Main application shell with header, sidebar, content
// ============================================

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent, NavItem } from '../sidebar/sidebar.component';

@Component({
  selector: 'layout-shell',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  template: `
    <div class="shell">
      <layout-header
        [title]="appTitle"
        (toggleSidebar)="toggleSidebar()"
      />
      <div class="shell__body">
        <layout-sidebar
          [navItems]="navItems"
          [collapsed]="sidebarCollapsed()"
          (toggle)="toggleSidebar()"
        />
        <main class="shell__content">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
  styles: [`
    .shell {
      display: flex;
      flex-direction: column;
      height: 100vh;
      overflow: hidden;
    }

    .shell__body {
      display: flex;
      flex: 1;
      overflow: hidden;
    }

    .shell__content {
      flex: 1;
      padding: var(--spacing-6);
      overflow-y: auto;
      background: var(--surface-ground);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShellComponent {
  readonly appTitle = 'Enterprise App';
  readonly sidebarCollapsed = signal(false);

  readonly navItems: NavItem[] = [
    { label: 'Dashboard', icon: 'pi pi-home', route: '/' },
    { label: 'Users', icon: 'pi pi-users', route: '/users' },
    { label: 'Forms', icon: 'pi pi-file-edit', route: '/forms' },
    { label: 'Passthrough', icon: 'pi pi-sliders-h', route: '/passthrough' },
    { label: 'Settings', icon: 'pi pi-cog', route: '/settings' },
  ];

  toggleSidebar(): void {
    this.sidebarCollapsed.update(collapsed => !collapsed);
  }
}

