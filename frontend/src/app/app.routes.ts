import {Routes} from '@angular/router';
import {AUTH_ROUTES} from "../auth/auth.routers";
import {AuthComponent} from "../auth/auth.component";
import {authGuard} from "../auth/auth.guard";

export const routes: Routes = [
  {path: 'auth', component: AuthComponent, children: AUTH_ROUTES, canActivate: [authGuard]}
];
