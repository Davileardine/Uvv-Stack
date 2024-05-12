import {Component, inject} from '@angular/core';
import {AuthServices} from "../auth.services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
})
export class LogoutComponent {
  private authService = inject(AuthServices);

  constructor(private route: Router) {
  }

  onLogout() {
    this.authService.logout();
    this.route.navigate(['/auth/login'])
  }
}
