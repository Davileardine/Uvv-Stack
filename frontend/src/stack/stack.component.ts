import {Component, inject, OnInit} from '@angular/core';
import {AuthServices} from "../auth/auth.services";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {NewPostComponent} from "../post/new-post.component";
import {HeaderComponent} from "../app/header/header.component";

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [
    DatePipe,
    NewPostComponent,
    HeaderComponent
  ],
  templateUrl: './stack.component.html'
})
export class StackComponent implements OnInit {
  id: any;
  stack: any;
  private http = inject(HttpClient);
  private authServices = inject(AuthServices);
  private backendUrl = 'http://localhost:3000/stack';

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  getStack(id: string) {
    this.http.get(this.backendUrl + '/' + id).subscribe({
      next: (response: any) => {
        this.stack = response.stack;
        this.stack['posts'] = response.posts;
      },
      error: (error: any) => {
        console.log('error', error);
      }
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.getStack(this.id);
  }

  openModal() {
    if (!this.authServices.isLoggedIn()) {
      this.router.navigate(['/auth/login']);
    } else {
      document.getElementById('openModal')?.click()
    }
  }

  onPostCreated(event: boolean) {
    this.getStack(this.id);
  }

  openPost(id: string) {
    this.router.navigate(['/post', id]);
  }

  //votar tem que estar logado
  vote(id: string, vote: string) {
    if (!this.authServices.isLoggedIn()) {
      this.router.navigate(['/auth/login']);
      return;
    }
    let headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    let url = this.backendUrl.split('/stack')[0];
    this.http.put(`${url}/post/${id}/vote`, {vote: vote}, {headers: headers}).subscribe({
      next: (response: any) => {
        this.getStack(this.id);
      },
      error: (error: any) => {
        console.log('error', error);
        if(error.status == 401) {
          this.authServices.logout();
          this.router.navigate(['/auth/login']);
        }
      }
    })
  }
}
