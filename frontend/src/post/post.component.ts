import {Component, inject, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {DatePipe} from "@angular/common";
import {AuthServices} from "../auth/auth.services";
import {NewCommentComponent} from "../comment/new-comment.component";
import {HeaderComponent} from "../app/header/header.component";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    DatePipe,
    NewCommentComponent,
    HeaderComponent
  ],
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {
  public post: any = [];
  public user: any;
  private id: any;
  private http = inject(HttpClient);
  protected authServices = inject(AuthServices);
  private backendUrl = 'http://localhost:3000/post';
  private headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }


  constructor(private route: ActivatedRoute) {
    this.user = this.authServices.user();
  }

  getPost(id: string) {
    this.http.get(this.backendUrl + '/' + id, {headers: this.headers}).subscribe({
      next: (response: any) => {
        this.post = response.data;
      },
      error: (error: any) => {
        console.log('error', error);
      }
    });
  }

  onCommentCreated(event: boolean) {
    this.getPost(this.id);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.getPost(this.id);
  }
}
