import { Route } from '@angular/router';
import { authGuard } from '@educrm/api-client';
import { LoginComponent } from './login/login.component';
import { NxWelcomeComponent } from './nx-welcome.component';

export const appRoutes: Route[] = [
  { path: '', component: NxWelcomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
];
