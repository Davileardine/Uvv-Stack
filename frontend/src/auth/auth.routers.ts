import {Routes} from "@angular/router";
import {RegisterComponent} from "./register/register.component";

export const AUTH_ROUTES: Routes = [
  // {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'register', component: RegisterComponent},
]
