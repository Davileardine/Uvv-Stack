import {Component, inject} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {DatePipe, NgClass} from '@angular/common';
import {ListStackComponent} from "../../stack/list-stack.component";
import {Router} from "@angular/router";

@Component({
  selector: 'home-component',
  standalone: true,
  imports: [HeaderComponent, FormsModule,
    NgClass,
    HttpClientModule, ListStackComponent, DatePipe],
  templateUrl: './home.component.html'
})

export class HomeComponent {
  public seachInput: string = '';
  public posts: any = [];
  private baseUrl: string = 'http://localhost:3000/post';
  private http = inject(HttpClient);

  constructor(private router: Router) {
  }

  getPosts($query: string) {
    this.http.get(this.baseUrl + '?search=' + $query).subscribe({
      next: (response: any) => {
        this.posts = response.data;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  openPost(id: string) {
    this.router.navigate(['/post', id]);
  }

  onModelChange(value: string) {
    if (value.length == 0) {
      this.posts = [];
    } else {
      this.getPosts(value);
    }
  }
}
