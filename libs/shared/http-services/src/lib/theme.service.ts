import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LightTheme } from '@educrm/themes/base.theme';
import { definePreset } from '@primeng/themes';
import Aura from '@primeuix/themes/dist/aura';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly STORAGE_KEY = 'app-theme';
  private themeSubject = new BehaviorSubject<any>(LightTheme);
  theme$ = this.themeSubject.asObservable();

  constructor() {
    this.loadTheme();
  }

  /** Switch between predefined themes (Light, Dark, etc.) */
  switchTheme(themeName: 'light' | 'dark') {
    let theme;

    if (themeName === 'light') {
      theme = LightTheme;
    } else {
      // Temporary → fallback to Aura until you define DarkTheme
      theme = definePreset(Aura, {});
    }

    this.themeSubject.next(theme);
    localStorage.setItem(this.STORAGE_KEY, themeName);
  }

  /** Update current theme with custom overrides */
  updateTheme(overrides: Record<string, any>) {
    const currentTheme = this.themeSubject.getValue();
    const updated = {
      ...currentTheme,
      ...overrides,
    };
    this.themeSubject.next(updated);
  }

  /** Load saved theme from localStorage */
  private loadTheme() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved === 'dark') {
      this.switchTheme('dark');
    } else {
      this.switchTheme('light');
    }
  }

  /** Get current theme value */
  getCurrentTheme() {
    return this.themeSubject.getValue();
  }
}
