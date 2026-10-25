import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthApiService } from './auth-api.service';

describe('AuthApiService', () => {
  let service: AuthApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AuthApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('posts credentials to /api/auth/login', () => {
    service.login({ email: 'a@b.com', password: 'secret123' }).subscribe();

    const req = httpMock.expectOne('/api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'Login successful', accessToken: 'a', refreshToken: 'r' });
  });

  it('posts refresh token to /api/auth/refresh-token', () => {
    service.refreshToken('r').subscribe();

    const req = httpMock.expectOne('/api/auth/refresh-token');
    expect(req.request.body).toEqual({ refreshToken: 'r' });
    req.flush({ accessToken: 'a' });
  });
});
