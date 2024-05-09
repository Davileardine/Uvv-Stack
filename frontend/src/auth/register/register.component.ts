import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";
import {AuthServices} from "../auth.services";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './register.component.html',
})

export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  private authService = inject(AuthServices);
  protected readonly onsubmit = onsubmit;

  constructor(private router: Router) {
  }

  onSubmit() {
    const name = this.registerForm.value.name;
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    const termos = this.registerForm.value.termos;

    this.authService.register(name, email, password).subscribe(
      {
        next: (response: any) => {
          if (response) {
            this.router.navigate(['/']);
          } else {
            console.log('error ao registrar');
          }
        },
        error: (error: any) => {
          console.log('error', error);
        }
      });
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9\-\_\.]+")
      ]),
      password: new FormControl(null, Validators.required),
       termos: new FormControl(null, Validators.requiredTrue),
    });
  }

}

