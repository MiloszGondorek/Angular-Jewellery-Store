import { Component } from '@angular/core';
import { ProsComponent } from './pros/pros.component';
import { RecommendedComponent } from './recommended/recommended.component';
import { ButtonComponent } from '../reusable/button/button.component';
import { SliderComponent } from '../reusable/slider/slider.component';
import { IgImgComponent } from './ig-img/ig-img.component';
import { PresentContainerComponent } from './present-container/present-container.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProsComponent,
    RecommendedComponent,
    ButtonComponent,
    SliderComponent,
    IgImgComponent,
    PresentContainerComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
