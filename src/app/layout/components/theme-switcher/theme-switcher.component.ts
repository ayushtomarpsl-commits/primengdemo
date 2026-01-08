// ============================================
// Theme Switcher Component
// UI for switching between color themes
// ============================================

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, Theme, AVAILABLE_THEMES } from '../../../core/services/theme.service';

@Component({
  selector: 'layout-theme-switcher',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="theme-switcher">
      <button 
        class="theme-switcher__trigger"
        (click)="togglePanel()"
        [class.active]="isPanelOpen"
      >
        <i class="pi pi-palette"></i>
      </button>

      @if (isPanelOpen) {
        <div class="theme-switcher__panel">
          <div class="theme-switcher__header">
            <h4>Choose Theme</h4>
            <button class="close-btn" (click)="togglePanel()">
              <i class="pi pi-times"></i>
            </button>
          </div>
          
          <div class="theme-switcher__grid">
            @for (theme of themes; track theme.id) {
              <button
                class="theme-option"
                [class.active]="currentTheme().id === theme.id"
                (click)="selectTheme(theme)"
              >
                <div 
                  class="theme-option__preview"
                  [style.background]="theme.colors.gradient"
                >
                  <i [class]="theme.icon"></i>
                </div>
                <span class="theme-option__name">{{ theme.name }}</span>
                @if (currentTheme().id === theme.id) {
                  <i class="pi pi-check theme-option__check"></i>
                }
              </button>
            }
          </div>
        </div>
      }

      @if (isPanelOpen) {
        <div class="theme-switcher__backdrop" (click)="togglePanel()"></div>
      }
    </div>
  `,
  styles: [`
    .theme-switcher {
      position: relative;
    }

    .theme-switcher__trigger {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border: none;
      border-radius: var(--radius-md);
      background: var(--grey-background);
      color: var(--lightgrey);
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover, &.active {
        background: var(--primary-button-gradient);
        color: white;
      }

      i {
        font-size: 1.125rem;
      }
    }

    .theme-switcher__backdrop {
      position: fixed;
      inset: 0;
      background: transparent;
      z-index: 999;
    }

    .theme-switcher__panel {
      position: absolute;
      top: calc(100% + 8px);
      right: 0;
      width: 320px;
      background: var(--surface-card);
      border: 1px solid var(--greyborder);
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-xl);
      z-index: 1000;
      animation: slideIn 0.2s ease;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .theme-switcher__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--spacing-4);
      border-bottom: 1px solid var(--greyborder);

      h4 {
        margin: 0;
        font-size: var(--font-size-base);
        font-weight: var(--font-weight-semibold);
        color: var(--darkgrey);
      }

      .close-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border: none;
        border-radius: var(--radius-sm);
        background: transparent;
        color: var(--lightgrey);
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          background: var(--grey-background);
          color: var(--darkgrey);
        }
      }
    }

    .theme-switcher__grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: var(--spacing-3);
      padding: var(--spacing-4);
    }

    .theme-option {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--spacing-2);
      padding: var(--spacing-3);
      border: 2px solid var(--greyborder);
      border-radius: var(--radius-lg);
      background: var(--surface-card);
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        border-color: var(--lightgrey);
        transform: translateY(-2px);
      }

      &.active {
        border-color: var(--color-primary);
        background: var(--color-primary-light);
      }
    }

    .theme-option__preview {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: var(--radius-md);
      color: white;
      font-size: 1.25rem;
    }

    .theme-option__name {
      font-size: var(--font-size-sm);
      font-weight: var(--font-weight-medium);
      color: var(--darkgrey);
    }

    .theme-option__check {
      position: absolute;
      top: 8px;
      right: 8px;
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--color-primary);
      color: white;
      border-radius: 50%;
      font-size: 10px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcherComponent {
  private readonly themeService = inject(ThemeService);

  readonly themes = AVAILABLE_THEMES;
  readonly currentTheme = this.themeService.currentTheme;
  
  isPanelOpen = false;

  togglePanel(): void {
    this.isPanelOpen = !this.isPanelOpen;
  }

  selectTheme(theme: Theme): void {
    this.themeService.setTheme(theme.id);
  }
}

