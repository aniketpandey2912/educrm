import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthUser, LoginRequest } from '@educrm/models';
import { decodeJwt } from '@educrm/utils';
import { AuthApiService } from './auth-api.service';

const ACCESS_TOKEN_KEY = 'educrm_access_token';
const REFRESH_TOKEN_KEY = 'educrm_refresh_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly authApi = inject(AuthApiService);
  private readonly currentUserSubject = new BehaviorSubject<AuthUser | null>(
    this.decodeStoredToken(),
  );
  readonly currentUser$ = this.currentUserSubject.asObservable();

  get accessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  get currentUser(): AuthUser | null {
    return this.currentUserSubject.getValue();
  }

  login(payload: LoginRequest) {
    return this.authApi
      .login(payload)
      .pipe(tap(({ accessToken, refreshToken }) => this.storeSession(accessToken, refreshToken)));
  }

  refreshAccessToken() {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }
    return this.authApi
      .refreshToken(refreshToken)
      .pipe(tap(({ accessToken }) => this.storeSession(accessToken, refreshToken)));
  }

  logout() {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY) ?? undefined;
    return this.authApi.logout(refreshToken).pipe(
      tap(() => this.clearSession()),
      catchError((error: unknown) => {
        this.clearSession();
        return throwError(() => error);
      }),
    );
  }

  private storeSession(accessToken: string, refreshToken: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    this.currentUserSubject.next(decodeJwt<AuthUser>(accessToken));
  }

  private clearSession(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    this.currentUserSubject.next(null);
  }

  private decodeStoredToken(): AuthUser | null {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token ? decodeJwt<AuthUser>(token) : null;
  }
}
