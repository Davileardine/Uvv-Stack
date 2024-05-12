import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

import {HeaderComponent} from "../header/header.component";

@Component({
    selector: 'home-component',
    standalone: true,
    imports: [RouterOutlet,HeaderComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})

export class HomeComponent{}