import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';

import {HeaderComponent} from "../header/header.component";
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StackService } from './home.services';
import { FormsModule } from '@angular/forms';
import { DatePipe, NgClass } from '@angular/common';

@Component({
    selector: 'home-component',
    standalone: true,
    imports: [RouterOutlet,HeaderComponent,FormsModule,
        NgClass,
        DatePipe,
        HttpClientModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})

export class HomeComponent{
    // private baseUrl: string = 'http://localhost:3000/stack';
    // private http = inject(HttpClient);
    constructor(private stackService: StackService) {
    }

    ngOnInit(){
        this.stackService.getStack()
    }
}
