import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isTokenExpired } from '@educrm/utils';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.accessToken;
  if (token && !isTokenExpired(token)) {
    return true;
  }

  return router.parseUrl('/login');
};
