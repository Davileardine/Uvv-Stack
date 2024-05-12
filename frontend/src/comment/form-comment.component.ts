import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthServices} from "../auth/auth.services";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-form-comment',
  standalone: true,
  imports: [],
  templateUrl: './form-comment.component.html'
})
export class FormCommentComponent implements OnInit {
  formComment!: FormGroup;
  private authServices = inject(AuthServices);
  private http = inject(HttpClient);


  constructor() {
  }

  ngOnInit() {
    this.formComment = new FormGroup({
      comment: new FormControl(null, Validators.required),
    })
  }

  onSubmit() {
    // code to submit comment
  }
}
