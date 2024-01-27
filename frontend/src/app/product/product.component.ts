import { Component } from '@angular/core';
import { SliderComponent } from '../reusable/slider/slider.component';
import { LinkComponent } from './link/link.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [SliderComponent, LinkComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  name = 'test';
}
