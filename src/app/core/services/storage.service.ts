// ============================================
// Core Storage Service
// Type-safe localStorage/sessionStorage wrapper
// ============================================

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  getItem<T>(key: string, storage: 'local' | 'session' = 'local'): T | null {
    const store = storage === 'local' ? localStorage : sessionStorage;
    const item = store.getItem(key);
    
    if (!item) return null;
    
    try {
      return JSON.parse(item) as T;
    } catch {
      return item as unknown as T;
    }
  }

  setItem<T>(key: string, value: T, storage: 'local' | 'session' = 'local'): void {
    const store = storage === 'local' ? localStorage : sessionStorage;
    const serialized = typeof value === 'string' ? value : JSON.stringify(value);
    store.setItem(key, serialized);
  }

  removeItem(key: string, storage: 'local' | 'session' = 'local'): void {
    const store = storage === 'local' ? localStorage : sessionStorage;
    store.removeItem(key);
  }

  clear(storage: 'local' | 'session' = 'local'): void {
    const store = storage === 'local' ? localStorage : sessionStorage;
    store.clear();
  }
}

