import {Routes} from '@angular/router';
import {AUTH_ROUTES} from "../auth/auth.routers";
import {AuthComponent} from "../auth/auth.component";
import {authGuard} from "../auth/auth.guard";
import {PostComponent} from "../post/post.component";
import {StackComponent} from "../stack/stack.component";

export const routes: Routes = [
  {path: 'auth', component: AuthComponent, children: AUTH_ROUTES, canActivate: [authGuard]},
  {path: 'stack/:id', component: StackComponent},
  {path: 'post/:id', component: PostComponent}
];
