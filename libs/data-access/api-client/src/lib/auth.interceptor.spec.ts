import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { authInterceptor } from './auth.interceptor';

describe('authInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let authServiceSpy: jest.Mocked<
    Pick<AuthService, 'accessToken' | 'refreshAccessToken' | 'logout'>
  >;

  beforeEach(() => {
    authServiceSpy = {
      accessToken: 'old-token',
      refreshAccessToken: jest.fn(),
      logout: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('attaches the bearer token to /api requests', () => {
    http.get('/api/student/dashboard').subscribe();

    const req = httpMock.expectOne('/api/student/dashboard');
    expect(req.request.headers.get('Authorization')).toBe('Bearer old-token');
    req.flush({});
  });

  it('leaves non-/api requests untouched', () => {
    http.get('https://example.com/assets/logo.png').subscribe();

    const req = httpMock.expectOne('https://example.com/assets/logo.png');
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });

  it('refreshes the token and retries once on a 401', (done) => {
    authServiceSpy.refreshAccessToken.mockReturnValue(of({ accessToken: 'new-token' }));

    http.get('/api/student/dashboard').subscribe(() => {
      done();
    });

    const firstReq = httpMock.expectOne('/api/student/dashboard');
    firstReq.flush({ message: 'expired' }, { status: 401, statusText: 'Unauthorized' });

    const retriedReq = httpMock.expectOne('/api/student/dashboard');
    expect(retriedReq.request.headers.get('Authorization')).toBe('Bearer new-token');
    retriedReq.flush({ ok: true });
  });

  it('logs out and propagates the error when the refresh itself fails', (done) => {
    authServiceSpy.refreshAccessToken.mockReturnValue(
      throwError(() => new Error('expired refresh')),
    );
    authServiceSpy.logout.mockReturnValue(of(undefined));

    http.get('/api/student/dashboard').subscribe({
      error: () => {
        expect(authServiceSpy.logout).toHaveBeenCalled();
        done();
      },
    });

    const req = httpMock.expectOne('/api/student/dashboard');
    req.flush({ message: 'expired' }, { status: 401, statusText: 'Unauthorized' });
  });

  it('does not attempt a refresh for auth endpoints themselves', (done) => {
    http.post('/api/auth/login', {}).subscribe({
      error: () => {
        expect(authServiceSpy.refreshAccessToken).not.toHaveBeenCalled();
        done();
      },
    });

    const req = httpMock.expectOne('/api/auth/login');
    req.flush({ message: 'Invalid credentials' }, { status: 401, statusText: 'Unauthorized' });
  });
});
