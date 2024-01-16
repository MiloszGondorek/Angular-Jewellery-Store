import { Component } from '@angular/core';
import { ProsComponent } from './pros/pros.component';
import { RecommendedComponent } from './recommended/recommended.component';
import { ButtonComponent } from '../reusable/button/button.component';
import { PresentLinkComponent } from './present-link/present-link.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProsComponent,
    RecommendedComponent,
    ButtonComponent,
    PresentLinkComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
