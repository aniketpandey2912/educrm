import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { isTokenExpired } from '@educrm/utils';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.accessToken;
  if (token && !isTokenExpired(token)) {
    return true;
  }

  if (!token) {
    return router.parseUrl('/login');
  }

  return authService.refreshAccessToken().pipe(
    map(() => true),
    catchError(() => of(router.parseUrl('/login'))),
  );
};
