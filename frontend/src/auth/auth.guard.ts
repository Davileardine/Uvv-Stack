// import {CanActivateFn, Router} from '@angular/router';
// import {AuthServices} from './auth.services';
// import {inject} from "@angular/core";
// import {AuthenticationComponent} from "./authentication/authentication.component";
//
// export const authGuard: CanActivateFn = (route, state) => {
//   const authService = inject(AuthServices);
//   const router = inject(Router);
//   if (route.component == AuthenticationComponent) {
//     if (authService.isLoggedIn()) {
//       router.navigate(['/']);
//       return false;
//     } else {
//       return true;
//     }
//   } else {
//     if (authService.isLoggedIn()) {
//       return true;
//     } else {
//       router.navigate(['/autenticacao/signin']);
//       return false
//     }
//   }
// };
