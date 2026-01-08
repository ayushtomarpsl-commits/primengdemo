// ============================================
// Settings Component
// Application settings including theme customization
// ============================================

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThemeService, Theme, AVAILABLE_THEMES } from '../../../../core/services/theme.service';
import { ButtonComponent, SwitchComponent } from '../../../../ui';

@Component({
  selector: 'feature-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, SwitchComponent],
  template: `
    <div class="settings">
      <div class="settings__header">
        <h2>Settings</h2>
        <p>Customize your application experience</p>
      </div>

      <!-- Theme Selection Section -->
      <section class="settings__section">
        <div class="section-header">
          <i class="pi pi-palette"></i>
          <div>
            <h3>Appearance</h3>
            <p>Choose your preferred color theme</p>
          </div>
        </div>

        <div class="theme-grid">
          @for (theme of themes; track theme.id) {
            <div
              class="theme-card"
              [class.active]="currentTheme().id === theme.id"
              (click)="selectTheme(theme)"
            >
              <div class="theme-card__preview">
                <div 
                  class="theme-card__gradient"
                  [style.background]="theme.colors.gradient"
                >
                  <i [class]="theme.icon"></i>
                </div>
                <div class="theme-card__colors">
                  <span 
                    class="color-dot"
                    [style.background]="theme.colors.primary"
                  ></span>
                  <span 
                    class="color-dot"
                    [style.background]="getSecondaryColor(theme)"
                  ></span>
                </div>
              </div>
              <div class="theme-card__info">
                <span class="theme-card__name">{{ theme.name }}</span>
                @if (theme.id === 'midnight') {
                  <span class="theme-card__badge">Dark</span>
                }
              </div>
              @if (currentTheme().id === theme.id) {
                <div class="theme-card__check">
                  <i class="pi pi-check"></i>
                </div>
              }
            </div>
          }
        </div>
      </section>

      <!-- Current Theme Preview -->
      <section class="settings__section">
        <div class="section-header">
          <i class="pi pi-eye"></i>
          <div>
            <h3>Preview</h3>
            <p>See how elements look with current theme</p>
          </div>
        </div>

        <div class="preview-container">
          <div class="preview-row">
            <ui-button label="Primary" icon="pi pi-check" />
            <ui-button label="Secondary" variant="secondary" icon="pi pi-star" />
            <ui-button label="Success" variant="success" icon="pi pi-check-circle" />
            <ui-button label="Warning" variant="warning" icon="pi pi-exclamation-triangle" />
            <ui-button label="Danger" variant="danger" icon="pi pi-times-circle" />
          </div>

          <div class="preview-row">
            <ui-button label="Outlined" variant="outlined" icon="pi pi-bookmark" />
            <ui-button label="Text" variant="text" icon="pi pi-link" />
          </div>

          <div class="preview-cards">
            <div class="preview-card">
              <div class="preview-card__icon" style="background: var(--primary-button-gradient)">
                <i class="pi pi-chart-line"></i>
              </div>
              <div class="preview-card__content">
                <span class="preview-card__value">2,847</span>
                <span class="preview-card__label">Analytics</span>
              </div>
            </div>

            <div class="preview-card">
              <div class="preview-card__icon" style="background: var(--green)">
                <i class="pi pi-dollar"></i>
              </div>
              <div class="preview-card__content">
                <span class="preview-card__value">$12.5k</span>
                <span class="preview-card__label">Revenue</span>
              </div>
            </div>

            <div class="preview-card">
              <div class="preview-card__icon" style="background: var(--orange)">
                <i class="pi pi-users"></i>
              </div>
              <div class="preview-card__content">
                <span class="preview-card__value">1,024</span>
                <span class="preview-card__label">Users</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Additional Settings -->
      <section class="settings__section">
        <div class="section-header">
          <i class="pi pi-cog"></i>
          <div>
            <h3>Preferences</h3>
            <p>General application preferences</p>
          </div>
        </div>

        <div class="preferences-list">
          <div class="preference-item">
            <div class="preference-info">
              <span class="preference-label">Compact Mode</span>
              <span class="preference-desc">Reduce spacing and padding</span>
            </div>
            <ui-switch [(ngModel)]="compactMode" />
          </div>

          <div class="preference-item">
            <div class="preference-info">
              <span class="preference-label">Animations</span>
              <span class="preference-desc">Enable UI animations</span>
            </div>
            <ui-switch [(ngModel)]="animationsEnabled" />
          </div>

          <div class="preference-item">
            <div class="preference-info">
              <span class="preference-label">Sidebar Collapsed</span>
              <span class="preference-desc">Start with collapsed sidebar</span>
            </div>
            <ui-switch [(ngModel)]="sidebarCollapsed" />
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .settings {
      max-width: 900px;
      margin: 0 auto;
    }

    .settings__header {
      margin-bottom: var(--spacing-8);

      h2 {
        margin: 0 0 var(--spacing-2);
        font-size: var(--font-size-2xl);
        font-weight: var(--font-weight-bold);
        color: var(--darkgrey);
      }

      p {
        margin: 0;
        color: var(--lightgrey);
      }
    }

    .settings__section {
      background: var(--surface-card);
      border: 1px solid var(--greyborder);
      border-radius: var(--radius-lg);
      padding: var(--spacing-6);
      margin-bottom: var(--spacing-6);
    }

    .section-header {
      display: flex;
      align-items: flex-start;
      gap: var(--spacing-4);
      margin-bottom: var(--spacing-6);
      padding-bottom: var(--spacing-4);
      border-bottom: 1px solid var(--greyborder);

      > i {
        font-size: 1.5rem;
        color: var(--color-primary);
        padding: var(--spacing-2);
        background: var(--color-primary-light);
        border-radius: var(--radius-md);
      }

      h3 {
        margin: 0 0 var(--spacing-1);
        font-size: var(--font-size-lg);
        font-weight: var(--font-weight-semibold);
        color: var(--darkgrey);
      }

      p {
        margin: 0;
        font-size: var(--font-size-sm);
        color: var(--lightgrey);
      }
    }

    .theme-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: var(--spacing-4);
    }

    .theme-card {
      position: relative;
      border: 2px solid var(--greyborder);
      border-radius: var(--radius-lg);
      padding: var(--spacing-4);
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        border-color: var(--lightgrey);
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
      }

      &.active {
        border-color: var(--color-primary);
        background: var(--color-primary-light);
      }
    }

    .theme-card__preview {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-3);
      margin-bottom: var(--spacing-3);
    }

    .theme-card__gradient {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 80px;
      border-radius: var(--radius-md);
      color: white;
      font-size: 1.5rem;
    }

    .theme-card__colors {
      display: flex;
      gap: var(--spacing-2);
      justify-content: center;
    }

    .color-dot {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid var(--surface-card);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .theme-card__info {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--spacing-2);
    }

    .theme-card__name {
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-semibold);
      color: var(--darkgrey);
    }

    .theme-card__badge {
      font-size: 10px;
      font-weight: var(--font-weight-semibold);
      padding: 2px 6px;
      background: var(--darkgrey);
      color: white;
      border-radius: var(--radius-full);
      text-transform: uppercase;
    }

    .theme-card__check {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-primary);
      color: white;
      border-radius: 50%;
      font-size: 12px;
    }

    .preview-container {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-6);
    }

    .preview-row {
      display: flex;
      flex-wrap: wrap;
      gap: var(--spacing-3);
    }

    .preview-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--spacing-4);
    }

    .preview-card {
      display: flex;
      align-items: center;
      gap: var(--spacing-4);
      padding: var(--spacing-4);
      background: var(--grey-background);
      border-radius: var(--radius-md);
    }

    .preview-card__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: var(--radius-md);
      color: white;
      font-size: 1.25rem;
    }

    .preview-card__content {
      display: flex;
      flex-direction: column;
    }

    .preview-card__value {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-bold);
      color: var(--darkgrey);
    }

    .preview-card__label {
      font-size: var(--font-size-sm);
      color: var(--lightgrey);
    }

    .preferences-list {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-4);
    }

    .preference-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-4);
      background: var(--grey-background);
      border-radius: var(--radius-md);
    }

    .preference-info {
      display: flex;
      flex-direction: column;
      gap: var(--spacing-1);
    }

    .preference-label {
      font-weight: var(--font-weight-medium);
      color: var(--darkgrey);
    }

    .preference-desc {
      font-size: var(--font-size-sm);
      color: var(--lightgrey);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  private readonly themeService = inject(ThemeService);

  readonly themes = AVAILABLE_THEMES;
  readonly currentTheme = this.themeService.currentTheme;

  // Preference states
  compactMode = false;
  animationsEnabled = true;
  sidebarCollapsed = false;

  selectTheme(theme: Theme): void {
    this.themeService.setTheme(theme.id);
  }

  getSecondaryColor(theme: Theme): string {
    // Extract secondary color from gradient
    const gradientMatch = theme.colors.gradient.match(/#[a-fA-F0-9]{6}/g);
    return gradientMatch && gradientMatch.length > 1 ? gradientMatch[1] : theme.colors.primary;
  }
}

