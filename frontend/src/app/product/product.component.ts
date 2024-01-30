import { Component } from '@angular/core';
import { SliderComponent } from '../reusable/slider/slider.component';
import { LinkComponent } from './link/link.component';
import { SelectComponent } from '../reusable/select/select.component';
import { CountComponent } from './count/count.component';
import { ButtonComponent } from '../reusable/button/button.component';
import { StarComponent } from './star/star.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    SliderComponent,
    LinkComponent,
    SelectComponent,
    CountComponent,
    ButtonComponent,
    StarComponent,
    CommonModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  name = 'test';
  src = [
    '../../assets/images/items/item 1.png',
    '../../assets/images/items/item 1.png',
    '../../assets/images/items/item 1.png',
  ];
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
}
