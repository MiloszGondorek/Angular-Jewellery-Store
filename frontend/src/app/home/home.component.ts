import { Component } from '@angular/core';
import { ProsComponent } from './pros/pros.component';
import { RecommendedComponent } from './recommended/recommended.component';
import { ButtonComponent } from '../reusable/button/button.component';
import { PresentLinkComponent } from './present-link/present-link.component';
import { SliderComponent } from '../reusable/slider/slider.component';
import { IgImgComponent } from './ig-img/ig-img.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProsComponent,
    RecommendedComponent,
    ButtonComponent,
    PresentLinkComponent,
    SliderComponent,
    IgImgComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
