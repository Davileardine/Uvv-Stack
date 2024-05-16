import { Component, inject } from '@angular/core';
import {RouterLink, RouterLinkActive} from "@angular/router";
import { AuthServices } from '../../auth/auth.services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})


export class HeaderComponent {
  private authService = inject(AuthServices);
  user = this.authService.user();
}
