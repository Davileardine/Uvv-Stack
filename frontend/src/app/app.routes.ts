import {Routes} from '@angular/router';
import {AUTH_ROUTES} from "../auth/auth.routers";
import {AuthComponent} from "../auth/auth.component";
import {authGuard} from "../auth/auth.guard";
import {HomeComponent} from './home/home.component';
import {PostComponent} from "../post/post.component";
import {StackComponent} from "../stack/stack.component";
import {ListStackComponent} from "../stack/list-stack.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'auth', component: AuthComponent, children: AUTH_ROUTES, canActivate: [authGuard]},
  {path: 'stacks', component: ListStackComponent},
  {path: 'stack/:id', component: StackComponent},
  {path: 'post/:id', component: PostComponent},
  {path: '**', redirectTo: ''}
];
