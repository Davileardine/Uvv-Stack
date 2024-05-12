import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {NgClass, Location } from "@angular/common";
import {AuthServices} from "../auth.services";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  protected readonly onsubmit = onsubmit;
  private authService = inject(AuthServices);

  constructor(private router: Router, private location: Location) {
  }

  ngOnInit(): void {
    this.loginForm = new FormBuilder().group({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9\-\_\.]+")
      ]),
      password: new FormControl(null, Validators.required),
    })
  }


  onSubmit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authService.login(email, password).subscribe({
      next: (response: any) => {
        if (response) {
          this.location.back();
        } else {
          console.log('error ao logar');
        }
      },
      error: (error: any) => {
        console.log('error', error);
      }
    });
  }

}
