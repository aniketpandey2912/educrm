import { TestBed } from '@angular/core/testing';

jest.mock('@educrm/shared-theme', () => ({
  LightTheme: {},
}));
jest.mock('@primeng/themes', () => ({
  definePreset: () => ({}),
}));
jest.mock('@primeuix/themes/aura', () => ({}));

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
