import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  //private authService = inject(AuthServices);
  protected readonly onsubmit = onsubmit;

  constructor(private router: Router) {
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

    this.loginForm.reset()
  }

}
