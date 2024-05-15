import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthServices} from "../auth/auth.services";
import {HttpClient} from "@angular/common/http";
import {NgClass} from "@angular/common";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-form-comment',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './new-comment.component.html'
})
export class NewCommentComponent implements OnInit {
  @Output() commentCreated = new EventEmitter<boolean>()

  formComment!: FormGroup;
  protected readonly onsubmit = onsubmit;
  private authServices = inject(AuthServices);
  private http = inject(HttpClient);


  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.formComment = new FormGroup({
      comment: new FormControl(null, Validators.required),
    })
  }

  onSubmit() {
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

    const content = this.formComment.value.comment;
    const post = this.route.snapshot.params['id'];

    this.http.post('http://localhost:3000/comment', {content, post}, {headers: headers}).subscribe({
      next: (response: any) => {
        this.commentCreated.emit(true);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
    this.formComment.reset();
  }
}
