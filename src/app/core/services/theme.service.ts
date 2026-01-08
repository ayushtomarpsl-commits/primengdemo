// ============================================
// Theme Service
// Manages application color themes
// ============================================

import { Injectable, signal, effect } from '@angular/core';
import { StorageService } from './storage.service';

export interface Theme {
  id: string;
  name: string;
  icon: string;
  colors: {
    primary: string;
    gradient: string;
  };
}

export const AVAILABLE_THEMES: Theme[] = [
  {
    id: 'elementary',
    name: 'Elementary',
    icon: 'pi pi-bolt',
    colors: {
      primary: '#00d1cf',
      gradient: 'linear-gradient(92.58deg, #00d1cf 0%, #0099c4 100%)',
    },
  },
  {
    id: 'ocean',
    name: 'Ocean',
    icon: 'pi pi-sun',
    colors: {
      primary: '#667eea',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
  },
  {
    id: 'sunset',
    name: 'Sunset',
    icon: 'pi pi-heart',
    colors: {
      primary: '#f5576c',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
  },
  {
    id: 'forest',
    name: 'Forest',
    icon: 'pi pi-leaf',
    colors: {
      primary: '#11998e',
      gradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    },
  },
  {
    id: 'royal',
    name: 'Royal',
    icon: 'pi pi-crown',
    colors: {
      primary: '#7c3aed',
      gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
    },
  },
  {
    id: 'midnight',
    name: 'Midnight',
    icon: 'pi pi-moon',
    colors: {
      primary: '#6366f1',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    },
  },
  {
    id: 'coral',
    name: 'Coral',
    icon: 'pi pi-palette',
    colors: {
      primary: '#ff6b6b',
      gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ffa07a 100%)',
    },
  },
];

const STORAGE_KEY = 'app_theme';
const DEFAULT_THEME = 'elementary';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storage: StorageService;
  
  readonly currentTheme = signal<Theme>(AVAILABLE_THEMES[0]);
  readonly themes = AVAILABLE_THEMES;

  constructor(storage: StorageService) {
    this.storage = storage;
    
    // Load saved theme on init
    const savedThemeId = this.storage.getItem<string>(STORAGE_KEY) ?? DEFAULT_THEME;
    const savedTheme = AVAILABLE_THEMES.find(t => t.id === savedThemeId) ?? AVAILABLE_THEMES[0];
    this.setTheme(savedTheme.id);

    // Effect to persist theme changes
    effect(() => {
      const theme = this.currentTheme();
      this.storage.setItem(STORAGE_KEY, theme.id);
    });
  }

  setTheme(themeId: string): void {
    const theme = AVAILABLE_THEMES.find(t => t.id === themeId);
    if (theme) {
      this.currentTheme.set(theme);
      document.documentElement.setAttribute('data-theme', themeId);
    }
  }

  getThemeById(themeId: string): Theme | undefined {
    return AVAILABLE_THEMES.find(t => t.id === themeId);
  }

  isDarkTheme(): boolean {
    return this.currentTheme().id === 'midnight';
  }
}

