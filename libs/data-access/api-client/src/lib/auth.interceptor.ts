import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, finalize, shareReplay, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

const withToken = (req: Parameters<HttpInterceptorFn>[0], token: string) =>
  req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });

// Shared across concurrent requests so a wave of 401s triggers only one refresh call.
let refreshInFlight$: Observable<{ accessToken: string }> | null = null;

// Attaches the bearer token to same-origin API calls; on a 401, refreshes the token once and retries.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (!req.url.startsWith('/api')) {
    return next(req);
  }

  const token = authService.accessToken;
  const authedReq = token ? withToken(req, token) : req;

  return next(authedReq).pipe(
    catchError((error: unknown) => {
      const isAuthEndpoint = req.url.startsWith('/api/auth/');
      if (!(error instanceof HttpErrorResponse) || error.status !== 401 || isAuthEndpoint) {
        return throwError(() => error);
      }

      refreshInFlight$ ??= authService.refreshAccessToken().pipe(
        finalize(() => (refreshInFlight$ = null)),
        shareReplay(1),
      );

      return refreshInFlight$.pipe(
        switchMap(({ accessToken }) => next(withToken(req, accessToken))),
        catchError((refreshError: unknown) => {
          authService.logout().subscribe();
          return throwError(() => refreshError);
        }),
      );
    }),
  );
};
