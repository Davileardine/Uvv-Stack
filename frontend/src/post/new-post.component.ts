import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {DatePipe, NgClass} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthServices} from "../auth/auth.services";

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './new-post.component.html'
})
export class NewPostComponent implements OnInit {
  @Output() postCreated = new EventEmitter<boolean>()

  newPostForm!: FormGroup;
  protected readonly onsubmit = onsubmit;
  private authServices = inject(AuthServices);
  private http = inject(HttpClient);

  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.newPostForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required),
    })
  }

  onSubmit() {
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }

    const title = this.newPostForm.value.title;
    const content = this.newPostForm.value.content;
    const stack = this.route.snapshot.params['id'];

    this.http.post('http://localhost:3000/post', {title, content, stack}, {headers: headers}).subscribe({
      next: (response: any) => {
        this.postCreated.emit(true);
      },
      error: (error: any) => {
        console.log(error);
        if(error.status == 401) {
          this.authServices.logout();
          this.router.navigate(['/auth/login']);
        }
      }
    })
    this.newPostForm.reset();
  }
}
