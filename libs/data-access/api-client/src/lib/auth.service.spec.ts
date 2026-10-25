import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthApiService } from './auth-api.service';
import { AuthService } from './auth.service';

function makeToken(payload: Record<string, unknown>): string {
  const base64url = (obj: unknown) =>
    Buffer.from(JSON.stringify(obj))
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  return `${base64url({ alg: 'HS256' })}.${base64url(payload)}.signature`;
}

describe('AuthService', () => {
  let service: AuthService;
  let authApiSpy: jest.Mocked<Pick<AuthApiService, 'login' | 'logout' | 'refreshToken'>>;

  beforeEach(() => {
    localStorage.clear();
    authApiSpy = {
      login: jest.fn(),
      logout: jest.fn(),
      refreshToken: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [{ provide: AuthApiService, useValue: authApiSpy }],
    });
    service = TestBed.inject(AuthService);
  });

  it('starts with no current user when storage is empty', () => {
    expect(service.currentUser).toBeNull();
  });

  it('stores tokens and decodes the user on login', (done) => {
    const accessToken = makeToken({ sub: '1', role: 'student' });
    authApiSpy.login.mockReturnValue(
      of({ message: 'Login successful', accessToken, refreshToken: 'r' }),
    );

    service.login({ email: 'a@b.com', password: 'secret123' }).subscribe(() => {
      expect(service.accessToken).toBe(accessToken);
      expect(service.currentUser).toMatchObject({ sub: '1', role: 'student' });
      done();
    });
  });

  it('clears session on logout', (done) => {
    authApiSpy.logout.mockReturnValue(of(undefined));
    localStorage.setItem('educrm_access_token', 'a');
    localStorage.setItem('educrm_refresh_token', 'r');

    service.logout().subscribe(() => {
      expect(service.accessToken).toBeNull();
      expect(service.currentUser).toBeNull();
      done();
    });
  });
});
