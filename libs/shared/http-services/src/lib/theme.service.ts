import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LightTheme } from '@educrm/shared-theme';
import { definePreset } from '@primeng/themes';
import Aura from '@primeuix/themes/aura';

type ThemePreset = typeof LightTheme;

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly STORAGE_KEY = 'app-theme';
  private themeSubject = new BehaviorSubject<ThemePreset>(LightTheme);
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
  updateTheme(overrides: Record<string, unknown>) {
    const currentTheme = this.themeSubject.getValue();
    const updated = {
      ...currentTheme,
      ...overrides,
    } as ThemePreset;
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
