import {Component, inject, OnInit} from '@angular/core';
import {AuthServices} from "../auth/auth.services";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import {NewPostComponent} from "../post/new-post.component";

@Component({
  selector: 'app-list-stack',
  standalone: true,
  imports: [
    DatePipe,
    NewPostComponent
  ],
  templateUrl: './list-stack.component.html'
})
export class ListStackComponent implements OnInit {
  stacks: any;
  private http = inject(HttpClient);
  private authServices = inject(AuthServices);
  private backendUrl = 'http://localhost:3000/stack';

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  getStacks() {
    this.http.get(this.backendUrl).subscribe({
      next: (response: any) => {
        this.stacks = response.stacks;
      },
      error: (error: any) => {
        console.log('error', error);
      }
    });
  }

  ngOnInit() {
    this.getStacks()
  }

}
